"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HiOutlineArrowRight, HiOutlineXMark, HiOutlineMagnifyingGlass,
  HiOutlineTrophy, HiOutlineFire, HiOutlineBolt, HiOutlineClock,
  HiOutlineCodeBracket, HiOutlineArrowUpRight, HiOutlineCalendar,
  HiOutlineChartBar,
} from "react-icons/hi2";

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { label: "Total Challenges", value: "1200+", sub: "Practice now",    emoji: "🧩" },
  { label: "Badges Earned",    value: "18",     sub: "Keep going!",     emoji: "🏅" },
  { label: "Rank",             value: "Gold",   sub: "Top 8%",          emoji: "🥇" },
  { label: "Streak",           value: "15 Days",sub: "Amazing!",        emoji: "🔥" },
  { label: "Score",            value: "2850",   sub: "Keep improving",  emoji: "⭐" },
];

const domains = [
  { name: "Algorithms",           challenges: 245, solved: 68, emoji: "⚙️" },
  { name: "Data Structures",      challenges: 210, solved: 62, emoji: "🗂️" },
  { name: "Database",             challenges: 180, solved: 55, emoji: "🛢️" },
  { name: "Python",               challenges: 220, solved: 70, emoji: "🐍" },
  { name: "SQL",                  challenges: 150, solved: 60, emoji: "📋" },
  { name: "Java",                 challenges: 190, solved: 50, emoji: "☕" },
  { name: "C++",                  challenges: 160, solved: 48, emoji: "💻" },
  { name: "Problem Solving",      challenges: 200, solved: 65, emoji: "🔍" },
  { name: "Artificial Intelligence", challenges: 90, solved: 45, emoji: "🤖" },
  { name: "Shell & Linux",        challenges: 120, solved: 72, emoji: "🐚" },
  { name: "React",                challenges: 80,  solved: 58, emoji: "⚛️" },
  { name: "Interview Prep Kit",   challenges: 300, solved: 40, emoji: "🏢" },
];

const quickPractice = [
  { title: "Search Problems",      desc: "Find and solve problems by difficulty, tags or topic", emoji: "🔍", btn: "Search"  },
  { title: "Random Challenge",     desc: "Get a random challenge to test your skills",            emoji: "🎲", btn: "Start"   },
  { title: "Interview Preparation",desc: "Practice company-specific interview questions",         emoji: "🏢", btn: "Explore" },
  { title: "Track Progress",       desc: "View your detailed progress & analytics",               emoji: "📈", btn: "View"    },
];

const badges = [
  { name: "Problem Solver",        emoji: "🧩", color: "from-purple-500/20 to-purple-500/5" },
  { name: "5 Days Streak",         emoji: "🔥", color: "from-orange-500/20 to-orange-500/5" },
  { name: "Competitive Prog.",     emoji: "🏆", color: "from-yellow-500/20 to-yellow-500/5" },
  { name: "Algorithm Expert",      emoji: "⚙️", color: "from-blue-500/20 to-blue-500/5" },
  { name: "SQL Ace",               emoji: "📋", color: "from-green-500/20 to-green-500/5" },
  { name: "Python Master",         emoji: "🐍", color: "from-emerald-500/20 to-emerald-500/5" },
  { name: "30 Days Streak",        emoji: "⚡", color: "from-amber-500/20 to-amber-500/5" },
  { name: "Data Struct. Pro",      emoji: "🗂️", color: "from-cyan-500/20 to-cyan-500/5" },
  { name: "Java Specialist",       emoji: "☕", color: "from-red-500/20 to-red-500/5" },
  { name: "Shell Ninja",           emoji: "🐚", color: "from-teal-500/20 to-teal-500/5" },
  { name: "100 Challenges",        emoji: "💯", color: "from-pink-500/20 to-pink-500/5" },
  { name: "Gold Rank",             emoji: "🥇", color: "from-yellow-400/20 to-yellow-400/5" },
];

