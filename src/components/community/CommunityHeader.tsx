import React, { useState, useEffect } from 'react';
import { Search, Filter, Bell, Sparkles, ChevronUp } from 'lucide-react';
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
  const [scrollY, setScrollY] = useState(0);
  const [isCompact, setIsCompact] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine compact state (scrolled past hero section)
      setIsCompact(currentScrollY > 100);
      
      // Determine hidden state (auto-hide on scroll down past 300px)
      if (currentScrollY > 300) {
        if (currentScrollY > lastScrollY && !isHovered) {
          // Scrolling down - hide
          setIsHidden(true);
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up - show
          setIsHidden(false);
        }
      } else {
        // Near top - always show
        setIsHidden(false);
      }
      
      setScrollY(currentScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isHovered]);

  // Toggle mobile collapse
  const [isMobileCollapsed, setIsMobileCollapsed] = useState(false);

  return (
    <div 
      className={`sticky top-0 z-30 transition-all duration-300 ease-in-out ${
        isHidden ? '-translate-y-full' : 'translate-y-0'
      } ${
        isCompact 
          ? 'bg-white/85 backdrop-blur-lg shadow-md' 
          : 'bg-white/95 backdrop-blur-md shadow-sm'
      } border-b border-purple-100`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="banner"
      aria-label="Community search and filters"
    >
      <div className={`container mx-auto px-4 transition-all duration-300 ${
        isCompact ? 'py-2' : 'py-4'
      }`}>
        
        {/* Hero Section - Hidden when compact */}
        <div className={`text-center transition-all duration-300 overflow-hidden ${
          isCompact ? 'max-h-0 mb-0 opacity-0' : 'max-h-32 mb-6 opacity-100'
        }`}>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-2">
            Where Beauty Pros Connect & Thrive
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of beauty professionals sharing their journey, celebrating wins, and building the future of beauty together
          </p>
        </div>

        {/* Mobile Collapse Toggle */}
        <div className="md:hidden mb-2">
          <button
            onClick={() => setIsMobileCollapsed(!isMobileCollapsed)}
            className="w-full flex items-center justify-center py-2 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label={isMobileCollapsed ? "Expand search and filters" : "Collapse search and filters"}
            aria-expanded={!isMobileCollapsed}
          >
            <ChevronUp className={`h-4 w-4 transition-transform duration-200 ${
              isMobileCollapsed ? 'rotate-180' : ''
            }`} />
          </button>
        </div>

        {/* Search and Filter Content */}
        <div className={`transition-all duration-300 overflow-hidden ${
          isMobileCollapsed ? 'md:block hidden max-h-0' : 'block max-h-96'
        }`}>
          
          {/* Search Bar */}
          <div className={`flex items-center gap-4 transition-all duration-300 ${
            isCompact ? 'mb-2' : 'mb-4'
          }`}>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search posts, creators, or techniques..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 pr-4 rounded-xl border-purple-200 focus:border-purple-400 focus:ring-purple-400 transition-all duration-200 ${
                  isCompact ? 'py-2 text-sm' : 'py-3'
                }`}
                aria-label="Search community posts and creators"
              />
            </div>
            
            {/* Action buttons - hidden when compact unless hovered */}
            <div className={`flex gap-2 transition-all duration-300 ${
              isCompact && !isHovered ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
            }`}>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-xl border-purple-200 hover:bg-purple-50"
                aria-label="Filter posts"
              >
                <Filter className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-xl border-purple-200 hover:bg-purple-50"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white/60 text-gray-700 hover:bg-white/80 border border-purple-100'
                } ${isCompact ? 'text-sm px-3 py-1.5' : ''}`}
                aria-label={`Filter by ${filter.label} (${filter.count} posts)`}
                aria-pressed={activeFilter === filter.id}
              >
                {filter.icon && <filter.icon className={`${isCompact ? 'h-3 w-3' : 'h-4 w-4'}`} />}
                <span className="font-medium">{filter.label}</span>
                <Badge variant="secondary" className={`${isCompact ? 'text-xs px-1' : 'text-xs'}`}>
                  {filter.count}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHeader;