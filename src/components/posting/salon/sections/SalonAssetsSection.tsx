
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Package, Users, Star } from "lucide-react";
import { EnhancedSalonFormValues } from "../enhancedSalonFormSchema";

interface SalonAssetsSectionProps {
  form: UseFormReturn<EnhancedSalonFormValues>;
}

const SalonAssetsSection = ({ form }: SalonAssetsSectionProps) => {
  const teamStays = form.watch("teamStays");

  const equipmentOptions = [
    "Nail stations & chairs",
    "Pedicure chairs & tubs",
    "Hair washing stations",
    "Styling chairs",
    "UV/LED nail lamps",
    "Sterilization equipment",
    "Massage chairs",
    "Reception furniture",
    "Point-of-sale system",
    "Sound system",
    "TV screens",
    "Retail displays",
    "Storage cabinets",
    "Air purification system",
    "Security system",
    "All tools & supplies"
  ];

  return (
    <div className="space-y-8">
      {/* Equipment & Furniture */}
      <FormField
        control={form.control}
        name="includedEquipment"
        render={() => (
          <FormItem>
            <FormLabel className="text-base font-semibold flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              Included Equipment & Furniture
            </FormLabel>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
              {equipmentOptions.map((item) => (
                <FormField
                  key={item}
                  control={form.control}
                  name="includedEquipment"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, item])
                              : field.onChange(
                                  field.value?.filter((value) => value !== item)
                                );
                          }}
                        />
                      </FormControl>
                      <div className="text-sm leading-none">
                        {item}
                      </div>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">Select all equipment and furniture included in the sale</p>
          </FormItem>
        )}
      />

      {/* Team Information */}
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="teamSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Current Team Size
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., 3 full-time nail technicians, 2 part-time staff, 1 receptionist..."
                  className="min-h-20 border-2 focus:border-purple-500"
                  {...field}
                />
              </FormControl>
              <p className="text-sm text-gray-600">Describe your current team structure</p>
            </FormItem>
          )}
        />

        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Star className="h-5 w-5 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-800">Team Continuity</h3>
                <p className="text-sm text-green-700">
                  {teamStays ? "Current team is interested in staying with new owner" : "Team status will be determined by new owner"}
                </p>
              </div>
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
          
          {teamStays && (
            <div className="mt-4">
              <FormField
                control={form.control}
                name="staffBios"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-green-800">Staff Highlights (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief bios of key team members who will stay... years of experience, specialties, client following..."
                        className="min-h-20 border-green-300 focus:border-green-500 bg-white"
                        {...field}
                      />
                    </FormControl>
                    <p className="text-xs text-green-600">This can be a major selling point for buyers</p>
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>
      </div>

      {/* Value Proposition */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-800 mb-3">💡 What Buyers Look For</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-blue-700 mb-2">High-Value Assets:</h4>
            <ul className="text-blue-600 space-y-1">
              <li>• Recent equipment upgrades</li>
              <li>• Well-maintained furniture</li>
              <li>• Modern POS systems</li>
              <li>• Quality tools included</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-700 mb-2">Team Advantages:</h4>
            <ul className="text-blue-600 space-y-1">
              <li>• Experienced staff staying</li>
              <li>• Trained in your procedures</li>
              <li>• Established client relationships</li>
              <li>• Smooth transition potential</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonAssetsSection;
