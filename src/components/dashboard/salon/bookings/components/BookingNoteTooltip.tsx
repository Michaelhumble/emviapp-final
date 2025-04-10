
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BookingNoteTooltipProps {
  notes: string;
}

const BookingNoteTooltip: React.FC<BookingNoteTooltipProps> = ({ notes }) => {
  if (notes) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="text-sm text-blue-600 cursor-help underline underline-offset-4">
              View note
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs text-sm">{notes}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  return <span className="text-sm text-gray-400">No notes</span>;
};

export default BookingNoteTooltip;
