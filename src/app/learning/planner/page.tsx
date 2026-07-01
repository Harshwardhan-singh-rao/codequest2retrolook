import { HiOutlinePlus } from "react-icons/hi2";
import { Button } from "@/components/ui/Button";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function LearningPlannerPage() {
  return (
    <div className="flex h-full flex-col gap-6">
      <div className="flex items-start justify-between">
        <Button size="sm" className="hidden sm:flex">
          <HiOutlinePlus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {DAYS.map((day, i) => (
          <div key={day} className="rounded-card border border-border bg-card p-4 shadow-sm hover:border-hover transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-text-primary">{day}</h3>
              <button className="text-text-secondary hover:text-text-primary">
                <HiOutlinePlus className="h-4 w-4" />
              </button>
            </div>
            
            <div className="space-y-3">
              {i === 0 ? (
                <div className="rounded-md border border-primary/30 bg-primary/10 p-3">
                  <p className="text-sm font-semibold text-primary">React Components Deep Dive</p>
                  <p className="text-xs text-primary/70 mt-1">2 hours estimated</p>
                </div>
              ) : i === 3 ? (
                <div className="rounded-md border border-secondary/30 bg-secondary/10 p-3">
                  <p className="text-sm font-semibold text-secondary">SQL Database Schema Design</p>
                  <p className="text-xs text-secondary/70 mt-1">1.5 hours estimated</p>
                </div>
              ) : i === 1 ? (
                <div className="rounded-md border border-accent/30 bg-accent/10 p-3">
                  <p className="text-sm font-semibold text-accent">Typing Practice Speedrun</p>
                  <p className="text-xs text-accent/70 mt-1">30 mins estimated</p>
                </div>
              ) : (
                <div className="flex h-20 items-center justify-center rounded-md border border-dashed border-border bg-hover/50">
                  <p className="text-xs italic text-text-secondary">No tasks assigned.</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
