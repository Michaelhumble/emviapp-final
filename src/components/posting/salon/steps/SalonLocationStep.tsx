
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Shield, Sparkles, Navigation } from "lucide-react";
import { motion } from "framer-motion";

interface SalonLocationStepProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonLocationStep = ({ form }: SalonLocationStepProps) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      className="space-y-8 max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Premium Header */}
      <motion.div 
        className="text-center space-y-4 pb-6 border-b border-gradient-to-r from-transparent via-green-200 to-transparent"
        variants={itemVariants}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <Sparkles className="w-5 h-5 text-green-400 animate-pulse" />
        </div>
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 tracking-tight">
          Location Details
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Help buyers find your salon with accurate location information
        </p>
        <div className="text-sm text-green-600 font-medium">
          Thông Tin Địa Điểm 📍
        </div>
      </motion.div>

      {/* Address Section */}
      <motion.div variants={itemVariants}>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <Navigation className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-bold text-green-800">Address Information</h3>
          </div>
          
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-800 mb-3 block">
                    Street Address / Địa Chỉ *
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="123 Main Street" 
                      className="h-14 text-lg rounded-xl border-2 border-gray-200 focus:border-green-400 focus:ring-4 focus:ring-green-50 transition-all duration-200"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 mt-2" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-gray-800 mb-3 block">
                      City / Thành Phố *
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="San Jose" 
                        className="h-14 text-lg rounded-xl border-2 border-gray-200 focus:border-green-400 focus:ring-4 focus:ring-green-50 transition-all duration-200"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 mt-2" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-gray-800 mb-3 block">
                      State / Bang *
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="CA" 
                        className="h-14 text-lg rounded-xl border-2 border-gray-200 focus:border-green-400 focus:ring-4 focus:ring-green-50 transition-all duration-200"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 mt-2" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-gray-800 mb-3 block">
                      ZIP Code / Mã Bưu Điện
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="95123" 
                        className="h-14 text-lg rounded-xl border-2 border-gray-200 focus:border-green-400 focus:ring-4 focus:ring-green-50 transition-all duration-200"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 mt-2" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-800 mb-3 block">
                    Neighborhood / Khu Vực
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Downtown, Near shopping center, etc." 
                      className="h-14 text-lg rounded-xl border-2 border-gray-200 focus:border-green-400 focus:ring-4 focus:ring-green-50 transition-all duration-200"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 mt-2" />
                </FormItem>
              )}
            />
          </div>
        </div>
      </motion.div>

      {/* Privacy Settings */}
      <motion.div variants={itemVariants}>
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-orange-600" />
            <h3 className="text-xl font-bold text-orange-800">Privacy Settings</h3>
          </div>
          
          <FormField
            control={form.control}
            name="hideExactAddress"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-4 space-y-0 bg-white rounded-xl p-6 border border-gray-100">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-1"
                  />
                </FormControl>
                <div className="space-y-2 leading-none">
                  <FormLabel className="text-lg font-semibold text-gray-800 cursor-pointer flex items-center gap-2">
                    <Shield className="w-5 h-5 text-orange-500" />
                    Hide exact address in listing
                  </FormLabel>
                  <FormDescription className="text-gray-600 text-base">
                    Only show general area to protect your privacy / Chỉ hiện khu vực chung để bảo vệ riêng tư
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>
      </motion.div>

      {/* Progress Indicator */}
      <motion.div 
        className="flex justify-center pt-6"
        variants={itemVariants}
      >
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-1 bg-gray-200 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-1 bg-green-200 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};
