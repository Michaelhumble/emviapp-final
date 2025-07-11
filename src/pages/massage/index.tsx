import React, { useMemo } from 'react';
import IndustryListingPage from '@/components/marketplace/IndustryListingPage';
import { massageListings } from '@/data/industryListings';
import { useJobsData } from '@/hooks/useJobsData';
import { Job } from '@/types/job';
import { IndustryListing } from '@/types/industryListing';

const MassagePage = () => {
  const { jobs, loading } = useJobsData();

  // Convert real Supabase jobs to IndustryListing format and filter for massage-related jobs
  const realMassageJobs: IndustryListing[] = useMemo(() => {
    if (!jobs || !Array.isArray(jobs)) return [];
    
    return jobs
      .filter(job => {
        // STRICT filtering for massage industry only
        const isMassageJob = 
          job.category?.toLowerCase() === 'massage' ||
          job.category?.toLowerCase() === 'massage therapy' ||
          job.category?.toLowerCase() === 'spa' ||
          job.category?.toLowerCase() === 'wellness' ||
          (job.category?.toLowerCase() === 'general' && 
           (job.title?.toLowerCase().includes('massage') || 
            job.title?.toLowerCase().includes('therapy') ||
            job.description?.toLowerCase().includes('massage')));
        return isMassageJob && job.status === 'active';
      })
      .map((job: Job): IndustryListing => {
        const tierMapping: Record<string, 'free' | 'diamond' | 'premium' | 'featured'> = {
          'free': 'free', 'diamond': 'diamond', 'premium': 'premium', 'featured': 'featured', 'gold': 'featured'
        };
        const tier = tierMapping[job.pricing_tier || 'free'] || 'free';
        
        return {
          id: job.id,
          title: job.title || 'Massage Therapist Position',
          location: job.location || 'Location TBD',
          salary: job.compensation_details || 'Competitive Pay',
          tier,
          summary: job.description?.substring(0, 150) + '...' || 'Great opportunity to join our massage therapy team.',
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

  // Merge real jobs with static listings
  const allListings = useMemo(() => {
    const staticListings = massageListings.filter(listing => !(listing as any).isUserSubmitted);
    
    const realDiamond = realMassageJobs.filter(job => job.tier === 'diamond');
    const realPremium = realMassageJobs.filter(job => job.tier === 'premium');
    const realFeatured = realMassageJobs.filter(job => job.tier === 'featured');
    const realFree = realMassageJobs.filter(job => job.tier === 'free');
    
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
  }, [realMassageJobs]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-500">Loading massage opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <IndustryListingPage
      industryName="massage"
      displayName="Massage"
      listings={allListings}
      headerTitle="Massage Listings — Premium Spaces"
      headerSubtitle="Join elite wellness centers and luxury spas offering the most rewarding massage therapy positions."
      gradientColors="from-green-100 via-emerald-100 to-teal-100"
      metaDescription="Find premium massage therapy jobs and spa opportunities. Connect with top wellness centers and luxury spas through EmviApp."
    />
  );
};

export default MassagePage;