
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CreatableMultiSelect } from '@/components/ui/creatable-multi-select';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Radio, RadioGroup } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Upload, Loader2 } from 'lucide-react';
import ContactInfoSection from '../sections/ContactInfoSection';
import { JobFormValues } from './jobFormSchema';
import { IndustryType } from '@/types/job';

interface JobFormProps {
  onSubmit: (data: any) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting: boolean;
  initialValues?: JobFormValues;
  onBack?: () => void;
  showVietnameseByDefault?: boolean;
}

// Default recommended skills by industry
const recommendedSkills: Record<string, string[]> = {
  nails: ['Manicure', 'Pedicure', 'Gel', 'Acrylic', 'Dipping Powder', 'Nail Art'],
  hair: ['Cutting', 'Coloring', 'Styling', 'Balayage', 'Extensions', 'Treatments'],
  lashes: ['Classic Lashes', 'Volume Lashes', 'Hybrid Lashes', 'Lash Lift', 'Tinting'],
  massage: ['Swedish', 'Deep Tissue', 'Hot Stone', 'Sports', 'Prenatal', 'Reflexology'],
  barber: ['Fades', 'Tapers', 'Beard Trims', 'Hot Towel Shaves', 'Line-ups'],
  makeup: ['Bridal', 'Special Event', 'Natural', 'Editorial', 'Airbrush'],
  brows: ['Microblading', 'Threading', 'Tinting', 'Lamination', 'Waxing'],
  skincare: ['Facials', 'Chemical Peels', 'Dermaplaning', 'Microdermabrasion', 'Extractions'],
  tattoo: ['Traditional', 'Realistic', 'Blackwork', 'Color', 'Fine Line', 'Portrait'],
};

// Form validation schema
const formSchema = z.object({
  title: z.string().min(5, { message: 'Job title must be at least 5 characters' }),
  description: z.string().min(20, { message: 'Description must be at least 20 characters' }),
  vietnameseDescription: z.string().optional(),
  location: z.string().min(3, { message: 'Location is required' }),
  jobType: z.enum(['full-time', 'part-time', 'contract', 'temporary', 'commission']),
  experience_level: z.enum(['entry', 'intermediate', 'experienced', 'senior']),
  salary_range: z.string().optional(),
  compensation_details: z.string().optional(),
  requirements: z.array(z.string()).optional(),
  specialties: z.array(z.string()).optional(),
  contactName: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().email({ message: 'Please enter a valid email address' }),
});

const JobForm: React.FC<JobFormProps> = ({ 
  onSubmit, 
  photoUploads, 
  setPhotoUploads, 
  isSubmitting, 
  initialValues,
  onBack,
  showVietnameseByDefault = false
}) => {
  const [showVietnamese, setShowVietnamese] = useState(showVietnameseByDefault);
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType | ''>('');
  
  // Initialize form with default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialValues?.title || '',
      description: initialValues?.description || '',
      vietnameseDescription: initialValues?.vietnameseDescription || '',
      location: initialValues?.location || '',
      jobType: initialValues?.jobType || 'full-time',
      experience_level: initialValues?.experience_level || 'experienced',
      requirements: initialValues?.requirements || [],
      specialties: initialValues?.specialties || [],
      contactEmail: initialValues?.contactEmail || '',
      contactName: '',
      contactPhone: '',
      salary_range: initialValues?.salary_range || '',
      compensation_details: initialValues?.compensation_details || '',
    },
  });

  // Update form values when initialValues change
  useEffect(() => {
    if (initialValues) {
      Object.keys(initialValues).forEach((key) => {
        const value = initialValues[key as keyof JobFormValues];
        if (value !== undefined) {
          form.setValue(key as any, value as any);
        }
      });
      
      // If this is a nail job template, show Vietnamese by default
      if (initialValues.title?.toLowerCase().includes('nail') || initialValues.specialties?.some(s => s.toLowerCase().includes('nail'))) {
        setShowVietnamese(true);
      }
    }
  }, [initialValues, form]);
  
  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setPhotoUploads([...photoUploads, ...Array.from(files)]);
    }
  };
  
  // Remove a photo from uploads
  const removePhoto = (index: number) => {
    const updatedUploads = [...photoUploads];
    updatedUploads.splice(index, 1);
    setPhotoUploads(updatedUploads);
  };

  // Handle form submission
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {/* Basic Job Information */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Basic Job Information</h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Experienced Nail Technician" {...field} />
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
                        <Input placeholder="City, State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="temporary">Temporary</SelectItem>
                        <SelectItem value="commission">Commission</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="experience_level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="experienced">Experienced</SelectItem>
                        <SelectItem value="senior">Senior</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Compensation Details */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Compensation</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="salary_range"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary Range</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., $40,000 - $60,000/year" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="compensation_details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Other Compensation</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Commission, Tips, Benefits" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Job Description */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Job Description</h2>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Job Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the role, responsibilities, and what you're looking for in an ideal candidate..." 
                      {...field}
                      className="min-h-[200px]" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex items-center space-x-2">
              <Switch 
                checked={showVietnamese}
                onCheckedChange={setShowVietnamese}
                id="vietnamese-toggle"
              />
              <Label htmlFor="vietnamese-toggle">Add Vietnamese Description</Label>
            </div>
            
            {showVietnamese && (
              <FormField
                control={form.control}
                name="vietnameseDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vietnamese Job Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Mô tả công việc bằng tiếng Việt..." 
                        {...field}
                        className="min-h-[200px]" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          
          {/* Skills & Requirements */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Skills & Requirements</h2>
            
            <FormField
              control={form.control}
              name="specialties"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specialties Needed</FormLabel>
                  <FormControl>
                    <CreatableMultiSelect
                      value={field.value || []}
                      onChange={field.onChange}
                      options={recommendedSkills[selectedIndustry as string] || []}
                      placeholder="Add specialties..."
                      allowCreate={true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Requirements</FormLabel>
                  <FormControl>
                    <CreatableMultiSelect
                      value={field.value || []}
                      onChange={field.onChange}
                      options={['License Required', 'Experience Required', 'Portfolio Required', 'English Speaking', 'Vietnamese Speaking']}
                      placeholder="Add requirements..."
                      allowCreate={true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Contact Information */}
          <ContactInfoSection form={form} />
          
          {/* Photo Uploads */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Job Photos (Optional)</h2>
            <p className="text-sm text-muted-foreground">Upload photos of your salon or workspace to attract more applicants</p>
            
            <div className="flex flex-wrap gap-4 mt-4">
              {photoUploads.map((file, index) => (
                <div key={index} className="relative">
                  <img 
                    src={URL.createObjectURL(file)} 
                    alt={`Upload ${index + 1}`} 
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    &times;
                  </button>
                </div>
              ))}
              
              <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400 transition-colors">
                <div className="flex flex-col items-center justify-center">
                  <Upload className="w-6 h-6 text-gray-400" />
                  <span className="mt-2 text-xs text-gray-500">Add Photo</span>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  multiple 
                />
              </label>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-between pt-6">
            {onBack && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onBack}
              >
                Back
              </Button>
            )}
            
            <Button 
              type="submit"
              className="ml-auto" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : 'Continue to Review'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default JobForm;
