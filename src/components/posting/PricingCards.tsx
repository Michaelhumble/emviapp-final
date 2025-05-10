
import React from 'react';
import PricingCard from './PricingCard';

interface PricingOption {
  id: string;
  name: string;
  price: number;
  wasPrice?: number;
  description: string;
  features: string[];
  popular?: boolean;
  tag?: string;
}

interface PricingCardsProps {
  options: PricingOption[];
  selectedOption: string;
  onSelectOption: (id: string) => void;
}

const PricingCards: React.FC<PricingCardsProps> = ({
  options,
  selectedOption,
  onSelectOption
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {options.map((option) => (
        <PricingCard
          key={option.id}
          id={option.id}
          name={option.name}
          price={option.price}
          wasPrice={option.wasPrice}
          description={option.description}
          features={option.features}
          isSelected={selectedOption === option.id}
          popular={option.popular}
          tag={option.tag}
          onSelect={onSelectOption}
        />
      ))}
    </div>
  );
};

export default PricingCards;
