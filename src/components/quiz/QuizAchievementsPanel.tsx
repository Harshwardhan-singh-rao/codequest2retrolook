"use client";

import { useState } from "react";
import { HiOutlineCheckCircle, HiOutlineClock, HiOutlineDocumentText, HiOutlineEye } from "react-icons/hi2";
import { HiOutlineTrophy, HiOutlineFire, HiOutlineSparkles, HiOutlineStar } from "react-icons/hi2";
import { Modal } from "@/components/ui/Modal";

const badgeIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  badge1: HiOutlineStar,
  badge2: HiOutlineFire,
  badge3: HiOutlineCheckCircle,
  badge4: HiOutlineTrophy,
};

export function QuizAchievements({ achievements }: { achievements: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col rounded-2xl bg-card p-6 shadow-sm border border-border/40 h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-text-primary">Achievements</h3>
          <button onClick={() => setIsModalOpen(true)} className="text-xs font-bold text-[#F59E0B] hover:underline cursor-pointer relative z-10">View All</button>
        </div>
        <div className="grid grid-cols-4 gap-4 flex-1">
          {achievements.map((achievement) => {
            const Icon = badgeIconMap[achievement.icon] || HiOutlineSparkles;
            return (
              <div key={achievement.id} className="flex flex-col items-center gap-3">
                <div className={`flex h-16 w-16 items-center justify-center rounded-full ${achievement.bg} shadow-inner`}>
                  <Icon className={`h-8 w-8 ${achievement.color}`} />
                </div>
                <span className="text-[11px] font-bold text-text-primary text-center leading-tight">
                  {achievement.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="All Achievements">
        <div className="grid grid-cols-3 gap-6">
          {achievements.concat(achievements).map((achievement, i) => { // Duplicate for demo
            const Icon = badgeIconMap[achievement.icon] || HiOutlineSparkles;
            return (
              <div key={`${achievement.id}-${i}`} className="flex flex-col items-center gap-3 p-4 rounded-xl border border-border/20 hover:bg-black/5 transition-colors">
                <div className={`flex h-16 w-16 items-center justify-center rounded-full ${achievement.bg} shadow-inner`}>
                  <Icon className={`h-8 w-8 ${achievement.color}`} />
                </div>
                <span className="text-xs font-bold text-text-primary text-center leading-tight">
                  {achievement.title}
                </span>
                <span className="text-[10px] text-text-secondary text-center">Earned {i === 0 ? "today" : "last week"}</span>
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
}

const activityIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  success: HiOutlineCheckCircle,
  practice: HiOutlineClock,
  lesson: HiOutlineDocumentText,
  view: HiOutlineEye,
};

export function RecentActivity({ activities }: { activities: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col rounded-2xl bg-card p-6 shadow-sm border border-border/40 h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-text-primary">Recent Activity</h3>
          <button onClick={() => setIsModalOpen(true)} className="text-xs font-bold text-[#F59E0B] hover:underline cursor-pointer relative z-10">View All</button>
        </div>
        <div className="flex flex-col gap-4 flex-1 relative">
          {/* Timeline line */}
          <div className="absolute left-[11px] top-4 bottom-4 w-px bg-border/40" />
          
          {activities.map((activity) => {
            const Icon = activityIconMap[activity.type] || HiOutlineSparkles;
            let iconColor = "text-text-secondary";
            if (activity.type === "success") iconColor = "text-green-500";
            if (activity.type === "practice") iconColor = "text-blue-500";
            if (activity.type === "lesson") iconColor = "text-purple-500";
            if (activity.type === "view") iconColor = "text-[#F59E0B]";

            return (
              <div key={activity.id} className="relative z-10 flex items-start gap-4">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-card shadow-sm border border-border/40">
                  <Icon className={`h-3.5 w-3.5 ${iconColor}`} />
                </div>
                <div className="flex flex-col pt-0.5">
                  <span className="text-xs font-bold text-text-primary">{activity.title}</span>
                  <span className="text-[10px] font-medium text-text-secondary mt-0.5">{activity.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Complete Activity History">
        <div className="flex flex-col gap-4 relative">
          <div className="absolute left-[11px] top-4 bottom-4 w-px bg-border/40" />
          
          {activities.concat(activities).map((activity, i) => { // Duplicate for demo
            const Icon = activityIconMap[activity.type] || HiOutlineSparkles;
            let iconColor = "text-text-secondary";
            if (activity.type === "success") iconColor = "text-green-500";
            if (activity.type === "practice") iconColor = "text-blue-500";
            if (activity.type === "lesson") iconColor = "text-purple-500";
            if (activity.type === "view") iconColor = "text-[#F59E0B]";

            return (
              <div key={`${activity.id}-${i}`} className="relative z-10 flex items-start gap-4">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-card shadow-sm border border-border/40">
                  <Icon className={`h-3.5 w-3.5 ${iconColor}`} />
                </div>
                <div className="flex flex-col pt-0.5">
                  <span className="text-sm font-bold text-text-primary">{activity.title}</span>
                  <span className="text-[11px] font-medium text-text-secondary mt-0.5">{i < 4 ? activity.time : "Last Week"}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
}
