import { IWorkout } from "../../types/workout.type";

const fetchWorkouts = async (): Promise<IWorkout[]> => {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch workouts:", error);
    return [];
  }
};

const Library = async () => {
  const workouts = await fetchWorkouts();

  return (
    <section id="library" className="space-y-6">
      <div>
        <h2 className="text-3xl">The Library</h2>
        <p className="mt-2 text-base-content/70">
          Twelve lifts covering every major muscle group.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {workouts.map((workout) => (
          <div key={workout.id} className="p-4 border border-base-300 rounded-2xl bg-base-200">
            <p className="font-heading">{workout.name} loaded...</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Library;
