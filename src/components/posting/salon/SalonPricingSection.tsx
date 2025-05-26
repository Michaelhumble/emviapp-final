
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Star, TrendingUp, Shield, Users, Clock } from "lucide-react";
import { SalonFormValues } from "./salonFormSchema";
import { SalonPricingOptions, calculateSalonPostPrice, getSalonPostPricingSummary } from "@/utils/posting/salonPricing";
import { formatCurrency } from "@/lib/utils";

interface SalonPricingSectionProps {
  formData: Partial<SalonFormValues>;
  photoUploads: File[];
  pricingOptions: SalonPricingOptions;
  setPricingOptions: React.Dispatch<React.SetStateAction<SalonPricingOptions>>;
  onSubmit: () => void;
}

export const SalonPricingSection = ({
  formData,
  photoUploads,
  pricingOptions,
  setPricingOptions,
  onSubmit,
}: SalonPricingSectionProps) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const pricingSummary = getSalonPostPricingSummary(pricingOptions);

  const handleDurationChange = (months: number) => {
    setPricingOptions(prev => ({ ...prev, durationMonths: months }));
  };

  const handleFeaturedBoostToggle = (checked: boolean) => {
    setPricingOptions(prev => ({ ...prev, featuredBoost: checked }));
  };

  const handleAutoRenewToggle = (checked: boolean) => {
    setPricingOptions(prev => ({ ...prev, autoRenew: checked }));
  };

  const canSubmit = termsAccepted && formData.salonName && formData.businessType;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-2">
          Sell Your Salon, Stress-Free
        </h2>
        <p className="text-lg text-gray-600">
          <em>No commissions. No contracts. Just peace of mind and real buyers.</em>
        </p>
      </div>

      {/* Listing Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Your Salon Listing Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-lg">{formData.salonName || "Your Salon"}</h3>
              <p className="text-gray-600">{formData.businessType}</p>
              <p className="text-gray-600">{formData.city}, {formData.state}</p>
              {formData.askingPrice && (
                <p className="text-lg font-bold text-green-600">{formData.askingPrice}</p>
              )}
            </div>
            <div className="text-sm text-gray-500">
              <p>Photos uploaded: {photoUploads.length}</p>
              <p>Description: {formData.englishDescription ? "✓ Complete" : "Not provided"}</p>
              <p>Vietnamese description: {formData.vietnameseDescription ? "✓ Complete" : "Not provided"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Plans */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-center">Choose Your Listing Plan</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1 Month Plan */}
          <Card 
            className={`cursor-pointer transition-all ${
              pricingOptions.durationMonths === 1 ? "ring-2 ring-purple-500" : ""
            }`}
            onClick={() => handleDurationChange(1)}
          >
            <CardHeader className="text-center">
              <CardTitle>1 Month</CardTitle>
              <div className="text-2xl font-bold">$24.99/mo</div>
              <p className="text-sm text-gray-600">Live instantly, cancel anytime</p>
            </CardHeader>
          </Card>

          {/* 6 Month Plan */}
          <Card 
            className={`cursor-pointer transition-all ${
              pricingOptions.durationMonths === 6 ? "ring-2 ring-purple-500" : ""
            }`}
            onClick={() => handleDurationChange(6)}
          >
            <CardHeader className="text-center">
              <CardTitle>6 Months</CardTitle>
              <div className="text-2xl font-bold">$120</div>
              <Badge variant="secondary" className="mx-auto">Save 20%</Badge>
              <p className="text-sm text-gray-600">Best for most sellers</p>
            </CardHeader>
          </Card>

          {/* 12 Month Plan */}
          <Card 
            className={`cursor-pointer transition-all ${
              pricingOptions.durationMonths === 12 ? "ring-2 ring-purple-500" : ""
            }`}
            onClick={() => handleDurationChange(12)}
          >
            <CardHeader className="text-center">
              <CardTitle>12 Months</CardTitle>
              <div className="text-2xl font-bold">$250</div>
              <Badge className="mx-auto">Best Value</Badge>
              <p className="text-sm text-gray-600">Patient sellers</p>
            </CardHeader>
          </Card>
        </div>

        {/* Featured Boost Option */}
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="featured-boost"
                checked={pricingOptions.featuredBoost}
                onCheckedChange={handleFeaturedBoostToggle}
              />
              <div className="flex-1">
                <label htmlFor="featured-boost" className="flex items-center gap-2 font-medium cursor-pointer">
                  <Star className="w-5 h-5 text-orange-500" />
                  Featured Boost (+$25)
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Need extra visibility?</strong> Upgrade to a Featured Listing for just $25 more — available on any plan.
                </p>
                <div className="mt-2 text-sm text-orange-700">
                  ✓ Appear at the top of search results<br />
                  ✓ 2x more buyer views<br />
                  ✓ Priority in our buyer newsletter
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Auto-renew Option */}
        <div className="flex items-start space-x-3">
          <Checkbox
            id="auto-renew"
            checked={pricingOptions.autoRenew}
            onCheckedChange={handleAutoRenewToggle}
          />
          <div>
            <label htmlFor="auto-renew" className="font-medium cursor-pointer">
              Auto-renew (Save 5% extra)
            </label>
            <p className="text-sm text-gray-600">
              Automatically renew your listing to keep it active. Cancel anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <blockquote className="text-center">
            <p className="italic text-blue-800">
              "I listed and sold my salon in 3 weeks. The process was safe and easy."
            </p>
            <footer className="mt-2 text-sm text-blue-600">— Mai, San Jose</footer>
          </blockquote>
        </CardContent>
      </Card>

      {/* Why Choose EmviApp */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            Why Choose EmviApp
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium">No agent commissions</p>
                <p className="text-sm text-gray-600">Keep all your sale proceeds!</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium">Verified buyers only</p>
                <p className="text-sm text-gray-600">No spam, no time wasters</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium">List in 2 minutes</p>
                <p className="text-sm text-gray-600">Pause/cancel anytime</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium">Optional featured boost</p>
                <p className="text-sm text-gray-600">Reach 2x more buyers instantly</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle>How does this compare?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>• Salon agents typically charge <strong>10% of your sale price</strong> ($10,000 on a $100k sale)</p>
            <p>• With EmviApp: Just ${pricingOptions.durationMonths === 1 ? '24.99/month' : pricingSummary.finalPrice}, no hidden fees, and you stay in control</p>
            <p className="text-green-700 font-medium">• <strong>No brainer:</strong> Save thousands, sell with confidence!</p>
          </div>
        </CardContent>
      </Card>

      {/* Price Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span>Base listing ({pricingOptions.durationMonths} month{pricingOptions.durationMonths > 1 ? 's' : ''})</span>
            <span>{formatCurrency(pricingSummary.originalPrice)}</span>
          </div>
          
          {pricingOptions.featuredBoost && (
            <div className="flex justify-between">
              <span>Featured boost</span>
              <span>+{formatCurrency(25)}</span>
            </div>
          )}
          
          {pricingSummary.discountAmount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Savings ({pricingSummary.discountPercentage}% off)</span>
              <span>-{formatCurrency(pricingSummary.discountAmount)}</span>
            </div>
          )}
          
          <Separator />
          
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{formatCurrency(pricingSummary.finalPrice)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Submit */}
      <div className="space-y-6">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="terms"
            checked={termsAccepted}
            onCheckedChange={setTermsAccepted}
          />
          <label htmlFor="terms" className="text-sm cursor-pointer">
            I agree to the <a href="#" className="text-purple-600 hover:underline">Terms of Service</a> and 
            <a href="#" className="text-purple-600 hover:underline"> Privacy Policy</a>. 
            I confirm that I am the authorized owner of this salon and have the right to sell it.
          </label>
        </div>

        <div className="text-center">
          <Button
            onClick={onSubmit}
            disabled={!canSubmit}
            size="lg"
            className="w-full md:w-auto px-12 py-3 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {pricingOptions.featuredBoost ? "Feature My Listing & Sell Faster" : "Get Started & List My Salon"}
          </Button>
          
          <p className="mt-3 text-sm text-gray-500">
            <em>Most salons sell within 1–2 months. Pause or cancel your listing anytime — no risk, no stress.</em>
          </p>
          <p className="text-sm text-gray-500">
            <em>Featured listings appear at the top and get sent to our private buyers list.</em>
          </p>
          <p className="text-sm text-gray-500">
            <em>We never share your exact address or personal details without your approval.</em>
          </p>
        </div>

        <div className="text-center text-sm text-gray-600">
          <p>Need help or have questions?</p>
          <a href="#" className="text-purple-600 hover:underline">Contact our team</a> — We're here for you every step of the way.
        </div>
      </div>
    </div>
  );
};
