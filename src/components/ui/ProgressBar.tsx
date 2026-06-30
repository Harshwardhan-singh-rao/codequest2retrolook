"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface ProgressBarProps {
  value: number;
  className?: string;
  showLabel?: boolean;
  color?: "primary" | "secondary" | "accent";
  animated?: boolean;
}

const colorMap = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
};

export function ProgressBar({
  value,
  className,
  showLabel = false,
  color = "primary",
  animated = true,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="mb-1.5 flex justify-between text-sm">
          <span className="text-text-secondary">Progress</span>
          <span className="font-medium text-text-primary">{clamped}%</span>
        </div>
      )}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-border">
        <motion.div
          className={cn("h-full rounded-full", colorMap[color])}
          initial={animated ? { width: 0 } : { width: `${clamped}%` }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
