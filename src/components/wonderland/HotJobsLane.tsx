import React, { useState } from 'react';
import { JOB_SEEDS } from '@/data/seed/jobs.seed';
import { SEED_BLEND, WONDERLAND_ENABLED } from '@/config/wonderland.config';
import { getNearbySeed } from '@/lib/market';
import PremiumContactGate from '@/components/common/PremiumContactGate';
import { useAuth } from '@/context/auth';
import GuestCardTeaserModal from '@/components/wonderland/GuestCardTeaserModal';

interface HotJobsLaneProps {
  jobs?: Array<any>;
  marketHint?: string;
  blend?: number;
}

const HotJobsLane: React.FC<HotJobsLaneProps> = ({ jobs, marketHint, blend }) => {
  if (!WONDERLAND_ENABLED) return null;

  const { isSignedIn } = useAuth();
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState<{ image?: string; title?: string }>({});

  const seeds = getNearbySeed(JOB_SEEDS, marketHint).slice(0, Math.ceil((blend ?? SEED_BLEND.jobs) * 6));
  const items = (jobs && jobs.length ? jobs : []).concat(seeds);

  return (
    <section aria-label="Hot jobs near you" className="container mx-auto px-4 py-8">
      <header className="mb-4">
        <h2 className="text-xl font-semibold">Hot Jobs</h2>
        <p className="text-sm text-muted-foreground">Cơ hội tốt nhất tuần này</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((job, idx) => (
          <article key={job.id ?? `job-${idx}`}
            onClick={() => {
              if (!isSignedIn) {
                setTeaser({ image: job.images?.[0], title: job.title });
                setOpen(true);
              }
            }}
            className="rounded-lg border border-border bg-card text-card-foreground shadow-sm overflow-hidden cursor-pointer">
            {job.images?.[0] && (
              <img src={job.images[0]} alt={job.title ?? 'Job image'} loading="lazy" className="w-full h-40 object-cover" />
            )}
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                {job.badges?.[0] && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{job.badges[0]}</span>
                )}
                <span className="text-sm text-muted-foreground">{job.city}</span>
              </div>
              <h3 className="text-base font-medium">{job.title}</h3>
              {job.subtitle && <p className="text-sm text-muted-foreground">{job.subtitle}</p>}
              {job.weekly_pay && <p className="text-sm font-medium">{job.weekly_pay}</p>}
              <PremiumContactGate className="mt-3">
                <div className="text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Liên hệ:</span>
                    <span>████ ██████</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Phone:</span>
                    <span>(███) ███-████</span>
                  </div>
                </div>
              </PremiumContactGate>
            </div>
          </article>
        ))}
      </div>
      <GuestCardTeaserModal open={open} onOpenChange={setOpen} image={teaser.image} title={teaser.title} />
    </section>
  );
};

export default HotJobsLane;
