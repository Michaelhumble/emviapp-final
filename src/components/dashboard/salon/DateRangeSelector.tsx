
import { Calendar, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface DateRangeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function DateRangeSelector({ value, onChange }: DateRangeSelectorProps) {
  const dateRanges = [
    { id: "last7Days", label: "Last 7 Days" },
    { id: "last30Days", label: "Last 30 Days" },
    { id: "thisMonth", label: "This Month" },
    { id: "lastMonth", label: "Last Month" },
    { id: "thisYear", label: "This Year" },
  ];

  const currentRange = dateRanges.find(range => range.id === value) || dateRanges[1];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="justify-between min-w-44">
          <span className="flex items-center gap-2">
            <Calendar size={16} /> 
            {currentRange.label}
          </span>
          <ChevronDown size={16} className="ml-2 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {dateRanges.map((range) => (
          <DropdownMenuItem
            key={range.id}
            className={`cursor-pointer ${value === range.id ? 'font-semibold' : ''}`}
            onClick={() => onChange(range.id)}
          >
            {range.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
