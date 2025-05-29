
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Calendar, Upload, Star, Heart } from "lucide-react";
import { motion } from "framer-motion";

interface SalonIdentityStepProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonIdentityStep = ({ form }: SalonIdentityStepProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Motivational Banner */}
      <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 border border-purple-200 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <Building className="h-5 w-5 text-white" />
          </div>
          <h2 className="font-playfair text-2xl font-bold text-gray-900">✨ Tell Your Salon's Story / Kể câu chuyện salon của bạn</h2>
        </div>
        <p className="text-gray-600 leading-relaxed">
          Your salon's identity attracts the right buyers! Share what makes your business special and valuable.
          <br />
          <span className="text-purple-600 font-medium">Danh tính salon của bạn thu hút đúng người mua! Chia sẻ điều gì làm cho doanh nghiệp của bạn đặc biệt và có giá trị.</span>
        </p>
      </div>

      {/* Identity Form Card */}
      <div className="bg-white/80 backdrop-blur-lg border border-gray-200/50 rounded-2xl p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <Building className="h-4 w-4 text-white" />
          </div>
          <h3 className="font-playfair text-xl font-semibold text-gray-900">Salon Identity / Danh tính salon</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="salonName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Salon Name / Tên salon *
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Beautiful Nails Spa / Tiệm Nail Đẹp" 
                    {...field} 
                    className="h-12 border-2 border-gray-200 focus:border-purple-400 rounded-xl"
                  />
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
                <FormLabel className="text-sm font-medium text-gray-700">
                  Business Type / Loại hình kinh doanh *
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-purple-400 rounded-xl">
                      <SelectValue placeholder="Select business type / Chọn loại hình" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="nail-salon">Nail Salon / Tiệm Nail</SelectItem>
                    <SelectItem value="hair-salon">Hair Salon / Salon Tóc</SelectItem>
                    <SelectItem value="beauty-salon">Beauty Salon / Salon Làm Đẹp</SelectItem>
                    <SelectItem value="spa">Spa</SelectItem>
                    <SelectItem value="barbershop">Barbershop / Tiệm Cắt Tóc Nam</SelectItem>
                    <SelectItem value="massage">Massage Therapy / Massage Trị Liệu</SelectItem>
                    <SelectItem value="other">Other / Khác</SelectItem>
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
                <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Calendar className="w-4 h-4" />
                  Established Year / Năm thành lập
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="2015" 
                    {...field} 
                    className="h-12 border-2 border-gray-200 focus:border-purple-400 rounded-xl"
                  />
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
                <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Upload className="w-4 h-4" />
                  Logo (Optional) / Logo (Tùy chọn)
                </FormLabel>
                <FormControl>
                  <Input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                    className="h-12 border-2 border-gray-200 focus:border-purple-400 rounded-xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Success Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-blue-800">Pro Tip:</span>
            </div>
            <p className="text-sm text-blue-700">
              A memorable salon name increases buyer interest by 40%!
              <br />
              <span className="italic">Tên salon dễ nhớ tăng sự quan tâm của người mua lên 40%!</span>
            </p>
          </div>
          
          <div className="bg-pink-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="h-4 w-4 text-pink-500" />
              <span className="font-medium text-pink-800">Success Story:</span>
            </div>
            <p className="text-sm text-pink-700">
              "Adding our establishment year helped buyers trust our proven track record!"
              <br />
              <span className="italic">"Thêm năm thành lập giúp người mua tin tưởng thành tích đã được chứng minh của chúng tôi!"</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
