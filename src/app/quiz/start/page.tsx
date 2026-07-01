import { QuizCategorySelector } from "@/components/quiz/QuizCategorySelector";
import { quizCategories } from "@/data/quizMock";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Choose Quiz Topic | CodeQuest",
  description: "Select a subject to test your knowledge.",
};

export default function QuizStartPage() {
  return (
    <div className="h-full flex-1 overflow-auto bg-transparent p-4 sm:p-6 md:p-8 pt-0">
      <div className="mx-auto max-w-7xl h-full">
        <QuizCategorySelector categories={quizCategories} />
      </div>
    </div>
  );
}
