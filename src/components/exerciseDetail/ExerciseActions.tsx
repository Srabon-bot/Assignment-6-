"use client";

import { useContext } from "react";
import { CalendarPlus, Bookmark } from "lucide-react";
import toast from "react-hot-toast";
import { PlanContext } from "../../context/PlanContext";
import { IWorkout } from "../../types/workout.type";

interface IExerciseActionsProps {
  workout: IWorkout;
}

const ExerciseActions = ({ workout }: IExerciseActionsProps) => {
  const { plan, setPlan, saved, setSaved } = useContext(PlanContext);

  const isInPlan = plan.some((item) => item.id === workout.id);
  const isSaved = saved.some((item) => item.id === workout.id);

  const handleAddToPlan = () => {
    if (isInPlan) {
      toast.error("Already in today's plan!");
      return;
    }
    setPlan([...plan, workout]);
    toast.success(`${workout.name} added to today's plan!`);
  };

  const handleSave = () => {
    if (isSaved) {
      toast.error("Already saved!");
      return;
    }
    setSaved([...saved, workout]);
    toast.success(`${workout.name} saved for later!`);
  };

  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
      <button
        onClick={handleAddToPlan}
        disabled={isInPlan}
        className="btn btn-accent rounded-2xl text-black"
      >
        <CalendarPlus className="h-5 w-5" />
        {isInPlan ? "Already in Plan" : "Add to today's plan"}
      </button>
      <button
        onClick={handleSave}
        disabled={isSaved}
        className="btn btn-outline rounded-2xl"
      >
        <Bookmark className="h-5 w-5" />
        {isSaved ? "Already Saved" : "Save for later"}
      </button>
    </div>
  );
};

export default ExerciseActions;
