
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Users, Calendar, Eye, EyeOff, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { EnhancedSalonFormValues } from "../enhancedSalonFormSchema";

interface SalonPerformanceSectionProps {
  form: UseFormReturn<EnhancedSalonFormValues>;
}

const SalonPerformanceSection = ({ form }: SalonPerformanceSectionProps) => {
  const showRevenue = form.watch("showRevenue");
  const showProfit = form.watch("showProfit");
  const showClients = form.watch("showClients");
  const hidePrice = form.watch("hidePrice");

  return (
    <div className="space-y-8">
      {/* Privacy Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6"
      >
        <div className="flex items-center gap-3 mb-3">
          <Lock className="h-6 w-6 text-blue-500" />
          <h3 className="font-bold text-blue-800 text-lg">Your Financial Privacy is Protected</h3>
        </div>
        <p className="text-blue-700 leading-relaxed">
          Control exactly what you share. Only serious, verified buyers will see detailed financials. 
          You can hide specific numbers until buyers express genuine interest.
        </p>
      </motion.div>

      {/* Revenue Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-green-500" />
            <div>
              <h3 className="text-xl font-semibold">Revenue Performance</h3>
              <p className="text-gray-600">Show buyers your salon's financial strength</p>
            </div>
          </div>
          <FormField
            control={form.control}
            name="showRevenue"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    {field.value ? "Visible" : "Hidden"}
                  </span>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  {field.value ? (
                    <Eye className="h-4 w-4 text-green-500" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </FormItem>
            )}
          />
        </div>

        {showRevenue && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <FormField
              control={form.control}
              name="revenue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Monthly Revenue</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="15,000"
                        className="h-12 pl-10 border-2 focus:border-green-500"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Monthly Profit</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="8,500"
                        className="h-12 pl-10 border-2 focus:border-green-500"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        )}
      </div>

      {/* Client Base Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-purple-500" />
            <div>
              <h3 className="text-xl font-semibold">Client Base</h3>
              <p className="text-gray-600">Demonstrate your established customer relationships</p>
            </div>
          </div>
          <FormField
            control={form.control}
            name="showClients"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    {field.value ? "Visible" : "Hidden"}
                  </span>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  {field.value ? (
                    <Eye className="h-4 w-4 text-green-500" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </FormItem>
            )}
          />
        </div>

        {showClients && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="monthlyClients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Monthly Active Clients</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="450"
                        className="h-12 pl-10 border-2 focus:border-purple-500"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <p className="text-sm text-purple-600">💡 Higher client count = more attractive to buyers</p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        )}
      </div>

      {/* Business History */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Calendar className="h-6 w-6 text-orange-500" />
          <div>
            <h3 className="text-xl font-semibold">Business History</h3>
            <p className="text-gray-600">Showcase your salon's stability and growth</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="yearsInOperation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Years in Operation</FormLabel>
                <FormControl>
                  <Input
                    placeholder="5"
                    className="h-12 border-2 focus:border-orange-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="leaseTerms"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Lease Terms</FormLabel>
                <FormControl>
                  <Input
                    placeholder="3 years remaining, $4,500/month"
                    className="h-12 border-2 focus:border-orange-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Asking Price */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DollarSign className="h-6 w-6 text-emerald-500" />
            <div>
              <h3 className="text-xl font-semibold">Asking Price</h3>
              <p className="text-gray-600">Set your salon's value</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="border-emerald-200 text-emerald-700">
              {hidePrice ? "Price Hidden" : "Price Visible"}
            </Badge>
            <FormField
              control={form.control}
              name="hidePrice"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Hide Price</span>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="askingPrice"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                  <Input
                    placeholder="250,000"
                    className="h-16 pl-12 text-2xl font-bold border-2 focus:border-emerald-500"
                    {...field}
                  />
                </div>
              </FormControl>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>💡 Competitive pricing attracts more buyers</span>
                {hidePrice && (
                  <span className="text-amber-600">Price will be shown as "Contact for Price"</span>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Value Proposition */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6"
      >
        <h4 className="font-semibold text-emerald-800 mb-3">💰 Pricing Strategy Tips</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-medium text-emerald-700 mb-2">Market Competitive:</h5>
            <ul className="text-emerald-600 space-y-1">
              <li>• Research similar salons in your area</li>
              <li>• Consider your equipment value</li>
              <li>• Factor in established clientele</li>
              <li>• Include lease transfer benefits</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-emerald-700 mb-2">Negotiation Ready:</h5>
            <ul className="text-emerald-600 space-y-1">
              <li>• Set asking price 10-15% above target</li>
              <li>• Be prepared to justify your valuation</li>
              <li>• Highlight unique selling points</li>
              <li>• Consider seller financing options</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SalonPerformanceSection;
