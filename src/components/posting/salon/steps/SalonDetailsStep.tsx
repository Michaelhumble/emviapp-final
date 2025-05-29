
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Users, DollarSign, Home, Zap, Star, Sparkles, Crown } from "lucide-react";
import { motion } from "framer-motion";

interface SalonDetailsStepProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonDetailsStep = ({ form }: SalonDetailsStepProps) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        staggerChildren: 0.1,
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
      y: [-3, 3, -3],
      x: [-2, 2, -2],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-32 right-10 w-36 h-36 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-xl"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div 
          className="absolute bottom-40 left-16 w-28 h-28 bg-gradient-to-br from-purple-200/40 to-pink-200/40 rounded-full blur-xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1.5 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-pink-200/20 to-indigo-200/20 rounded-full blur-2xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 3 }}
        />
      </div>

      <motion.div 
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12"
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
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/25">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
                <Building className="w-8 h-8 lg:w-10 lg:h-10 text-white relative z-10" />
              </div>
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Star className="w-6 h-6 text-yellow-400 drop-shadow-lg" />
              </motion.div>
            </motion.div>
          </div>
          
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Business Details
          </motion.h1>
          
          <motion.p 
            className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Share the numbers that tell your success story
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Financial Information Section */}
          <motion.div 
            className="space-y-8"
            variants={itemVariants}
          >
            <div className="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-2xl shadow-indigo-500/10 p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400" />
              
              <div className="relative z-10">
                <h3 className="text-2xl lg:text-3xl font-playfair font-bold text-gray-800 mb-8 flex items-center gap-3">
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <DollarSign className="w-5 h-5 text-white" />
                  </motion.div>
                  Financial Details
                </h3>

                <div className="space-y-6">
                  {/* Asking Price */}
                  <FormField
                    control={form.control}
                    name="askingPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <Crown className="w-4 h-4 text-yellow-500" />
                          Asking Price / Giá Yêu Cầu *
                        </FormLabel>
                        <FormControl>
                          <motion.div whileFocus={{ scale: 1.02 }}>
                            <Input 
                              placeholder="$150,000" 
                              className="h-14 text-lg rounded-xl border-2 border-gray-200/50 bg-white/80 focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all duration-300 shadow-lg"
                              {...field} 
                            />
                          </motion.div>
                        </FormControl>
                        <FormMessage className="text-green-500 mt-2" />
                      </FormItem>
                    )}
                  />

                  {/* Monthly Rent */}
                  <FormField
                    control={form.control}
                    name="monthlyRent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <Home className="w-4 h-4 text-blue-500" />
                          Monthly Rent / Tiền Thuê Hàng Tháng *
                        </FormLabel>
                        <FormControl>
                          <motion.div whileFocus={{ scale: 1.02 }}>
                            <Input 
                              placeholder="$3,500" 
                              className="h-14 text-lg rounded-xl border-2 border-gray-200/50 bg-white/80 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 shadow-lg"
                              {...field} 
                            />
                          </motion.div>
                        </FormControl>
                        <FormMessage className="text-blue-500 mt-2" />
                      </FormItem>
                    )}
                  />

                  {/* Revenue Fields */}
                  <div className="grid grid-cols-1 gap-4">
                    <FormField
                      control={form.control}
                      name="monthlyRevenue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold text-gray-800">Monthly Revenue</FormLabel>
                          <FormControl>
                            <motion.div whileFocus={{ scale: 1.02 }}>
                              <Input 
                                placeholder="$25,000" 
                                className="h-14 text-lg rounded-xl border-2 border-gray-200/50 bg-white/80 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 shadow-lg"
                                {...field} 
                              />
                            </motion.div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Business Information Section */}
          <motion.div 
            className="space-y-8"
            variants={itemVariants}
          >
            <div className="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/10 p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400" />
              
              <div className="relative z-10">
                <h3 className="text-2xl lg:text-3xl font-playfair font-bold text-gray-800 mb-8 flex items-center gap-3">
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <Users className="w-5 h-5 text-white" />
                  </motion.div>
                  Business Info
                </h3>

                <div className="space-y-6">
                  {/* Staff Count */}
                  <FormField
                    control={form.control}
                    name="numberOfStaff"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <Users className="w-4 h-4 text-purple-500" />
                          Number of Staff / Số Nhân Viên
                        </FormLabel>
                        <FormControl>
                          <motion.div whileFocus={{ scale: 1.02 }}>
                            <Input 
                              placeholder="8" 
                              className="h-14 text-lg rounded-xl border-2 border-gray-200/50 bg-white/80 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 shadow-lg"
                              {...field} 
                            />
                          </motion.div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Tables and Chairs */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="numberOfTables"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold text-gray-800">Tables</FormLabel>
                          <FormControl>
                            <motion.div whileFocus={{ scale: 1.02 }}>
                              <Input 
                                placeholder="10" 
                                className="h-12 rounded-xl border-2 border-gray-200/50 bg-white/80 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all duration-300"
                                {...field} 
                              />
                            </motion.div>
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
                          <FormLabel className="text-base font-semibold text-gray-800">Chairs</FormLabel>
                          <FormControl>
                            <motion.div whileFocus={{ scale: 1.02 }}>
                              <Input 
                                placeholder="20" 
                                className="h-12 rounded-xl border-2 border-gray-200/50 bg-white/80 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all duration-300"
                                {...field} 
                              />
                            </motion.div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Square Feet */}
                  <FormField
                    control={form.control}
                    name="squareFeet"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <Building className="w-4 h-4 text-indigo-500" />
                          Square Feet / Diện Tích
                        </FormLabel>
                        <FormControl>
                          <motion.div whileFocus={{ scale: 1.02 }}>
                            <Input 
                              placeholder="2,500 sq ft" 
                              className="h-14 text-lg rounded-xl border-2 border-gray-200/50 bg-white/80 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 shadow-lg"
                              {...field} 
                            />
                          </motion.div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div 
          className="mt-12"
          variants={itemVariants}
        >
          <div className="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-2xl shadow-pink-500/10 p-8 lg:p-10">
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400" />
            
            <div className="relative z-10">
              <h3 className="text-2xl lg:text-3xl font-playfair font-bold text-gray-800 mb-8 flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Zap className="w-5 h-5 text-white" />
                </motion.div>
                Premium Features & Amenities
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "willTrain", label: "Will Train New Owner", icon: "🎓" },
                  { name: "hasHousing", label: "Has Housing/Apartment", icon: "🏠" },
                  { name: "hasWaxRoom", label: "Has Wax Room", icon: "✨" },
                  { name: "hasDiningRoom", label: "Has Dining Room", icon: "🍽️" },
                  { name: "hasLaundry", label: "Has Laundry", icon: "👕" },
                  { name: "hasParking", label: "Has Parking", icon: "🚗" }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <FormField
                      control={form.control}
                      name={feature.name as keyof SalonFormValues}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="mt-1"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-base font-medium cursor-pointer flex items-center gap-2">
                              <span className="text-lg">{feature.icon}</span>
                              {feature.label}
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div 
          className="flex justify-center pt-12"
          variants={itemVariants}
        >
          <div className="flex items-center space-x-4">
            <div className="w-4 h-4 bg-green-400 rounded-full shadow-lg" />
            <div className="w-12 h-2 bg-gradient-to-r from-green-200 to-purple-200 rounded-full" />
            <motion.div 
              className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="w-12 h-2 bg-gray-200 rounded-full" />
            <div className="w-4 h-4 bg-gray-300 rounded-full" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
