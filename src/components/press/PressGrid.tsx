import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getAllOutlets, generateLogoPlaceholder } from '@/data/pressOutlets';

const PressGrid: React.FC = () => {
  const allOutlets = getAllOutlets();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMarket, setSelectedMarket] = useState<string>('');

  // Get unique markets for filter
  const markets = Array.from(new Set(allOutlets.map(outlet => outlet.market)));

  // Filter outlets based on search and market
  const filteredOutlets = allOutlets.filter(outlet => {
    const matchesSearch = outlet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         outlet.market.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMarket = !selectedMarket || outlet.market === selectedMarket;
    return matchesSearch && matchesMarket;
  });

  const handleLogoError = (e: React.SyntheticEvent<HTMLImageElement>, name: string) => {
    const img = e.currentTarget;
    img.src = generateLogoPlaceholder(name);
  };

  const handleOutletClick = (outletName: string, url: string) => {
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'press_outlet_click', {
        event_category: 'engagement',
        event_label: outletName,
        outlet_name: outletName,
        outlet_url: url
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search outlets or cities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedMarket === '' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedMarket('')}
          >
            All Markets
          </Button>
          {markets.map(market => (
            <Button
              key={market}
              variant={selectedMarket === market ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedMarket(market)}
            >
              {market}
            </Button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredOutlets.length} of {allOutlets.length} outlets
      </div>

      {/* Press Outlets Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pressGrid">
        {filteredOutlets.map((outlet) => (
          <div
            key={outlet.slug}
            className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
          >
            {/* Logo */}
            <div className="flex items-center justify-center mb-4">
              <div className="pressLogoWrap">
                <img
                  src={`/press-logos/${outlet.slug}.svg`}
                  alt={`${outlet.name} logo`}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => handleLogoError(e, outlet.name)}
                />
              </div>
            </div>

            {/* Outlet Info */}
            <div className="text-center space-y-3">
              <h3 className="font-semibold text-foreground text-sm">{outlet.name}</h3>
              
              <Badge variant="secondary" className="text-xs">
                {outlet.market}
              </Badge>

              {/* Read Coverage Link */}
              <a
                href={outlet.url}
                target="_blank"
                rel="noopener nofollow"
                aria-label={`Read coverage on ${outlet.name} (opens in new tab)`}
                onClick={() => handleOutletClick(outlet.name, outlet.url)}
                className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Read coverage →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredOutlets.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            No outlets found matching your search criteria.
          </div>
          <Button
            variant="ghost"
            onClick={() => {
              setSearchTerm('');
              setSelectedMarket('');
            }}
            className="mt-2"
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default PressGrid;