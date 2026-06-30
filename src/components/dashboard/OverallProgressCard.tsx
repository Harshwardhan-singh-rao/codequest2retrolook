"use client";

import { motion } from "framer-motion";
import type { ProgressStats } from "@/types";
import { Card, CardTitle } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";

export function OverallProgressCard({ stats }: { stats: ProgressStats }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card hover className="p-6">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Overall progress</CardTitle>
          <span className="text-sm text-text-secondary">Program</span>
        </div>

        <p className="mb-3 font-[family-name:var(--font-poppins)] text-2xl font-bold text-text-primary">
          {stats.overall}%{" "}
          <span className="text-base font-normal text-text-secondary">course complete</span>
        </p>

        <ProgressBar value={stats.overall} color="primary" />

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
              Modules
            </p>
            <p className="mt-1 font-[family-name:var(--font-poppins)] text-xl font-bold text-text-primary">
              {stats.modulesCompleted}
              <span className="text-sm font-normal text-text-secondary">
                {" "}/ {stats.totalModules}
              </span>
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
              Catalog steps
            </p>
            <p className="mt-1 font-[family-name:var(--font-poppins)] text-xl font-bold text-text-primary">
              {stats.catalogSteps}
              <span className="text-sm font-normal text-text-secondary">
                {" "}/ {stats.totalCatalogSteps}
              </span>
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
