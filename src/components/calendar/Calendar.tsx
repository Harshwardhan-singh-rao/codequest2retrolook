"use client";

import { useState } from "react";
import { format, addWeeks, subWeeks, addMonths, subMonths, addDays, subDays, startOfWeek, endOfWeek, isSameDay } from "date-fns";
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlinePlus } from "react-icons/hi2";
import type { CalendarEvent } from "@/types";
import { cn } from "@/utils/cn";
import { WeekView } from "./WeekView";
import { MonthView } from "./MonthView";
import { DayView } from "./DayView";
import { AddEventModal } from "./AddEventModal";

type ViewType = "day" | "week" | "month";

export function Calendar({ initialEvents }: { initialEvents: CalendarEvent[] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<ViewType>("week");
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handlePrevious = () => {
    if (currentView === "week") setCurrentDate(subWeeks(currentDate, 1));
    else if (currentView === "month") setCurrentDate(subMonths(currentDate, 1));
    else setCurrentDate(subDays(currentDate, 1));
  };

  const handleNext = () => {
    if (currentView === "week") setCurrentDate(addWeeks(currentDate, 1));
    else if (currentView === "month") setCurrentDate(addMonths(currentDate, 1));
    else setCurrentDate(addDays(currentDate, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const getHeaderText = () => {
    if (currentView === "week") {
      const start = startOfWeek(currentDate, { weekStartsOn: 1 });
      const end = endOfWeek(currentDate, { weekStartsOn: 1 });
      const isSameMonth = start.getMonth() === end.getMonth();
      return isSameMonth
        ? `${format(start, "MMM dd")} - ${format(end, "dd, yyyy")}`
        : `${format(start, "MMM dd")} - ${format(end, "MMM dd, yyyy")}`;
    }
    if (currentView === "month") {
      return format(currentDate, "MMMM yyyy");
    }
    return format(currentDate, "MMMM dd, yyyy");
  };

  const handleAddEvent = (newEvent: CalendarEvent) => {
    setEvents([...events, newEvent]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#Fdfbf7] rounded-[2rem] p-4 sm:p-8 shadow-sm border border-border">
      {/* Header */}
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            className="flex items-center justify-center h-10 w-10 rounded-full bg-[#1A1A1A] text-white shadow-sm hover:bg-black transition-colors"
            onClick={handlePrevious}
          >
            <HiOutlineChevronLeft className="h-5 w-5" />
          </button>
          
          <button 
            className="flex items-center justify-center px-5 h-10 rounded-full bg-[#1A1A1A] text-white shadow-sm hover:bg-black transition-colors font-semibold"
          >
            {getHeaderText()}
          </button>

          <button 
            className="flex items-center justify-center h-10 w-10 rounded-full bg-[#1A1A1A] text-white shadow-sm hover:bg-black transition-colors"
            onClick={handleNext}
          >
            <HiOutlineChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 rounded-full bg-[#EAE4DD]/60 p-1.5">
            <button 
              onClick={() => { handleToday(); setCurrentView("day"); }}
              className={cn("rounded-full px-5 py-1.5 text-sm font-semibold transition-colors", currentView === "day" ? "bg-[#1A1A1A] text-white shadow-sm" : "text-text-secondary hover:text-text-primary")}
            >
              Today
            </button>
            <button 
              onClick={() => setCurrentView("week")}
              className={cn("rounded-full px-5 py-1.5 text-sm font-semibold transition-colors", currentView === "week" ? "bg-[#1A1A1A] text-white shadow-sm" : "text-text-secondary hover:text-text-primary")}
            >
              Week
            </button>
            <button 
              onClick={() => setCurrentView("month")}
              className={cn("rounded-full px-5 py-1.5 text-sm font-semibold transition-colors", currentView === "month" ? "bg-[#1A1A1A] text-white shadow-sm" : "text-text-secondary hover:text-text-primary")}
            >
              Month
            </button>
          </div>

          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 transition-colors h-10"
          >
            <HiOutlinePlus className="h-4 w-4 stroke-[3px]" />
            Add Event
          </button>
        </div>
      </div>

      {/* Grid Container */}
      <div className="flex-1 flex overflow-hidden">
        {currentView === "week" && <WeekView currentDate={currentDate} events={events} />}
        {currentView === "month" && <MonthView currentDate={currentDate} events={events} onDayClick={(date) => { setCurrentDate(date); setCurrentView("day"); }} />}
        {currentView === "day" && <DayView currentDate={currentDate} events={events} />}
      </div>

      {isAddModalOpen && (
        <AddEventModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)} 
          onAdd={handleAddEvent}
          currentDate={currentDate}
        />
      )}
    </div>
  );
}
