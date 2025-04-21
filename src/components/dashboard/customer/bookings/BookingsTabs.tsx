
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

const BookingsTabs: React.FC<BookingsTabsProps> = ({ tabs, value, onValueChange }) => (
  <div className="w-full px-mobileTab">
    <TabsList asChild>
      <div
        className={cn(
          "flex w-full whitespace-nowrap scrollbar-hide bg-tabBar-gradient rounded-2xl shadow-tabBar gap-x-3 sm:gap-x-6",
          "overflow-x-auto items-center justify-between py-2 px-2 sm:px-4",
          "min-h-[48px] sm:min-h-[52px]"
        )}
        style={{
          WebkitOverflowScrolling: "touch",
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
                // Tab container
                "relative flex items-center justify-center px-5 py-2 sm:px-7 rounded-full font-serif text-base",
                "transition-all duration-200 ease-emviTab group min-w-[90px] select-none",
                "border-0 outline-none",
                // Spacing and breathing room
                "flex-shrink-0 my-0.5",
                // Active tab styling
                isActive
                  ? "bg-white text-emvi-accent font-bold shadow-tabActive z-10"
                  : "bg-transparent text-gray-600 font-medium hover:bg-white/60 hover:text-emvi-accent",
                "focus:z-20"
              )}
              style={{
                transitionProperty: "background, color, box-shadow",
              }}
              tabIndex={0}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="relative z-20 flex items-center leading-none">
                {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <span
                    className={cn(
                      "ml-1 text-xs sm:text-sm",
                      isActive ? "text-emvi-accent" : "text-purple-400"
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
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    layoutId="bookingtab-underline"
                    className="emvi-bookingtab-underline"
                    initial={{ opacity: 0, scaleX: 0.4 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0.4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
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
