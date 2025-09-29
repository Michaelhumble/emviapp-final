import React from 'react';
import { Check, X } from 'lucide-react';

export const ListingBenefitsTable: React.FC = () => {
  const features = [
    { name: 'Featured listing placement', free: true, others: false },
    { name: '12 months free listing', free: true, others: false },
    { name: 'Direct buyer messaging', free: true, others: true },
    { name: 'Professional valuation report', free: true, others: false },
    { name: 'Detailed analytics dashboard', free: true, others: false },
    { name: 'Listing on multiple platforms', free: false, others: true },
    { name: 'Broker commission fees', free: false, others: true },
  ];

  return (
    <div className="bg-white border border-purple-200 rounded-xl p-6 shadow-lg">
      <h4 className="text-xl font-bold text-center mb-6">Why List on EmviApp?</h4>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-purple-200">
              <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Feature</th>
              <th className="text-center py-3 px-2">
                <div className="text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 rounded-full">
                  EmviApp
                </div>
              </th>
              <th className="text-center py-3 px-2 text-sm font-semibold text-muted-foreground">
                Traditional Brokers
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-3 px-2 text-sm">{feature.name}</td>
                <td className="text-center py-3 px-2">
                  {feature.free ? (
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-red-400 mx-auto" />
                  )}
                </td>
                <td className="text-center py-3 px-2">
                  {feature.others ? (
                    <Check className="w-5 h-5 text-gray-400 mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-red-400 mx-auto" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
        <p className="text-sm text-center font-semibold text-purple-900">
          Save up to <span className="text-2xl text-purple-600">$15,000</span> in broker fees
        </p>
      </div>
    </div>
  );
};
