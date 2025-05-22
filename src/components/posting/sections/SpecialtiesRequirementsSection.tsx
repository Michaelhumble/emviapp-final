
import React from 'react';
import { Control, useWatch } from 'react-hook-form';
import { JobFormValues } from '../job/jobFormSchema';
import { FormField, FormItem, FormControl, FormDescription } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';

interface SpecialtiesRequirementsSectionProps {
  control: Control<JobFormValues>;
  industry?: string;
}

// Common industry options
const industrySpecialties: Record<string, string[]> = {
  nails: [
    'Acrylic Nails', 'Gel Nails', 'Manicure', 'Pedicure', 'Nail Art', 'Nail Design',
    'Dip Powder', 'Extensions', 'Gel-X', 'Gel Polish', 'Regular Polish', 'Paraffin'
  ],
  hair: [
    'Cuts & Styling', 'Color', 'Balayage', 'Highlights', 'Extensions', 'Perms',
    'Relaxers', 'Blowouts', 'Updo', 'Brazilian Blowout', 'Keratin', 'Men\'s Cuts'
  ],
  lashes: [
    'Classic Lashes', 'Volume Lashes', 'Hybrid Lashes', 'Mega Volume', 'Lash Lifts',
    'Extensions', 'Strip Lashes', 'Lash Tinting', 'Russian Volume', 'Bottom Lashes'
  ],
  brows: [
    'Microblading', 'Powder Brows', 'Combo Brows', 'Brow Lamination', 'Brow Tinting',
    'Waxing', 'Threading', 'Shaping', 'Tweezing', 'HD Brows'
  ],
  skincare: [
    'Facials', 'Microdermabrasion', 'Chemical Peels', 'Dermaplaning', 'Microneedling',
    'Face Massage', 'Acne Treatment', 'Anti-Aging', 'Extractions', 'LED Therapy'
  ],
  massage: [
    'Swedish', 'Deep Tissue', 'Hot Stone', 'Thai', 'Reflexology',
    'Sports', 'Prenatal', 'Aromatherapy', 'Couples Massage', 'Foot Massage'
  ],
  tattoo: [
    'Traditional', 'Realism', 'Blackwork', 'Watercolor', 'Japanese',
    'Neo-Traditional', 'American Traditional', 'Lettering', 'Geometric', 'Cover-ups'
  ],
  barber: [
    'Haircuts', 'Fades', 'Shaves', 'Beard Trims', 'Hot Towel Treatment',
    'Line-ups', 'Designs', 'Color', 'Skin Fades', 'Pompadours'
  ],
  makeup: [
    'Bridal', 'Special Event', 'Editorial', 'Natural Looks', 'Glam',
    'Airbrush', 'HD Makeup', 'Contouring', 'Halloween/SFX', 'Lessons'
  ],
  custom: [
    'Customize Your Own', 'Other Skills', 'Specialty Services'
  ]
};

// Common requirements across industries
const commonRequirements = [
  'License Required', 'Experience Required', 'English Speaking', 'Vietnamese Speaking',
  'Weekend Availability', 'Flexible Schedule', 'Transportation Required', 'Full-Time Available',
  'Part-Time Available', 'Commission Based'
];

const SpecialtiesRequirementsSection: React.FC<SpecialtiesRequirementsSectionProps> = ({ control, industry = 'custom' }) => {
  const currentSpecialties = useWatch({ control, name: 'specialties' }) || [];
  const currentRequirements = useWatch({ control, name: 'requirements' }) || [];
  const [activeTab, setActiveTab] = React.useState(industry !== 'custom' ? industry : 'nails');

  // Get the appropriate specialties based on the industry
  const getSpecialties = () => {
    return industrySpecialties[activeTab] || industrySpecialties.custom;
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">Specialties & Requirements</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Select the specialties and requirements for this position
        </p>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 mb-4">
          <TabsTrigger value="nails">Nails</TabsTrigger>
          <TabsTrigger value="hair">Hair</TabsTrigger>
          <TabsTrigger value="lashes">Lashes</TabsTrigger>
          <TabsTrigger value="brows">Brows</TabsTrigger>
          <TabsTrigger value="skincare">Skincare</TabsTrigger>
          <TabsTrigger value="massage">Massage</TabsTrigger>
          <TabsTrigger value="tattoo">Tattoo</TabsTrigger>
          <TabsTrigger value="barber">Barber</TabsTrigger>
          <TabsTrigger value="makeup">Makeup</TabsTrigger>
        </TabsList>

        {/* Each tab has the same structure but different values */}
        {Object.keys(industrySpecialties).map((tabKey) => (
          <TabsContent key={tabKey} value={tabKey} className="space-y-6">
            {/* Specialties Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-purple-700 mb-4">Specialties</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {industrySpecialties[tabKey].map((specialty) => (
                  <FormField
                    key={specialty}
                    control={control}
                    name="specialties"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(specialty)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([...field.value || [], specialty]);
                              } else {
                                field.onChange(field.value?.filter((value: string) => value !== specialty));
                              }
                            }}
                          />
                        </FormControl>
                        <label className="text-sm cursor-pointer">{specialty}</label>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Requirements Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-purple-700 mb-4">Job Requirements</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {commonRequirements.map((requirement) => (
                  <FormField
                    key={requirement}
                    control={control}
                    name="requirements"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(requirement)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([...field.value || [], requirement]);
                              } else {
                                field.onChange(field.value?.filter((value: string) => value !== requirement));
                              }
                            }}
                          />
                        </FormControl>
                        <label className="text-sm cursor-pointer">{requirement}</label>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-purple-700 mb-4">Position Benefits</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="has_housing"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium cursor-pointer">Housing Available</label>
                        <FormDescription className="text-xs">
                          Housing is provided for this position
                        </FormDescription>
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
                    <FormItem className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium cursor-pointer">Will Train</label>
                        <FormDescription className="text-xs">
                          Owner will provide training
                        </FormDescription>
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
                    <FormItem className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium cursor-pointer">Wax Room Available</label>
                        <FormDescription className="text-xs">
                          Dedicated waxing room is available
                        </FormDescription>
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
                    <FormItem className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium cursor-pointer">No Supply Deduction</label>
                        <FormDescription className="text-xs">
                          Supplies provided without fee deduction
                        </FormDescription>
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
                  name="weekly_pay"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium cursor-pointer">Weekly Pay</label>
                        <FormDescription className="text-xs">
                          Pay is distributed weekly
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value === 'true'}
                          onCheckedChange={(checked) => field.onChange(checked ? 'true' : 'false')}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="py-2 px-4 bg-blue-50 rounded-md border border-blue-100 text-sm text-blue-700">
              <p>Select all that apply to this position. Choose specialties and requirements to match your ideal candidate.</p>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SpecialtiesRequirementsSection;
