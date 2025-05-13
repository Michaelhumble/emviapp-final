
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const BetterResultsSection = () => {
  const options = [
    {
      id: 'standout',
      label: 'I want my post to stand out and attract serious applicants',
      description: 'Artists are more likely to apply when your listing feels confident and clear.',
    },
    {
      id: 'moreViews',
      label: 'I want help getting more views on this job post',
      description: 'We can quietly boost your visibility if results slow down.',
    },
    {
      id: 'buildLoyalTeam',
      label: 'I care about building a loyal team I can trust',
      description: 'Thợ giỏi stay longer when they feel respected and supported.',
    },
    {
      id: 'avoidWrongPeople',
      label: "I'd rather not waste time interviewing the wrong people",
      description: 'Our smart filters help match you with better-fit applicants.',
    },
    {
      id: 'quickFill',
      label: "I want this job filled quickly so my business doesn't slow down",
      description: 'Faster posts = less revenue loss.',
    },
    {
      id: 'aiAssist',
      label: "I want EmviApp AI to assist if this post doesn't perform",
      description: 'Let us auto-adjust visibility in the background if needed.',
    },
    {
      id: 'openToUpgrades',
      label: "I'm open to small upgrades if it helps me hire faster",
      description: 'Sometimes, $5 can save you weeks of stress.',
    },
    {
      id: 'seriousHiring',
      label: "I want my post to reflect how serious I am about hiring",
      description: 'Professional listings attract professional results.',
    },
    {
      id: 'peaceMind',
      label: "I want peace of mind while EmviApp works in the background",
      description: 'Focus on your salon. We\'ll handle the hiring.',
    },
  ];

  return (
    <div className="space-y-6 mb-8">
      <div className="space-y-2">
        <h3 className="text-xl font-medium flex items-center gap-2">
          <span className="text-red-500">❤️</span> 
          I want better results from this post
        </h3>
        <p className="text-sm text-gray-500">
          You're not alone. Here's what works for thousands of salons — just check what fits you:
        </p>
      </div>

      <div className="space-y-4">
        {options.map((option) => (
          <div key={option.id} className="flex space-x-3 items-start border border-gray-100 p-3 rounded-md hover:bg-gray-50 transition-colors">
            <Checkbox 
              id={option.id} 
              defaultChecked={true}
              className="mt-1"
            />
            <div className="space-y-1">
              <Label 
                htmlFor={option.id} 
                className="font-medium cursor-pointer"
              >
                {option.label}
              </Label>
              <p className="text-sm text-gray-500">{option.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BetterResultsSection;
