"use client";

import Link from "next/link";
import { HiOutlinePlay } from "react-icons/hi2";
import { SiReact } from "react-icons/si";
import { useQuizStats } from "@/context/QuizContext";

export function ContinueQuizCard({ data }: { data: any }) {
  const { completeQuiz } = useQuizStats();

  const handleComplete = (e: React.MouseEvent) => {
    // Simulate finishing a lesson/quiz: adds 15 XP and assumes 90% accuracy
    completeQuiz(15, 0.9);
    // Don't prevent default so it still navigates if we wanted, 
    // or just let it navigate naturally. Since it's a Link, it will navigate.
  };

  return (
    <div className="flex flex-col rounded-2xl bg-card p-6 shadow-sm border border-border/40 justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <h3 className="mb-4 text-sm font-bold text-text-primary">Continue Learning</h3>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#0F172A] shadow-inner">
          <SiReact className="h-8 w-8 text-[#38BDF8]" />
        </div>
        <div className="flex flex-col">
          <h4 className="text-lg font-bold text-text-primary">{data.courseTitle}</h4>
          <p className="text-sm text-text-secondary mt-1">{data.lessonTitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/10">
          <div
            className="h-full rounded-full bg-[#F59E0B]"
            style={{ width: `${data.progress}%` }}
          />
        </div>
        <span className="text-xs font-bold text-text-secondary">{data.progress}%</span>
      </div>

      <Link
        href="/practice-hub/quiz"
        onClick={handleComplete}
        className="flex w-fit items-center gap-2 rounded-xl bg-[#F59E0B] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#d97706] transition-colors shadow-sm hover:shadow-md"
      >
        <HiOutlinePlay className="h-4 w-4 fill-white" />
        Continue
      </Link>
    </div>
  );
}
