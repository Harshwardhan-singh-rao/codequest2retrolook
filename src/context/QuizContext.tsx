"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface QuizState {
  quizzesCompleted: number;
  xp: number;
  level: number;
  streak: number;
  accuracy: number;
  totalQuizzesAvailable: number;
  completeQuiz: (earnedXp: number, correctRatio: number) => void;
}

const QuizContext = createContext<QuizState | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  // Load initial state from localStorage or use defaults
  const [quizzesCompleted, setQuizzesCompleted] = useState(12);
  const [xp, setXp] = useState(1250);
  const [level, setLevel] = useState(8);
  const [streak, setStreak] = useState(7);
  const [accuracy, setAccuracy] = useState(84); // percentage

  const totalQuizzesAvailable = 70; // static for now

  // Effect to load from localStorage on mount (client side only)
  useEffect(() => {
    const saved = localStorage.getItem("cq_quiz_stats");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setQuizzesCompleted(parsed.quizzesCompleted || 12);
        setXp(parsed.xp || 1250);
        setLevel(parsed.level || 8);
        setStreak(parsed.streak || 7);
        setAccuracy(parsed.accuracy || 84);
      } catch (e) {
        console.error("Failed to parse quiz stats", e);
      }
    }
  }, []);

  // Effect to save to localStorage when stats change
  useEffect(() => {
    localStorage.setItem(
      "cq_quiz_stats",
      JSON.stringify({ quizzesCompleted, xp, level, streak, accuracy })
    );
  }, [quizzesCompleted, xp, level, streak, accuracy]);

  const completeQuiz = (earnedXp: number, correctRatio: number) => {
    setQuizzesCompleted((prev) => prev + 1);
    setXp((prev) => {
      const newXp = prev + earnedXp;
      // Calculate level based on XP (e.g. 150 XP per level)
      const newLevel = Math.floor(newXp / 150) + 1;
      setLevel(newLevel);
      return newXp;
    });
    setAccuracy((prev) => {
      // Rolling average approximation for demo purposes
      return Math.round((prev * quizzesCompleted + correctRatio * 100) / (quizzesCompleted + 1));
    });
    // Streak logic would typically depend on dates, but for simulation we just keep it or bump it
    // setStreak((prev) => prev + 1); // Leaving streak alone for now unless it's a new day
  };

  return (
    <QuizContext.Provider
      value={{
        quizzesCompleted,
        xp,
        level,
        streak,
        accuracy,
        totalQuizzesAvailable,
        completeQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuizStats() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuizStats must be used within a QuizProvider");
  }
  return context;
}
