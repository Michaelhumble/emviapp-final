
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Wrench, Users, Package } from "lucide-react";
import { EnhancedSalonFormValues } from "../enhancedSalonFormSchema";

interface SalonAssetsSectionProps {
  form: UseFormReturn<EnhancedSalonFormValues>;
}

const SalonAssetsSection = ({ form }: SalonAssetsSectionProps) => {
  const equipmentOptions = [
    "Nail stations and chairs",
    "Pedicure chairs and tubs",
    "UV/LED nail lamps",
    "Autoclave sterilization equipment",
    "Air purification system",
    "Cash register/POS system",
    "Reception furniture",
    "Waiting area seating",
    "Storage cabinets",
    "Sound system",
    "Security cameras",
    "Other equipment"
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Assets & Team</h2>
        <p className="text-gray-600">Detail what's included with your salon purchase</p>
      </div>

      {/* Equipment Section */}
      <Card className="border-0 bg-gradient-to-r from-blue-50 to-cyan-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-2 rounded-full">
              <Wrench className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Equipment & Assets</h3>
              <p className="text-sm text-gray-600">What equipment is included in the sale?</p>
            </div>
          </div>

          <FormField
            control={form.control}
            name="includedEquipment"
            render={() => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Included Equipment</FormLabel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  {equipmentOptions.map((item) => (
                    <FormField
                      key={item}
                      control={form.control}
                      name="includedEquipment"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {item}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Team Section */}
      <Card className="border-0 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-100 p-2 rounded-full">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Team Information</h3>
              <p className="text-sm text-gray-600">Details about your current staff</p>
            </div>
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="teamSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Team Size</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., 5 nail technicians, 2 front desk staff"
                      className="border-2 focus:border-purple-500"
                      {...field}
                    />
                  </FormControl>
                  <p className="text-sm text-gray-600">How many staff members work at your salon?</p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-purple-900">Team Stays with Sale</h4>
                  <p className="text-sm text-purple-700">Will your current team continue working after the sale?</p>
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

            <FormField
              control={form.control}
              name="staffBios"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Staff Information (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief description of your team's experience, specialties, and what makes them great..."
                      className="min-h-24 border-2 focus:border-purple-500"
                      {...field}
                    />
                  </FormControl>
                  <p className="text-sm text-gray-600">Help buyers understand the quality and experience of your team</p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Lease & Operations */}
      <Card className="border-0 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 p-2 rounded-full">
              <Package className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Lease & Operations</h3>
              <p className="text-sm text-gray-600">Important operational details</p>
            </div>
          </div>

          <FormField
            control={form.control}
            name="leaseTerms"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Lease Terms</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., 5 years remaining, $3,500/month rent, option to renew, landlord relationship details..."
                    className="min-h-24 border-2 focus:border-green-500"
                    {...field}
                  />
                </FormControl>
                <p className="text-sm text-gray-600">Lease details are crucial for buyer decision-making</p>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Value Proposition */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
        <h3 className="font-semibold text-amber-900 mb-3">💡 Maximize Your Salon's Value</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-amber-800 mb-2">Include These Assets:</h4>
            <ul className="text-amber-700 space-y-1">
              <li>• All furniture and equipment</li>
              <li>• Existing client database</li>
              <li>• Established supplier relationships</li>
              <li>• Social media accounts</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-amber-800 mb-2">Highlight Team Value:</h4>
            <ul className="text-amber-700 space-y-1">
              <li>• Experienced, loyal staff</li>
              <li>• Established client relationships</li>
              <li>• Training and procedures</li>
              <li>• Smooth transition support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonAssetsSection;
