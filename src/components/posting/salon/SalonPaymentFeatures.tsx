
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Star, Crown, Shield, X } from 'lucide-react';

export interface SalonPaymentFeaturesProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (planType: 'basic' | 'standard' | 'premium' | 'enterprise') => void;
  onProceedToPayment: () => void;
  currentPlan: 'basic' | 'standard' | 'premium' | 'enterprise';
  basePrice: number;
}

const SalonPaymentFeatures: React.FC<SalonPaymentFeaturesProps> = ({
  isOpen,
  onClose,
  onSelect,
  onProceedToPayment,
  currentPlan,
  basePrice
}) => {
  const plans = [
    {
      planType: 'basic' as const,
      name: 'Basic Listing',
      price: 99,
      duration: 30,
      features: [
        'Basic salon listing',
        '30-day visibility',
        'Contact form integration',
        'Mobile-responsive design',
        'Basic photo gallery',
        'Location display'
      ],
      icon: CheckCircle2,
      color: 'text-blue-600'
    },
    {
      planType: 'standard' as const,
      name: 'Featured Listing',
      price: 199,
      duration: 60,
      features: [
        'Everything in Basic',
        '60-day featured placement',
        'Priority in search results',
        'Enhanced photo gallery',
        'Business hours display',
        'Customer testimonials',
        'Social media links'
      ],
      icon: Star,
      color: 'text-green-600',
      badge: 'Most Popular'
    },
    {
      planType: 'premium' as const,
      name: 'Premium Showcase',
      price: 299,
      duration: 90,
      features: [
        'Everything in Featured',
        '90-day premium placement',
        'Top banner positioning',
        'Virtual tour integration',
        'Customer review system',
        'Social media integration',
        'SEO optimization',
        'Analytics insights'
      ],
      icon: Crown,
      color: 'text-purple-600',
      badge: 'Best Value'
    },
    {
      planType: 'enterprise' as const,
      name: 'Enterprise Plus',
      price: 499,
      duration: 120,
      features: [
        'Everything in Premium',
        '120-day maximum exposure',
        'Dedicated account manager',
        'Custom branding options',
        'Advanced analytics dashboard',
        'Multiple location support',
        'Priority customer support',
        'Custom integrations'
      ],
      icon: Shield,
      color: 'text-gold-600',
      badge: 'Maximum Exposure'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl font-bold">Compare All Features</DialogTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isSelected = currentPlan === plan.planType;
            
            return (
              <div
                key={plan.planType}
                className={`relative p-6 border rounded-lg transition-all duration-200 ${
                  isSelected 
                    ? 'ring-2 ring-purple-500 bg-purple-50' 
                    : 'hover:shadow-md cursor-pointer'
                }`}
                onClick={() => onSelect(plan.planType)}
              >
                {plan.badge && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white">
                    {plan.badge}
                  </Badge>
                )}
                
                <div className="text-center mb-4">
                  <Icon className={`h-8 w-8 mx-auto mb-2 ${plan.color}`} />
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  <div className="text-2xl font-bold text-gray-900">
                    ${plan.price}
                  </div>
                  <p className="text-sm text-gray-600">{plan.duration} days</p>
                </div>
                
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(plan.planType);
                  }}
                  variant={isSelected ? "default" : "outline"}
                  className="w-full"
                >
                  {isSelected ? 'Selected' : 'Select Plan'}
                </Button>
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-between items-center mt-8 pt-6 border-t">
          <div className="text-lg">
            <span className="text-gray-600">Current selection: </span>
            <span className="font-bold">${basePrice}</span>
          </div>
          <Button
            onClick={onProceedToPayment}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Proceed to Payment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SalonPaymentFeatures;
