
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { MapPin, Eye, EyeOff, Shield, ArrowLeft } from 'lucide-react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { salonLocationSchema, type SalonLocationValues } from '../enhancedSalonFormSchema';

interface SalonLocationSectionProps {
  data: any;
  onSubmit: (data: SalonLocationValues) => void;
  onPrevious: () => void;
}

const SalonLocationSection = ({ data, onSubmit, onPrevious }: SalonLocationSectionProps) => {
  const form = useForm<SalonLocationValues>({
    resolver: zodResolver(salonLocationSchema),
    defaultValues: {
      address: data?.location?.address || '',
      city: data?.location?.city || '',
      state: data?.location?.state || '',
      zipCode: data?.location?.zipCode || '',
      neighborhood: data?.location?.neighborhood || '',
      hideAddressFromPublic: data?.location?.hideAddressFromPublic || false,
    },
  });

  const handleSubmit = (formData: SalonLocationValues) => {
    onSubmit({ location: formData });
  };

  const hideAddress = form.watch('hideAddressFromPublic');

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-full">
            <MapPin className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-2">
          Where is Your Salon Located?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Location is crucial for buyers. Help them understand your salon's accessibility and market area.
        </p>
      </motion.div>

      {/* Privacy Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-200"
      >
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-amber-500 mt-0.5" />
          <div>
            <h4 className="font-semibold text-amber-900">Your Privacy is Protected</h4>
            <p className="text-amber-700 text-sm">
              You can choose to show only general area (city/neighborhood) to unqualified browsers. 
              Exact address is shared only with serious, pre-screened buyers.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Street Address *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123 Main Street, Suite 100"
                      className="h-12 text-lg border-2 focus:border-green-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">City *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., San Diego"
                        className="h-12 text-lg border-2 focus:border-green-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">State *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="CA"
                        className="h-12 text-lg border-2 focus:border-green-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Zip Code *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="92101"
                        className="h-12 text-lg border-2 focus:border-green-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Neighborhood/District</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Downtown, Little Italy, Fashion Valley"
                      className="h-12 text-lg border-2 focus:border-green-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Privacy Toggle */}
            <Card className="border-2 border-dashed border-gray-300">
              <CardContent className="p-6">
                <FormField
                  control={form.control}
                  name="hideAddressFromPublic"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div className="space-y-1">
                        <FormLabel className="text-lg font-semibold flex items-center gap-2">
                          {hideAddress ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          Privacy Protection
                        </FormLabel>
                        <p className="text-sm text-gray-600">
                          {hideAddress 
                            ? "Only city and neighborhood shown publicly. Exact address shared with qualified buyers only."
                            : "Full address visible to all browsers (recommended for faster sales)."
                          }
                        </p>
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
              </CardContent>
            </Card>

            {/* Location Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-green-900 mb-2">High Traffic Area?</h4>
                  <p className="text-green-700 text-sm">
                    Mention if you're in a shopping center, near schools, or high-visibility location.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Parking Available?</h4>
                  <p className="text-blue-700 text-sm">
                    Free parking is a huge selling point for salon buyers.
                  </p>
                </CardContent>
              </Card>
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
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 text-lg"
              >
                Continue to Photos
              </Button>
            </div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
};

export default SalonLocationSection;
