import { PracticeWorkspace } from "@/components/practice/PracticeWorkspace";
import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi2";

export default function PracticeEnvironmentPage({ params }: { params: { type: string } }) {
  return (
    <div className="flex h-full flex-col gap-4">
      <Link 
        href="/practice-hub" 
        className="flex w-fit items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
      >
        <HiOutlineArrowLeft className="h-4 w-4" />
        Back to Practice Hub
      </Link>
      <PracticeWorkspace key={params.type} type={params.type} />
    </div>
  );
}
