
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SalonFormValues } from '../salonFormSchema';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building, Calendar, Upload, Star, Heart } from 'lucide-react';

interface SalonDetailsStepProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonDetailsStep = ({ form }: SalonDetailsStepProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-purple-100 p-3 rounded-full">
            <Building className="w-6 h-6 text-purple-600" />
          </div>
          <span className="ml-3 text-xl font-medium">✨ Tell Your Salon's Story / Kể câu chuyện salon của bạn</span>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Your salon's identity attracts the right buyers! Share what makes your business special and valuable.
          <br />
          <span className="text-purple-600 font-medium">
            Danh tính salon của bạn thu hút đúng người mua! Chia sẻ điều gì làm cho doanh nghiệp của bạn đặc biệt và có giá trị.
          </span>
        </p>
      </div>

      {/* Salon Identity Section */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Building className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-medium text-purple-900">Salon Identity / Danh tính salon</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="salonName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salon Name / Tên salon *</FormLabel>
                <FormControl>
                  <Input placeholder="Premier Nail Salon" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Type / Loại hình kinh doanh *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="nail-salon">Nail Salon</SelectItem>
                    <SelectItem value="hair-salon">Hair Salon / Salon Tóc</SelectItem>
                    <SelectItem value="beauty-salon">Beauty Salon</SelectItem>
                    <SelectItem value="spa">Spa</SelectItem>
                    <SelectItem value="barbershop">Barbershop</SelectItem>
                    <SelectItem value="massage">Massage Therapy</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="establishedYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Established Year / Năm thành lập
                </FormLabel>
                <FormControl>
                  <Input placeholder="2015" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Logo (Optional) / Logo (Tùy chọn)
                </FormLabel>
                <FormControl>
                  <Input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Pro Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Star className="w-4 h-4 text-blue-600 mr-2" />
            <span className="font-medium text-blue-900">💡 Pro Tip:</span>
          </div>
          <p className="text-blue-800 text-sm">
            A memorable salon name increases buyer interest by 40%!
            <br />
            <span className="text-blue-600">
            Tên salon dễ nhớ tăng sự quan tâm của người mua lên 40%!
            </span>
          </p>
        </div>

        <div className="bg-pink-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Heart className="w-4 h-4 text-pink-600 mr-2" />
            <span className="font-medium text-pink-900">💖 Success Story:</span>
          </div>
          <p className="text-pink-800 text-sm">
            "Adding our establishment year helped buyers trust our proven track record!"
            <br />
            <span className="text-pink-600">
            "Thêm năm thành lập giúp người mua tin tưởng thành tích đã được chứng minh của chúng tôi!"
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
