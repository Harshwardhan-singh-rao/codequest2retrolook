"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { assignments } from "@/data/mock";
import { cn } from "@/utils/cn";

const statusVariant: Record<string, "primary" | "accent" | "secondary"> = {
  "in-progress": "primary",
  pending: "accent",
  completed: "secondary",
};

export default function AssignmentsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Assignments"
        description="Track and submit your course assignments"
      />
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-text-secondary">
                <th className="pb-3 pr-4 font-medium">Assignment</th>
                <th className="pb-3 pr-4 font-medium">Course</th>
                <th className="pb-3 pr-4 font-medium">Due Date</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((a, i) => (
                <motion.tr
                  key={a.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-border last:border-0"
                >
                  <td className="py-4 pr-4 font-medium text-text-primary">{a.title}</td>
                  <td className="py-4 pr-4 text-text-secondary">{a.course}</td>
                  <td className="py-4 pr-4 text-text-secondary">{a.due}</td>
                  <td className="py-4 pr-4">
                    <Badge variant={statusVariant[a.status]}>
                      {a.status.replace("-", " ")}
                    </Badge>
                  </td>
                  <td className="py-4">
                    <Button
                      variant={a.status === "completed" ? "ghost" : "outline"}
                      size="sm"
                      disabled={a.status === "completed"}
                      className={cn(a.status === "completed" && "opacity-50")}
                    >
                      {a.status === "completed" ? "Submitted" : "Open"}
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
