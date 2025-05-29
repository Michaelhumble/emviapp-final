
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Shield, Navigation, Globe, Star, Sparkles } from "lucide-react";
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
        duration: 0.8,
        staggerChildren: 0.12,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-4, 4, -4],
      x: [-2, 2, -2],
      rotate: [-2, 2, -2],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-24 left-8 w-32 h-32 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-xl"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div 
          className="absolute top-1/3 right-12 w-40 h-40 bg-gradient-to-br from-teal-200/25 to-cyan-200/25 rounded-full blur-2xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />
        <motion.div 
          className="absolute bottom-20 left-1/4 w-28 h-28 bg-gradient-to-br from-cyan-200/35 to-emerald-200/35 rounded-full blur-xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 4 }}
        />
      </div>

      <motion.div 
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Premium Header */}
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-teal-500/25">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
                <MapPin className="w-8 h-8 lg:w-10 lg:h-10 text-white relative z-10" />
              </div>
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, 360]
                }}
                transition={{ 
                  scale: { duration: 2, repeat: Infinity },
                  rotate: { duration: 10, repeat: Infinity, ease: "linear" }
                }}
              >
                <Navigation className="w-6 h-6 text-orange-400 drop-shadow-lg" />
              </motion.div>
            </motion.div>
          </div>
          
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Perfect Location
          </motion.h1>
          
          <motion.p 
            className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Where success meets opportunity
          </motion.p>

          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full border border-emerald-200/50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Globe className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-medium text-teal-700">Vị Trí Địa Lý</span>
            <Sparkles className="w-4 h-4 text-cyan-500" />
          </motion.div>
        </motion.div>

        <div className="space-y-8">
          {/* Address Section */}
          <motion.div 
            className="group"
            variants={itemVariants}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-2xl shadow-emerald-500/10 p-8 lg:p-10">
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400" />
              
              <div className="relative z-10">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-2xl lg:text-3xl font-playfair font-bold text-gray-800 mb-6 flex items-center gap-3">
                        <motion.div
                          className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <MapPin className="w-5 h-5 text-white" />
                        </motion.div>
                        Street Address / Địa Chỉ
                        <span className="text-emerald-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <motion.div
                          whileFocus={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Input 
                            placeholder="123 Main Street, Business District" 
                            className="h-16 lg:h-18 text-xl lg:text-2xl rounded-2xl border-2 border-gray-200/50 bg-white/80 backdrop-blur-sm focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 shadow-lg shadow-emerald-500/5 placeholder:text-gray-400"
                            {...field} 
                          />
                        </motion.div>
                      </FormControl>
                      <FormMessage className="text-emerald-500 mt-3 text-base" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </motion.div>

          {/* City, State, ZIP Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
            variants={itemVariants}
          >
            {/* City */}
            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl shadow-teal-500/10 p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-cyan-400" />
                
                <div className="relative z-10">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <Star className="w-4 h-4 text-teal-500" />
                          City / Thành Phố *
                        </FormLabel>
                        <FormControl>
                          <motion.div whileFocus={{ scale: 1.02 }}>
                            <Input 
                              placeholder="San Jose" 
                              className="h-14 text-lg rounded-xl border-2 border-gray-200/50 bg-white/80 focus:border-teal-400 focus:ring-4 focus:ring-teal-100 transition-all duration-300 shadow-lg"
                              {...field} 
                            />
                          </motion.div>
                        </FormControl>
                        <FormMessage className="text-teal-500 mt-2" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </motion.div>

            {/* State */}
            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl shadow-cyan-500/10 p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-emerald-400" />
                
                <div className="relative z-10">
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <Globe className="w-4 h-4 text-cyan-500" />
                          State / Tiểu Bang *
                        </FormLabel>
                        <FormControl>
                          <motion.div whileFocus={{ scale: 1.02 }}>
                            <Input 
                              placeholder="CA" 
                              className="h-14 text-lg rounded-xl border-2 border-gray-200/50 bg-white/80 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition-all duration-300 shadow-lg"
                              {...field} 
                            />
                          </motion.div>
                        </FormControl>
                        <FormMessage className="text-cyan-500 mt-2" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </motion.div>

            {/* ZIP Code */}
            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl shadow-emerald-500/10 p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-400" />
                
                <div className="relative z-10">
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <Navigation className="w-4 h-4 text-emerald-500" />
                          ZIP Code / Mã Bưu Điện
                        </FormLabel>
                        <FormControl>
                          <motion.div whileFocus={{ scale: 1.02 }}>
                            <Input 
                              placeholder="95123" 
                              className="h-14 text-lg rounded-xl border-2 border-gray-200/50 bg-white/80 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 shadow-lg"
                              {...field} 
                            />
                          </motion.div>
                        </FormControl>
                        <FormMessage className="text-emerald-500 mt-2" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Neighborhood */}
          <motion.div 
            className="group"
            variants={itemVariants}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-2xl shadow-teal-500/10 p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400" />
              
              <div className="relative z-10">
                <FormField
                  control={form.control}
                  name="neighborhood"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-2xl font-playfair font-bold text-gray-800 mb-6 flex items-center gap-3">
                        <motion.div
                          className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center"
                          whileHover={{ scale: 1.1, rotate: -5 }}
                        >
                          <Star className="w-5 h-5 text-white" />
                        </motion.div>
                        Neighborhood / Khu Vực
                      </FormLabel>
                      <FormControl>
                        <motion.div
                          whileFocus={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Input 
                            placeholder="Downtown, Near shopping center, High-traffic area..." 
                            className="h-16 text-xl rounded-2xl border-2 border-gray-200/50 bg-white/80 backdrop-blur-sm focus:border-teal-400 focus:ring-4 focus:ring-teal-100 transition-all duration-300 shadow-lg shadow-teal-500/5 placeholder:text-gray-400"
                            {...field} 
                          />
                        </motion.div>
                      </FormControl>
                      <FormMessage className="text-teal-500 mt-3 text-base" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </motion.div>

          {/* Privacy Option */}
          <motion.div 
            className="group"
            variants={itemVariants}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50/80 to-orange-50/80 backdrop-blur-xl border border-amber-200/50 shadow-xl shadow-amber-500/10 p-6 lg:p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/20" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-400" />
              
              <div className="relative z-10">
                <FormField
                  control={form.control}
                  name="hideExactAddress"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-4 space-y-0">
                      <FormControl>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-1 h-5 w-5"
                          />
                        </motion.div>
                      </FormControl>
                      <div className="space-y-2 leading-none">
                        <FormLabel className="text-lg font-semibold cursor-pointer flex items-center gap-3">
                          <motion.div
                            className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center"
                            whileHover={{ rotate: 10 }}
                          >
                            <Shield className="w-4 h-4 text-white" />
                          </motion.div>
                          Hide exact address in listing
                        </FormLabel>
                        <FormDescription className="text-base text-gray-600 ml-11">
                          Only show general area to protect your privacy. Exact address will be shared with serious buyers only.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Progress Indicator */}
        <motion.div 
          className="flex justify-center pt-12"
          variants={itemVariants}
        >
          <div className="flex items-center space-x-4">
            <div className="w-4 h-4 bg-green-400 rounded-full shadow-lg" />
            <div className="w-12 h-2 bg-gradient-to-r from-green-200 to-purple-200 rounded-full" />
            <div className="w-4 h-4 bg-purple-400 rounded-full shadow-lg" />
            <div className="w-12 h-2 bg-gradient-to-r from-purple-200 to-emerald-200 rounded-full" />
            <motion.div 
              className="w-4 h-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-lg"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="w-12 h-2 bg-gray-200 rounded-full" />
            <div className="w-4 h-4 bg-gray-300 rounded-full" />
          </div>
        </motion.div>

        {/* Location Benefits */}
        <motion.div
          className="text-center mt-12"
          variants={itemVariants}
        >
          <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-2xl p-6 border border-emerald-200/50">
            <p className="text-lg text-emerald-700 font-medium mb-2">💡 Location Tip</p>
            <p className="text-emerald-600">
              A prime location can increase your salon's value by 20-40%. Highlight proximity to shopping centers, parking availability, and foot traffic!
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
