"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { QuizProvider } from "@/context/QuizContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <QuizProvider>
          {children}
        </QuizProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}
