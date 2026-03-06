import { useMemo } from "react";
import { Database } from "@/integrations/supabase/types";

type Job = Database["public"]["Tables"]["jobs"]["Row"];

export type PetLevel = "kitten" | "blob" | "associate";
export type PetMood = "happy" | "neutral" | "sad" | "starving";

interface PetState {
  level: PetLevel;
  mood: PetMood;
  hungerPercent: number;
  growthPercent: number;
  totalJobs: number;
  totalPoints: number;
  daysSinceLastJob: number;
  hasInterview: boolean;
  hasOffer: boolean;
  isStarving: boolean;
}

export const usePetState = (jobs: Job[]): PetState => {
  return useMemo(() => {
    const totalJobs = jobs.length;
    const totalPoints = jobs.reduce((sum, j) => sum + j.points_contributed, 0);

    // Evolution level
    let level: PetLevel = "kitten";
    if (totalJobs >= 25) level = "associate";
    else if (totalJobs >= 10) level = "blob";

    // Days since last job
    let daysSinceLastJob = 999;
    if (jobs.length > 0) {
      const latest = jobs.reduce((a, b) =>
        new Date(a.created_at) > new Date(b.created_at) ? a : b
      );
      daysSinceLastJob = Math.floor(
        (Date.now() - new Date(latest.created_at).getTime()) / (1000 * 60 * 60 * 24)
      );
    }

    // Mood based on hunger
    let mood: PetMood = "happy";
    if (totalJobs === 0) mood = "neutral";
    else if (daysSinceLastJob >= 3) mood = "starving";
    else if (daysSinceLastJob >= 2) mood = "sad";

    // Hunger: 100% when just fed, decays over 3 days
    const hungerPercent = totalJobs === 0 ? 0 : Math.max(0, 100 - (daysSinceLastJob * 33));

    // Growth: based on status upgrades (points), max at ~200 points
    const growthPercent = Math.min(100, (totalPoints / 200) * 100);

    const hasInterview = jobs.some(j => j.status === "Interview");
    const hasOffer = jobs.some(j => j.status === "Offer");
    const isStarving = daysSinceLastJob >= 3;

    return { level, mood, hungerPercent, growthPercent, totalJobs, totalPoints, daysSinceLastJob, hasInterview, hasOffer, isStarving };
  }, [jobs]);
};
