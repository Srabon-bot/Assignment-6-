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
      <div className="card-body gap-3 p-5">
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span key={group} className="badge badge-primary badge-sm">
              {group}
            </span>
          ))}
        </div>
        <h2 className="card-title font-heading text-xl normal-case tracking-tight">
          {workout.name}
        </h2>
        <p className="text-sm text-base-content/70">{workout.equipment}</p>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-4 w-4 text-primary" /> {workout.duration} min
          </span>
          <span className="inline-flex items-center gap-1">
            <Flame className="h-4 w-4 text-primary" /> {workout.caloriesBurned} kcal
          </span>
          <span className="inline-flex items-center gap-1">
            <Star className="h-4 w-4 text-primary" /> {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
