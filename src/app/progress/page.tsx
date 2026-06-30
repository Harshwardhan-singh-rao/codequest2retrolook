"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProgressSection } from "@/components/dashboard/ProgressSection";
import { ProgressChart } from "@/components/charts/ProgressChart";
import { CareerChart } from "@/components/charts/CareerChart";
import { progressStats, learningActivity, careerData } from "@/data/mock";

export default function ProgressPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Progress"
        description="Detailed view of your learning journey"
      />
      <ProgressSection stats={progressStats} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ProgressChart data={learningActivity} />
        <CareerChart data={careerData} />
      </div>
    </motion.div>
  );
}
