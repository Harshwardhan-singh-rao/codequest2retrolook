"use client";

import { motion } from "framer-motion";

import {
  powerBiStats,
  continuePracticeData,
  scoreTrendData,
  practiceModes,
  practiceCategories,
  recommendedExercises,
  recentActivity,
  earnedBadges,
  dailyGoals
} from "@/data/powerbiMock";
import { PowerBiStatCards } from "./PowerBiStatCards";
import { ContinuePracticeCard } from "./ContinuePracticeCard";
import { ScoreTrendChart } from "./ScoreTrendChart";
import { PracticeModeCards } from "./PracticeModeCards";
import { PracticeCategories } from "./PracticeCategories";
import { RecommendedExercises } from "./RecommendedExercises";
import { RecentActivityPanel } from "./RecentActivityPanel";
import { DailyGoalPanel } from "./DailyGoalPanel";


export function PowerBiDashboardContent() {
  return (
    <div className="flex h-full flex-col">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col gap-6 pb-12"
      >
        <PowerBiStatCards stats={powerBiStats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ContinuePracticeCard data={continuePracticeData} />
          </div>
          <div className="lg:col-span-1">
            <ScoreTrendChart data={scoreTrendData} />
          </div>
        </div>

        <PracticeModeCards modes={practiceModes} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Categories + Daily Goal + Recent Activity */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <PracticeCategories categories={practiceCategories} />
            <DailyGoalPanel goal={dailyGoals} />
            <RecentActivityPanel activity={recentActivity} badges={earnedBadges} />
          </div>
          {/* Right Column: Recommended Exercises — stretches to match left column */}
          <div className="lg:col-span-1 h-full">
            <RecommendedExercises exercises={recommendedExercises} />
          </div>
        </div>

      </motion.div>
    </div>
  );
}
