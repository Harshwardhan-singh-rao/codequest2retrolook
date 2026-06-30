"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  HiOutlinePlay,
  HiOutlineMap,
  HiOutlineCalendar,
  HiOutlineDocumentText,
  HiOutlineBriefcase,
  HiOutlineFire,
} from "react-icons/hi2";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { currentUser, heroActions, progressStats } from "@/data/mock";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

const actionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  practice: HiOutlinePlay,
  map: HiOutlineMap,
  calendar: HiOutlineCalendar,
  resume: HiOutlineDocumentText,
  jobs: HiOutlineBriefcase,
};

export function HeroBanner({ className }: { className?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`relative overflow-hidden rounded-card bg-card p-6 sm:p-8 border border-border shadow-sm flex flex-col justify-center ${className || ""}`}
    >
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-2xl" />
      <div className="absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-secondary/15 blur-2xl" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-text-secondary">Your learning command center</p>
          <h1 className="mt-1 font-[family-name:var(--font-poppins)] text-2xl font-bold text-text-primary sm:text-3xl">
            {getGreeting()}, {currentUser.name.split(" ")[0]}
          </h1>
          <p className="mt-2 text-text-secondary">Choose your career path</p>

          <div className="mt-5 max-w-sm">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-text-secondary">{progressStats.overall}% complete</span>
              <button className="flex items-center gap-1 text-accent hover:underline">
                <HiOutlineFire className="h-4 w-4" />
                Start your streak
              </button>
            </div>
            <ProgressBar value={progressStats.overall} color="primary" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 lg:justify-end">
          {heroActions.map((action) => {
            const Icon = actionIcons[action.icon];
            return (
              <Link key={action.id} href={action.href}>
                <Button
                  variant={action.variant === "primary" ? "primary" : "outline"}
                  size="sm"
                  className={
                    action.variant === "outline"
                      ? "border-border bg-transparent text-text-primary hover:bg-hover"
                      : ""
                  }
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {action.label}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
