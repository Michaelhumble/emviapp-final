export function getStableKey<T extends Record<string, any>>(item: T, fallbackPrefix = 'item'): string {
  return (
    item.id?.toString?.() ||
    item.listing_id?.toString?.() ||
    item.slug ||
    item.uid ||
    item.key ||
    item._id?.toString?.() ||
    `${fallbackPrefix}-${JSON.stringify(item).length}`
  );
}