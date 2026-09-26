"use client";

import { useState } from "react";
import { IWorkout } from "../../types/workout.type";
import WorkoutCard from "../shared/WorkoutCard";

interface Props {
  workouts: IWorkout[];
}

const LibraryClient = ({ workouts }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWorkouts = workouts.filter((workout) => {
    const query = searchQuery.toLowerCase();
    const matchName = workout.name.toLowerCase().includes(query);
    const matchTags = workout.muscleGroups.some((tag) =>
      tag.toLowerCase().includes(query)
    );
    return matchName || matchTags;
  });

  return (
    <div className="space-y-6">
      <input
        type="text"
        placeholder="Search workouts by name or muscle group (e.g. Chest)..."
        className="input input-bordered w-full max-w-md bg-base-200"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {filteredWorkouts.length === 0 ? (
        <p className="py-10 text-center text-base-content/50">
          No workouts found matching &quot;{searchQuery}&quot;.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LibraryClient;
