
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "./salonFormSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Star, Zap, Loader2 } from "lucide-react";
import { SALON_PRICING_PLANS } from "@/utils/posting/salonPricing";
import { toast } from "sonner";
import { useStripe } from "@/hooks/useStripe";

interface SalonPaymentOptionsProps {
  form: UseFormReturn<SalonFormValues>;
  onPaymentComplete?: () => void;
}

export const SalonPaymentOptions = ({ form, onPaymentComplete }: SalonPaymentOptionsProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const selectedTier = form.watch("selectedPricingTier");
  const featuredAddon = form.watch("featuredAddon");
  const { initiatePayment } = useStripe();

  const handlePlanSelect = (tier: string) => {
    form.setValue("selectedPricingTier", tier as any);
  };

  const handleFeaturedToggle = (checked: boolean) => {
    form.setValue("featuredAddon", checked);
  };

  const calculateTotal = () => {
    const selectedPlan = SALON_PRICING_PLANS.find(plan => plan.tier === selectedTier);
    const basePrice = selectedPlan ? selectedPlan.price : 19.99;
    const featuredPrice = featuredAddon ? 10.00 : 0;
    return basePrice + featuredPrice;
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      // Get all form data
      const formData = form.getValues();
      
      // Prepare pricing options
      const pricingOptions = {
        selectedPricingTier: selectedTier,
        featuredAddon: featuredAddon
      };

      console.log('Initiating salon payment with:', { pricingOptions, formData });

      // Use the Stripe hook to initiate payment
      const success = await initiatePayment(pricingOptions, formData);
      
      if (success && onPaymentComplete) {
        onPaymentComplete();
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {SALON_PRICING_PLANS.map((plan) => (
          <Card
            key={plan.id}
            className={`cursor-pointer transition-all ${
              selectedTier === plan.tier
                ? "ring-2 ring-purple-500 border-purple-500"
                : "hover:border-purple-300"
            }`}
            onClick={() => handlePlanSelect(plan.tier)}
          >
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                {plan.tier === 'premium' && <Star className="h-4 w-4 text-yellow-500" />}
                {plan.name}
              </CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="text-2xl font-bold text-purple-600">
                ${plan.price}
              </div>
              <div className="text-sm text-gray-500">
                {plan.duration} month{plan.duration > 1 ? 's' : ''}
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="h-3 w-3 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              {selectedTier === plan.tier && (
                <Badge className="w-full mt-3 justify-center">Selected</Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured Add-on */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-600" />
            Featured Listing Add-on
          </CardTitle>
          <CardDescription>
            Boost your listing to the top of search results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={featuredAddon}
                onCheckedChange={handleFeaturedToggle}
              />
              <label htmlFor="featured" className="text-sm font-medium">
                Add featured placement (+$10.00)
              </label>
            </div>
            <Badge variant="secondary">+$10.00</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Plan: {SALON_PRICING_PLANS.find(p => p.tier === selectedTier)?.name}</span>
              <span>${SALON_PRICING_PLANS.find(p => p.tier === selectedTier)?.price || 19.99}</span>
            </div>
            {featuredAddon && (
              <div className="flex justify-between">
                <span>Featured Add-on</span>
                <span>$10.00</span>
              </div>
            )}
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Button */}
      <Button
        onClick={handlePayment}
        disabled={isProcessing || !selectedTier}
        className="w-full h-12 text-lg"
        size="lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          `Pay $${calculateTotal().toFixed(2)} & Publish Listing`
        )}
      </Button>
    </div>
  );
};

export default SalonPaymentOptions;
