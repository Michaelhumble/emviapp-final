
import React from 'react';

interface PricingCardProps {
  title: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
  onSelect: () => void;
}

// This is a simple placeholder component to fix the import error
// The actual implementation would be more complex but this resolves the build error
const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  description,
  features,
  popular = false,
  onSelect
}) => {
  return (
    <div className={`border rounded-lg p-6 ${popular ? 'border-purple-400 shadow-lg' : 'border-gray-200'}`}>
      {popular && (
        <div className="bg-purple-500 text-white text-xs font-bold uppercase px-3 py-1 rounded-full mb-3 inline-block">
          Most Popular
        </div>
      )}
      <h3 className="text-lg font-bold">{title}</h3>
      <div className="mt-2 text-3xl font-bold">${price}</div>
      <p className="text-gray-500 mt-2">{description}</p>
      <ul className="mt-4 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={onSelect}
        className={`mt-6 w-full py-2 px-4 rounded ${
          popular
            ? 'bg-purple-600 hover:bg-purple-700 text-white'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
        }`}
      >
        Select Plan
      </button>
    </div>
  );
};

export default PricingCard;
