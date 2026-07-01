"use client";

import { useState } from "react";
import { HiOutlineCheckCircle, HiCheckCircle, HiOutlineClock } from "react-icons/hi2";
import { SiReact } from "react-icons/si";
import { HiOutlineCircleStack } from "react-icons/hi2";
import { Modal } from "@/components/ui/Modal";

export function TodayGoals({ goals }: { goals: any[] }) {
  const [localGoals, setLocalGoals] = useState(goals);

  const toggleGoal = (id: string) => {
    setLocalGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g))
    );
  };

  return (
    <div className="flex flex-col rounded-2xl bg-card p-6 shadow-sm border border-border/40 h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-text-primary">Today's Goals</h3>
        <HiOutlineCheckCircle className="h-5 w-5 text-[#F59E0B]" />
      </div>
      <div className="flex flex-col gap-4 flex-1">
        {localGoals.map((goal) => (
          <button 
            key={goal.id} 
            className="flex items-center gap-3 text-left group"
            onClick={() => toggleGoal(goal.id)}
          >
            {goal.completed ? (
              <HiCheckCircle className="h-5 w-5 text-[#10B981] shrink-0" />
            ) : (
              <div className="h-4 w-4 shrink-0 rounded-sm border-2 border-border/60 ml-0.5 group-hover:border-[#F59E0B] transition-colors" />
            )}
            <span className={`text-sm font-medium transition-colors ${goal.completed ? 'text-text-secondary line-through' : 'text-text-primary group-hover:text-[#F59E0B]'}`}>
              {goal.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

const liveIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  react: SiReact,
  database: HiOutlineCircleStack,
};

export function UpcomingQuizzes({ quizzes }: { quizzes: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col rounded-2xl bg-card p-6 shadow-sm border border-border/40 h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-text-primary">Upcoming Classes</h3>
          <button onClick={() => setIsModalOpen(true)} className="text-xs font-bold text-[#F59E0B] hover:underline cursor-pointer relative z-10">View All</button>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          {quizzes.map((quiz) => {
            const Icon = liveIconMap[quiz.icon] || HiOutlineCircleStack;
            return (
              <div key={quiz.id} className="flex items-center gap-4 rounded-xl border border-border/20 p-3 hover:bg-black/5 transition-colors cursor-pointer">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${quiz.color}`}>
                  <Icon className={`h-6 w-6 ${quiz.iconColor}`} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-text-primary">{quiz.title}</span>
                  <div className="flex items-center gap-1 mt-1 text-text-secondary">
                    <HiOutlineClock className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium">{quiz.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="All Upcoming Classes">
        <div className="flex flex-col gap-4">
          {quizzes.concat(quizzes).map((quiz, i) => { // Duplicating for demo effect
            const Icon = liveIconMap[quiz.icon] || HiOutlineCircleStack;
            return (
              <div key={`${quiz.id}-${i}`} className="flex items-center gap-4 rounded-xl border border-border/20 p-3 hover:bg-black/5 transition-colors cursor-pointer">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${quiz.color}`}>
                  <Icon className={`h-6 w-6 ${quiz.iconColor}`} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-text-primary">{quiz.title}</span>
                  <div className="flex items-center gap-1 mt-1 text-text-secondary">
                    <HiOutlineClock className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium">{quiz.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
}

export function WeeklyActivityChart({ data }: { data: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const maxScore = Math.max(...data.map(d => d.score));

  return (
    <>
      <div className="flex flex-col rounded-2xl bg-card p-6 shadow-sm border border-border/40 h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-text-primary">Weekly Activity</h3>
          <button onClick={() => setIsModalOpen(true)} className="text-xs font-bold text-[#F59E0B] hover:underline cursor-pointer relative z-10">View All</button>
        </div>
        <div className="relative flex flex-1 items-end justify-between gap-2 pt-6">
          {/* Horizontal grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pb-8">
            <div className="w-full border-t border-border/20" />
            <div className="w-full border-t border-border/20" />
            <div className="w-full border-t border-border/20" />
          </div>
          
          {data.map((day) => {
            const heightPercent = (day.score / maxScore) * 100;
            return (
              <div key={day.day} className="relative z-10 flex flex-col items-center gap-2 group w-full">
                <div className="w-full flex justify-center h-32 items-end">
                  <div 
                    className="w-4 rounded-t-sm bg-[#F59E0B] transition-all duration-500 ease-out group-hover:bg-[#d97706] group-hover:w-5"
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-text-secondary uppercase">{day.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Detailed Weekly Report">
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">Here is a breakdown of your activity over the past week.</p>
          {data.map((day) => (
             <div key={day.day} className="flex items-center justify-between p-3 border border-border/20 rounded-xl">
               <span className="font-bold text-text-primary uppercase w-12">{day.day}</span>
               <div className="flex-1 mx-4 h-2 rounded-full bg-black/10 overflow-hidden">
                  <div className="h-full bg-[#F59E0B] rounded-full" style={{ width: `${(day.score / maxScore) * 100}%`}} />
               </div>
               <span className="text-sm font-bold text-[#F59E0B]">{day.score} XP</span>
             </div>
          ))}
        </div>
      </Modal>
    </>
  );
}
