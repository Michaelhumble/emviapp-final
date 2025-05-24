
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import PhotoUploader from '@/components/posting/PhotoUploader';
import { singlePageJobFormSchema, type SinglePageJobFormData } from './billionDollarJobFormSchema';
import { ArrowLeft, Star, Shield, Heart, Camera, Briefcase, MapPin, DollarSign, FileText, Users } from 'lucide-react';

interface ConsolidatedJobFormProps {
  selectedProfession: string;
  onSubmit: (data: SinglePageJobFormData & { photoUploads?: File[] }) => void;
  onBack: () => void;
  isSubmitting: boolean;
}

const ConsolidatedJobForm: React.FC<ConsolidatedJobFormProps> = ({
  selectedProfession,
  onSubmit,
  onBack,
  isSubmitting
}) => {
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [benefits, setBenefits] = useState<string[]>([]);
  const [newBenefit, setNewBenefit] = useState('');

  const form = useForm<SinglePageJobFormData>({
    resolver: zodResolver(singlePageJobFormSchema),
    defaultValues: {
      profession: selectedProfession,
      salonName: '',
      location: '',
      employmentType: 'Full-time',
      compensationType: 'hourly',
      compensationDetails: '',
      jobDescriptionEnglish: '',
      jobDescriptionVietnamese: selectedProfession === 'nail-tech' ? 'Khách sang, tip cao, giá nails cao, khu Mỹ trắng, chủ dễ thương' : '',
      benefits: [],
      contactName: '',
      contactPhone: '',
      contactEmail: '',
    },
  });

  const handleFormSubmit = (data: SinglePageJobFormData) => {
    onSubmit({
      ...data,
      benefits,
      photoUploads
    });
  };

  const addBenefit = () => {
    if (newBenefit.trim() && !benefits.includes(newBenefit.trim())) {
      setBenefits([...benefits, newBenefit.trim()]);
      setNewBenefit('');
    }
  };

  const removeBenefit = (benefit: string) => {
    setBenefits(benefits.filter(b => b !== benefit));
  };

  const professionTitle = selectedProfession.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-white to-purple-50/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-purple-600" />
              <Badge className="bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 border-purple-200 font-medium">
                Verified Emvi.App
              </Badge>
            </div>
            
            <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent leading-tight"
                style={{ textShadow: '0 2px 4px rgba(147, 51, 234, 0.1)' }}>
              Your Dream Team Starts Here — Create a Job Post That Attracts the Best in the Beauty Industry
            </h1>
            
            <p className="font-inter text-lg text-gray-700 mb-6 max-w-3xl mx-auto leading-relaxed">
              Posting for: <span className="font-semibold text-purple-600">{professionTitle}</span>
            </p>

            <div className="flex items-center justify-center gap-2 text-purple-600 mb-8">
              <Heart className="w-5 h-5 text-red-500" />
              <p className="font-inter text-sm italic text-gray-600">
                "EmviApp helped us hire the perfect artist in just 3 days!" — Maria's Salon
              </p>
            </div>

            <Button
              type="button"
              variant="ghost"
              onClick={onBack}
              className="mb-8 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Templates
            </Button>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
              
              {/* Basic Information Section */}
              <Card className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="font-playfair text-2xl font-semibold text-purple-600">Basic Information</h2>
                      <p className="font-inter text-sm text-gray-600">Let's start with the essentials</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="salonName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-inter font-medium text-gray-900">Salon Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your salon's name"
                              className="h-12 border-gray-300 bg-white hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg font-inter"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-inter font-medium text-gray-900">Location</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="City, State"
                              className="h-12 border-gray-300 bg-white hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg font-inter"
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
                    name="employmentType"
                    render={({ field }) => (
                      <FormItem className="mt-6">
                        <FormLabel className="font-inter font-medium text-gray-900">Employment Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 border-gray-300 bg-white hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg font-inter">
                              <SelectValue placeholder="Select employment type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
                            <SelectItem value="Full-time">Full-time</SelectItem>
                            <SelectItem value="Part-time">Part-time</SelectItem>
                            <SelectItem value="Contract">Contract</SelectItem>
                            <SelectItem value="Temporary">Temporary</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Compensation Section */}
              <Card className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h2 className="font-playfair text-2xl font-semibold text-green-600">Compensation & Perks</h2>
                      <p className="font-inter text-sm text-gray-600">Attract top talent with competitive pay</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="compensationType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-inter font-medium text-gray-900">Compensation Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 border-gray-300 bg-white hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg font-inter">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
                              <SelectItem value="hourly">Hourly</SelectItem>
                              <SelectItem value="commission">Commission</SelectItem>
                              <SelectItem value="salary">Salary</SelectItem>
                              <SelectItem value="per_service">Per Service</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="compensationDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-inter font-medium text-gray-900">Compensation Details</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. $15-20/hour, 40-60% commission"
                              className="h-12 border-gray-300 bg-white hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg font-inter"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Benefits Section */}
                  <div className="mt-6">
                    <FormLabel className="font-inter font-medium text-gray-900 mb-3 block">Benefits & Perks</FormLabel>
                    <div className="flex gap-2 mb-3">
                      <Input
                        placeholder="Add a benefit (e.g. Health insurance, Paid vacation)"
                        value={newBenefit}
                        onChange={(e) => setNewBenefit(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
                        className="h-10 border-gray-300 bg-white hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg font-inter"
                      />
                      <Button type="button" onClick={addBenefit} variant="outline" className="px-4">Add</Button>
                    </div>
                    {benefits.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {benefits.map((benefit, index) => (
                          <Badge
                            key={index}
                            className="bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer"
                            onClick={() => removeBenefit(benefit)}
                          >
                            {benefit} ×
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Position Details Section */}
              <Card className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="font-playfair text-2xl font-semibold text-blue-600">Position Details</h2>
                      <p className="font-inter text-sm text-gray-600">Describe what makes this role special</p>
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="jobDescriptionEnglish"
                    render={({ field }) => (
                      <FormItem className="mb-6">
                        <FormLabel className="font-inter font-medium text-gray-900">Job Description (English)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the position, responsibilities, requirements, and what makes your salon special..."
                            className="min-h-[120px] border-gray-300 bg-white hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg font-inter resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {selectedProfession === 'nail-tech' && (
                    <FormField
                      control={form.control}
                      name="jobDescriptionVietnamese"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-inter font-medium text-gray-900">Job Description (Vietnamese)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Mô tả vị trí công việc bằng tiếng Việt..."
                              className="min-h-[120px] border-gray-300 bg-white hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg font-inter resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </CardContent>
              </Card>

              {/* Photos Section */}
              <Card className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-100 to-pink-50 flex items-center justify-center">
                      <Camera className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <h2 className="font-playfair text-2xl font-semibold text-pink-600">Add Photos</h2>
                      <p className="font-inter text-sm text-gray-600">Showcase your salon and attract the best talent</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-purple-400 transition-colors duration-200">
                    <PhotoUploader
                      files={photoUploads}
                      onChange={setPhotoUploads}
                      maxFiles={5}
                      accept="image/*"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information Section */}
              <Card className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center">
                      <Users className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h2 className="font-playfair text-2xl font-semibold text-orange-600">Contact Information</h2>
                      <p className="font-inter text-sm text-gray-600">How candidates can reach you</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="contactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-inter font-medium text-gray-900">Contact Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Full name"
                              className="h-12 border-gray-300 bg-white hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg font-inter"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-inter font-medium text-gray-900">Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="(555) 123-4567"
                              className="h-12 border-gray-300 bg-white hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg font-inter"
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
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem className="mt-6">
                        <FormLabel className="font-inter font-medium text-gray-900">Email Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="contact@yoursalon.com"
                            type="email"
                            className="h-12 border-gray-300 bg-white hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg font-inter"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="text-center pt-8">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-14 px-12 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-inter"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating Your Premium Job Post...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Create Premium Job Post
                    </div>
                  )}
                </Button>
                
                <p className="font-inter text-sm text-gray-500 mt-4 italic">
                  Your listing will be active for 30 days and visible to thousands of beauty professionals
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ConsolidatedJobForm;
