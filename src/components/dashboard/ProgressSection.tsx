"use client";

import { motion } from "framer-motion";
import {
  HiOutlineTrophy,
  HiOutlineFire,
  HiOutlineCircleStack,
  HiOutlineStar,
} from "react-icons/hi2";
import type { ProgressStats } from "@/types";
import { Card, CardTitle } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/utils/cn";

const achievementIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  trophy: HiOutlineTrophy,
  fire: HiOutlineFire,
  database: HiOutlineCircleStack,
  sword: HiOutlineStar,
  star: HiOutlineStar,
};

export function ProgressSection({ stats }: { stats: ProgressStats }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      aria-label="Learning progress"
    >
      <h2 className="mb-4 font-[family-name:var(--font-poppins)] text-lg font-bold text-text-primary">
        Your Progress
      </h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2" hover>
          <CardTitle>Overall Progress</CardTitle>
          <div className="mt-4">
            <ProgressBar value={stats.overall} showLabel color="primary" />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-button bg-hover p-4 text-center">
              <p className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-primary">
                {stats.modulesCompleted}
              </p>
              <p className="text-xs text-text-secondary">Modules Done</p>
            </div>
            <div className="rounded-button bg-hover p-4 text-center">
              <p className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-secondary">
                {stats.totalModules}
              </p>
              <p className="text-xs text-text-secondary">Total Modules</p>
            </div>
            <div className="col-span-2 rounded-button bg-hover p-4 text-center sm:col-span-1">
              <p className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-accent">
                {stats.learningHours}h
              </p>
              <p className="text-xs text-text-secondary">Learning Hours</p>
            </div>
          </div>
        </Card>

        <Card hover>
          <CardTitle>Achievements</CardTitle>
          <ul className="mt-4 space-y-3">
            {stats.achievements.map((a) => {
              const Icon = achievementIcons[a.icon] ?? HiOutlineStar;
              return (
                <li
                  key={a.id}
                  className={cn(
                    "flex items-center gap-3 rounded-button p-2",
                    a.earned ? "bg-hover" : "opacity-40",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg",
                      a.earned ? "bg-accent/10 text-accent" : "bg-border text-text-secondary",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-text-primary">{a.title}</span>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </motion.section>
  );
}
