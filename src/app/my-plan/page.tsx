"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Dumbbell, Clock, Flame, Star, X, CheckCircle, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import { PlanContext } from "../../context/PlanContext";
import { IWorkout } from "../../types/workout.type";

const MyPlan = () => {
  const { plan, setPlan, saved, setSaved } = useContext(PlanContext);
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">("duration");

  const totalExercises = plan.length;
  const totalMinutes = plan.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = plan.reduce((sum, w) => sum + w.caloriesBurned, 0);

  const handleMarkDone = (workout: IWorkout) => {
    setPlan(plan.filter((item) => item.id !== workout.id));
    toast.success(`${workout.name} marked as done!`);
  };

  const handleRemoveFromPlan = (workout: IWorkout) => {
    setPlan(plan.filter((item) => item.id !== workout.id));
    toast.success(`${workout.name} removed from plan!`);
  };

  const handleRemoveFromSaved = (workout: IWorkout) => {
    setSaved(saved.filter((item) => item.id !== workout.id));
    toast.success(`${workout.name} removed from saved!`);
  };

  const getSortedList = (list: IWorkout[]) => {
    return [...list].sort((a, b) => {
      if (sortBy === "duration") return a.duration - b.duration;
      if (sortBy === "calories") return a.caloriesBurned - b.caloriesBurned;
      return b.rating - a.rating;
    });
  };

  const activeList = activeTab === "plan" ? plan : saved;
  const sortedList = getSortedList(activeList);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-heading font-bold uppercase">My Plan</h1>
        <p className="mt-2 text-base-content/70">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-2xl border border-base-300 bg-base-200 p-5">
          <Dumbbell className="h-8 w-8 text-primary" />
          <div>
            <p className="text-2xl font-bold">{totalExercises}</p>
            <p className="text-sm text-base-content/70">Exercises</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-base-300 bg-base-200 p-5">
          <Clock className="h-8 w-8 text-primary" />
          <div>
            <p className="text-2xl font-bold">{totalMinutes}</p>
            <p className="text-sm text-base-content/70">Minutes</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-base-300 bg-base-200 p-5">
          <Flame className="h-8 w-8 text-primary" />
          <div>
            <p className="text-2xl font-bold">{totalCalories}</p>
            <p className="text-sm text-base-content/70">Calories</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="tablist" className="tabs tabs-bordered">
          <button
            role="tab"
            className={`tab ${activeTab === "plan" ? "tab-active font-semibold text-primary" : ""}`}
            onClick={() => setActiveTab("plan")}
          >
            Today&apos;s Plan ({plan.length})
          </button>
          <button
            role="tab"
            className={`tab ${activeTab === "saved" ? "tab-active font-semibold text-primary" : ""}`}
            onClick={() => setActiveTab("saved")}
          >
            Saved ({saved.length})
          </button>
        </div>

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-2">
            Sort By: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
            <ChevronDown className="h-4 w-4" />
          </div>
          <ul tabIndex={0} role="menu" className="menu dropdown-content z-50 mt-2 w-44 rounded-xl border border-base-300 bg-base-200 p-2 shadow-lg">
            <li role="menuitem">
              <button onClick={() => setSortBy("duration")} className={sortBy === "duration" ? "active" : ""}>
                Duration
              </button>
            </li>
            <li role="menuitem">
              <button onClick={() => setSortBy("calories")} className={sortBy === "calories" ? "active" : ""}>
                Calories
              </button>
            </li>
            <li role="menuitem">
              <button onClick={() => setSortBy("rating")} className={sortBy === "rating" ? "active" : ""}>
                Rating
              </button>
            </li>
          </ul>
        </div>
      </div>

      {sortedList.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-base-300 bg-base-200 py-16 text-center">
          <Dumbbell className="h-12 w-12 text-base-content/30" />
          <h3 className="font-heading text-xl uppercase">Nothing here yet</h3>
          <p className="max-w-sm text-base-content/50">
            Browse the library and add a lift to get today moving.
          </p>
          <Link href="/" className="btn btn-accent rounded-2xl text-black">
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedList.map((workout) => (
            <div
              key={workout.id}
              className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-200 p-4 sm:flex-row sm:items-center"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={workout.image}
                  alt={workout.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-lg uppercase">{workout.name}</h3>
                <p className="text-sm text-base-content/60">{workout.equipment}</p>
                <div className="mt-1 flex flex-wrap gap-3 text-sm text-base-content/70">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-primary" /> {workout.duration} min
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Flame className="h-3.5 w-3.5 text-primary" /> {workout.caloriesBurned} kcal
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-primary" /> {workout.rating}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/exercise/${workout.id}`}
                  className="btn btn-outline btn-sm rounded-xl"
                >
                  View Details
                </Link>
                {activeTab === "plan" && (
                  <button
                    className="btn btn-accent btn-sm rounded-xl text-black"
                    onClick={() => handleMarkDone(workout)}
                  >
                    <CheckCircle className="h-4 w-4" /> Done
                  </button>
                )}
                <button
                  className="btn btn-ghost btn-sm rounded-xl"
                  onClick={() =>
                    activeTab === "plan"
                      ? handleRemoveFromPlan(workout)
                      : handleRemoveFromSaved(workout)
                  }
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPlan;
