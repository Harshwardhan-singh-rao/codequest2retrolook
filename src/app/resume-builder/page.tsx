"use client";

import { motion } from "framer-motion";
import { HiOutlineCheckCircle, HiOutlineDocumentText } from "react-icons/hi2";
import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { resumeSections } from "@/data/mock";
import { cn } from "@/utils/cn";

export default function ResumeBuilderPage() {
  const completed = resumeSections.filter((s) => s.completed).length;
  const progress = Math.round((completed / resumeSections.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2" hover>
          <CardTitle>Resume Preview</CardTitle>
          <div className="mt-4 rounded-card border border-border bg-hover p-8">
            <div className="mx-auto max-w-md space-y-4">
              <div className="border-b border-border pb-4 text-center">
                <h3 className="font-[family-name:var(--font-poppins)] text-xl font-bold text-text-primary">
                  Harshwardhan
                </h3>
                <p className="text-sm text-text-secondary">Full Stack Developer</p>
                <p className="text-xs text-text-secondary">harsh@codequest.dev</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-primary">Education</h4>
                <p className="text-sm text-text-secondary">B.Tech Computer Science</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-primary">Skills</h4>
                <p className="text-sm text-text-secondary">
                  React, Next.js, Node.js, TypeScript, MongoDB
                </p>
              </div>
              <div className="opacity-40">
                <h4 className="text-sm font-semibold text-primary">Experience</h4>
                <p className="text-sm text-text-secondary italic">Not yet added</p>
              </div>
            </div>
          </div>
          <Button className="mt-4">Download PDF</Button>
        </Card>

        <Card hover>
          <CardTitle>Sections</CardTitle>
          <div className="mb-4 mt-2">
            <ProgressBar value={progress} showLabel color="secondary" />
          </div>
          <ul className="space-y-2">
            {resumeSections.map((section) => (
              <li
                key={section.id}
                className={cn(
                  "flex items-center justify-between rounded-button p-3",
                  section.completed ? "bg-hover" : "border border-dashed border-border",
                )}
              >
                <div className="flex items-center gap-2">
                  <HiOutlineDocumentText className="h-4 w-4 text-text-secondary" />
                  <span className="text-sm font-medium text-text-primary">{section.title}</span>
                </div>
                {section.completed && (
                  <HiOutlineCheckCircle className="h-5 w-5 text-secondary" />
                )}
              </li>
            ))}
          </ul>
          <Button variant="outline" className="mt-4 w-full" size="sm">
            Edit Sections
          </Button>
        </Card>
      </div>
    </motion.div>
  );
}
