"use client";

import { useState } from "react";
import { HiOutlineDocumentText, HiOutlineCube, HiOutlineStar, HiOutlineShieldCheck, HiOutlineXMark } from "react-icons/hi2";
import { SiPython } from "react-icons/si";
import { HiOutlineDatabase } from "react-icons/hi";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  dashboard: HiOutlineDocumentText,
  cube: HiOutlineCube,
  database: HiOutlineDatabase,
  python: SiPython,
  hexagon: HiOutlineCube,
  star: HiOutlineStar,
  shield: HiOutlineShieldCheck,
};

const allActivity = [
  { id: "1", title: "Created Sales Analysis Dashboard", time: "2h ago", icon: "dashboard" },
  { id: "2", title: "Practiced DAX - Time Intelligence", time: "4h ago", icon: "cube" },
  { id: "3", title: "Executed SQL Query - Top 10 Customers", time: "Yesterday", icon: "database" },
  { id: "4", title: "Cleaned Data using Python (Pandas)", time: "Yesterday", icon: "python" },
  { id: "5", title: "Created Marketing Dashboard", time: "2 days ago", icon: "dashboard" },
  { id: "6", title: "Practiced DAX - Calendar Table", time: "2 days ago", icon: "cube" },
  { id: "7", title: "Ran SQL JOIN queries", time: "3 days ago", icon: "database" },
  { id: "8", title: "Transformed data with Power Query", time: "3 days ago", icon: "database" },
];

const allBadges = [
  { id: "1", title: "First Dashboard", icon: "hexagon", color: "text-[#7C3AED]", bg: "bg-[#7C3AED]/10", desc: "Created your first Power BI dashboard" },
  { id: "2", title: "Data Explorer", icon: "cube", color: "text-[#10B981]", bg: "bg-[#10B981]/10", desc: "Connected to 5+ different data sources" },
  { id: "3", title: "DAX Master", icon: "star", color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10", desc: "Written 20+ DAX expressions" },
  { id: "4", title: "Power Query Pro", icon: "shield", color: "text-[#3B82F6]", bg: "bg-[#3B82F6]/10", desc: "Transformed data in Power Query 10 times" },
  { id: "5", title: "Visualization Pro", icon: "hexagon", color: "text-[#EF4444]", bg: "bg-[#EF4444]/10", desc: "Used 8+ different chart types" },
  { id: "6", title: "SQL Expert", icon: "database", color: "text-[#06B6D4]", bg: "bg-[#06B6D4]/10", desc: "Completed 15+ SQL exercises" },
  { id: "7", title: "Python Guru", icon: "python", color: "text-[#F97316]", bg: "bg-[#F97316]/10", desc: "Cleaned data with Python 5 times" },
];

export function RecentActivityPanel({ activity, badges }: { activity: any[], badges: any[] }) {
  const [activityModalOpen, setActivityModalOpen] = useState(false);
  const [badgesModalOpen, setBadgesModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 bg-card p-6 rounded-2xl shadow-sm border border-border/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default">
        
        {/* Recent Activity */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-text-primary">Recent Activity</h3>
            <button onClick={() => setActivityModalOpen(true)} className="text-[10px] font-bold text-[#7C3AED] hover:underline">View All</button>
          </div>
          <div className="flex flex-col gap-4">
            {activity.map((item) => {
              const Icon = iconMap[item.icon] || HiOutlineDocumentText;
              return (
                <div key={item.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded bg-black/5 text-text-secondary group-hover:bg-[#7C3AED]/10 group-hover:text-[#7C3AED] transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold text-text-primary">{item.title}</span>
                  </div>
                  <span className="text-[10px] text-text-secondary font-medium">{item.time}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="hidden md:block w-px bg-border/20 self-stretch my-2"></div>

        {/* Badges Earned */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-text-primary">Badges Earned</h3>
            <button onClick={() => setBadgesModalOpen(true)} className="text-[10px] font-bold text-[#7C3AED] hover:underline">View All</button>
          </div>
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {badges.map((badge) => {
              const Icon = iconMap[badge.icon] || HiOutlineCube;
              return (
                <div key={badge.id} className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg shadow-inner ${badge.bg} group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-6 w-6 ${badge.color}`} />
                  </div>
                  <span className="text-[9px] font-bold text-text-primary text-center max-w-[50px] leading-tight">
                    {badge.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        
      </div>

      {/* Activity Modal */}
      {activityModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setActivityModalOpen(false)}>
          <div className="relative w-full max-w-lg mx-4 bg-card rounded-2xl shadow-2xl border border-border/40 p-6 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-black text-text-primary">All Recent Activity</h2>
              <button onClick={() => setActivityModalOpen(false)} className="text-text-secondary hover:text-text-primary transition-colors">
                <HiOutlineXMark className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {allActivity.map((item) => {
                const Icon = iconMap[item.icon] || HiOutlineDocumentText;
                return (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-black/5 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black/5 text-text-secondary group-hover:bg-[#7C3AED]/10 group-hover:text-[#7C3AED] transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-bold text-text-primary">{item.title}</span>
                    </div>
                    <span className="text-[10px] text-text-secondary font-medium shrink-0 ml-4">{item.time}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Badges Modal */}
      {badgesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setBadgesModalOpen(false)}>
          <div className="relative w-full max-w-lg mx-4 bg-card rounded-2xl shadow-2xl border border-border/40 p-6 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-black text-text-primary">All Badges Earned</h2>
              <button onClick={() => setBadgesModalOpen(false)} className="text-text-secondary hover:text-text-primary transition-colors">
                <HiOutlineXMark className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {allBadges.map((badge) => {
                const Icon = iconMap[badge.icon] || HiOutlineCube;
                return (
                  <div key={badge.id} className={`flex items-center gap-3 p-3 rounded-xl border border-border/20 hover:shadow-md transition-all ${badge.bg}`}>
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/50`}>
                      <Icon className={`h-5 w-5 ${badge.color}`} />
                    </div>
                    <div>
                      <p className="text-[11px] font-black text-text-primary">{badge.title}</p>
                      <p className="text-[9px] text-text-secondary leading-tight mt-0.5">{badge.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
