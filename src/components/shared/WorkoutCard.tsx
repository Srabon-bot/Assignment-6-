import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import { IWorkout } from "../../types/workout.type";

interface IWorkoutCardProps {
  workout: IWorkout;
}

const WorkoutCard = ({ workout }: IWorkoutCardProps) => {
  return (
    <Link
      href={`/exercise/${workout.id}`}
      className="card rounded-2xl border border-base-300 bg-base-200 transition hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <figure className="relative h-48 w-full overflow-hidden rounded-t-2xl">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </figure>
      <div className="card-body gap-1.5 p-6">
        <div className="flex flex-wrap gap-2 mb-1">
          {workout.muscleGroups.map((group) => (
            <span key={group} className="badge badge-primary text-black font-bold uppercase text-[11px] py-3 px-3">
              {group}
            </span>
          ))}
        </div>
        <h2 className="font-heading text-2xl font-bold uppercase tracking-wide text-base-content mt-1">
          {workout.name}
        </h2>
        <p className="text-base-content/60 mb-2">{workout.equipment}</p>
        
        <hr className="my-1 border-base-300" />
        
        <div className="flex flex-wrap items-center gap-5 pt-1 text-sm text-base-content/60">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 opacity-70" /> {workout.duration} min
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Flame className="h-4 w-4 opacity-70" /> {workout.caloriesBurned} kcal
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Star className="h-4 w-4 opacity-70" /> {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
