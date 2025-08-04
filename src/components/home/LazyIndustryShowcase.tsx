import React, { lazy, Suspense } from 'react';

const PremiumIndustryShowcase = lazy(() => import('./PremiumIndustryShowcase'));

interface LazyIndustryShowcaseProps {
  industryName: string;
  displayName: string;
  listings: any[];
  routePath: string;
  gradientColors: string;
  icon: string;
}

const LazyIndustryShowcase: React.FC<LazyIndustryShowcaseProps> = (props) => {
  return (
    <Suspense fallback={
      <div className="py-12 animate-pulse">
        <div className="container mx-auto px-4">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    }>
      <PremiumIndustryShowcase {...props} />
    </Suspense>
  );
};

export default LazyIndustryShowcase;