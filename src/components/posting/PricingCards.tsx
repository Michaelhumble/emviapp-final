
import React from 'react';
import PricingCard from './PricingCard';

// Update the interface to match how it's being used
export interface PricingOption {
  id: string;
  name: string;
  price: number;
  wasPrice?: number;
  description: string;
  features: string[];
  popular?: boolean;
  tag?: string;
  tier?: string;
}

export interface PricingCardsProps {
  options?: PricingOption[];
  pricingOptions?: PricingOption[];
  selectedOption?: string;
  selectedPricing?: string;
  onSelectOption?: (id: string) => void;
  onChange?: (id: string) => void;
  selectedDuration?: number;
  onDurationChange?: (duration: number) => void;
}

const PricingCards: React.FC<PricingCardsProps> = ({
  options,
  pricingOptions,
  selectedOption,
  selectedPricing,
  onSelectOption,
  onChange,
  selectedDuration,
  onDurationChange
}) => {
  // Use either the options or pricingOptions prop (for backward compatibility)
  const displayOptions = pricingOptions || options || [];
  const selectedId = selectedPricing || selectedOption || '';
  const handleSelect = onChange || onSelectOption || (() => {});
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {displayOptions.map((option) => (
        <PricingCard
          key={option.id}
          id={option.id}
          name={option.name}
          price={option.price}
          wasPrice={option.wasPrice}
          description={option.description}
          features={option.features}
          isSelected={selectedId === option.id}
          popular={option.popular}
          tag={option.tag}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
};

export default PricingCards;
