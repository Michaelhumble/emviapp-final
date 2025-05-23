
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { billionDollarJobFormSchema, type BillionDollarJobFormData } from './billionDollarJobFormSchema';
import { Check } from 'lucide-react';

const BillionDollarJobForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<BillionDollarJobFormData>({
    resolver: zodResolver(billionDollarJobFormSchema),
  });

  const onSubmit = async (data: BillionDollarJobFormData) => {
    console.log('Billion Dollar Job Form submitted:', data);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-8 px-4">
      {/* Google Fonts Import */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');
        `}
      </style>
      
      <div className="max-w-2xl mx-auto">
        {/* Trust Badge */}
        <div className="flex justify-center mb-6">
          <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 text-sm font-medium shadow-lg">
            <Check className="w-4 h-4 mr-2" />
            Emvi.App Verified
          </Badge>
        </div>

        {/* Emotional Copy */}
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 italic font-light leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            "Make your beauty business stand out with a premium job post—first impressions matter."
          </p>
        </div>

        {/* Main Form Card */}
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                Premium Job Posting
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-indigo-400 mx-auto rounded-full"></div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Salon Information Section */}
              <div className="space-y-6">
                <div className="border-b border-gradient-to-r from-purple-100 to-indigo-100 pb-4">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Salon Information
                  </h2>
                  <p className="text-gray-600 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Tell us about your beautiful salon
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="salonName" className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Salon Name
                    </Label>
                    <Input
                      id="salonName"
                      {...register('salonName')}
                      placeholder="e.g., Elegance Beauty Studio"
                      className="border-gray-200 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-200"
                    />
                    {errors.salonName && (
                      <p className="text-sm text-red-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {errors.salonName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Location
                    </Label>
                    <Input
                      id="location"
                      {...register('location')}
                      placeholder="e.g., San Francisco, CA"
                      className="border-gray-200 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-200"
                    />
                    {errors.location && (
                      <p className="text-sm text-red-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {errors.location.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Job Details Section */}
              <div className="space-y-6">
                <div className="border-b border-gradient-to-r from-purple-100 to-indigo-100 pb-4">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Position Details
                  </h2>
                  <p className="text-gray-600 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Describe the perfect role for your team
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle" className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Job Title
                    </Label>
                    <Input
                      id="jobTitle"
                      {...register('jobTitle')}
                      placeholder="e.g., Senior Nail Technician"
                      className="border-gray-200 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-200"
                    />
                    {errors.jobTitle && (
                      <p className="text-sm text-red-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {errors.jobTitle.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employmentType" className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Employment Type
                    </Label>
                    <Select onValueChange={(value) => setValue('employmentType', value as any)}>
                      <SelectTrigger className="border-gray-200 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-200">
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Temporary">Temporary</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.employmentType && (
                      <p className="text-sm text-red-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {errors.employmentType.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Job Descriptions Section */}
              <div className="space-y-6">
                <div className="border-b border-gradient-to-r from-purple-100 to-indigo-100 pb-4">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Job Descriptions
                  </h2>
                  <p className="text-gray-600 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Attract the right candidates with compelling descriptions
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="jobDescription" className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Job Description (English)
                    </Label>
                    <Textarea
                      id="jobDescription"
                      {...register('jobDescription')}
                      placeholder="Describe the role, responsibilities, and what makes this opportunity special..."
                      className="min-h-[120px] border-gray-200 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-200 resize-none"
                    />
                    {errors.jobDescription && (
                      <p className="text-sm text-red-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {errors.jobDescription.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vietnameseDescription" className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Vietnamese Description
                    </Label>
                    <Textarea
                      id="vietnameseDescription"
                      {...register('vietnameseDescription')}
                      placeholder="Mô tả công việc, trách nhiệm và những điều đặc biệt của cơ hội này..."
                      className="min-h-[120px] border-gray-200 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-200 resize-none"
                    />
                    {errors.vietnameseDescription && (
                      <p className="text-sm text-red-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {errors.vietnameseDescription.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-100">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 px-8 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {isSubmitting ? 'Creating Your Premium Post...' : 'Create Premium Job Post'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BillionDollarJobForm;
