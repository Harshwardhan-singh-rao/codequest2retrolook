"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { currentUser } from "@/data/mock";

export default function SettingsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader title="Settings" description="Manage your account preferences" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card hover>
          <CardTitle>Profile</CardTitle>
          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-1 block text-sm text-text-secondary">Name</label>
              <input
                type="text"
                defaultValue={currentUser.name}
                className="w-full rounded-input border border-border bg-background px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-text-secondary">Email</label>
              <input
                type="email"
                defaultValue={currentUser.email}
                className="w-full rounded-input border border-border bg-background px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button size="sm">Save Changes</Button>
          </div>
        </Card>

        <Card hover>
          <CardTitle>Notifications</CardTitle>
          <div className="mt-4 space-y-3">
            {["Email notifications", "Class reminders", "Assignment deadlines", "Weekly digest"].map(
              (item) => (
                <label key={item} className="flex items-center justify-between">
                  <span className="text-sm text-text-primary">{item}</span>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded accent-primary"
                  />
                </label>
              ),
            )}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
