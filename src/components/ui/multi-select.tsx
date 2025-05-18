
import React from 'react';
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  emptyMessage?: string;
  className?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options",
  emptyMessage = "No options found.",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  
  // Add defensive check for selected
  const safeSelected = Array.isArray(selected) ? selected : [];

  const handleUnselect = (item: string) => {
    onChange(safeSelected.filter((i) => i !== item));
  };

  // Add defensive check for options
  const safeOptions = Array.isArray(options) ? options : [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full justify-between ${safeSelected.length > 0 ? "h-auto" : "h-10"}`}
          onClick={() => setOpen(!open)}
        >
          <div className="flex flex-wrap gap-1">
            {safeSelected.length === 0 && placeholder}
            {safeSelected.map((item) => {
              const option = safeOptions.find((o) => o.value === item);
              return (
                <Badge
                  key={item}
                  variant="secondary"
                  className="mr-1 mb-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUnselect(item);
                  }}
                >
                  {option?.label || item}
                  <span className="ml-1 cursor-pointer" onClick={(e) => {
                    e.stopPropagation();
                    handleUnselect(item);
                  }}>×</span>
                </Badge>
              );
            })}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className={className}>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>{emptyMessage}</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {safeOptions.map((option) => {
              const isSelected = safeSelected.includes(option.value);
              return (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    onChange(
                      isSelected
                        ? safeSelected.filter((item) => item !== option.value)
                        : [...safeSelected, option.value]
                    );
                    setOpen(true);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      isSelected ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </Command>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default MultiSelect;
