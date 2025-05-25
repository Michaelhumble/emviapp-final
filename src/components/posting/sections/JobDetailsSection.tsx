
import React from 'react';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, MapPin, Briefcase } from 'lucide-react';

interface JobDetailsSectionProps {
  control: Control<any>;
}

const JobDetailsSection: React.FC<JobDetailsSectionProps> = ({ control }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="font-playfair text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Create Your Perfect Job Listing ✨
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Share the details that will attract the right candidates to your team
        </p>
      </div>

      {/* Job Details Card */}
      <Card className="bg-white/80 backdrop-blur-lg border border-gray-200/50 shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <Briefcase className="h-4 w-4 text-white" />
            </div>
            <h2 className="font-playfair text-2xl font-semibold text-gray-900">Job Details</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-700">Job Title *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Senior Hair Stylist" 
                      className="h-12 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="salonName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-700">Salon/Business Name *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input 
                        placeholder="e.g., Beauty Paradise Salon" 
                        className="h-12 pl-10 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-700">Location *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input 
                        placeholder="e.g., Los Angeles, CA" 
                        className="h-12 pl-10 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="employmentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-700">Employment Type *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 border-gray-200 focus:border-purple-400 focus:ring-purple-400">
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                      <SelectItem value="booth-rental">Booth Rental</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-6 space-y-6">
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-700">Job Description *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the role, responsibilities, and what makes your salon special..."
                      className="min-h-[120px] border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="vietnameseDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-700">Vietnamese Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Mô tả công việc bằng tiếng Việt để thu hút ứng viên người Việt..."
                      className="min-h-[120px] border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobDetailsSection;
