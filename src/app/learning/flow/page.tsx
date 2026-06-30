"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiOutlineArrowLeft, HiOutlineCheck, HiOutlineLockClosed } from "react-icons/hi2";
import { PageHeader } from "@/components/layout/PageHeader";

const flowNodes = [
  { id: 1, title: "HTML & CSS Fundamentals", type: "completed", description: "Learn the building blocks of the web." },
  { id: 2, title: "JavaScript Basics", type: "completed", description: "Variables, loops, functions, and DOM manipulation." },
  { id: 3, title: "React Components", type: "active", description: "State, props, hooks, and component lifecycle." },
  { id: 4, title: "Next.js App Router", type: "locked", description: "Server components, routing, and data fetching." },
  { id: 5, title: "Database & SQL", type: "locked", description: "Postgres, schema design, and ORMs." },
];

export default function FlowPathPage() {
  return (
    <div className="flex h-full flex-col gap-6">
      <Link 
        href="/" 
        className="flex w-fit items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
      >
        <HiOutlineArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>
      
      <PageHeader
        title="Your Flow Path"
        description="Your personalized learning journey to become a Full Stack Engineer."
      />

      <div className="relative mx-auto mt-8 flex w-full max-w-3xl flex-col items-center">
        {/* Vertical Line connecting nodes */}
        <div className="absolute left-[27px] top-4 h-[calc(100%-4rem)] w-1 bg-white/10 sm:left-1/2 sm:-ml-[2px]" />

        {flowNodes.map((node, i) => {
          const isCompleted = node.type === "completed";
          const isActive = node.type === "active";
          const isLocked = node.type === "locked";

          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className={`relative mb-12 flex w-full items-center ${
                i % 2 === 0 ? "sm:flex-row-reverse" : "sm:flex-row"
              }`}
            >
              {/* Empty space for alternating sides on desktop */}
              <div className="hidden w-1/2 sm:block" />

              {/* Node Icon */}
              <div
                className={`absolute left-0 flex h-14 w-14 items-center justify-center rounded-full border-4 border-sidebar shadow-lg sm:left-1/2 sm:-ml-7 ${
                  isCompleted
                    ? "bg-primary text-white"
                    : isActive
                    ? "bg-accent text-sidebar animate-pulse"
                    : "bg-card text-text-secondary border-white/10"
                }`}
              >
                {isCompleted && <HiOutlineCheck className="h-6 w-6" />}
                {isActive && <div className="h-4 w-4 rounded-full bg-sidebar" />}
                {isLocked && <HiOutlineLockClosed className="h-5 w-5" />}
              </div>

              {/* Node Content Card */}
              <div
                className={`ml-20 w-[calc(100%-5rem)] sm:ml-0 sm:w-1/2 ${
                  i % 2 === 0 ? "sm:pl-16" : "sm:pr-16 text-left sm:text-right"
                }`}
              >
                <div
                  className={`rounded-card border p-5 shadow-card transition-all ${
                    isActive
                      ? "border-accent bg-accent/10"
                      : isLocked
                      ? "border-border bg-card/50 opacity-60"
                      : "border-border bg-card"
                  }`}
                >
                  <span
                    className={`mb-2 inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      isCompleted
                        ? "bg-primary/20 text-primary"
                        : isActive
                        ? "bg-accent/20 text-accent"
                        : "bg-white/10 text-text-secondary"
                    }`}
                  >
                    {node.type}
                  </span>
                  <h3 className="mb-1 text-lg font-bold text-text-primary">{node.title}</h3>
                  <p className="text-sm text-text-secondary">{node.description}</p>
                  
                  {isActive && (
                    <button className="mt-4 w-full rounded-button bg-accent px-4 py-2 text-sm font-bold text-sidebar transition-colors hover:bg-accent/90 sm:w-auto">
                      Continue Learning
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
