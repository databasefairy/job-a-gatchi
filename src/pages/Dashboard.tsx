import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PetDisplay from "@/components/PetDisplay";
import AddJobModal from "@/components/AddJobModal";
import { useJobs } from "@/hooks/useJobs";
import { usePetState } from "@/hooks/usePetState";
import Header from "@/components/Header";

const Dashboard = () => {
  const [addOpen, setAddOpen] = useState(false);
  const { jobs, addJob } = useJobs();
  const pet = usePetState(jobs);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="flex flex-col items-center gap-8">
          <PetDisplay
            level={pet.level}
            mood={pet.mood}
            hungerPercent={pet.hungerPercent}
            growthPercent={pet.growthPercent}
            totalJobs={pet.totalJobs}
            hasInterview={pet.hasInterview}
            hasOffer={pet.hasOffer}
            isStarving={pet.isStarving}
          />
          <Button
            onClick={() => setAddOpen(true)}
            className="font-pixel text-xs gap-2"
            size="lg"
          >
            <Plus className="h-4 w-4" />
            Quick Add Job
          </Button>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-md">
            <StatCard label="Total Jobs" value={pet.totalJobs} emoji="📋" />
            <StatCard label="Growth Pts" value={pet.totalPoints} emoji="⭐" />
            <StatCard
              label="Last Fed"
              value={pet.daysSinceLastJob > 900 ? "Never" : `${pet.daysSinceLastJob}d ago`}
              emoji="🍖"
            />
          </div>
        </div>
      </main>
      <AddJobModal
        open={addOpen}
        onOpenChange={setAddOpen}
        onAdd={(job) => addJob.mutate(job)}
        isLoading={addJob.isPending}
      />
    </div>
  );
};

const StatCard = ({ label, value, emoji }: { label: string; value: string | number; emoji: string }) => (
  <div className="rounded-lg border border-border bg-card p-4 text-center">
    <p className="text-2xl mb-1">{emoji}</p>
    <p className="font-bold text-lg">{value}</p>
    <p className="font-pixel text-[8px] text-muted-foreground">{label}</p>
  </div>
);

export default Dashboard;
