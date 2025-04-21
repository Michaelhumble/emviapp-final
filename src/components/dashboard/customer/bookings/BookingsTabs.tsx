
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
          // Cardy, calm gradient, soft border, minimalist shadow, mobile balanced
          "flex w-full justify-center sm:justify-between items-center bg-gradient-to-tr from-[#F9F7F5] via-[#F0ECE8] to-white p-1.5 rounded-full shadow-[0_8px_32px_0_rgba(213,199,197,0.06)] border border-purple-100/60",
          "min-h-[48px] sm:min-h-[50px]"
        )}
        style={{
          gap: "0.75rem"
        }}
      >
        {tabs.map((tab, i) => {
          const isActive = tab.value === value;
          return (
            <TabsTrigger
              value={tab.value}
              key={tab.value}
              onClick={() => onValueChange(tab.value)}
              className={cn(
                // Ensures all tabs are equal width/resources
                "flex-1 flex items-center justify-center relative focus:z-10 text-base select-none font-medium whitespace-nowrap",
                // padding and gap for label+dot+count
                "px-3 sm:px-4 py-2 mx-0.5 transition-all group",
                // classic rounded pill for all
                "rounded-full",
                // set soft font and calm colors for inactive
                isActive
                  ? "active-tab shadow-[0_1.5px_8px_0_rgba(154,123,105,0.13)]"
                  : "text-gray-500 hover:bg-white/85 hover:text-[#9A7B69] bg-transparent font-normal border-0",
                // smooth elevate active
                "transition duration-200"
              )}
              style={
                isActive
                  ? {
                      background: "#fff",
                      color: "#9A7B69",
                      borderRadius: "9999px",
                      padding: "0.3rem 0.9rem",
                      fontWeight: 600,
                      // Subtle shadow for elevation
                      boxShadow: "0 4px 16px rgba(154,123,105,0.1), 0 1.5px 8px rgba(154,123,105,0.12)",
                      zIndex: 2
                    }
                  : {
                      borderRadius: "9999px",
                      padding: "0.3rem 0.9rem"
                    }
              }
              tabIndex={0}
            >
              <span className={cn("text-base font-serif font-medium", isActive ? "text-[#9A7B69]" : "text-gray-600")}>
                {tab.label}
              </span>
              {tab.count !== undefined && tab.count > 0 && (
                <span className={cn(
                  "ml-1 text-xs sm:text-sm font-normal",
                  isActive ? "text-[#9A7B69]" : "text-purple-400"
                )}>
                  ({tab.count})
                </span>
              )}
              {tab.hasAttention && (
                <span
                  className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse outline-white outline outline-2"
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
