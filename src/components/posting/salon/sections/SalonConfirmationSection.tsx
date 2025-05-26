
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CheckCircle, Star, TrendingUp, Users, Clock, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { EnhancedSalonFormValues } from "../enhancedSalonFormSchema";

interface SalonConfirmationSectionProps {
  form: UseFormReturn<EnhancedSalonFormValues>;
  isComplete: boolean;
}

const SalonConfirmationSection = ({ form, isComplete }: SalonConfirmationSectionProps) => {
  const formData = form.getValues();

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-8"
      >
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="space-y-6"
        >
          <div className="h-32 w-32 mx-auto rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
            <CheckCircle className="h-16 w-16 text-white" />
          </div>
          
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">🎉 Congratulations!</h1>
            <p className="text-xl text-gray-600">Your salon listing is now live and attracting potential buyers</p>
          </div>
        </motion.div>

        {/* Success Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <h3 className="font-bold text-2xl text-blue-700">24hrs</h3>
            <p className="text-blue-600">Average time to first inquiry</p>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <Users className="h-8 w-8 text-purple-500 mx-auto mb-3" />
            <h3 className="font-bold text-2xl text-purple-700">1,247</h3>
            <p className="text-purple-600">Active buyers this month</p>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <Clock className="h-8 w-8 text-green-500 mx-auto mb-3" />
            <h3 className="font-bold text-2xl text-green-700">28 days</h3>
            <p className="text-green-600">Average time to sale</p>
          </Card>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6"
        >
          <h3 className="font-bold text-amber-800 text-lg mb-4">🚀 What happens next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-amber-700 mb-2">Immediate Actions:</h4>
              <ul className="text-amber-600 space-y-1">
                <li>• Your listing is now visible to buyers</li>
                <li>• Email notifications are active</li>
                <li>• Buyer inquiries will start coming in</li>
                <li>• Your listing appears in search results</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-amber-700 mb-2">Success Tips:</h4>
              <ul className="text-amber-600 space-y-1">
                <li>• Respond to inquiries within 2 hours</li>
                <li>• Be prepared for salon viewings</li>
                <li>• Have financial documents ready</li>
                <li>• Consider professional photos if needed</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Final Review Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h2 className="text-3xl font-bold text-gray-900">🎯 Ready to Launch!</h2>
        <p className="text-xl text-gray-600">Review your listing details and launch your salon sale</p>
      </motion.div>

      {/* Listing Preview */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <Star className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-xl text-purple-800">Your Listing Preview</h3>
            <p className="text-purple-600">How buyers will see your salon</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="bg-white/70 rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Salon Details</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Name:</span> {formData.salonName || "Not specified"}</p>
                <p><span className="font-medium">Type:</span> {formData.businessType || "Not specified"}</p>
                <p><span className="font-medium">Size:</span> {formData.salonSize || "Not specified"}</p>
                <p><span className="font-medium">Location:</span> {formData.city || "Not specified"}, {formData.state || "Not specified"}</p>
              </div>
            </div>

            <div className="bg-white/70 rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Pricing</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Asking Price:</span> {formData.hidePrice ? "Contact for Price" : `$${formData.askingPrice || "Not specified"}`}</p>
                {formData.revenue && formData.showRevenue && (
                  <p><span className="font-medium">Monthly Revenue:</span> ${formData.revenue}</p>
                )}
              </div>
            </div>
          </div>

          {/* Promotions & Features */}
          <div className="space-y-4">
            <div className="bg-white/70 rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Active Promotions</h4>
              <div className="flex flex-wrap gap-2">
                {formData.urgentSale && (
                  <Badge className="bg-amber-500 text-white">⚡ Urgent Sale</Badge>
                )}
                {formData.featuredListing && (
                  <Badge className="bg-blue-500 text-white">⭐ Featured</Badge>
                )}
                {formData.diamondListing && (
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">👑 Diamond VIP</Badge>
                )}
                {!formData.urgentSale && !formData.featuredListing && !formData.diamondListing && (
                  <Badge variant="secondary">Standard Listing</Badge>
                )}
              </div>
            </div>

            <div className="bg-white/70 rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Privacy Settings</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Contact:</span> {formData.messagingOnly ? "In-app messaging only" : "Direct contact allowed"}</p>
                <p><span className="font-medium">Address:</span> {formData.hideAddress ? "Hidden until interest" : "City/neighborhood visible"}</p>
                <p><span className="font-medium">NDA:</span> {formData.requireNDA ? "Required for details" : "Not required"}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Launch Confidence Boosters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 text-center">
          <div className="h-16 w-16 mx-auto rounded-full bg-green-500 flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h4 className="font-bold text-green-800 mb-2">Instant Visibility</h4>
          <p className="text-green-600 text-sm">Your salon will appear in search results immediately after publishing</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 text-center">
          <div className="h-16 w-16 mx-auto rounded-full bg-blue-500 flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h4 className="font-bold text-blue-800 mb-2">Qualified Buyers</h4>
          <p className="text-blue-600 text-sm">Our platform pre-screens buyers to ensure serious inquiries only</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 text-center">
          <div className="h-16 w-16 mx-auto rounded-full bg-purple-500 flex items-center justify-center mb-4">
            <Crown className="h-8 w-8 text-white" />
          </div>
          <h4 className="font-bold text-purple-800 mb-2">Premium Support</h4>
          <p className="text-purple-600 text-sm">Our team will help you throughout the entire selling process</p>
        </Card>
      </motion.div>

      {/* Final CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-8 text-center"
      >
        <h3 className="text-2xl font-bold mb-4">🚀 Ready to Find Your Perfect Buyer?</h3>
        <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
          Your salon listing is complete and optimized for maximum visibility. 
          Click below to make it live and start connecting with qualified buyers today!
        </p>
        <div className="flex items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>30-day money-back guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            <span>Average 5-star seller experience</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SalonConfirmationSection;
