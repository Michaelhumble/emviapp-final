
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Car, Home, Coffee, Shirt, Users, Wrench, Building, CreditCard, GraduationCap } from "lucide-react";

interface SalonFeaturesStepProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonFeaturesStep = ({ form }: SalonFeaturesStepProps) => {
  const features = [
    { name: "willTrain", label: "Will Train New Staff", icon: GraduationCap },
    { name: "hasHousing", label: "Housing Available", icon: Home },
    { name: "hasWaxRoom", label: "Wax Room", icon: Users },
    { name: "hasDiningRoom", label: "Dining Room", icon: Coffee },
    { name: "hasLaundry", label: "Laundry Facilities", icon: Shirt },
    { name: "hasParking", label: "Parking Available", icon: Car },
    { name: "equipmentIncluded", label: "Equipment Included", icon: Wrench },
    { name: "leaseTransferable", label: "Lease Transferable", icon: Building },
    { name: "sellerFinancing", label: "Seller Financing", icon: CreditCard },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Salon Features & Amenities
        </h3>
        <p className="text-gray-600">
          Select all the features and amenities your salon offers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <FormField
              key={feature.name}
              control={form.control}
              name={feature.name as keyof SalonFormValues}
              render={({ field }) => (
                <FormItem className="flex items-center space-x-3 space-y-0 rounded-lg border border-gray-200 p-4 hover:border-purple-300 transition-colors">
                  <FormControl>
                    <Checkbox
                      checked={field.value as boolean}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                    />
                  </FormControl>
                  <Icon className="h-5 w-5 text-purple-600" />
                  <FormLabel className="text-sm font-medium cursor-pointer">
                    {feature.label}
                  </FormLabel>
                </FormItem>
              )}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SalonFeaturesStep;