const recommendedChallenges = [
  { name: "Sherlock and Array",             domain: "Algorithms",       difficulty: "Easy",   emoji: "🧩" },
  { name: "Merge Sort: Counting Inversions",domain: "Algorithms",       difficulty: "Medium", emoji: "⚙️" },
  { name: "Weather Observation Station 20", domain: "SQL",              difficulty: "Easy",   emoji: "📋" },
  { name: "Balanced Brackets",             domain: "Data Structures",   difficulty: "Easy",   emoji: "🗂️" },
  { name: "Maximum Subarray",              domain: "Problem Solving",   difficulty: "Medium", emoji: "🔍" },
];

const contests = [
  { name: "Weekend Contest 431", sub: "HackerRank", time: "1d 14h 30m" },
  { name: "CodeSprint 2024",     sub: "HackerRank", time: "2d 09h 15m" },
  { name: "Preparation Challenge",sub: "HackerRank",time: "5d 12h 40m" },
];

const activityOverview = [
  { label: "Challenges Solved",    val: "28",      change: "+12%", up: true,  emoji: "⚙️" },
  { label: "Points Earned",        val: "560",     change: "+18%", up: true,  emoji: "⭐" },
  { label: "Contests Participated",val: "2",       change: "+0%",  up: false, emoji: "🏆" },
  { label: "Hours Practiced",      val: "7h 45m",  change: "+9%",  up: true,  emoji: "⏱️" },
];

const weeklyActivity = [
  { week: "Week 1", days: [0, 1, 0, 1, 0, 2, 1] },
  { week: "Week 2", days: [1, 0, 2, 1, 1, 0, 3] },
  { week: "Week 3", days: [3, 2, 1, 3, 2, 1, 3] },
  { week: "Week 4", days: [2, 3, 1, 2, 0, 3, 2] },
];
const weekDays = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

function diffColor(d: string) {
  if (d === "Easy")   return "bg-green-500/20 text-green-600";
  if (d === "Medium") return "bg-amber-500/20 text-amber-600";
  return "bg-red-500/20 text-red-600";
}

function heatColor(v: number) {
  if (v === 0) return "bg-[#7C3AED]/10";
  if (v === 1) return "bg-[#7C3AED]/30";
  if (v === 2) return "bg-[#7C3AED]/60";
  return "bg-[#7C3AED]";
}

// ─── Modals ───────────────────────────────────────────────────────────────────

