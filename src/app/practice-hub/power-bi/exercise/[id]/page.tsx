"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { HiOutlineArrowLeft, HiOutlinePlay, HiOutlineLightBulb, HiOutlineCheckCircle } from "react-icons/hi2";
import { recommendedExercises } from "@/data/powerbiMock";

const exerciseDetails: Record<string, {
  steps: string[];
  hint: string;
  skills: string[];
  preview: string;
}> = {
  "1": {
    steps: ["Load the financial dataset into Power BI Desktop", "Create a Revenue vs Target KPI card", "Build a monthly profit trend line chart", "Add slicers for Year and Department", "Format and publish your dashboard"],
    hint: "Use CALCULATE() with FILTER() for dynamic revenue measures.",
    skills: ["DAX", "KPI Cards", "Line Charts", "Slicers"],
    preview: "Revenue | Expenses | Net Profit | YoY Growth"
  },
  "2": {
    steps: ["Import the marketing campaign CSV data", "Build a funnel chart for campaign stages", "Create a ROI measure using DAX", "Add a map visual for regional performance", "Set up drill-through for campaign details"],
    hint: "ROI = DIVIDE([Revenue] - [Cost], [Cost]) * 100",
    skills: ["Funnel Charts", "Map Visuals", "DAX Measures", "Drill-through"],
    preview: "Impressions → Clicks → Conversions → Revenue"
  },
  "3": {
    steps: ["Connect to the HR database", "Build an attrition rate measure", "Create a bar chart by department", "Add a tenure vs attrition scatter plot", "Create a headcount summary table"],
    hint: "Attrition Rate = DIVIDE([Leavers], [Total Employees])",
    skills: ["DAX", "Scatter Plots", "Bar Charts", "Tables"],
    preview: "Headcount | Attrition Rate | Avg Tenure | Dept Breakdown"
  },
  "4": {
    steps: ["Load the supply chain dataset", "Create inventory level KPI cards", "Build a delivery timeline Gantt chart", "Add supplier performance matrix", "Set up alerts for low stock threshold"],
    hint: "Use RANKX() to rank suppliers by on-time delivery rate.",
    skills: ["KPI Cards", "Matrix Visuals", "Gantt Charts", "Conditional Formatting"],
    preview: "Stock Level | Delivery Rate | Lead Time | Supplier Score"
  },
  "5": {
    steps: ["Import regional sales data", "Create a filled map by region", "Build a target vs actual bar chart", "Add a top 5 products table", "Create a dynamic region comparison slicer"],
    hint: "Use TOPN() to show only the top N products in a table.",
    skills: ["Map Visuals", "Bar Charts", "Tables", "TOPN DAX"],
    preview: "North | South | East | West | Target vs Actual"
  },
  "6": {
    steps: ["Load the customer transaction history", "Calculate churn probability measure", "Create a risk score heat map", "Build a cohort analysis table", "Add trend line for churn over time"],
    hint: "Segment customers using IF() and SWITCH() DAX functions.",
    skills: ["DAX", "Heat Maps", "Cohort Analysis", "Trend Lines"],
    preview: "High Risk | Medium Risk | Low Risk | Churn Trend"
  },
  "7": {
    steps: ["Connect to e-commerce platform data", "Build conversion funnel visualization", "Calculate drop-off rate at each stage", "Add session duration vs conversion scatter", "Create a device type breakdown pie chart"],
    hint: "Drop-off Rate = 1 - DIVIDE([Next Stage], [Current Stage])",
    skills: ["Funnel Charts", "Scatter Plots", "Pie Charts", "DAX"],
    preview: "Visit → Cart → Checkout → Purchase → Repeat"
  },
  "8": {
    steps: ["Import inventory management data", "Create reorder point calculation", "Build a stock level gauge chart", "Add supplier lead time table", "Set up low-stock conditional alerts"],
    hint: "Reorder Point = Lead Time × Daily Demand + Safety Stock",
    skills: ["Gauge Charts", "DAX", "Tables", "Conditional Formatting"],
    preview: "In Stock | Low Stock | Out of Stock | Reorder Soon"
  },
};

