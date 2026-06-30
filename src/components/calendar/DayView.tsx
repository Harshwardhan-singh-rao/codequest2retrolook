"use client";

import { useMemo } from "react";
import { format } from "date-fns";
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

export function DayView({ currentDate, events }: { currentDate: Date, events: CalendarEvent[] }) {
  const dateStr = format(currentDate, "yyyy-MM-dd");

  const dayEvents = useMemo(() => {
    return events.filter(e => e.date === dateStr);
  }, [events, dateStr]);

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
    <div className="flex flex-1 flex-col overflow-y-auto pr-2 hide-scrollbar">
      <div className="flex mb-4 items-center justify-center">
        <div className="flex flex-col items-center justify-center rounded-[1.5rem] py-3 px-10 bg-[#1A1A1A] text-white shadow-md">
          <span className="text-xs font-semibold uppercase tracking-wider opacity-80">{format(currentDate, "EEEE")}</span>
          <span className="mt-0.5 text-2xl font-bold font-[family-name:var(--font-poppins)]">
            {format(currentDate, "dd/MM")}
          </span>
        </div>
      </div>

      <div className="relative flex flex-1 pb-10 w-full max-w-4xl mx-auto pt-4">
        <div className="w-24 shrink-0 relative">
          {HOURS.map((hour) => (
            <div 
              key={hour} 
              className="absolute w-full text-sm font-medium text-text-secondary/60 text-right pr-6"
              style={{ top: hour * PIXELS_PER_HOUR - 10 }}
            >
              {formatHourLabel(hour, '00')}
            </div>
          ))}
          {HOURS.map((hour) => (
            <div 
              key={`${hour}-30`} 
              className="absolute w-full text-xs font-medium text-text-secondary/40 text-right pr-6"
              style={{ top: (hour + 0.5) * PIXELS_PER_HOUR - 8 }}
            >
              {formatHourLabel(hour, '30')}
            </div>
          ))}
        </div>

        <div className="absolute inset-0 left-24 right-0 overflow-hidden pointer-events-none">
          {HOURS.map((hour) => (
            <div 
              key={`line-${hour}`} 
              className="absolute left-0 right-0 border-t border-border/40"
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

        <div className="flex-1 relative h-[4320px]">
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
                  "absolute left-4 right-4 rounded-[24px] shadow-sm hover:shadow-md transition-all overflow-hidden group cursor-pointer border border-black/5 hover:-translate-y-0.5",
                  getColorClass(evt.color),
                  isVeryShort ? "px-4 py-2 flex flex-row items-center gap-3" : isShort ? "p-4 flex flex-col" : "p-6 flex flex-col"
                )}
                style={{ top: `${top}px`, height: `${Math.max(height - 4, 40)}px` }}
              >
                {isVeryShort ? (
                  <>
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/40 shadow-sm">
                      <span className="text-sm opacity-80">{evt.type === 'test' ? '🧪' : evt.type === 'planning' ? '👥' : '🩺'}</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#1A1A1A] truncate group-hover:underline font-[family-name:var(--font-poppins)] leading-none">
                      {evt.title}
                    </h4>
                  </>
                ) : (
                  <>
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/40 shadow-sm">
                        <span className="text-lg opacity-80">{evt.type === 'test' ? '🧪' : evt.type === 'planning' ? '👥' : '🩺'}</span>
                      </div>
                      {evt.badge && (
                        <div className="inline-flex rounded-full bg-white/50 px-4 py-1.5 text-xs font-bold text-[#1A1A1A]">
                          {evt.badge}
                        </div>
                      )}
                    </div>
                    
                    <h4 className="mt-4 text-xl font-bold text-[#1A1A1A] leading-tight group-hover:underline font-[family-name:var(--font-poppins)]">
                      {evt.title}
                    </h4>
                
                {evt.room && (
                  <p className="mt-2 text-sm font-medium text-[#1A1A1A]/70">
                    📍 {evt.room}
                  </p>
                )}
                
                <p className="mt-2 text-sm font-semibold text-[#1A1A1A]/50">
                  🕒 {evt.startTime} - {evt.endTime}
                </p>

                {evt.participants && evt.participants.length > 0 && (
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]/50 mb-2">Participants</p>
                      <div className="flex -space-x-2">
                        {evt.participants.map((p, i) => (
                          <div 
                            key={i} 
                            className={cn(
                              "flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-white/50 text-[10px] font-bold text-white shadow-sm",
                              i === 0 ? "bg-[#3B82F6]" : i === 1 ? "bg-[#10B981]" : i === 2 ? "bg-[#8B5CF6]" : "bg-[#F59E0B]"
                            )}
                          >
                            {p}
                          </div>
                        ))}
                      </div>
                    </div>
                    {evt.showJoin && (
                      <button className="rounded-full bg-black/60 hover:bg-[#1A1A1A] px-6 py-2.5 text-sm font-bold text-white transition-colors shadow-sm">
                        Join Meeting
                      </button>
                    )}
                  </div>
                )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
