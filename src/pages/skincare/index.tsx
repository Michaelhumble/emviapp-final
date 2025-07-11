import React, { useMemo } from 'react';
import IndustryListingPage from '@/components/marketplace/IndustryListingPage';
import { skincareListings } from '@/data/industryListings';
import { useJobsData } from '@/hooks/useJobsData';
import { Job } from '@/types/job';
import { IndustryListing } from '@/types/industryListing';

const SkincarePage = () => {
  const { jobs, loading } = useJobsData();

  const realSkincareJobs: IndustryListing[] = useMemo(() => {
    if (!jobs || !Array.isArray(jobs)) return [];
    
    return jobs
      .filter(job => {
        // STRICT filtering for skincare industry only
        const isSkincareJob = 
          job.category?.toLowerCase() === 'skincare' ||
          job.category?.toLowerCase() === 'esthetician' ||
          job.category?.toLowerCase() === 'facial' ||
          job.category?.toLowerCase() === 'spa' ||
          job.category?.toLowerCase() === 'medical spa' ||
          (job.category?.toLowerCase() === 'general' && 
           (job.title?.toLowerCase().includes('esthetician') || 
            job.title?.toLowerCase().includes('skincare') ||
            job.title?.toLowerCase().includes('facial') ||
            job.description?.toLowerCase().includes('skincare')));
        return isSkincareJob && job.status === 'active';
      })
      .map((job: Job): IndustryListing => {
        const tierMapping: Record<string, 'free' | 'diamond' | 'premium' | 'featured'> = {
          'free': 'free', 'diamond': 'diamond', 'premium': 'premium', 'featured': 'featured', 'gold': 'featured'
        };
        const tier = tierMapping[job.pricing_tier || 'free'] || 'free';
        
        return {
          id: job.id,
          title: job.title || 'Esthetician Position',
          location: job.location || 'Location TBD',
          salary: job.compensation_details || 'Competitive Pay',
          tier,
          summary: job.description?.substring(0, 150) + '...' || 'Great opportunity to join our skincare team.',
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
    const staticListings = skincareListings.filter(listing => !(listing as any).isUserSubmitted);
    
    const realDiamond = realSkincareJobs.filter(job => job.tier === 'diamond');
    const realPremium = realSkincareJobs.filter(job => job.tier === 'premium');
    const realFeatured = realSkincareJobs.filter(job => job.tier === 'featured');
    const realFree = realSkincareJobs.filter(job => job.tier === 'free');
    
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
  }, [realSkincareJobs]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-500">Loading skincare opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <IndustryListingPage
      industryName="skincare"
      displayName="Skincare"
      listings={allListings}
      headerTitle="Skincare Listings — Premium Spaces"
      headerSubtitle="Explore advanced esthetician opportunities at premier medical spas and luxury skincare clinics."
      gradientColors="from-blue-100 via-cyan-100 to-sky-100"
      metaDescription="Find premium esthetician jobs and medical spa opportunities. Connect with top skincare clinics and medical spas through EmviApp."
    />
  );
};

export default SkincarePage;