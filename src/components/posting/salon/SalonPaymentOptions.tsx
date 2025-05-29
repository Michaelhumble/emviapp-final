
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Star, Zap, Crown, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import SalonPaymentFeatures from './SalonPaymentFeatures';

export interface SalonPricingOptions {
  planType: 'basic' | 'standard' | 'premium' | 'enterprise';
  duration: number;
  basePrice: number;
  totalPrice: number;
  features: string[];
  addOns: {
    featuredListing: boolean;
  };
}

interface SalonPaymentOptionsProps {
  form: UseFormReturn<any>;
  selectedOptions: SalonPricingOptions;
  onOptionsChange: (options: SalonPricingOptions) => void;
  onPaymentSuccess: () => void;
  onPayment?: () => void;
}

const SalonPaymentOptions: React.FC<SalonPaymentOptionsProps> = ({
  form,
  selectedOptions,
  onOptionsChange,
  onPaymentSuccess,
  onPayment
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  const pricingPlans = [
    {
      planType: 'basic' as const,
      name: 'Basic Listing',
      duration: 30,
      basePrice: 99,
      originalPrice: 149,
      features: [
        'Basic salon listing',
        '30-day visibility',
        'Contact form integration',
        'Mobile-responsive design'
      ],
      badge: 'Most Popular',
      badgeColor: 'bg-blue-500',
      icon: CheckCircle2
    },
    {
      planType: 'standard' as const,
      name: 'Featured Listing',
      duration: 60,
      basePrice: 199,
      originalPrice: 299,
      features: [
        'Everything in Basic',
        '60-day featured placement',
        'Priority in search results',
        'Enhanced photo gallery',
        'Business hours display'
      ],
      badge: 'Recommended',
      badgeColor: 'bg-green-500',
      icon: Star
    },
    {
      planType: 'premium' as const,
      name: 'Premium Showcase',
      duration: 90,
      basePrice: 299,
      originalPrice: 449,
      features: [
        'Everything in Featured',
        '90-day premium placement',
        'Top banner positioning',
        'Virtual tour integration',
        'Customer review system',
        'Social media integration'
      ],
      badge: 'Best Value',
      badgeColor: 'bg-purple-500',
      icon: Crown
    },
    {
      planType: 'enterprise' as const,
      name: 'Enterprise Plus',
      duration: 120,
      basePrice: 499,
      originalPrice: 699,
      features: [
        'Everything in Premium',
        '120-day maximum exposure',
        'Dedicated account manager',
        'Custom branding options',
        'Analytics dashboard',
        'Multiple location support'
      ],
      badge: 'Maximum Exposure',
      badgeColor: 'bg-gold-500',
      icon: Shield
    }
  ];

  const handlePlanSelect = (plan: typeof pricingPlans[0]) => {
    const newOptions: SalonPricingOptions = {
      planType: plan.planType,
      duration: plan.duration,
      basePrice: plan.basePrice,
      totalPrice: plan.basePrice + (selectedOptions.addOns.featuredListing ? 10 : 0),
      features: plan.features,
      addOns: selectedOptions.addOns
    };
    onOptionsChange(newOptions);
  };

  const handleAddOnChange = (addOnKey: keyof SalonPricingOptions['addOns'], value: boolean) => {
    const newAddOns = { ...selectedOptions.addOns, [addOnKey]: value };
    const newOptions: SalonPricingOptions = {
      ...selectedOptions,
      addOns: newAddOns,
      totalPrice: selectedOptions.basePrice + (newAddOns.featuredListing ? 10 : 0)
    };
    onOptionsChange(newOptions);
  };

  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      console.log('Initiating salon payment with options:', selectedOptions);
      console.log('Form data:', form.getValues());
      
      const { data, error } = await supabase.functions.invoke('create-salon-checkout', {
        body: { 
          pricingOptions: selectedOptions,
          formData: form.getValues()
        }
      });
      
      if (error) {
        console.error('Error creating checkout session:', error);
        toast.error("Payment Error", {
          description: "Unable to process payment. Please try again."
        });
        return;
      }
      
      if (data?.url) {
        console.log('Redirecting to Stripe checkout:', data.url);
        // Call onPayment if provided
        if (onPayment) {
          onPayment();
        }
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        console.error('No checkout URL received:', data);
        toast.error("Payment Error", {
          description: "No checkout URL received. Please try again."
        });
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error("Payment Error", {
        description: "Failed to initialize payment. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Choose Your Listing Package
        </h2>
        <p className="text-lg text-gray-600">
          Select the perfect plan to showcase your salon to potential buyers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricingPlans.map((plan) => {
          const Icon = plan.icon;
          const isSelected = selectedOptions.planType === plan.planType;
          
          return (
            <Card 
              key={plan.planType}
              className={`relative cursor-pointer transition-all duration-200 hover:shadow-lg ${
                isSelected ? 'ring-2 ring-purple-500 shadow-lg' : ''
              }`}
              onClick={() => handlePlanSelect(plan)}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className={`${plan.badgeColor} text-white px-3 py-1`}>
                    {plan.badge}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-3">
                  <Icon className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <div className="space-y-1">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-3xl font-bold text-gray-900">
                      ${plan.basePrice}
                    </span>
                    {plan.originalPrice > plan.basePrice && (
                      <span className="text-lg text-gray-500 line-through">
                        ${plan.originalPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{plan.duration} days visibility</p>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {isSelected && (
                  <div className="text-center">
                    <CheckCircle2 className="h-6 w-6 text-green-500 mx-auto" />
                    <span className="text-sm text-green-600 font-medium">Selected</span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Add-ons Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-purple-600" />
            Optional Add-ons
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Featured Listing Boost</h4>
              <p className="text-sm text-gray-600">
                Get additional visibility with highlighted placement
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-lg">+$10</span>
              <Button
                variant={selectedOptions.addOns.featuredListing ? "default" : "outline"}
                size="sm"
                onClick={() => handleAddOnChange('featuredListing', !selectedOptions.addOns.featuredListing)}
              >
                {selectedOptions.addOns.featuredListing ? 'Added' : 'Add'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Modal Button */}
      <div className="text-center">
        <Button
          variant="outline"
          onClick={() => setShowFeatures(true)}
          className="mb-6"
        >
          Compare All Features
        </Button>
      </div>

      {/* Total and Payment */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Total: ${selectedOptions.totalPrice}
              </h3>
              <p className="text-sm text-gray-600">
                {selectedOptions.duration} days of visibility
              </p>
            </div>
            <Button
              onClick={handlePayment}
              disabled={isLoading}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isLoading ? 'Processing...' : 'Proceed to Payment'}
            </Button>
          </div>
          
          <div className="text-xs text-gray-500 text-center">
            Secure payment processing • 30-day money-back guarantee
          </div>
        </CardContent>
      </Card>

      {/* Features Modal */}
      <SalonPaymentFeatures
        isOpen={showFeatures}
        onClose={() => setShowFeatures(false)}
        onSelect={(planType) => {
          const plan = pricingPlans.find(p => p.planType === planType);
          if (plan) handlePlanSelect(plan);
          setShowFeatures(false);
        }}
        onProceedToPayment={handlePayment}
        currentPlan={selectedOptions.planType}
        basePrice={selectedOptions.basePrice}
      />
    </div>
  );
};

export default SalonPaymentOptions;
