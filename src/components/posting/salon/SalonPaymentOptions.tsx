
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "./salonFormSchema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Star, Zap, Crown, Trophy, Plus } from "lucide-react";
import { SalonPricingOptions, SalonPricingTier, SALON_PRICING_PLANS, calculateSalonPostPrice } from "@/utils/posting/salonPricing";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SalonPaymentFeatures from "./SalonPaymentFeatures";

interface SalonPaymentOptionsProps {
  form: UseFormReturn<SalonFormValues>;
  selectedOptions: SalonPricingOptions;
  onOptionsChange: (options: SalonPricingOptions) => void;
  onPaymentSuccess: () => void;
}

const SalonPaymentOptions: React.FC<SalonPaymentOptionsProps> = ({
  form,
  selectedOptions,
  onOptionsChange,
  onPaymentSuccess
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showFeaturesModal, setShowFeaturesModal] = useState(false);

  const handlePlanSelect = (tier: SalonPricingTier) => {
    onOptionsChange({
      ...selectedOptions,
      selectedPricingTier: tier
    });
  };

  const handleFeaturedToggle = (checked: boolean) => {
    onOptionsChange({
      ...selectedOptions,
      featuredAddon: checked
    });
  };

  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      console.log('Initiating Stripe payment with options:', selectedOptions);
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

  const getPlanIcon = (tier: SalonPricingTier) => {
    switch (tier) {
      case 'basic': return <Zap className="h-6 w-6" />;
      case 'gold': return <Star className="h-6 w-6" />;
      case 'premium': return <Crown className="h-6 w-6" />;
      case 'annual': return <Trophy className="h-6 w-6" />;
      default: return <Zap className="h-6 w-6" />;
    }
  };

  const getPlanGradient = (tier: SalonPricingTier) => {
    switch (tier) {
      case 'basic': return 'from-blue-500 to-blue-600';
      case 'gold': return 'from-yellow-500 to-orange-500';
      case 'premium': return 'from-purple-600 to-pink-600';
      case 'annual': return 'from-green-500 to-emerald-600';
      default: return 'from-blue-500 to-blue-600';
    }
  };

  const totalPrice = calculateSalonPostPrice(selectedOptions);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Choose Your Listing Plan
        </h3>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Select the perfect plan to showcase your salon to thousands of potential buyers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SALON_PRICING_PLANS.map((plan) => {
          const isSelected = selectedOptions.selectedPricingTier === plan.tier;
          const isPopular = plan.tier === 'premium';
          const gradient = getPlanGradient(plan.tier);
          
          return (
            <Card 
              key={plan.id}
              className={`relative transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl ${
                isSelected 
                  ? 'border-2 border-purple-500 shadow-2xl ring-4 ring-purple-200 scale-105' 
                  : 'border border-gray-200 hover:border-purple-300 shadow-lg'
              } backdrop-blur-sm bg-white/95`}
              onClick={() => handlePlanSelect(plan.tier)}
            >
              {isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className={`bg-gradient-to-r ${gradient} text-white px-4 py-1 text-sm font-semibold shadow-lg`}>
                    ⭐ Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4 pt-6">
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center text-white mb-4 shadow-lg`}>
                  {getPlanIcon(plan.tier)}
                </div>
                
                <CardTitle className="text-xl font-bold text-gray-900">{plan.name}</CardTitle>
                
                <div className="mt-4">
                  <div className="flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="text-gray-600 ml-2">
                      /{plan.duration === 1 ? 'mo' : `${plan.duration}mo`}
                    </span>
                  </div>
                  {plan.tier === 'annual' && (
                    <div className="text-sm text-green-600 font-semibold mt-1">
                      Save $89 vs monthly!
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mt-3 leading-relaxed">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="pt-0 pb-6">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-700">
                      <Star className="h-4 w-4 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full py-3 font-semibold text-base transition-all duration-200 ${
                    isSelected 
                      ? `bg-gradient-to-r ${gradient} hover:opacity-90 text-white shadow-lg` 
                      : `bg-gradient-to-r ${gradient} hover:opacity-90 text-white shadow-md hover:shadow-lg`
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlanSelect(plan.tier);
                  }}
                >
                  {isSelected ? '✓ Selected' : 'Select Plan'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <Plus className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">VIP Featured Listing Add-on</h4>
              <p className="text-sm text-gray-600">Premium placement with 5x more visibility</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-gray-900">+$10.00</span>
            <Checkbox
              checked={selectedOptions.featuredAddon || false}
              onCheckedChange={handleFeaturedToggle}
              className="h-5 w-5"
            />
          </div>
        </div>
        
        <Button
          variant="outline"
          onClick={() => setShowFeaturesModal(true)}
          className="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
        >
          Learn More About VIP Features
        </Button>
      </div>

      <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xl font-semibold text-gray-900">Order Summary</h4>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">${totalPrice.toFixed(2)}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
        </div>
        
        <Button
          onClick={handlePayment}
          disabled={isLoading || !selectedOptions.selectedPricingTier}
          className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {isLoading ? 'Processing...' : `Complete Payment - $${totalPrice.toFixed(2)}`}
        </Button>
      </div>

      <SalonPaymentFeatures
        isOpen={showFeaturesModal}
        onClose={() => setShowFeaturesModal(false)}
      />
    </div>
  );
};

export default SalonPaymentOptions;
