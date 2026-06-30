"use client";

import { useEffect, useState } from "react";
import {
  HiOutlineBars3,
  HiOutlineBell,
  HiOutlineMoon,
  HiOutlineSun,
} from "react-icons/hi2";
import { useTheme } from "@/context/ThemeContext";
import { useSidebar } from "@/context/SidebarContext";
import { notifications } from "@/data/mock";
import { Badge } from "@/components/ui/Badge";

export function Header({ title }: { title?: string }) {
  const { toggleTheme, theme } = useTheme();
  const { toggleMobile } = useSidebar();
  const unread = notifications.filter((n) => !n.read).length;
  
  const [userName, setUserName] = useState("Harshwardhan");

  useEffect(() => {
    const storedName = sessionStorage.getItem("cq_user_name");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-background/80 px-4 py-4 sm:px-6 pt-6 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleMobile}
          className="rounded-button p-2 text-text-secondary hover:bg-hover hover:text-text-primary md:hidden"
          aria-label="Open navigation menu"
        >
          <HiOutlineBars3 className="h-5 w-5" />
        </button>
        {title && (
          <h1 className="font-[family-name:var(--font-poppins)] text-xl font-bold text-text-primary sm:text-2xl">
            {title}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          className="relative rounded-button p-2 text-text-secondary hover:bg-hover hover:text-text-primary"
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
          <div className="flex items-center gap-2 rounded-full bg-card shadow-sm border border-border pl-1.5 pr-3 py-1.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary">
              {userName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
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
