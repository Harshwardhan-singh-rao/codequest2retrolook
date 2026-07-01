import Link from "next/link";
import { HiOutlinePlay, HiOutlineCodeBracket, HiOutlineCircleStack, HiOutlinePresentationChartBar } from "react-icons/hi2";
import { HiArrowRight } from "react-icons/hi";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  play: HiOutlinePlay,
  code: HiOutlineCodeBracket,
  database: HiOutlineCircleStack,
  chart: HiOutlinePresentationChartBar,
};

export function QuizQuickActions({ actions }: { actions: any[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {actions.map((action) => {
        const Icon = iconMap[action.icon] || HiOutlinePlay;
        return (
          <Link
            key={action.id}
            href={action.href}
            className={`group flex items-center justify-between rounded-2xl p-4 shadow-sm border border-border/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${action.color}`}
          >
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ${action.textColor}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-text-primary group-hover:text-black transition-colors">
                  {action.title}
                </span>
                <span className="text-xs font-medium text-text-secondary">
                  {action.subtitle}
                </span>
              </div>
            </div>
            <HiArrowRight className={`h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity ${action.textColor}`} />
          </Link>
        );
      })}
    </div>
  );
}
