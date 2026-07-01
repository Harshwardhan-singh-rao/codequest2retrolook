import { QuizDashboardContent } from "@/components/quiz/QuizDashboardContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz Center | CodeQuest",
  description: "Test your skills and track your progress in the Quiz Center.",
};

export default function QuizPage() {
  return <QuizDashboardContent />;
}
