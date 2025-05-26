
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Zap, Star, Diamond, Clock, TrendingUp, Users } from "lucide-react";
import { EnhancedSalonFormValues } from "../enhancedSalonFormSchema";

interface SalonPromotionSectionProps {
  form: UseFormReturn<EnhancedSalonFormValues>;
  onPromotionChange: (upgrades: any) => void;
}

const SalonPromotionSection = ({ form, onPromotionChange }: SalonPromotionSectionProps) => {
  const promotionUpgrades = form.watch("promotionUpgrades") || {
    isUrgent: false,
    isFeatured: false,
    isDiamond: false
  };

  const handleUpgradeChange = (upgrade: string, checked: boolean) => {
    const newUpgrades = {
      ...promotionUpgrades,
      [upgrade]: checked
    };
    
    form.setValue("promotionUpgrades", newUpgrades);
    onPromotionChange(newUpgrades);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-serif mb-4">Supercharge Your Listing</h2>
        <p className="text-lg text-gray-600">Get 5x more buyer views with premium promotion options</p>
      </div>

      {/* FOMO Banner */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Clock className="h-5 w-5 text-red-500" />
          <span className="font-semibold text-red-700">Limited Time: 50% Off All Promotions</span>
        </div>
        <p className="text-sm text-red-600">Only 12 Diamond VIP spots left this month</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Urgent Sale */}
        <Card className={`relative overflow-hidden transition-all duration-300 ${
          promotionUpgrades.isUrgent ? 'ring-2 ring-red-500 shadow-lg scale-105' : 'hover:shadow-md'
        }`}>
          <CardHeader className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Urgent Sale
            </CardTitle>
            <div className="text-right">
              <span className="text-2xl font-bold">$29</span>
              <span className="text-sm line-through opacity-75 ml-2">$59</span>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="space-y-2 text-sm mb-4">
              <li>• Red "URGENT" badge</li>
              <li>• 2x more clicks</li>
              <li>• Priority in search</li>
              <li>• Express buyer matching</li>
            </ul>
            
            <FormField
              control={form.control}
              name="promotionUpgrades.isUrgent"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Add Urgent Sale</span>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          handleUpgradeChange('isUrgent', checked);
                        }}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Featured Listing */}
        <Card className={`relative overflow-hidden transition-all duration-300 ${
          promotionUpgrades.isFeatured ? 'ring-2 ring-purple-500 shadow-lg scale-105' : 'hover:shadow-md'
        }`}>
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Featured Listing
            </CardTitle>
            <div className="text-right">
              <span className="text-2xl font-bold">$99</span>
              <span className="text-sm line-through opacity-75 ml-2">$199</span>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <Badge className="bg-purple-100 text-purple-700 mb-3">Most Popular</Badge>
            <ul className="space-y-2 text-sm mb-4">
              <li>• Top of search results</li>
              <li>• 4x more visibility</li>
              <li>• Premium badge display</li>
              <li>• Featured in newsletters</li>
              <li>• Social media promotion</li>
            </ul>
            
            <FormField
              control={form.control}
              name="promotionUpgrades.isFeatured"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Add Featured</span>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          handleUpgradeChange('isFeatured', checked);
                        }}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Diamond VIP */}
        <Card className={`relative overflow-hidden transition-all duration-300 ${
          promotionUpgrades.isDiamond ? 'ring-2 ring-yellow-500 shadow-lg scale-105' : 'hover:shadow-md'
        }`}>
          <CardHeader className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white">
            <CardTitle className="flex items-center gap-2">
              <Diamond className="h-5 w-5" />
              Diamond VIP
            </CardTitle>
            <div className="text-right">
              <span className="text-2xl font-bold">$299</span>
              <span className="text-sm line-through opacity-75 ml-2">$599</span>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <Badge className="bg-yellow-100 text-yellow-700 mb-3">Exclusive</Badge>
            <ul className="space-y-2 text-sm mb-4">
              <li>• Guaranteed top position</li>
              <li>• 10x more buyer inquiries</li>
              <li>• Personal sales consultant</li>
              <li>• Professional photos included</li>
              <li>• Premium marketing package</li>
              <li>• VIP buyer network access</li>
            </ul>
            
            <FormField
              control={form.control}
              name="promotionUpgrades.isDiamond"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Add Diamond VIP</span>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          handleUpgradeChange('isDiamond', checked);
                        }}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </div>

      {/* Social Proof */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
        <div className="flex items-center justify-center gap-6 text-center">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <div>
              <div className="font-semibold text-green-800">847% More Views</div>
              <div className="text-sm text-green-600">with Featured listings</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-green-600" />
            <div>
              <div className="font-semibold text-green-800">23 Salons Sold</div>
              <div className="text-sm text-green-600">this week with promotions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonPromotionSection;
