import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddJobModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (job: { company: string; job_title: string }) => void;
  isLoading: boolean;
}

const AddJobModal = ({ open, onOpenChange, onAdd, isLoading }: AddJobModalProps) => {
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ company, job_title: jobTitle });
    setCompany("");
    setJobTitle("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-2 border-primary/20">
        <DialogHeader>
          <DialogTitle className="font-pixel text-sm text-primary">🐱 Feed Your Pet!</DialogTitle>
          <DialogDescription>Add a new job application to keep your pet happy.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <Input
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. TechCorp"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Frontend Developer"
              required
            />
          </div>
          <Button type="submit" className="w-full font-pixel text-xs" disabled={isLoading}>
            {isLoading ? "Adding..." : "🍖 Feed Job to Pet"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddJobModal;
