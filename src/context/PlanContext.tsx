"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { IWorkout } from "../types/workout.type";

interface IPlanContext {
  plan: IWorkout[];
  setPlan: (plan: IWorkout[]) => void;
  saved: IWorkout[];
  setSaved: (saved: IWorkout[]) => void;
  isLoaded: boolean;
}

export const PlanContext = createContext<IPlanContext>({
  plan: [],
  setPlan: () => {},
  saved: [],
  setSaved: () => {},
  isLoaded: false,
});

const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [plan, setPlan] = useState<IWorkout[]>([]);
  const [saved, setSaved] = useState<IWorkout[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog_plan");
    const storedSaved = localStorage.getItem("fitlog_saved");
    
    if (storedPlan) setPlan(JSON.parse(storedPlan));
    if (storedSaved) setSaved(JSON.parse(storedSaved));
    
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog_plan", JSON.stringify(plan));
    }
  }, [plan, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog_saved", JSON.stringify(saved));
    }
  }, [saved, isLoaded]);

  const sharedData = {
    plan,
    setPlan,
    saved,
    setSaved,
    isLoaded,
  };

  return (
    <PlanContext.Provider value={sharedData}>
      {children}
    </PlanContext.Provider>
  );
};

export default PlanProvider;
