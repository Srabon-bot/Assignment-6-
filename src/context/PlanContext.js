"use client";

import { createContext, useState, useEffect } from "react";

export const PlanContext = createContext({
  plan: [],
  setPlan: () => {},
  saved: [],
  setSaved: () => {},
});

const PlanProvider = ({ children }) => {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
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
  };

  return (
    <PlanContext.Provider value={sharedData}>
      {children}
    </PlanContext.Provider>
  );
};

export default PlanProvider;
