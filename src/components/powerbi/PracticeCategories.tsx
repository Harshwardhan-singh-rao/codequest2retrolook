"use client";

import { HiOutlineChartPie, HiOutlineChartBar, HiOutlineCube, HiOutlineDocumentText, HiOutlineViewColumns } from "react-icons/hi2";

const catIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  pie: HiOutlineChartPie,
  chartBar: HiOutlineChartBar,
  cube: HiOutlineCube,
  document: HiOutlineDocumentText,
  layout: HiOutlineViewColumns,
};

export function PracticeCategories({ categories }: { categories: any[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-bold text-text-primary">Practice by Category</h3>
      <div className="flex flex-wrap gap-4">
        {categories.map((cat) => {
          const Icon = catIconMap[cat.icon] || HiOutlineChartPie;
          return (
            <div 
              key={cat.id} 
              className="flex items-center gap-3 bg-card p-4 pr-6 rounded-xl shadow-sm border border-border/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm border-2 ${cat.borderColor} ${cat.iconColor}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-text-primary">{cat.title}</span>
                <span className="text-[10px] text-text-secondary mt-0.5">{cat.count}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
