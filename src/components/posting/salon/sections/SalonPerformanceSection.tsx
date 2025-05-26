
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { TrendingUp, DollarSign, Users, Eye, EyeOff, Shield } from "lucide-react";
import { EnhancedSalonFormValues } from "../enhancedSalonFormSchema";

interface SalonPerformanceSectionProps {
  form: UseFormReturn<EnhancedSalonFormValues>;
}

export const SalonPerformanceSection = ({ form }: SalonPerformanceSectionProps) => {
  const showRevenue = form.watch("showRevenue");
  const showProfit = form.watch("showProfit");
  const showClients = form.watch("showClients");

  return (
    <div className="space-y-8">
      {/* Privacy Notice */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <Shield className="h-6 w-6 text-green-600" />
          <h3 className="font-semibold text-green-800">Financial Information Privacy</h3>
        </div>
        <p className="text-green-700 text-sm">
          All financial data is encrypted and only shared with verified, serious buyers who sign NDAs. 
          You control what information is visible.
        </p>
      </div>

      {/* Revenue Section */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <DollarSign className="h-6 w-6 text-emerald-600" />
            <h3 className="font-semibold text-lg">Revenue Performance</h3>
          </div>
          <FormField
            control={form.control}
            name="showRevenue"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormLabel className="text-sm">
                  {showRevenue ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </FormLabel>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="monthlyRevenue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Average Monthly Revenue</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="$25,000"
                      className="h-12 border-2 focus:border-emerald-500"
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
                      placeholder="$300,000"
                      className="h-12 border-2 focus:border-emerald-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
      </div>

      {/* Profit Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            <h3 className="font-semibold text-lg">Profitability</h3>
          </div>
          <FormField
            control={form.control}
            name="showProfit"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormLabel className="text-sm">
                  {showProfit ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </FormLabel>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="profit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Net Profit</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="$8,000"
                      className="h-12 border-2 focus:border-blue-500"
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
                  <FormLabel>Monthly Rent/Overhead</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="$4,500"
                      className="h-12 border-2 focus:border-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
      </div>

      {/* Client Base Section */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-purple-600" />
            <h3 className="font-semibold text-lg">Client Base</h3>
          </div>
          <FormField
            control={form.control}
            name="showClients"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormLabel className="text-sm">
                  {showClients ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </FormLabel>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="monthlyClients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Client Count</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="850"
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
              name="yearsInOperation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years in Operation</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 border-2 focus:border-purple-500">
                        <SelectValue placeholder="Select years" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="under-1">Under 1 year</SelectItem>
                      <SelectItem value="1-2">1-2 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="6-10">6-10 years</SelectItem>
                      <SelectItem value="over-10">Over 10 years</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
      </div>

      {/* Business Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="leaseTerms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lease Terms Remaining</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 border-2 focus:border-purple-500">
                    <SelectValue placeholder="Select lease terms" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="under-1-year">Under 1 year</SelectItem>
                  <SelectItem value="1-2-years">1-2 years</SelectItem>
                  <SelectItem value="3-5-years">3-5 years</SelectItem>
                  <SelectItem value="5-plus-years">5+ years</SelectItem>
                  <SelectItem value="month-to-month">Month-to-month</SelectItem>
                  <SelectItem value="owned">Property is owned</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="askingPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asking Price *</FormLabel>
              <FormControl>
                <Input
                  placeholder="$120,000"
                  className="h-12 border-2 focus:border-purple-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Price Privacy */}
      <FormField
        control={form.control}
        name="hidePrice"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div>
              <h4 className="font-medium">Hide asking price from public listing</h4>
              <p className="text-sm text-gray-600">Price will only be shown to qualified, verified buyers</p>
            </div>
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
  );
};

export default SalonPerformanceSection;
