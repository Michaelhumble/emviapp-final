
import { format, differenceInDays } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Calendar, AlertCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ExpirationBadgeProps {
  expiresAt: string;
  showTooltip?: boolean;
}

const ExpirationBadge = ({ expiresAt, showTooltip = true }: ExpirationBadgeProps) => {
  const expirationDate = new Date(expiresAt);
  const today = new Date();
  const daysUntilExpiration = differenceInDays(expirationDate, today);
  
  const isExpired = daysUntilExpiration < 0;
  const isExpiringSoon = daysUntilExpiration >= 0 && daysUntilExpiration <= 5;
  
  const formattedDate = format(expirationDate, "MMM d, yyyy");
  
  if (isExpired) {
    return (
      <Badge variant="destructive" className="flex items-center gap-1">
        <AlertCircle className="h-3.5 w-3.5" />
        <span>Expired</span>
      </Badge>
    );
  }
  
  if (isExpiringSoon) {
    const badge = (
      <Badge variant="outline" className="border-amber-500 text-amber-700 bg-amber-50 flex items-center gap-1">
        <AlertCircle className="h-3.5 w-3.5" />
        <span>Expires in {daysUntilExpiration} days</span>
      </Badge>
    );
    
    if (showTooltip) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            {badge}
          </TooltipTrigger>
          <TooltipContent>
            <p>This post will expire on {formattedDate}</p>
          </TooltipContent>
        </Tooltip>
      );
    }
    
    return badge;
  }
  
  const badge = (
    <Badge variant="outline" className="flex items-center gap-1">
      <Calendar className="h-3.5 w-3.5" />
      <span>Expires {formattedDate}</span>
    </Badge>
  );
  
  if (showTooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {badge}
        </TooltipTrigger>
        <TooltipContent>
          <p>This post is active until {formattedDate}</p>
        </TooltipContent>
      </Tooltip>
    );
  }
  
  return badge;
};

export default ExpirationBadge;
