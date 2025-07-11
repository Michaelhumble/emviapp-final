import React, { useMemo } from 'react';
import IndustryListingPage from '@/components/marketplace/IndustryListingPage';
import { hairListings } from '@/data/industryListings';
import { useJobsData } from '@/hooks/useJobsData';
import { Job } from '@/types/job';
import { IndustryListing } from '@/types/industryListing';

const HairPage = () => {
  const { jobs, loading } = useJobsData();

  // Convert real Supabase jobs to IndustryListing format and filter for hair-related jobs
  const realHairJobs: IndustryListing[] = useMemo(() => {
    if (!jobs || !Array.isArray(jobs)) return [];
    
    return jobs
      .filter(job => {
        const isHairJob = job.category?.toLowerCase().includes('hair') || 
                         job.title?.toLowerCase().includes('hair') ||
                         job.title?.toLowerCase().includes('stylist') ||
                         job.description?.toLowerCase().includes('hair') ||
                         job.category?.toLowerCase() === 'general';
        return isHairJob && job.status === 'active';
      })
      .map((job: Job): IndustryListing => {
        const tierMapping: Record<string, 'free' | 'diamond' | 'premium' | 'featured'> = {
          'free': 'free', 'diamond': 'diamond', 'premium': 'premium', 'featured': 'featured', 'gold': 'featured'
        };
        const tier = tierMapping[job.pricing_tier || 'free'] || 'free';
        
        return {
          id: job.id,
          title: job.title || 'Hair Stylist Position',
          location: job.location || 'Location TBD',
          salary: job.compensation_details || 'Competitive Pay',
          tier,
          summary: job.description?.substring(0, 150) + '...' || 'Great opportunity to join our hair team.',
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
    const staticListings = hairListings.filter(listing => !(listing as any).isUserSubmitted);
    
    const realDiamond = realHairJobs.filter(job => job.tier === 'diamond');
    const realPremium = realHairJobs.filter(job => job.tier === 'premium');
    const realFeatured = realHairJobs.filter(job => job.tier === 'featured');
    const realFree = realHairJobs.filter(job => job.tier === 'free');
    
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
  }, [realHairJobs]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-500">Loading hair opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <IndustryListingPage
      industryName="hair"
      displayName="Hair"
      listings={allListings}
      headerTitle="Hair Listings — Premium Spaces"
      headerSubtitle="Explore elite hair salon opportunities and join the most prestigious styling teams in the industry."
      gradientColors="from-amber-100 via-orange-100 to-red-100"
      metaDescription="Find premium hair stylist jobs and salon opportunities. Connect with top hair salons and styling positions through EmviApp."
    />
  );
};

export default HairPage;