
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { MapPin, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { enhancedSalonFormSchema, type EnhancedSalonFormValues } from '../enhancedSalonFormSchema';
import { SalonSectionProps } from '../types';

const SalonLocationSection = ({ data, onSubmit, onPrevious }: SalonSectionProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<EnhancedSalonFormValues>({
    resolver: zodResolver(enhancedSalonFormSchema),
    defaultValues: {
      address: data.location?.address || '',
      city: data.location?.city || '',
      state: data.location?.state || '',
      zipCode: data.location?.zipCode || '',
      neighborhood: data.location?.neighborhood || '',
      hideAddressFromPublic: data.location?.hideAddressFromPublic || false,
    },
  });

  const hideAddressFromPublic = watch('hideAddressFromPublic');

  const onFormSubmit = (formData: EnhancedSalonFormValues) => {
    const locationData = {
      location: {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        neighborhood: formData.neighborhood,
        hideAddressFromPublic: formData.hideAddressFromPublic,
      },
    };
    onSubmit(locationData);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full">
            <MapPin className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-2">
          Location Details
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Help buyers find your salon and understand your location advantages
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit(onFormSubmit)}
        className="space-y-6"
      >
        {/* Address */}
        <div className="space-y-2">
          <Label htmlFor="address" className="text-gray-700 font-medium">
            Street Address *
          </Label>
          <Input
            id="address"
            {...register('address')}
            placeholder="123 Main Street"
            className="h-12 text-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>

        {/* City, State, Zip Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city" className="text-gray-700 font-medium">
              City *
            </Label>
            <Input
              id="city"
              {...register('city')}
              placeholder="Los Angeles"
              className="h-12 text-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500"
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="state" className="text-gray-700 font-medium">
              State *
            </Label>
            <Input
              id="state"
              {...register('state')}
              placeholder="CA"
              className="h-12 text-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500"
            />
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="zipCode" className="text-gray-700 font-medium">
              ZIP Code *
            </Label>
            <Input
              id="zipCode"
              {...register('zipCode')}
              placeholder="90210"
              className="h-12 text-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500"
            />
            {errors.zipCode && (
              <p className="text-red-500 text-sm">{errors.zipCode.message}</p>
            )}
          </div>
        </div>

        {/* Neighborhood */}
        <div className="space-y-2">
          <Label htmlFor="neighborhood" className="text-gray-700 font-medium">
            Neighborhood
            <span className="text-gray-500 text-sm ml-1">(Optional)</span>
          </Label>
          <Input
            id="neighborhood"
            {...register('neighborhood')}
            placeholder="Beverly Hills, Downtown, etc."
            className="h-12 text-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500"
          />
          <p className="text-gray-500 text-sm">
            Help buyers understand the area and local advantages
          </p>
        </div>

        {/* Privacy Toggle */}
        <div className="bg-gray-50 p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-gray-700 font-medium">
                Address Privacy
              </Label>
              <p className="text-gray-500 text-sm">
                Hide exact address from public listings until serious inquiries
              </p>
            </div>
            <Switch
              checked={hideAddressFromPublic}
              onCheckedChange={(checked) => setValue('hideAddressFromPublic', checked)}
              className="data-[state=checked]:bg-purple-500"
            />
          </div>
          {hideAddressFromPublic && (
            <div className="mt-3 p-3 bg-blue-50 rounded border border-blue-200">
              <p className="text-blue-700 text-sm">
                ✓ Only city and neighborhood will be shown publicly. Full address revealed to qualified buyers.
              </p>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={onPrevious}
            className="px-8 py-3"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            type="submit"
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-lg"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </motion.form>
    </div>
  );
};

export default SalonLocationSection;
