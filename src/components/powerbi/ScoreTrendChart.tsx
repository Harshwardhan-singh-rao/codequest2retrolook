"use client";

import { HiOutlineChevronDown } from "react-icons/hi2";

export function ScoreTrendChart({ data }: { data: any[] }) {
  const maxScore = 100;
  // Map points to SVG coordinates (0 to 100 on Y axis, 0 to 100 on X axis)
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - (d.score / maxScore) * 100;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="flex flex-col h-full rounded-2xl bg-card p-6 shadow-sm border border-border/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-text-primary">Your Recent Score Trend</h3>
        <button className="flex items-center gap-1 text-xs font-bold text-text-secondary hover:text-text-primary transition-colors border border-border/20 rounded-lg px-2 py-1 bg-black/5 hover:bg-black/10">
          This Week <HiOutlineChevronDown className="h-3 w-3" />
        </button>
      </div>

      <div className="relative flex-1 flex">
        {/* Y-Axis Labels */}
        <div className="flex flex-col justify-between text-[10px] font-bold text-text-secondary h-[calc(100%-24px)] pr-4 pb-2">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0%</span>
        </div>

        <div className="relative flex-1">
          {/* Horizontal Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between pb-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-full border-t border-border/20 border-dashed" />
            ))}
          </div>

          {/* SVG Line Chart */}
          <div className="absolute inset-0 pb-6">
             <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
               {/* Area under the curve */}
               <path 
                 d={`M 0 100 L 0 ${100 - (data[0].score/maxScore)*100} L ${points.replace(/,/g, ' ')} L 100 100 Z`}
                 fill="url(#trendGrad)"
                 opacity="0.3"
               />
               <defs>
                 <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.8" />
                   <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                 </linearGradient>
               </defs>

               {/* Line */}
               <polyline
                 points={points}
                 fill="none"
                 stroke="#7C3AED"
                 strokeWidth="2"
                 vectorEffect="non-scaling-stroke"
                 strokeLinejoin="round"
                 strokeLinecap="round"
               />
             </svg>
             
             {/* Points (HTML Divs to avoid SVG stretching) */}
             {data.map((d, i) => {
               const x = (i / (data.length - 1)) * 100;
               const y = 100 - (d.score / maxScore) * 100;
               return (
                 <div
                   key={i}
                   className="absolute w-2.5 h-2.5 bg-white border-2 border-[#7C3AED] rounded-full hover:scale-150 transition-transform cursor-pointer"
                   style={{ left: `calc(${x}% - 5px)`, top: `calc(${y}% - 5px)` }}
                   title={`${d.day}: ${d.score}%`}
                 />
               );
             })}
          </div>

          {/* X-Axis Labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between">
            {data.map((d) => (
              <span key={d.day} className="text-[10px] font-bold text-text-secondary translate-x-[-50%] ml-[0%] first:translate-x-0 first:ml-0 last:translate-x-[0%]">
                {d.day}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
