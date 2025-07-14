import React from 'react';
import { Search, Filter, Bell, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CommunityHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

const filters = [
  { id: 'all', label: 'All', count: '2.3k' },
  { id: 'trending', label: 'Trending', count: '156', icon: Sparkles },
  { id: 'nails', label: 'Nails', count: '892' },
  { id: 'hair', label: 'Hair', count: '654' },
  { id: 'makeup', label: 'Makeup', count: '423' },
  { id: 'skincare', label: 'Skincare', count: '287' },
  { id: 'lashes', label: 'Lashes', count: '198' },
];

const CommunityHeader: React.FC<CommunityHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter
}) => {
  return (
    <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        {/* Hero Section */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-2">
            Where Beauty Pros Connect & Thrive
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of beauty professionals sharing their journey, celebrating wins, and building the future of beauty together
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search posts, creators, or techniques..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 rounded-xl border-purple-200 focus:border-purple-400 focus:ring-purple-400"
            />
          </div>
          <Button variant="outline" size="icon" className="rounded-xl border-purple-200 hover:bg-purple-50">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-xl border-purple-200 hover:bg-purple-50">
            <Bell className="h-4 w-4" />
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white/60 text-gray-700 hover:bg-white/80 border border-purple-100'
              }`}
            >
              {filter.icon && <filter.icon className="h-4 w-4" />}
              <span className="font-medium">{filter.label}</span>
              <Badge variant="secondary" className="text-xs">
                {filter.count}
              </Badge>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityHeader;