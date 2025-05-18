
import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

interface CreatableMultiSelectProps {
  value: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  options?: string[];
  className?: string;
  allowCreate?: boolean;
}

export function CreatableMultiSelect({
  value = [],
  onChange,
  placeholder = "Select items...",
  options = [],
  className = "",
  allowCreate = true,
}: CreatableMultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleUnselect = (item: string) => {
    onChange(value.filter((i) => i !== item));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "" && value.length > 0) {
          handleUnselect(value[value.length - 1]);
        }
      }
      if (e.key === "Enter" && inputValue && allowCreate) {
        e.preventDefault();
        if (!value.includes(inputValue) && inputValue.trim() !== "") {
          onChange([...value, inputValue]);
          setInputValue("");
        }
      }
      if (e.key === "Escape") {
        input.blur();
      }
    }
  };

  const selectables = options.filter(
    (option) => !value.includes(option) && option.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className={`overflow-visible bg-white border border-input rounded-md ${className}`}
    >
      <div className="group px-3 py-2 text-sm flex gap-1 flex-wrap">
        {value.map((item) => (
          <Badge key={item} variant="secondary" className="mr-1 mb-1">
            {item}
            <button
              className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleUnselect(item);
                }
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onClick={() => handleUnselect(item)}
            >
              <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </button>
          </Badge>
        ))}
        <CommandPrimitive.Input
          ref={inputRef}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          placeholder={value.length === 0 ? placeholder : ""}
          className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1 min-w-20"
        />
      </div>
      <div className="relative">
        {open && selectables.length > 0 && (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto max-h-52">
              {selectables.map((option) => (
                <CommandItem
                  key={option}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onSelect={() => {
                    onChange([...value, option]);
                    setInputValue("");
                  }}
                  className="cursor-pointer"
                >
                  {option}
                </CommandItem>
              ))}
              {allowCreate && inputValue && !options.includes(inputValue) && (
                <CommandItem
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onSelect={() => {
                    onChange([...value, inputValue]);
                    setInputValue("");
                  }}
                  className="cursor-pointer"
                >
                  Add "{inputValue}"
                </CommandItem>
              )}
            </CommandGroup>
          </div>
        )}
      </div>
    </Command>
  );
}
