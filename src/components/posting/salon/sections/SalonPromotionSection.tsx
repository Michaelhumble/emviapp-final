
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Star, Crown, Clock, TrendingUp, Users } from "lucide-react";
import { EnhancedSalonFormValues } from "../enhancedSalonFormSchema";

interface SalonPromotionSectionProps {
  form: UseFormReturn<EnhancedSalonFormValues>;
  onPromotionChange: (upgrades: any) => void;
}

export const SalonPromotionSection = ({ form, onPromotionChange }: SalonPromotionSectionProps) => {
  const [selectedUpgrades, setSelectedUpgrades] = React.useState({
    isUrgent: false,
    isFeatured: false,
    isDiamond: false
  });

  const handleUpgradeToggle = (upgrade: keyof typeof selectedUpgrades) => {
    const newUpgrades = { ...selectedUpgrades, [upgrade]: !selectedUpgrades[upgrade] };
    setSelectedUpgrades(newUpgrades);
    
    // Update form with individual fields and combined object
    form.setValue("urgentSale", newUpgrades.isUrgent);
    form.setValue("featuredListing", newUpgrades.isFeatured);
    form.setValue("diamondListing", newUpgrades.isDiamond);
    
    onPromotionChange(newUpgrades);
  };

  const calculateTotal = () => {
    let total = 299; // Base premium listing
    if (selectedUpgrades.isUrgent) total += 99;
    if (selectedUpgrades.isFeatured) total += 199;
    if (selectedUpgrades.isDiamond) total += 499;
    return total;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Boost Your Salon's Visibility</h2>
        <p className="text-gray-600">Get more serious buyers and sell faster with premium promotion options</p>
      </div>

      {/* Upgrade Options */}
      <div className="space-y-6">
        {/* Urgent Sale */}
        <div className={`border-2 rounded-xl p-6 transition-all duration-300 cursor-pointer ${
          selectedUpgrades.isUrgent 
            ? 'border-red-500 bg-red-50 shadow-lg' 
            : 'border-red-200 bg-red-50/30 hover:border-red-300'
        }`}
        onClick={() => handleUpgradeToggle('isUrgent')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-full">
                <Zap className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  Urgent Sale Badge
                  <Badge className="bg-red-500 text-white">🔥 Hot</Badge>
                </h3>
                <p className="text-gray-600">Signals immediate availability, creates urgency</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-red-600">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    3x faster responses
                  </span>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    40% more views
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-red-600">+$99</div>
              <div className="text-sm text-gray-500">one-time</div>
            </div>
          </div>
        </div>

        {/* Featured Listing */}
        <div className={`border-2 rounded-xl p-6 transition-all duration-300 cursor-pointer ${
          selectedUpgrades.isFeatured 
            ? 'border-yellow-500 bg-yellow-50 shadow-lg' 
            : 'border-yellow-200 bg-yellow-50/30 hover:border-yellow-300'
        }`}
        onClick={() => handleUpgradeToggle('isFeatured')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  Featured Listing
                  <Badge className="bg-yellow-500 text-white">⭐ Popular</Badge>
                </h3>
                <p className="text-gray-600">Appears at the top of search results</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-yellow-600">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    5x more visibility
                  </span>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    60% more inquiries
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-yellow-600">+$199</div>
              <div className="text-sm text-gray-500">one-time</div>
            </div>
          </div>
        </div>

        {/* Diamond VIP */}
        <div className={`border-2 rounded-xl p-6 transition-all duration-300 cursor-pointer relative overflow-hidden ${
          selectedUpgrades.isDiamond 
            ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg' 
            : 'border-purple-200 bg-gradient-to-r from-purple-50/30 to-pink-50/30 hover:border-purple-300'
        }`}
        onClick={() => handleUpgradeToggle('isDiamond')}
        >
          {/* Premium Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400"></div>
          </div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
                <Crown className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  Diamond VIP Experience
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">💎 Elite</Badge>
                </h3>
                <p className="text-gray-600 mb-2">Premium placement + dedicated sales support</p>
                <div className="grid grid-cols-2 gap-2 text-sm text-purple-600">
                  <span>✨ Top search position</span>
                  <span>📞 Dedicated sales agent</span>
                  <span>🎯 Targeted buyer matching</span>
                  <span>📊 Advanced analytics</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">+$499</div>
              <div className="text-sm text-gray-500">one-time</div>
              <Badge className="mt-1 bg-green-100 text-green-700">Worth $1,200</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Total Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">Your Investment Summary</h3>
            <p className="text-gray-600">Premium features to maximize your salon's sale value</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">${calculateTotal()}</div>
            <div className="text-sm text-gray-500">total investment</div>
          </div>
        </div>
        
        {selectedUpgrades.isDiamond && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-700">
              <Crown className="h-5 w-5" />
              <span className="font-medium">Diamond VIP includes FREE featured listing ($199 value)</span>
            </div>
          </div>
        )}
      </div>

      {/* Success Stories */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6">
        <h4 className="font-semibold text-emerald-800 mb-3">🎉 Recent Success Stories</h4>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-emerald-700">"Nail Harmony Spa" - Los Angeles</span>
            <span className="font-medium">Sold in 8 days with Diamond VIP</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-emerald-700">"Luxury Hair Studio" - Miami</span>
            <span className="font-medium">3x asking price with Featured listing</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-emerald-700">"Beautiful Lashes" - New York</span>
            <span className="font-medium">Urgent Sale = 5 offers in 24 hours</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonPromotionSection;
