"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Dumbbell, Clock, Flame, Star, X, CheckCircle, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import { PlanContext } from "../../context/PlanContext";
import { IWorkout } from "../../types/workout.type";

const MyPlan = () => {
  const { plan, setPlan, saved, setSaved, isLoaded } = useContext(PlanContext);
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">("duration");
  const [searchQuery, setSearchQuery] = useState("");

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <span className="ml-3 text-lg">Loading workouts…</span>
      </div>
    );
  }

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

  const filteredList = sortedList.filter((workout) => {
    const query = searchQuery.toLowerCase();
    const matchName = workout.name.toLowerCase().includes(query);
    const matchTags = workout.muscleGroups.some((tag) =>
      tag.toLowerCase().includes(query)
    );
    return matchName || matchTags;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-heading font-bold uppercase">My Plan</h1>
        <p className="mt-2 text-base-content/70">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 rounded-2xl border border-base-300 bg-base-200 py-16 px-8">


        <div className="border-r border-base-300">
          <p className="text-sm text-base-content/70">Exercises</p>
          <p className="text-[38px] font-bold text-primary">{totalExercises}</p>
        </div>



        <div className="border-r border-base-300">
          <p className="text-sm text-base-content/70">Minutes</p>
          <p className="text-[38px] font-bold">{totalMinutes}</p>
        </div>


        <div>
          <p className="text-sm text-base-content/70">Calories</p>
          <p className="text-[38px] font-bold">{totalCalories}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 ">
        <div className="tabs tabs-box rounded-full border border-base-300 bg-base-200 p-1">
          <input
            type="radio"
            name="my_plan_tabs"
            className="tab rounded-full font-medium text-base-content/60 checked:bg-[#20252e] checked:text-base-content [--tab-bg:transparent] [--tab-border-color:transparent]"
            aria-label={`Today's Plan`}
            checked={activeTab === "plan"}
            onChange={() => setActiveTab("plan")}
          />
          <input
            type="radio"
            name="my_plan_tabs"
            className="tab rounded-full font-medium text-base-content/60 checked:bg-[#20252e] checked:text-base-content [--tab-bg:transparent] [--tab-border-color:transparent]"
            aria-label={`Saved`}
            checked={activeTab === "saved"}
            onChange={() => setActiveTab("saved")}
          />
        </div>

        <div className="flex gap-2 ">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Search list..."
              className="input input-bordered input-sm w-full max-w-xs bg-base-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex items-center gap-2">
              <span className="text-sm text-base-content/60 whitespace-nowrap">
                Sort By
              </span>

              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-sm gap-2 rounded-full border border-base-300 bg-base-200 px-4 font-normal normal-case"
                >
                  {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                  <ChevronDown className="h-4 w-4 opacity-60" />
                </div>
                <ul
                  tabIndex={0}
                  role="menu"
                  className="menu dropdown-content z-50 mt-2 w-44 rounded-xl border border-base-300 bg-base-200 p-2 shadow-lg"
                >
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
          </div>
        </div>
      </div>


      {filteredList.length === 0 ? (
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
          {filteredList.map((workout) => (
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
                    <CheckCircle className="h-4 w-4" /> Mark as Done
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
