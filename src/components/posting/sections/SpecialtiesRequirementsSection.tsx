
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { JobFormValues } from '../job/jobFormSchema';
import { beautySpecialties } from '@/data/specialties';
import { Button } from '@/components/ui/button';

interface SpecialtiesRequirementsSectionProps {
  form: UseFormReturn<JobFormValues>;
  onNext?: () => void;
  onPrevious?: () => void;
  categorySpecialties?: string[];
  expressMode?: boolean;
}

const SpecialtiesRequirementsSection: React.FC<SpecialtiesRequirementsSectionProps> = ({
  form,
  onNext,
  onPrevious,
  categorySpecialties,
  expressMode = false,
}) => {
  const [specialtyInput, setSpecialtyInput] = useState<string>('');
  const [requirementInput, setRequirementInput] = useState<string>('');
  
  const formValues = form.getValues();
  const industry = formValues.industry;

  // Get default specialties for the selected industry
  const getIndustrySpecialties = (): string[] => {
    if (categorySpecialties && categorySpecialties.length > 0) {
      return categorySpecialties;
    }
    
    if (industry && industry in beautySpecialties) {
      return beautySpecialties[industry as keyof typeof beautySpecialties] || [];
    }
    
    return [];
  };
  
  const industrySpecialties = getIndustrySpecialties();
  
  // Handle adding a specialty to the form
  const handleAddSpecialty = (specialty: string) => {
    const trimmedSpecialty = specialty.trim();
    if (!trimmedSpecialty) return;
    
    const currentSpecialties = Array.isArray(form.getValues().specialties) 
      ? [...form.getValues().specialties as string[]] 
      : [];
    
    // Don't add duplicates
    if (currentSpecialties.includes(trimmedSpecialty)) return;
    
    form.setValue('specialties', [...currentSpecialties, trimmedSpecialty]);
    setSpecialtyInput('');
  };
  
  // Handle adding a requirement to the form
  const handleAddRequirement = (requirement: string) => {
    const trimmedRequirement = requirement.trim();
    if (!trimmedRequirement) return;
    
    const currentRequirements = Array.isArray(form.getValues().requirements) 
      ? [...form.getValues().requirements as string[]] 
      : [];
    
    // Don't add duplicates
    if (currentRequirements.includes(trimmedRequirement)) return;
    
    form.setValue('requirements', [...currentRequirements, trimmedRequirement]);
    setRequirementInput('');
  };
  
  // Handle removing a specialty
  const handleRemoveSpecialty = (index: number) => {
    const currentSpecialties = Array.isArray(form.getValues().specialties) 
      ? [...form.getValues().specialties as string[]] 
      : [];
    
    currentSpecialties.splice(index, 1);
    form.setValue('specialties', currentSpecialties);
  };
  
  // Handle removing a requirement
  const handleRemoveRequirement = (index: number) => {
    const currentRequirements = Array.isArray(form.getValues().requirements) 
      ? [...form.getValues().requirements as string[]] 
      : [];
    
    currentRequirements.splice(index, 1);
    form.setValue('requirements', currentRequirements);
  };
  
  // Handle selection of a suggested specialty
  const handleSelectSuggestedSpecialty = (specialty: string) => {
    const currentSpecialties = Array.isArray(form.getValues().specialties) 
      ? [...form.getValues().specialties as string[]] 
      : [];
    
    // Don't add duplicates
    if (currentSpecialties.includes(specialty)) return;
    
    form.setValue('specialties', [...currentSpecialties, specialty]);
  };

  // Filter suggested specialties to show only those not already selected
  const suggestedSpecialties = industrySpecialties.filter(specialty => {
    const currentSpecialties = Array.isArray(form.getValues().specialties) 
      ? form.getValues().specialties as string[]
      : [];
    return !currentSpecialties.includes(specialty);
  });
  
  // Get the current specialties and requirements
  const currentSpecialties = Array.isArray(form.getValues().specialties) 
    ? form.getValues().specialties as string[] 
    : [];
  
  const currentRequirements = Array.isArray(form.getValues().requirements) 
    ? form.getValues().requirements as string[] 
    : [];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Specialties & Requirements
      </h2>
      
      {/* Specialties Section */}
      <Card>
        <CardHeader>
          <CardTitle>Job Specialties</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="specialties"
            render={() => (
              <FormItem>
                <FormLabel>Skills & Services Required</FormLabel>
                
                {/* Current Specialties */}
                <div className="mb-3">
                  {currentSpecialties.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {currentSpecialties.map((specialty, index) => (
                        <Badge 
                          key={`specialty-${index}`} 
                          className="px-2 py-1 bg-purple-100 text-purple-800 hover:bg-purple-200 border-none"
                        >
                          {specialty}
                          <button
                            type="button"
                            className="ml-1"
                            onClick={() => handleRemoveSpecialty(index)}
                          >
                            <X size={14} />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Input for adding new specialties */}
                <div className="flex gap-2 mb-4">
                  <Textarea
                    placeholder="Enter a specialty (e.g., Gel Manicure, Acrylic Nails)"
                    value={specialtyInput}
                    onChange={(e) => setSpecialtyInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSpecialty(specialtyInput);
                      }
                    }}
                    className="min-h-[80px] border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                  />
                </div>
                
                <Button
                  type="button"
                  onClick={() => handleAddSpecialty(specialtyInput)}
                  className="mb-4"
                  variant="outline"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Specialty
                </Button>
                
                {/* Suggested Specialties */}
                {suggestedSpecialties.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Suggested specialties for this position:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedSpecialties.map((specialty, index) => (
                        <Badge 
                          key={`suggested-${index}`}
                          className="px-2 py-1 bg-gray-100 text-gray-800 hover:bg-gray-200 border-none cursor-pointer"
                          onClick={() => handleSelectSuggestedSpecialty(specialty)}
                        >
                          + {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
      
      {/* Requirements Section */}
      <Card>
        <CardHeader>
          <CardTitle>Job Requirements & Benefits</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="requirements"
            render={() => (
              <FormItem>
                <FormLabel>Requirements & Benefits</FormLabel>
                
                {/* Current Requirements */}
                <div className="mb-3">
                  {currentRequirements.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {currentRequirements.map((requirement, index) => (
                        <Badge 
                          key={`requirement-${index}`} 
                          className="px-2 py-1 bg-blue-100 text-blue-800 hover:bg-blue-200 border-none"
                        >
                          {requirement}
                          <button
                            type="button"
                            className="ml-1"
                            onClick={() => handleRemoveRequirement(index)}
                          >
                            <X size={14} />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Input for adding new requirements */}
                <div className="flex gap-2 mb-4">
                  <Textarea
                    placeholder="Enter a requirement or benefit (e.g., 2+ years experience, health insurance)"
                    value={requirementInput}
                    onChange={(e) => setRequirementInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddRequirement(requirementInput);
                      }
                    }}
                    className="min-h-[80px] border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                  />
                </div>
                
                <Button
                  type="button"
                  onClick={() => handleAddRequirement(requirementInput)}
                  className="mb-4"
                  variant="outline"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Requirement
                </Button>
                
                {/* Special Benefits/Features */}
                <div className="mt-6">
                  <FormLabel>Special Benefits</FormLabel>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <FormField
                      control={form.control}
                      name="weekly_pay"
                      render={({ field }) => (
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="weekly_pay"
                            checked={field.value === true}
                            onChange={() => form.setValue('weekly_pay', !field.value)}
                            className="mr-2"
                          />
                          <label htmlFor="weekly_pay" className="text-sm">Weekly Pay</label>
                        </div>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="has_housing"
                      render={({ field }) => (
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="has_housing"
                            checked={field.value === true}
                            onChange={() => form.setValue('has_housing', !field.value)}
                            className="mr-2"
                          />
                          <label htmlFor="has_housing" className="text-sm">Housing Available</label>
                        </div>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="has_wax_room"
                      render={({ field }) => (
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="has_wax_room"
                            checked={field.value === true}
                            onChange={() => form.setValue('has_wax_room', !field.value)}
                            className="mr-2"
                          />
                          <label htmlFor="has_wax_room" className="text-sm">Wax Room Available</label>
                        </div>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="owner_will_train"
                      render={({ field }) => (
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="owner_will_train"
                            checked={field.value === true}
                            onChange={() => form.setValue('owner_will_train', !field.value)}
                            className="mr-2"
                          />
                          <label htmlFor="owner_will_train" className="text-sm">Owner Will Train</label>
                        </div>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="no_supply_deduction"
                      render={({ field }) => (
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="no_supply_deduction"
                            checked={field.value === true}
                            onChange={() => form.setValue('no_supply_deduction', !field.value)}
                            className="mr-2"
                          />
                          <label htmlFor="no_supply_deduction" className="text-sm">No Supply Deduction</label>
                        </div>
                      )}
                    />
                  </div>
                </div>
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
      
      {/* Navigation Buttons */}
      {!expressMode && (
        <div className="flex justify-between mt-6">
          {onPrevious && (
            <Button type="button" variant="outline" onClick={onPrevious}>
              Previous
            </Button>
          )}
          {onNext && (
            <Button type="button" onClick={onNext}>
              Next
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default SpecialtiesRequirementsSection;
