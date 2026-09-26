import { IWorkout } from "../../types/workout.type";
import LibraryClient from "./LibraryClient";

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
        <h2 className="text-3xl font-heading font-bold uppercase">The Library</h2>
        <p className="mt-2 text-base-content/70">
          Twelve lifts covering every major muscle group.
        </p>
      </div>
      <LibraryClient workouts={workouts} />
    </section>
  );
};

export default Library;
