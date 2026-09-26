import Image from "next/image";
import { notFound } from "next/navigation";
import { IWorkout } from "@/types/workout.type";
import ExerciseActions from "@/components/exerciseDetail/ExerciseActions";

const fetchWorkout = async (id: string): Promise<IWorkout | null> => {
  try {
    const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch workout:", error);
    return null;
  }
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const workout = await fetchWorkout(resolvedParams.id);
  
  if (!workout) return { title: "Not Found" };
  
  return {
    title: `${workout.name} | FitLog`,
    description: workout.description,
  };
}

const ExerciseDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  const workout = await fetchWorkout(resolvedParams.id);

  if (!workout) {
    notFound();
  }

  return (
    <article className="grid gap-10 lg:grid-cols-2">
      <div className="relative min-h-72 overflow-hidden rounded-2xl border border-base-300">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>
      
      <div>
        <h1 className="text-4xl font-heading font-bold uppercase">{workout.name}</h1>
        <p className="mt-4 text-base-content/75">{workout.description}</p>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span key={group} className="badge badge-primary text-black font-semibold">
              {group}
            </span>
          ))}
        </div>

        <dl className="mt-6 divide-y divide-base-300 overflow-hidden rounded-2xl border border-base-300">
          <div className="grid grid-cols-1 gap-1 bg-base-200 px-4 py-3 sm:grid-cols-2 sm:items-center">
            <dt className="font-heading text-sm text-base-content/70">EQUIPMENT</dt>
            <dd>{workout.equipment}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 bg-base-200 px-4 py-3 sm:grid-cols-2 sm:items-center">
            <dt className="font-heading text-sm text-base-content/70">DIFFICULTY</dt>
            <dd>{workout.difficulty}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 bg-base-200 px-4 py-3 sm:grid-cols-2 sm:items-center">
            <dt className="font-heading text-sm text-base-content/70">SETS</dt>
            <dd>{workout.sets}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 bg-base-200 px-4 py-3 sm:grid-cols-2 sm:items-center">
            <dt className="font-heading text-sm text-base-content/70">REPS</dt>
            <dd>{workout.reps}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 bg-base-200 px-4 py-3 sm:grid-cols-2 sm:items-center">
            <dt className="font-heading text-sm text-base-content/70">DURATION</dt>
            <dd>{workout.duration} min</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 bg-base-200 px-4 py-3 sm:grid-cols-2 sm:items-center">
            <dt className="font-heading text-sm text-base-content/70">CALORIES</dt>
            <dd>{workout.caloriesBurned} kcal</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 bg-base-200 px-4 py-3 sm:grid-cols-2 sm:items-center">
            <dt className="font-heading text-sm text-base-content/70">RATING</dt>
            <dd>{workout.rating}</dd>
          </div>
        </dl>

        <h2 className="mt-8 text-2xl font-heading font-bold uppercase">Instructions</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5">
          {workout.instructions.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>

        <ExerciseActions workout={workout} />
      </div>
    </article>
  );
};

export default ExerciseDetail;
