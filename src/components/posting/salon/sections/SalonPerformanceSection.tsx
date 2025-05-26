
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Users, Calendar, Eye, EyeOff, Lock } from "lucide-react";
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
      {/* Asking Price */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <DollarSign className="h-6 w-6 text-green-600" />
          <h3 className="text-xl font-semibold">Asking Price</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="askingPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Asking Price *</FormLabel>
                <FormControl>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="250,000"
                      className="h-12 pl-10 border-2 focus:border-green-500 text-lg font-semibold"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center gap-3">
              {hidePrice ? <EyeOff className="h-5 w-5 text-amber-600" /> : <Eye className="h-5 w-5 text-amber-600" />}
              <div>
                <h4 className="font-semibold text-amber-900">Price Privacy</h4>
                <p className="text-sm text-amber-700">
                  {hidePrice ? "Price hidden until buyer contacts you" : "Price visible to all viewers"}
                </p>
              </div>
            </div>
            <FormField
              control={form.control}
              name="hidePrice"
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
        </div>
      </div>

      {/* Financial Performance */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <TrendingUp className="h-6 w-6 text-blue-600" />
          <h3 className="text-xl font-semibold">Financial Performance</h3>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            Builds Trust & Value
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Monthly Revenue */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <FormLabel className="text-base font-semibold">Monthly Revenue</FormLabel>
              <FormField
                control={form.control}
                name="showRevenue"
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
            {showRevenue && (
              <FormField
                control={form.control}
                name="revenue"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="25,000"
                          className="h-10 pl-9 border-2 focus:border-blue-500"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showRevenue && (
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Lock className="h-4 w-4" />
                <span>Hidden from public view</span>
              </div>
            )}
          </div>

          {/* Monthly Profit */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <FormLabel className="text-base font-semibold">Monthly Profit</FormLabel>
              <FormField
                control={form.control}
                name="showProfit"
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
            {showProfit && (
              <FormField
                control={form.control}
                name="profit"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="15,000"
                          className="h-10 pl-9 border-2 focus:border-blue-500"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showProfit && (
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Lock className="h-4 w-4" />
                <span>Hidden from public view</span>
              </div>
            )}
          </div>

          {/* Monthly Clients */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <FormLabel className="text-base font-semibold">Monthly Clients</FormLabel>
              <FormField
                control={form.control}
                name="showClients"
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
            {showClients && (
              <FormField
                control={form.control}
                name="monthlyClients"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="450"
                          className="h-10 pl-9 border-2 focus:border-blue-500"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showClients && (
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Lock className="h-4 w-4" />
                <span>Hidden from public view</span>
              </div>
            )}
          </div>
        </div>

        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-900 mb-1">💡 Pro Tip</h4>
                <p className="text-sm text-green-800">
                  Salons that share financial performance get 3x more serious inquiries. 
                  You can always hide details and reveal to qualified buyers later.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Business Details */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Calendar className="h-6 w-6 text-purple-600" />
          <h3 className="text-xl font-semibold">Business Details</h3>
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
                    placeholder="8 years"
                    className="h-12 border-2 focus:border-purple-500"
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
                    placeholder="5 years remaining, $8,000/month"
                    className="h-12 border-2 focus:border-purple-500"
                    {...field}
                  />
                </FormControl>
                <p className="text-sm text-gray-600">Remaining lease time and monthly rent</p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Trust Building */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <h4 className="font-semibold text-blue-900">Why Share Performance Data?</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white p-3 rounded-lg">
                <div className="font-semibold text-blue-900 mb-1">3x More Interest</div>
                <div className="text-blue-700">Listings with financials get more views</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="font-semibold text-blue-900 mb-1">Faster Sales</div>
                <div className="text-blue-700">Qualified buyers contact you sooner</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="font-semibold text-blue-900 mb-1">Better Offers</div>
                <div className="text-blue-700">Transparency leads to fair pricing</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonPerformanceSection;
