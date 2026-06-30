"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineHome,
  HiOutlineBookOpen,
  HiOutlineVideoCamera,
  HiOutlineCodeBracket,
  HiOutlineClipboardDocumentList,
  HiOutlineDocumentText,
  HiOutlineChartBar,
  HiOutlineCog6Tooth,
  HiOutlineBriefcase,
  HiOutlineArrowRightOnRectangle,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineXMark,
  HiOutlineCalendar,
  HiOutlineAcademicCap,
  HiOutlineCommandLine,
  HiOutlineCircleStack,
  HiOutlinePresentationChartBar,
  HiOutlinePuzzlePiece,
  HiOutlineMap,
  HiOutlineChatBubbleLeftRight,
  HiOutlineLockClosed,
  HiOutlineSquares2X2,
  HiOutlineClipboardDocumentCheck,
} from "react-icons/hi2";
import { cn } from "@/utils/cn";
import { useSidebar } from "@/context/SidebarContext";
import { currentUser, navItems } from "@/data/mock";
import type { NavItem } from "@/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  dashboard: HiOutlineHome,
  jobs: HiOutlineBriefcase,
  live: HiOutlineVideoCamera,
  practice: HiOutlineCodeBracket,
  courses: HiOutlineBookOpen,
  assignments: HiOutlineClipboardDocumentList,
  resume: HiOutlineDocumentText,
  progress: HiOutlineChartBar,
  settings: HiOutlineCog6Tooth,
  code: HiOutlineCodeBracket,
  database: HiOutlineCircleStack,
  keyboard: HiOutlineCommandLine,
  chart: HiOutlinePresentationChartBar,
  quiz: HiOutlinePuzzlePiece,
  flow: HiOutlineMap,
  calendar: HiOutlineCalendar,
  planner: HiOutlineClipboardDocumentCheck,
  projects: HiOutlineSquares2X2,
  hub: HiOutlineAcademicCap,
  career: HiOutlineMap,
};

const sectionLabels: Record<string, string> = {
  menu: "Menu",
  practice: "Practice",
  learn: "Learn",
  career: "Career",
};

function NavLink({
  item,
  collapsed,
  onNavigate,
}: {
  item: NavItem;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
  const Icon = iconMap[item.icon] ?? HiOutlineHome;
  const isLocked = item.badge === "locked" || item.badge === "soon";

  return (
    <Link
      href={isLocked ? "#" : item.href}
      onClick={(e) => {
        if (isLocked) e.preventDefault();
        else onNavigate?.();
      }}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group relative flex items-center gap-3 rounded-button px-3 py-2 text-sm font-medium transition-all duration-200",
        isActive
          ? "bg-primary/15 text-primary"
          : "text-gray-400 hover:bg-white/5 hover:text-white",
        isLocked && "cursor-not-allowed opacity-60",
      )}
    >
      {isActive && (
        <motion.span
          layoutId="sidebar-active"
          className="absolute inset-0 rounded-button bg-primary/15"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
      <Icon className="relative z-10 h-4 w-4 shrink-0" />
      {!collapsed && (
        <>
          <span className="relative z-10 flex-1 truncate">{item.label}</span>
          {item.badge === "soon" && (
            <span className="relative z-10 rounded bg-accent/20 px-1.5 py-0.5 text-[10px] font-bold uppercase text-accent">
              Soon
            </span>
          )}
          {item.badge === "locked" && (
            <HiOutlineLockClosed className="relative z-10 h-3.5 w-3.5 text-gray-500" />
          )}
        </>
      )}
    </Link>
  );
}

export function Sidebar() {
  const { collapsed, mobileOpen, toggleCollapsed, closeMobile } = useSidebar();
  const sections = ["menu", "practice", "learn", "career"] as const;

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-4 py-5">
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary font-[family-name:var(--font-poppins)] text-sm font-bold text-white">
              CQ
            </div>
            <span className="font-[family-name:var(--font-poppins)] text-lg font-bold text-white">
              CodeQuest
            </span>
          </motion.div>
        )}
        {collapsed && (
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-primary font-[family-name:var(--font-poppins)] text-sm font-bold text-white">
            CQ
          </div>
        )}
        <button
          onClick={closeMobile}
          className="rounded-lg p-1.5 text-gray-400 hover:bg-white/10 hover:text-white md:hidden"
          aria-label="Close sidebar"
        >
          <HiOutlineXMark className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3" aria-label="Main navigation">
        {sections.map((section) => {
          const items = navItems.filter((n) => n.section === section);
          if (items.length === 0) return null;
          return (
            <div key={section} className="mb-3">
              {!collapsed && (
                <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                  {sectionLabels[section]}
                </p>
              )}
              {items.map((item) => (
                <NavLink
                  key={`${section}-${item.label}`}
                  item={item}
                  collapsed={collapsed}
                  onNavigate={closeMobile}
                />
              ))}
            </div>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        {!collapsed && (
          <Link
            href="/support"
            className="mb-2 flex items-center gap-2 rounded-button px-3 py-2 text-sm text-gray-400 hover:bg-white/5 hover:text-white"
          >
            <HiOutlineChatBubbleLeftRight className="h-4 w-4" />
            Feedback
          </Link>
        )}
        <Link
          href="/login"
          onClick={() => localStorage.removeItem("cq_user_name")}
          className={cn(
            "flex w-full items-center gap-3 rounded-button px-3 py-2.5 text-sm text-gray-400 transition-colors hover:bg-white/5 hover:text-white",
            collapsed && "justify-center",
          )}
          aria-label="Logout"
        >
          <HiOutlineArrowRightOnRectangle className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={closeMobile}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 280 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed left-0 top-0 z-50 hidden h-screen flex-col overflow-hidden bg-sidebar md:flex",
          "rounded-r-sidebar",
        )}
        aria-label="Sidebar"
      >
        {sidebarContent}
        <button
          onClick={toggleCollapsed}
          className="absolute -right-3 top-20 z-10 hidden h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-text-secondary shadow-card hover:text-text-primary md:flex"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <HiOutlineChevronRight className="h-3.5 w-3.5" />
          ) : (
            <HiOutlineChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>
      </motion.aside>

      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 z-50 flex h-screen w-[280px] flex-col bg-sidebar md:hidden"
            aria-label="Mobile sidebar"
          >
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
