"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  HiOutlineBars3,
  HiOutlineBell,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";
import { useTheme } from "@/context/ThemeContext";
import { useSidebar } from "@/context/SidebarContext";
import { notifications } from "@/data/mock";

// Page metadata map keyed by pathname prefix
const PAGE_META: Record<string, { title: string; subtitle: string; icon: React.ReactNode; searchPlaceholder?: string }> = {
  "/practice-hub/power-bi": {
    title: "Power BI Practice",
    subtitle: "Learn, practice and master Power BI with real datasets",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 10h4v10H4zM10 4h4v16h-4zM16 14h4v6h-4z" />
      </svg>
    ),
  },
  "/library/books": {
    title: "Books",
    subtitle: "Curated technical books to accelerate your learning",
    searchPlaceholder: "Search books, authors, topics...",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H6V4h2v8l2.5-1.5L13 12V4h5v16z" />
      </svg>
    ),
  },
  "/library/aptitude": {
    title: "Aptitude Material",
    subtitle: "Practice material for placement and competitive exams",
    searchPlaceholder: "Search topics, tests, questions...",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
      </svg>
    ),
  },
  "/library/hackerrank": {
    title: "HackerRank",
    subtitle: "Challenges and tracks to sharpen your coding skills",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
      </svg>
    ),
  },
  "/library/podcast": {
    title: "Podcast",
    subtitle: "Learn from the best tech podcasts in the industry",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3c-4.97 0-9 4.03-9 9v7c0 1.1.9 2 2 2h4v-8H5v-1c0-3.87 3.13-7 7-7s7 3.13 7 7v1h-4v8h4c1.1 0 2-.9 2-2v-7c0-4.97-4.03-9-9-9z" />
      </svg>
    ),
  },
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Your learning overview at a glance",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
      </svg>
    ),
  },
  "/practice-hub": {
    title: "Practice Hub",
    subtitle: "Choose a topic and start practicing",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
      </svg>
    ),
  },
  "/career": {
    title: "Career",
    subtitle: "Track career readiness and explore job opportunities",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 6h-2.18c.07-.23.18-.52.18-.83C18 3.87 16.96 3 16.17 3c-.72 0-1.36.4-1.69 1.05L12 7.5 9.52 4.05C9.19 3.4 8.55 3 7.83 3 7.04 3 6 3.87 6 5.17c0 .31.1.6.18.83H4C2.9 6 2 6.9 2 8v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z" />
      </svg>
    ),
  },
  "/progress": {
    title: "Progress",
    subtitle: "Detailed view of your learning journey",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z" />
      </svg>
    ),
  },
  "/courses": {
    title: "Courses",
    subtitle: "Browse and enroll in curated learning courses",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
      </svg>
    ),
  },
  "/assignments": {
    title: "Assignments",
    subtitle: "Track and submit your assignments",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
      </svg>
    ),
  },
  "/calendar": {
    title: "Calendar",
    subtitle: "Plan and schedule your learning sessions",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
      </svg>
    ),
  },
  "/live-classes": {
    title: "Live Classes",
    subtitle: "Join live sessions and interact with instructors",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
      </svg>
    ),
  },
  "/settings": {
    title: "Settings",
    subtitle: "Manage your account and preferences",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a6.93 6.93 0 0 0-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.48.48 0 0 0-.59.22L2.74 8.87a.47.47 0 0 0 .12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.47.47 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.37 1.04.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.57 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.47.47 0 0 0-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
      </svg>
    ),
  },
  "/support": {
    title: "Support",
    subtitle: "Get help and contact our support team",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
      </svg>
    ),
  },
  "/resume-builder": {
    title: "Resume Builder",
    subtitle: "Create and export your professional resume",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
      </svg>
    ),
  },
  "/learning/flow": {
    title: "Learning Flow",
    subtitle: "Visualise and plan your learning path",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
      </svg>
    ),
  },
  "/learning/planner": {
    title: "Learning Planner",
    subtitle: "Plan and schedule your learning goals",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
      </svg>
    ),
  },
  "/learning": {
    title: "Learning",
    subtitle: "Continue your personalised learning journey",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
      </svg>
    ),
  },
};

function getPageMeta(pathname: string) {
  // Match longest prefix first
  const key = Object.keys(PAGE_META)
    .filter((k) => pathname.startsWith(k))
    .sort((a, b) => b.length - a.length)[0];
  return key ? PAGE_META[key] : null;
}

export function Header({ title }: { title?: string }) {
  const { toggleMobile } = useSidebar();
  const pathname = usePathname();
  const unread = notifications.filter((n) => !n.read).length;

  const [userName, setUserName] = useState("Harshwardhan");

  useEffect(() => {
    const storedName = sessionStorage.getItem("cq_user_name");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const meta = getPageMeta(pathname);
  const initials = userName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <header className="relative flex items-center gap-4 bg-background px-4 sm:px-6 py-3 border-b border-border/30">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleMobile}
          className="rounded-button p-2 text-text-secondary hover:bg-hover hover:text-text-primary md:hidden"
          aria-label="Open navigation menu"
        >
          <HiOutlineBars3 className="h-5 w-5" />
        </button>

        {meta ? (
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C3AED] shadow-sm shrink-0">
              {meta.icon}
            </div>
            <div>
              <h1 className="font-[family-name:var(--font-poppins)] text-xl font-black text-text-primary sm:text-2xl leading-tight">
                {meta.title}
              </h1>
              <p className="text-sm font-medium text-text-primary/80 mt-0.5 hidden sm:block">
                {meta.subtitle}
              </p>
            </div>
          </div>
        ) : title ? (
          <h1 className="font-[family-name:var(--font-poppins)] text-xl font-bold text-text-primary sm:text-2xl">
            {title}
          </h1>
        ) : null}
      </div>

      {/* Search bar — always visible on all pages */}
      <div className="relative hidden sm:flex flex-1 max-w-sm">
        <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
        <input
          type="text"
          placeholder={meta?.searchPlaceholder ?? "Search..."}
          className="w-full pl-9 pr-4 py-2 rounded-full border border-border/40 bg-card text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40 text-text-primary shadow-sm"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <button
          className="relative rounded-button p-2 text-text-primary hover:bg-hover"
          aria-label={`Notifications${unread > 0 ? `, ${unread} unread` : ""}`}
        >
          <HiOutlineBell className="h-5 w-5" />
          {unread > 0 && (
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
              {unread}
            </span>
          )}
        </button>

        <div className="hidden items-center gap-2 sm:flex">
          <div className="flex items-center gap-2 rounded-full bg-card shadow-sm border border-border/40 pl-1 pr-3 py-1">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] to-purple-400 text-white font-bold text-[11px] shadow-sm ring-2 ring-card">
              {initials}
            </div>
            <span className="text-sm font-semibold text-text-primary">
              {userName}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
