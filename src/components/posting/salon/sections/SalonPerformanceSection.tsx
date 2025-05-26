
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, DollarSign, Users, Eye, EyeOff } from "lucide-react";
import { EnhancedSalonFormValues } from "../enhancedSalonFormSchema";

interface SalonPerformanceSectionProps {
  form: UseFormReturn<EnhancedSalonFormValues>;
}

const SalonPerformanceSection = ({ form }: SalonPerformanceSectionProps) => {
  const showRevenue = form.watch("showRevenue");
  const showProfit = form.watch("showProfit");
  const showClients = form.watch("showClients");

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Business Performance</h2>
        <p className="text-gray-600">Share your salon's success metrics (optional but recommended for serious buyers)</p>
      </div>

      {/* Revenue Section */}
      <Card className="border-0 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Revenue Information</h3>
                <p className="text-sm text-gray-600">Monthly and annual revenue figures</p>
              </div>
            </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="monthlyRevenue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Revenue</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="$15,000"
                        className="border-2 focus:border-green-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="annualRevenue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Revenue</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="$180,000"
                        className="border-2 focus:border-green-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Profit Section */}
      <Card className="border-0 bg-gradient-to-r from-blue-50 to-cyan-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Profit & Growth</h3>
                <p className="text-sm text-gray-600">Net profit and operational details</p>
              </div>
            </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="profit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Net Profit</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="$8,000"
                        className="border-2 focus:border-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="monthlyRent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Rent</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="$3,500"
                        className="border-2 focus:border-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Client Information */}
      <Card className="border-0 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Client Base</h3>
                <p className="text-sm text-gray-600">Customer metrics and loyalty</p>
              </div>
            </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="monthlyClients"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Clients</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="450"
                        className="border-2 focus:border-purple-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="yearsInOperation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years in Operation</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="8"
                        className="border-2 focus:border-purple-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Privacy Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <Eye className="h-5 w-5 text-amber-600" />
          <h3 className="font-semibold text-amber-900">Performance Data Privacy</h3>
        </div>
        <p className="text-sm text-amber-700">
          Financial information is only shared with verified, serious buyers who have signed NDAs. 
          You control what gets displayed publicly vs. privately shared during negotiations.
        </p>
      </div>
    </div>
  );
};

export default SalonPerformanceSection;
