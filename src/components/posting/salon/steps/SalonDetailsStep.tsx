
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { DollarSign, Users, Home, Calculator, Sparkles } from "lucide-react";
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
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
        </div>
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 tracking-tight">
          Business Details
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Share your salon's financial and operational information
        </p>
        <div className="text-sm text-blue-600 font-medium">
          Chi Tiết Kinh Doanh 💼
        </div>
      </motion.div>

      {/* Financial Information */}
      <motion.div variants={itemVariants}>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-bold text-green-800">Financial Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="askingPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-800 mb-3 block">
                    Asking Price / Giá Bán *
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="$150,000" 
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
              name="monthlyRent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-800 mb-3 block">
                    Monthly Rent / Tiền Thuê Tháng *
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="$3,500" 
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
              name="grossRevenue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-800 mb-3 block">
                    Gross Revenue / Doanh Thu Gộp
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="$25,000/month" 
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
              name="netProfit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-800 mb-3 block">
                    Net Profit / Lợi Nhuận Ròng
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="$8,000/month" 
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

      {/* Operational Details */}
      <motion.div variants={itemVariants}>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-blue-800">Operational Details</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="numberOfStaff"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-800 mb-3 block">
                    Staff Count / Số Nhân Viên
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="5" 
                      className="h-14 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all duration-200"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 mt-2" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numberOfTables"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-800 mb-3 block">
                    Tables / Số Bàn
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="8" 
                      className="h-14 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all duration-200"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 mt-2" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="squareFeet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-800 mb-3 block">
                    Square Feet / Diện Tích
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="1,200 sq ft" 
                      className="h-14 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all duration-200"
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

      {/* Features & Amenities */}
      <motion.div variants={itemVariants}>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Home className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl font-bold text-purple-800">Features & Amenities</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "equipmentIncluded", label: "Equipment Included / Bao Gồm Thiết Bị" },
              { name: "leaseTransferable", label: "Lease Transferable / Chuyển Nhượng Hợp Đồng" },
              { name: "sellerFinancing", label: "Seller Financing / Hỗ Trợ Tài Chính" },
              { name: "hasParking", label: "Parking Available / Có Chỗ Đậu Xe" },
              { name: "hasWaxRoom", label: "Wax Room / Phòng Wax" },
              { name: "willTrain", label: "Will Train / Sẽ Đào Tạo" }
            ].map((feature) => (
              <FormField
                key={feature.name}
                control={form.control}
                name={feature.name as keyof SalonFormValues}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-white rounded-xl p-4 border border-gray-100 hover:shadow-sm transition-all duration-200">
                    <FormControl>
                      <Checkbox
                        checked={field.value as boolean}
                        onCheckedChange={field.onChange}
                        className="mt-1"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-base font-medium text-gray-800 cursor-pointer">
                        {feature.label}
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Progress Indicator */}
      <motion.div 
        className="flex justify-center pt-6"
        variants={itemVariants}
      >
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-1 bg-blue-200 rounded-full"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <div className="w-8 h-1 bg-gray-200 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};
