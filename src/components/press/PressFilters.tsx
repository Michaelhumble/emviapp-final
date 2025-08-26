import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';

interface PressFiltersProps {
  onFilterChange: (filter: string) => void;
  onSearchChange: (search: string) => void;
  activeFilter: string;
}

const PressFilters: React.FC<PressFiltersProps> = ({
  onFilterChange,
  onSearchChange,
  activeFilter
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filters = [
    { key: 'all', label: 'All Markets' },
    { key: 'national', label: 'National' },
    { key: 'local', label: 'Local TV' },
    { key: 'finance', label: 'Finance' },
    { key: 'search', label: 'Search' },
    { key: 'business', label: 'Business' }
  ];

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearchChange(value);
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Search press coverage..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 focus:ring-2 focus:ring-primary focus:ring-offset-2"
        />
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap justify-center gap-2">
        {filters.map((filter) => (
          <Button
            key={filter.key}
            variant={activeFilter === filter.key ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange(filter.key)}
            className="transition-all duration-200"
          >
            <Filter className="w-3 h-3 mr-1" />
            {filter.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PressFilters;