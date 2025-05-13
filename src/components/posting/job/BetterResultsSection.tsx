
import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const BetterResultsSection: React.FC = () => {
  // Default all checkboxes to checked
  const [selectedOptions, setSelectedOptions] = useState<string[]>([
    'weeklyPay', 'friendly', 'bilingual', 'photos', 'details', 'flexible', 'highPay', 'reviews', 'promotion'
  ]);

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setSelectedOptions(prev => 
      checked 
        ? [...prev, id] 
        : prev.filter(item => item !== id)
    );
  };

  const options = [
    {
      id: 'weeklyPay',
      label: 'Weekly pay attracts top Thợ Giỏi (artists)',
    },
    {
      id: 'friendly',
      label: 'Having a friendly work environment helps get more applicants',
    },
    {
      id: 'bilingual',
      label: 'Posting your job in both English and Vietnamese can increase visibility',
    },
    {
      id: 'photos',
      label: 'Sharing real nail photos builds more trust with artists',
    },
    {
      id: 'details',
      label: 'More job details = more serious applicants',
    },
    {
      id: 'flexible',
      label: 'Many artists want to work part-time or flexible hours',
    },
    {
      id: 'highPay',
      label: 'Mentioning high pay upfront improves response rate',
    },
    {
      id: 'reviews',
      label: 'Reviews and testimonials build trust',
    },
    {
      id: 'promotion',
      label: 'EmviApp will help promote your listing to more artists for you',
    }
  ];

  return (
    <div className="space-y-5 rounded-lg border border-purple-100 bg-purple-50/50 p-5 my-8">
      <div className="mb-5">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <span className="text-purple-500">💜</span> Want Better Results?
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          These tips can help attract better candidates
        </p>
      </div>

      <div className="space-y-4">
        {options.map(option => (
          <div key={option.id} className="flex items-start">
            <Checkbox 
              id={option.id} 
              checked={selectedOptions.includes(option.id)}
              onCheckedChange={(checked) => handleCheckboxChange(option.id, checked === true)}
              className="mt-1"
            />
            <div className="ml-3">
              <Label 
                htmlFor={option.id} 
                className="font-medium text-base cursor-pointer"
              >
                {option.label}
              </Label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BetterResultsSection;
