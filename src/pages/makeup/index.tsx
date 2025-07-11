import React, { useMemo } from 'react';
import IndustryListingPage from '@/components/marketplace/IndustryListingPage';
import { makeupListings } from '@/data/industryListings';
import { useJobsData } from '@/hooks/useJobsData';
import { Job } from '@/types/job';
import { IndustryListing } from '@/types/industryListing';

const MakeupPage = () => {
  const { jobs, loading } = useJobsData();

  // Convert real Supabase jobs to IndustryListing format and filter for makeup-related jobs
  const realMakeupJobs: IndustryListing[] = useMemo(() => {
    if (!jobs || !Array.isArray(jobs)) return [];
    
    return jobs
      .filter(job => {
        const isMakeupJob = job.category?.toLowerCase().includes('makeup') || 
                          job.title?.toLowerCase().includes('makeup') ||
                          job.title?.toLowerCase().includes('artist') ||
                          job.description?.toLowerCase().includes('makeup') ||
                          job.category?.toLowerCase() === 'general';
        return isMakeupJob && job.status === 'active';
      })
      .map((job: Job): IndustryListing => {
        const tierMapping: Record<string, 'free' | 'diamond' | 'premium' | 'featured'> = {
          'free': 'free', 'diamond': 'diamond', 'premium': 'premium', 'featured': 'featured', 'gold': 'featured'
        };
        const tier = tierMapping[job.pricing_tier || 'free'] || 'free';
        
        return {
          id: job.id,
          title: job.title || 'Makeup Artist Position',
          location: job.location || 'Location TBD',
          salary: job.compensation_details || 'Competitive Pay',
          tier,
          summary: job.description?.substring(0, 150) + '...' || 'Great opportunity to join our makeup team.',
          imageUrl: job.image_url || job.imageUrl || undefined,
          rating: 4.5,
          fullDescription: job.description || '',
          contact: job.contact_info ? {
            name: job.contact_info.owner_name || 'Hiring Manager',
            phone: job.contact_info.phone || '',
            email: job.contact_info.email || '',
          } : undefined
        };
      });
  }, [jobs]);

  // Merge real jobs with static listings
  const allListings = useMemo(() => {
    const staticListings = makeupListings.filter(listing => !(listing as any).isUserSubmitted);
    
    const realDiamond = realMakeupJobs.filter(job => job.tier === 'diamond');
    const realPremium = realMakeupJobs.filter(job => job.tier === 'premium');
    const realFeatured = realMakeupJobs.filter(job => job.tier === 'featured');
    const realFree = realMakeupJobs.filter(job => job.tier === 'free');
    
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
  }, [realMakeupJobs]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-500">Loading makeup opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <IndustryListingPage
      industryName="makeup"
      displayName="Makeup"
      listings={allListings}
      headerTitle="Makeup Listings — Premium Spaces"
      headerSubtitle="Access exclusive makeup artist opportunities in fashion, entertainment, and luxury beauty studios."
      gradientColors="from-rose-100 via-pink-100 to-fuchsia-100"
      metaDescription="Find premium makeup artist jobs and beauty studio opportunities. Connect with top makeup positions in fashion and entertainment through EmviApp."
    />
  );
};

export default MakeupPage;