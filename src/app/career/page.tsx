"use client";

import { motion } from "framer-motion";
import { HiOutlineBriefcase, HiOutlineMap } from "react-icons/hi2";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { CareerChart } from "@/components/charts/CareerChart";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { careerData, careerRoadmap } from "@/data/mock";

const jobListings = [
  { id: "1", title: "Frontend Developer", company: "TechCorp", match: 85 },
  { id: "2", title: "Full Stack Engineer", company: "StartupXYZ", match: 72 },
  { id: "3", title: "React Developer", company: "WebAgency", match: 90 },
];

export default function CareerPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Career"
        description="Track career readiness and explore job opportunities"
      />

      <Card hover>
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-button bg-primary/10 text-primary">
            <HiOutlineMap className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <CardTitle>
              {careerRoadmap.currentRole} → {careerRoadmap.targetRole}
            </CardTitle>
            <CardDescription className="mt-1">
              Step {careerRoadmap.currentStep + 1} of {careerRoadmap.steps.length} on your roadmap
            </CardDescription>
            <div className="mt-3 flex flex-wrap gap-2">
              {careerRoadmap.steps.map((step, i) => (
                <Badge
                  key={step}
                  variant={i <= careerRoadmap.currentStep ? "primary" : "default"}
                >
                  {step}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <CareerChart data={careerData} />

      <section>
        <h2 className="mb-4 font-[family-name:var(--font-poppins)] text-lg font-bold text-text-primary">
          Recommended Jobs
        </h2>
        <div className="space-y-3">
          {jobListings.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card hover className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <HiOutlineBriefcase className="h-5 w-5 text-text-secondary" />
                  <div>
                    <p className="font-medium text-text-primary">{job.title}</p>
                    <p className="text-sm text-text-secondary">{job.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">{job.match}% match</Badge>
                  <Button size="sm" variant="outline">Apply</Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
