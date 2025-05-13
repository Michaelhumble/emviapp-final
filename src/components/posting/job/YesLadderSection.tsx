
import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const YesLadderSection: React.FC = () => {
  // Default all checkboxes to checked
  const [selectedOptions, setSelectedOptions] = useState<string[]>([
    'serious', 'experienced', 'faster', 'attractive', 'weekly', 'aiTools', 'fillQuickly', 'smoothly', 'standOut'
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
      label: 'I want my post to attract serious, professional thợ giỏi',
      description: 'Your presentation matters in attracting career-minded professionals.'
    },
    {
      id: 'experienced',
      label: 'I prefer applicants who are already experienced in nail art and dip/gel',
      description: 'We can highlight required skills to attract experienced artists.'
    },
    {
      id: 'faster',
      label: 'I want to receive applications faster so I can hire quickly',
      description: 'Timing is everything when you need to fill a position.'
    },
    {
      id: 'attractive',
      label: 'I'd love help writing a more attractive post if it gets more views',
      description: 'Our AI can suggest improvements that increase engagement.'
    },
    {
      id: 'weekly',
      label: 'I\'m willing to offer weekly pay if it brings better talent',
      description: 'Flexible payment schedules often attract quality candidates.'
    },
    {
      id: 'aiTools',
      label: 'I\'m open to AI tools helping me find more thợ giỏi near me',
      description: 'Let technology do the heavy lifting in your search.'
    },
    {
      id: 'fillQuickly',
      label: 'I want to fill this job quickly — no waiting',
      description: 'Every day with an open position costs your salon money.'
    },
    {
      id: 'smoothly',
      label: 'I\'m open to suggestions that help me run my business more smoothly',
      description: 'Small changes can make a big difference in your daily operations.'
    },
    {
      id: 'standOut',
      label: 'I want to stand out from other salons in my area',
      description: 'Differentiation helps attract both talent and customers.'
    }
  ];

  return (
    <div className="space-y-5 rounded-lg border border-slate-100 bg-slate-50/50 p-5 my-8">
      <div className="mb-5">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <span className="text-purple-500">💜</span> Help us understand what matters to you
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          Running a salon is hard work. Let us know what's important so we can better support you.
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

export default YesLadderSection;
