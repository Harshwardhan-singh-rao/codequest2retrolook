"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiOutlineArrowLeft, HiOutlineCode, HiOutlineGlobeAlt } from "react-icons/hi2";
import { SiPython, SiJavascript, SiReact } from "react-icons/si";
import { HiOutlineCircleStack } from "react-icons/hi2";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  python: SiPython,
  database: HiOutlineCircleStack,
  react: SiReact,
  html: HiOutlineGlobeAlt,
  js: SiJavascript,
  default: HiOutlineCode,
};

export function QuizCategorySelector({ categories }: { categories: any[] }) {
  return (
    <div className="flex h-full flex-col">
      <header className="mb-8 flex flex-col gap-4">
        <Link 
          href="/quiz" 
          className="flex w-fit items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
        >
          <HiOutlineArrowLeft className="h-4 w-4" />
          Back to Quiz Dashboard
        </Link>
        <div>
          <h1 className="text-2xl font-black text-text-primary tracking-tight">
            Choose your quiz topic
          </h1>
          <p className="text-sm font-medium text-text-secondary mt-1">
            Select a subject below to test your knowledge and earn XP.
          </p>
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {categories.map((category) => {
          const Icon = iconMap[category.icon] || iconMap.default;
          return (
            <div
              key={category.id}
              className="group flex flex-col justify-between rounded-2xl bg-card p-6 shadow-sm border border-border/40 hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl shadow-inner ${category.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-black/5 ${
                    category.difficulty === "Beginner" ? "text-green-600" :
                    category.difficulty === "Intermediate" ? "text-orange-500" : "text-red-500"
                  }`}>
                    {category.difficulty}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary">{category.title}</h3>
                  <p className="text-sm font-medium text-text-secondary mt-1 line-clamp-2">
                    {category.description}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs font-bold text-text-secondary">
                  <span>{category.questions} Questions</span>
                  <span>🏆 XP inside</span>
                </div>
                <Link
                  href={`/practice-hub/quiz`}
                  className="w-full rounded-xl bg-[#0F172A] py-2.5 text-center text-sm font-bold text-white transition-colors hover:bg-black shadow-sm"
                >
                  Start Topic
                </Link>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
