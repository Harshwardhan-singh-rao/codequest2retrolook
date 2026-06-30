"use client";

import { useMemo } from "react";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import type { CalendarEvent } from "@/types";
import { cn } from "@/utils/cn";

const HOURS = Array.from({ length: 24 }, (_, i) => i); // 0 to 23
const PIXELS_PER_HOUR = 180;

function parseTime(timeStr: string) {
  const [h, m] = timeStr.split(":").map(Number);
  return h + m / 60;
}

function formatHourLabel(hour: number, minutes: string = '00') {
  const h = hour % 12 || 12;
  const ampm = hour < 12 ? 'AM' : 'PM';
  return `${h.toString().padStart(2, '0')}:${minutes} ${ampm}`;
}

export function WeekView({ currentDate, events }: { currentDate: Date, events: CalendarEvent[] }) {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  
  const DAYS = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(weekStart, i);
    return {
      label: format(date, "EEEE"), // full day name, e.g. MONDAY
      dateStr: format(date, "dd/MM"),
      fullDate: format(date, "yyyy-MM-dd"),
      active: isSameDay(date, new Date()), // highlight today, not just active day
      weekend: i >= 5
    };
  });

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
      case "yellow": return "bg-[#FDE68A]";
      case "blue": return "bg-[#BFDBFE]";
      case "pink": return "bg-[#FBCFE8]";
      case "beige":
      default: return "bg-[#EAE4DD]";
    }
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden h-full">
      {/* Days Header */}
      <div className="flex mb-4 shrink-0 overflow-hidden pr-2">
        <div className="w-16 shrink-0" /> {/* Time column spacer */}
        <div className="grid flex-1 grid-cols-7 gap-3 min-w-[800px]">
          {DAYS.map((day) => (
            <div 
              key={day.fullDate} 
              className={cn(
                "flex flex-col items-center justify-center rounded-[1.5rem] py-3 transition-colors",
                day.active ? "bg-[#1A1A1A] text-white shadow-md" : "bg-white text-text-secondary border border-border/40 shadow-sm",
                day.weekend && !day.active && "text-[#FCA5A5]"
              )}
            >
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider opacity-80">{day.label.slice(0, 3)}</span>
              <span className={cn("mt-0.5 text-base sm:text-lg font-bold font-[family-name:var(--font-poppins)]", day.active ? "text-white" : "text-text-primary", day.weekend && !day.active && "text-[#FCA5A5]")}>
                {day.dateStr}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scrollable Grid */}
      <div className="flex-1 overflow-y-auto overflow-x-auto hide-scrollbar pt-4">
        <div className="relative flex min-w-[800px] h-[4320px] pb-10">
        {/* Time markers */}
        <div className="w-20 shrink-0 relative">
          {HOURS.map((hour) => (
            <div 
              key={hour} 
              className="absolute w-full text-xs font-medium text-text-secondary/50 text-right pr-4"
              style={{ top: hour * PIXELS_PER_HOUR - 8 }}
            >
              {formatHourLabel(hour, '00')}
            </div>
          ))}
          {HOURS.map((hour) => (
            <div 
              key={`${hour}-30`} 
              className="absolute w-full text-[10px] font-medium text-text-secondary/30 text-right pr-4"
              style={{ top: (hour + 0.5) * PIXELS_PER_HOUR - 6 }}
            >
              {formatHourLabel(hour, '30')}
            </div>
          ))}
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0 left-20 right-0 overflow-hidden pointer-events-none">
          {HOURS.map((hour) => (
            <div 
              key={`line-${hour}`} 
              className="absolute left-0 right-0 border-t border-border/30"
              style={{ top: hour * PIXELS_PER_HOUR }}
            />
          ))}
          {HOURS.map((hour) => (
            <div 
              key={`line-half-${hour}`} 
              className="absolute left-0 right-0 border-t border-dashed border-border/20"
              style={{ top: (hour + 0.5) * PIXELS_PER_HOUR }}
            />
          ))}
        </div>

        {/* Events Columns */}
        <div className="grid flex-1 grid-cols-7 gap-3 relative">
          {DAYS.map((day) => {
            const dayEvents = eventsByDate.get(day.fullDate) || [];
            return (
              <div key={`col-${day.fullDate}`} className="relative h-[4320px]">
                {dayEvents.map((evt) => {
                  const startHours = parseTime(evt.startTime);
                  const endHours = parseTime(evt.endTime);
                  const top = startHours * PIXELS_PER_HOUR;
                  const height = (endHours - startHours) * PIXELS_PER_HOUR;
                  const isVeryShort = height <= 50;
                  const isShort = height <= 90;

                  return (
                    <div
                      key={evt.id}
                      className={cn(
                        "absolute left-0 right-0 rounded-[20px] shadow-sm hover:shadow-md transition-all overflow-hidden group cursor-pointer border border-black/5 hover:-translate-y-0.5",
                        getColorClass(evt.color),
                        isVeryShort ? "px-2.5 py-1.5 flex flex-row items-center gap-1.5" : isShort ? "p-3 flex flex-col" : "p-3 sm:p-4 flex flex-col"
                      )}
                      style={{ top: `${top}px`, height: `${Math.max(height - 4, 34)}px` }}
                    >
                      {isVeryShort ? (
                        <>
                          <div className="flex h-4 w-4 sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-full bg-white/40 shadow-sm">
                            <span className="text-[8px] sm:text-[10px] opacity-80">{evt.type === 'test' ? '🧪' : evt.type === 'planning' ? '👥' : '🩺'}</span>
                          </div>
                          <h4 className="text-[10px] sm:text-xs font-bold text-[#1A1A1A] truncate group-hover:underline font-[family-name:var(--font-poppins)] leading-none">
                            {evt.title}
                          </h4>
                        </>
                      ) : (
                        <>
                          <div className="flex items-start justify-between">
                            <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-white/40 shadow-sm">
                              <span className="text-[10px] sm:text-[12px] opacity-80">{evt.type === 'test' ? '🧪' : evt.type === 'planning' ? '👥' : '🩺'}</span>
                            </div>
                          </div>
                          
                          <h4 className="mt-2 sm:mt-3 text-xs sm:text-sm font-bold text-[#1A1A1A] leading-tight group-hover:underline font-[family-name:var(--font-poppins)] line-clamp-2">
                            {evt.title}
                          </h4>
                      
                      {evt.room && height > 80 && (
                        <p className="mt-1 text-[10px] sm:text-[11px] font-medium text-[#1A1A1A]/70 truncate">
                          {evt.room}
                        </p>
                      )}
                      
                      <p className="mt-1 sm:mt-1.5 text-[9px] sm:text-[10px] font-semibold text-[#1A1A1A]/40">
                        {evt.startTime} - {evt.endTime}
                      </p>

                      {evt.badge && height > 120 && (
                        <div className="mt-2 sm:mt-3 inline-flex self-start rounded-full bg-white/50 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-bold text-[#1A1A1A] line-clamp-1 break-all">
                          {evt.badge}
                        </div>
                      )}

                      {evt.participants && evt.participants.length > 0 && height > 160 && (
                        <div className="mt-auto pt-2 sm:pt-3 hidden sm:block">
                          <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/40 mb-1.5">Participants</p>
                          <div className="flex -space-x-1.5">
                            {evt.participants.map((p, i) => (
                              <div 
                                key={i} 
                                className={cn(
                                  "flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full border-2 border-white/50 text-[7px] sm:text-[8px] font-bold text-white shadow-sm",
                                  i === 0 ? "bg-[#3B82F6]" : i === 1 ? "bg-[#10B981]" : i === 2 ? "bg-[#8B5CF6]" : "bg-[#F59E0B]"
                                )}
                              >
                                {p}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </div>
  );
}
