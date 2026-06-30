import { Calendar } from "@/components/calendar/Calendar";
import { PageHeader } from "@/components/layout/PageHeader";
import { calendarEvents } from "@/data/mock";

export default function CalendarPage() {
  return (
    <div className="flex h-full flex-col gap-6">
      <PageHeader 
        title="Calendar" 
        description="Manage your schedule, deadlines, and upcoming live classes." 
      />
      <div className="w-full mt-4 flex-1 min-h-[800px]">
        <Calendar initialEvents={calendarEvents} />
      </div>
    </div>
  );
}
