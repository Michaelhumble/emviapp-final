
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, Building2, TrendingUp, Star, Sparkles } from "lucide-react";

interface SalonDetailsStepProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonDetailsStep = ({ form }: SalonDetailsStepProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4 pb-8 border-b border-purple-100">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg">
          <Building2 className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-playfair font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Business Details
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Share the key details that make your salon attractive to serious buyers. 
          <span className="block text-purple-600 font-medium mt-2">💎 Premium listings get 5x more buyer interest!</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Financial Information Card */}
        <Card className="border-2 border-purple-100 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-purple-700">
              <DollarSign className="w-6 h-6" />
              Financial Information
            </CardTitle>
            <p className="text-sm text-purple-600">Help buyers understand your salon's value</p>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <FormField
              control={form.control}
              name="askingPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    Asking Price *
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="$150,000 - Be competitive to attract serious buyers!"
                      className="text-lg h-12 border-2 focus:border-purple-400"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription className="text-purple-600">
                    💡 Tip: Research similar salons in your area for competitive pricing
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="monthlyRent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium">Monthly Rent *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="$3,500 - Include all expenses (utilities, maintenance, etc.)"
                      className="text-lg h-12 border-2 focus:border-purple-400"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Include base rent + utilities + any additional fees
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="monthlyProfit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    Monthly Profit (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="$8,000 - Show buyers the earning potential!"
                      className="text-lg h-12 border-2 focus:border-purple-400"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription className="text-green-600">
                    🚀 Boost buyer confidence by showing profitability
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="monthlyRevenue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Revenue (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="$25,000 - Demonstrates business volume"
                      className="h-12 border-2 focus:border-purple-400"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Business Metrics Card */}
        <Card className="border-2 border-purple-100 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-blue-700">
              <Users className="w-6 h-6" />
              Business Metrics
            </CardTitle>
            <p className="text-sm text-blue-600">Size and capacity details that matter to buyers</p>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <FormField
              control={form.control}
              name="employeeCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium">Number of Employees</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-12 border-2 focus:border-purple-400">
                        <SelectValue placeholder="Select team size - shows operational scale" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-3">1-3 employees (Intimate boutique)</SelectItem>
                        <SelectItem value="4-7">4-7 employees (Growing business)</SelectItem>
                        <SelectItem value="8-15">8-15 employees (Established salon)</SelectItem>
                        <SelectItem value="16+">16+ employees (Large operation)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="text-blue-600">
                    👥 Larger teams often indicate stable, profitable operations
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numberOfTables"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manicure Tables</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="8 - More tables = higher earning potential"
                      className="h-12 border-2 focus:border-purple-400"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numberOfChairs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pedicure Chairs</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="6 - Premium chairs attract more clients"
                      className="h-12 border-2 focus:border-purple-400"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="squareFeet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Square Footage</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="1,200 sq ft - Spacious layout impresses buyers"
                      className="h-12 border-2 focus:border-purple-400"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </div>

      {/* Premium Features Section */}
      <Card className="border-2 border-gradient-to-r from-purple-200 to-pink-200 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-purple-700 text-xl">
            <Sparkles className="w-6 h-6" />
            Premium Features & Amenities
          </CardTitle>
          <p className="text-purple-600">Highlight what makes your salon special and valuable</p>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="willTrain"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border-2 border-purple-100 rounded-lg hover:bg-purple-50 transition-colors">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-1"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-medium text-purple-700">
                      Training Included 🎓
                    </FormLabel>
                    <FormDescription>
                      Huge value-add for new owners
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hasHousing"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border-2 border-purple-100 rounded-lg hover:bg-purple-50 transition-colors">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-1"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-medium text-purple-700">
                      Housing Available 🏠
                    </FormLabel>
                    <FormDescription>
                      Attracts out-of-state buyers
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hasWaxRoom"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border-2 border-purple-100 rounded-lg hover:bg-purple-50 transition-colors">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-1"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-medium text-purple-700">
                      Wax Room 💆‍♀️
                    </FormLabel>
                    <FormDescription>
                      Additional revenue stream
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hasDiningRoom"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border-2 border-purple-100 rounded-lg hover:bg-purple-50 transition-colors">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-1"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-medium text-purple-700">
                      Staff Dining Area 🍽️
                    </FormLabel>
                    <FormDescription>
                      Employee satisfaction boost
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hasLaundry"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border-2 border-purple-100 rounded-lg hover:bg-purple-50 transition-colors">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-1"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-medium text-purple-700">
                      Laundry Facilities 🧺
                    </FormLabel>
                    <FormDescription>
                      Operational convenience
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hasParking"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border-2 border-purple-100 rounded-lg hover:bg-purple-50 transition-colors">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-1"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-medium text-purple-700">
                      Parking Available 🚗
                    </FormLabel>
                    <FormDescription>
                      Customer convenience
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Motivational Footer */}
      <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
        <p className="text-purple-700 font-medium text-lg">
          🎯 <span className="font-bold">Pro Tip:</span> Detailed business metrics increase buyer confidence by 3x!
        </p>
        <p className="text-gray-600 mt-2">Complete all fields to maximize your listing's appeal to serious investors</p>
      </div>
    </div>
  );
};
