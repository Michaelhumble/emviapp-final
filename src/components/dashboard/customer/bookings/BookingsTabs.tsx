
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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

// Note: All styling is tuned for premium look and crisp alignment on mobile/tablet.
const BookingsTabs: React.FC<BookingsTabsProps> = ({ tabs, value, onValueChange }) => (
  <div className="w-full">
    <TabsList asChild>
      <div
        className={cn(
          // Premium container
          "flex w-full whitespace-nowrap overflow-x-auto scrollbar-hide",
          "rounded-xl bg-[#F9F9FC] px-2 py-1",
          "gap-x-3 justify-between items-center"
        )}
        style={{
          WebkitOverflowScrolling: "touch",
          minHeight: "44px",
        }}
      >
        {tabs.map((tab) => {
          const isActive = tab.value === value;
          return (
            <TabsTrigger
              value={tab.value}
              key={tab.value}
              onClick={() => onValueChange(tab.value)}
              className={cn(
                "relative flex items-center justify-center font-serif text-base font-medium transition-all outline-none border-0 select-none",
                "px-4 py-2 rounded-full flex-shrink-0",
                // Premium highlight
                isActive
                  ? "bg-white text-[#9A7B69] shadow-sm font-semibold z-10"
                  : "bg-transparent text-gray-600 hover:bg-white/70 hover:text-[#9A7B69]",
                "focus:z-20",
                // Animation for font-weight/smooth interaction
                "duration-200"
              )}
              style={{
                minWidth: 90,
              }}
              tabIndex={0}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="relative z-20 flex items-center leading-none">
                {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <span
                    className={cn(
                      "ml-1 text-xs sm:text-sm font-normal",
                      isActive ? "text-[#9A7B69]" : "text-purple-400"
                    )}
                  >
                    ({tab.count})
                  </span>
                )}
              </span>
              {tab.hasAttention && (
                <span
                  className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse outline-white outline outline-2"
                  aria-hidden="true"
                />
              )}
              {/* Animated premium underline for active tab */}
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    layoutId="bookingtab-underline"
                    className="absolute left-3 right-3 -bottom-2 h-[3.5px] rounded-xl bg-gradient-to-r from-emvi-accent via-[#cbdafe] to-emvi-accent shadow"
                    initial={{ opacity: 0, scaleX: 0.3 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0.3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 24 }}
                  />
                )}
              </AnimatePresence>
            </TabsTrigger>
          );
        })}
      </div>
    </TabsList>
  </div>
);

export default BookingsTabs;
