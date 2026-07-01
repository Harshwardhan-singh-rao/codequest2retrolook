export const powerBiStats = [
  {
    id: "total_practice",
    title: "Total Practice",
    value: "28",
    trend: "+5 this week",
    trendType: "up",
    icon: "chart",
    color: "bg-[#7C3AED]", // purple
  },
  {
    id: "dashboards",
    title: "Dashboards Created",
    value: "12",
    trend: "+3 this week",
    trendType: "up",
    icon: "dashboard",
    color: "bg-[#7C3AED]", // purple
  },
  {
    id: "avg_score",
    title: "Avg. Score",
    value: "84%",
    trend: "+8% this week",
    trendType: "up",
    icon: "target",
    color: "bg-[#7C3AED]", // purple
  },
  {
    id: "xp_earned",
    title: "XP Earned",
    value: "1,250 XP",
    trend: "+180 this week",
    trendType: "up",
    icon: "star",
    color: "bg-[#7C3AED]", // purple
  },
];

export const continuePracticeData = {
  title: "Sales Analysis Dashboard",
  dataset: "Sales Data Sample",
  progress: 65,
  lastPracticed: "Yesterday",
  stats: [
    { label: "Total Sales", value: "$8.96M" },
    { label: "Total Profit", value: "$6.45M" },
    { label: "Total Cost", value: "$2.51K" },
    { label: "Total Units", value: "$1.12M" },
  ]
};

export const scoreTrendData = [
  { day: "Mon", score: 60 },
  { day: "Tue", score: 55 },
  { day: "Wed", score: 50 },
  { day: "Thu", score: 75 },
  { day: "Fri", score: 65 },
  { day: "Sat", score: 85 },
  { day: "Sun", score: 75 },
];

export const practiceModes = [
  {
    id: "powerbi",
    title: "Power BI View",
    description: "Build dashboards and visualizations",
    buttonText: "Go to Power BI View",
    color: "bg-[#7C3AED]/10",
    iconColor: "text-[#7C3AED]",
    buttonColor: "bg-[#7C3AED] hover:bg-[#6D28D9]",
    icon: "chart",
  },
  {
    id: "sql",
    title: "SQL View",
    description: "Write queries and prepare data for analysis",
    buttonText: "Go to SQL View",
    color: "bg-[#3B82F6]/10",
    iconColor: "text-[#3B82F6]",
    buttonColor: "bg-[#3B82F6] hover:bg-[#2563EB]",
    icon: "database",
  },
  {
    id: "python",
    title: "Python View",
    description: "Clean, transform and analyze data with Python",
    buttonText: "Go to Python View",
    color: "bg-[#10B981]/10",
    iconColor: "text-[#10B981]",
    buttonColor: "bg-[#10B981] hover:bg-[#059669]",
    icon: "python",
  },
];

export const practiceCategories = [
  { id: "viz", title: "Data Visualization", count: "8 Dashboards", iconColor: "text-[#7C3AED]", borderColor: "border-[#7C3AED]", icon: "pie" },
  { id: "model", title: "Data Modeling", count: "6 Dashboards", iconColor: "text-[#10B981]", borderColor: "border-[#10B981]", icon: "chartBar" },
  { id: "dax", title: "DAX Practice", count: "7 Dashboards", iconColor: "text-[#F59E0B]", borderColor: "border-[#F59E0B]", icon: "cube" },
  { id: "query", title: "Power Query", count: "5 Dashboards", iconColor: "text-[#3B82F6]", borderColor: "border-[#3B82F6]", icon: "document" },
  { id: "design", title: "Dashboard Design", count: "6 Dashboards", iconColor: "text-[#EF4444]", borderColor: "border-[#EF4444]", icon: "layout" },
];

export const recommendedExercises = [
  {
    id: "1",
    title: "Financial Performance Dashboard",
    description: "Analyze company financials and KPIs",
    difficulty: "Intermediate",
    difficultyColor: "text-blue-500 bg-blue-50",
    duration: "45 min",
    xp: "150 XP",
  },
  {
    id: "2",
    title: "Marketing Campaign Analysis",
    description: "Track campaign performance and ROI",
    difficulty: "Beginner",
    difficultyColor: "text-green-500 bg-green-50",
    duration: "30 min",
    xp: "100 XP",
  },
  {
    id: "3",
    title: "HR Analytics Dashboard",
    description: "Employee insights and attrition analysis",
    difficulty: "Intermediate",
    difficultyColor: "text-blue-500 bg-blue-50",
    duration: "40 min",
    xp: "140 XP",
  },
  {
    id: "4",
    title: "Supply Chain Overview",
    description: "Monitor logistics, inventory and delivery KPIs",
    difficulty: "Advanced",
    difficultyColor: "text-red-500 bg-red-50",
    duration: "60 min",
    xp: "200 XP",
  },
  {
    id: "5",
    title: "Sales Region Breakdown",
    description: "Compare regional sales figures with targets",
    difficulty: "Beginner",
    difficultyColor: "text-green-500 bg-green-50",
    duration: "25 min",
    xp: "90 XP",
  },
  {
    id: "6",
    title: "Customer Churn Prediction",
    description: "Identify at-risk customers using data trends",
    difficulty: "Advanced",
    difficultyColor: "text-red-500 bg-red-50",
    duration: "55 min",
    xp: "180 XP",
  },
  {
    id: "7",
    title: "E-Commerce Funnel Report",
    description: "Visualize conversion rates across the sales funnel",
    difficulty: "Intermediate",
    difficultyColor: "text-blue-500 bg-blue-50",
    duration: "35 min",
    xp: "120 XP",
  },
  {
    id: "8",
    title: "Inventory Management Report",
    description: "Track stock levels and reorder points",
    difficulty: "Beginner",
    difficultyColor: "text-green-500 bg-green-50",
    duration: "20 min",
    xp: "80 XP",
  },
];

export const recentActivity = [
  { id: "1", title: "Created Sales Analysis Dashboard", time: "2h ago", icon: "dashboard" },
  { id: "2", title: "Practiced DAX - Time Intelligence", time: "4h ago", icon: "cube" },
  { id: "3", title: "Executed SQL Query - Top 10 Customers", time: "Yesterday", icon: "database" },
  { id: "4", title: "Cleaned Data using Python (Pandas)", time: "Yesterday", icon: "python" },
];

export const earnedBadges = [
  { id: "1", title: "First Dashboard", icon: "hexagon", color: "text-[#7C3AED]", bg: "bg-[#7C3AED]/10" },
  { id: "2", title: "Data Explorer", icon: "cube", color: "text-[#10B981]", bg: "bg-[#10B981]/10" },
  { id: "3", title: "DAX Master", icon: "star", color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10" },
  { id: "4", title: "Power Query Pro", icon: "shield", color: "text-[#3B82F6]", bg: "bg-[#3B82F6]/10" },
  { id: "5", title: "Visualization Pro", icon: "hexagon", color: "text-[#EF4444]", bg: "bg-[#EF4444]/10" },
];

export const dailyGoals = {
  completed: 2,
  total: 3,
  tasks: [
    { id: "1", title: "Practice for 30 min", progress: "30/30 min", isCompleted: true },
    { id: "2", title: "Create a Dashboard", progress: "1/1", isCompleted: true },
    { id: "3", title: "Complete DAX Exercise", progress: "0/1", isCompleted: false },
  ]
};
