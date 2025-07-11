import React, { useMemo } from 'react';
import IndustryListingPage from '@/components/marketplace/IndustryListingPage';
import { barberListings } from '@/data/industryListings';
import { useJobsData } from '@/hooks/useJobsData';
import { Job } from '@/types/job';
import { IndustryListing } from '@/types/industryListing';

const BarberPage = () => {
  const { jobs, loading } = useJobsData();

  const realBarberJobs: IndustryListing[] = useMemo(() => {
    if (!jobs || !Array.isArray(jobs)) return [];
    
    return jobs
      .filter(job => {
        // STRICT filtering for barber industry only
        const isBarberJob = 
          job.category?.toLowerCase() === 'barber' ||
          job.category?.toLowerCase() === 'barbershop' ||
          job.category?.toLowerCase() === 'men\'s grooming' ||
          (job.category?.toLowerCase() === 'general' && 
           (job.title?.toLowerCase().includes('barber') ||
            job.description?.toLowerCase().includes('barber')));
        return isBarberJob && job.status === 'active';
      })
      .map((job: Job): IndustryListing => {
        const tierMapping: Record<string, 'free' | 'diamond' | 'premium' | 'featured'> = {
          'free': 'free', 'diamond': 'diamond', 'premium': 'premium', 'featured': 'featured', 'gold': 'featured'
        };
        const tier = tierMapping[job.pricing_tier || 'free'] || 'free';
        
        return {
          id: job.id,
          title: job.title || 'Barber Position',
          location: job.location || 'Location TBD',
          salary: job.compensation_details || 'Competitive Pay',
          tier,
          summary: job.description?.substring(0, 150) + '...' || 'Great opportunity to join our barber team.',
          imageUrl: job.image_url || job.imageUrl || undefined,
          rating: 4.5,
          fullDescription: job.description || '',
          contact: (job.contact_info && (tier !== 'free' || job.pricing_tier !== 'free')) ? {
            name: job.contact_info.owner_name || 'Hiring Manager',
            phone: job.contact_info.phone || '',
            email: job.contact_info.email || '',
          } : undefined
        };
      });
  }, [jobs]);

  const allListings = useMemo(() => {
    const staticListings = barberListings.filter(listing => !(listing as any).isUserSubmitted);
    
    const realDiamond = realBarberJobs.filter(job => job.tier === 'diamond');
    const realPremium = realBarberJobs.filter(job => job.tier === 'premium');
    const realFeatured = realBarberJobs.filter(job => job.tier === 'featured');
    const realFree = realBarberJobs.filter(job => job.tier === 'free');
    
    const staticDiamond = staticListings.filter(job => job.tier === 'diamond');
    const staticPremium = staticListings.filter(job => job.tier === 'premium');
    const staticFeatured = staticListings.filter(job => job.tier === 'featured');
    const staticFree = staticListings.filter(job => job.tier === 'free');

    return [
      ...realDiamond, ...staticDiamond,
      ...realPremium, ...staticPremium,
      ...realFeatured, ...staticFeatured,
      ...realFree, ...staticFree
    ];
  }, [realBarberJobs]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-500">Loading barber opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <IndustryListingPage
      industryName="barber"
      displayName="Barber"
      listings={allListings}
      headerTitle="Barber Listings — Premium Spaces"
      headerSubtitle="Discover exceptional barbershop opportunities and master the art of traditional and modern grooming."
      gradientColors="from-slate-100 via-gray-100 to-zinc-100"
      metaDescription="Find premium barber jobs and barbershop opportunities. Connect with top barbershops and grooming positions through EmviApp."
    />
  );
};

export default BarberPage;