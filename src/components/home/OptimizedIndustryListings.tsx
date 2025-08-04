import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import LazyIndustryShowcase from './LazyIndustryShowcase';
import { industryConfig } from '@/data/industryListings';

const OptimizedIndustryListings = () => {
  const [showAll, setShowAll] = useState(false);
  const topIndustries = Object.values(industryConfig).slice(0, 3);
  const remainingIndustries = Object.values(industryConfig).slice(3);

  const handleLoadMore = () => {
    setShowAll(true);
  };

  return (
    <>
      {/* Always show top 3 industries */}
      {topIndustries.map((industry, index) => (
        <LazyIndustryShowcase
          key={industry.name}
          industryName={industry.name}
          displayName={industry.displayName}
          listings={industry.listings.slice(0, 3)} // Only top 3 listings per industry
          routePath={industry.routePath}
          gradientColors={industry.gradientColors}
          icon={industry.icon}
        />
      ))}

      {/* Load More button */}
      {!showAll && remainingIndustries.length > 0 && (
        <section className="py-8 text-center">
          <Button 
            onClick={handleLoadMore}
            className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            View More Industries ({remainingIndustries.length} more)
          </Button>
        </section>
      )}

      {/* Remaining industries loaded on demand */}
      {showAll && remainingIndustries.map((industry) => (
        <LazyIndustryShowcase
          key={industry.name}
          industryName={industry.name}
          displayName={industry.displayName}
          listings={industry.listings.slice(0, 3)}
          routePath={industry.routePath}
          gradientColors={industry.gradientColors}
          icon={industry.icon}
        />
      ))}
    </>
  );
};

export default OptimizedIndustryListings;