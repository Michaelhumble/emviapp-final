
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Control } from 'react-hook-form';
import { Briefcase, Building2, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface JobDetailsSectionProps {
  control: Control<any>;
}

const JobDetailsSection: React.FC<JobDetailsSectionProps> = ({ control }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 border border-purple-100 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <Briefcase className="h-5 w-5 text-white" />
          </div>
          <h2 className="font-playfair text-2xl font-bold text-gray-900">✨ You're About to Hire Amazing Talent!</h2>
        </div>
        <p className="text-gray-600 leading-relaxed">
          Join thousands of successful salon owners who found their perfect team members. Let's create a job posting that attracts the best candidates in the beauty industry.
        </p>
      </div>

      {/* Job Details Card */}
      <div className="bg-white/80 backdrop-blur-lg border border-gray-200/50 rounded-2xl p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            <Briefcase className="h-4 w-4 text-white" />
          </div>
          <h3 className="font-playfair text-xl font-semibold text-gray-900">💼 Job Details</h3>
        </div>

        <div className="space-y-6">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-900 font-medium flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-purple-500" />
                  Job Title <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Senior Hair Stylist, Nail Technician, Spa Manager"
                    className="h-12 border-2 border-gray-200 bg-white/50 backdrop-blur-sm hover:border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-xl transition-all duration-200"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={control}
              name="salonName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 font-medium flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-purple-500" />
                    Salon/Company Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Luxury Nails & Spa"
                      className="h-12 border-2 border-gray-200 bg-white/50 backdrop-blur-sm hover:border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-xl transition-all duration-200"
                      {...field}
                    />
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
                  <FormLabel className="text-gray-900 font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-purple-500" />
                    Location <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Los Angeles, CA"
                      className="h-12 border-2 border-gray-200 bg-white/50 backdrop-blur-sm hover:border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-xl transition-all duration-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="employmentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-900 font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-500" />
                  Employment Type
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 border-2 border-gray-200 bg-white/50 backdrop-blur-sm hover:border-purple-300 focus:border-purple-500 rounded-xl">
                      <SelectValue placeholder="Select employment type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white/95 backdrop-blur-lg border border-gray-200 rounded-xl">
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-900 font-medium">📝 Job Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the role, responsibilities, and what makes this opportunity special. Be specific about skills, experience, and what makes your salon a great place to work..."
                    className="min-h-[140px] border-2 border-gray-200 bg-white/50 backdrop-blur-sm hover:border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-xl transition-all duration-200 resize-none"
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
                <FormLabel className="text-gray-900 font-medium">🇻🇳 Vietnamese Description (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Mô tả công việc bằng tiếng Việt để thu hút ứng viên người Việt..."
                    className="min-h-[120px] border-2 border-gray-200 bg-white/50 backdrop-blur-sm hover:border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-xl transition-all duration-200 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Success Stories Testimonial */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6"
      >
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-lg">💚</span>
          </div>
          <div>
            <h4 className="font-semibold text-green-800 mb-2">Success Story</h4>
            <p className="text-green-700 text-sm leading-relaxed italic">
              "Within 48 hours of posting on EmviApp, I had 12 qualified applicants! I found my dream nail technician who's been with us for 8 months now. Best hiring decision ever!" 
            </p>
            <p className="text-green-600 text-xs mt-2 font-medium">- Sarah L., Luxury Nails Studio Owner</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default JobDetailsSection;
