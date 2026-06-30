"use client";

import { motion } from "framer-motion";
import {
  HiOutlineVideoCamera,
  HiOutlineClock,
  HiOutlineCircleStack,
  HiOutlineCodeBracket,
  HiOutlineCommandLine,
} from "react-icons/hi2";
import type { DashboardWidget } from "@/types";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/utils/cn";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  video: HiOutlineVideoCamera,
  deadline: HiOutlineClock,
  database: HiOutlineCircleStack,
  code: HiOutlineCodeBracket,
  keyboard: HiOutlineCommandLine,
};

const colorStyles = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  accent: "bg-accent/10 text-accent",
};

export function WidgetCard({ widget, index }: { widget: DashboardWidget; index: number }) {
  const Icon = iconMap[widget.icon] ?? HiOutlineCodeBracket;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
    >
      <Card hover className="flex h-full flex-col">
        <div className="mb-4 flex items-start justify-between">
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-button",
              colorStyles[widget.color],
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <CardTitle>{widget.title}</CardTitle>
        <CardDescription className="mt-1 flex-1">{widget.description}</CardDescription>
        {widget.progress > 0 && (
          <div className="my-4">
            <ProgressBar value={widget.progress} color={widget.color} />
          </div>
        )}
        <Button variant="outline" size="sm" className="mt-auto w-full">
          {widget.cta}
        </Button>
      </Card>
    </motion.div>
  );
}

export function WidgetGrid({ widgets }: { widgets: DashboardWidget[] }) {
  return (
    <section aria-label="Dashboard widgets">
      <h2 className="mb-4 font-[family-name:var(--font-poppins)] text-lg font-bold text-text-primary">
        Your Activities
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {widgets.map((widget, i) => (
          <WidgetCard key={widget.id} widget={widget} index={i} />
        ))}
      </div>
    </section>
  );
}
