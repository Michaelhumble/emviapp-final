import { Job } from '@/types/job';

/**
 * MANDATORY TIER SORTING UTILITY
 * 
 * Enforces strict job display priority:
 * 1. Diamond (top priority)
 * 2. Premium 
 * 3. Gold
 * 4. Free (lowest priority)
 * 
 * Within each tier: newest first (reverse chronological)
 */

const TIER_PRIORITY: Record<string, number> = {
  'diamond': 1,    // Highest priority
  'premium': 2,
  'gold': 3,
  'free': 4        // Lowest priority
};

/**
 * Get numeric priority for a pricing tier
 * Lower numbers = higher priority (displayed first)
 */
export const getTierPriority = (pricingTier: string | null | undefined): number => {
  if (!pricingTier) return TIER_PRIORITY.free;
  
  const tier = pricingTier.toLowerCase().trim();
  return TIER_PRIORITY[tier] || TIER_PRIORITY.free;
};

/**
 * Sort jobs by tier priority, then by date (newest first)
 * 
 * CRITICAL: This function enforces that NO paid job ever appears below a free job
 */
export const sortJobsByTierAndDate = (jobs: Job[]): Job[] => {
  if (!jobs || !Array.isArray(jobs)) {
    console.warn('⚠️ [JOB-SORTING] Invalid jobs array provided:', jobs);
    return [];
  }

  return jobs.sort((a, b) => {
    // First: Sort by tier priority (Diamond > Premium > Gold > Free)
    const tierA = getTierPriority(a.pricing_tier);
    const tierB = getTierPriority(b.pricing_tier);
    
    if (tierA !== tierB) {
      return tierA - tierB; // Lower number = higher priority = displayed first
    }
    
    // Second: Within same tier, sort by date (newest first)
    const dateA = new Date(a.created_at || 0).getTime();
    const dateB = new Date(b.created_at || 0).getTime();
    
    return dateB - dateA; // Reverse chronological (newest first)
  });
};

/**
 * Sort jobs within a category (industry)
 * Maintains the strict tier hierarchy while preserving category grouping
 */
export const sortJobsWithinCategory = (categoryJobs: Job[]): Job[] => {
  console.log(`🎯 [JOB-SORTING] Sorting ${categoryJobs.length} jobs by tier priority`);
  
  const sorted = sortJobsByTierAndDate(categoryJobs);
  
  // Log the sorting for verification
  if (sorted.length > 0) {
    console.log('🎯 [JOB-SORTING] Sorted order:', 
      sorted.map(job => ({
        id: job.id,
        title: job.title,
        tier: job.pricing_tier || 'free',
        priority: getTierPriority(job.pricing_tier),
        created: job.created_at
      }))
    );
  }
  
  return sorted;
};

/**
 * Verify that jobs are in correct tier order
 * Used for debugging and validation
 */
export const validateJobTierOrder = (jobs: Job[]): boolean => {
  for (let i = 0; i < jobs.length - 1; i++) {
    const currentPriority = getTierPriority(jobs[i].pricing_tier);
    const nextPriority = getTierPriority(jobs[i + 1].pricing_tier);
    
    // Current job should have equal or higher priority (lower number) than next
    if (currentPriority > nextPriority) {
      console.error('❌ [JOB-SORTING] Invalid tier order detected:', {
        current: { tier: jobs[i].pricing_tier, priority: currentPriority },
        next: { tier: jobs[i + 1].pricing_tier, priority: nextPriority }
      });
      return false;
    }
  }
  
  console.log('✅ [JOB-SORTING] Job tier order is valid');
  return true;
};