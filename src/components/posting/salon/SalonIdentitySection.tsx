
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "./salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Calendar, Store, Sparkles } from "lucide-react";

interface SalonIdentitySectionProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonIdentitySection = ({ form }: SalonIdentitySectionProps) => {
  return (
    <div className="space-y-10">
      <div className="text-center space-y-4 relative">
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-full p-3">
            <Sparkles className="h-6 w-6 text-purple-600" />
          </div>
        </div>
        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 bg-clip-text text-transparent pt-8">
          Transform Your Salon Into Gold
        </h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Join <span className="font-semibold text-purple-600">2,847+ successful salon owners</span> who've sold their businesses through our premium marketplace
        </p>
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Avg. 23 days to sell</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span>98% success rate</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FormField
          control={form.control}
          name="salonName"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-semibold flex items-center gap-3 text-gray-800">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-2">
                  <Store className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div>Salon Name / Tên tiệm *</div>
                  <div className="text-xs text-gray-500 font-normal">This will be featured prominently in your listing</div>
                </div>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Magic Nails & Spa"
                  className="h-14 border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 text-lg font-medium placeholder:text-gray-400 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-purple-300"
                  {...field}
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
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-semibold flex items-center gap-3 text-gray-800">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-2">
                  <Building2 className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div>Business Type / Loại hình kinh doanh *</div>
                  <div className="text-xs text-gray-500 font-normal">Helps buyers find exactly what they're looking for</div>
                </div>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-14 border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 text-lg bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-purple-300">
                    <SelectValue placeholder="Select your salon type / Chọn loại hình" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white/95 backdrop-blur-md border-2 shadow-2xl z-50 rounded-xl">
                  <SelectItem value="full-service" className="text-base py-3 hover:bg-purple-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
                      <span>Full Service Salon / Salon đầy đủ dịch vụ</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="nails-only" className="text-base py-3 hover:bg-purple-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"></div>
                      <span>Nails Only / Chỉ làm móng</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="spa-nails" className="text-base py-3 hover:bg-purple-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                      <span>Spa & Nails / Spa và làm móng</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="beauty-salon" className="text-base py-3 hover:bg-purple-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                      <span>Beauty Salon / Salon làm đẹp</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="barbershop" className="text-base py-3 hover:bg-purple-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full"></div>
                      <span>Barbershop / Tiệm cắt tóc nam</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="other" className="text-base py-3 hover:bg-purple-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full"></div>
                      <span>Other / Khác</span>
                    </div>
                  </SelectItem>
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
            <FormItem className="space-y-3 md:col-span-2">
              <FormLabel className="text-base font-semibold flex items-center gap-3 text-gray-800">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-2">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div>Year Established / Năm thành lập</div>
                  <div className="text-xs text-gray-500 font-normal">Shows business maturity and stability to buyers</div>
                </div>
              </FormLabel>
              <FormControl>
                <div className="max-w-xs">
                  <Input
                    placeholder="2015"
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    className="h-14 border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 text-lg font-medium placeholder:text-gray-400 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-purple-300"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-purple-50 rounded-2xl p-6 border border-purple-100">
        <div className="flex items-center space-x-3 mb-3">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-2">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <h4 className="font-semibold text-gray-800">Pro Tip for Maximum Success</h4>
        </div>
        <p className="text-gray-600 leading-relaxed">
          <span className="font-semibold text-purple-600">Premium listings</span> with complete details sell 
          <span className="font-bold text-green-600"> 3.2x faster</span> and for 
          <span className="font-bold text-green-600"> 18% higher prices</span> than basic listings. 
          Take your time to showcase what makes your salon special!
        </p>
      </div>
    </div>
  );
};
