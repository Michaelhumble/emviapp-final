import React from 'react';
import { PORTFOLIO_SEEDS } from '@/data/seed/portfolios.seed';
import { SEED_BLEND, WONDERLAND_ENABLED } from '@/config/wonderland.config';

interface BeforeAfterGalleryLaneProps {
  images?: string[];
  blend?: number;
}

const BeforeAfterGalleryLane: React.FC<BeforeAfterGalleryLaneProps> = ({ images, blend }) => {
  if (!WONDERLAND_ENABLED) return null;
  const seeds = PORTFOLIO_SEEDS.slice(0, Math.ceil((blend ?? SEED_BLEND.portfolios) * 8));
  const gallery = (images && images.length ? images : []).concat(seeds.flatMap(s => s.images)).slice(0, 12);

  return (
    <section aria-label="Before & After gallery" className="container mx-auto px-4 py-8">
      <header className="mb-4">
        <h2 className="text-xl font-semibold">Before & After</h2>
        <p className="text-sm text-muted-foreground">Khoảnh khắc thay đổi ấn tượng</p>
      </header>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {gallery.map((src, idx) => (
          <div key={`${src}-${idx}`} className="overflow-hidden rounded-md border border-border">
            <img src={src} alt={`Gallery image ${idx + 1}`} loading="lazy" className="w-full h-32 object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BeforeAfterGalleryLane;
