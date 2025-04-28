
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PremiumBadgeProps {
  className?: string;
}

export function PremiumBadge({ className }: PremiumBadgeProps) {
  return (
    <Badge 
      variant="outline" 
      className={cn(
        "bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 border-purple-200",
        "flex items-center gap-1 px-2 py-1",
        className
      )}
    >
      <Star className="h-3 w-3 fill-purple-500" />
      Featured
    </Badge>
  );
}
