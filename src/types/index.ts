export interface User {
  name: string;
  email: string;
  avatar: string;
  streak: number;
  role: string;
}

export interface StatCard {
  id: string;
  title: string;
  value: string;
  subtext?: string;
  progress?: number;
  completed?: number;
  total?: number;
  href: string;
  cta: string;
  icon: string;
}

export interface DashboardWidget {
  id: string;
  icon: string;
  title: string;
  description: string;
  progress: number;
  cta: string;
  color: "primary" | "secondary" | "accent";
}

export interface ProgressStats {
  overall: number;
  modulesCompleted: number;
  totalModules: number;
  catalogSteps: number;
  totalCatalogSteps: number;
  learningHours: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  earned: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "class" | "deadline" | "event";
}

export interface DayFocus {
  title: string;
  estimatedMinutes: number;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  lessons: number;
  completedLessons: number;
  category: string;
  thumbnail: string;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  href: string;
  variant?: "primary" | "outline";
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  section?: string;
  badge?: "soon" | "locked";
}

export interface LearningActivity {
  day: string;
  hours: number;
}

export interface CareerData {
  month: string;
  readiness: number;
}

export interface CareerReadinessItem {
  id: string;
  label: string;
  progress: number;
}

export interface SyllabusOverview {
  title: string;
  progress: number;
  cta: string;
  href: string;
}

export interface ClassItem {
  id: string;
  title: string;
  time: string;
  instructor?: string;
}

export interface DeadlineItem {
  id: string;
  title: string;
  due: string;
  course?: string;
}
