
import React, { useState } from 'react';
import { Control, Controller, ControllerRenderProps } from 'react-hook-form';
import { JobFormValues } from '../job/jobFormSchema';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

interface IndustrySpecialtiesSectionProps {
  control: Control<JobFormValues>;
  industry?: string;
}

// Specialty options by industry
const specialtiesByIndustry = {
  nails: [
    "Manicure", "Pedicure", "Acrylic", "Gel Polish", "Dip Powder", 
    "Nail Art", "Gel Extensions", "Paraffin Treatments", "SNS", "Polygel", "Sculpting"
  ],
  hair: [
    "Haircuts", "Hair Color", "Highlights", "Balayage", "Blowouts", 
    "Extensions", "Keratin Treatments", "Perms", "Bridal", "Men's Cuts", "Children's Cuts"
  ],
  lashes: [
    "Classic Lashes", "Volume Lashes", "Hybrid Lashes", "Mega Volume", 
    "Lash Lifts", "Lash Tinting", "Bottom Lashes", "Removal"
  ],
  barber: [
    "Men's Cuts", "Fades", "Beard Trims", "Hot Towel Shaves", "Hair Design", 
    "Color Services", "Kids Cuts", "Straight Razor"
  ],
  skincare: [
    "Facials", "Chemical Peels", "Microdermabrasion", "Waxing", "Tinting", 
    "Body Treatments", "Microcurrent", "LED Therapy", "Dermaplaning", "Extractions"
  ],
  microblading: [
    "Microblading", "Powder Brows", "Combo Brows", "Lip Blush", 
    "Eyeliner", "Corrections", "Touch-Ups", "Areola Restoration"
  ],
  makeup: [
    "Bridal Makeup", "Special Event", "Editorial", "Airbrush Makeup", 
    "Natural Makeup", "Drag Makeup", "Theatrical Makeup", "Lesson/Class"
  ],
  custom: [
    "Reception", "Cleaning", "Scheduling", "Client Service", "Retail", 
    "Management", "Education", "Product Knowledge", "Social Media"
  ]
};

// Requirements options
const requirementOptions = [
  "License Required", 
  "2+ Years Experience", 
  "Portfolio Required",
  "References Required",
  "English Speaking", 
  "Vietnamese Speaking",
  "Own Tools/Equipment",
  "Valid ID/Work Permit", 
  "Weekend Availability",
  "Evening Availability"
];

// Benefits options
const benefitsOptions = [
  "Health Insurance",
  "Paid Time Off",
  "401k/Retirement Plan",
  "Flexible Schedule",
  "Free Education",
  "Commission Bonuses",
  "Product Discounts",
  "Free Parking",
  "Tips",
  "Advanced Training"
];

type FieldArrayItemType = string;

const IndustrySpecialtiesSection: React.FC<IndustrySpecialtiesSectionProps> = ({ 
  control, 
  industry = 'nails' 
}) => {
  const [activeTab, setActiveTab] = useState(industry);
  
  // Dynamically get specialties based on active tab
  const getSpecialtiesByTab = (tab: string) => {
    return specialtiesByIndustry[tab as keyof typeof specialtiesByIndustry] || specialtiesByIndustry.custom;
  };
  
  // Checkbox group for specialties
  const renderSpecialtiesCheckboxes = (field: ControllerRenderProps<JobFormValues, "specialties">) => {
    const specialties = getSpecialtiesByTab(activeTab);
    
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {specialties.map((specialty) => (
          <div key={specialty} className="flex items-center space-x-2">
            <Checkbox
              id={`specialty-${specialty}`}
              checked={field.value?.includes(specialty)}
              onCheckedChange={(checked) => {
                const newValue = checked
                  ? [...(field.value || []), specialty]
                  : (field.value || []).filter((val: string) => val !== specialty);
                field.onChange(newValue);
              }}
            />
            <Label
              htmlFor={`specialty-${specialty}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {specialty}
            </Label>
          </div>
        ))}
      </div>
    );
  };

  // Checkbox group for requirements
  const renderRequirementsCheckboxes = (field: ControllerRenderProps<JobFormValues, "requirements">) => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {requirementOptions.map((requirement) => (
          <div key={requirement} className="flex items-center space-x-2">
            <Checkbox
              id={`requirement-${requirement}`}
              checked={field.value?.includes(requirement)}
              onCheckedChange={(checked) => {
                const newValue = checked
                  ? [...(field.value || []), requirement]
                  : (field.value || []).filter((val: any) => val !== requirement);
                field.onChange(newValue);
              }}
            />
            <Label
              htmlFor={`requirement-${requirement}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {requirement}
            </Label>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">Job Specialties & Requirements</h2>
        <p className="text-sm text-muted-foreground mt-1">Select the specific skills and requirements for this position</p>
      </div>
      
      {/* Industry Type Field - Hidden but used for the form state */}
      <FormField
        control={control}
        name="industryType"
        render={({ field }) => (
          <FormItem className="hidden">
            <FormControl>
              <input type="hidden" {...field} value={activeTab} />
            </FormControl>
          </FormItem>
        )}
      />
      
      {/* Industry Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => {
        setActiveTab(value);
        // Update the industryType field in the form
        const industryTypeField = control._fields.industryType;
        if (industryTypeField) {
          industryTypeField._f.onChange(value);
        }
      }}>
        <TabsList className="grid grid-cols-4 md:grid-cols-8">
          <TabsTrigger value="nails">Nails</TabsTrigger>
          <TabsTrigger value="hair">Hair</TabsTrigger>
          <TabsTrigger value="lashes">Lashes</TabsTrigger>
          <TabsTrigger value="barber">Barber</TabsTrigger>
          <TabsTrigger value="skincare">Skincare</TabsTrigger>
          <TabsTrigger value="microblading">PMU</TabsTrigger>
          <TabsTrigger value="makeup">Makeup</TabsTrigger>
          <TabsTrigger value="custom">Other</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              {/* Specialties Section */}
              <FormField
                control={control}
                name="specialties"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">Specialties Required</FormLabel>
                    <FormControl>
                      {renderSpecialtiesCheckboxes(field)}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Separator className="my-6" />
              
              {/* Requirements Section */}
              <FormField
                control={control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">Job Requirements</FormLabel>
                    <FormControl>
                      {renderRequirementsCheckboxes(field)}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Separator className="my-6" />
              
              {/* Basic Benefits Toggles */}
              <div className="space-y-4">
                <FormLabel className="text-base font-medium">Benefits Offered</FormLabel>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name="has_housing"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Housing Provided</FormLabel>
                          <FormMessage />
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={control}
                    name="has_wax_room"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Wax Room Available</FormLabel>
                          <FormMessage />
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={control}
                    name="owner_will_train"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Owner Will Train</FormLabel>
                          <FormMessage />
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={control}
                    name="no_supply_deduction"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">No Supply Deduction</FormLabel>
                          <FormMessage />
                        </div>
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IndustrySpecialtiesSection;
