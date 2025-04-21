
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  <TabsList className="w-full grid grid-cols-4 gap-1 bg-gray-100/50 p-1 rounded-full">
    {tabs.map(tab => (
      <TabsTrigger 
        value={tab.value} 
        key={tab.value} 
        className="relative rounded-full py-2 transition-all data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm"
      >
        <span className="text-xs sm:text-sm font-medium">{tab.label}</span>
        {tab.count !== undefined && tab.count > 0 && (
          <span className="ml-1 text-[10px] sm:text-xs font-normal text-purple-500">
            ({tab.count})
          </span>
        )}
        {tab.hasAttention && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" 
                aria-hidden="true" />
        )}
      </TabsTrigger>
    ))}
  </TabsList>
);

export default BookingsTabs;