export default function ExercisePage() {
  const params = useParams();
  const id = params?.id as string;

  const exercise = recommendedExercises.find((e) => e.id === id);
  const details = exerciseDetails[id];

  if (!exercise || !details) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-text-secondary text-sm">Exercise not found.</p>
        <Link href="/practice-hub/power-bi" className="text-[#7C3AED] text-sm font-bold hover:underline">← Back to Power BI Practice</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Back link */}
      <Link href="/practice-hub/power-bi" className="flex items-center gap-2 text-base font-bold text-text-primary hover:text-[#7C3AED] transition-colors w-fit">
        <HiOutlineArrowLeft className="h-5 w-5" />
        Back to Power BI Practice
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-black text-text-primary">{exercise.title}</h1>
          <p className="text-sm text-text-primary/80 font-medium mt-1">{exercise.description}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${exercise.difficultyColor}`}>{exercise.difficulty}</span>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-black/5 text-text-secondary">⏱ {exercise.duration}</span>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#7C3AED]/10 text-[#7C3AED]">⭐ {exercise.xp}</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

        {/* Left — Steps & Skills */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Steps */}
          <div className="bg-card rounded-2xl border border-border/40 shadow-sm p-6">
            <h2 className="text-sm font-black text-text-primary mb-5">📋 Exercise Steps</h2>
            <ol className="flex flex-col gap-4">
              {details.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 group">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#7C3AED]/10 text-[#7C3AED] text-[11px] font-black mt-0.5 group-hover:bg-[#7C3AED] group-hover:text-white transition-colors">
                    {i + 1}
                  </div>
                  <span className="text-sm text-text-primary font-medium leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Preview */}
          <div className="bg-[#0F172A] rounded-2xl border border-[#1E293B] shadow-sm p-6">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Dashboard Preview</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {details.preview.split("|").map((metric, i) => (
                <div key={i} className="flex flex-col items-center justify-center bg-[#1E293B] rounded-xl p-3 border border-[#334155]">
                  <div className="h-2 w-8 bg-[#7C3AED] rounded-full mb-2 opacity-60" />
                  <span className="text-[10px] text-slate-400 text-center font-semibold leading-tight">{metric.trim()}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 h-20 bg-[#1E293B] rounded-xl border border-[#334155] flex items-end px-4 pb-2 gap-2 overflow-hidden">
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95].map((h, i) => (
                <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: `hsl(${263 + i * 5}, 70%, ${50 + i * 2}%)`, opacity: 0.8 }} />
              ))}
            </div>
          </div>
        </div>

        {/* Right — Hint & Skills & Start */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          {/* Hint */}
          <div className="bg-card rounded-2xl border border-amber-200/50 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <HiOutlineLightBulb className="h-5 w-5 text-amber-500" />
              <h2 className="text-sm font-black text-text-primary">Pro Hint</h2>
            </div>
            <p className="text-[12px] font-mono text-text-primary/80 leading-relaxed bg-amber-50/50 rounded-lg p-3 border border-amber-100">{details.hint}</p>
          </div>

          {/* Skills */}
          <div className="bg-card rounded-2xl border border-border/40 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <HiOutlineCheckCircle className="h-5 w-5 text-[#10B981]" />
              <h2 className="text-sm font-black text-text-primary">Skills You'll Use</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {details.skills.map((skill) => (
                <span key={skill} className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#7C3AED]/10 text-[#7C3AED]">{skill}</span>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <button className="flex items-center justify-center gap-2 w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-black text-sm py-4 rounded-2xl transition-all shadow-lg hover:shadow-[#7C3AED]/30 hover:shadow-xl hover:-translate-y-0.5">
            <HiOutlinePlay className="h-5 w-5" />
            Start Practice Session
          </button>
        </div>
      </div>
    </div>
  );
}
