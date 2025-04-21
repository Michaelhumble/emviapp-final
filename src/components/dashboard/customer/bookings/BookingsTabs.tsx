
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
  <TabsList className="mb-2 w-full">
    {tabs.map(tab => (
      <TabsTrigger value={tab.value} key={tab.value} className="flex-1 relative">
        {tab.label}
        {tab.count !== undefined && tab.count > 0 && (
          <span className="ml-1.5 text-xs font-normal text-primary/80">
            ({tab.count})
          </span>
        )}
        {tab.hasAttention && (
          <span className="ml-2 inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse absolute top-1 right-3" />
        )}
      </TabsTrigger>
    ))}
  </TabsList>
);

export default BookingsTabs;
