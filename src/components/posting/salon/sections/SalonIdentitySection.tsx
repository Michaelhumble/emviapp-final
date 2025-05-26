
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, ArrowRight } from 'lucide-react';
import { enhancedSalonFormSchema, EnhancedSalonFormValues } from '../enhancedSalonFormSchema';

interface SalonIdentitySectionProps {
  data: Partial<EnhancedSalonFormValues>;
  onSubmit: (data: Partial<EnhancedSalonFormValues>) => void;
}

const SalonIdentitySection = ({ data, onSubmit }: SalonIdentitySectionProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<Partial<EnhancedSalonFormValues>>({
    resolver: zodResolver(enhancedSalonFormSchema.partial()),
    defaultValues: {
      salonName: data.salonName || '',
      businessType: data.businessType || '',
      establishedYear: data.establishedYear || '',
    }
  });

  const businessType = watch('businessType');

  const onFormSubmit = (formData: Partial<EnhancedSalonFormValues>) => {
    onSubmit(formData);
  };

  const businessTypes = [
    'Full Service Salon',
    'Nail Salon',
    'Hair Salon',
    'Spa & Wellness',
    'Barbershop',
    'Beauty Boutique',
    'Massage Therapy',
    'Lash & Brow Studio',
    'Other'
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Building2 className="h-8 w-8 text-purple-600" />
        </div>
        <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-2">
          Tell Us About Your Salon
        </h2>
        <p className="text-gray-600">
          Start with the basics - we'll help you create an amazing listing
        </p>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        {/* Salon Name */}
        <div className="space-y-2">
          <Label htmlFor="salonName" className="text-sm font-medium">
            Salon Name *
          </Label>
          <Input
            id="salonName"
            {...register('salonName')}
            placeholder="Enter your salon name"
            className="h-12"
          />
          {errors.salonName && (
            <p className="text-sm text-red-600">{errors.salonName.message}</p>
          )}
        </div>

        {/* Business Type */}
        <div className="space-y-2">
          <Label htmlFor="businessType" className="text-sm font-medium">
            Business Type *
          </Label>
          <Select
            value={businessType}
            onValueChange={(value) => setValue('businessType', value)}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select your business type" />
            </SelectTrigger>
            <SelectContent>
              {businessTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.businessType && (
            <p className="text-sm text-red-600">{errors.businessType.message}</p>
          )}
        </div>

        {/* Established Year */}
        <div className="space-y-2">
          <Label htmlFor="establishedYear" className="text-sm font-medium">
            Year Established (Optional)
          </Label>
          <Input
            id="establishedYear"
            {...register('establishedYear')}
            placeholder="e.g., 2015"
            className="h-12"
          />
        </div>

        {/* Logo Upload Placeholder */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Logo (Optional)
          </Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <p className="text-gray-500">Logo upload will be available in the next step</p>
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-end pt-6">
          <Button
            type="submit"
            disabled={!isValid}
            className="flex items-center bg-purple-600 hover:bg-purple-700"
          >
            Continue
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SalonIdentitySection;
