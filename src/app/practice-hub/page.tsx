"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiOutlineCircleStack, HiOutlineCodeBracket, HiOutlineCommandLine } from "react-icons/hi2";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { practiceTypes } from "@/data/mock";

const icons = [HiOutlineCircleStack, HiOutlineCodeBracket, HiOutlineCommandLine];
const colors: Array<"primary" | "secondary" | "accent"> = ["secondary", "primary", "accent"];

export default function PracticeHubPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Practice Hub"
        description="Sharpen your skills with hands-on practice"
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {practiceTypes.map((practice, i) => {
          const Icon = icons[i];
          const progress = Math.round((practice.solved / practice.problems) * 100);
          return (
            <motion.div
              key={practice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card hover className="flex h-full flex-col">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-button bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <CardTitle>{practice.title}</CardTitle>
                <CardDescription className="mt-1">
                  {practice.solved}/{practice.problems} problems solved
                </CardDescription>
                <Badge variant="default" className="mt-3 w-fit">
                  {practice.difficulty}
                </Badge>
                <div className="my-4">
                  <ProgressBar value={progress} color={colors[i]} />
                </div>
                <Link href={`/practice-hub/${practice.id}`} className="mt-auto block w-full">
                  <Button className="w-full" size="sm">
                    Start Practice
                  </Button>
                </Link>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
