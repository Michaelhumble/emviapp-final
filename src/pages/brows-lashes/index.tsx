import React, { useMemo } from 'react';
import IndustryListingPage from '@/components/marketplace/IndustryListingPage';
import { browsLashesListings } from '@/data/industryListings';
import { useJobsData } from '@/hooks/useJobsData';
import { Job } from '@/types/job';
import { IndustryListing } from '@/types/industryListing';

const BrowsLashesPage = () => {
  const { jobs, loading } = useJobsData();

  const realBrowsLashesJobs: IndustryListing[] = useMemo(() => {
    if (!jobs || !Array.isArray(jobs)) return [];
    
    return jobs
      .filter(job => {
        // STRICT filtering for brows & lashes industry only
        const isBrowsLashesJob = 
          job.category?.toLowerCase() === 'brows' ||
          job.category?.toLowerCase() === 'lashes' ||
          job.category?.toLowerCase() === 'brow & lash' ||
          job.category?.toLowerCase() === 'microblading' ||
          job.category?.toLowerCase() === 'lash extensions' ||
          (job.category?.toLowerCase() === 'general' && 
           (job.title?.toLowerCase().includes('brow') ||
            job.title?.toLowerCase().includes('lash') ||
            job.title?.toLowerCase().includes('microblading') ||
            job.description?.toLowerCase().includes('brow') ||
            job.description?.toLowerCase().includes('lash')));
        return isBrowsLashesJob && job.status === 'active';
      })
      .map((job: Job): IndustryListing => {
        const tierMapping: Record<string, 'free' | 'diamond' | 'premium' | 'featured'> = {
          'free': 'free', 'diamond': 'diamond', 'premium': 'premium', 'featured': 'featured', 'gold': 'featured'
        };
        const tier = tierMapping[job.pricing_tier || 'free'] || 'free';
        
        return {
          id: job.id,
          title: job.title || 'Brow & Lash Technician Position',
          location: job.location || 'Location TBD',
          salary: job.compensation_details || 'Competitive Pay',
          tier,
          summary: job.description?.substring(0, 150) + '...' || 'Great opportunity to join our brow & lash team.',
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
    const staticListings = browsLashesListings.filter(listing => !(listing as any).isUserSubmitted);
    
    const realDiamond = realBrowsLashesJobs.filter(job => job.tier === 'diamond');
    const realPremium = realBrowsLashesJobs.filter(job => job.tier === 'premium');
    const realFeatured = realBrowsLashesJobs.filter(job => job.tier === 'featured');
    const realFree = realBrowsLashesJobs.filter(job => job.tier === 'free');
    
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
  }, [realBrowsLashesJobs]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-500">Loading brow & lash opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <IndustryListingPage
      industryName="brows-lashes"
      displayName="Brows & Lashes"
      listings={allListings}
      headerTitle="Brows & Lashes Listings — Premium Spaces"
      headerSubtitle="Discover specialized opportunities in microblading, lash extensions, and premium brow artistry."
      gradientColors="from-violet-100 via-purple-100 to-indigo-100"
      metaDescription="Find premium brow and lash technician jobs. Connect with top brow bars and lash studios through EmviApp."
    />
  );
};

export default BrowsLashesPage;