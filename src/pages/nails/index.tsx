import React, { useMemo } from 'react';
import IndustryListingPage from '@/components/marketplace/IndustryListingPage';
import { nailListings } from '@/data/industryListings';
import { useJobsData } from '@/hooks/useJobsData';
import { Job } from '@/types/job';
import { IndustryListing } from '@/types/industryListing';

const NailsPage = () => {
  const { jobs, loading } = useJobsData();

  // Convert real Supabase jobs to IndustryListing format and filter for nail-related jobs
  const realNailJobs: IndustryListing[] = useMemo(() => {
    if (!jobs || !Array.isArray(jobs)) return [];
    
    return jobs
      .filter(job => {
        // Filter for nail-related jobs (by category or keywords in title)
        const isNailJob = job.category?.toLowerCase().includes('nail') || 
                         job.title?.toLowerCase().includes('nail') ||
                         job.description?.toLowerCase().includes('nail') ||
                         job.category?.toLowerCase() === 'general'; // Include general category as it might contain nail jobs
        return isNailJob && job.status === 'active';
      })
      .map((job: Job): IndustryListing => {
        // Map pricing tier with proper typing
        const tierMapping: Record<string, 'free' | 'diamond' | 'premium' | 'featured'> = {
          'free': 'free',
          'diamond': 'diamond', 
          'premium': 'premium',
          'featured': 'featured',
          'gold': 'featured' // Map gold to featured
        };
        
        const tier = tierMapping[job.pricing_tier || 'free'] || 'free';
        
        return {
          id: job.id,
          title: job.title || 'Nail Technician Position',
          location: job.location || 'Location TBD',
          salary: job.compensation_details || 'Competitive Pay',
          tier,
          summary: job.description?.substring(0, 150) + '...' || 'Great opportunity to join our nail team.',
          imageUrl: job.image_url || job.imageUrl || undefined,
          rating: 4.5, // Default rating for real jobs
          fullDescription: job.description || '',
          contact: job.contact_info ? {
            name: job.contact_info.owner_name || 'Hiring Manager',
            phone: job.contact_info.phone || '',
            email: job.contact_info.email || '',
          } : undefined
        };
      })
      .sort((a, b) => {
        // Sort by tier priority (free jobs go to Free Listings section)
        const tierOrder = { 'diamond': 1, 'premium': 2, 'featured': 3, 'free': 4 };
        const tierA = tierOrder[a.tier as keyof typeof tierOrder] || 5;
        const tierB = tierOrder[b.tier as keyof typeof tierOrder] || 5;
        
        if (tierA !== tierB) return tierA - tierB;
        
        // Within same tier, newest first (use job created_at for sorting)
        return 0; // For now, maintain insertion order
      });
  }, [jobs]);

  // Merge real jobs with static listings - real jobs appear first in their respective tiers
  const allListings = useMemo(() => {
    const staticListings = nailListings.filter(listing => !(listing as any).isUserSubmitted);
    
    // Group by tier
    const realDiamond = realNailJobs.filter(job => job.tier === 'diamond');
    const realPremium = realNailJobs.filter(job => job.tier === 'premium');
    const realFeatured = realNailJobs.filter(job => job.tier === 'featured');
    const realFree = realNailJobs.filter(job => job.tier === 'free');
    
    const staticDiamond = staticListings.filter(job => job.tier === 'diamond');
    const staticPremium = staticListings.filter(job => job.tier === 'premium');
    const staticFeatured = staticListings.filter(job => job.tier === 'featured');
    const staticFree = staticListings.filter(job => job.tier === 'free');

    return [
      ...realDiamond,
      ...staticDiamond,
      ...realPremium,
      ...staticPremium,
      ...realFeatured,
      ...staticFeatured,
      ...realFree, // Real free jobs appear FIRST in Free Listings
      ...staticFree
    ];
  }, [realNailJobs]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-500">Loading nail opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <IndustryListingPage
      industryName="nails"
      displayName="Nails"
      listings={allListings}
      headerTitle="Nail Listings — Premium Spaces"
      headerSubtitle="Discover exclusive nail salon opportunities and connect with the finest establishments in the beauty industry."
      gradientColors="from-pink-100 via-purple-100 to-indigo-100"
      metaDescription="Find premium nail salon jobs and opportunities. Connect with top nail salons across the country through EmviApp's exclusive network."
    />
  );
};

export default NailsPage;