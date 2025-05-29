
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Building2, Calendar, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface SalonIdentityStepProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonIdentityStep = ({ form }: SalonIdentityStepProps) => {
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
        className="text-center space-y-4 pb-6 border-b border-gradient-to-r from-transparent via-purple-200 to-transparent"
        variants={itemVariants}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
        </div>
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 tracking-tight">
          Salon Information
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Tell us about your salon business
        </p>
        <div className="text-sm text-purple-600 font-medium">
          Thông Tin Salon ✨
        </div>
      </motion.div>

      {/* Premium Form Cards */}
      <motion.div className="space-y-6" variants={itemVariants}>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-all duration-300">
          <FormField
            control={form.control}
            name="salonName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-gray-800 mb-3 block">
                  Salon Name / Tên Salon *
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Beautiful Nails & Spa" 
                    className="h-14 text-lg rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-50 transition-all duration-200"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-red-500 mt-2" />
              </FormItem>
            )}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-all duration-300">
          <FormField
            control={form.control}
            name="businessType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-gray-800 mb-3 block">
                  Business Type / Loại Hình Kinh Doanh *
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Nail Salon, Hair Salon, Spa, etc." 
                    className="h-14 text-lg rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-50 transition-all duration-200"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-red-500 mt-2" />
              </FormItem>
            )}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-all duration-300">
          <FormField
            control={form.control}
            name="establishedYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-500" />
                  Year Established / Năm Thành Lập
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="2020" 
                    className="h-14 text-lg rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-50 transition-all duration-200"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-red-500 mt-2" />
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
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <div className="w-8 h-1 bg-purple-200 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};
