"use client";

import { useQuizStats } from "@/context/QuizContext";

export function QuizProgressCard({ data }: { data: any }) {
  const { quizzesCompleted, totalQuizzesAvailable } = useQuizStats();

  const percentage = Math.round((quizzesCompleted / totalQuizzesAvailable) * 100);
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col rounded-2xl bg-card p-6 shadow-sm border border-border/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default">
      <h3 className="mb-6 text-sm font-bold text-text-primary">Overall Progress</h3>
      <div className="flex items-center gap-8">
        <div className="relative flex h-32 w-32 shrink-0 items-center justify-center">
          <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle
              className="text-black/5"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="50"
              cy="50"
            />
            <circle
              className="text-[#F59E0B] drop-shadow-md transition-all duration-1000 ease-out"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="50"
              cy="50"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-text-primary tracking-tighter">
              {percentage}%
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-text-secondary font-medium">You've completed</p>
          <p className="text-xl font-bold text-text-primary">
            {quizzesCompleted} / {totalQuizzesAvailable} <span className="text-base font-medium">{data.label}</span>
          </p>
          <p className="text-sm text-text-secondary mt-1">{data.subtext}</p>
          <p className="mt-2 text-sm font-bold text-green-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            {data.xpEarned}
          </p>
        </div>
      </div>
    </div>
  );
}
