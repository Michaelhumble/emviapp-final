
import React from 'react';
import { Search } from 'lucide-react';

interface JobSearchBarProps {
  placeholder?: string;
  onSearchChange: (value: string) => void;
  value: string;
}

const JobSearchBar: React.FC<JobSearchBarProps> = ({ 
  placeholder = "Search by city, job type, or keyword...", 
  onSearchChange,
  value
}) => {
  return (
    <div className="relative w-full max-w-3xl mx-auto mb-6">
      <div className="relative flex items-center">
        <div className="absolute left-3 flex items-center pointer-events-none text-gray-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          className="w-full h-12 pl-10 pr-4 bg-white border border-gray-200 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default JobSearchBar;
