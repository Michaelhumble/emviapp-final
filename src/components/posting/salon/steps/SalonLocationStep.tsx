
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { SalonFormValues } from '../salonFormSchema';
import { MapPin, Shield, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface SalonLocationStepProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonLocationStep: React.FC<SalonLocationStepProps> = ({ form }) => {
  const usStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
              <MapPin className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-playfair font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            Location is Everything / Vị Trí Là Tất Cả
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto mb-4">
            Help buyers understand your salon's strategic advantages and market position
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-blue-600 bg-blue-100 px-4 py-2 rounded-full">
            <Target className="h-4 w-4" />
            <span className="font-medium">Great locations sell 3x faster than average!</span>
          </div>
        </CardContent>
      </Card>

      {/* Location Form */}
      <div className="grid grid-cols-1 gap-6">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-base font-medium">
                <MapPin className="h-4 w-4 text-blue-500" />
                Street Address / Địa Chỉ *
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="123 Main Street, Suite 100 - Be specific to attract local buyers"
                  className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors"
                  {...field} 
                />
              </FormControl>
              <p className="text-sm text-gray-500 mt-1">
                Specific address helps buyers assess foot traffic and accessibility
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">City / Thành Phố *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="San Jose, Westminster..."
                    className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">State / Bang *</FormLabel>
                <FormControl>
                  <select 
                    className="w-full h-12 px-3 py-2 text-base border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors bg-white"
                    {...field}
                  >
                    <option value="">Select State</option>
                    {usStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">ZIP Code / Mã Bưu Điện</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="95123"
                    className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="neighborhood"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-base font-medium">
                <TrendingUp className="h-4 w-4 text-blue-500" />
                Neighborhood / Khu Vực
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Little Saigon, Downtown, Near Walmart Plaza - Highlight foot traffic advantages"
                  className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors"
                  {...field} 
                />
              </FormControl>
              <p className="text-sm text-gray-500 mt-1">
                Optional: Mention shopping centers, landmarks, or demographic advantages
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hideExactAddress"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-1"
                />
              </FormControl>
              <div className="space-y-1 leading-none flex-1">
                <FormLabel className="flex items-center gap-2 text-base font-medium cursor-pointer">
                  <Shield className="h-4 w-4 text-green-500" />
                  Hide exact address / Ẩn địa chỉ chính xác
                </FormLabel>
                <p className="text-sm text-muted-foreground">
                  Show only city and state to potential buyers for privacy protection
                </p>
                <p className="text-xs text-green-600 font-medium">
                  ✓ Recommended: Protects your privacy while still attracting serious buyers
                </p>
              </div>
            </FormItem>
          )}
        />
      </div>

      {/* Location Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-green-800 mb-2">Prime Location Benefits</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Attracts buyers looking for established foot traffic</li>
                  <li>• Demonstrates proven market demand</li>
                  <li>• Higher valuation for strategic locations</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-purple-800 mb-2">Privacy Protection</h3>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• General area shown to generate interest</li>
                  <li>• Exact address shared only with qualified buyers</li>
                  <li>• Maintains your business confidentiality</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
