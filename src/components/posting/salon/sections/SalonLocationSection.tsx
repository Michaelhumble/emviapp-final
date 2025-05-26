
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { MapPin, ArrowLeft, ArrowRight } from 'lucide-react';
import { enhancedSalonFormSchema, EnhancedSalonFormValues } from '../enhancedSalonFormSchema';

interface SalonLocationSectionProps {
  data: Partial<EnhancedSalonFormValues>;
  onSubmit: (data: Partial<EnhancedSalonFormValues>) => void;
  onPrevious?: () => void;
}

const SalonLocationSection = ({ data, onSubmit, onPrevious }: SalonLocationSectionProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<Partial<EnhancedSalonFormValues>>({
    resolver: zodResolver(enhancedSalonFormSchema.partial()),
    defaultValues: {
      address: data.address || '',
      city: data.city || '',
      state: data.state || '',
      zipCode: data.zipCode || '',
      neighborhood: data.neighborhood || '',
      hideAddressFromPublic: data.hideAddressFromPublic || false,
    }
  });

  const hideAddressFromPublic = watch('hideAddressFromPublic');

  const onFormSubmit = (formData: Partial<EnhancedSalonFormValues>) => {
    onSubmit(formData);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <MapPin className="h-8 w-8 text-purple-600" />
        </div>
        <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-2">
          Location Details
        </h2>
        <p className="text-gray-600">
          Help buyers find your salon with accurate location information
        </p>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        {/* Address */}
        <div className="space-y-2">
          <Label htmlFor="address" className="text-sm font-medium">
            Street Address *
          </Label>
          <Input
            id="address"
            {...register('address')}
            placeholder="123 Main Street"
            className="h-12"
          />
          {errors.address && (
            <p className="text-sm text-red-600">{errors.address.message}</p>
          )}
        </div>

        {/* City, State, Zip in a grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city" className="text-sm font-medium">
              City *
            </Label>
            <Input
              id="city"
              {...register('city')}
              placeholder="New York"
              className="h-12"
            />
            {errors.city && (
              <p className="text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="state" className="text-sm font-medium">
              State *
            </Label>
            <Input
              id="state"
              {...register('state')}
              placeholder="NY"
              className="h-12"
            />
            {errors.state && (
              <p className="text-sm text-red-600">{errors.state.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="zipCode" className="text-sm font-medium">
              ZIP Code *
            </Label>
            <Input
              id="zipCode"
              {...register('zipCode')}
              placeholder="10001"
              className="h-12"
            />
            {errors.zipCode && (
              <p className="text-sm text-red-600">{errors.zipCode.message}</p>
            )}
          </div>
        </div>

        {/* Neighborhood */}
        <div className="space-y-2">
          <Label htmlFor="neighborhood" className="text-sm font-medium">
            Neighborhood (Optional)
          </Label>
          <Input
            id="neighborhood"
            {...register('neighborhood')}
            placeholder="Manhattan, Downtown, etc."
            className="h-12"
          />
        </div>

        {/* Privacy Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="space-y-1">
            <Label className="text-sm font-medium">Address Privacy</Label>
            <p className="text-sm text-gray-600">
              Hide exact address from public listings for privacy
            </p>
          </div>
          <Switch
            checked={hideAddressFromPublic}
            onCheckedChange={(checked) => setValue('hideAddressFromPublic', checked)}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          {onPrevious && (
            <Button
              type="button"
              variant="outline"
              onClick={onPrevious}
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
          )}
          
          <Button
            type="submit"
            disabled={!isValid}
            className="ml-auto flex items-center bg-purple-600 hover:bg-purple-700"
          >
            Continue
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SalonLocationSection;
