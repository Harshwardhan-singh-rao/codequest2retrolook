"use client";

import { HiOutlineChartBar, HiOutlineSquares2X2, HiOutlineSparkles, HiOutlineStar } from "react-icons/hi2";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  chart: HiOutlineChartBar,
  dashboard: HiOutlineSquares2X2,
  target: HiOutlineSparkles,
  star: HiOutlineStar,
};

export function PowerBiStatCards({ stats }: { stats: any[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = iconMap[stat.icon] || HiOutlineChartBar;
        
        return (
          <div
            key={stat.id}
            className="relative flex items-start gap-4 rounded-2xl bg-card p-6 shadow-sm border border-border/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden group"
          >
            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white shadow-inner ${stat.color}`}>
              <Icon className="h-7 w-7" />
            </div>
            <div className="flex flex-col z-10">
              <span className="text-xs font-bold text-text-secondary mb-1">
                {stat.title}
              </span>
              <span className="text-3xl font-black text-text-primary tracking-tight">
                {stat.value.replace('XP', '').trim()} 
                {stat.value.includes('XP') && <span className="text-sm font-bold ml-1 text-text-secondary">XP</span>}
              </span>
              <span className={`text-xs font-bold mt-1 ${stat.trendType === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.trend}
              </span>
            </div>

            {/* Sparkline decoration mimicking the screenshot */}
            <div className="absolute right-0 bottom-0 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
               <svg width="100" height="40" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 30 Q 15 10 30 25 T 60 15 T 100 5" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}
