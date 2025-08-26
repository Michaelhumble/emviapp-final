import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Calendar } from 'lucide-react';
import { type Outlet, formatDate } from '@/lib/press';

interface PressCardProps {
  outlet: Outlet;
  market?: string;
}

const PressCard: React.FC<PressCardProps> = ({ outlet, market = 'Business' }) => {
  const handleCoverageClick = () => {
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'press_card_click',
        outlet_key: outlet.key,
        outlet_name: outlet.name
      });
    }
  };

  return (
    <div className="bg-card border rounded-lg p-6 hover:shadow-lg transition-all duration-300 group">
      {/* Outlet logo and info */}
      <div className="flex items-start gap-4 mb-4">
        <div className="pressLogoWrap flex-shrink-0 !h-12 !w-auto !p-2">
          <img
            src={outlet.logo}
            alt={`${outlet.name} logo`}
            className="!max-h-8 w-auto"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-sm truncate">
            {outlet.name}
          </h3>
          <p className="text-xs text-muted-foreground">
            {market}
          </p>
        </div>
      </div>

      {/* Article details */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {outlet.headline}
        </h4>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3" />
          {formatDate(outlet.dateISO)}
        </div>
        
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {outlet.type === 'aggregator' ? 
            `Coverage aggregated from ${outlet.altUrls.length} sources` :
            `Coverage from ${outlet.market}`
          }
        </p>

        {/* CTA */}
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200"
          asChild
        >
          <a
            href={outlet.type === 'article' ? outlet.url : outlet.altUrls[0]}
            target="_blank"
            rel="nofollow noopener"
            onClick={handleCoverageClick}
          >
            <ExternalLink className="w-3 h-3 mr-2" />
            Read coverage →
          </a>
        </Button>
      </div>
    </div>
  );
};

export default PressCard;