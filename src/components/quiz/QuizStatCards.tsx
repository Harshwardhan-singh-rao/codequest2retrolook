"use client";

import {
  HiOutlineBookOpen,
  HiOutlineStar,
  HiOutlineFire,
  HiOutlineCheckBadge,
} from "react-icons/hi2";
import { useQuizStats } from "@/context/QuizContext";

export function QuizStatCards({ stats }: { stats: any[] }) {
  const { quizzesCompleted, xp, level, streak, accuracy } = useQuizStats();

  // Create a live version of the stats array by merging context data
  const liveStats = [
    {
      ...stats[0],
      value: quizzesCompleted.toString(),
    },
    {
      ...stats[1],
      value: `${xp.toLocaleString()} XP`,
      subtext: `Level ${level.toString().padStart(2, "0")}`,
      progress: (xp % 150) / 1.5, // assuming 150 XP per level = 100%
    },
    {
      ...stats[2],
      value: `${streak} Days`,
    },
    {
      ...stats[3],
      value: `${accuracy}%`,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {liveStats.map((stat, i) => {
        const Icon = 
          i === 0 ? HiOutlineBookOpen :
          i === 1 ? HiOutlineStar :
          i === 2 ? HiOutlineFire :
          HiOutlineCheckBadge;

        return (
          <div
            key={stat.id}
            className="flex flex-col justify-between rounded-2xl bg-card p-5 shadow-sm border border-border/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default"
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow-inner ${stat.color}`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-text-secondary mb-1">
                  {stat.title}
                </span>
                <span className="text-2xl font-bold text-text-primary tracking-tight transition-all">
                  {stat.value}
                </span>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1.5 w-full">
                {stat.progress !== undefined ? (
                  <div className="w-full flex-1">
                    <span className="text-xs text-text-secondary font-medium">{stat.subtext}</span>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-black/10">
                      <div
                        className={`h-full rounded-full ${stat.color} transition-all duration-1000 ease-out`}
                        style={{ width: `${Math.min(100, Math.max(0, stat.progress))}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <span
                      className={`text-xs font-bold ${
                        stat.trend === "up" ? "text-green-500" : "text-text-secondary"
                      }`}
                    >
                      {stat.subtext}
                    </span>
                  </>
                )}
              </div>
              
              {/* Fake Sparkline/Decoration */}
              {stat.progress === undefined && (
                <svg width="40" height="20" viewBox="0 0 40 20" className="opacity-50 shrink-0 ml-2">
                  <path
                    d="M 0 15 Q 10 10 20 15 T 40 5"
                    fill="none"
                    stroke={stat.trend === "up" ? "currentColor" : "var(--color-border)"}
                    strokeWidth="2"
                    className={stat.trend === "up" ? "text-green-500" : ""}
                  />
                </svg>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
