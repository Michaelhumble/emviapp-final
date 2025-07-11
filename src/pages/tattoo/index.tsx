import React, { useMemo } from 'react';
import IndustryListingPage from '@/components/marketplace/IndustryListingPage';
import { tattooListings } from '@/data/industryListings';
import { useJobsData } from '@/hooks/useJobsData';
import { Job } from '@/types/job';
import { IndustryListing } from '@/types/industryListing';

const TattooPage = () => {
  const { jobs, loading } = useJobsData();

  const realTattooJobs: IndustryListing[] = useMemo(() => {
    if (!jobs || !Array.isArray(jobs)) return [];
    
    return jobs
      .filter(job => {
        // STRICT filtering for tattoo industry only
        const isTattooJob = 
          job.category?.toLowerCase() === 'tattoo' ||
          job.category?.toLowerCase() === 'tattoo artist' ||
          job.category?.toLowerCase() === 'body art' ||
          job.category?.toLowerCase() === 'piercing' ||
          (job.category?.toLowerCase() === 'general' && 
           (job.title?.toLowerCase().includes('tattoo') ||
            job.description?.toLowerCase().includes('tattoo')));
        return isTattooJob && job.status === 'active';
      })
      .map((job: Job): IndustryListing => {
        const tierMapping: Record<string, 'free' | 'diamond' | 'premium' | 'featured'> = {
          'free': 'free', 'diamond': 'diamond', 'premium': 'premium', 'featured': 'featured', 'gold': 'featured'
        };
        const tier = tierMapping[job.pricing_tier || 'free'] || 'free';
        
        return {
          id: job.id,
          title: job.title || 'Tattoo Artist Position',
          location: job.location || 'Location TBD',
          salary: job.compensation_details || 'Competitive Pay',
          tier,
          summary: job.description?.substring(0, 150) + '...' || 'Great opportunity to join our tattoo studio.',
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
    const staticListings = tattooListings.filter(listing => !(listing as any).isUserSubmitted);
    
    const realDiamond = realTattooJobs.filter(job => job.tier === 'diamond');
    const realPremium = realTattooJobs.filter(job => job.tier === 'premium');
    const realFeatured = realTattooJobs.filter(job => job.tier === 'featured');
    const realFree = realTattooJobs.filter(job => job.tier === 'free');
    
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
  }, [realTattooJobs]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-500">Loading tattoo opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <IndustryListingPage
      industryName="tattoo"
      displayName="Tattoo"
      listings={allListings}
      headerTitle="Tattoo Listings — Premium Spaces"
      headerSubtitle="Connect with renowned tattoo studios and showcase your artistry in the most respected shops in the industry."
      gradientColors="from-gray-100 via-stone-100 to-neutral-100"
      metaDescription="Find premium tattoo artist jobs and studio opportunities. Connect with top tattoo shops and artists through EmviApp."
    />
  );
};

export default TattooPage;