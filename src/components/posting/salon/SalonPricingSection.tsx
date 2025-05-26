
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface SalonPricingSectionProps {
  onPricingSelect: (plan: string, price: number, featured: boolean) => void;
  selectedPlan?: string;
  featuredBoost: boolean;
  onFeaturedChange: (featured: boolean) => void;
}

const SalonPricingSection = ({ 
  onPricingSelect, 
  selectedPlan = '1-month',
  featuredBoost,
  onFeaturedChange 
}: SalonPricingSectionProps) => {
  const [activePlan, setActivePlan] = useState(selectedPlan);

  const plans = [
    {
      id: '1-month',
      name: 'Standard',
      price: 24.99,
      duration: '1 month',
      description: 'Live instantly, cancel anytime',
      savings: null
    },
    {
      id: '6-months',
      name: '6 Months',
      price: 120,
      duration: '6 months',
      description: 'Save 20%, best for most sellers',
      savings: 'Save 20%',
      popular: true
    },
    {
      id: '12-months',
      name: '12 Months',
      price: 250,
      duration: '12 months',
      description: 'Best value, patient sellers',
      savings: 'Best Value'
    }
  ];

  const handlePlanSelect = (plan: typeof plans[0]) => {
    setActivePlan(plan.id);
    onPricingSelect(plan.id, plan.price, featuredBoost);
  };

  const handleFeaturedToggle = (checked: boolean) => {
    onFeaturedChange(checked);
    const currentPlan = plans.find(p => p.id === activePlan);
    if (currentPlan) {
      onPricingSelect(activePlan, currentPlan.price, checked);
    }
  };

  const getSelectedPlan = () => plans.find(p => p.id === activePlan);
  const totalPrice = (getSelectedPlan()?.price || 0) + (featuredBoost ? 25 : 0);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-playfair font-bold text-gray-900">
          Sell Your Salon, Stress-Free
        </h2>
        <p className="text-lg text-gray-600 italic">
          No commissions. No contracts. Just peace of mind and real buyers.
        </p>
      </div>

      {/* Pricing Table */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.id}
            className={`relative cursor-pointer transition-all ${
              activePlan === plan.id 
                ? 'ring-2 ring-purple-500 border-purple-500' 
                : 'hover:border-purple-300'
            }`}
            onClick={() => handlePlanSelect(plan)}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600">
                Most Popular
              </Badge>
            )}
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className="text-3xl font-bold">
                ${plan.price}
                <span className="text-base font-normal text-gray-500">
                  /{plan.duration}
                </span>
              </div>
              {plan.savings && (
                <Badge variant="outline" className="text-green-600 border-green-200">
                  {plan.savings}
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600 mb-4">{plan.description}</p>
              <Button 
                className={`w-full ${
                  activePlan === plan.id 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlanSelect(plan);
                }}
              >
                {activePlan === plan.id ? 'Selected' : 'Select Plan'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured Boost Option */}
      <Card className="border-2 border-dashed border-orange-200 bg-orange-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Star className="h-6 w-6 text-orange-500" />
              <div>
                <h3 className="font-semibold text-gray-900">Need extra visibility?</h3>
                <p className="text-sm text-gray-600">
                  Upgrade to a Featured Listing for just <strong>$25 more</strong> — available on any plan.
                </p>
              </div>
            </div>
            <Switch
              checked={featuredBoost}
              onCheckedChange={handleFeaturedToggle}
            />
          </div>
        </CardContent>
      </Card>

      {/* Testimonial */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
        <blockquote className="text-center">
          <p className="text-gray-700 italic mb-2">
            "I listed and sold my salon in 3 weeks. The process was safe and easy."
          </p>
          <cite className="text-sm text-gray-600">— Mai, San Jose</cite>
        </blockquote>
      </div>

      {/* Why Choose EmviApp */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-xl font-semibold mb-4 text-center">Why Choose EmviApp</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <Check className="h-5 w-5 text-green-500 mt-0.5" />
            <span className="text-gray-700">No agent commissions (keep all your sale proceeds!)</span>
          </div>
          <div className="flex items-start space-x-3">
            <Check className="h-5 w-5 text-green-500 mt-0.5" />
            <span className="text-gray-700">Verified buyers only—no spam, no time wasters</span>
          </div>
          <div className="flex items-start space-x-3">
            <Check className="h-5 w-5 text-green-500 mt-0.5" />
            <span className="text-gray-700">List in 2 minutes, pause/cancel anytime</span>
          </div>
          <div className="flex items-start space-x-3">
            <Check className="h-5 w-5 text-green-500 mt-0.5" />
            <span className="text-gray-700">Optional featured boost: reach 2x more buyers instantly</span>
          </div>
        </div>
      </div>

      {/* Comparison Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="text-lg font-semibold mb-4">How does this compare?</h4>
        <div className="space-y-2 text-gray-700">
          <p>• Salon agents typically charge <strong>10% of your sale price</strong> ($10,000 on a $100k sale)</p>
          <p>• With EmviApp: Just $24.99/month, no hidden fees, and you stay in control</p>
          <p className="text-green-600 font-semibold">• No brainer: Save thousands, sell with confidence!</p>
        </div>
      </div>

      {/* Total and CTA */}
      <div className="bg-white p-6 rounded-lg border-2 border-purple-200">
        <div className="text-center space-y-4">
          <div className="text-2xl font-bold">
            Total: ${totalPrice.toFixed(2)}
            {featuredBoost && (
              <span className="text-sm font-normal text-gray-600 block">
                (${getSelectedPlan()?.price} + $25 featured boost)
              </span>
            )}
          </div>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
            {featuredBoost ? 'Feature My Listing & Sell Faster' : 'Get Started & List My Salon'}
          </Button>
        </div>
      </div>

      {/* Psychology & Fine Print */}
      <div className="text-center space-y-3 text-sm text-gray-600">
        <p className="italic">
          Most salons sell within 1–2 months. Pause or cancel your listing anytime — no risk, no stress.
        </p>
        <p className="italic">
          Featured listings appear at the top and get sent to our private buyers list.
        </p>
        <p className="italic">
          We never share your exact address or personal details without your approval.
        </p>
      </div>

      {/* Trust Section & Support */}
      <div className="text-center p-6 bg-gray-50 rounded-lg">
        <p className="text-gray-700 mb-2">Need help or have questions?</p>
        <Button variant="link" className="text-purple-600 hover:text-purple-700">
          Contact our team — We're here for you every step of the way.
        </Button>
      </div>
    </div>
  );
};

export default SalonPricingSection;
