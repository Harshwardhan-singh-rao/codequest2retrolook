"use client";

import { useState } from "react";
import { HiOutlineDocumentText, HiOutlineXMark } from "react-icons/hi2";
import Link from "next/link";

const INITIAL_SHOW = 5;

export function RecommendedExercises({ exercises }: { exercises: any[] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [detailExercise, setDetailExercise] = useState<any>(null);

  return (
    <>
      <div className="flex flex-col h-full bg-card p-6 rounded-2xl shadow-sm border border-border/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default overflow-hidden">
        <h3 className="text-sm font-bold text-text-primary mb-4">Recommended for You</h3>
        <div className="flex flex-col gap-3 flex-1 overflow-hidden">
          {exercises.slice(0, INITIAL_SHOW).map((exercise) => (
            <div key={exercise.id} className="flex flex-col gap-2 p-3 rounded-xl border border-border/20 hover:bg-black/5 transition-colors group shrink-0">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 shadow-inner group-hover:scale-105 transition-transform">
                  <HiOutlineDocumentText className="h-4 w-4" />
                </div>
                <div className="flex flex-col flex-1">
                  <h4 className="text-[12px] font-bold text-text-primary leading-tight">{exercise.title}</h4>
                  <p className="text-[10px] text-text-secondary mt-0.5 line-clamp-1">{exercise.description}</p>
                </div>
              </div>
              <div className="flex items-center flex-wrap gap-2 pl-11">
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${exercise.difficultyColor}`}>
                  {exercise.difficulty}
                </span>
                <span className="text-[9px] text-text-secondary font-medium whitespace-nowrap">{exercise.duration}</span>
                <span className="text-[9px] font-bold text-[#7C3AED] whitespace-nowrap">{exercise.xp}</span>
                <button
                  onClick={() => setDetailExercise(exercise)}
                  className="ml-auto bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[10px] font-bold px-3 py-1 rounded-lg transition-colors shadow-sm"
                >
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View More — opens modal */}
        {exercises.length > INITIAL_SHOW && (
          <button
            onClick={() => setModalOpen(true)}
            className="mt-3 flex items-center justify-center gap-1 text-[11px] font-bold text-[#7C3AED] hover:underline w-full py-1 rounded-lg hover:bg-[#7C3AED]/5 transition-colors"
          >
            View All Practice Datasets →
          </button>
        )}
      </div>

      {/* All Exercises Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setModalOpen(false)}>
          <div className="relative w-full max-w-xl mx-4 bg-card rounded-2xl shadow-2xl border border-border/40 p-6 max-h-[85vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-black text-text-primary">All Practice Datasets</h2>
              <button onClick={() => setModalOpen(false)} className="text-text-secondary hover:text-text-primary transition-colors">
                <HiOutlineXMark className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-col gap-3 overflow-y-auto hide-scrollbar pr-1">
              {exercises.map((exercise) => (
                <div key={exercise.id} className="flex flex-col gap-2 p-4 rounded-xl border border-border/20 hover:bg-black/5 transition-colors group">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 shadow-inner group-hover:scale-105 transition-transform">
                      <HiOutlineDocumentText className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col flex-1">
                      <h4 className="text-[13px] font-bold text-text-primary leading-tight">{exercise.title}</h4>
                      <p className="text-[11px] text-text-secondary mt-0.5">{exercise.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pl-13 flex-wrap">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${exercise.difficultyColor}`}>{exercise.difficulty}</span>
                    <span className="text-[10px] text-text-secondary font-medium">{exercise.duration}</span>
                    <span className="text-[10px] font-bold text-[#7C3AED]">{exercise.xp}</span>
                    <button
                      onClick={() => { setModalOpen(false); setDetailExercise(exercise); }}
                      className="ml-auto bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[10px] font-bold px-4 py-1.5 rounded-lg transition-colors shadow-sm"
                    >
                      Start
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Exercise Detail Modal */}
      {detailExercise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setDetailExercise(null)}>
          <div className="relative w-full max-w-md mx-4 bg-card rounded-2xl shadow-2xl border border-border/40 p-6" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setDetailExercise(null)} className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors">
              <HiOutlineXMark className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
                <HiOutlineDocumentText className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-base font-black text-text-primary leading-tight">{detailExercise.title}</h2>
                <p className="text-[11px] text-text-secondary mt-0.5">{detailExercise.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mb-5">
              <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${detailExercise.difficultyColor}`}>{detailExercise.difficulty}</span>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-black/5 text-text-secondary">⏱ {detailExercise.duration}</span>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#7C3AED]/10 text-[#7C3AED]">⭐ {detailExercise.xp}</span>
            </div>
            <div className="bg-black/5 rounded-xl p-4 mb-5">
              <h3 className="text-xs font-bold text-text-primary mb-2">What you'll practice:</h3>
              <ul className="space-y-1">
                <li className="text-[11px] text-text-secondary flex items-start gap-2"><span className="text-[#7C3AED]">•</span> Build and configure visual elements</li>
                <li className="text-[11px] text-text-secondary flex items-start gap-2"><span className="text-[#7C3AED]">•</span> Write DAX measures and calculated columns</li>
                <li className="text-[11px] text-text-secondary flex items-start gap-2"><span className="text-[#7C3AED]">•</span> Connect and transform data sources</li>
                <li className="text-[11px] text-text-secondary flex items-start gap-2"><span className="text-[#7C3AED]">•</span> Design an interactive report layout</li>
              </ul>
            </div>
            <Link
              href={`/practice-hub/power-bi/exercise/${detailExercise.id}`}
              className="flex items-center justify-center w-full gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-sm py-3 rounded-xl transition-colors shadow-sm"
            >
              Start Practice →
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
