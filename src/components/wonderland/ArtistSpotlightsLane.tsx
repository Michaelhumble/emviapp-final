import React from 'react';
import { PORTFOLIO_SEEDS } from '@/data/seed/portfolios.seed';
import { SEED_BLEND, WONDERLAND_ENABLED } from '@/config/wonderland.config';
import { getNearbySeed } from '@/lib/market';
import PremiumContactGate from '@/components/common/PremiumContactGate';

interface ArtistSpotlightsLaneProps {
  portfolios?: Array<any>;
  marketHint?: string;
  blend?: number;
}

const ArtistSpotlightsLane: React.FC<ArtistSpotlightsLaneProps> = ({ portfolios, marketHint, blend }) => {
  if (!WONDERLAND_ENABLED) return null;

  const seeds = getNearbySeed(PORTFOLIO_SEEDS, marketHint).slice(0, Math.ceil((blend ?? SEED_BLEND.portfolios) * 6));
  const items = (portfolios && portfolios.length ? portfolios : []).concat(seeds);

  return (
    <section aria-label="Artist spotlights" className="container mx-auto px-4 py-8">
      {process.env.NODE_ENV !== 'production' && (
        <span className="sr-only">Dev: items={items.length}</span>
      )}
      <header className="mb-4">
        <h2 className="text-xl font-semibold">Artist Spotlights</h2>
        <p className="text-sm text-muted-foreground">Tác phẩm nổi bật tuần này</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((pf, idx) => (
          <article key={pf.id ?? `pf-${idx}`}
            className="rounded-lg border border-border bg-card text-card-foreground shadow-sm overflow-hidden">
            {pf.images?.[0] && (
              <img src={pf.images[0]} alt={`${pf.artist_name} portfolio`} loading="lazy" className="w-full h-48 object-cover" />
            )}
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                {pf.badges?.[0] && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{pf.badges[0]}</span>
                )}
                <span className="text-sm text-muted-foreground">{pf.artist_name}</span>
              </div>
              <h3 className="text-base font-medium">{pf.title ?? 'Portfolio'}</h3>
              {pf.bio && <p className="text-sm text-muted-foreground">{pf.bio}</p>}
              <PremiumContactGate className="mt-3">
                <div className="text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">DM Artist:</span>
                    <span>████@██████.com</span>
                  </div>
                </div>
              </PremiumContactGate>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ArtistSpotlightsLane;
