
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type Tab = {
  value: string;
  label: string;
  count?: number;
  hasAttention?: boolean;
};

interface BookingsTabsProps {
  tabs: Tab[];
  value: string;
  onValueChange: (v: string) => void;
}

const BookingsTabs: React.FC<BookingsTabsProps> = ({ tabs, value, onValueChange }) => (
  <div className="w-full">
    <TabsList asChild>
      <div
        className={cn(
          "flex w-full justify-between items-center bg-[#F9F7F5] p-[0.15rem] rounded-full shadow-inner",
          "border border-purple-100/60"
        )}
        style={{
          minHeight: "46px",
          gap: "0.75rem"
        }}
      >
        {tabs.map(tab => {
          const isActive = tab.value === value;
          return (
            <TabsTrigger
              value={tab.value}
              key={tab.value}
              onClick={() => onValueChange(tab.value)}
              className={cn(
                "flex items-center relative focus:z-10 text-sm select-none transition-all font-medium whitespace-nowrap",
                "px-4 py-2",
                "rounded-full group",
                isActive
                  ? "bg-white text-[#9A7B69] font-semibold shadow-[0_1px_5px_0_rgba(0,0,0,0.06)]"
                  : "bg-transparent text-gray-500 font-normal hover:bg-white/70 hover:text-[#9A7B69]",
                "transition-all duration-200",
                "before:absolute before:content-[''] before:top-0 before:left-0 before:w-full before:h-full",
                "before:rounded-full before:transition-all"
              )}
              style={
                isActive
                  ? {
                      borderRadius: "9999px",
                      padding: "0.3rem 0.9rem",
                      boxShadow: "0 1px 5px rgba(0,0,0,0.06)",
                      color: "#9A7B69",
                      background: "#fff"
                    }
                  : { borderRadius: "9999px", padding: "0.3rem 0.9rem" }
              }
              tabIndex={0}
            >
              <span className="text-sm font-medium block transition">{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span className={cn(
                  "ml-1 text-xs font-normal transition-all",
                  isActive ? "text-[#9A7B69]" : "text-purple-400"
                )}>
                  ({tab.count})
                </span>
              )}
              {tab.hasAttention && (
                <span
                  className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse outline-white outline outline-2"
                  aria-hidden="true"
                />
              )}
            </TabsTrigger>
          );
        })}
      </div>
    </TabsList>
  </div>
);

export default BookingsTabs;

