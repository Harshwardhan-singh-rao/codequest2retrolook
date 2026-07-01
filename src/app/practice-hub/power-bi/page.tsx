import { PowerBiDashboardContent } from "@/components/powerbi/PowerBiDashboardContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Power BI Practice | CodeQuest",
  description: "Learn, practice and master Power BI with real datasets",
};

export default function PowerBiPracticePage() {
  return <PowerBiDashboardContent />;
}
