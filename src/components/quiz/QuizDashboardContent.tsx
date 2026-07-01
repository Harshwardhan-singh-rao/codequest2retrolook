"use client";

import { motion } from "framer-motion";
import { HiOutlineMagnifyingGlass, HiOutlineBell } from "react-icons/hi2";
import {
  quizStats,
  quizOverallProgress,
  continueQuiz,
  quizQuickActions,
  todayQuizGoals,
  upcomingLiveQuizzes,
  weeklyQuizActivity,
  quizAchievements,
  recentQuizActivity,
} from "@/data/quizMock";

import { QuizStatCards } from "./QuizStatCards";
import { QuizProgressCard } from "./QuizProgressCard";
import { ContinueQuizCard } from "./ContinueQuizCard";
import { QuizQuickActions } from "./QuizQuickActions";
import { TodayGoals, UpcomingQuizzes, WeeklyActivityChart } from "./QuizActivityPanels";
import { QuizAchievements, RecentActivity } from "./QuizAchievementsPanel";

export function QuizDashboardContent() {
  return (
    <div className="flex h-full flex-col">
      {/* Header Area */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-text-primary tracking-tight">
            Good morning, Harsh 👋
          </h1>
          <p className="text-sm font-medium text-text-secondary mt-1">
            Let's continue your learning journey today.
          </p>
        </div>
      </header>

      {/* Main Dashboard Grid */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-6"
      >
        {/* Top Stats Row */}
        <QuizStatCards stats={quizStats} />

        {/* Second Row: Progress & Continue Learning */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <QuizProgressCard data={quizOverallProgress} />
          <ContinueQuizCard data={continueQuiz} />
        </div>

        {/* Third Row: Quick Actions */}
        <QuizQuickActions actions={quizQuickActions} />

        {/* Fourth Row: 3 Column Panels (Goals, Upcoming, Weekly) */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <TodayGoals goals={todayQuizGoals} />
          <UpcomingQuizzes quizzes={upcomingLiveQuizzes} />
          <WeeklyActivityChart data={weeklyQuizActivity} />
        </div>

        {/* Fifth Row: 2 Column Panels (Achievements, Recent Activity) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <QuizAchievements achievements={quizAchievements} />
          <RecentActivity activities={recentQuizActivity} />
        </div>
      </motion.div>
    </div>
  );
}
