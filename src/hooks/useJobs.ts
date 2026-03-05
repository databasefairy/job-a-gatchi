import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Database } from "@/integrations/supabase/types";
import { toast } from "sonner";

type Job = Database["public"]["Tables"]["jobs"]["Row"];
type JobInsert = Database["public"]["Tables"]["jobs"]["Insert"];
type JobStatus = Database["public"]["Enums"]["job_status"];

const STATUS_POINTS: Record<string, number> = {
  "Applied->Screen": 5,
  "Screen->Interview": 10,
  "Interview->Offer": 20,
  "Applied->Interview": 15,
  "Applied->Offer": 25,
};

export const useJobs = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const jobsQuery = useQuery({
    queryKey: ["jobs", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Job[];
    },
    enabled: !!user,
  });

  const addJob = useMutation({
    mutationFn: async (job: { company: string; job_title: string }) => {
      if (!user) throw new Error("Not authenticated");
      const { data, error } = await supabase
        .from("jobs")
        .insert({ ...job, user_id: user.id } as JobInsert)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("Job added! Your pet is happy! 🐱");
    },
    onError: (e) => toast.error(e.message),
  });

  const updateJobStatus = useMutation({
    mutationFn: async ({ id, oldStatus, newStatus }: { id: string; oldStatus: JobStatus; newStatus: JobStatus }) => {
      const key = `${oldStatus}->${newStatus}`;
      const points = STATUS_POINTS[key] || 5;
      const { data, error } = await supabase
        .from("jobs")
        .update({ status: newStatus, points_contributed: points })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("Status updated! Career growth! 📈");
    },
    onError: (e) => toast.error(e.message),
  });

  const deleteJob = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("jobs").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("Job removed");
    },
    onError: (e) => toast.error(e.message),
  });

  return { jobs: jobsQuery.data ?? [], isLoading: jobsQuery.isLoading, addJob, updateJobStatus, deleteJob };
};