function DomainsModal({ onClose }: { onClose: () => void }) {
  const [search, setSearch] = useState("");
  const filtered = domains.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-card rounded-3xl shadow-2xl w-full max-w-xl max-h-[85vh] flex flex-col border border-border/40" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-border/40">
          <div><h2 className="text-base font-black text-text-primary">⚙️ All Domains</h2>
            <p className="text-xs text-text-secondary mt-0.5">{filtered.length} domains available</p></div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7C3AED]/10 hover:bg-[#7C3AED]/20 text-[#7C3AED]"><HiOutlineXMark className="h-4 w-4" /></button>
        </div>
        <div className="px-5 py-3 border-b border-border/40">
          <div className="relative"><HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <input type="text" placeholder="Search domains..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-border/40 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40 text-text-primary" /></div>
        </div>
        <div className="overflow-y-auto p-5 flex flex-col gap-3">
          {filtered.map(d => (
            <div key={d.name} className="flex items-center gap-4 p-4 rounded-xl border border-[#7C3AED]/15 bg-[#7C3AED]/5 hover:border-[#7C3AED]/40 transition-all cursor-pointer group">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-xl shrink-0">{d.emoji}</div>
              <div className="flex-1">
                <p className="text-sm font-black text-text-primary">{d.name}</p>
                <p className="text-xs text-text-secondary mt-0.5">{d.challenges} Challenges · {d.solved}% Solved</p>
                <div className="mt-2 h-1.5 w-full bg-[#7C3AED]/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#7C3AED] rounded-full" style={{ width: `${d.solved}%` }} />
                </div>
              </div>
              <button className="shrink-0 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-black px-4 py-2 rounded-xl transition-colors">Practice</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BadgesModal({ onClose }: { onClose: () => void }) {
  const allBadges = [
    ...badges,
    { name: "30 Days Badge",  emoji: "📅" },
    { name: "Python Expert",  emoji: "🐍" },
    { name: "Java Master",    emoji: "☕" },
    { name: "Gold Coder",     emoji: "🥇" },
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-card rounded-3xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col border border-border/40" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-border/40">
          <h2 className="text-base font-black text-text-primary">🏅 All Badges ({allBadges.length})</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7C3AED]/10 hover:bg-[#7C3AED]/20 text-[#7C3AED]"><HiOutlineXMark className="h-4 w-4" /></button>
        </div>
        <div className="overflow-y-auto p-5 grid grid-cols-3 gap-4">
          {allBadges.map(b => (
            <div key={b.name} className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-[#7C3AED]/20 bg-[#7C3AED]/5 hover:border-[#7C3AED]/40 transition-all cursor-pointer">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-3xl">{b.emoji}</div>
              <p className="text-[10px] font-black text-text-primary text-center leading-tight">{b.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContestsModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-card rounded-3xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col border border-border/40" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-border/40">
          <h2 className="text-base font-black text-text-primary">🏆 All Contests</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7C3AED]/10 hover:bg-[#7C3AED]/20 text-[#7C3AED]"><HiOutlineXMark className="h-4 w-4" /></button>
        </div>
        <div className="overflow-y-auto p-5 flex flex-col gap-3">
          {[...contests, { name: "Speed Coding Round", sub: "HackerRank", time: "7d 00h 00m" }, { name: "Global Hackathon", sub: "HackerRank", time: "10d 5h 10m" }].map(c => (
            <div key={c.name} className="flex items-center gap-4 p-4 rounded-xl border border-[#7C3AED]/15 bg-[#7C3AED]/5 hover:border-[#7C3AED]/40 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/20">
                <HiOutlineTrophy className="h-5 w-5 text-[#7C3AED]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-black text-text-primary">{c.name}</p>
                <p className="text-xs text-text-secondary">{c.sub}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <HiOutlineClock className="h-3 w-3 text-[#7C3AED]" />
                  <span className="text-xs font-bold text-[#7C3AED]">Starts in {c.time}</span>
                </div>
              </div>
              <button className="shrink-0 border-2 border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white text-xs font-black px-3 py-2 rounded-xl transition-all">Register</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChallengesModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-card rounded-3xl shadow-2xl w-full max-w-xl max-h-[85vh] flex flex-col border border-border/40" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-border/40">
          <h2 className="text-base font-black text-text-primary">🧩 Recommended Challenges</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7C3AED]/10 hover:bg-[#7C3AED]/20 text-[#7C3AED]"><HiOutlineXMark className="h-4 w-4" /></button>
        </div>
        <div className="overflow-y-auto p-5 flex flex-col gap-3">
          {[...recommendedChallenges, { name: "Grid Challenge", domain: "Algorithms", difficulty: "Easy", emoji: "🧩" }, { name: "Frequency Queries", domain: "Data Structures", difficulty: "Hard", emoji: "🗂️" }].map(c => (
            <div key={c.name} className="flex items-center gap-4 p-4 rounded-xl border border-[#7C3AED]/15 bg-[#7C3AED]/5 hover:border-[#7C3AED]/40 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-xl shrink-0">{c.emoji}</div>
              <div className="flex-1">
                <p className="text-sm font-black text-text-primary">{c.name}</p>
                <p className="text-xs text-text-secondary">{c.domain}</p>
              </div>
              <span className={`text-xs font-black px-2 py-1 rounded-lg ${diffColor(c.difficulty)}`}>{c.difficulty}</span>
              <button className="shrink-0 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-black px-3 py-2 rounded-xl transition-colors">Solve</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function HackerRankPage() {
  const [showDomains,     setShowDomains]     = useState(false);
  const [showBadges,      setShowBadges]      = useState(false);
  const [showContests,    setShowContests]    = useState(false);
  const [showChallenges,  setShowChallenges]  = useState(false);

  return (
    <>
    <div className="flex flex-col gap-5 pb-12">

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map(s => (
          <div key={s.label} className="flex flex-col gap-3 bg-card rounded-2xl border border-[#7C3AED]/20 p-4 hover:border-[#7C3AED]/50 hover:shadow-lg hover:shadow-[#7C3AED]/10 hover:-translate-y-0.5 transition-all cursor-pointer">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-2xl">{s.emoji}</div>
            <div>
              <p className="text-xs font-semibold text-text-secondary">{s.label}</p>
              <p className="text-2xl font-black text-text-primary leading-tight">{s.value}</p>
              <p className="text-xs font-bold text-[#7C3AED] mt-0.5">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Practice by Domain + Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Domains */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border/40 p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-text-primary">⚙️ Practice by Domain</h2>
            <button onClick={() => setShowDomains(true)} className="text-sm font-bold text-[#7C3AED] hover:underline flex items-center gap-1">View All Domains <HiOutlineArrowRight className="h-3.5 w-3.5" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-start">
            {domains.map(d => (
              <button key={d.name} onClick={() => setShowDomains(true)}
                className="flex flex-col gap-2 p-3 rounded-xl border border-border/40 bg-background hover:border-[#7C3AED]/40 hover:bg-[#7C3AED]/5 transition-all text-left group">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-lg shrink-0">{d.emoji}</div>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-text-primary leading-tight truncate">{d.name}</p>
                    <p className="text-xs text-text-secondary">{d.challenges} Challenges</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#7C3AED] mb-1">{d.solved}% Solved</p>
                  <div className="h-1.5 w-full bg-[#7C3AED]/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#7C3AED] rounded-full" style={{ width: `${d.solved}%` }} />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Recently Solved + Top Languages — curved card separator */}
          <div className="rounded-2xl bg-gradient-to-br from-[#7C3AED]/10 to-[#7C3AED]/5 border border-[#7C3AED]/25 p-5 mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">

            {/* Recently Solved */}
            <div className="flex flex-col gap-3">
              <p className="text-sm font-black text-text-primary">🕐 Recently Solved</p>
              <div className="flex flex-col gap-2">
                {[
                  { name: "Two Strings",              domain: "Algorithms",      diff: "Easy",   pts: 20 },
                  { name: "Hash Tables: Ransom Note", domain: "Data Structures", diff: "Easy",   pts: 25 },
                  { name: "Minimum Swaps 2",          domain: "Arrays",          diff: "Medium", pts: 40 },
                  { name: "Connected Cell in a Grid", domain: "Graphs",          diff: "Medium", pts: 50 },
                  { name: "SQL Aggregation",          domain: "SQL",             diff: "Easy",   pts: 15 },
                  { name: "List Comprehensions",      domain: "Python",          diff: "Easy",   pts: 10 },
                ].map(ch => (
                  <div key={ch.name} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#7C3AED]/5 border border-[#7C3AED]/15 hover:border-[#7C3AED]/40 transition-all cursor-pointer">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#7C3AED]/10 shrink-0">
                      <HiOutlineCodeBracket className="h-3.5 w-3.5 text-[#7C3AED]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-text-primary truncate">{ch.name}</p>
                      <p className="text-[10px] text-text-secondary">{ch.domain}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${ch.diff === "Easy" ? "bg-green-500/20 text-green-600" : "bg-amber-500/20 text-amber-600"}`}>{ch.diff}</span>
                      <span className="text-[10px] font-black text-[#7C3AED]">+{ch.pts}pts</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Languages */}
            <div className="flex flex-col gap-3">
              <p className="text-sm font-black text-text-primary">💡 Top Languages</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { lang: "Python",     pct: 70, emoji: "🐍", solved: 154, total: 220 },
                  { lang: "SQL",        pct: 60, emoji: "📋", solved: 90,  total: 150 },
                  { lang: "Java",       pct: 50, emoji: "☕", solved: 95,  total: 190 },
                  { lang: "C++",        pct: 48, emoji: "💻", solved: 77,  total: 160 },
                  { lang: "Algorithms", pct: 68, emoji: "⚙️", solved: 167, total: 245 },
                  { lang: "Shell",      pct: 72, emoji: "🐚", solved: 86,  total: 120 },
                ].map(l => (
                  <div key={l.lang} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#7C3AED]/5 border border-[#7C3AED]/15 hover:border-[#7C3AED]/40 transition-all cursor-pointer">
                    <span className="text-2xl">{l.emoji}</span>
                    <p className="text-xs font-black text-text-primary">{l.lang}</p>
                    <div className="w-full h-1.5 bg-[#7C3AED]/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#7C3AED] rounded-full" style={{ width: `${l.pct}%` }} />
                    </div>
                    <p className="text-[10px] font-black text-[#7C3AED]">{l.pct}%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>{/* end inner grid */}

          {/* Difficulty Breakdown */}
          <div className="mt-4 pt-4 border-t border-[#7C3AED]/20">
            <p className="text-sm font-black text-text-primary mb-3">📊 Problems by Difficulty</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Easy",   count: 420, pct: 65, color: "bg-green-500",  light: "bg-green-500/15 border-green-500/30 text-green-700" },
                { label: "Medium", count: 180, pct: 45, color: "bg-amber-500",  light: "bg-amber-500/15 border-amber-500/30 text-amber-700" },
                { label: "Hard",   count: 52,  pct: 20, color: "bg-red-500",    light: "bg-red-500/15 border-red-500/30 text-red-700"   },
              ].map(d => (
                <div key={d.label} className={`flex flex-col gap-2 p-3 rounded-xl border ${d.light}`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-black ${d.light.split(' ')[2]}`}>{d.label}</span>
                    <span className="text-base font-black text-text-primary">{d.count}</span>
                  </div>
                  <div className="h-2 w-full bg-black/10 rounded-full overflow-hidden">
                    <div className={`h-full ${d.color} rounded-full`} style={{ width: `${d.pct}%` }} />
                  </div>
                  <p className="text-[10px] font-bold text-text-secondary">{d.pct}% solved</p>
                </div>
              ))}
            </div>
          </div>
          </div>{/* end curved card */}
        </div>{/* end domain card */}

        {/* HackerRank Profile */}
        <div className="bg-card rounded-2xl border border-border/40 p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-text-primary">👤 Your HackerRank Profile</h2>
            <button className="text-sm font-bold text-[#7C3AED] hover:underline flex items-center gap-1">View Profile <HiOutlineArrowUpRight className="h-3.5 w-3.5" /></button>
          </div>

          {/* Rank Badge */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#7C3AED]/10 to-[#7C3AED]/5 border border-[#7C3AED]/20">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#7C3AED] text-3xl shadow-lg shadow-[#7C3AED]/30 shrink-0">🥇</div>
            <div>
              <p className="text-xl font-black text-text-primary">Gold</p>
              <p className="text-sm text-text-secondary">Rank: 8,236</p>
              <p className="text-xs text-[#7C3AED] font-bold">Top 8% of developers</p>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold mb-1.5">
              <span className="text-text-secondary">Score: 2850.6</span>
              <span className="text-[#7C3AED]">Next Rank: Platinum</span>
            </div>
            <div className="h-2 w-full bg-[#7C3AED]/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#7C3AED] rounded-full" style={{ width: "72%" }} />
            </div>
          </div>

          {/* Activity Overview */}
          <div className="border-t border-[#7C3AED]/20 pt-4">
            <h3 className="text-sm font-black text-text-primary mb-3">📊 Activity Overview</h3>
            <div className="flex flex-col gap-2.5">
              {activityOverview.map(a => (
                <div key={a.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{a.emoji}</span>
                    <span className="text-xs text-text-secondary font-medium">{a.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-text-primary">{a.val}</span>
                    <span className={`text-xs font-black ${a.up ? "text-green-500" : "text-text-secondary"}`}>{a.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Ratings */}
          <div className="border-t border-[#7C3AED]/20 pt-4">
            <h3 className="text-sm font-black text-text-primary mb-3">⭐ Skill Ratings</h3>
            <div className="flex flex-col gap-2.5">
              {[
                { skill: "Problem Solving", stars: 5 },
                { skill: "Python",          stars: 4 },
                { skill: "SQL",             stars: 4 },
                { skill: "Java",            stars: 3 },
                { skill: "Data Structures", stars: 5 },
              ].map(s => (
                <div key={s.skill} className="flex items-center justify-between">
                  <span className="text-xs font-bold text-text-secondary">{s.skill}</span>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => (
                      <span key={i} className={`text-sm ${i <= s.stars ? "text-[#7C3AED]" : "text-[#7C3AED]/20"}`}>★</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="border-t border-[#7C3AED]/20 pt-4">
            <h3 className="text-sm font-black text-text-primary mb-3">🎓 Certifications</h3>
            <div className="flex flex-col gap-2">
              {[
                { name: "Problem Solving (Basic)",      date: "Jan 2024", emoji: "🧩" },
                { name: "Python (Basic)",               date: "Feb 2024", emoji: "🐍" },
                { name: "SQL (Advanced)",               date: "Mar 2024", emoji: "📋" },
              ].map(c => (
                <div key={c.name} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#7C3AED]/5 border border-[#7C3AED]/15">
                  <span className="text-xl shrink-0">{c.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-text-primary truncate">{c.name}</p>
                    <p className="text-[10px] text-text-secondary">Earned {c.date}</p>
                  </div>
                  <span className="text-[9px] font-black bg-green-500/20 text-green-600 px-2 py-0.5 rounded-full shrink-0">✓ Verified</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ongoing Contests */}
          <div className="border-t border-[#7C3AED]/20 pt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-black text-text-primary">🏆 Ongoing Contests</h3>
              <button onClick={() => setShowContests(true)} className="text-xs font-bold text-[#7C3AED] hover:underline">View All</button>
            </div>
            <div className="flex flex-col gap-2">
              {contests.map(c => (
                <div key={c.name} className="flex items-center gap-3 p-3 rounded-xl border border-[#7C3AED]/15 bg-[#7C3AED]/5 hover:border-[#7C3AED]/40 transition-all">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/20 shrink-0">
                    <HiOutlineCodeBracket className="h-4 w-4 text-[#7C3AED]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-text-primary truncate">{c.name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <HiOutlineClock className="h-2.5 w-2.5 text-[#7C3AED]" />
                      <span className="text-[10px] font-bold text-[#7C3AED]">{c.time}</span>
                    </div>
                  </div>
                  <button className="shrink-0 border border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white text-[10px] font-black px-2 py-1.5 rounded-lg transition-all">Register</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Practice */}
      <div className="bg-card rounded-2xl border border-border/40 p-5 flex flex-col gap-4">
        <h2 className="text-base font-black text-text-primary">⚡ Quick Practice</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickPractice.map(q => (
            <div key={q.title} className="flex flex-col gap-3 p-4 rounded-2xl border border-[#7C3AED]/20 bg-[#7C3AED]/5 hover:bg-[#7C3AED]/10 hover:border-[#7C3AED]/40 hover:shadow-md transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-2xl">{q.emoji}</div>
              <div>
                <p className="text-sm font-black text-text-primary">{q.title}</p>
                <p className="text-xs text-text-secondary mt-1 leading-snug">{q.desc}</p>
              </div>
              <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-black py-2.5 rounded-xl transition-colors mt-auto shadow-sm shadow-[#7C3AED]/30">
                {q.btn}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Badges + Recommended + Weekly */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Badges Earned */}
        <div className="bg-card rounded-2xl border border-border/40 p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-text-primary">🏅 Badges Earned</h2>
            <button onClick={() => setShowBadges(true)} className="text-sm font-bold text-[#7C3AED] hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {badges.map(b => (
              <div key={b.name} className="flex flex-col items-center gap-2 cursor-pointer group">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${b.color} border-2 border-[#7C3AED]/20 group-hover:border-[#7C3AED]/60 group-hover:scale-105 transition-all text-2xl shadow-sm`}>
                  {b.emoji}
                </div>
                <p className="text-[9px] font-bold text-text-secondary text-center leading-tight max-w-[60px]">{b.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Challenges */}
        <div className="bg-card rounded-2xl border border-border/40 p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-text-primary">🧩 Recommended Challenges</h2>
            <button onClick={() => setShowChallenges(true)} className="text-sm font-bold text-[#7C3AED] hover:underline">View All</button>
          </div>
          <div className="flex flex-col gap-2.5">
            {recommendedChallenges.map(c => (
              <div key={c.name} className="flex items-center gap-3 p-3 rounded-xl border border-[#7C3AED]/15 bg-[#7C3AED]/5 hover:border-[#7C3AED]/40 transition-all group cursor-pointer">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-lg shrink-0">{c.emoji}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-text-primary truncate">{c.name}</p>
                  <p className="text-[10px] text-text-secondary">{c.domain}</p>
                </div>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg shrink-0 ${diffColor(c.difficulty)}`}>{c.difficulty}</span>
                <button className="shrink-0 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[10px] font-black px-2.5 py-1.5 rounded-lg transition-colors">Solve</button>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="bg-card rounded-2xl border border-border/40 p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-text-primary">📅 Weekly Activity</h2>
            <Link href="/calendar" className="text-sm font-bold text-[#7C3AED] hover:underline flex items-center gap-1">View Calendar <HiOutlineCalendar className="h-3.5 w-3.5" /></Link>
          </div>
          {/* Heatmap */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 pl-16">
              {weekDays.map(d => <span key={d} className="flex-1 text-[9px] font-bold text-text-secondary text-center">{d}</span>)}
            </div>
            {weeklyActivity.map(row => (
              <div key={row.week} className="flex items-center gap-2">
                <span className="text-[9px] font-bold text-text-secondary w-14 shrink-0">{row.week}</span>
                {row.days.map((v, i) => (
                  <div key={i} className={`flex-1 aspect-square rounded-md ${heatColor(v)} transition-all hover:scale-110 cursor-pointer`} title={`${v} activities`} />
                ))}
              </div>
            ))}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[9px] text-text-secondary">Less</span>
              {[0,1,2,3].map(v => <div key={v} className={`h-3 w-3 rounded-sm ${heatColor(v)}`} />)}
              <span className="text-[9px] text-text-secondary">More</span>
            </div>
          </div>

          {/* Weekly Stats Strip */}
          <div className="grid grid-cols-4 gap-3 pt-3 border-t border-[#7C3AED]/20">
            {[
              { label: "Solved",  value: "12",  emoji: "✅", sub: "+3 this week"  },
              { label: "Points",  value: "340", emoji: "⚡", sub: "Personal best" },
              { label: "Active",  value: "5/7", emoji: "🗓️", sub: "Days active"   },
              { label: "Streak",  value: "12d", emoji: "🔥", sub: "Current record"},
            ].map(s => (
              <div key={s.label} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#7C3AED]/5 border border-[#7C3AED]/15 hover:border-[#7C3AED]/30 transition-all text-center">
                <span className="text-xl">{s.emoji}</span>
                <p className="text-2xl font-black text-text-primary leading-none">{s.value}</p>
                <p className="text-xs font-black text-text-primary">{s.label}</p>
                <p className="text-[10px] font-bold text-[#7C3AED]">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>

    {showDomains    && <DomainsModal    onClose={() => setShowDomains(false)}    />}
    {showBadges     && <BadgesModal     onClose={() => setShowBadges(false)}     />}
    {showContests   && <ContestsModal   onClose={() => setShowContests(false)}   />}
    {showChallenges && <ChallengesModal onClose={() => setShowChallenges(false)} />}
    </>
  );
}
