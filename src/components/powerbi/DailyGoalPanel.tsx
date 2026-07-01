"use client";

import { HiCheck, HiOutlineFire } from "react-icons/hi2";

export function DailyGoalPanel({ goal }: { goal: any }) {
  const progressPercent = (goal.completed / goal.total) * 100;

  return (
    <div className="flex items-stretch gap-4 bg-card p-5 rounded-2xl shadow-sm border border-border/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default">
      
      {/* Left: Goal info */}
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-text-primary">Daily Goal</h3>
          <span className="text-[10px] font-bold text-[#F59E0B]">🔥 {goal.completed}/{goal.total} Completed</span>
        </div>
        
        <div className="h-1.5 w-full bg-black/10 rounded-full overflow-hidden">
          <div className="h-full bg-[#F59E0B] rounded-full transition-all duration-700" style={{ width: `${progressPercent}%` }} />
        </div>

        <div className="flex flex-col gap-2">
          {goal.tasks.map((task: any) => (
            <div key={task.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`flex h-4 w-4 items-center justify-center rounded-sm border flex-shrink-0 ${task.isCompleted ? 'bg-[#10B981] border-[#10B981]' : 'border-border/60'}`}>
                  {task.isCompleted && <HiCheck className="h-3 w-3 text-white" />}
                </div>
                <span className={`text-[11px] font-semibold ${task.isCompleted ? 'text-text-primary' : 'text-text-secondary'}`}>
                  {task.title}
                </span>
              </div>
              <span className="text-[10px] text-text-secondary ml-4 shrink-0">{task.progress}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Motivational badge */}
      <div className="flex flex-col items-center justify-center px-4 py-3 bg-black/5 rounded-xl border border-border/20 shrink-0 min-w-[120px]">
        <HiOutlineFire className="h-7 w-7 text-[#F59E0B] mb-1.5" />
        <span className="text-[11px] font-black text-text-primary">Great going!</span>
        <span className="text-[9px] text-text-secondary text-center leading-tight mt-1">Keep practicing<br/>to achieve your goals. 🚀</span>
      </div>
      
    </div>
  );
}
