
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X, Package, Users, Heart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { EnhancedSalonFormValues } from "../enhancedSalonFormSchema";

interface SalonAssetsSectionProps {
  form: UseFormReturn<EnhancedSalonFormValues>;
}

const commonEquipment = [
  "Nail Stations", "Pedicure Chairs", "UV Lamps", "Sterilizers", 
  "Reception Desk", "POS System", "Manicure Tables", "Storage Cabinets",
  "Ventilation System", "Massage Chairs", "Waxing Equipment", "Hair Stations"
];

const SalonAssetsSection = ({ form }: SalonAssetsSectionProps) => {
  const includedEquipment = form.watch("includedEquipment") || [];
  const teamStays = form.watch("teamStays");

  const toggleEquipment = (equipment: string) => {
    const current = includedEquipment;
    const updated = current.includes(equipment)
      ? current.filter(item => item !== equipment)
      : [...current, equipment];
    form.setValue("includedEquipment", updated);
  };

  return (
    <div className="space-y-8">
      {/* Value Proposition */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6"
      >
        <div className="flex items-center gap-3 mb-3">
          <Package className="h-6 w-6 text-amber-500" />
          <h3 className="font-bold text-amber-800 text-lg">Maximize Your Sale Value</h3>
        </div>
        <p className="text-amber-700 leading-relaxed">
          Included equipment and an experienced team significantly increase your salon's value. 
          Buyers pay premium for turn-key operations that can start generating revenue immediately.
        </p>
      </motion.div>

      {/* Equipment Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Package className="h-6 w-6 text-blue-500" />
          <div>
            <h3 className="text-xl font-semibold">Included Equipment & Assets</h3>
            <p className="text-gray-600">Select all equipment and assets included in the sale</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {commonEquipment.map((equipment) => (
            <motion.div
              key={equipment}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                includedEquipment.includes(equipment)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => toggleEquipment(equipment)}
            >
              <div className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                  includedEquipment.includes(equipment) 
                    ? 'border-blue-500 bg-blue-500' 
                    : 'border-gray-300'
                }`}>
                  {includedEquipment.includes(equipment) && (
                    <div className="w-2 h-2 bg-white rounded-sm" />
                  )}
                </div>
                <span className="text-sm font-medium">{equipment}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Equipment Summary */}
        {includedEquipment.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-blue-50 rounded-xl p-4 border border-blue-200"
          >
            <h4 className="font-semibold text-blue-800 mb-2">
              Selected Equipment ({includedEquipment.length} items)
            </h4>
            <div className="flex flex-wrap gap-2">
              {includedEquipment.map((equipment) => (
                <Badge key={equipment} variant="secondary" className="bg-blue-100 text-blue-700">
                  {equipment}
                  <button
                    type="button"
                    onClick={() => toggleEquipment(equipment)}
                    className="ml-2 hover:bg-blue-200 rounded-full p-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Team Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Users className="h-6 w-6 text-purple-500" />
          <div>
            <h3 className="text-xl font-semibold">Your Team</h3>
            <p className="text-gray-600">Information about your staff and their future with the salon</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="teamSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Team Size</FormLabel>
                <FormControl>
                  <Input
                    placeholder="8 staff members"
                    className="h-12 border-2 focus:border-purple-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-200">
            <div>
              <h4 className="font-semibold text-purple-800">Team Staying with Business?</h4>
              <p className="text-sm text-purple-600">This greatly increases sale value</p>
            </div>
            <FormField
              control={form.control}
              name="teamStays"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Team Bios */}
        <FormField
          control={form.control}
          name="staffBios"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Team Member Highlights (Optional)
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell buyers about your amazing team... Years of experience, specialties, client relationships, awards, or any standout qualities that make your team special."
                  className="min-h-32 border-2 focus:border-purple-500"
                  {...field}
                />
              </FormControl>
              <p className="text-sm text-purple-600">
                💡 Highlighting talented team members can increase your salon's value by 15-25%
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Team Stays Benefits */}
        {teamStays && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-green-50 rounded-xl p-6 border border-green-200"
          >
            <div className="flex items-center gap-3 mb-3">
              <Star className="h-5 w-5 text-green-500" />
              <h4 className="font-semibold text-green-800">Incredible Value Add! 🎉</h4>
            </div>
            <p className="text-green-700 mb-4">
              Having your team stay with the business is a huge selling point that buyers love!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-green-700 mb-2">Benefits for Buyer:</h5>
                <ul className="text-green-600 space-y-1">
                  <li>• No hiring and training costs</li>
                  <li>• Immediate revenue generation</li>
                  <li>• Retained client relationships</li>
                  <li>• Proven team chemistry</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-green-700 mb-2">Value Impact:</h5>
                <ul className="text-green-600 space-y-1">
                  <li>• 20-30% higher sale price</li>
                  <li>• Faster sale completion</li>
                  <li>• More buyer interest</li>
                  <li>• Reduced buyer risk</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Asset Valuation Tip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-2xl p-6"
      >
        <h4 className="font-semibold text-gray-800 mb-3">💰 Asset Valuation Pro Tips</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-medium text-gray-700 mb-2">Equipment Documentation:</h5>
            <ul className="text-gray-600 space-y-1">
              <li>• Take photos of all equipment</li>
              <li>• Note purchase dates and warranties</li>
              <li>• Highlight recent upgrades</li>
              <li>• Include maintenance records</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-gray-700 mb-2">Team Transition:</h5>
            <ul className="text-gray-600 space-y-1">
              <li>• Get team commitment in writing</li>
              <li>• Highlight long-term employees</li>
              <li>• Document certifications/licenses</li>
              <li>• Show client-stylist relationships</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SalonAssetsSection;
