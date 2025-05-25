
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star, Zap } from 'lucide-react';

interface JobPricingTableProps {
  onPricingSelect: (tier: string, finalPrice: number, durationMonths: number) => void;
  jobData: any;
}

const JobPricingTable: React.FC<JobPricingTableProps> = ({ onPricingSelect, jobData }) => {
  const pricingPlans = [
    {
      tier: 'basic',
      name: 'Basic',
      price: 49,
      duration: 1,
      icon: <Check className="h-5 w-5" />,
      description: 'Standard job posting',
      features: [
        '30-day listing',
        'Basic job visibility',
        'Email support',
        'Standard applicant filtering'
      ],
      buttonText: 'Select Basic',
      popular: false
    },
    {
      tier: 'premium',
      name: 'Premium',
      price: 99,
      duration: 2,
      icon: <Star className="h-5 w-5" />,
      description: 'Enhanced visibility and features',
      features: [
        '60-day listing',
        'Featured placement',
        'Priority support',
        'Advanced applicant filtering',
        'Social media promotion',
        'Analytics dashboard'
      ],
      buttonText: 'Select Premium',
      popular: true
    },
    {
      tier: 'pro',
      name: 'Pro',
      price: 149,
      duration: 3,
      icon: <Zap className="h-5 w-5" />,
      description: 'Maximum exposure and priority',
      features: [
        '90-day listing',
        'Top placement guaranteed',
        'Dedicated support',
        'Advanced analytics',
        'Social media boost',
        'Urgent hiring badge',
        'Multiple platform posting',
        'Candidate screening assistance'
      ],
      buttonText: 'Select Pro',
      popular: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingPlans.map((plan) => (
          <Card 
            key={plan.tier} 
            className={`relative ${plan.popular ? 'border-purple-500 shadow-lg' : 'border-gray-200'}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}
            
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <div className={`p-2 rounded-full ${plan.popular ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'}`}>
                  {plan.icon}
                </div>
              </div>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className="text-3xl font-bold">
                ${plan.price}
                <span className="text-sm font-normal text-gray-500">/{plan.duration} month{plan.duration > 1 ? 's' : ''}</span>
              </div>
              <p className="text-gray-600">{plan.description}</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button
                onClick={() => onPricingSelect(plan.tier, plan.price, plan.duration)}
                className={`w-full ${
                  plan.popular 
                    ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {plan.buttonText}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="bg-blue-50 rounded-lg p-4 text-center">
        <p className="text-sm text-blue-800">
          <strong>Job Title:</strong> {jobData?.title || 'Your Job Posting'}
        </p>
        <p className="text-xs text-blue-600 mt-1">
          All plans include: Applicant management, mobile-optimized listings, and candidate notifications
        </p>
      </div>
    </div>
  );
};

export default JobPricingTable;
