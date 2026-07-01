export const quizStats = [
  {
    id: "completed",
    title: "Quizzes Completed",
    value: "12",
    subtext: "+2 this week",
    trend: "up",
    icon: "book",
    color: "bg-[#F59E0B]", // Orange
  },
  {
    id: "xp",
    title: "XP / Level",
    value: "1,250 XP",
    subtext: "Level 08",
    trend: "neutral",
    icon: "star",
    color: "bg-[#8B5CF6]", // Purple
    progress: 75, // For the level progress bar under it
  },
  {
    id: "streak",
    title: "Daily Streak",
    value: "7 Days",
    subtext: "Keep it up!",
    trend: "up",
    icon: "fire",
    color: "bg-[#F97316]", // Orange/Red
  },
  {
    id: "accuracy",
    title: "Accuracy",
    value: "84%",
    subtext: "+5% this week",
    trend: "up",
    icon: "target",
    color: "bg-[#10B981]", // Green
  },
];

export const quizOverallProgress = {
  percentage: 68,
  completed: 48,
  total: 70,
  label: "Quizzes",
  subtext: "Keep going, you're doing great!",
  xpEarned: "+120 XP this week",
};

export const continueQuiz = {
  courseTitle: "React Development",
  lessonTitle: "Advanced React Hooks",
  progress: 60,
  icon: "react",
};

export const quizQuickActions = [
  {
    id: "start-quiz",
    title: "Start Quiz",
    subtitle: "Test your skills",
    icon: "play",
    color: "bg-[#FFEAD5]", // Soft orange bg
    textColor: "text-[#F97316]",
    href: "/quiz/start",
  },
  {
    id: "code-challenge",
    title: "Code Challenge",
    subtitle: "Practice coding",
    icon: "code",
    color: "bg-[#E0E7FF]", // Soft blue bg
    textColor: "text-[#3B82F6]",
    href: "/practice-hub/code",
  },
  {
    id: "sql-quiz",
    title: "SQL Practice",
    subtitle: "Query & learn",
    icon: "database",
    color: "bg-[#D1FAE5]", // Soft green bg
    textColor: "text-[#10B981]",
    href: "/practice-hub/sql",
  },
  {
    id: "logic-test",
    title: "Power BI Practice",
    subtitle: "Visualize data",
    icon: "chart",
    color: "bg-[#EDE9FE]", // Soft purple bg
    textColor: "text-[#8B5CF6]",
    href: "/practice-hub/power-bi",
  },
];

export const todayQuizGoals = [
  { id: "1", title: "Complete 1 Quiz", completed: false },
  { id: "2", title: "Finish SQL Practice", completed: true },
  { id: "3", title: "Maintain Daily Streak", completed: true },
  { id: "4", title: "Watch One Video Lesson", completed: false },
];

export const upcomingLiveQuizzes = [
  {
    id: "1",
    title: "React Development",
    time: "Today, 4:00 PM",
    icon: "react",
    color: "bg-[#0F172A]", // Dark slate
    iconColor: "text-[#38BDF8]",
  },
  {
    id: "2",
    title: "SQL Advanced",
    time: "Tomorrow, 10:00 AM",
    icon: "database",
    color: "bg-[#0F172A]", // Dark slate
    iconColor: "text-white",
  },
];

export const weeklyQuizActivity = [
  { day: "Mon", score: 40 },
  { day: "Tue", score: 30 },
  { day: "Wed", score: 70 },
  { day: "Thu", score: 85 },
  { day: "Fri", score: 45 },
  { day: "Sat", score: 35 },
  { day: "Sun", score: 80 },
];

export const quizAchievements = [
  { id: "1", title: "First Quiz", icon: "badge1", color: "text-[#F59E0B]", bg: "bg-[#FEF3C7]" },
  { id: "2", title: "7 Day Streak", icon: "badge2", color: "text-[#EF4444]", bg: "bg-[#FEE2E2]" },
  { id: "3", title: "Perfect Score", icon: "badge3", color: "text-[#10B981]", bg: "bg-[#D1FAE5]" },
  { id: "4", title: "Top Performer", icon: "badge4", color: "text-[#8B5CF6]", bg: "bg-[#EDE9FE]" },
];

export const recentQuizActivity = [
  { id: "1", title: "Completed HTML Basics Quiz", time: "2h ago", type: "success" },
  { id: "2", title: "Solved 5 SQL Practice Questions", time: "4h ago", type: "practice" },
  { id: "3", title: "Completed React Lesson 11", time: "Yesterday", type: "lesson" },
  { id: "4", title: "Viewed Power BI Dashboard", time: "Yesterday", type: "view" },
];

export const quizCategories = [
  {
    id: "python",
    title: "Python",
    description: "Data structures, algorithms, and advanced Python concepts.",
    icon: "python",
    questions: 150,
    difficulty: "Advanced",
    color: "bg-[#2563EB]", // Blue
  },
  {
    id: "sql",
    title: "SQL",
    description: "Database design, queries, and performance optimization.",
    icon: "database",
    questions: 120,
    difficulty: "Intermediate",
    color: "bg-[#10B981]", // Green
  },
  {
    id: "react",
    title: "React",
    description: "Hooks, state management, and component lifecycle.",
    icon: "react",
    questions: 85,
    difficulty: "Beginner",
    color: "bg-[#38BDF8]", // Light blue
  },
  {
    id: "html",
    title: "HTML / CSS",
    description: "Semantic HTML, flexbox, grid, and animations.",
    icon: "html",
    questions: 200,
    difficulty: "Beginner",
    color: "bg-[#F59E0B]", // Orange
  },
  {
    id: "javascript",
    title: "JavaScript",
    description: "ES6+, closures, promises, and DOM manipulation.",
    icon: "js",
    questions: 175,
    difficulty: "Intermediate",
    color: "bg-[#EAB308]", // Yellow
  },
];
