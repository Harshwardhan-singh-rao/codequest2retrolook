"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  HiOutlineVideoCamera,
  HiOutlineClock,
  HiOutlineAcademicCap,
  HiOutlineBriefcase,
} from "react-icons/hi2";
import type { ClassItem, DeadlineItem, CareerReadinessItem, SyllabusOverview } from "@/types";
import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";

function EmptyState({
  icon: Icon,
  message,
}: {
  icon: React.ComponentType<{ className?: string }>;
  message: string;
}) {
  return (
    <div className="flex min-h-[140px] flex-col items-center justify-center rounded-button border border-dashed border-border bg-hover/50 p-6 text-center">
      <Icon className="mb-2 h-8 w-8 text-text-secondary/50" />
      <p className="text-sm text-text-secondary">{message}</p>
    </div>
  );
}

export function UpcomingClassesPanel({ classes, className }: { classes: ClassItem[]; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className={className}>
      <Card hover className="h-full flex flex-col">
        <CardTitle className="mb-4">Upcoming classes</CardTitle>
        {classes.length === 0 ? (
          <EmptyState icon={HiOutlineVideoCamera} message="No upcoming classes scheduled" />
        ) : (
          <ul className="space-y-3">
            {classes.map((cls) => (
              <li key={cls.id} className="rounded-button border border-border p-3">
                <p className="font-medium text-text-primary">{cls.title}</p>
                <p className="text-sm text-text-secondary">{cls.time}</p>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </motion.div>
  );
}

export function DeadlinesPanel({ deadlines, className }: { deadlines: DeadlineItem[]; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={className}>
      <Card hover className="h-full flex flex-col">
        <CardTitle className="mb-4">All deadlines</CardTitle>
        {deadlines.length === 0 ? (
          <EmptyState icon={HiOutlineClock} message="No deadlines set yet" />
        ) : (
          <ul className="space-y-3">
            {deadlines.map((d) => (
              <li key={d.id} className="flex items-center justify-between rounded-button border border-border p-3">
                <div>
                  <p className="font-medium text-text-primary">{d.title}</p>
                  {d.course && <p className="text-sm text-text-secondary">{d.course}</p>}
                </div>
                <span className="text-sm text-accent">{d.due}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </motion.div>
  );
}

export function SyllabusOverviewCard({ syllabus, className }: { syllabus: SyllabusOverview; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className={className}>
      <Card hover className="h-full flex flex-col justify-between">
        <div className="mb-4 flex items-center gap-2">
          <HiOutlineAcademicCap className="h-5 w-5 text-primary" />
          <CardTitle>Syllabus overview</CardTitle>
        </div>
        <p className="font-medium text-text-primary">{syllabus.title}</p>
        <div className="my-4">
          <ProgressBar value={syllabus.progress} showLabel color="primary" />
        </div>
        <Link href={syllabus.href}>
          <Button variant="outline" size="sm" className="w-full">
            {syllabus.cta}
          </Button>
        </Link>
      </Card>
    </motion.div>
  );
}

export function CareerReadinessCard({
  items,
  overall,
  className,
}: {
  items: CareerReadinessItem[];
  overall: number;
  className?: string;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className={className}>
      <Card hover className="h-full flex flex-col justify-between">
        <div className="mb-4 flex items-center gap-2">
          <HiOutlineBriefcase className="h-5 w-5 text-secondary" />
          <CardTitle>Career readiness</CardTitle>
        </div>

        <p className="mb-3 font-[family-name:var(--font-poppins)] text-xl font-bold text-text-primary">
          {overall}%
        </p>
        <ProgressBar value={overall} color="secondary" />

        <div className="mt-4 grid grid-cols-2 gap-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-button bg-hover p-3 text-center">
              <p className="text-xs text-text-secondary">{item.label}</p>
              <p className="font-[family-name:var(--font-poppins)] text-lg font-bold text-text-primary">
                {item.progress}%
              </p>
            </div>
          ))}
        </div>

        <Link href="/career" className="mt-4 block">
          <Button variant="secondary" size="sm" className="w-full">
            Explore jobs
          </Button>
        </Link>
      </Card>
    </motion.div>
  );
}
