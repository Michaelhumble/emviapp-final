
import React, { useState } from 'react';
import { Control } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { beautySpecialties, commonRequirements } from '@/data/specialties';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface SpecialtiesRequirementsSectionProps {
  control: Control<JobFormValues>;
  industry: string;
}

const SpecialtiesRequirementsSection: React.FC<SpecialtiesRequirementsSectionProps> = ({
  control,
  industry
}) => {
  // All available industries for tabs
  const industries = [
    { id: 'nails', label: 'Nails' },
    { id: 'hair', label: 'Hair' },
    { id: 'lashes', label: 'Lashes' },
    { id: 'barber', label: 'Barber' },
    { id: 'skincare', label: 'Skincare' },
    { id: 'brows', label: 'PMU' },
    { id: 'makeup', label: 'Makeup' },
    { id: 'custom', label: 'Other' }
  ];
  
  const [selectedIndustry, setSelectedIndustry] = useState(
    industry && industry !== 'custom' ? industry : 'nails'
  );

  // Get specialties for the selected industry tab
  const specialtyOptions = beautySpecialties[selectedIndustry as keyof typeof beautySpecialties] || [];
  const requirementOptions = commonRequirements;

  const handleIndustryChange = (value: string) => {
    setSelectedIndustry(value);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold font-playfair">Job Specialties & Requirements</h2>
        <p className="text-gray-600">
          Select the specific skills and requirements for this position
        </p>
      </div>

      {/* Industry Tabs */}
      <Tabs value={selectedIndustry} onValueChange={handleIndustryChange} className="w-full">
        <TabsList className="grid grid-cols-4 md:grid-cols-8 w-full bg-gray-50">
          {industries.map((ind) => (
            <TabsTrigger 
              key={ind.id} 
              value={ind.id}
              className="text-sm py-2 px-3 data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm"
            >
              {ind.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={selectedIndustry} className="mt-6 border rounded-lg p-6">
          {/* Specialties Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Specialties Required
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {specialtyOptions.map((specialty) => (
                <FormField
                  key={specialty}
                  control={control}
                  name="specialties"
                  render={({ field }) => {
                    return (
                      <FormItem
                        className="flex items-start space-x-3 p-2"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(specialty)}
                            onCheckedChange={(checked) => {
                              const currentValues = Array.isArray(field.value) ? field.value : [];
                              
                              if (checked) {
                                field.onChange([...currentValues, specialty]);
                              } else {
                                field.onChange(
                                  currentValues.filter((value) => value !== specialty)
                                );
                              }
                            }}
                            className="border-purple-300 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                          />
                        </FormControl>
                        <FormLabel className="font-normal text-sm cursor-pointer">
                          {specialty}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>

            {specialtyOptions.length === 0 && (
              <p className="text-gray-500 text-center italic text-sm py-4">
                No specialized skills are applicable for this category.
              </p>
            )}
          </div>

          {/* Requirements Section */}
          <div className="space-y-6 mt-10 pt-6 border-t">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Job Requirements
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {requirementOptions.map((requirement) => (
                <FormField
                  key={requirement}
                  control={control}
                  name="requirements"
                  render={({ field }) => {
                    return (
                      <FormItem
                        className="flex items-start space-x-3 p-2"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(requirement)}
                            onCheckedChange={(checked) => {
                              const currentValues = Array.isArray(field.value) ? field.value : [];
                              
                              if (checked) {
                                field.onChange([...currentValues, requirement]);
                              } else {
                                field.onChange(
                                  currentValues.filter((value) => value !== requirement)
                                );
                              }
                            }}
                            className="border-purple-300 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                          />
                        </FormControl>
                        <FormLabel className="font-normal text-sm cursor-pointer">
                          {requirement}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="text-sm text-gray-500 text-center mt-4 mx-auto max-w-xl">
        Select all that apply to this position. Choose specialties and requirements to match your ideal candidate.
      </div>
    </div>
  );
};

export default SpecialtiesRequirementsSection;
