"use client";

import { useSidebar } from "@/context/SidebarContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

export function AppShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const { collapsed } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Clean up old persistent session if present
    localStorage.removeItem("cq_user_name");
    
    const storedName = sessionStorage.getItem("cq_user_name");
    // If no user is logged in and we are not on the login/signup pages, redirect!
    if (!storedName && pathname !== "/login" && pathname !== "/signup") {
      router.replace("/login");
    }
  }, [pathname, router]);

  // Prevent flashing the dashboard before we check auth
  if (!mounted) {
    return <div className="min-h-screen bg-background" />;
  }

  if (pathname === "/login" || pathname === "/signup") {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <div className="flex h-[100dvh] w-screen flex-row gap-4 sm:gap-6 overflow-hidden bg-outer-background p-2 sm:p-4 md:p-6">
      <Sidebar />
      <div className="relative flex h-full w-full flex-1 flex-col overflow-hidden rounded-[2.5rem] border border-border/40 bg-background shadow-2xl">
        <Header title={title} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 hide-scrollbar">{children}</main>
      </div>
    </div>
  );
}
