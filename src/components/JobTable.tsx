import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Database } from "@/integrations/supabase/types";
import { Constants } from "@/integrations/supabase/types";
import { format } from "date-fns";

type Job = Database["public"]["Tables"]["jobs"]["Row"];
type JobStatus = Database["public"]["Enums"]["job_status"];

const STATUS_COLORS: Record<JobStatus, string> = {
  Applied: "text-muted-foreground",
  Screen: "text-accent-foreground",
  Interview: "text-primary",
  Offer: "text-primary",
  Rejected: "text-destructive",
};

interface JobTableProps {
  jobs: Job[];
  onStatusChange: (id: string, oldStatus: JobStatus, newStatus: JobStatus) => void;
  onDelete: (id: string) => void;
}

const JobTable = ({ jobs, onStatusChange, onDelete }: JobTableProps) => {
  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="font-pixel text-sm text-muted-foreground mb-2">No jobs yet!</p>
        <p className="text-sm text-muted-foreground">Add your first application to start feeding your pet 🐱</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-pixel text-[10px]">Company</TableHead>
            <TableHead className="font-pixel text-[10px]">Job Title</TableHead>
            <TableHead className="font-pixel text-[10px]">Date</TableHead>
            <TableHead className="font-pixel text-[10px]">Status</TableHead>
            <TableHead className="font-pixel text-[10px] w-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id} className="group">
              <TableCell className="font-medium">{job.company}</TableCell>
              <TableCell>{job.job_title}</TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {format(new Date(job.date_applied), "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                <Select
                  value={job.status}
                  onValueChange={(val) => onStatusChange(job.id, job.status, val as JobStatus)}
                >
                  <SelectTrigger className={`w-32 h-8 text-xs font-medium ${STATUS_COLORS[job.status]}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Constants.public.Enums.job_status.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => onDelete(job.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default JobTable;
