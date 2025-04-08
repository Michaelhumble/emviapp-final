
import { Coffee } from "lucide-react";

interface JobTipInfoProps {
  tipRange?: string;
}

export const JobTipInfo = ({ tipRange }: JobTipInfoProps) => {
  if (!tipRange) {
    return null;
  }

  return (
    <div className="mb-4 flex items-center gap-2">
      <Coffee className="h-4 w-4 text-amber-600" />
      <span className="text-sm text-amber-700 font-medium">Tips: {tipRange}</span>
    </div>
  );
};
