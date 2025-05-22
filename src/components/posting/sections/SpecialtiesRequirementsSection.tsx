
import React from 'react';
import { Control } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { beautySpecialties, commonRequirements } from '@/data/specialties';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';

interface SpecialtiesRequirementsSectionProps {
  control: Control<JobFormValues>;
  industry: string;
}

const SpecialtiesRequirementsSection: React.FC<SpecialtiesRequirementsSectionProps> = ({
  control,
  industry
}) => {
  // Get specialties for the selected industry (or all if not found)
  const specialtyOptions = industry && industry !== 'custom' && beautySpecialties[industry as keyof typeof beautySpecialties] 
    ? beautySpecialties[industry as keyof typeof beautySpecialties]
    : [];

  const requirementOptions = commonRequirements;

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold mb-2">Specialties & Requirements</h2>
        <p className="text-gray-600">
          Select all that apply to this position. Choose specialties and requirements to match your ideal candidate.
        </p>
      </div>

      {/* Specialties Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 border-b pb-2 border-purple-200">
          Job Specialties 
          <span className="text-sm font-normal text-gray-500 ml-2">
            (Select all that apply)
          </span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {specialtyOptions.map((specialty) => (
            <FormField
              key={specialty}
              control={control}
              name="specialties"
              render={({ field }) => {
                return (
                  <FormItem
                    className="flex items-start space-x-3 p-3 rounded-md transition-colors hover:bg-purple-50"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(specialty)}
                        onCheckedChange={(checked) => {
                          const currentValues = field.value || [];
                          
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
                    <FormLabel className="font-normal text-sm cursor-pointer select-none">
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
            No specialized skills are required for this position.
          </p>
        )}
      </div>

      {/* Requirements Section */}
      <div className="space-y-4 mt-8">
        <h3 className="text-lg font-medium text-gray-900 border-b pb-2 border-purple-200">
          Job Requirements
          <span className="text-sm font-normal text-gray-500 ml-2">
            (Select all that apply)
          </span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {requirementOptions.map((requirement) => (
            <FormField
              key={requirement}
              control={control}
              name="requirements"
              render={({ field }) => {
                return (
                  <FormItem
                    className="flex items-start space-x-3 p-3 rounded-md transition-colors hover:bg-purple-50"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(requirement)}
                        onCheckedChange={(checked) => {
                          const currentValues = field.value || [];
                          
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
                    <FormLabel className="font-normal text-sm cursor-pointer select-none">
                      {requirement}
                    </FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialtiesRequirementsSection;
