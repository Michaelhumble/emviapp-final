
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Building, Upload, Star, Crown } from 'lucide-react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { salonIdentitySchema, type SalonIdentityValues } from '../enhancedSalonFormSchema';

interface SalonIdentitySectionProps {
  data: any;
  onSubmit: (data: SalonIdentityValues) => void;
  onNext: () => void;
}

const SalonIdentitySection = ({ data, onSubmit }: SalonIdentitySectionProps) => {
  const form = useForm<SalonIdentityValues>({
    resolver: zodResolver(salonIdentitySchema),
    defaultValues: {
      salonName: data?.identity?.salonName || '',
      businessType: data?.identity?.businessType || '',
      establishedYear: data?.identity?.establishedYear || '',
    },
  });

  const handleSubmit = (formData: SalonIdentityValues) => {
    onSubmit({ identity: formData });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-full">
            <Building className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-2">
          Tell Us About Your Salon
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Start by sharing your salon's identity. This information helps potential buyers understand your brand and legacy.
        </p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            <Crown className="w-3 h-3 mr-1" />
            Premium listings get 5x more views
          </Badge>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="salonName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Salon Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Bella Vista Nails & Spa"
                        className="h-12 text-lg border-2 focus:border-purple-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="businessType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Business Type *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-lg border-2 focus:border-purple-500">
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        <SelectItem value="nails">Nail Salon</SelectItem>
                        <SelectItem value="hair">Hair Salon</SelectItem>
                        <SelectItem value="barbershop">Barbershop</SelectItem>
                        <SelectItem value="spa">Day Spa & Wellness</SelectItem>
                        <SelectItem value="beauty">Full Service Beauty</SelectItem>
                        <SelectItem value="lashes">Lashes & Brows</SelectItem>
                        <SelectItem value="massage">Massage Therapy</SelectItem>
                        <SelectItem value="other">Other Beauty Business</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="establishedYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Year Established</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., 2015"
                      className="h-12 text-lg border-2 focus:border-purple-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Logo Upload Section */}
            <Card className="border-dashed border-2 border-purple-300 bg-purple-50/50">
              <CardContent className="p-6">
                <div className="text-center">
                  <Upload className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Upload Your Salon Logo (Optional)
                  </h3>
                  <p className="text-gray-600 mb-4">
                    A professional logo increases buyer interest by 40%
                  </p>
                  <Button type="button" variant="outline" className="border-purple-300">
                    Choose Logo File
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Pro Tip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200"
            >
              <div className="flex items-start gap-3">
                <Star className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900">Pro Tip</h4>
                  <p className="text-blue-700 text-sm">
                    Salons with established brands and clear identity sell 60% faster. Make sure your salon name 
                    reflects your specialty and target market.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <Button
                type="submit"
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-8 py-3 text-lg"
              >
                Continue to Location
              </Button>
            </div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
};

export default SalonIdentitySection;
