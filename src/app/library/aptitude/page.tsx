"use client";

import { useState } from "react";
import {
  HiOutlineArrowRight, HiOutlineCheckCircle, HiOutlineClock,
  HiOutlineChartBar, HiOutlineDocumentText, HiOutlineXMark,
  HiOutlineMagnifyingGlass, HiOutlineArrowUpRight, HiOutlineLightBulb,
  HiOutlineViewfinderCircle,
} from "react-icons/hi2";

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
  { label: "Total Materials", value: "80+", sub: "Practice now",    iconKey: "doc"   },
  { label: "Tests Attempted", value: "26",  sub: "Keep practicing", iconKey: "check" },
  { label: "Accuracy",        value: "78%", sub: "Good job!",        iconKey: "view"  },
  { label: "Avg. Score",      value: "72%", sub: "Your average",    iconKey: "chart" },
  { label: "Hours Practiced", value: "34h", sub: "Keep it up!",     iconKey: "clock" },
];

function StatIcon({ k }: { k: string }) {
  const cls = "h-6 w-6 text-[#7C3AED]";
  if (k === "check") return <HiOutlineCheckCircle className={cls} />;
  if (k === "view")  return <HiOutlineViewfinderCircle className={cls} />;
  if (k === "chart") return <HiOutlineChartBar className={cls} />;
  if (k === "clock") return <HiOutlineClock className={cls} />;
  return <HiOutlineDocumentText className={cls} />;
}

const topics = [
  { name: "Quantitative Aptitude",    topics: 25, questions: 2450, emoji: "🔢", desc: "Number systems, percentages, ratios, profit & loss, algebra, geometry and more." },
  { name: "Logical Reasoning",        topics: 18, questions: 1820, emoji: "🧩", desc: "Puzzles, seating arrangements, blood relations, syllogisms, coding-decoding." },
  { name: "Verbal Ability",           topics: 15, questions: 1600, emoji: "🔤", desc: "Reading comprehension, vocabulary, grammar, sentence correction and para jumbles." },
  { name: "Data Interpretation",      topics: 12, questions: 980,  emoji: "📊", desc: "Tables, bar graphs, pie charts, line graphs and caselets." },
  { name: "General Awareness",        topics: 10, questions: 850,  emoji: "🌐", desc: "Current affairs, static GK, banking, economy and science & technology." },
  { name: "Speed & Distance",         topics: 8,  questions: 640,  emoji: "🚀", desc: "Trains, boats, streams, relative speed and time-speed-distance problems." },
  { name: "Time & Work",              topics: 7,  questions: 520,  emoji: "⏱️", desc: "Pipes and cisterns, work efficiency, man-days and partnership problems." },
  { name: "Permutation & Combination",topics: 9,  questions: 730,  emoji: "🎲", desc: "Arrangement, selection, circular permutation and combinatorics." },
  { name: "Number Series",            topics: 6,  questions: 480,  emoji: "🔗", desc: "Missing number, wrong number, alpha-numeric and letter series." },
  { name: "Blood Relations",          topics: 5,  questions: 360,  emoji: "👨‍👩‍👧", desc: "Family trees, coded relations and generational relationship problems." },
  { name: "Probability",              topics: 8,  questions: 590,  emoji: "🎯", desc: "Classical probability, conditional probability, dice, cards and coins." },
  { name: "Other Topics",             topics: 10, questions: 620,  emoji: "📁", desc: "Miscellaneous topics including technical aptitude and situation-based questions." },
];

const practicesModes = [
  { title: "Topic Practice",  desc: "Practice questions by topic", emoji: "📖", btn: "Start Practice" },
  { title: "Mock Tests",      desc: "Full length mock tests",       emoji: "📝", btn: "Start Test"    },
  { title: "Quick Quizzes",   desc: "Short quizzes to test speed",  emoji: "⚡", btn: "Start Quiz"    },
  { title: "Previous Papers", desc: "Company wise previous papers", emoji: "📋", btn: "Explore"       },
];

