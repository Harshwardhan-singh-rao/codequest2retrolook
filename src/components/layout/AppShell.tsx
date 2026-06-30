"use client";

import { useSidebar } from "@/context/SidebarContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { usePathname } from "next/navigation";
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

  if (pathname === "/login" || pathname === "/signup") {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div
        className={cn(
          "min-h-screen transition-all duration-300",
          collapsed ? "md:pl-20" : "md:pl-[280px]",
        )}
      >
        <Header title={title} />
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
