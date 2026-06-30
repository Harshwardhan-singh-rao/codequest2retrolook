"use client";

import { useMemo } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, startOfWeek, endOfWeek } from "date-fns";
import type { CalendarEvent } from "@/types";
import { cn } from "@/utils/cn";

export function MonthView({ currentDate, events, onDayClick }: { currentDate: Date, events: CalendarEvent[], onDayClick: (date: Date) => void }) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    events.forEach(event => {
      if (!map.has(event.date)) map.set(event.date, []);
      map.get(event.date)!.push(event);
    });
    return map;
  }, [events]);

  const getColorClass = (color?: string) => {
    switch (color) {
      case "yellow": return "bg-[#FDE68A] text-[#92400E]";
      case "blue": return "bg-[#BFDBFE] text-[#1E40AF]";
      case "pink": return "bg-[#FBCFE8] text-[#9D174D]";
      case "beige":
      default: return "bg-[#EAE4DD] text-[#78716C]";
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white rounded-2xl border border-border overflow-hidden">
      <div className="grid grid-cols-7 border-b border-border bg-[#Fdfbf7]">
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d, i) => (
          <div key={d} className={cn("py-3 text-center text-xs font-bold text-text-secondary tracking-wider", i >= 5 && "text-[#FCA5A5]")}>
            {d}
          </div>
        ))}
      </div>
      <div className="flex-1 grid grid-cols-7 grid-rows-5 sm:grid-rows-6">
        {days.map((day, i) => {
          const dateStr = format(day, "yyyy-MM-dd");
          const dayEvents = eventsByDate.get(dateStr) || [];
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isToday = isSameDay(day, new Date());

          return (
            <div 
              key={day.toString()}
              onClick={() => onDayClick(day)}
              className={cn(
                "border-b border-r border-border/50 p-1 sm:p-2 flex flex-col cursor-pointer transition-colors hover:bg-black/5",
                !isCurrentMonth && "bg-black/5 opacity-50",
                (i + 1) % 7 === 0 && "border-r-0"
              )}
            >
              <div className="flex justify-between items-start">
                <span className={cn(
                  "flex items-center justify-center h-6 w-6 sm:h-7 sm:w-7 rounded-full text-xs sm:text-sm font-semibold",
                  isToday ? "bg-[#1A1A1A] text-white" : "text-text-primary"
                )}>
                  {format(day, "d")}
                </span>
                {dayEvents.length > 0 && (
                  <span className="text-[10px] font-medium text-text-secondary hidden sm:inline-block">
                    {dayEvents.length} events
                  </span>
                )}
              </div>
              <div className="mt-1 flex-1 flex flex-col gap-1 overflow-y-auto hide-scrollbar">
                {dayEvents.slice(0, 3).map(evt => (
                  <div 
                    key={evt.id} 
                    className={cn(
                      "px-1.5 py-1 text-[9px] sm:text-[10px] font-semibold rounded truncate",
                      getColorClass(evt.color)
                    )}
                  >
                    {evt.startTime} {evt.title}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-[10px] font-medium text-text-secondary pl-1">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