const recentTests = [
  { name: "TCS NQT Mock Test 1",         date: "28 May, 2024", score: 82, good: true  },
  { name: "Aptitude Full Test 3",         date: "27 May, 2024", score: 75, good: true  },
  { name: "Quantitative Aptitude Test 2", date: "26 May, 2024", score: 68, good: false },
  { name: "Verbal Ability Test 1",        date: "25 May, 2024", score: 80, good: true  },
  { name: "Data Interpretation Test 1",   date: "24 May, 2024", score: 62, good: false },
  { name: "Logical Reasoning Test 2",     date: "23 May, 2024", score: 88, good: true  },
];

const strengths = [
  { name: "Quantitative Aptitude", pct: 85 },
  { name: "Logical Reasoning",     pct: 78 },
  { name: "Verbal Ability",        pct: 72 },
  { name: "Data Interpretation",   pct: 65 },
  { name: "General Awareness",     pct: 50 },
];

const recommended = [
  { name: "Aptitude Mega Mock Test",    sub: "Full Length Test",       dur: "90 min", qs: "100 Qs", emoji: "📋" },
  { name: "Quantitative Booster Test", sub: "Focus on Quant",         dur: "60 min", qs: "60 Qs",  emoji: "🔢" },
  { name: "Logical Reasoning Test",    sub: "Improve your Logic",      dur: "60 min", qs: "60 Qs",  emoji: "🧩" },
  { name: "Verbal Ability Booster",    sub: "Improve RC & Vocabulary", dur: "45 min", qs: "40 Qs",  emoji: "🔤" },
];

const goals = [
  { label: "Solve 30 Questions",  done: 18, total: 30, unit: ""    },
  { label: "Attempt 1 Full Test", done: 0,  total: 1,  unit: ""    },
  { label: "Practice for 30 Min", done: 18, total: 30, unit: " min"},
];

// ─── Progress Ring ────────────────────────────────────────────────────────────
function ProgressRing({ pct }: { pct: number }) {
  const r = 52, c = 2 * Math.PI * r;
  return (
    <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(124,58,237,0.15)" strokeWidth="10" />
      <circle cx="60" cy="60" r={r} fill="none" stroke="#7C3AED" strokeWidth="10"
        strokeDasharray={`${(pct / 100) * c} ${c}`} strokeLinecap="round" />
    </svg>
  );
}

