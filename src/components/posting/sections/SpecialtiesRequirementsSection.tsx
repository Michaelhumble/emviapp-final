
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Control } from 'react-hook-form';
import { X } from 'lucide-react';

interface SpecialtiesRequirementsSectionProps {
  control: Control<any>;
}

const SpecialtiesRequirementsSection: React.FC<SpecialtiesRequirementsSectionProps> = ({ control }) => {
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">Specialties & Requirements</h2>
        <p className="text-sm text-muted-foreground mt-1">Specify the skills and requirements for this position</p>
      </div>

      <FormField
        control={control}
        name="specialties"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Required Specialties</FormLabel>
            <div className="mb-3">
              {Array.isArray(field.value) && field.value.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {field.value.map((specialty, index) => (
                    <Badge key={index} className="px-2 py-1 bg-purple-100 text-purple-800 hover:bg-purple-200 border-none">
                      {specialty}
                      <button
                        type="button"
                        className="ml-1"
                        onClick={() => {
                          const newSpecialties = [...field.value];
                          newSpecialties.splice(index, 1);
                          field.onChange(newSpecialties);
                        }}
                      >
                        <X size={14} />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <FormControl>
              <Textarea
                placeholder="Enter specialties one per line (e.g. Acrylic, Gel, Pedicure, Nail Art)"
                className="min-h-[120px] border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                value=""
                onChange={(e) => {
                  if (e.target.value.includes('\n')) {
                    const newSpecialty = e.target.value.trim();
                    if (newSpecialty) {
                      const currentSpecialties = Array.isArray(field.value) ? field.value : [];
                      field.onChange([...currentSpecialties, newSpecialty]);
                      e.target.value = '';
                    }
                  }
                }}
                onBlur={(e) => {
                  const newSpecialty = e.target.value.trim();
                  if (newSpecialty) {
                    const currentSpecialties = Array.isArray(field.value) ? field.value : [];
                    field.onChange([...currentSpecialties, newSpecialty]);
                    e.target.value = '';
                  }
                }}
              />
            </FormControl>
            <p className="text-sm text-gray-500 mt-1">Press Enter after each specialty to add it to the list</p>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default SpecialtiesRequirementsSection;
