
import React from 'react';
import { Job } from '@/types/job';
import { ListingType } from '@/types/job';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';

interface OpportunitiesSectionProps {
  jobs: Job[];
  diverseListings?: Job[]; // Add this prop to support diverseListings
}

const OpportunitiesSection: React.FC<OpportunitiesSectionProps> = ({ jobs, diverseListings }) => {
  const { t } = useTranslation();
  
  // If diverseListings is provided, use that instead of jobs
  const listings = diverseListings || jobs;

  const renderListingCard = (listing: Job) => {
    // Ensure type is properly cast to a valid ListingType value
    const listingType: ListingType = (listing.type as ListingType) || 'job';

    return (
      <Card key={listing.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>{listing.title}</CardTitle>
          <CardDescription>{listing.location}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{listing.description?.substring(0, 100)}...</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{listing.company}</span>
          <Button size="sm" variant="outline">
            {t({ english: 'Learn More', vietnamese: 'Tìm hiểu thêm' })} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">{t({ english: 'Latest Opportunities', vietnamese: 'Cơ hội mới nhất' })}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map(renderListingCard)}
        </div>
        <div className="text-center mt-8">
          <Button size="lg">{t({ english: 'View All Opportunities', vietnamese: 'Xem tất cả cơ hội' })}</Button>
        </div>
      </div>
    </section>
  );
};

export default OpportunitiesSection;
