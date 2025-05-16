
import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const BetterResultsSection: React.FC = () => {
  // Default all checkboxes to checked
  const [selectedOptions, setSelectedOptions] = useState<string[]>([
    'serious', 'moreViews', 'loyal', 'rightPeople', 'quickly', 'aiAssist', 'upgrades', 'serious', 'peaceOfMind'
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
      id: 'serious',
      label: 'I want my post to stand out and attract serious applicants',
      description: 'Artists are more likely to apply when your listing feels confident and clear.'
    },
    {
      id: 'moreViews',
      label: 'I want help getting more views on this job post',
      description: 'We can quietly boost your visibility if results slow down.'
    },
    {
      id: 'loyal',
      label: 'I care about building a loyal team I can trust',
      description: 'Thợ giỏi stay longer when they feel respected and supported.'
    },
    {
      id: 'rightPeople',
      label: 'I\'d rather not waste time interviewing the wrong people',
      description: 'Our smart filters help match you with better-fit applicants.'
    },
    {
      id: 'quickly',
      label: 'I want this job filled quickly so my business doesn\'t slow down',
      description: 'Faster posts = less revenue loss.'
    },
    {
      id: 'aiAssist',
      label: 'I want EmviApp AI to assist if this post doesn\'t perform',
      description: 'Let us auto-adjust visibility in the background if needed.'
    },
    {
      id: 'upgrades',
      label: 'I\'m open to small upgrades if it helps me hire faster',
      description: 'Sometimes, $5 can save you weeks of stress.'
    },
    {
      id: 'professional',
      label: 'I want my post to reflect how serious I am about hiring',
      description: 'Professional listings attract professional results.'
    },
    {
      id: 'peaceOfMind',
      label: 'I want peace of mind while EmviApp works in the background',
      description: 'Focus on your salon. We\'ll handle the hiring.'
    }
  ];

  return (
    <div className="space-y-5 rounded-lg border border-slate-100 bg-slate-50/50 p-5 my-8">
      <div className="mb-5">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <span className="text-rose-500">❤️</span> I want better results from this post
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          You're not alone. Here's what works for thousands of salons — just check what fits you:
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
              <p className="text-sm text-slate-500 mt-1">{option.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BetterResultsSection;
