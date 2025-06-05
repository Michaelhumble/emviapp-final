
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSearchStore } from '@/components/search/store/searchStore';

const categories = [
  { value: 'all', label: 'All' },
  { value: 'salons', label: 'Salons' },
  { value: 'jobs', label: 'Jobs' },
  { value: 'artists', label: 'Artists' },
  { value: 'services', label: 'Services' },
  { value: 'deals', label: 'Deals' },
  { value: 'wanted', label: 'Wanted' },
];

const UniversalSearchBar = () => {
  const { searchQuery, selectedCategory, setSearchQuery, setSelectedCategory } = useSearchStore();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSearch = (query: string) => {
    setLocalQuery(query);
    setSearchQuery(query);
  };

  return (
    <Card className="p-6 shadow-lg bg-white/95 backdrop-blur-sm">
      <div className="flex flex-col gap-4">
        {/* Main Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search for salons, jobs, artists, services..."
            value={localQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 pr-4 py-3 text-lg border-2 border-purple-100 focus:border-purple-300 rounded-xl"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-600">Category:</span>
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button 
            variant="outline" 
            onClick={() => {
              setLocalQuery('');
              setSearchQuery('');
              setSelectedCategory('all');
            }}
          >
            Clear
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default UniversalSearchBar;
