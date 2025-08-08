import React from 'react';
import { TICKER_SEEDS } from '@/data/seed/ticker.seed';
import { SEED_BLEND, WONDERLAND_ENABLED } from '@/config/wonderland.config';

interface ActivityTickerProps {
  items?: { text: string; id?: string }[];
  blend?: number;
}

const ActivityTicker: React.FC<ActivityTickerProps> = ({ items, blend }) => {
  if (!WONDERLAND_ENABLED) return null;
  const seeds = TICKER_SEEDS.slice(0, Math.ceil((blend ?? SEED_BLEND.ticker) * 6));
  const all = (items && items.length ? items : []).concat(seeds);

  return (
    <section aria-label="Live activity ticker" className="container mx-auto px-4 py-6">
      <div className="w-full overflow-hidden rounded-md border border-border bg-muted/40">
        <div className="flex gap-8 whitespace-nowrap animate-[marquee_20s_linear_infinite] p-3 text-sm">
          {all.map((it, i) => (
            <span key={it.id ?? `tick-${i}`} className="text-muted-foreground">• {it.text}</span>
          ))}
        </div>
      </div>
      <style>{`@keyframes marquee {0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </section>
  );
};

export default ActivityTicker;
