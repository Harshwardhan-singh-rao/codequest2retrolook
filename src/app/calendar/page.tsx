import { CalendarWidget } from "@/components/calendar/CalendarWidget";
import { PageHeader } from "@/components/layout/PageHeader";
import { calendarEvents, dayFocus } from "@/data/mock";

export default function CalendarPage() {
  return (
    <div className="flex h-full flex-col gap-6">
      <PageHeader 
        title="Calendar" 
        description="Manage your schedule, deadlines, and upcoming live classes." 
      />
      <div className="w-full mt-4 flex-1">
        <CalendarWidget events={calendarEvents} dayFocus={dayFocus} />
      </div>
    </div>
  );
}
