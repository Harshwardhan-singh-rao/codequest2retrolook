"use client";

import { motion } from "framer-motion";
import { HiOutlineQuestionMarkCircle, HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const faqs = [
  {
    q: "How do I join a live class?",
    a: "Navigate to Live Classes and click the Join button when the session is active.",
  },
  {
    q: "Can I download course materials?",
    a: "Yes, materials are available on each course page under the Resources tab.",
  },
  {
    q: "How does the streak system work?",
    a: "Complete at least one learning activity per day to maintain your streak.",
  },
  {
    q: "How do I reset my password?",
    a: "Go to Settings > Security and click Reset Password.",
  },
];

export default function SupportPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card hover className="text-center">
          <HiOutlineChatBubbleLeftRight className="mx-auto h-10 w-10 text-primary" />
          <CardTitle className="mt-3">Live Chat</CardTitle>
          <CardDescription className="mt-1">Chat with our support team</CardDescription>
          <Button className="mt-4" size="sm">Start Chat</Button>
        </Card>
        <Card hover className="text-center">
          <HiOutlineQuestionMarkCircle className="mx-auto h-10 w-10 text-secondary" />
          <CardTitle className="mt-3">Help Center</CardTitle>
          <CardDescription className="mt-1">Browse documentation and guides</CardDescription>
          <Button className="mt-4" size="sm" variant="outline">Browse Docs</Button>
        </Card>
      </div>

      <Card>
        <CardTitle>Frequently Asked Questions</CardTitle>
        <div className="mt-4 space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="border-b border-border pb-4 last:border-0"
            >
              <h3 className="font-medium text-text-primary">{faq.q}</h3>
              <p className="mt-1 text-sm text-text-secondary">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
