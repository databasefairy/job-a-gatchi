import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import JobTable from "@/components/JobTable";
import AddJobModal from "@/components/AddJobModal";
import { useJobs } from "@/hooks/useJobs";
import Header from "@/components/Header";

const Jobs = () => {
  const [addOpen, setAddOpen] = useState(false);
  const { jobs, isLoading, addJob, updateJobStatus, deleteJob } = useJobs();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-pixel text-sm text-foreground">📋 Job Tracker</h1>
          <Button onClick={() => setAddOpen(true)} className="font-pixel text-xs gap-2" size="sm">
            <Plus className="h-4 w-4" />
            Add Job
          </Button>
        </div>
        {isLoading ? (
          <p className="text-center text-muted-foreground py-8">Loading...</p>
        ) : (
          <JobTable
            jobs={jobs}
            onStatusChange={(id, old, nw) => updateJobStatus.mutate({ id, oldStatus: old, newStatus: nw })}
            onDelete={(id) => deleteJob.mutate(id)}
          />
        )}
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

export default Jobs;
