import React, { useEffect, useRef } from 'react';
import { Job } from '@/types/job';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/useTranslation';
import { track } from '@/lib/telemetry';
import { useIsMobile } from '@/hooks/use-mobile';
import { JobCard } from '@/components/jobs/JobCard';

interface FeaturedPaidJobsSectionProps {
  jobs: Job[];
}

const tierLabel = (tier?: string | null) => {
  const t = (tier || '').toLowerCase();
  if (t === 'diamond') return 'Diamond';
  if (t === 'premium') return 'Premium';
  if (t === 'gold') return 'Gold';
  return '';
};

const FeaturedPaidJobsSection: React.FC<FeaturedPaidJobsSectionProps> = ({ jobs }) => {
  const { isVietnamese } = useTranslation();
  const isMobile = useIsMobile();
  const impressionSent = useRef(false);

  useEffect(() => {
    if (!impressionSent.current && jobs && jobs.length > 0) {
      track('jobs_featured_paid_impression', { count: jobs.length });
      impressionSent.current = true;
    }
  }, [jobs]);

  if (!jobs || jobs.length === 0) return null;

  return (
    <section aria-labelledby="featured-paid-heading" className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 id="featured-paid-heading" className="text-2xl font-bold">
          {isVietnamese ? 'Việc làm nổi bật (Trả phí)' : 'Featured Jobs (Paid)'}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="relative">
            {/* Tier ribbon */}
            {!!tierLabel((job as any).pricing_tier) && (
              <div className="absolute left-2 top-2 z-10">
                <Badge variant="secondary">{tierLabel((job as any).pricing_tier)}</Badge>
              </div>
            )}
            <JobCard job={job} onRenew={() => {}} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPaidJobsSection;
