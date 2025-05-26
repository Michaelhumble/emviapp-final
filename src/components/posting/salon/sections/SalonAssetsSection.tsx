
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, Users, Heart, CheckCircle } from "lucide-react";
import { EnhancedSalonFormValues } from "../enhancedSalonFormSchema";

interface SalonAssetsSectionProps {
  form: UseFormReturn<EnhancedSalonFormValues>;
}

const equipmentOptions = [
  "Nail stations & chairs",
  "Pedicure chairs & tubs",
  "Manicure tables",
  "UV/LED lamps",
  "Autoclave sterilizer",
  "Ventilation system",
  "Cash register/POS system",
  "Waiting area furniture",
  "Massage chairs",
  "Hair styling stations",
  "Shampoo bowls",
  "Hair dryers",
  "Waxing beds",
  "Facial steamers",
  "Reception desk",
  "Retail display shelves",
  "Sound system",
  "Security system",
  "Towel warmers",
  "Storage cabinets"
];

const SalonAssetsSection = ({ form }: SalonAssetsSectionProps) => {
  const includedEquipment = form.watch("includedEquipment");
  const teamStays = form.watch("teamStays");

  const handleEquipmentChange = (equipment: string, checked: boolean) => {
    const currentEquipment = includedEquipment || [];
    if (checked) {
      form.setValue("includedEquipment", [...currentEquipment, equipment]);
    } else {
      form.setValue("includedEquipment", currentEquipment.filter(item => item !== equipment));
    }
  };

  return (
    <div className="space-y-8">
      {/* Equipment Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Wrench className="h-6 w-6 text-orange-600" />
          <h3 className="text-xl font-semibold">Included Equipment & Assets</h3>
          <Badge variant="outline" className="bg-orange-50 text-orange-700">
            Adds Value
          </Badge>
        </div>

        <Card className="bg-gray-50 border-2 border-dashed border-gray-300">
          <CardContent className="p-6">
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Select all equipment included in the sale:</h4>
              <p className="text-sm text-gray-600">Check everything that comes with the salon</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {equipmentOptions.map((equipment) => (
                <div key={equipment} className="flex items-center space-x-3">
                  <Checkbox
                    id={equipment}
                    checked={includedEquipment?.includes(equipment) || false}
                    onCheckedChange={(checked) => 
                      handleEquipmentChange(equipment, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={equipment}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {equipment}
                  </label>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h5 className="font-medium text-green-900 mb-1">💰 Equipment Value Tip</h5>
                  <p className="text-sm text-green-800">
                    Listing specific equipment can add $10,000-$50,000 to your salon's value. 
                    Be detailed about premium items like massage chairs, high-end nail stations, or newer equipment.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Users className="h-6 w-6 text-blue-600" />
          <h3 className="text-xl font-semibold">Team & Staff</h3>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            Continuity Advantage
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="teamSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Current Team Size</FormLabel>
                <FormControl>
                  <Input
                    placeholder="8 nail technicians, 2 receptionists"
                    className="h-12 border-2 focus:border-blue-500"
                    {...field}
                  />
                </FormControl>
                <p className="text-sm text-gray-600">Number and types of staff currently employed</p>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <FormLabel className="text-base font-semibold">Team Transition</FormLabel>
            <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Heart className="h-5 w-5 text-blue-600" />
                <div>
                  <h4 className="font-semibold text-blue-900">Team Stays with New Owner</h4>
                  <p className="text-sm text-blue-700">
                    {teamStays ? "Team committed to staying" : "Team transition to be discussed"}
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
          </div>
        </div>

        <FormField
          control={form.control}
          name="staffBios"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">Staff Overview (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief description of your team's experience, specialties, and what makes them special. This helps buyers understand the human value of your salon..."
                  className="min-h-24 border-2 focus:border-blue-500"
                  {...field}
                />
              </FormControl>
              <p className="text-sm text-gray-600">
                Highlight your team's skills, experience, and client relationships
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Heart className="h-5 w-5 text-purple-600" />
                <h4 className="font-semibold text-purple-900">Team Continuity = Higher Value</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white p-3 rounded-lg">
                  <div className="font-semibold text-purple-900 mb-1">Experienced Team</div>
                  <div className="text-purple-700">Reduces training time and maintains quality</div>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <div className="font-semibold text-purple-900 mb-1">Client Relationships</div>
                  <div className="text-purple-700">Existing clients follow their favorite technicians</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Value Summary */}
      {(includedEquipment?.length > 0 || teamStays) && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <h4 className="text-lg font-semibold text-green-900">Assets Summary</h4>
            </div>
            
            <div className="space-y-3">
              {includedEquipment?.length > 0 && (
                <div>
                  <span className="font-medium text-green-800">Equipment Included: </span>
                  <span className="text-green-700">{includedEquipment.length} items selected</span>
                </div>
              )}
              {teamStays && (
                <div>
                  <span className="font-medium text-green-800">Team Continuity: </span>
                  <span className="text-green-700">Staff committed to staying</span>
                </div>
              )}
            </div>
            
            <p className="text-sm text-green-600 mt-3 italic">
              These assets significantly increase your salon's attractiveness to buyers!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SalonAssetsSection;
