"use client";

import { useState } from "react";
import { format } from "date-fns";
import { HiOutlineXMark } from "react-icons/hi2";
import type { CalendarEvent } from "@/types";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

export function AddEventModal({ 
  isOpen, 
  onClose, 
  onAdd, 
  currentDate 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onAdd: (evt: CalendarEvent) => void;
  currentDate: Date;
}) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(format(currentDate, "yyyy-MM-dd"));
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [room, setRoom] = useState("");
  const [color, setColor] = useState<"yellow" | "blue" | "beige" | "pink">("beige");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    
    onAdd({
      id: Math.random().toString(36).substring(7),
      title,
      date,
      startTime,
      endTime,
      type: "event",
      room: room || undefined,
      color,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-6 sm:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold font-[family-name:var(--font-poppins)] text-text-primary">Add Event</h2>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-black/5 text-text-secondary transition-colors">
            <HiOutlineXMark className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-1.5">Event Title</label>
            <input 
              type="text" 
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Weekly Meeting"
              className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-1.5">Date</label>
            <input 
              type="date" 
              required
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">Start Time</label>
              <input 
                type="time" 
                required
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">End Time</label>
              <input 
                type="time" 
                required
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-1.5">Location / Room (Optional)</label>
            <input 
              type="text" 
              value={room}
              onChange={e => setRoom(e.target.value)}
              placeholder="e.g. Conference Room A"
              className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">Color Label</label>
            <div className="flex gap-3">
              {(["beige", "yellow", "blue", "pink"] as const).map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={cn(
                    "h-8 w-8 rounded-full border-2",
                    c === "beige" ? "bg-[#EAE4DD]" :
                    c === "yellow" ? "bg-[#FDE68A]" :
                    c === "blue" ? "bg-[#BFDBFE]" : "bg-[#FBCFE8]",
                    color === c ? "border-[#1A1A1A] scale-110" : "border-transparent opacity-70 hover:opacity-100"
                  )}
                />
              ))}
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Event
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
