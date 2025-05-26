
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, ArrowLeft, ArrowRight } from 'lucide-react';
import { enhancedSalonFormSchema, type EnhancedSalonFormValues } from '../enhancedSalonFormSchema';
import { SalonSectionProps } from '../types';

const SalonLocationSection = ({ data, onSubmit, onPrevious }: SalonSectionProps) => {
  const form = useForm<EnhancedSalonFormValues>({
    resolver: zodResolver(enhancedSalonFormSchema),
    defaultValues: {
      address: data.address || '',
      city: data.city || '',
      state: data.state || '',
      zipCode: data.zipCode || '',
      neighborhood: data.neighborhood || '',
      hideAddressFromPublic: data.hideAddressFromPublic || false,
    },
  });

  const handleSubmit = (values: EnhancedSalonFormValues) => {
    onSubmit(values);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-purple-100 rounded-full">
            <MapPin className="h-6 w-6 text-purple-600" />
          </div>
        </div>
        <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-2">
          Location Details
        </h2>
        <p className="text-lg text-gray-600">
          Help buyers find your salon by providing accurate location information
        </p>
      </div>

      {/* Form */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-8">
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Address */}
            <div>
              <Label htmlFor="address" className="text-sm font-medium text-gray-700 mb-2 block">
                Business Address *
              </Label>
              <Input
                id="address"
                {...form.register('address')}
                placeholder="123 Main Street"
                className="h-12 text-base"
              />
              {form.formState.errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.address.message}
                </p>
              )}
            </div>

            {/* City, State, ZIP Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city" className="text-sm font-medium text-gray-700 mb-2 block">
                  City *
                </Label>
                <Input
                  id="city"
                  {...form.register('city')}
                  placeholder="City"
                  className="h-12 text-base"
                />
                {form.formState.errors.city && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.city.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="state" className="text-sm font-medium text-gray-700 mb-2 block">
                  State *
                </Label>
                <Input
                  id="state"
                  {...form.register('state')}
                  placeholder="State"
                  className="h-12 text-base"
                />
                {form.formState.errors.state && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.state.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="zipCode" className="text-sm font-medium text-gray-700 mb-2 block">
                  ZIP Code *
                </Label>
                <Input
                  id="zipCode"
                  {...form.register('zipCode')}
                  placeholder="12345"
                  className="h-12 text-base"
                />
                {form.formState.errors.zipCode && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.zipCode.message}
                  </p>
                )}
              </div>
            </div>

            {/* Neighborhood */}
            <div>
              <Label htmlFor="neighborhood" className="text-sm font-medium text-gray-700 mb-2 block">
                Neighborhood (Optional)
              </Label>
              <Input
                id="neighborhood"
                {...form.register('neighborhood')}
                placeholder="Downtown, Midtown, etc."
                className="h-12 text-base"
              />
              <p className="text-sm text-gray-500 mt-1">
                Help buyers understand the area your salon is located in
              </p>
            </div>

            {/* Privacy Toggle */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="hideAddressFromPublic" className="text-sm font-medium text-gray-700">
                    Hide Address from Public Listing
                  </Label>
                  <p className="text-sm text-gray-500 mt-1">
                    Only show city and state publicly. Full address will be shared with serious inquiries only.
                  </p>
                </div>
                <Switch
                  id="hideAddressFromPublic"
                  checked={form.watch('hideAddressFromPublic')}
                  onCheckedChange={(checked) => form.setValue('hideAddressFromPublic', checked)}
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onPrevious}
                className="flex items-center gap-2 px-6 py-3"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>

              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 flex items-center gap-2"
              >
                Next Step
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SalonLocationSection;
