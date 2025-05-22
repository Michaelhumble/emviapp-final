
import React, { useState } from 'react';
import { Control } from 'react-hook-form';
import { beautySpecialties, commonRequirements } from '@/data/specialties';
import { FormField, FormItem, FormControl, FormLabel } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { JobTemplateType } from '@/utils/jobs/jobTemplates';
import { JobFormValues } from '../job/jobFormSchema';

interface SpecialtiesRequirementsSectionProps {
  control: Control<JobFormValues>;
  industry: JobTemplateType | string;
}

type IndustryTab = {
  id: string;
  label: string;
  specialties: string[];
};

const industryTabs: IndustryTab[] = [
  { id: 'nails', label: 'Nails', specialties: beautySpecialties.nails },
  { id: 'hair', label: 'Hair', specialties: beautySpecialties.hair },
  { id: 'lashes', label: 'Lashes', specialties: beautySpecialties.lashes },
  { id: 'barber', label: 'Barber', specialties: beautySpecialties.barber },
  { id: 'skincare', label: 'Skincare', specialties: beautySpecialties.skincare },
  { id: 'pmu', label: 'PMU', specialties: [] },
  { id: 'makeup', label: 'Makeup', specialties: beautySpecialties.makeup },
  { id: 'other', label: 'Other', specialties: [] },
];

// Additional specialties for receptionists and managers
const adminSpecialties = [
  'Reception', 'Client Service', 'Education', 
  'Cleaning', 'Retail', 'Product Knowledge', 
  'Scheduling', 'Management', 'Social Media'
];

const SpecialtiesRequirementsSection: React.FC<SpecialtiesRequirementsSectionProps> = ({ 
  control, 
  industry 
}) => {
  const [activeTab, setActiveTab] = useState<string>(
    industry && industryTabs.some(tab => tab.id === industry) ? industry.toString() : 'nails'
  );

  const isAdminRole = industry === 'receptionist' || industry === 'manager' || industry === 'booth';

  const getDisplaySpecialties = () => {
    if (isAdminRole) {
      return adminSpecialties;
    }
    
    const currentTab = industryTabs.find(tab => tab.id === activeTab);
    return currentTab?.specialties || [];
  };

  const specialtiesList = getDisplaySpecialties();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold font-playfair bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent">
          Job Specialties & Requirements
        </h2>
        <p className="text-gray-600 mt-2">
          Select the specific skills and requirements for this position
        </p>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-2">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 md:grid-cols-8 gap-1 bg-transparent">
            {industryTabs.map((tab) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                  activeTab === tab.id 
                    ? 'bg-white shadow-sm text-purple-700' 
                    : 'bg-transparent text-gray-600 hover:text-purple-600'
                }`}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      
      <div className="bg-white rounded-lg border p-6 shadow-sm">
        <h3 className="text-lg font-medium mb-4">Specialties Required</h3>
        
        <FormField
          control={control}
          name="specialties"
          render={({ field }) => (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {specialtiesList.map((specialty) => (
                <FormItem key={specialty} className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(specialty)}
                      onCheckedChange={(checked) => {
                        const updatedValue = checked
                          ? [...(field.value || []), specialty]
                          : (field.value || []).filter((val) => val !== specialty);
                        field.onChange(updatedValue);
                      }}
                      className="border-purple-200 text-purple-600 data-[state=checked]:bg-purple-600"
                    />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">{specialty}</FormLabel>
                </FormItem>
              ))}
            </div>
          )}
        />
        
        <Separator className="my-6" />
        
        <h3 className="text-lg font-medium mb-4">Job Requirements</h3>
        
        <FormField
          control={control}
          name="requirements"
          render={({ field }) => (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {commonRequirements.map((requirement) => (
                <FormItem key={requirement} className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(requirement)}
                      onCheckedChange={(checked) => {
                        const updatedValue = checked
                          ? [...(field.value || []), requirement]
                          : (field.value || []).filter((val) => val !== requirement);
                        field.onChange(updatedValue);
                      }}
                      className="border-purple-200 text-purple-600 data-[state=checked]:bg-purple-600"
                    />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">{requirement}</FormLabel>
                </FormItem>
              ))}
            </div>
          )}
        />
        
        {industry !== 'custom' && (
          <>
            <Separator className="my-6" />
            
            <h3 className="text-lg font-medium mb-4">Benefits Offered</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg flex justify-between items-center">
                <span className="font-medium">Housing Provided</span>
                <FormField
                  control={control}
                  name="has_housing"
                  render={({ field }) => (
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-purple-600"
                      />
                    </FormControl>
                  )}
                />
              </div>
              
              <div className="bg-gray-50 p-5 rounded-lg flex justify-between items-center">
                <span className="font-medium">Wax Room Available</span>
                <FormField
                  control={control}
                  name="has_wax_room"
                  render={({ field }) => (
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-purple-600"
                      />
                    </FormControl>
                  )}
                />
              </div>
              
              <div className="bg-gray-50 p-5 rounded-lg flex justify-between items-center">
                <span className="font-medium">Owner Will Train</span>
                <FormField
                  control={control}
                  name="owner_will_train"
                  render={({ field }) => (
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-purple-600"
                      />
                    </FormControl>
                  )}
                />
              </div>
              
              <div className="bg-gray-50 p-5 rounded-lg flex justify-between items-center">
                <span className="font-medium">No Supply Deduction</span>
                <FormField
                  control={control}
                  name="no_supply_deduction"
                  render={({ field }) => (
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-purple-600"
                      />
                    </FormControl>
                  )}
                />
              </div>
            </div>
          </>
        )}
      </div>
      
      <div className="text-sm text-gray-600 mt-2">
        Select all that apply to this position. Choose specialties and requirements to match your ideal candidate.
      </div>
    </div>
  );
};

export default SpecialtiesRequirementsSection;
