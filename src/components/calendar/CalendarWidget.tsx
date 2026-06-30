"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineCalendar, HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import type { CalendarEvent, DayFocus } from "@/types";
import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/utils/cn";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export function CalendarWidget({
  events,
  dayFocus,
  compact = false,
}: {
  events: CalendarEvent[];
  dayFocus?: DayFocus;
  compact?: boolean;
}) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const eventDates = new Set(events.map((e) => e.date));

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card hover className={cn(compact && "p-4")}>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HiOutlineCalendar className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Calendar</CardTitle>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={prevMonth}
              className="rounded-lg p-1 text-text-secondary hover:bg-hover"
              aria-label="Previous month"
            >
              <HiOutlineChevronLeft className="h-4 w-4" />
            </button>
            <span className="min-w-[100px] text-center text-xs font-medium text-text-primary">
              {MONTHS[month].slice(0, 3)} {year}
            </span>
            <button
              onClick={nextMonth}
              className="rounded-lg p-1 text-text-secondary hover:bg-hover"
              aria-label="Next month"
            >
              <HiOutlineChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-text-secondary sm:text-xs">
          {DAYS.map((d) => (
            <div key={d} className="uppercase tracking-wider py-1">{d}</div>
          ))}
        </div>

        <div className="mb-4 grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const isToday =
              day === today.getDate() &&
              month === today.getMonth() &&
              year === today.getFullYear();
            const isSelected = day === selectedDay && month === today.getMonth() && year === today.getFullYear();
            const hasEvent = eventDates.has(dateStr);

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={cn(
                  "relative flex w-full transition-colors border border-transparent rounded-md",
                  compact 
                    ? "h-7 items-center justify-center text-xs" 
                    : "h-20 sm:h-28 flex-col items-start justify-start p-1.5 sm:p-2 text-sm hover:border-border",
                  isToday || isSelected
                    ? compact ? "bg-primary font-bold text-white" : "border-primary bg-primary/5 font-bold text-primary"
                    : hasEvent
                      ? "bg-primary/10 font-medium text-primary hover:bg-primary/20"
                      : "text-text-primary hover:bg-hover"
                )}
              >
                <span className={cn(!compact && (isToday || isSelected) && "flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white")}>
                  {day}
                </span>
                {!compact && hasEvent && (
                  <span className="mt-1 w-full truncate rounded bg-primary/20 px-1 text-[10px] font-semibold text-primary sm:text-xs text-left">
                    Event
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {dayFocus && (
          <div className="space-y-3 border-t border-border pt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Today&apos;s focus
            </p>
            <div className="rounded-button bg-hover p-3">
              <p className="text-sm font-medium text-text-primary">{dayFocus.title}</p>
              <p className="mt-1 text-xs text-text-secondary">
                {dayFocus.estimatedMinutes} min estimated
              </p>
            </div>
            <Link href="/learning/planner" className="block w-full">
              <Button variant="outline" size="sm" className="w-full">
                Open full planner
              </Button>
            </Link>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
