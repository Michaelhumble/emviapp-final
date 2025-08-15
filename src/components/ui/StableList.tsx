import React, { ReactNode, useMemo } from 'react';
import { generateStableKey } from '@/utils/scrollStabilizer';

interface StableListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  getItemId?: (item: T, index: number) => string;
  className?: string;
  itemClassName?: string;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * List component that ensures stable keys and prevents scroll jumping
 * Use this instead of manual .map() operations
 */
function StableList<T>({
  items,
  renderItem,
  getItemId,
  className = '',
  itemClassName = '',
  as: Component = 'div'
}: StableListProps<T>) {
  // Memoize rendered items to prevent unnecessary re-renders
  const renderedItems = useMemo(() => {
    return items.map((item, index) => {
      const stableKey = getItemId ? getItemId(item, index) : generateStableKey(item, index);
      
      return (
        <div key={stableKey} className={itemClassName}>
          {renderItem(item, index)}
        </div>
      );
    });
  }, [items, renderItem, getItemId, itemClassName]);

  return (
    <Component className={className}>
      {renderedItems}
    </Component>
  );
}

export default StableList;