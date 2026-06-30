"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  HiOutlineDocumentText,
  HiOutlineCalendar,
  HiOutlineBriefcase,
} from "react-icons/hi2";
import { quickActions } from "@/data/mock";
import { cn } from "@/utils/cn";

const actionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  resume: HiOutlineDocumentText,
  calendar: HiOutlineCalendar,
  jobs: HiOutlineBriefcase,
};

const colorMap: Record<string, string> = {
  resume: "bg-primary/10 text-primary hover:bg-primary/20",
  calendar: "bg-secondary/10 text-secondary hover:bg-secondary/20",
  jobs: "bg-accent/10 text-accent hover:bg-accent/20",
};

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="grid grid-cols-1 gap-3 sm:grid-cols-3"
    >
      {quickActions.map((action) => {
        const Icon = actionIcons[action.icon] ?? HiOutlineDocumentText;
        return (
          <Link
            key={action.id}
            href={action.href}
            className={cn(
              "flex items-center gap-3 rounded-card border border-border bg-card p-4 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover",
            )}
          >
            <div
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-button transition-colors",
                colorMap[action.icon],
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <span className="font-[family-name:var(--font-poppins)] font-semibold text-text-primary">
              {action.label}
            </span>
          </Link>
        );
      })}
    </motion.div>
  );
}
