
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, Award, Zap, Crown, Star, Sparkles, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface SalonPricingStepProps {
  form: UseFormReturn<SalonFormValues>;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const SalonPricingStep = ({ form, onSubmit, isSubmitting }: SalonPricingStepProps) => {
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
      rotate: [-1, 1, -1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-16 right-8 w-40 h-40 bg-gradient-to-br from-violet-200/30 to-purple-200/30 rounded-full blur-xl"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div 
          className="absolute bottom-32 left-12 w-32 h-32 bg-gradient-to-br from-purple-200/40 to-fuchsia-200/40 rounded-full blur-xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-br from-fuchsia-200/20 to-violet-200/20 rounded-full blur-2xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 4 }}
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
              whileHover={{ scale: 1.15, rotate: 15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/25">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
                <DollarSign className="w-8 h-8 lg:w-10 lg:h-10 text-white relative z-10" />
              </div>
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity }
                }}
              >
                <Crown className="w-6 h-6 text-yellow-400 drop-shadow-lg" />
              </motion.div>
            </motion.div>
          </div>
          
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Premium Pricing
          </motion.h1>
          
          <motion.p 
            className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Set your salon's value and reach the right buyers
          </motion.p>

          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-100 to-purple-100 rounded-full border border-violet-200/50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <TrendingUp className="w-5 h-5 text-violet-600" />
            <span className="text-sm font-medium text-purple-700">Giá Cả & Gói Dịch Vụ</span>
            <Sparkles className="w-4 h-4 text-fuchsia-500" />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Revenue Details */}
          <motion.div 
            className="space-y-8"
            variants={itemVariants}
          >
            <div className="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-2xl shadow-violet-500/10 p-8 lg:p-10">
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400" />
              
              <div className="relative z-10">
                <h3 className="text-2xl lg:text-3xl font-playfair font-bold text-gray-800 mb-8 flex items-center gap-3">
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <TrendingUp className="w-5 h-5 text-white" />
                  </motion.div>
                  Revenue Details
                </h3>

                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="yearlyRevenue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <Star className="w-4 h-4 text-green-500" />
                          Yearly Revenue / Doanh Thu Hàng Năm
                        </FormLabel>
                        <FormControl>
                          <motion.div whileFocus={{ scale: 1.02 }}>
                            <Input 
                              placeholder="$300,000" 
                              className="h-14 text-lg rounded-xl border-2 border-gray-200/50 bg-white/80 focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all duration-300 shadow-lg"
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
                    name="grossRevenue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-emerald-500" />
                          Gross Revenue / Tổng Doanh Thu
                        </FormLabel>
                        <FormControl>
                          <motion.div whileFocus={{ scale: 1.02 }}>
                            <Input 
                              placeholder="$350,000" 
                              className="h-14 text-lg rounded-xl border-2 border-gray-200/50 bg-white/80 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 shadow-lg"
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
                    name="netProfit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <Award className="w-4 h-4 text-yellow-500" />
                          Net Profit / Lợi Nhuận Ròng
                        </FormLabel>
                        <FormControl>
                          <motion.div whileFocus={{ scale: 1.02 }}>
                            <Input 
                              placeholder="$120,000" 
                              className="h-14 text-lg rounded-xl border-2 border-gray-200/50 bg-white/80 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 transition-all duration-300 shadow-lg"
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

          {/* Business Terms */}
          <motion.div 
            className="space-y-8"
            variants={itemVariants}
          >
            <div className="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/10 p-8 lg:p-10">
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-violet-400" />
              
              <div className="relative z-10">
                <h3 className="text-2xl lg:text-3xl font-playfair font-bold text-gray-800 mb-8 flex items-center gap-3">
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-br from-purple-400 to-fuchsia-500 rounded-xl flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <CheckCircle className="w-5 h-5 text-white" />
                  </motion.div>
                  Business Terms
                </h3>

                <div className="space-y-6">
                  {[
                    { name: "equipmentIncluded", label: "Equipment Included", icon: "⚙️" },
                    { name: "leaseTransferable", label: "Lease Transferable", icon: "📋" },
                    { name: "sellerFinancing", label: "Seller Financing Available", icon: "💰" }
                  ].map((term, index) => (
                    <motion.div
                      key={term.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 4 }}
                      className="bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-xl p-4 border border-purple-100"
                    >
                      <FormField
                        control={form.control}
                        name={term.name as keyof SalonFormValues}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="h-5 w-5"
                                />
                              </motion.div>
                            </FormControl>
                            <FormLabel className="text-lg font-medium cursor-pointer flex items-center gap-3">
                              <span className="text-xl">{term.icon}</span>
                              {term.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Premium Package Options */}
        <motion.div 
          className="mt-12"
          variants={itemVariants}
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-100/80 to-fuchsia-100/80 backdrop-blur-xl border border-violet-200/50 shadow-2xl shadow-violet-500/20 p-8 lg:p-10">
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/20" />
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400" />
            
            <div className="relative z-10">
              <h3 className="text-2xl lg:text-3xl font-playfair font-bold text-gray-800 mb-8 flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 bg-gradient-to-br from-violet-400 to-purple-500 rounded-xl flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Zap className="w-5 h-5 text-white" />
                </motion.div>
                Premium Listing Options
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: "isNationwide", label: "Nationwide Visibility", icon: "🌎", desc: "Reach buyers across the country" },
                  { name: "fastSalePackage", label: "Fast Sale Package", icon: "⚡", desc: "Priority placement & promotion" },
                  { name: "autoRenew", label: "Auto-Renew Listing", icon: "🔄", desc: "Keep your listing fresh" }
                ].map((option, index) => (
                  <motion.div
                    key={option.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/40 shadow-lg"
                  >
                    <FormField
                      control={form.control}
                      name={option.name as keyof SalonFormValues}
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <FormControl>
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="h-5 w-5"
                                />
                              </motion.div>
                            </FormControl>
                            <FormLabel className="text-lg font-semibold cursor-pointer flex items-center gap-2">
                              <span className="text-xl">{option.icon}</span>
                              {option.label}
                            </FormLabel>
                          </div>
                          <p className="text-sm text-gray-600 ml-8">{option.desc}</p>
                        </FormItem>
                      )}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Submit Section */}
        <motion.div 
          className="mt-16 text-center"
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting}
              className="h-16 px-12 text-xl font-semibold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700 text-white rounded-2xl shadow-2xl shadow-purple-500/25 border-0 transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="mr-3"
                >
                  <Sparkles className="w-6 h-6" />
                </motion.div>
              ) : (
                <Crown className="w-6 h-6 mr-3" />
              )}
              {isSubmitting ? "Creating Your Listing..." : "Publish Premium Listing"}
            </Button>
          </motion.div>

          <motion.p 
            className="mt-6 text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Your salon deserves the perfect buyer ✨
          </motion.p>
        </motion.div>

        {/* Final Progress Indicator */}
        <motion.div 
          className="flex justify-center pt-12"
          variants={itemVariants}
        >
          <div className="flex items-center space-x-4">
            <div className="w-4 h-4 bg-green-400 rounded-full shadow-lg" />
            <div className="w-12 h-2 bg-gradient-to-r from-green-200 to-purple-200 rounded-full" />
            <div className="w-4 h-4 bg-purple-400 rounded-full shadow-lg" />
            <div className="w-12 h-2 bg-gradient-to-r from-purple-200 to-emerald-200 rounded-full" />
            <div className="w-4 h-4 bg-emerald-400 rounded-full shadow-lg" />
            <div className="w-12 h-2 bg-gradient-to-r from-emerald-200 to-violet-200 rounded-full" />
            <motion.div 
              className="w-6 h-6 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full shadow-lg flex items-center justify-center"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <CheckCircle className="w-4 h-4 text-white" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
