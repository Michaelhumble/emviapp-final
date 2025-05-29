
import React from 'react';
import { motion } from 'framer-motion';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { MapPin, Shield, Star } from 'lucide-react';
import { SalonFormValues } from '../salonFormSchema';

interface SalonLocationStepProps {
  form: UseFormReturn<SalonFormValues>;
}

const SalonLocationStep: React.FC<SalonLocationStepProps> = ({ form }) => {
  const { register, watch, setValue, formState: { errors } } = form;
  const hideExactAddress = watch('hideExactAddress');

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
          <MapPin className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
          Where is your salon located?
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Help buyers find your beautiful salon with accurate location details
        </p>
      </motion.div>

      {/* Location Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-blue-500" />
              Salon Address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Street Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                Street Address *
              </Label>
              <Input
                id="address"
                {...register('address')}
                placeholder="123 Main Street, Suite 100"
                className="h-12 text-base border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
              )}
            </div>

            {/* City and State Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                  City *
                </Label>
                <Input
                  id="city"
                  {...register('city')}
                  placeholder="San Francisco"
                  className="h-12 text-base border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                  State *
                </Label>
                <Input
                  id="state"
                  {...register('state')}
                  placeholder="California"
                  className="h-12 text-base border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl"
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
                )}
              </div>
            </div>

            {/* Zip Code and Neighborhood Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zipCode" className="text-sm font-medium text-gray-700">
                  ZIP Code
                </Label>
                <Input
                  id="zipCode"
                  {...register('zipCode')}
                  placeholder="94102"
                  className="h-12 text-base border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="neighborhood" className="text-sm font-medium text-gray-700">
                  Neighborhood
                </Label>
                <Input
                  id="neighborhood"
                  {...register('neighborhood')}
                  placeholder="Downtown, Mission Bay"
                  className="h-12 text-base border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Privacy Options */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-pink-50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-purple-500" />
              Privacy & Safety
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-purple-100">
              <Checkbox
                id="hideExactAddress"
                checked={hideExactAddress}
                onCheckedChange={(checked) => setValue('hideExactAddress', checked as boolean)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label
                  htmlFor="hideExactAddress"
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                  Hide exact address from public listing
                </Label>
                <p className="text-xs text-gray-500 mt-1">
                  Show only city and neighborhood to protect your privacy. Exact address will be shared with serious buyers only.
                </p>
              </div>
            </div>

            {hideExactAddress && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 rounded-xl bg-blue-50 border border-blue-200"
              >
                <div className="flex items-start space-x-2">
                  <Star className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium">Privacy Protection Enabled</p>
                    <p className="text-xs mt-1">
                      Your listing will show "{watch('city')}, {watch('state')}" instead of the full address.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SalonLocationStep;
