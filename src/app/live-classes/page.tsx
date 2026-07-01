"use client";

import { motion } from "framer-motion";
import { HiOutlineVideoCamera, HiOutlineUser } from "react-icons/hi2";
import { Card, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { upcomingClasses } from "@/data/mock";

export default function LiveClassesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-4">
        {upcomingClasses.map((cls, i) => (
          <motion.div
            key={cls.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card hover className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-button bg-primary/10 text-primary">
                  <HiOutlineVideoCamera className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle>{cls.title}</CardTitle>
                  <p className="mt-1 flex items-center gap-1 text-sm text-text-secondary">
                    <HiOutlineUser className="h-4 w-4" />
                    {cls.instructor}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="accent">{cls.time}</Badge>
                <Button size="sm">Join</Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
