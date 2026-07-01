"use client";

import { HiOutlinePlay } from "react-icons/hi2";
import { SiPowerbi } from "react-icons/si";
import { HiOutlineDatabase } from "react-icons/hi";

export function ContinuePracticeCard({ data }: { data: any }) {
  return (
    <div className="flex flex-col h-full rounded-2xl bg-card p-6 shadow-sm border border-border/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <h3 className="text-sm font-bold text-text-primary mb-6">Continue Practicing</h3>
      <div className="flex flex-col xl:flex-row gap-6 flex-1">
      
      {/* CSS Based Dashboard Mockup instead of an image */}
      <div className="relative w-full xl:w-72 h-48 bg-[#0F172A] rounded-xl overflow-hidden border border-[#1E293B] shadow-inner shrink-0 flex flex-col p-3">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
          </div>
          <div className="h-2 w-16 bg-white/10 rounded-full"></div>
        </div>

        {/* Dashboard KPIs */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {data.stats.map((stat: any, i: number) => (
             <div key={i} className="flex flex-col bg-white/5 rounded-md p-1.5 border border-white/5 text-center">
                <span className="text-[6px] text-white/50 mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis">{stat.label}</span>
                <span className="text-[10px] font-bold text-white tracking-tight">{stat.value}</span>
             </div>
          ))}
        </div>

        {/* Main Chart area */}
        <div className="flex-1 flex gap-2">
          {/* Line Chart Mock */}
          <div className="flex-1 bg-white/5 rounded-md border border-white/5 p-2 relative overflow-hidden">
             <span className="text-[6px] text-white/50 absolute top-2 left-2">Sales Over Time</span>
             <svg className="absolute bottom-0 left-0 w-full h-2/3" viewBox="0 0 100 40" preserveAspectRatio="none">
               <path d="M0 30 L 20 15 L 40 25 L 60 10 L 80 20 L 100 5 L 100 40 L 0 40 Z" fill="url(#grad)" />
               <path d="M0 30 L 20 15 L 40 25 L 60 10 L 80 20 L 100 5" stroke="#F43F5E" strokeWidth="1" fill="none"/>
               <defs>
                 <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.3" />
                   <stop offset="100%" stopColor="#F43F5E" stopOpacity="0" />
                 </linearGradient>
               </defs>
             </svg>
          </div>
          
          {/* Bar Chart Mock */}
          <div className="w-1/3 bg-white/5 rounded-md border border-white/5 p-2 relative flex flex-col justify-end gap-1">
             <span className="text-[6px] text-white/50 absolute top-2 left-2">Top Segments</span>
             <div className="w-full h-3/4 bg-[#7C3AED] rounded-sm"></div>
             <div className="w-full h-1/2 bg-[#7C3AED]/70 rounded-sm"></div>
             <div className="w-full h-1/4 bg-[#7C3AED]/40 rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Right side content */}
      <div className="flex flex-col justify-between py-1 flex-1">
        <div>
          <h2 className="text-xl font-bold text-text-primary mb-2">{data.title}</h2>
          <div className="flex items-center gap-2 text-text-secondary text-sm mb-6">
            <HiOutlineDatabase className="h-4 w-4" />
            <span>Dataset: <span className="font-medium text-text-primary">{data.dataset}</span></span>
          </div>

          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-bold text-text-secondary">Progress</span>
            <span className="font-bold text-text-primary">{data.progress}%</span>
          </div>
          <div className="h-2.5 w-full bg-black/10 rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-[#7C3AED] rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${data.progress}%` }} 
            />
          </div>
          <p className="text-xs text-text-secondary font-medium">Last practiced: {data.lastPracticed}</p>
        </div>

        <button className="flex w-fit items-center gap-2 rounded-xl bg-[#7C3AED] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#6D28D9] transition-colors shadow-sm hover:shadow-md mt-6">
          <HiOutlinePlay className="h-4 w-4 fill-white" />
          Continue Practice
        </button>
      </div>
      </div>
    </div>
  );
}
