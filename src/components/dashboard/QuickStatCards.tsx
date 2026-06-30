"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  HiOutlineVideoCamera,
  HiOutlineClock,
  HiOutlineCircleStack,
  HiOutlineCodeBracket,
  HiOutlineCommandLine,
} from "react-icons/hi2";
import type { StatCard } from "@/types";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/utils/cn";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  video: HiOutlineVideoCamera,
  deadline: HiOutlineClock,
  database: HiOutlineCircleStack,
  code: HiOutlineCodeBracket,
  keyboard: HiOutlineCommandLine,
};

export function QuickStatCards({ cards }: { cards: StatCard[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card, i) => {
        const Icon = iconMap[card.icon] ?? HiOutlineCodeBracket;
        const hasProgress = card.progress !== undefined;

        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card hover className="flex h-full flex-col p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  {card.title}
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-hover text-text-primary">
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              {hasProgress ? (
                <>
                  <p className="font-[family-name:var(--font-poppins)] text-lg font-bold text-text-primary">
                    {card.value}
                    {card.subtext && (
                      <span className="ml-1 text-sm font-normal text-text-secondary">
                        ({card.subtext})
                      </span>
                    )}
                  </p>
                  <div className="my-3">
                    <ProgressBar value={card.progress ?? 0} color="secondary" />
                  </div>
                </>
              ) : (
                <p className="flex-1 text-sm text-text-secondary">{card.value}</p>
              )}

              <Link
                href={card.href}
                className={cn(
                  "mt-3 text-sm font-semibold text-text-primary hover:underline",
                  hasProgress && "mt-auto",
                )}
              >
                {card.cta} →
              </Link>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
