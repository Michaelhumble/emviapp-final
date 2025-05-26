
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft, MessageCircle, Users } from 'lucide-react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { salonAboutSchema, type SalonAboutValues } from '../enhancedSalonFormSchema';

interface SalonAboutSectionProps {
  data: any;
  onSubmit: (data: SalonAboutValues) => void;
  onPrevious: () => void;
}

const SalonAboutSection = ({ data, onSubmit, onPrevious }: SalonAboutSectionProps) => {
  const form = useForm<SalonAboutValues>({
    resolver: zodResolver(salonAboutSchema),
    defaultValues: {
      description: data?.about?.description || '',
      reasonForSelling: data?.about?.reasonForSelling || '',
      ownerNote: data?.about?.ownerNote || '',
      yearsInBusiness: data?.about?.yearsInBusiness || '',
    },
  });

  const handleSubmit = (formData: SalonAboutValues) => {
    onSubmit({ about: formData });
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
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-full">
            <Heart className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-2">
          Tell Your Salon's Story
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Share what makes your salon special and why you've decided to sell. Personal stories create emotional connections with buyers.
        </p>
      </motion.div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Salon Description *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your salon's atmosphere, services, clientele, and what makes it unique. What would you want potential buyers to know about this business?"
                      className="min-h-32 text-lg border-2 focus:border-orange-500 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <p className="text-sm text-gray-600">
                    {field.value?.length || 0} characters (minimum 50)
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <FormField
              control={form.control}
              name="reasonForSelling"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Why Are You Selling? *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Be honest and transparent. Common reasons: retirement, relocation, new business venture, health reasons, etc."
                      className="min-h-24 text-lg border-2 focus:border-orange-500 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <FormField
                control={form.control}
                name="yearsInBusiness"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Years in Business</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 8 years"
                        className="h-12 text-lg border-2 focus:border-orange-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <FormField
              control={form.control}
              name="ownerNote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Personal Note to Buyers (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share a personal message about your hopes for the salon's future, what kind of buyer you're looking for, or any special requests."
                      className="min-h-24 text-lg border-2 focus:border-orange-500 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          {/* Storytelling Tips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  What Buyers Want to Know:
                </h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Client demographics & loyalty</li>
                  <li>• Special services or niches</li>
                  <li>• Community reputation</li>
                  <li>• Growth opportunities</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-green-900 mb-2">💡 Pro Tips:</h4>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Be authentic and honest</li>
                  <li>• Highlight unique selling points</li>
                  <li>• Mention any awards or recognition</li>
                  <li>• Show passion for the business</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

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
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 text-lg"
            >
              Continue to Performance
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SalonAboutSection;
