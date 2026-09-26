"use client";

import { useContext, useState } from "react";
import { Dumbbell, Clock, Flame, X, CheckCircle, ArrowDownAZ, ArrowUpZA } from "lucide-react";
import toast from "react-hot-toast";
import { PlanContext } from "../../context/PlanContext";
import { IWorkout } from "../../types/workout.type";

const MyPlan = () => {
  const { plan, setPlan, saved, setSaved } = useContext(PlanContext);
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

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
      if (sortOrder === "asc") return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });
  };

  const activeList = activeTab === "plan" ? plan : saved;
  const sortedList = getSortedList(activeList);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-heading font-bold uppercase">My Plan</h1>
        <p className="mt-2 text-base-content/70">
          Track today&apos;s workout plan and saved exercises.
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

        <button
          className="btn btn-ghost btn-sm gap-2"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          {sortOrder === "asc" ? (
            <><ArrowDownAZ className="h-4 w-4" /> A–Z</>
          ) : (
            <><ArrowUpZA className="h-4 w-4" /> Z–A</>
          )}
        </button>
      </div>

      {sortedList.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-base-300 bg-base-200 py-16 text-center">
          <Dumbbell className="h-12 w-12 text-base-content/30" />
          <p className="text-lg text-base-content/50">
            {activeTab === "plan"
              ? "No exercises in today's plan yet."
              : "No saved exercises yet."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedList.map((workout) => (
            <div
              key={workout.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-base-300 bg-base-200 p-4"
            >
              <div className="flex-1">
                <h3 className="font-heading text-lg">{workout.name}</h3>
                <div className="mt-1 flex flex-wrap gap-3 text-sm text-base-content/70">
                  <span>{workout.duration} min</span>
                  <span>{workout.caloriesBurned} kcal</span>
                  <span>{workout.difficulty}</span>
                </div>
              </div>
              <div className="flex gap-2">
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
