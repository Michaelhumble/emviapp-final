
import React, { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Star, Crown, Eye, Users, Clock, TrendingUp } from "lucide-react";
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

  useEffect(() => {
    onPromotionChange({
      isUrgent: urgentSale,
      isFeatured: featuredListing,
      isDiamond: diamondListing
    });
  }, [urgentSale, featuredListing, diamondListing, onPromotionChange]);

  const getPrice = (base: number, discount: boolean = false) => {
    return discount ? Math.round(base * 0.7) : base;
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Crown className="h-8 w-8 text-purple-600" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Boost Your Listing
          </h2>
          <Crown className="h-8 w-8 text-purple-600" />
        </div>
        <p className="text-xl text-gray-600">
          Get more views, faster offers, and higher sale prices
        </p>
        
        {/* FOMO Banner */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full px-6 py-2 inline-block">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Clock className="h-4 w-4" />
            <span>Limited Time: 30% off all upgrades this week!</span>
          </div>
        </div>
      </div>

      {/* Promotion Options */}
      <div className="space-y-6">
        {/* Urgent Sale */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className={`transition-all duration-300 ${
            urgentSale 
              ? "border-2 border-amber-400 bg-gradient-to-r from-amber-50 to-orange-50 shadow-lg" 
              : "border border-gray-200 hover:border-amber-300 hover:shadow-md"
          }`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    {urgentSale && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-gray-900">Urgent Sale Badge</h3>
                      <Badge className="bg-amber-500 text-white">
                        <Zap className="h-3 w-3 mr-1" />
                        Fast Track
                      </Badge>
                    </div>
                    <p className="text-gray-600">
                      Show "URGENT SALE" badge • Top of search results • 3x more visibility
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>+200% views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>Sell 40% faster</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right space-y-2">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500 line-through">${getPrice(99)}</div>
                    <div className="text-2xl font-bold text-amber-600">${getPrice(99, true)}</div>
                    <div className="text-xs text-green-600 font-medium">30% OFF</div>
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
                            className="data-[state=checked]:bg-amber-500"
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
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className={`transition-all duration-300 ${
            featuredListing 
              ? "border-2 border-purple-400 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg" 
              : "border border-gray-200 hover:border-purple-300 hover:shadow-md"
          }`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Star className="h-6 w-6 text-white fill-current" />
                    </div>
                    {featuredListing && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-gray-900">Featured Listing</h3>
                      <Badge className="bg-purple-500 text-white">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        Premium
                      </Badge>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
                        Most Popular
                      </Badge>
                    </div>
                    <p className="text-gray-600">
                      Golden border • Homepage showcase • Featured in emails • Priority placement
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>+500% engagement</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>Premium buyers</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right space-y-2">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500 line-through">${getPrice(199)}</div>
                    <div className="text-2xl font-bold text-purple-600">${getPrice(199, true)}</div>
                    <div className="text-xs text-green-600 font-medium">30% OFF</div>
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
                            className="data-[state=checked]:bg-purple-500"
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

        {/* Diamond Listing */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className={`transition-all duration-300 ${
            diamondListing 
              ? "border-2 border-blue-400 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg" 
              : "border border-gray-200 hover:border-blue-300 hover:shadow-md"
          }`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                      <Crown className="h-6 w-6 text-white" />
                    </div>
                    {diamondListing && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-gray-900">Diamond Confidential</h3>
                      <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                        <Crown className="h-3 w-3 mr-1" />
                        Ultra Exclusive
                      </Badge>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">
                        Only 3 spots left
                      </Badge>
                    </div>
                    <p className="text-gray-600">
                      Private listing • Pre-qualified buyers only • Personal concierge • NDA protection
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Crown className="h-4 w-4" />
                        <span>VIP treatment</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>Highest sale prices</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right space-y-2">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500 line-through">${getPrice(499)}</div>
                    <div className="text-2xl font-bold text-blue-600">${getPrice(499, true)}</div>
                    <div className="text-xs text-green-600 font-medium">30% OFF</div>
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
                            className="data-[state=checked]:bg-blue-600"
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
      </div>

      {/* Social Proof & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-700 mb-1">94%</div>
            <div className="text-sm text-green-600">Featured listings sell</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-700 mb-1">45 Days</div>
            <div className="text-sm text-blue-600">Average sale time</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-700 mb-1">$50M+</div>
            <div className="text-sm text-purple-600">In successful sales</div>
          </CardContent>
        </Card>
      </div>

      {/* Success Story */}
      <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Star className="h-5 w-5 text-amber-600 fill-current" />
              <h4 className="font-semibold text-amber-900">Success Story</h4>
              <Star className="h-5 w-5 text-amber-600 fill-current" />
            </div>
            <p className="text-amber-800 italic">
              "I went with the Diamond package and got 8 serious offers in 3 weeks. 
              Sold for $15K above asking price!" - Jennifer L., Miami
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonPromotionSection;
