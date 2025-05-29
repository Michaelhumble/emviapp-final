
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SalonFormValues } from '../salonFormSchema';
import { Building2, Star, Calendar, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface SalonIdentityStepProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonIdentityStep: React.FC<SalonIdentityStepProps> = ({ form }) => {
  const businessTypes = [
    'Hair Salon / Salon Tóc',
    'Nail Salon / Salon Nails', 
    'Spa / Spa',
    'Barbershop / Tiệm cắt tóc nam',
    'Beauty Salon / Salon làm đẹp',
    'Massage / Massage',
    'Eyebrow/Lash / Chân mày/Mi',
    'Mixed Services / Dịch vụ hỗn hợp'
  ];

  const beautyIndustries = [
    'Nails',
    'Hair', 
    'Spa',
    'Massage',
    'Eyebrows',
    'Eyelashes',
    'Facials',
    'Waxing',
    'Other'
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <Building2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-playfair font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            Tell Your Salon's Story / Kể Câu Chuyện Salon
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto mb-4">
            Create a compelling first impression that attracts serious buyers and investors
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-purple-600 bg-purple-100 px-4 py-2 rounded-full">
            <Star className="h-4 w-4" />
            <span className="font-medium">Your listing could be seen by 1,000+ qualified buyers!</span>
          </div>
        </CardContent>
      </Card>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="salonName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-base font-medium">
                <Sparkles className="h-4 w-4 text-purple-500" />
                Salon Name / Tên Salon *
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., Golden Nails Spa, Elegant Beauty Studio"
                  className="h-12 text-base border-2 border-gray-200 focus:border-purple-500 transition-colors"
                  {...field} 
                />
              </FormControl>
              <p className="text-sm text-gray-500 mt-1">
                Choose a memorable name that reflects your salon's personality
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="businessType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-base font-medium">
                <Building2 className="h-4 w-4 text-purple-500" />
                Business Type / Loại Hình Kinh Doanh *
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 text-base border-2 border-gray-200 focus:border-purple-500">
                    <SelectValue placeholder="What type of salon do you own?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-60">
                  {businessTypes.map((type) => (
                    <SelectItem key={type} value={type} className="text-base py-3">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500 mt-1">
                This helps buyers find exactly what they're looking for
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="beautyIndustry"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-base font-medium">
                <Star className="h-4 w-4 text-purple-500" />
                Primary Service / Dịch Vụ Chính
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 text-base border-2 border-gray-200 focus:border-purple-500">
                    <SelectValue placeholder="What's your main specialty?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-60">
                  {beautyIndustries.map((industry) => (
                    <SelectItem key={industry} value={industry} className="text-base py-3">
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500 mt-1">
                Optional: Highlight your salon's main expertise
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="establishedYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-base font-medium">
                <Calendar className="h-4 w-4 text-purple-500" />
                Established Year / Năm Thành Lập
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., 2020 - Shows your business stability"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                  className="h-12 text-base border-2 border-gray-200 focus:border-purple-500 transition-colors"
                  {...field} 
                />
              </FormControl>
              <p className="text-sm text-gray-500 mt-1">
                Optional: Demonstrates your business track record and experience
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Trust Building Elements */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-green-800 mb-2">Why These Details Matter</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Builds instant credibility with potential buyers</li>
                <li>• Helps serious investors find your exact business type</li>
                <li>• Creates a professional first impression that commands higher offers</li>
                <li>• Positions your salon among premium listings</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
