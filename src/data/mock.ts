import type {
  Achievement,
  CalendarEvent,
  CareerData,
  CareerReadinessItem,
  ClassItem,
  Course,
  DashboardWidget,
  DayFocus,
  DeadlineItem,
  LearningActivity,
  NavItem,
  ProgressStats,
  QuickAction,
  StatCard,
  SyllabusOverview,
  User,
} from "@/types";

export const currentUser: User = {
  name: "Harshwardhan Singh",
  email: "harshwardhan@codequest.dev",
  avatar: "HS",
  streak: 0,
  role: "Full Stack Learner",
};

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: "dashboard", section: "menu" },
  { label: "Jobs", href: "/career", icon: "jobs", section: "menu" },
  { label: "Live Classes", href: "/live-classes", icon: "live", section: "menu", badge: "soon" },
  { label: "Practice Studio", href: "/practice-hub", icon: "practice", section: "menu", badge: "soon" },
  { label: "Study Materials", href: "/courses", icon: "courses", section: "menu", badge: "soon" },
  { label: "Assignments", href: "/assignments", icon: "assignments", section: "menu", badge: "soon" },
  { label: "Resume Lab", href: "/resume-builder", icon: "resume", section: "menu", badge: "soon" },
  { label: "Progress", href: "/progress", icon: "progress", section: "menu" },
  { label: "Settings", href: "/settings", icon: "settings", section: "menu", badge: "soon" },
  { label: "Code Workbench", href: "/practice-hub/code", icon: "code", section: "practice" },
  { label: "SQL Practice", href: "/practice-hub/sql", icon: "database", section: "practice" },
  { label: "Typing Practice", href: "/practice-hub/typing", icon: "keyboard", section: "practice" },
  { label: "Power BI Practice", href: "/practice-hub/power-bi", icon: "chart", section: "practice" },
  { label: "Quiz", href: "/practice-hub/quiz", icon: "quiz", section: "practice" },
  { label: "Flow Path", href: "/learning/flow", icon: "flow", section: "practice", badge: "soon" },
  { label: "Calendar", href: "/calendar", icon: "calendar", section: "learn" },
  { label: "Learning Planner", href: "/learning/planner", icon: "planner", section: "learn" },
  { label: "Projects", href: "/learning/projects", icon: "projects", section: "learn", badge: "soon" },
  { label: "Hub", href: "/learning/hub", icon: "hub", section: "learn" },
  { label: "Career Map", href: "/career", icon: "career", section: "career" },
];

export const heroActions: QuickAction[] = [
  { id: "practice", label: "Continue practice", icon: "practice", href: "/practice-hub", variant: "primary" },
  { id: "career-map", label: "Open Career Map", icon: "map", href: "/career", variant: "outline" },
  { id: "calendar", label: "Calendar", icon: "calendar", href: "/", variant: "outline" },
  { id: "resume", label: "Resume (WIP)", icon: "resume", href: "#", variant: "outline" },
  { id: "jobs", label: "Jobs", icon: "jobs", href: "/career", variant: "outline" },
];

export const statCards: StatCard[] = [
  {
    id: "next-class",
    title: "Next class",
    value: "No class scheduled today",
    href: "/live-classes",
    cta: "Calendar",
    icon: "video",
  },
  {
    id: "deadline",
    title: "Next deadline",
    value: "You're all caught up",
    href: "/assignments",
    cta: "View",
    icon: "deadline",
  },
  {
    id: "sql",
    title: "SQL Practice",
    value: "0%",
    subtext: "0 / 85",
    progress: 0,
    completed: 0,
    total: 85,
    href: "/practice-hub/sql",
    cta: "Open",
    icon: "database",
  },
  {
    id: "code",
    title: "Code Workbench",
    value: "0%",
    subtext: "0 / 1",
    progress: 0,
    completed: 0,
    total: 1,
    href: "/practice-hub/code",
    cta: "Open",
    icon: "code",
  },
  {
    id: "typing",
    title: "Typing Practice",
    value: "0%",
    subtext: "0 / 10",
    progress: 0,
    completed: 0,
    total: 10,
    href: "/practice-hub/typing",
    cta: "Open",
    icon: "keyboard",
  },
];

