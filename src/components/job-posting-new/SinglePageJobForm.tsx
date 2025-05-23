
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import PhotoUploader from '@/components/posting/PhotoUploader';
import { 
  Fingerprint, 
  Scissors, 
  Brush,
  Palette,
  Sparkles,
  Heart,
  Users,
  Building,
  Home,
  Zap
} from 'lucide-react';

// Form schema
const jobFormSchema = z.object({
  profession: z.string().min(1, 'Please select a profession'),
  salonName: z.string().min(2, 'Salon name must be at least 2 characters'),
  location: z.string().min(2, 'Location must be at least 2 characters'),
  employmentType: z.enum(['Full-time', 'Part-time', 'Contract', 'Temporary']),
  compensationType: z.enum(['hourly', 'commission', 'salary', 'per_service']),
  compensationDetails: z.string().min(1, 'Please provide compensation details'),
  jobDescriptionEnglish: z.string().min(10, 'English job description must be at least 10 characters'),
  jobDescriptionVietnamese: z.string().optional(),
  benefits: z.array(z.string()).optional(),
  contactName: z.string().min(2, 'Contact name is required'),
  contactPhone: z.string().min(10, 'Valid phone number is required'),
  contactEmail: z.string().email('Valid email is required'),
});

type JobFormData = z.infer<typeof jobFormSchema>;

interface SinglePageJobFormProps {
  onSubmit: (data: JobFormData & { photoUploads: File[] }) => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

const professions = [
  { id: 'nail-tech', name: 'Nail Technician', icon: Fingerprint, description: 'Manicures, pedicures, nail art' },
  { id: 'hair-stylist', name: 'Hair Stylist', icon: Scissors, description: 'Cutting, coloring, styling' },
  { id: 'barber', name: 'Barber', icon: Scissors, description: 'Men\'s grooming and styling' },
  { id: 'lash-tech', name: 'Lash Technician', icon: Sparkles, description: 'Eyelash extensions and services' },
  { id: 'esthetician', name: 'Esthetician', icon: Heart, description: 'Skincare and facial treatments' },
  { id: 'massage-therapist', name: 'Massage Therapist', icon: Heart, description: 'Therapeutic massage services' },
  { id: 'makeup-artist', name: 'Makeup Artist', icon: Palette, description: 'Professional makeup application' },
  { id: 'tattoo-artist', name: 'Tattoo Artist', icon: Zap, description: 'Custom tattoo artistry' },
  { id: 'receptionist', name: 'Receptionist', icon: Users, description: 'Front desk and customer service' },
  { id: 'salon-manager', name: 'Salon Manager', icon: Building, description: 'Operations and team management' },
  { id: 'booth-rental', name: 'Booth Rental', icon: Home, description: 'Independent workspace rental' },
  { id: 'other', name: 'Other Beauty Professional', icon: Brush, description: 'Specialized beauty services' }
];

const benefitOptions = [
  'Health Insurance',
  'Dental Insurance',
  'Vision Insurance',
  'Paid Time Off',
  'Flexible Schedule',
  'Commission',
  'Tips',
  'Product Discounts',
  'Training Provided',
  'Housing Assistance'
];

const SinglePageJobForm: React.FC<SinglePageJobFormProps> = ({
  onSubmit,
  onBack,
  isSubmitting = false
}) => {
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [selectedProfession, setSelectedProfession] = useState<string>('');

  const form = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      profession: '',
      salonName: '',
      location: '',
      employmentType: 'Full-time',
      compensationType: 'hourly',
      compensationDetails: '',
      jobDescriptionEnglish: '',
      jobDescriptionVietnamese: '',
      benefits: [],
      contactName: '',
      contactPhone: '',
      contactEmail: '',
    },
  });

  const handleSubmit = (data: JobFormData) => {
    onSubmit({ ...data, photoUploads });
  };

  const isNailProfession = selectedProfession === 'nail-tech';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Create Your Premium Job Post
          </h1>
          <p className="text-lg text-gray-600">
            Find the perfect beauty professional for your salon
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            
            {/* Profession Selection */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Select Profession</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="profession"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {professions.map((profession) => {
                            const Icon = profession.icon;
                            const isSelected = field.value === profession.id;
                            
                            return (
                              <div
                                key={profession.id}
                                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                                  isSelected
                                    ? 'border-purple-500 bg-purple-50 shadow-md'
                                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
                                }`}
                                onClick={() => {
                                  field.onChange(profession.id);
                                  setSelectedProfession(profession.id);
                                }}
                              >
                                <div className="flex items-center space-x-3 mb-2">
                                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                                    <Icon className="w-5 h-5 text-purple-600" />
                                  </div>
                                  <h3 className="font-semibold text-gray-900">{profession.name}</h3>
                                </div>
                                <p className="text-sm text-gray-600">{profession.description}</p>
                              </div>
                            );
                          })}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="salonName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Salon/Business Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Sunshine Nails Spa" {...field} />
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
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., San Jose, CA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="employmentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employment Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select employment type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
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

                  <FormField
                    control={form.control}
                    name="compensationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Compensation Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select compensation type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
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
                </div>

                <FormField
                  control={form.control}
                  name="compensationDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Compensation Details</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., $20-25/hour or 60% commission" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Job Descriptions */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Job Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="jobDescriptionEnglish"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description (English) *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the job opening, requirements, and what makes this position great..."
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="jobDescriptionVietnamese"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Job Description (Vietnamese) {isNailProfession ? '*' : '(Optional)'}
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Mô tả công việc bằng tiếng Việt..."
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Benefits & Perks</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="benefits"
                  render={() => (
                    <FormItem>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {benefitOptions.map((benefit) => (
                          <FormField
                            key={benefit}
                            control={form.control}
                            name="benefits"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={benefit}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(benefit)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), benefit])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== benefit
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {benefit}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
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
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 408-555-1212" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Photo Upload */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Salon Photos</CardTitle>
                <p className="text-gray-600">Upload photos of your salon to attract more applicants</p>
              </CardHeader>
              <CardContent>
                <PhotoUploader
                  files={photoUploads}
                  onChange={setPhotoUploads}
                  maxFiles={5}
                  accept="image/*"
                />
              </CardContent>
            </Card>

            {/* Submit Section */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                Back to Templates
              </Button>
              
              <Button
                type="submit"
                disabled={isSubmitting || photoUploads.length === 0}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold"
              >
                {isSubmitting ? 'Creating Post...' : 'Create Premium Job Post'}
              </Button>
            </div>
            
            {photoUploads.length === 0 && (
              <p className="text-center text-sm text-gray-500">
                At least one photo is required to publish your job post
              </p>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SinglePageJobForm;
