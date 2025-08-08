import React, { useEffect, useMemo, useState } from 'react';
import { WONDERLAND_ENABLED } from '@/config/wonderland.config';
import ActivityTicker from '@/components/wonderland/ActivityTicker';
import HotJobsLane from '@/components/wonderland/HotJobsLane';
import TopSalonsHiringLane from '@/components/wonderland/TopSalonsHiringLane';
import ArtistSpotlightsLane from '@/components/wonderland/ArtistSpotlightsLane';
import BeforeAfterGalleryLane from '@/components/wonderland/BeforeAfterGalleryLane';
// import removed: useLocation not needed
import { JOB_SEEDS } from '@/data/seed/jobs.seed';
import { SALON_SEEDS } from '@/data/seed/salons.seed';
import { PORTFOLIO_SEEDS } from '@/data/seed/portfolios.seed';
import { TICKER_SEEDS } from '@/data/seed/ticker.seed';
import { isWonderlandPreviewActive } from '@/lib/preview';

const WonderlandHome: React.FC = () => {
  // location removed
  const [devPreview, setDevPreview] = useState<boolean>(false);

  // Dev-only keyboard toggle: Shift + W
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === 'W' || e.key === 'w')) {
        setDevPreview(prev => !prev);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isPreview = isWonderlandPreviewActive() || devPreview;
  const enabled = WONDERLAND_ENABLED || isPreview;

  const counts = useMemo(() => ({
    jobs: JOB_SEEDS?.length ?? 0,
    salons: SALON_SEEDS?.length ?? 0,
    portfolios: PORTFOLIO_SEEDS?.length ?? 0,
    ticker: TICKER_SEEDS?.length ?? 0,
  }), []);

  if (!enabled) return null;

  return (
    <div id="wonderland-start" tabIndex={-1} className={isWonderlandPreviewActive() ? 'preview-visible' : undefined}>
      {isPreview && (
        <div className="container mx-auto px-4 py-3 mt-2 rounded-md bg-primary/90 text-primary-foreground">
          <p className="text-sm font-medium">
            Wonderland Preview Active — lanes=Jobs:{counts.jobs}, Salons:{counts.salons}, Portfolios:{counts.portfolios}
          </p>
          {(counts.jobs === 0 || counts.salons === 0 || counts.portfolios === 0 || counts.ticker === 0) && (
            <div className="mt-2 text-sm font-semibold">
              {counts.jobs === 0 && <div>No seed data found for jobs. Add src/data/seed/*.ts items.</div>}
              {counts.salons === 0 && <div>No seed data found for salons. Add src/data/seed/*.ts items.</div>}
              {counts.portfolios === 0 && <div>No seed data found for portfolios. Add src/data/seed/*.ts items.</div>}
              {counts.ticker === 0 && <div>No seed data found for ticker. Add src/data/seed/*.ts items.</div>}
            </div>
          )}
        </div>
      )}

      {/* Wonderland lanes */}
      <ActivityTicker preview={isPreview} />
      <HotJobsLane preview={isPreview} />
      <TopSalonsHiringLane preview={isPreview} />
      <ArtistSpotlightsLane preview={isPreview} />
      <BeforeAfterGalleryLane preview={isPreview} />
    </div>
  )
};

export default WonderlandHome;
