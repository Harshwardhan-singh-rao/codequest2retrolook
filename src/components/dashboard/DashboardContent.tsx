"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroBanner } from "@/components/dashboard/HeroBanner";
import { QuickStatCards } from "@/components/dashboard/QuickStatCards";
import { OverallProgressCard } from "@/components/dashboard/OverallProgressCard";
import {
  UpcomingClassesPanel,
  DeadlinesPanel,
  SyllabusOverviewCard,
  CareerReadinessCard,
} from "@/components/dashboard/DashboardPanels";
import { CalendarWidget } from "@/components/calendar/CalendarWidget";
import { DashboardSkeleton } from "@/components/ui/Skeleton";
import {
  statCards,
  progressStats,
  upcomingClassesList,
  deadlinesList,
  syllabusOverview,
  careerReadiness,
  careerReadinessOverall,
  calendarEvents,
  dayFocus,
} from "@/data/mock";

export function DashboardContent() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <DashboardSkeleton />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-6 xl:flex-row xl:items-stretch">
            <div className="min-w-0 flex-1">
              <HeroBanner className="h-full" />
            </div>
            <aside className="w-full shrink-0 xl:w-80">
              <div className="xl:sticky xl:top-24">
                <CalendarWidget events={calendarEvents} dayFocus={dayFocus} compact />
              </div>
            </aside>
          </div>
          
          <QuickStatCards cards={statCards} />
          <OverallProgressCard stats={progressStats} />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <UpcomingClassesPanel classes={upcomingClassesList} className="h-full" />
            <SyllabusOverviewCard syllabus={syllabusOverview} className="h-full" />
            <DeadlinesPanel deadlines={deadlinesList} className="h-full" />
            <CareerReadinessCard items={careerReadiness} overall={careerReadinessOverall} className="h-full" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
