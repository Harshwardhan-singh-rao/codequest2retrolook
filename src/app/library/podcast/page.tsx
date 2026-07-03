"use client";

import { useState, useCallback } from "react";
import {
  HiOutlineSpeakerWave, HiOutlineClock, HiOutlinePlay, HiOutlinePause,
  HiOutlineBookmark, HiOutlineFire, HiOutlineMusicalNote, HiOutlineBriefcase,
  HiOutlineLightBulb, HiOutlineSparkles, HiOutlineCircleStack,
  HiOutlineEllipsisHorizontal, HiOutlineChevronRight, HiOutlineCheckCircle,
  HiOutlineXMark, HiOutlineCheck, HiOutlineUserPlus,
} from "react-icons/hi2";

// ── Toast ─────────────────────────────────────────────────────────────────────
type Toast = { id: number; message: string; type: "play" | "save" | "info" | "success" };

function ToastContainer({ toasts, onClose }: { toasts: Toast[]; onClose: (id: number) => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id}
          className="flex items-center gap-3 pointer-events-auto px-4 py-3 rounded-2xl shadow-xl text-sm font-bold text-[#F4EEDC] animate-in slide-in-from-right duration-300"
          style={{ background: t.type === "play" ? "#1E312F" : t.type === "save" ? "#AE6A43" : t.type === "success" ? "#059669" : "#3A3A3A" }}>
          <span>{t.message}</span>
          <button onClick={() => onClose(t.id)} className="ml-1 opacity-70 hover:opacity-100 pointer-events-auto">
            <HiOutlineXMark className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

// ── Goal Modal ────────────────────────────────────────────────────────────────
function GoalModal({ onClose, onSet }: { onClose: () => void; onSet: (h: number) => void }) {
  const [val, setVal] = useState(10);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-[#EDDFCB] rounded-2xl p-6 w-80 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-base font-black text-[#3A3A3A] mb-1">Set Weekly Goal</h3>
        <p className="text-xs text-[#3A3A3A]/60 mb-4">How many hours do you want to listen per week?</p>
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => setVal(Math.max(1, val - 1))}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1E312F] text-[#F4EEDC] font-black text-lg hover:bg-[#AE6A43] transition-colors">−</button>
          <div className="flex-1 text-center text-2xl font-black text-[#3A3A3A]">{val}h</div>
          <button onClick={() => setVal(Math.min(40, val + 1))}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1E312F] text-[#F4EEDC] font-black text-lg hover:bg-[#AE6A43] transition-colors">+</button>
        </div>
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 py-2 rounded-xl border border-[#3A3A3A]/20 text-xs font-bold text-[#3A3A3A] hover:bg-[#3A3A3A]/5 transition-colors">Cancel</button>
          <button onClick={() => { onSet(val); onClose(); }}
            className="flex-1 py-2 rounded-xl bg-[#AE6A43] text-[#F4EEDC] text-xs font-black hover:bg-[#c47a52] transition-colors">Save Goal</button>
        </div>
      </div>
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const stats = [
  { icon: HiOutlineSpeakerWave, label: "Total Podcasts", value: "120+", sub: "Explore now",   color: "#AE6A43" },
  { icon: HiOutlineClock,       label: "Hours Listened",  value: "45h",  sub: "Keep learning", color: "#1E312F" },
  { icon: HiOutlinePlay,        label: "Episodes Played", value: "320",  sub: "Great going!",  color: "#AE6A43" },
  { icon: HiOutlineBookmark,    label: "Bookmarks",       value: "28",   sub: "Saved episodes",color: "#1E312F" },
  { icon: HiOutlineFire,        label: "Current Streak",  value: "7 Days",sub: "Keep it up!", color: "#AE6A43" },
];
const categories = [
  { icon: HiOutlineMusicalNote,        label: "Technology",      count: 45, color: "#AE6A43" },
  { icon: HiOutlineBriefcase,          label: "Career",           count: 20, color: "#1E312F" },
  { icon: HiOutlineLightBulb,          label: "Entrepreneurship", count: 18, color: "#AE6A43" },
  { icon: HiOutlineSparkles,           label: "Motivation",       count: 15, color: "#1E312F" },
  { icon: HiOutlineCircleStack,        label: "AI & Data",        count: 12, color: "#AE6A43" },
  { icon: HiOutlineEllipsisHorizontal, label: "Others",           count: 10, color: "#1E312F" },
];
const continueListening = [
  { title: "The Tim Ferriss Show", sub: "#568: Building Wealth and Health",         left: "32 min left", bg: "#2563EB", abbr: "TFS" },
  { title: "a16z Podcast",         sub: "AI's Impact on Startups & Future",          left: "18 min left", bg: "#1E312F", abbr: "a16z" },
  { title: "Syntax",               sub: "Building Better Developer Habits",           left: "22 min left", bg: "#7C3AED", abbr: "SYN" },
  { title: "Indie Hackers",        sub: "How to Build & Launch Profitable Products",  left: "16 min left", bg: "#059669", abbr: "IH"  },
];
const popularThisWeek = [
  { rank: 1, title: "The Developer Podcast", sub: "AI Tools for Developers in 2024", dur: "45 min", bg: "#7C3AED" },
  { rank: 2, title: "a16z Podcast",           sub: "The Future of SaaS Startups",     dur: "42 min", bg: "#1E312F" },
  { rank: 3, title: "The Tim Ferriss Show",   sub: "Productivity & Focus Hacks",       dur: "1h 02m", bg: "#2563EB" },
  { rank: 4, title: "Indie Hackers",          sub: "How to Get Your First 100 Users",  dur: "38 min", bg: "#059669" },
  { rank: 5, title: "Masters of Scale",       sub: "Stories from Top Entrepreneurs",   dur: "50 min", bg: "#D97706" },
];
const topCategories = [
  { label: "Technology",       time: "18h 30m", pct: 90, color: "#7C3AED" },
  { label: "Career",           time: "10h 15m", pct: 65, color: "#059669" },
  { label: "Entrepreneurship", time: "8h 45m",  pct: 55, color: "#F59E0B" },
  { label: "Motivation",       time: "5h 20m",  pct: 35, color: "#EF4444" },
  { label: "AI & Data",        time: "4h 10m",  pct: 28, color: "#3B82F6" },
];
const recommended = [
  { title: "Lex Fridman Podcast", sub: "Conversations on Science & AI", dur: "40 min", bg: "#1a1a2e", abbr: "LF" },
  { title: "The Startup Podcast", sub: "",                               dur: "40 min", bg: "#AE6A43", abbr: "SP" },
  { title: "The Foundr Podcast",  sub: "Founders & CEOs",                dur: "40 min", bg: "#1E312F", abbr: "FP" },
  { title: "How I Built This",    sub: "Stories Behind Iconic Companies", dur: "42 min", bg: "#D97706", abbr: "HI" },
];
const newThisWeek = [
  { abbr: "DP", bg: "#7C3AED", title: "The Developer Podcast", ep: "Ep 68 — Building AI-First Products", dur: "42 min", tag: "New",      tagColor: "#AE6A43" },
  { abbr: "SY", bg: "#7C3AED", title: "Syntax.fm",              ep: "Ep 751 — CSS in 2025",               dur: "58 min", tag: "New",      tagColor: "#AE6A43" },
  { abbr: "a1", bg: "#1E312F", title: "a16z Podcast",           ep: "The Open Source AI Boom",            dur: "35 min", tag: "Hot 🔥",   tagColor: "#059669" },
  { abbr: "SD", bg: "#2563EB", title: "Software Eng. Daily",    ep: "Rust in Production at Scale",         dur: "51 min", tag: "New",      tagColor: "#AE6A43" },
  { abbr: "MS", bg: "#D97706", title: "Masters of Scale",       ep: "Why Great Leaders Listen More",       dur: "47 min", tag: "Trending", tagColor: "#D97706" },
  { abbr: "IH", bg: "#059669", title: "Indie Hackers",          ep: "From Side Project to $50k/mo",        dur: "39 min", tag: "Hot 🔥",   tagColor: "#059669" },
];
const savedList = [
  { abbr: "SE", title: "Software Eng. Daily", ep: "Scaling Microservices",      bg: "#2563EB", time: "55 min" },
  { abbr: "LF", title: "Lex Fridman",         ep: "The Nature of Intelligence", bg: "#1a1a2e", time: "2h 10m" },
  { abbr: "IH", title: "Indie Hackers",       ep: "Zero to $10k MRR",           bg: "#059669", time: "38 min" },
  { abbr: "MS", title: "Masters of Scale",    ep: "Rethinking Hiring",          bg: "#D97706", time: "44 min" },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function PodcastPage() {
  const [activeSlide, setActiveSlide]   = useState(0);
  const [isPlaying, setIsPlaying]       = useState(false);
  const [nowPlaying, setNowPlaying]     = useState<string | null>(null);
  const [saved, setSaved]               = useState<Set<string>>(new Set());
  const [followed, setFollowed]         = useState<Set<string>>(new Set());
  const [toasts, setToasts]             = useState<Toast[]>([]);
  const [goalModal, setGoalModal]       = useState(false);
  const [weeklyGoal, setWeeklyGoal]     = useState(10);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  let toastId = 0;
  const toast = useCallback((message: string, type: Toast["type"] = "info") => {
    const id = ++toastId;
    setToasts((p) => [...p, { id, message, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 3000);
  }, []);

  const removeToast = (id: number) => setToasts((p) => p.filter((t) => t.id !== id));

  const play = (title: string) => {
    setNowPlaying(title);
    setIsPlaying(true);
    toast(`▶ Now playing: ${title}`, "play");
  };
  const togglePlayer = () => {
    setIsPlaying((p) => !p);
    toast(isPlaying ? "⏸ Paused" : `▶ Resumed: ${nowPlaying ?? "episode"}`, "play");
  };
  const toggleSave = (title: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(title)) { next.delete(title); toast(`Removed "${title}" from saved`, "info"); }
      else { next.add(title); toast(`✓ Saved "${title}"`, "save"); }
      return next;
    });
  };
  const toggleFollow = (name: string) => {
    setFollowed((prev) => {
      const next = new Set(prev);
      if (next.has(name)) { next.delete(name); toast(`Unfollowed ${name}`, "info"); }
      else { next.add(name); toast(`✓ Following ${name}!`, "success"); }
      return next;
    });
  };
  const viewAll = (section: string) => toast(`Opening all ${section}…`, "info");
  const selectCategory = (label: string) => {
    setActiveCategory(label);
    toast(`Browsing ${label} podcasts`, "info");
  };

  return (
    <div className="flex flex-col gap-6 pb-12 text-[#3A3A3A]">
      <ToastContainer toasts={toasts} onClose={removeToast} />
      {goalModal && <GoalModal onClose={() => setGoalModal(false)} onSet={(h) => { setWeeklyGoal(h); toast(`✓ Weekly goal set to ${h}h!`, "success"); }} />}

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-3 bg-[#EDDFCB] rounded-2xl p-4 border border-[#3A3A3A]/10 shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: s.color + "22" }}>
              <s.icon className="h-5 w-5" style={{ color: s.color }} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#3A3A3A]/60 leading-none mb-0.5">{s.label}</p>
              <p className="text-lg font-black text-[#3A3A3A] leading-none">{s.value}</p>
              <p className="text-[10px] text-[#3A3A3A]/50 mt-0.5">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main Two-Column Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-stretch">
        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col gap-6 h-full">

          {/* Featured Podcast */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-black text-[#3A3A3A]">Featured Podcast</h2>
            </div>
            <div className="relative rounded-2xl overflow-hidden bg-[#1a1035] p-5 flex gap-5 items-center min-h-[170px] shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-[#3b1f6e] via-[#1a1035] to-[#1a1035] opacity-80" />
              <div className="relative z-10 flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#4C1D95] shadow-xl p-3 text-center">
                <p className="text-[9px] font-black text-white/70 uppercase tracking-wider">The</p>
                <p className="text-sm font-black text-white leading-tight">Developer</p>
                <p className="text-sm font-black text-white leading-tight">Podcast</p>
                <HiOutlineSpeakerWave className="h-5 w-5 text-white/60 mt-1" />
                <p className="text-[9px] text-white/50 mt-1">c/b</p>
              </div>
              <div className="relative z-10 flex-1 min-w-0">
                <span className="inline-block text-[9px] font-black uppercase tracking-wider bg-[#7C3AED] text-white px-2 py-0.5 rounded-full mb-2">Featured</span>
                <h3 className="text-lg font-black text-white leading-tight">The Developer Podcast</h3>
                <p className="text-xs text-white/60 mb-1">By CodeQuest</p>
                <p className="text-[11px] text-white/50 leading-relaxed mb-3">Deep conversations with developers, founders and tech leaders building the future.</p>
                <div className="flex gap-2">
                  <button onClick={() => play("The Developer Podcast – Ep 67")}
                    className="flex items-center gap-1.5 bg-white text-[#1a1035] text-xs font-black px-4 py-2 rounded-xl hover:bg-white/90 active:scale-95 transition-all">
                    <HiOutlinePlay className="h-3.5 w-3.5" /> Play Episode
                  </button>
                  <button onClick={() => toggleSave("The Developer Podcast")}
                    className="flex items-center gap-1.5 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all border active:scale-95"
                    style={{ background: saved.has("The Developer Podcast") ? "#AE6A43" : "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)" }}>
                    {saved.has("The Developer Podcast") ? <HiOutlineCheck className="h-3.5 w-3.5" /> : null}
                    {saved.has("The Developer Podcast") ? "Saved" : "+ Save"}
                  </button>
                </div>
              </div>
              <div className="relative z-10 shrink-0 text-right hidden sm:block">
                <p className="text-[10px] font-bold text-white/50 mb-1">Episode 67</p>
                <p className="text-sm font-black text-white leading-tight max-w-[140px]">AI Tools for Developers in 2024</p>
                <p className="text-[11px] text-white/50 mt-1">45 min</p>
                <div className="flex items-end gap-0.5 mt-2 justify-end">
                  {[3,5,8,6,9,7,4,6,8,5,3,7,9,6,4].map((h, i) => (
                    <div key={i} className="w-1 rounded-sm bg-[#7C3AED]/60" style={{ height: `${h * 2}px` }} />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-1.5 mt-2">
              {[0,1,2,3].map((i) => (
                <button key={i} onClick={() => setActiveSlide(i)}
                  className="h-1.5 rounded-full transition-all"
                  style={{ width: activeSlide === i ? "20px" : "6px", background: activeSlide === i ? "#AE6A43" : "#3A3A3A33" }} />
              ))}
            </div>
          </div>

          {/* Browse by Categories */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-black text-[#3A3A3A]">Browse by Categories</h2>
              <button onClick={() => viewAll("categories")} className="text-xs font-bold text-[#AE6A43] flex items-center gap-1 hover:underline active:scale-95 transition-transform">View All <HiOutlineChevronRight className="h-3 w-3" /></button>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {categories.map((cat) => (
                <button key={cat.label} onClick={() => selectCategory(cat.label)}
                  className="flex flex-col items-center gap-2 rounded-2xl p-3 border hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all text-center"
                  style={{ background: activeCategory === cat.label ? cat.color + "33" : "#EDDFCB", borderColor: activeCategory === cat.label ? cat.color + "66" : "rgba(58,58,58,0.1)" }}>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: cat.color + "22" }}>
                    <cat.icon className="h-4 w-4" style={{ color: cat.color }} />
                  </div>
                  <p className="text-[10px] font-black text-[#3A3A3A] leading-tight">{cat.label}</p>
                  <p className="text-[9px] text-[#3A3A3A]/50">{cat.count} Podcasts</p>
                </button>
              ))}
            </div>
          </div>

          {/* Continue Listening */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-black text-[#3A3A3A]">Continue Listening</h2>
              <button onClick={() => viewAll("listening history")} className="text-xs font-bold text-[#AE6A43] flex items-center gap-1 hover:underline active:scale-95 transition-transform">View All <HiOutlineChevronRight className="h-3 w-3" /></button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {continueListening.map((pod) => (
                <div key={pod.title} className="flex flex-col bg-[#EDDFCB] rounded-2xl border border-[#3A3A3A]/10 p-3 gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
                  onClick={() => play(pod.title)}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl font-black text-white text-sm" style={{ background: pod.bg }}>{pod.abbr}</div>
                  <p className="text-xs font-black text-[#3A3A3A] leading-tight">{pod.title}</p>
                  <p className="text-[10px] text-[#3A3A3A]/60 leading-tight">{pod.sub}</p>
                  <div className="h-1 bg-[#3A3A3A]/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#AE6A43] rounded-full" style={{ width: "55%" }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[9px] text-[#3A3A3A]/50">{pod.left}</p>
                    <button onClick={(e) => { e.stopPropagation(); play(pod.title); }}
                      className="flex h-6 w-6 items-center justify-center rounded-full transition-colors active:scale-90"
                      style={{ background: nowPlaying === pod.title && isPlaying ? "#AE6A43" : "#1E312F" }}>
                      {nowPlaying === pod.title && isPlaying
                        ? <HiOutlinePause className="h-3 w-3 text-[#F4EEDC]" />
                        : <HiOutlinePlay className="h-3 w-3 text-[#F4EEDC]" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Three-Column */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">

            {/* Top Categories */}
            <div className="bg-[#EDDFCB] rounded-2xl border border-[#3A3A3A]/10 p-4 shadow-sm flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-black text-[#3A3A3A]">Top Categories</h2>
                <button onClick={() => viewAll("top categories")} className="text-xs font-bold text-[#AE6A43] hover:underline active:scale-95 transition-transform">View All</button>
              </div>
              <div className="flex flex-col gap-2.5">
                {topCategories.map((cat) => (
                  <button key={cat.label} onClick={() => selectCategory(cat.label)} className="flex items-center gap-2 group text-left hover:opacity-80 active:scale-[0.98] transition-all">
                    <p className="text-[11px] font-bold text-[#3A3A3A] w-24 shrink-0">{cat.label}</p>
                    <div className="flex-1 h-1.5 bg-[#3A3A3A]/10 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${cat.pct}%`, background: cat.color }} />
                    </div>
                    <p className="text-[10px] text-[#3A3A3A]/50 w-12 text-right shrink-0">{cat.time}</p>
                  </button>
                ))}
              </div>
              <div className="border-t border-[#3A3A3A]/10" />
              <div>
                <p className="text-[11px] font-black text-[#3A3A3A] mb-2">This Week vs Last Week</p>
                <div className="flex items-end gap-1 h-14">
                  {[{day:"M",tw:60,lw:40},{day:"T",tw:80,lw:55},{day:"W",tw:45,lw:70},{day:"T",tw:90,lw:60},{day:"F",tw:70,lw:50},{day:"S",tw:50,lw:80},{day:"S",tw:30,lw:45}].map((d, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                      <div className="w-full flex items-end gap-0.5 justify-center" style={{ height: "44px" }}>
                        <div className="w-1.5 rounded-t-sm" style={{ height: `${d.lw * 0.44}px`, background: "#3A3A3A22" }} />
                        <div className="w-1.5 rounded-t-sm" style={{ height: `${d.tw * 0.44}px`, background: "#AE6A43" }} />
                      </div>
                      <p className="text-[8px] text-[#3A3A3A]/40">{d.day}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 mt-1.5">
                  <div className="flex items-center gap-1"><div className="h-2 w-2 rounded-sm bg-[#AE6A43]" /><p className="text-[9px] text-[#3A3A3A]/50">This week</p></div>
                  <div className="flex items-center gap-1"><div className="h-2 w-2 rounded-sm bg-[#3A3A3A]/20" /><p className="text-[9px] text-[#3A3A3A]/50">Last week</p></div>
                </div>
              </div>
              <div className="border-t border-[#3A3A3A]/10" />
              <div>
                <p className="text-[11px] font-black text-[#3A3A3A] mb-2">Your Top Hosts</p>
                <div className="flex flex-col gap-2">
                  {[{abbr:"LF",name:"Lex Fridman",eps:"12 episodes",bg:"#1a1a2e"},{abbr:"TF",name:"Tim Ferriss",eps:"9 episodes",bg:"#2563EB"},{abbr:"SY",name:"Saron Yitbarek",eps:"7 episodes",bg:"#7C3AED"}].map((host) => (
                    <div key={host.name} className="flex items-center gap-2">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white text-[9px] font-black" style={{ background: host.bg }}>{host.abbr}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-black text-[#3A3A3A] truncate">{host.name}</p>
                        <p className="text-[9px] text-[#3A3A3A]/50">{host.eps}</p>
                      </div>
                      <button onClick={() => toggleFollow(host.name)}
                        className="text-[9px] font-bold shrink-0 px-2 py-0.5 rounded-lg transition-all active:scale-90"
                        style={{ background: followed.has(host.name) ? "#1E312F" : "transparent", color: followed.has(host.name) ? "#F4EEDC" : "#AE6A43" }}>
                        {followed.has(host.name) ? <span className="flex items-center gap-1"><HiOutlineCheck className="h-3 w-3" /> Following</span> : <span className="flex items-center gap-1"><HiOutlineUserPlus className="h-3 w-3" /> Follow</span>}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommended for You */}
            <div className="bg-[#EDDFCB] rounded-2xl border border-[#3A3A3A]/10 p-4 shadow-sm flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-black text-[#3A3A3A]">Recommended for You</h2>
                <button onClick={() => viewAll("recommendations")} className="text-xs font-bold text-[#AE6A43] hover:underline active:scale-95 transition-transform">View All</button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {recommended.map((pod) => (
                  <div key={pod.title} className="flex flex-col bg-[#B7A398]/30 rounded-2xl border border-[#3A3A3A]/10 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
                    onClick={() => play(pod.title)}>
                    <div className="flex h-20 items-center justify-center font-black text-white text-lg" style={{ background: pod.bg }}>{pod.abbr}</div>
                    <div className="p-2">
                      <p className="text-[10px] font-black text-[#3A3A3A] leading-tight">{pod.title}</p>
                      {pod.sub && <p className="text-[9px] text-[#3A3A3A]/50 leading-tight mt-0.5">{pod.sub}</p>}
                      <div className="flex items-center justify-between mt-1.5">
                        <p className="text-[9px] text-[#3A3A3A]/50">{pod.dur}</p>
                        <button onClick={(e) => { e.stopPropagation(); toggleSave(pod.title); }}
                          className="text-[9px] font-bold transition-all active:scale-90"
                          style={{ color: saved.has(pod.title) ? "#059669" : "#AE6A43" }}>
                          {saved.has(pod.title) ? "✓ Saved" : "+ Save"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-auto border-t border-[#3A3A3A]/10 pt-3">
                <p className="text-[11px] font-black text-[#3A3A3A] mb-2">Most Saved This Month</p>
                <div className="flex flex-col gap-1.5">
                  {[{abbr:"DP",bg:"#7C3AED",title:"The Developer Podcast",saves:"1.2k"},{abbr:"LF",bg:"#1a1a2e",title:"Lex Fridman Podcast",saves:"980"},{abbr:"MS",bg:"#D97706",title:"Masters of Scale",saves:"754"}].map((p) => (
                    <button key={p.title} onClick={() => play(p.title)} className="flex items-center gap-2 hover:opacity-80 active:scale-[0.98] transition-all text-left">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-white text-[8px] font-black" style={{ background: p.bg }}>{p.abbr}</div>
                      <p className="flex-1 text-[10px] font-bold text-[#3A3A3A] truncate">{p.title}</p>
                      <p className="text-[9px] text-[#3A3A3A]/40 shrink-0">{p.saves} saves</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* New This Week */}
            <div className="bg-[#EDDFCB] rounded-2xl border border-[#3A3A3A]/10 p-4 shadow-sm flex flex-col gap-2">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-sm font-black text-[#3A3A3A]">New This Week</h2>
                <button onClick={() => viewAll("new episodes")} className="text-xs font-bold text-[#AE6A43] flex items-center gap-1 hover:underline active:scale-95 transition-transform">View All <HiOutlineChevronRight className="h-3 w-3" /></button>
              </div>
              {newThisWeek.map((ep) => (
                <div key={ep.ep} className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 hover:bg-[#3A3A3A]/5 transition-colors cursor-pointer group"
                  onClick={() => play(`${ep.title} – ${ep.ep}`)}>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white text-[10px] font-black" style={{ background: ep.bg }}>{ep.abbr}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-[11px] font-black text-[#3A3A3A] truncate">{ep.title}</p>
                      <span className="shrink-0 text-[8px] font-black px-1 py-0.5 rounded-full text-white leading-none" style={{ background: ep.tagColor }}>{ep.tag}</span>
                    </div>
                    <p className="text-[9px] text-[#3A3A3A]/50 truncate">{ep.ep}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <p className="text-[9px] text-[#3A3A3A]/40">{ep.dur}</p>
                    <button onClick={(e) => { e.stopPropagation(); play(`${ep.title} – ${ep.ep}`); }}
                      className="flex h-6 w-6 items-center justify-center rounded-full border border-[#3A3A3A]/20 hover:bg-[#AE6A43] hover:border-[#AE6A43] active:scale-90 transition-all">
                      <HiOutlinePlay className="h-3 w-3 text-[#3A3A3A] group-hover:text-white" />
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-auto border-t border-[#3A3A3A]/10 pt-3 flex items-center justify-between gap-3">
                {[{label:"New Today",val:"12"},{label:"This Week",val:"48"},{label:"This Month",val:"190"}].map((s) => (
                  <div key={s.label} className="flex-1 flex flex-col items-center bg-[#3A3A3A]/5 rounded-xl py-2">
                    <p className="text-sm font-black text-[#3A3A3A]">{s.val}</p>
                    <p className="text-[9px] text-[#3A3A3A]/50 text-center">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="flex flex-col gap-5 h-full">

          {/* Listening Stats */}
          <div className="bg-[#EDDFCB] rounded-2xl border border-[#3A3A3A]/10 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-black text-[#3A3A3A]">Your Listening Stats</h2>
              <button onClick={() => toast("Showing this week's stats", "info")} className="text-xs font-bold text-[#3A3A3A]/50 flex items-center gap-1 hover:text-[#AE6A43] active:scale-95 transition-all">This Week <HiOutlineChevronRight className="h-3 w-3" /></button>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
                <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#3A3A3A22" strokeWidth="10" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#7C3AED" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="138.2" strokeLinecap="round" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <p className="text-base font-black text-[#3A3A3A]">{Math.round((weeklyGoal > 0 ? 4.5 / weeklyGoal : 0.45) * 100)}%</p>
                  <p className="text-[9px] text-[#3A3A3A]/50">Weekly Goal</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {[{dot:"#7C3AED",label:"Goal",val:`${weeklyGoal}h`},{dot:"#059669",label:"Listened",val:"4h 30m"},{dot:"#AE6A43",label:"Remaining",val:`${weeklyGoal - 4}h 30m`}].map((r) => (
                  <div key={r.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full" style={{ background: r.dot }} />
                      <p className="text-[11px] text-[#3A3A3A]/70">{r.label}</p>
                    </div>
                    <p className="text-[11px] font-black text-[#3A3A3A]">{r.val}</p>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => setGoalModal(true)}
              className="w-full flex items-center justify-center gap-2 border border-[#3A3A3A]/20 rounded-xl py-2.5 text-xs font-bold text-[#3A3A3A] hover:bg-[#AE6A43] hover:text-[#F4EEDC] hover:border-[#AE6A43] active:scale-95 transition-all">
              <HiOutlineCheckCircle className="h-4 w-4" /> Set Weekly Goal
            </button>
          </div>

          {/* Popular This Week */}
          <div className="bg-[#EDDFCB] rounded-2xl border border-[#3A3A3A]/10 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-black text-[#3A3A3A]">Popular This Week</h2>
              <button onClick={() => viewAll("popular podcasts")} className="text-xs font-bold text-[#AE6A43] hover:underline active:scale-95 transition-transform">View All</button>
            </div>
            <div className="flex flex-col gap-3">
              {popularThisWeek.map((pod) => (
                <div key={pod.rank} className="flex items-center gap-3 group">
                  <p className="text-xs font-black text-[#3A3A3A]/40 w-4 shrink-0">{pod.rank}</p>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white text-[10px] font-black" style={{ background: pod.bg }}>
                    {pod.title.split(" ").map((w: string) => w[0]).join("").slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0 cursor-pointer" onClick={() => play(pod.title)}>
                    <p className="text-[11px] font-black text-[#3A3A3A] truncate hover:text-[#AE6A43] transition-colors">{pod.title}</p>
                    <p className="text-[10px] text-[#3A3A3A]/50 truncate">{pod.sub}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <p className="text-[10px] text-[#3A3A3A]/50">{pod.dur}</p>
                    <button onClick={() => play(pod.title)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-[#3A3A3A]/20 hover:bg-[#AE6A43] hover:border-[#AE6A43] active:scale-90 transition-all">
                      <HiOutlinePlay className="h-3 w-3 text-[#3A3A3A] group-hover:text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Now Playing */}
          <div className="rounded-2xl overflow-hidden shadow-sm border border-[#3A3A3A]/10">
            <div className="bg-gradient-to-br from-[#1E312F] to-[#2d4a45] p-4">
              <p className="text-[10px] font-black uppercase tracking-wider text-[#F4EEDC]/50 mb-3">Now Playing</p>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#AE6A43] font-black text-[#F4EEDC] text-sm shadow-md">DP</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-[#F4EEDC] truncate">{nowPlaying ?? "The Developer Podcast"}</p>
                  <p className="text-[10px] text-[#F4EEDC]/50 truncate">AI Tools for Developers in 2024</p>
                </div>
                <button onClick={togglePlayer} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#AE6A43] hover:bg-[#c47a52] active:scale-90 transition-all shadow">
                  {isPlaying ? <HiOutlinePause className="h-4 w-4 text-[#F4EEDC]" /> : <HiOutlinePlay className="h-4 w-4 text-[#F4EEDC]" />}
                </button>
              </div>
              <div className="flex items-end gap-0.5 mb-2 h-8">
                {[2,4,7,5,8,6,3,5,9,7,4,6,8,5,3,6,9,7,4,5,8,6,3,7,5,4,6,8,5,3].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm transition-all"
                    style={{ height: `${h * 3}px`, background: isPlaying && i < 12 ? "#AE6A43" : i < 12 ? "#AE6A4388" : "#F4EEDC22" }} />
                ))}
              </div>
              <div className="flex justify-between mb-3">
                <p className="text-[10px] text-[#F4EEDC]/50">18:30</p>
                <p className="text-[10px] text-[#F4EEDC]/50">45:00</p>
              </div>
              <div className="flex items-center justify-center gap-5">
                <button onClick={() => toast("⏮ Skipped back 15s", "play")} className="text-[#F4EEDC]/50 hover:text-[#F4EEDC] active:scale-90 transition-all">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>
                </button>
                <button onClick={togglePlayer} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#AE6A43] hover:bg-[#c47a52] active:scale-90 shadow-lg transition-all">
                  {isPlaying ? <HiOutlinePause className="h-5 w-5 text-[#F4EEDC]" /> : <HiOutlinePlay className="h-5 w-5 text-[#F4EEDC]" />}
                </button>
                <button onClick={() => toast("⏭ Skipped forward 15s", "play")} className="text-[#F4EEDC]/50 hover:text-[#F4EEDC] active:scale-90 transition-all">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zm2.5-6 5.5 3.9V8.1z"/></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Recently Saved */}
          <div className="bg-[#EDDFCB] rounded-2xl border border-[#3A3A3A]/10 p-4 shadow-sm flex flex-col flex-1">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-black text-[#3A3A3A]">Recently Saved</h2>
              <button onClick={() => viewAll("saved episodes")} className="text-xs font-bold text-[#AE6A43] hover:underline active:scale-95 transition-transform">View All</button>
            </div>
            <div className="flex flex-col justify-between flex-1">
              {savedList.map((pod) => (
                <div key={pod.title} className="flex items-center gap-3 group rounded-xl px-2 py-2 hover:bg-[#3A3A3A]/5 transition-colors cursor-pointer"
                  onClick={() => play(pod.title)}>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white text-[10px] font-black" style={{ background: pod.bg }}>{pod.abbr}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-black text-[#3A3A3A] truncate">{pod.title}</p>
                    <p className="text-[10px] text-[#3A3A3A]/50 truncate">{pod.ep}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <p className="text-[10px] text-[#3A3A3A]/40">{pod.time}</p>
                    <button onClick={(e) => { e.stopPropagation(); toast(`Removed "${pod.title}" from saved`, "info"); }}
                      className="active:scale-90 transition-transform">
                      <HiOutlineBookmark className="h-3.5 w-3.5 text-[#AE6A43] fill-[#AE6A43] hover:fill-transparent transition-all" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Pro Tip Banner ── */}
      <div className="flex items-center gap-3 bg-[#1E312F]/10 border border-[#1E312F]/20 rounded-2xl px-5 py-3">
        <HiOutlineLightBulb className="h-5 w-5 text-[#AE6A43] shrink-0" />
        <p className="text-xs font-bold text-[#3A3A3A]">
          <span className="text-[#AE6A43] font-black">Pro Tip:</span> Listen to podcasts during your commute or workout to make the most of your time!
        </p>
      </div>

    </div>
  );
}
