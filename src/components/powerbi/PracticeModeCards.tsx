"use client";

import { HiOutlineChartBar, HiOutlineArrowRight } from "react-icons/hi2";
import { SiPython } from "react-icons/si";
import { HiOutlineDatabase } from "react-icons/hi";
import Link from "next/link";

const modeIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  chart: HiOutlineChartBar,
  database: HiOutlineDatabase,
  python: SiPython,
};

export function PracticeModeCards({ modes }: { modes: any[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-bold text-text-primary">Practice by Mode</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {modes.map((mode) => {
          const Icon = modeIconMap[mode.icon] || HiOutlineChartBar;
          
          return (
            <div 
              key={mode.id} 
              className={`flex flex-col justify-between p-4 rounded-2xl bg-card shadow-sm border border-border/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ${mode.iconColor}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-bold text-text-primary text-sm">{mode.title}</h4>
                  <p className="text-[11px] text-text-secondary mt-1 font-medium">{mode.description}</p>
                </div>
              </div>
              
              <Link 
                href={`/practice-hub/${mode.id}`} 
                className={`mt-4 flex items-center justify-between px-4 py-2 rounded-xl text-xs font-bold text-white transition-colors shadow-sm w-fit self-end ${mode.buttonColor}`}
              >
                {mode.buttonText}
                <HiOutlineArrowRight className="h-3 w-3 ml-2" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
