
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Crown, Zap, Star, TrendingUp, Eye, Users, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { EnhancedSalonFormValues } from "../enhancedSalonFormSchema";

interface SalonPromotionSectionProps {
  form: UseFormReturn<EnhancedSalonFormValues>;
  onPromotionChange?: (upgrades: any) => void;
  promotionUpgrades?: any;
}

const SalonPromotionSection = ({ form, onPromotionChange, promotionUpgrades }: SalonPromotionSectionProps) => {
  const urgentSale = form.watch("urgentSale");
  const featuredListing = form.watch("featuredListing");
  const diamondListing = form.watch("diamondListing");

  const handleUpgradeChange = (type: string, value: boolean) => {
    const updatedUpgrades = {
      ...promotionUpgrades,
      [type]: value
    };
    
    if (onPromotionChange) {
      onPromotionChange(updatedUpgrades);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif font-bold mb-2">Maximize Your Salon's Visibility</h2>
        <p className="text-gray-600">Choose promotion options to reach more qualified buyers</p>
      </div>

      {/* Urgent Sale */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-orange-500 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-orange-800">Urgent Sale Badge</h3>
                  <p className="text-orange-700">Attract immediate attention with "Must Sell Soon" badge</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-orange-600">
                    <span className="flex items-center gap-1"><TrendingUp className="h-4 w-4" /> 3x more views</span>
                    <span className="flex items-center gap-1"><Eye className="h-4 w-4" /> Priority placement</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">$49</div>
                <FormField
                  control={form.control}
                  name="urgentSale"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(value) => {
                            field.onChange(value);
                            handleUpgradeChange('isUrgent', value);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Featured Listing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-purple-500 flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-purple-800">Featured Listing</h3>
                  <p className="text-purple-700">Premium placement in top search results</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-purple-600">
                    <span className="flex items-center gap-1"><Star className="h-4 w-4" /> Top 3 placement</span>
                    <span className="flex items-center gap-1"><Users className="h-4 w-4" /> 5x more inquiries</span>
                  </div>
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                      Only 8 Featured spots remaining
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">$199</div>
                <FormField
                  control={form.control}
                  name="featuredListing"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(value) => {
                            field.onChange(value);
                            handleUpgradeChange('isFeatured', value);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Diamond Confidential */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border-2 border-gradient-to-r from-yellow-400 to-yellow-600 bg-gradient-to-r from-yellow-50 via-amber-50 to-yellow-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-amber-400/10"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center shadow-lg">
                  <Crown className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-semibold text-amber-800">Diamond Confidential</h3>
                    <span className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-amber-400 text-yellow-900 text-xs rounded-full font-medium">
                      ULTRA EXCLUSIVE
                    </span>
                  </div>
                  <p className="text-amber-700">Maximum privacy + VIP buyer verification</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-amber-600">
                    <span className="flex items-center gap-1"><Shield className="h-4 w-4" /> Complete anonymity</span>
                    <span className="flex items-center gap-1"><Users className="h-4 w-4" /> Verified buyers only</span>
                  </div>
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full animate-pulse">
                      Only 2 Diamond spots left
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600 mb-1">$499</div>
                <FormField
                  control={form.control}
                  name="diamondListing"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(value) => {
                            field.onChange(value);
                            handleUpgradeChange('isDiamond', value);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {diamondListing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 p-4 bg-amber-100 rounded-lg"
              >
                <h4 className="font-semibold text-amber-800 mb-2">Diamond Benefits Include:</h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• Salon details hidden until buyer verification</li>
                  <li>• Exclusive access to high-net-worth buyer network</li>
                  <li>• Personal concierge support</li>
                  <li>• NDA protection for all inquiries</li>
                  <li>• Priority response to all messages</li>
                </ul>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Summary */}
      {(urgentSale || featuredListing || diamondListing) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-50 border border-gray-200 rounded-xl p-6"
        >
          <h3 className="font-semibold mb-4">Your Promotion Summary</h3>
          <div className="space-y-2 text-sm">
            {urgentSale && <div className="flex justify-between"><span>Urgent Sale Badge</span><span>$49</span></div>}
            {featuredListing && <div className="flex justify-between"><span>Featured Listing</span><span>$199</span></div>}
            {diamondListing && <div className="flex justify-between"><span>Diamond Confidential</span><span>$499</span></div>}
            <div className="border-t pt-2 font-semibold flex justify-between">
              <span>Total Promotion Cost:</span>
              <span>${(urgentSale ? 49 : 0) + (featuredListing ? 199 : 0) + (diamondListing ? 499 : 0)}</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SalonPromotionSection;
