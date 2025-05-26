
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { enhancedSalonFormSchema, type EnhancedSalonFormValues } from '../enhancedSalonFormSchema';
import { SalonSectionProps } from '../types';

const SalonLocationSection = ({ data, onSubmit, onPrevious }: SalonSectionProps) => {
  const form = useForm<EnhancedSalonFormValues>({
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

  const { register, handleSubmit, watch, setValue, formState: { errors, isValid } } = form;
  const hideAddress = watch('hideAddressFromPublic');

  const onFormSubmit = (formData: EnhancedSalonFormValues) => {
    const locationData = {
      location: {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        neighborhood: formData.neighborhood,
        hideAddressFromPublic: formData.hideAddressFromPublic,
      }
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
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-full">
            <MapPin className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-2">
          Where is your salon located?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Help buyers find your salon. You can choose to hide your exact address for privacy.
        </p>
      </motion.div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                Street Address *
              </Label>
              <Input
                id="address"
                placeholder="123 Main Street"
                {...register('address')}
                className={errors.address ? 'border-red-300' : ''}
              />
              {errors.address && (
                <p className="text-sm text-red-600 mt-1">{errors.address.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                  City *
                </Label>
                <Input
                  id="city"
                  placeholder="New York"
                  {...register('city')}
                  className={errors.city ? 'border-red-300' : ''}
                />
                {errors.city && (
                  <p className="text-sm text-red-600 mt-1">{errors.city.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                  State *
                </Label>
                <Input
                  id="state"
                  placeholder="NY"
                  {...register('state')}
                  className={errors.state ? 'border-red-300' : ''}
                />
                {errors.state && (
                  <p className="text-sm text-red-600 mt-1">{errors.state.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="zipCode" className="text-sm font-medium text-gray-700">
                  ZIP Code *
                </Label>
                <Input
                  id="zipCode"
                  placeholder="10001"
                  {...register('zipCode')}
                  className={errors.zipCode ? 'border-red-300' : ''}
                />
                {errors.zipCode && (
                  <p className="text-sm text-red-600 mt-1">{errors.zipCode.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="neighborhood" className="text-sm font-medium text-gray-700">
                Neighborhood (Optional)
              </Label>
              <Input
                id="neighborhood"
                placeholder="SoHo, Downtown, etc."
                {...register('neighborhood')}
              />
              <p className="text-xs text-gray-500 mt-1">
                Help buyers identify the area more easily
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-100"
        >
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-purple-600 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Privacy Protection</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Hide your exact address from public listings. Buyers will see only the neighborhood.
                  </p>
                </div>
                <Switch
                  checked={hideAddress}
                  onCheckedChange={(checked) => setValue('hideAddressFromPublic', checked)}
                />
              </div>
              {hideAddress && (
                <div className="mt-3 p-3 bg-white rounded-md border border-purple-200">
                  <p className="text-xs text-purple-700">
                    ✓ Your exact address will be shared only with verified, interested buyers
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

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
            disabled={!isValid}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 text-lg"
          >
            Continue to Photos
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SalonLocationSection;
