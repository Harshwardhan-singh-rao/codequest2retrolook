"use client";

import { useMemo } from "react";
import { HiOutlineChevronDown } from "react-icons/hi2";
import type { CalendarEvent } from "@/types";
import { cn } from "@/utils/cn";

const DAYS = [
  { label: "MONDAY", date: "11/05", fullDate: "2026-05-11" },
  { label: "TUESDAY", date: "12/05", fullDate: "2026-05-12" },
  { label: "WEDNESDAY", date: "13/05", fullDate: "2026-05-13" },
  { label: "THU", date: "14/05", fullDate: "2026-05-14", active: true },
  { label: "FR", date: "15/05", fullDate: "2026-05-15" },
  { label: "SA", date: "16/05", fullDate: "2026-05-16" },
  { label: "SU", date: "17/05", fullDate: "2026-05-17", weekend: true },
];

const HOURS = Array.from({ length: 12 }, (_, i) => i + 7); // 7 to 18

const PIXELS_PER_HOUR = 180;

function parseTime(timeStr: string) {
  const [h, m] = timeStr.split(":").map(Number);
  return h + m / 60;
}

export function WeeklyCalendar({ events }: { events: CalendarEvent[] }) {
  // Group events by date
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
      default: return "bg-[#EAE4DD]"; // Beige slightly darker than bg
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#Fdfbf7] rounded-[2rem] p-4 sm:p-8 shadow-sm border border-border">
      {/* Header */}
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <button className="flex items-center gap-2 rounded-full bg-[#1A1A1A] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black transition-colors">
          May 11/05 - 17/05
          <HiOutlineChevronDown className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-1 rounded-full bg-[#EAE4DD]/60 p-1.5">
          <button className="rounded-full px-5 py-1.5 text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors">Today</button>
          <button className="rounded-full bg-[#1A1A1A] px-5 py-1.5 text-sm font-semibold text-white shadow-sm transition-colors">Week</button>
          <button className="rounded-full px-5 py-1.5 text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors">Month</button>
        </div>
      </div>

      {/* Grid Container */}
      <div className="flex flex-1 flex-col overflow-y-auto pr-2 hide-scrollbar">
        {/* Days Header */}
        <div className="flex mb-6">
          <div className="w-16 shrink-0" /> {/* Time column spacer */}
          <div className="grid flex-1 grid-cols-7 gap-3">
            {DAYS.map((day) => (
              <div 
                key={day.date} 
                className={cn(
                  "flex flex-col items-center justify-center rounded-[1.5rem] py-3 transition-colors",
                  day.active ? "bg-[#1A1A1A] text-white shadow-md" : "bg-white text-text-secondary border border-border/40 shadow-sm",
                  day.weekend && !day.active && "text-[#FCA5A5]"
                )}
              >
                <span className="text-xs font-semibold uppercase tracking-wider opacity-80">{day.label}</span>
                <span className={cn("mt-0.5 text-lg font-bold font-[family-name:var(--font-poppins)]", day.active ? "text-white" : "text-text-primary", day.weekend && !day.active && "text-[#FCA5A5]")}>
                  {day.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable Grid */}
        <div className="relative flex min-w-[900px] flex-1 pb-10">
          {/* Time markers */}
          <div className="w-16 shrink-0 relative">
            {HOURS.map((hour) => (
              <div 
                key={hour} 
                className="absolute w-full text-xs font-medium text-text-secondary/50 text-right pr-4"
                style={{ top: (hour - 7) * PIXELS_PER_HOUR - 8 }}
              >
                {hour.toString().padStart(2, '0')}:00
              </div>
            ))}
            {HOURS.map((hour) => (
              <div 
                key={`${hour}-30`} 
                className="absolute w-full text-[10px] font-medium text-text-secondary/30 text-right pr-4"
                style={{ top: (hour - 7 + 0.5) * PIXELS_PER_HOUR - 6 }}
              >
                {hour.toString().padStart(2, '0')}:30
              </div>
            ))}
          </div>

          {/* Grid lines */}
          <div className="absolute inset-0 left-16 right-0 overflow-hidden pointer-events-none">
            {HOURS.map((hour) => (
              <div 
                key={`line-${hour}`} 
                className="absolute left-0 right-0 border-t border-border/30"
                style={{ top: (hour - 7) * PIXELS_PER_HOUR }}
              />
            ))}
            {HOURS.map((hour) => (
              <div 
                key={`line-half-${hour}`} 
                className="absolute left-0 right-0 border-t border-dashed border-border/20"
                style={{ top: (hour - 7 + 0.5) * PIXELS_PER_HOUR }}
              />
            ))}
            
            {/* Current time indicator */}
            <div 
              className="absolute left-0 right-0 border-t border-dashed border-[#F43F5E] z-10 flex items-center"
              style={{ top: (7.35 - 7) * PIXELS_PER_HOUR }} // 07:21 approx
            >
              <div className="absolute -left-11 rounded-full bg-[#F43F5E] px-1.5 py-0.5 text-[9px] font-bold text-white shadow-sm">
                07:21
              </div>
            </div>
          </div>

          {/* Events Columns */}
          <div className="grid flex-1 grid-cols-7 gap-3 relative">
            {DAYS.map((day) => {
              const dayEvents = eventsByDate.get(day.fullDate) || [];
              return (
                <div key={`col-${day.date}`} className="relative h-[2160px]">
                  {dayEvents.map((evt) => {
                    const startHours = parseTime(evt.startTime);
                    const endHours = parseTime(evt.endTime);
                    const top = (startHours - 7) * PIXELS_PER_HOUR;
                    const height = (endHours - startHours) * PIXELS_PER_HOUR;

                    return (
                      <div
                        key={evt.id}
                        className={cn(
                          "absolute left-0 right-0 rounded-[20px] p-4 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group cursor-pointer border border-black/5 hover:-translate-y-0.5",
                          getColorClass(evt.color)
                        )}
                        style={{ top: `${top}px`, height: `${height - 4}px` }} // -4px for slight gap between consecutive events
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/40 shadow-sm">
                            <span className="text-[12px] opacity-80">{evt.type === 'test' ? '🧪' : evt.type === 'planning' ? '👥' : '🩺'}</span>
                          </div>
                        </div>
                        
                        <h4 className="mt-3 text-sm font-bold text-[#1A1A1A] leading-tight group-hover:underline font-[family-name:var(--font-poppins)]">
                          {evt.title}
                        </h4>
                        
                        {evt.room && (
                          <p className="mt-1 text-[11px] font-medium text-[#1A1A1A]/70 truncate">
                            {evt.room}
                          </p>
                        )}
                        
                        <p className="mt-1.5 text-[10px] font-semibold text-[#1A1A1A]/40">
                          {evt.startTime} - {evt.endTime}
                        </p>

                        {evt.badge && (
                          <div className="mt-3 inline-flex self-start rounded-full bg-white/50 px-2.5 py-1 text-[10px] font-bold text-[#1A1A1A]">
                            {evt.badge}
                          </div>
                        )}

                        {evt.participants && evt.participants.length > 0 && (
                          <div className="mt-auto pt-3">
                            <p className="text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/40 mb-1.5">Participants</p>
                            <div className="flex -space-x-1.5">
                              {evt.participants.map((p, i) => (
                                <div 
                                  key={i} 
                                  className={cn(
                                    "flex h-5 w-5 items-center justify-center rounded-full border-2 border-white/50 text-[8px] font-bold text-white shadow-sm",
                                    i === 0 ? "bg-[#3B82F6]" : i === 1 ? "bg-[#10B981]" : i === 2 ? "bg-[#8B5CF6]" : "bg-[#F59E0B]"
                                  )}
                                >
                                  {p}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {evt.showJoin && (
                          <div className="mt-auto pt-4">
                            <button className="w-full rounded-full bg-black/40 hover:bg-[#1A1A1A] px-4 py-2 text-xs font-bold text-white transition-colors shadow-sm">
                              Join
                            </button>
                          </div>
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
