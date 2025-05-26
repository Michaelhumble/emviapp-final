
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { DollarSign, TrendingUp, Calendar, Eye, EyeOff, Lock } from "lucide-react";
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
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <Lock className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-blue-800">Financial Information Privacy</h3>
        </div>
        <p className="text-blue-700 text-sm">
          You control what financial information is visible to the public. Serious buyers can request detailed financials through our secure verification process.
        </p>
      </div>

      {/* Asking Price */}
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="askingPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Asking Price *
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., 250000"
                  className="h-12 border-2 focus:border-purple-500 text-lg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            {hidePrice ? <EyeOff className="h-5 w-5 text-amber-600" /> : <Eye className="h-5 w-5 text-amber-600" />}
            <div>
              <h4 className="font-medium text-amber-900">Price Visibility</h4>
              <p className="text-sm text-amber-700">
                {hidePrice ? "Show 'Contact for Price' - creates more qualified inquiries" : "Price visible to all viewers"}
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

      {/* Business Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel className="text-base font-semibold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Monthly Revenue
            </FormLabel>
            <FormField
              control={form.control}
              name="showRevenue"
              render={({ field }) => (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Public</span>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="revenue"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={showRevenue ? "e.g., 45000" : "Hidden from public view"}
                    className="h-12 border-2 focus:border-purple-500"
                    disabled={!showRevenue}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel className="text-base font-semibold flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Monthly Profit
            </FormLabel>
            <FormField
              control={form.control}
              name="showProfit"
              render={({ field }) => (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Public</span>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="profit"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={showProfit ? "e.g., 18000" : "Hidden from public view"}
                    className="h-12 border-2 focus:border-purple-500"
                    disabled={!showProfit}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel className="text-base font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              Monthly Clients
            </FormLabel>
            <FormField
              control={form.control}
              name="showClients"
              render={({ field }) => (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Public</span>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="monthlyClients"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={showClients ? "e.g., 800" : "Hidden from public view"}
                    className="h-12 border-2 focus:border-purple-500"
                    disabled={!showClients}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="yearsInOperation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">Years in Operation</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., 8"
                  className="h-12 border-2 focus:border-purple-500"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="leaseTerms"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">Lease Terms & Rent</FormLabel>
            <FormControl>
              <Textarea
                placeholder="e.g., 5 years remaining, $8,500/month, excellent landlord relationship, option to renew..."
                className="min-h-24 border-2 focus:border-purple-500"
                {...field}
              />
            </FormControl>
            <p className="text-sm text-gray-600">Include lease length, monthly rent, renewal options, landlord notes</p>
          </FormItem>
        )}
      />
    </div>
  );
};

export default SalonPerformanceSection;
