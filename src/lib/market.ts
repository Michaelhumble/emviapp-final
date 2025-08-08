export type MarketLevel = 'city' | 'metro' | 'state';

export function inferMarket(zipOrCity?: string): MarketLevel {
  // Simple stub: default to 'city' if provided, else 'state'
  return zipOrCity ? 'city' : 'state';
}

export function getNearbySeed<T extends { market: MarketLevel }>(seed: T[], marketHint?: string): T[] {
  if (!marketHint) return seed;
  const level = (['city', 'metro', 'state'].includes(marketHint) ? marketHint : 'state') as MarketLevel;
  const byLevel = seed.filter(s => s.market === level);
  return byLevel.length ? byLevel : seed;
}
