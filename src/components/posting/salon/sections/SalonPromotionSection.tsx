
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Zap, Star, Crown, TrendingUp, Eye, Clock, Target } from "lucide-react";
import { motion } from "framer-motion";
import { EnhancedSalonFormValues } from "../enhancedSalonFormSchema";

interface SalonPromotionSectionProps {
  form: UseFormReturn<EnhancedSalonFormValues>;
  onPromotionChange: (upgrades: any) => void;
}

const SalonPromotionSection = ({ form, onPromotionChange }: SalonPromotionSectionProps) => {
  const urgentSale = form.watch("urgentSale");
  const featuredListing = form.watch("featuredListing");
  const diamondListing = form.watch("diamondListing");

  React.useEffect(() => {
    onPromotionChange({
      isUrgent: urgentSale,
      isFeatured: featuredListing,
      isDiamond: diamondListing
    });
  }, [urgentSale, featuredListing, diamondListing, onPromotionChange]);

  return (
    <div className="space-y-8">
      {/* FOMO Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h2 className="text-3xl font-bold text-gray-900">🚀 Accelerate Your Sale</h2>
        <p className="text-xl text-gray-600">Get maximum visibility and sell faster with our premium promotion options</p>
        
        <div className="flex items-center justify-center gap-8 text-sm">
          <div className="flex items-center gap-2 text-green-600">
            <TrendingUp className="h-4 w-4" />
            <span>3x More Views</span>
          </div>
          <div className="flex items-center gap-2 text-blue-600">
            <Eye className="h-4 w-4" />
            <span>5x More Inquiries</span>
          </div>
          <div className="flex items-center gap-2 text-purple-600">
            <Target className="h-4 w-4" />
            <span>Sell 73% Faster</span>
          </div>
        </div>
      </motion.div>

      {/* Promotion Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Urgent Sale */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card className={`p-6 cursor-pointer transition-all border-2 ${
            urgentSale 
              ? 'border-amber-400 bg-amber-50 shadow-lg' 
              : 'border-gray-200 hover:border-amber-300'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Urgent Sale</h3>
                  <p className="text-sm text-gray-600">Priority placement</p>
                </div>
              </div>
              <FormField
                control={form.control}
                name="urgentSale"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-3">
              <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                <Clock className="h-3 w-3 mr-1" />
                Shows at Top
              </Badge>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Displayed above all regular listings</li>
                <li>• "URGENT" badge for immediate attention</li>
                <li>• 2x more buyer views guaranteed</li>
                <li>• Perfect for quick sales</li>
              </ul>
              <div className="pt-2 border-t">
                <span className="text-2xl font-bold text-amber-600">+$15</span>
                <span className="text-sm text-gray-500 ml-2">one-time</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Featured Listing */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card className={`p-6 cursor-pointer transition-all border-2 relative ${
            featuredListing 
              ? 'border-blue-400 bg-blue-50 shadow-lg' 
              : 'border-gray-200 hover:border-blue-300'
          }`}>
            {featuredListing && (
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-xs font-medium">
                SELECTED
              </div>
            )}
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Featured Listing</h3>
                  <p className="text-sm text-gray-600">Premium visibility</p>
                </div>
              </div>
              <FormField
                control={form.control}
                name="featuredListing"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  <Star className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                  Most Popular
                </Badge>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Highlighted with premium border</li>
                <li>• Featured section placement</li>
                <li>• 3x more buyer engagement</li>
                <li>• Enhanced listing appearance</li>
                <li>• Priority in search results</li>
              </ul>
              <div className="pt-2 border-t">
                <span className="text-2xl font-bold text-blue-600">+$25</span>
                <span className="text-sm text-gray-500 ml-2">one-time</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Diamond Listing */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card className={`p-6 cursor-pointer transition-all border-2 relative ${
            diamondListing 
              ? 'border-purple-400 bg-gradient-to-br from-purple-50 to-pink-50 shadow-xl' 
              : 'border-gray-200 hover:border-purple-300'
          }`}>
            <div className="absolute top-2 right-2">
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                EXCLUSIVE
              </Badge>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Crown className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Diamond VIP</h3>
                  <p className="text-sm text-gray-600">Ultimate exposure</p>
                </div>
              </div>
              <FormField
                control={form.control}
                name="diamondListing"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex gap-2">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <Crown className="h-3 w-3 mr-1" />
                  VIP
                </Badge>
                <Badge variant="secondary" className="bg-red-100 text-red-700">
                  Only 3 spots left!
                </Badge>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Top banner placement</li>
                <li>• Premium gradient styling</li>
                <li>• Personal buyer concierge</li>
                <li>• 5x more qualified leads</li>
                <li>• Social media promotion</li>
                <li>• Weekly performance reports</li>
              </ul>
              <div className="pt-2 border-t">
                <span className="text-2xl font-bold text-purple-600">+$49</span>
                <span className="text-sm text-gray-500 ml-2">one-time</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Selected Promotions Summary */}
      {(urgentSale || featuredListing || diamondListing) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6"
        >
          <h4 className="font-bold text-green-800 text-lg mb-4">🎉 Your Promotion Package</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-green-700 mb-3">Selected Upgrades:</h5>
              <div className="space-y-2">
                {urgentSale && (
                  <div className="flex items-center justify-between bg-white/70 rounded-lg p-3">
                    <span className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-amber-500" />
                      <span className="font-medium">Urgent Sale</span>
                    </span>
                    <span className="font-bold text-amber-600">+$15</span>
                  </div>
                )}
                {featuredListing && (
                  <div className="flex items-center justify-between bg-white/70 rounded-lg p-3">
                    <span className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">Featured Listing</span>
                    </span>
                    <span className="font-bold text-blue-600">+$25</span>
                  </div>
                )}
                {diamondListing && (
                  <div className="flex items-center justify-between bg-white/70 rounded-lg p-3">
                    <span className="flex items-center gap-2">
                      <Crown className="h-4 w-4 text-purple-500" />
                      <span className="font-medium">Diamond VIP</span>
                    </span>
                    <span className="font-bold text-purple-600">+$49</span>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold text-green-700 mb-3">Expected Results:</h5>
              <ul className="text-green-600 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>
                    {diamondListing ? '10x' : featuredListing ? '5x' : urgentSale ? '3x' : '2x'} more buyer views
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>
                    Sell {diamondListing ? '85%' : featuredListing ? '73%' : '45%'} faster than basic listings
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  <span>Higher quality, more serious buyer inquiries</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {/* Success Stories */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6"
      >
        <h4 className="font-semibold text-blue-800 mb-4">✨ Success Stories</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="bg-white/70 rounded-xl p-4">
            <p className="text-blue-700 italic leading-relaxed">
              "I used the Featured Listing option and had 8 serious inquiries within the first week. 
              Sold for full asking price in just 18 days!"
            </p>
            <p className="text-blue-600 font-medium mt-2">- Maria S., Nail Salon Owner</p>
          </div>
          <div className="bg-white/70 rounded-xl p-4">
            <p className="text-blue-700 italic leading-relaxed">
              "Diamond VIP was worth every penny. The personal concierge found me the perfect buyer 
              who appreciated my team and paid 15% above asking!"
            </p>
            <p className="text-blue-600 font-medium mt-2">- James L., Hair & Beauty Studio</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SalonPromotionSection;
