"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { courses } from "@/data/mock";

export default function CoursesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Courses"
        description="Browse and continue your enrolled courses"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {courses.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card hover className="flex h-full flex-col">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-button bg-primary/10 font-[family-name:var(--font-poppins)] text-sm font-bold text-primary">
                  {course.thumbnail}
                </div>
                <Badge variant="primary">{course.category}</Badge>
              </div>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription className="mt-1">by {course.instructor}</CardDescription>
              <p className="mt-2 text-xs text-text-secondary">
                {course.completedLessons}/{course.lessons} lessons
              </p>
              <div className="my-4">
                <ProgressBar value={course.progress} showLabel color="primary" />
              </div>
              <Button variant="outline" size="sm" className="mt-auto w-full">
                Continue
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
