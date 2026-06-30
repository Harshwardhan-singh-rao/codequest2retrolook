"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { courses } from "@/data/mock";

export default function LearningPage() {
  const inProgress = courses.filter((c) => c.progress > 0 && c.progress < 100);
  const completed = courses.filter((c) => c.progress === 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Learning"
        description="Your active learning paths and completed courses"
      />
      <div className="space-y-6">
        <section>
          <h2 className="mb-3 font-[family-name:var(--font-poppins)] text-lg font-bold text-text-primary">
            In Progress
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {inProgress.map((course) => (
              <Card key={course.id} hover>
                <div className="flex items-start justify-between">
                  <CardTitle>{course.title}</CardTitle>
                  <Badge variant="primary">{course.category}</Badge>
                </div>
                <CardDescription className="mt-1">
                  {course.completedLessons}/{course.lessons} lessons
                </CardDescription>
                <div className="mt-3">
                  <ProgressBar value={course.progress} showLabel />
                </div>
              </Card>
            ))}
          </div>
        </section>

        {completed.length > 0 && (
          <section>
            <h2 className="mb-3 font-[family-name:var(--font-poppins)] text-lg font-bold text-text-primary">
              Completed
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {completed.map((course) => (
                <Card key={course.id} hover>
                  <CardTitle>{course.title}</CardTitle>
                  <Badge variant="secondary" className="mt-2">Completed</Badge>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </motion.div>
  );
}
