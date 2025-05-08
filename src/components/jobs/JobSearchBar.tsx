
import React from 'react';
import { Search } from 'lucide-react';

interface JobSearchBarProps {
  placeholder?: string;
  onSearchChange: (value: string) => void;
  value: string;
  onSearch?: (term: string) => void;
}

const JobSearchBar: React.FC<JobSearchBarProps> = ({ 
  placeholder = "Search by city, job type, or keyword...", 
  onSearchChange,
  value,
  onSearch
}) => {
  const handleClear = () => {
    onSearchChange('');
    if (onSearch) onSearch('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onSearchChange(newValue);
    if (onSearch) onSearch(newValue);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto mb-6">
      <div className="relative flex items-center">
        <div className="absolute left-3 flex items-center pointer-events-none text-gray-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          className="w-full h-12 pl-10 pr-12 bg-white border border-gray-200 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          aria-label="Search jobs"
        />
        {value && (
          <button
            type="button"
            className="absolute right-3 text-gray-400 hover:text-gray-600"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M15 9l-6 6" />
              <path d="M9 9l6 6" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default JobSearchBar;
