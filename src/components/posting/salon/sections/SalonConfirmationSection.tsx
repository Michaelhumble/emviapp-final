
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Sparkles, Shield, Clock } from "lucide-react";
import { EnhancedSalonFormValues } from "../enhancedSalonFormSchema";

interface SalonConfirmationSectionProps {
  form: UseFormReturn<EnhancedSalonFormValues>;
  isComplete: boolean;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const SalonConfirmationSection = ({ 
  form, 
  isComplete, 
  onSubmit, 
  isSubmitting 
}: SalonConfirmationSectionProps) => {
  const formData = form.getValues();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold font-serif mb-2">Almost Ready!</h2>
        <p className="text-gray-600">Review your listing and launch to thousands of qualified buyers</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-md rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-lg mb-3 flex items-center">
            <Sparkles className="h-5 w-5 text-purple-500 mr-2" />
            Salon Details
          </h3>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Name:</span> {formData.salonName}</p>
            <p><span className="font-medium">Type:</span> {formData.businessType}</p>
            <p><span className="font-medium">Location:</span> {formData.city}, {formData.state}</p>
            <p><span className="font-medium">Size:</span> {formData.salonSize}</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-lg mb-3 flex items-center">
            <Shield className="h-5 w-5 text-green-500 mr-2" />
            Pricing & Promotion
          </h3>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Asking Price:</span> {formData.hidePrice ? 'Hidden' : formData.askingPrice}</p>
            {formData.promotionUpgrades?.isUrgent && (
              <Badge className="bg-red-100 text-red-700">Urgent Sale</Badge>
            )}
            {formData.promotionUpgrades?.isFeatured && (
              <Badge className="bg-purple-100 text-purple-700">Featured</Badge>
            )}
            {formData.promotionUpgrades?.isDiamond && (
              <Badge className="bg-yellow-100 text-yellow-700">Diamond VIP</Badge>
            )}
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 text-center">
        <h3 className="font-semibold text-lg mb-4">Your Listing Includes:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Verified Business Profile</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Professional Photo Gallery</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Buyer Interest Tracking</span>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center space-y-4">
        <Button
          onClick={onSubmit}
          disabled={!isComplete || isSubmitting}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          size="lg"
        >
          {isSubmitting ? (
            <>
              <Clock className="mr-2 h-5 w-5 animate-spin" />
              Publishing Your Listing...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Publish My Salon Listing
            </>
          )}
        </Button>
        
        <p className="text-sm text-gray-500">
          By publishing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default SalonConfirmationSection;
