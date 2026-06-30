"use client";

import { motion } from "framer-motion";
import {
  HiOutlinePlay,
  HiOutlineMap,
  HiOutlineSparkles,
} from "react-icons/hi2";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { currentUser, continueLearning, careerRoadmap } from "@/data/mock";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 gap-4 lg:grid-cols-3"
    >
      <Card className="relative overflow-hidden lg:col-span-2" hover>
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10" />
        <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-secondary/10" />
        <div className="relative">
          <div className="mb-2 flex items-center gap-2">
            <HiOutlineSparkles className="h-5 w-5 text-accent" />
            <Badge variant="primary">Welcome back</Badge>
          </div>
          <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-text-primary sm:text-3xl">
            {getGreeting()}, {currentUser.name}!
          </h2>
          <p className="mt-2 max-w-lg text-text-secondary">
            You&apos;re on a {currentUser.streak}-day learning streak. Keep up the momentum
            and you&apos;ll reach your career goals faster.
          </p>
        </div>
      </Card>

      <Card hover>
        <p className="mb-1 text-sm font-medium text-text-secondary">Continue Learning</p>
        <h3 className="font-[family-name:var(--font-poppins)] font-bold text-text-primary">
          {continueLearning.courseTitle}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">{continueLearning.lessonTitle}</p>
        <div className="mt-4">
          <ProgressBar value={continueLearning.progress} showLabel color="primary" />
        </div>
        <Button className="mt-4 w-full" size="sm">
          <HiOutlinePlay className="h-4 w-4" />
          Resume — {continueLearning.timeLeft} left
        </Button>
      </Card>

      <Card className="lg:col-span-3" hover>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <HiOutlineMap className="h-5 w-5 text-primary" />
              <p className="text-sm font-medium text-text-secondary">Career Roadmap</p>
            </div>
            <h3 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-text-primary">
              {careerRoadmap.currentRole} → {careerRoadmap.targetRole}
            </h3>
          </div>
          <Badge variant="accent">Step {careerRoadmap.currentStep + 1} of {careerRoadmap.steps.length}</Badge>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {careerRoadmap.steps.map((step, i) => (
            <span
              key={step}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                i <= careerRoadmap.currentStep
                  ? "bg-primary text-white"
                  : "bg-border text-text-secondary"
              }`}
            >
              {step}
            </span>
          ))}
        </div>
      </Card>
    </motion.section>
  );
}
