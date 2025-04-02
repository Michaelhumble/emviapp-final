
import React from 'react';
import StoreItem from './StoreItem';

interface StoreItemListProps {
  items: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    icon: React.ReactNode;
    type: string;
    duration?: number;
    credits: number;
    purchasing: string | null;
    userId?: string;
    onPurchaseComplete: (newBalance: number) => void;
  }>;
  loading: boolean;
}

const StoreItemList: React.FC<StoreItemListProps> = ({ items, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse bg-gray-800/50 rounded-xl p-6 h-72"></div>
        ))}
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No items available in the store</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <StoreItem
          key={item.id}
          id={item.id}
          name={item.name}
          description={item.description}
          price={item.price}
          icon={item.icon}
          type={item.type}
          duration={item.duration}
          credits={item.credits}
          purchasing={item.purchasing}
          userId={item.userId}
          onPurchaseComplete={item.onPurchaseComplete}
        />
      ))}
    </div>
  );
};

export default StoreItemList;
