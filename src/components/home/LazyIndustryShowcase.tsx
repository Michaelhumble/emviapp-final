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
      <div className="py-16 bg-gradient-to-br from-gray-50/80 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14 space-y-4">
            <div className="h-12 bg-gray-200 rounded w-80 mx-auto animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
          </div>
          
          {/* Mobile skeleton */}
          <div className="lg:hidden overflow-x-auto scrollbar-hide pb-4">
            <div className="flex gap-4 w-max px-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-80 flex-shrink-0">
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
                    <div className="aspect-[4/3] bg-gray-200" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                      <div className="h-8 bg-gray-200 rounded" />
                      <div className="h-3 bg-gray-200 rounded w-5/6" />
                      <div className="space-y-2">
                        <div className="h-8 bg-gray-200 rounded" />
                        <div className="h-8 bg-gray-200 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Desktop skeleton */}
          <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-8 bg-gray-200 rounded" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                  <div className="space-y-2">
                    <div className="h-8 bg-gray-200 rounded" />
                    <div className="h-8 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <div className="h-12 bg-gray-200 rounded-2xl w-64 mx-auto animate-pulse" />
          </div>
        </div>
      </div>
    }>
      <PremiumIndustryShowcase {...props} />
    </Suspense>
  );
};

export default LazyIndustryShowcase;