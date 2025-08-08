import React, { useState } from 'react';
import { SALON_SEEDS } from '@/data/seed/salons.seed';
import { SEED_BLEND, WONDERLAND_ENABLED } from '@/config/wonderland.config';
import { getNearbySeed } from '@/lib/market';
import PremiumContactGate from '@/components/common/PremiumContactGate';
import { useAuth } from '@/context/auth';
import GuestCardTeaserModal from '@/components/wonderland/GuestCardTeaserModal';

interface TopSalonsHiringLaneProps {
  salons?: Array<any>;
  marketHint?: string;
  blend?: number;
  preview?: boolean;
}

const TopSalonsHiringLane: React.FC<TopSalonsHiringLaneProps> = ({ salons, marketHint, blend, preview = false }) => {
  const enabled = WONDERLAND_ENABLED || !!preview;
  if (!enabled) return null;

  const { isSignedIn } = useAuth();
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState<{ image?: string; title?: string }>({});

  const seeds = getNearbySeed(SALON_SEEDS, marketHint).slice(0, Math.ceil((blend ?? SEED_BLEND.salons) * 6));
  const items = (salons && salons.length ? salons : []).concat(seeds);

  return (
    <section aria-label="Top salons hiring" className={`container mx-auto px-4 py-8 ${preview ? 'relative border border-dashed border-primary/50 rounded-md' : ''}`}>
      {preview && (
        <span className="absolute -top-3 left-3 text-xs px-2 py-1 rounded bg-primary/10 text-primary">Top Salons Hiring</span>
      )}
      {process.env.NODE_ENV !== 'production' && (
        <span className="sr-only">Dev: items={items.length}</span>
      )}
      <header className="mb-4">
        <h2 className="text-xl font-semibold">Top Salons Hiring</h2>
        <p className="text-sm text-muted-foreground">Những tiệm đang cần người</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((salon, idx) => (
          <article key={salon.id ?? `salon-${idx}`}
            onClick={() => {
              if (!isSignedIn) {
                setTeaser({ image: salon.images?.[0], title: salon.title });
                setOpen(true);
              }
            }}
            className="rounded-lg border border-border bg-card text-card-foreground shadow-sm overflow-hidden cursor-pointer">
            {salon.images?.[0] && (
              <img src={salon.images[0]} alt={salon.title ?? 'Salon image'} loading="lazy" className="w-full h-40 object-cover" />
            )}
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                {salon.badges?.[0] && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{salon.badges[0]}</span>
                )}
                {salon.price_estimate && <span className="text-sm font-medium">{salon.price_estimate}</span>}
              </div>
              <h3 className="text-base font-medium">{salon.title}</h3>
              {salon.subtitle && <p className="text-sm text-muted-foreground">{salon.subtitle}</p>}
              <PremiumContactGate className="mt-3">
                <div className="text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Liên hệ chủ tiệm:</span>
                    <span>████ ██████</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Email:</span>
                    <span>████@██████.com</span>
                  </div>
                </div>
              </PremiumContactGate>
            </div>
          </article>
        ))}
      </div>
      <GuestCardTeaserModal open={open} onOpenChange={setOpen} image={teaser.image} title={teaser.title} cardType="salon" />
    </section>
  );
};

export default TopSalonsHiringLane;