export const progressStats: ProgressStats = {
  overall: 0,
  modulesCompleted: 0,
  totalModules: 24,
  catalogSteps: 0,
  totalCatalogSteps: 12,
  learningHours: 0,
  achievements: [
    { id: "1", title: "First Course", icon: "trophy", earned: false },
    { id: "2", title: "7-Day Streak", icon: "fire", earned: false },
    { id: "3", title: "SQL Master", icon: "database", earned: false },
    { id: "4", title: "Code Warrior", icon: "sword", earned: false },
    { id: "5", title: "Career Ready", icon: "star", earned: false },
  ] satisfies Achievement[],
};

export const syllabusOverview: SyllabusOverview = {
  title: "Getting started",
  progress: 0,
  cta: "Open Career Map",
  href: "/career",
};

export const careerReadiness: CareerReadinessItem[] = [
  { id: "resume", label: "Resume", progress: 0 },
  { id: "interview", label: "Interview", progress: 0 },
  { id: "skills", label: "Skills", progress: 0 },
  { id: "ats", label: "ATS", progress: 0 },
];

export const careerReadinessOverall = 0;

export const dayFocus: DayFocus = {
  title: "Self-directed study",
  estimatedMinutes: 0,
};

export const upcomingClassesList: ClassItem[] = [];

export const deadlinesList: DeadlineItem[] = [];

export const calendarEvents: CalendarEvent[] = [];

export const learningActivity: LearningActivity[] = [
  { day: "Mon", hours: 0 },
  { day: "Tue", hours: 0 },
  { day: "Wed", hours: 0 },
  { day: "Thu", hours: 0 },
  { day: "Fri", hours: 0 },
  { day: "Sat", hours: 0 },
  { day: "Sun", hours: 0 },
];

export const careerData: CareerData[] = [
  { month: "Jan", readiness: 0 },
  { month: "Feb", readiness: 0 },
  { month: "Mar", readiness: 0 },
  { month: "Apr", readiness: 0 },
  { month: "May", readiness: 0 },
  { month: "Jun", readiness: 0 },
];

export const courses: Course[] = [
  {
    id: "1",
    title: "Full Stack Web Development",
    instructor: "Sarah Chen",
    progress: 0,
    lessons: 48,
    completedLessons: 0,
    category: "Web Dev",
    thumbnail: "FS",
  },
  {
    id: "2",
    title: "Data Structures & Algorithms",
    instructor: "Raj Patel",
    progress: 0,
    lessons: 60,
    completedLessons: 0,
    category: "DSA",
    thumbnail: "DSA",
  },
  {
    id: "3",
    title: "SQL & Database Design",
    instructor: "Emily Watson",
    progress: 0,
    lessons: 30,
    completedLessons: 0,
    category: "Database",
    thumbnail: "SQL",
  },
];

export const dashboardWidgets: DashboardWidget[] = [];

export const quickActions: QuickAction[] = heroActions;

export const continueLearning = {
  courseTitle: "Getting Started",
  lessonTitle: "Choose your career path",
  progress: 0,
  timeLeft: "—",
};

export const careerRoadmap = {
  currentRole: "Beginner",
  targetRole: "Full Stack Engineer",
  steps: ["HTML/CSS", "JavaScript", "React", "Node.js", "System Design"],
  currentStep: 0,
};

export const upcomingClasses = upcomingClassesList;

export const assignments = [
  { id: "1", title: "Build a REST API", course: "Node.js Backend", due: "Jul 1", status: "pending" },
  { id: "2", title: "React Component Library", course: "React Mastery", due: "Jul 5", status: "pending" },
];

export const practiceTypes = [
  { id: "sql", title: "SQL Practice", problems: 85, solved: 0, difficulty: "Beginner" },
  { id: "code", title: "Code Workbench", problems: 1, solved: 0, difficulty: "Beginner" },
  { id: "typing", title: "Typing Practice", problems: 10, solved: 0, difficulty: "Beginner" },
];

export const resumeSections = [
  { id: "1", title: "Personal Info", completed: false },
  { id: "2", title: "Education", completed: false },
  { id: "3", title: "Experience", completed: false },
  { id: "4", title: "Skills", completed: false },
  { id: "5", title: "Projects", completed: false },
];

export const notifications = [
  { id: "1", message: "Welcome to CodeQuest! Start your learning journey.", time: "Just now", read: false },
];
