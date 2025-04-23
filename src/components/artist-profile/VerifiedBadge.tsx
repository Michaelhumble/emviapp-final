
import { BadgeCheck } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface VerifiedBadgeProps {
  className?: string;
}

const VerifiedBadge = ({ className = "" }: VerifiedBadgeProps) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <span className={`inline-flex align-middle ml-1 ${className}`}>
          <BadgeCheck 
            className="h-5 w-5 text-blue-500 fill-blue-200" 
            data-testid="verified-artist-badge" 
          />
        </span>
      </TooltipTrigger>
      <TooltipContent 
        side="top" 
        className="bg-white shadow text-blue-600 border border-blue-100 rounded px-3 py-2 font-medium">
        Verified for higher trust and search ranking.
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default VerifiedBadge;
