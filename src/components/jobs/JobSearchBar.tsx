
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface JobSearchBarProps {
  value: string;
  onSearchChange: (value: string) => void;
}

const JobSearchBar: React.FC<JobSearchBarProps> = ({
  value,
  onSearchChange
}) => {
  return (
    <div className="relative mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <Input
          type="text"
          className="pl-10 pr-3 py-2 w-full rounded-md border border-gray-200 focus:border-primary focus:ring focus:ring-primary/20 shadow-sm"
          placeholder="Search by city, job type, or keyword…"
          value={value}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default JobSearchBar;
