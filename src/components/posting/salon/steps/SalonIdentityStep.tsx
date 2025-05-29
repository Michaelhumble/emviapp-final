
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Building2, Calendar, Sparkles, Crown, Star } from "lucide-react";
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
        duration: 0.8,
        staggerChildren: 0.15,
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
      y: [-2, 2, -2],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full blur-xl"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div 
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-200/40 to-indigo-200/40 rounded-full blur-xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />
        <motion.div 
          className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-br from-indigo-200/20 to-pink-200/20 rounded-full blur-2xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />
      </div>

      <motion.div 
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Premium Header Section */}
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/25 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                <Building2 className="w-8 h-8 lg:w-10 lg:h-10 text-white relative z-10" />
              </div>
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Crown className="w-6 h-6 text-yellow-400 drop-shadow-lg" />
              </motion.div>
            </motion.div>
            
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-6 h-6 lg:w-8 lg:h-8 text-pink-400" />
            </motion.div>
          </div>
          
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Your Salon's Story
          </motion.h1>
          
          <motion.p 
            className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Let's create something beautiful together
          </motion.p>
          
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full border border-pink-200/50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-medium text-purple-700">Thông Tin Salon</span>
            <Sparkles className="w-4 h-4 text-pink-500" />
          </motion.div>
        </motion.div>

        {/* Premium Form Cards */}
        <div className="space-y-8">
          {/* Salon Name Card */}
          <motion.div 
            className="group"
            variants={itemVariants}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/10 p-8 lg:p-10">
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400" />
              
              <div className="relative z-10">
                <FormField
                  control={form.control}
                  name="salonName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-2xl lg:text-3xl font-playfair font-bold text-gray-800 mb-6 flex items-center gap-3">
                        <motion.div
                          className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl flex items-center justify-center"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <Building2 className="w-5 h-5 text-white" />
                        </motion.div>
                        Salon Name / Tên Salon
                        <span className="text-pink-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <motion.div
                          whileFocus={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Input 
                            placeholder="Beautiful Nails & Spa" 
                            className="h-16 lg:h-18 text-xl lg:text-2xl rounded-2xl border-2 border-gray-200/50 bg-white/80 backdrop-blur-sm focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 shadow-lg shadow-purple-500/5 placeholder:text-gray-400"
                            {...field} 
                          />
                        </motion.div>
                      </FormControl>
                      <FormMessage className="text-pink-500 mt-3 text-base" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </motion.div>

          {/* Business Type Card */}
          <motion.div 
            className="group"
            variants={itemVariants}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/10 p-8 lg:p-10">
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-400" />
              
              <div className="relative z-10">
                <FormField
                  control={form.control}
                  name="businessType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-2xl lg:text-3xl font-playfair font-bold text-gray-800 mb-6 flex items-center gap-3">
                        <motion.div
                          className="w-10 h-10 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center"
                          whileHover={{ scale: 1.1, rotate: -5 }}
                        >
                          <Sparkles className="w-5 h-5 text-white" />
                        </motion.div>
                        Business Type / Loại Hình Kinh Doanh
                        <span className="text-purple-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <motion.div
                          whileFocus={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Input 
                            placeholder="Nail Salon, Hair Salon, Spa, etc." 
                            className="h-16 lg:h-18 text-xl lg:text-2xl rounded-2xl border-2 border-gray-200/50 bg-white/80 backdrop-blur-sm focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 shadow-lg shadow-purple-500/5 placeholder:text-gray-400"
                            {...field} 
                          />
                        </motion.div>
                      </FormControl>
                      <FormMessage className="text-purple-500 mt-3 text-base" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </motion.div>

          {/* Established Year Card */}
          <motion.div 
            className="group"
            variants={itemVariants}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/10 p-8 lg:p-10">
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-400" />
              
              <div className="relative z-10">
                <FormField
                  control={form.control}
                  name="establishedYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-2xl lg:text-3xl font-playfair font-bold text-gray-800 mb-6 flex items-center gap-3">
                        <motion.div
                          className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-pink-500 rounded-xl flex items-center justify-center"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <Calendar className="w-5 h-5 text-white" />
                        </motion.div>
                        Year Established / Năm Thành Lập
                      </FormLabel>
                      <FormControl>
                        <motion.div
                          whileFocus={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Input 
                            placeholder="2020" 
                            className="h-16 lg:h-18 text-xl lg:text-2xl rounded-2xl border-2 border-gray-200/50 bg-white/80 backdrop-blur-sm focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 shadow-lg shadow-purple-500/5 placeholder:text-gray-400"
                            {...field} 
                          />
                        </motion.div>
                      </FormControl>
                      <FormMessage className="text-indigo-500 mt-3 text-base" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Premium Progress Indicator */}
        <motion.div 
          className="flex justify-center pt-12"
          variants={itemVariants}
        >
          <div className="flex items-center space-x-4">
            <motion.div 
              className="w-4 h-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-lg"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="w-12 h-2 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-full" />
            <div className="w-4 h-4 bg-gray-300 rounded-full" />
            <div className="w-12 h-2 bg-gray-200 rounded-full" />
            <div className="w-4 h-4 bg-gray-300 rounded-full" />
          </div>
        </motion.div>

        {/* Motivational Quote */}
        <motion.div
          className="text-center mt-12"
          variants={itemVariants}
        >
          <p className="text-lg text-gray-500 italic font-light">
            "Every great business started with a dream..."
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