// ─── Topics Modal ─────────────────────────────────────────────────────────────
function TopicsModal({ onClose }: { onClose: () => void }) {
  const [search, setSearch] = useState("");
  const filtered = topics.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-card rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col border border-border/40" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-border/40">
          <div><h2 className="text-base font-black text-text-primary">📚 All Topics</h2>
            <p className="text-xs text-text-secondary mt-0.5">{filtered.length} topics available</p></div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7C3AED]/10 hover:bg-[#7C3AED]/20 text-[#7C3AED]"><HiOutlineXMark className="h-4 w-4" /></button>
        </div>
        <div className="px-5 py-3 border-b border-border/40">
          <div className="relative"><HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <input type="text" placeholder="Search topics..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-border/40 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40 text-text-primary" /></div>
        </div>
        <div className="overflow-y-auto p-5 flex flex-col gap-3">
          {filtered.map(t => (
            <div key={t.name} className="flex items-center gap-4 p-4 rounded-xl border border-[#7C3AED]/15 bg-[#7C3AED]/5 hover:border-[#7C3AED]/40 transition-all cursor-pointer group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-2xl shrink-0">{t.emoji}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-text-primary">{t.name}</p>
                <p className="text-xs text-text-secondary mt-0.5">{t.topics} Topics · {t.questions.toLocaleString()} Questions</p>
                <p className="text-xs text-text-secondary mt-1 leading-snug line-clamp-1">{t.desc}</p>
              </div>
              <button className="shrink-0 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-black px-4 py-2 rounded-xl transition-colors">Start</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Tests Modal ──────────────────────────────────────────────────────────────
function TestsModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-card rounded-3xl shadow-2xl w-full max-w-xl max-h-[85vh] flex flex-col border border-border/40" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-border/40">
          <h2 className="text-base font-black text-text-primary">🕐 All Recent Tests</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7C3AED]/10 hover:bg-[#7C3AED]/20 text-[#7C3AED]"><HiOutlineXMark className="h-4 w-4" /></button>
        </div>
        <div className="overflow-y-auto p-5 flex flex-col gap-3">
          {recentTests.map(t => (
            <div key={t.name} className="flex items-center justify-between p-4 rounded-xl border border-[#7C3AED]/15 bg-[#7C3AED]/5 hover:border-[#7C3AED]/40 transition-all cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/20">
                  <HiOutlineDocumentText className="h-5 w-5 text-[#7C3AED]" />
                </div>
                <div><p className="text-sm font-black text-text-primary">{t.name}</p>
                  <p className="text-xs text-text-secondary">Attempted on {t.date}</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className={`text-base font-black ${t.good ? "text-green-500" : "text-amber-500"}`}>{t.score}%</p>
                  <p className="text-[10px] text-text-secondary">Score</p>
                </div>
                <HiOutlineArrowRight className="h-4 w-4 text-text-secondary group-hover:text-[#7C3AED] transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Progress Modal ───────────────────────────────────────────────────────────
function ProgressModal({ onClose }: { onClose: () => void }) {
  const weeklyData = [
    { day: "Mon", score: 72 }, { day: "Tue", score: 85 }, { day: "Wed", score: 68 },
    { day: "Thu", score: 90 }, { day: "Fri", score: 78 }, { day: "Sat", score: 88 }, { day: "Sun", score: 82 },
  ];
  const detailedStats = [
    { label: "Tests Attempted",    value: "26",   icon: "📝", color: "bg-[#7C3AED]/10 text-[#7C3AED]" },
    { label: "Correct Answers",    value: "1,420", icon: "✅", color: "bg-green-100 text-green-700" },
    { label: "Incorrect Answers",  value: "400",  icon: "❌", color: "bg-red-100 text-red-700" },
    { label: "Accuracy",           value: "78%",  icon: "🎯", color: "bg-amber-100 text-amber-700" },
    { label: "Avg. Score",         value: "72%",  icon: "📊", color: "bg-blue-100 text-blue-700" },
    { label: "Hours Practiced",    value: "34h",  icon: "⏱️", color: "bg-purple-100 text-purple-700" },
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-card rounded-3xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col border border-border/40" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-border/40">
          <div>
            <h2 className="text-base font-black text-text-primary">📈 Your Progress Details</h2>
            <p className="text-xs text-text-secondary mt-0.5">Detailed breakdown of your performance</p>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7C3AED]/10 hover:bg-[#7C3AED]/20 text-[#7C3AED]">
            <HiOutlineXMark className="h-4 w-4" />
          </button>
        </div>
        <div className="overflow-y-auto p-5 flex flex-col gap-5">
          {/* Overall Ring */}
          <div className="flex items-center gap-5 p-4 rounded-2xl bg-[#7C3AED]/5 border border-[#7C3AED]/20">
            <div className="relative flex items-center justify-center shrink-0">
              <ProgressRing pct={78} />
              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-black text-text-primary">78%</span>
                <span className="text-[10px] text-text-secondary text-center leading-tight">Overall</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-black text-text-primary mb-1">Overall Progress</p>
              <p className="text-xs text-text-secondary leading-relaxed">You are performing well! Keep practicing daily to reach 85% accuracy.</p>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="text-xs font-black text-[#7C3AED]">+6%</span>
                <span className="text-xs text-text-secondary">vs last week</span>
              </div>
            </div>
          </div>
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            {detailedStats.map(s => (
              <div key={s.label} className={`flex flex-col items-center gap-1 p-3 rounded-xl border border-border/40 ${s.color.split(" ")[0]}`}>
                <span className="text-xl">{s.icon}</span>
                <span className="text-base font-black text-text-primary">{s.value}</span>
                <span className="text-[10px] text-text-secondary font-medium text-center">{s.label}</span>
              </div>
            ))}
          </div>
          {/* Weekly Activity */}
          <div>
            <p className="text-sm font-black text-text-primary mb-3">📅 This Week's Activity</p>
            <div className="flex items-end gap-2 h-20">
              {weeklyData.map(d => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-[#7C3AED] rounded-t-lg transition-all hover:bg-[#6D28D9]"
                    style={{ height: `${(d.score / 100) * 64}px` }} />
                  <span className="text-[10px] text-text-secondary font-bold">{d.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Strength Modal ───────────────────────────────────────────────────────────
function StrengthModal({ onClose }: { onClose: () => void }) {
  const allStrengths = [
    { name: "Quantitative Aptitude",    pct: 85 },
    { name: "Logical Reasoning",        pct: 78 },
    { name: "Verbal Ability",           pct: 72 },
    { name: "Data Interpretation",      pct: 65 },
    { name: "General Awareness",        pct: 50 },
    { name: "Speed & Distance",         pct: 70 },
    { name: "Time & Work",              pct: 60 },
    { name: "Permutation & Combination",pct: 55 },
    { name: "Number Series",            pct: 80 },
    { name: "Blood Relations",          pct: 88 },
    { name: "Probability",              pct: 45 },
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-card rounded-3xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col border border-border/40" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-border/40">
          <div>
            <h2 className="text-base font-black text-text-primary">💪 Strength by Topic</h2>
            <p className="text-xs text-text-secondary mt-0.5">Your performance across all topics</p>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7C3AED]/10 hover:bg-[#7C3AED]/20 text-[#7C3AED]">
            <HiOutlineXMark className="h-4 w-4" />
          </button>
        </div>
        <div className="overflow-y-auto p-5 flex flex-col gap-4">
          {allStrengths.sort((a,b) => b.pct - a.pct).map(s => {
            const bar = s.pct >= 80 ? "bg-green-500" : s.pct >= 65 ? "bg-[#7C3AED]" : s.pct >= 50 ? "bg-amber-500" : "bg-red-500";
            const label = s.pct >= 80 ? "Excellent" : s.pct >= 65 ? "Good" : s.pct >= 50 ? "Average" : "Needs Work";
            return (
              <div key={s.name}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-bold text-text-primary">{s.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${bar} text-white`}>{label}</span>
                    <span className="text-sm font-black text-[#7C3AED]">{s.pct}%</span>
                  </div>
                </div>
                <div className="h-2.5 w-full bg-[#7C3AED]/10 rounded-full overflow-hidden">
                  <div className={`h-full ${bar} rounded-full transition-all duration-700`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AptitudePage() {
  const [showTopics, setShowTopics]     = useState(false);
  const [showTests, setShowTests]       = useState(false);
  const [showStrength, setShowStrength] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  return (
    <>
    <div className="flex flex-col gap-5 pb-12">

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-3 bg-card rounded-2xl border border-[#7C3AED]/20 p-4 hover:border-[#7C3AED]/50 hover:shadow-lg hover:shadow-[#7C3AED]/10 hover:-translate-y-0.5 transition-all cursor-pointer">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/20">
              <StatIcon k={s.iconKey} />
            </div>
            <div>
              <p className="text-xs font-semibold text-text-secondary">{s.label}</p>
              <p className="text-3xl font-black text-text-primary leading-tight">{s.value}</p>
              <p className="text-xs font-bold text-[#7C3AED] mt-0.5">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Topics + Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">

        {/* Topics */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border/40 p-5 flex flex-col gap-4 self-start">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-text-primary">📚 Topics</h2>
            <button onClick={() => setShowTopics(true)} className="text-sm font-bold text-[#7C3AED] hover:underline flex items-center gap-1">View All <HiOutlineArrowRight className="h-3.5 w-3.5" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {topics.map((t) => (
              <button key={t.name} onClick={() => setShowTopics(true)}
                className="flex items-center gap-3 p-3 rounded-xl border border-border/40 bg-background hover:border-[#7C3AED]/40 hover:bg-[#7C3AED]/5 transition-all text-left group">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C3AED]/10 text-xl shrink-0 border border-[#7C3AED]/20">{t.emoji}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-text-primary leading-tight truncate">{t.name}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{t.topics} Topics</p>
                  <p className="text-xs text-text-secondary">{t.questions.toLocaleString()} Questions</p>
                </div>
                <HiOutlineArrowRight className="h-4 w-4 text-text-secondary group-hover:text-[#7C3AED] shrink-0 transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Progress + Daily Goal */}
        <div className="bg-card rounded-2xl border border-border/40 p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-text-primary">📈 Your Progress</h2>
            <button onClick={() => setShowProgress(true)} className="text-sm font-bold text-[#7C3AED] hover:underline">View Details</button>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center shrink-0">
              <ProgressRing pct={78} />
              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-black text-text-primary">78%</span>
                <span className="text-[10px] text-text-secondary font-medium text-center leading-tight">Overall<br/>Progress</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 flex-1">
              {[
                { label: "Tests Attempted",   val: "26",   dot: "bg-green-500" },
                { label: "Correct Answers",   val: "1420", dot: "bg-[#7C3AED]" },
                { label: "Incorrect Answers", val: "400",  dot: "bg-amber-500"  },
                { label: "Accuracy",          val: "78%",  dot: "bg-[#7C3AED]"  },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${item.dot} shrink-0`} />
                    <span className="text-xs text-text-secondary font-medium">{item.label}</span>
                  </div>
                  <span className="text-sm font-black text-text-primary">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Goal */}
          <div className="border-t border-[#7C3AED]/20 pt-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-text-primary">🎯 Daily Goal</h3>
              <button className="text-xs font-bold text-[#7C3AED] hover:underline">Edit Goal</button>
            </div>
            {goals.map((g) => (
              <div key={g.label}>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-text-secondary">{g.label}</span>
                  <span className="text-text-primary">{g.done} / {g.total}{g.unit}</span>
                </div>
                <div className="h-2 w-full bg-[#7C3AED]/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#7C3AED] rounded-full transition-all duration-700"
                    style={{ width: `${Math.min((g.done / g.total) * 100, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Practice by Mode */}
      <div className="bg-card rounded-2xl border border-border/40 p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black text-text-primary">⚡ Practice by Mode</h2>
          <button onClick={() => setShowTopics(true)} className="text-sm font-bold text-[#7C3AED] hover:underline flex items-center gap-1">View All <HiOutlineArrowRight className="h-3.5 w-3.5" /></button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {practicesModes.map((m) => (
            <div key={m.title} className="flex flex-col gap-3 p-4 rounded-2xl border border-[#7C3AED]/20 bg-[#7C3AED]/5 hover:bg-[#7C3AED]/10 hover:border-[#7C3AED]/40 hover:shadow-md transition-all">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-3xl">{m.emoji}</div>
              <div>
                <p className="text-sm font-black text-text-primary">{m.title}</p>
                <p className="text-xs text-text-secondary mt-1 leading-snug">{m.desc}</p>
              </div>
              <button onClick={() => setShowTopics(true)}
                className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-black py-2.5 rounded-xl transition-colors mt-auto shadow-sm shadow-[#7C3AED]/30">
                {m.btn}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom 3 cols */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Recent Tests */}
        <div className="bg-card rounded-2xl border border-border/40 p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-text-primary">🕐 Recent Tests</h2>
            <button onClick={() => setShowTests(true)} className="text-sm font-bold text-[#7C3AED] hover:underline">View All</button>
          </div>
          <div className="flex flex-col gap-2.5">
            {recentTests.slice(0, 4).map((t) => (
              <div key={t.name} className="flex items-center justify-between p-3 rounded-xl bg-[#7C3AED]/5 border border-[#7C3AED]/15 hover:border-[#7C3AED]/40 transition-all group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/20">
                    <HiOutlineDocumentText className="h-4 w-4 text-[#7C3AED]" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-text-primary leading-tight">{t.name}</p>
                    <p className="text-xs text-text-secondary">Attempted on {t.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="text-right">
                    <p className={`text-sm font-black ${t.good ? "text-green-500" : "text-amber-500"}`}>{t.score}%</p>
                    <p className="text-[10px] text-text-secondary">Score</p>
                  </div>
                  <HiOutlineArrowRight className="h-3.5 w-3.5 text-text-secondary group-hover:text-[#7C3AED] transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strength by Topic */}
        <div className="bg-card rounded-2xl border border-border/40 p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-text-primary">💪 Strength by Topic</h2>
            <button onClick={() => setShowStrength(true)} className="text-sm font-bold text-[#7C3AED] hover:underline">View All</button>
          </div>
          <div className="flex flex-col gap-4">
            {strengths.map((s) => {
              const bar = s.pct >= 80 ? "bg-green-500" : s.pct >= 65 ? "bg-[#7C3AED]" : "bg-amber-500";
              return (
                <div key={s.name}>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-text-primary">{s.name}</span>
                    <span className="text-[#7C3AED]">{s.pct}%</span>
                  </div>
                  <div className="h-2 w-full bg-[#7C3AED]/10 rounded-full overflow-hidden">
                    <div className={`h-full ${bar} rounded-full transition-all duration-700`} style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommended */}
        <div className="bg-card rounded-2xl border border-border/40 p-5 flex flex-col gap-4">
          <h2 className="text-base font-black text-text-primary">✨ Recommended for You</h2>
          <div className="flex flex-col gap-3">
            {recommended.map((r) => (
              <div key={r.name} className="flex items-center gap-3 p-3 rounded-xl border border-[#7C3AED]/15 bg-[#7C3AED]/5 hover:border-[#7C3AED]/40 hover:shadow-sm transition-all">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-xl shrink-0">{r.emoji}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-text-primary truncate">{r.name}</p>
                  <p className="text-xs text-text-secondary">{r.sub}</p>
                  <div className="flex gap-2 mt-0.5">
                    <span className="text-xs text-text-secondary flex items-center gap-0.5 font-medium"><HiOutlineClock className="h-3 w-3" />{r.dur}</span>
                    <span className="text-xs text-text-secondary font-medium">{r.qs}</span>
                  </div>
                </div>
                <button className="shrink-0 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-black px-3 py-2 rounded-xl transition-colors shadow-sm shadow-[#7C3AED]/30">
                  Start
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pro Tip */}
      <div className="flex items-center justify-between bg-gradient-to-r from-[#7C3AED] to-[#9D6FE8] rounded-2xl px-6 py-4 shadow-lg shadow-[#7C3AED]/30">
        <div className="flex items-center gap-3">
          <HiOutlineLightBulb className="h-6 w-6 text-white shrink-0" />
          <p className="text-sm font-medium text-white/90">
            <span className="text-white font-black mr-1.5">Pro Tip</span>
            Solve at least 2 mock tests every week to track your improvement.
          </p>
        </div>
        <button className="shrink-0 text-sm font-black text-white hover:text-white/80 flex items-center gap-1 ml-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-all">
          View Study Plan <HiOutlineArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>

    </div>

    {showTopics   && <TopicsModal    onClose={() => setShowTopics(false)}   />}
    {showTests    && <TestsModal     onClose={() => setShowTests(false)}    />}
    {showProgress && <ProgressModal  onClose={() => setShowProgress(false)} />}
    {showStrength && <StrengthModal  onClose={() => setShowStrength(false)} />}
    </>
  );
}
