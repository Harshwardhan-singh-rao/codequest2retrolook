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

import { useEffect, useState } from "react";

export function HeroBanner({ className }: { className?: string }) {
  const [userName, setUserName] = useState(currentUser.name.split(" ")[0]);

  useEffect(() => {
    const storedName = sessionStorage.getItem("cq_user_name");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`relative overflow-hidden rounded-card bg-card p-6 sm:p-8 border border-border shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover flex flex-col justify-center ${className || ""}`}
    >
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-2xl" />
      <div className="absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-secondary/15 blur-2xl" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-text-secondary">Your learning command center</p>
          <h1 className="mt-1 font-[family-name:var(--font-poppins)] text-2xl font-bold text-text-primary sm:text-3xl">
            {getGreeting()}, {userName}
          </h1>
          <p className="mt-2 text-text-secondary">Choose your career path</p>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="flex-1 w-full max-w-sm">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="text-xs font-bold text-text-primary uppercase tracking-wider">Overall Progress</span>
                <span className="text-sm font-extrabold text-primary">{progressStats.overall}%</span>
              </div>
              <ProgressBar value={progressStats.overall} color="primary" />
            </div>
            
            <div className="h-10 w-px bg-border hidden sm:block mx-2"></div>
            
            <button className="group relative flex items-center gap-3 rounded-2xl bg-orange-500/10 px-4 py-2.5 transition-all hover:bg-orange-500/20 border border-orange-500/20 w-fit">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-500/30 transition-transform group-hover:scale-110">
                <HiOutlineFire className="h-5 w-5" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600/80">Daily Goal</span>
                <span className="text-sm font-bold text-orange-600">Start Streak</span>
              </div>
            </button>
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
