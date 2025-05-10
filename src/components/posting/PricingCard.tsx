
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface PricingCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  isSelected: boolean;
  wasPrice?: number;
  popular?: boolean;
  tag?: string;
  onSelect: (id: string) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  id,
  name,
  price,
  description,
  features,
  isSelected,
  wasPrice,
  popular,
  tag,
  onSelect
}) => {
  return (
    <Card 
      className={`relative cursor-pointer transition-all hover:shadow-lg 
        ${isSelected ? 'border-primary border-2 shadow-md' : 'border border-gray-200 hover:border-primary/50'}`}
      onClick={() => onSelect(id)}
    >
      {popular && (
        <div className="absolute top-0 right-0 bg-amber-500 text-white px-3 py-1 text-xs font-medium rounded-bl-lg rounded-tr-md">
          Most Popular
        </div>
      )}
      {tag && (
        <div className="absolute top-0 left-0 bg-blue-100 text-blue-800 px-2 py-1 text-xs font-medium rounded-br-lg rounded-tl-md">
          {tag}
        </div>
      )}
      <CardContent className="p-5">
        <h3 className="font-bold text-lg mb-1">{name}</h3>
        <div className="mb-4">
          <span className="text-2xl font-bold">${price}</span>
          {wasPrice && (
            <span className="text-gray-400 line-through ml-2 text-sm">${wasPrice}</span>
          )}
        </div>
        <p className="text-gray-600 mb-4 text-sm">{description}</p>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="text-sm flex items-start">
              <span className="mr-2">✓</span> {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PricingCard;
