
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { singlePageJobFormSchema, SinglePageJobFormData } from './billionDollarJobFormSchema';

interface ConsolidatedJobFormProps {
  selectedProfession: string;
  onSubmit: (data: SinglePageJobFormData & { photoUploads: File[] }) => void;
  onBack: () => void;
  isSubmitting: boolean;
}

const professionTitles: Record<string, string> = {
  'nail-tech': 'Nail Technician',
  'hair-stylist': 'Hair Stylist',
  'barber': 'Barber',
  'lash-tech': 'Lash Technician',
  'esthetician': 'Esthetician',
  'spa-tech': 'Spa Technician',
  'massage-therapist': 'Massage Therapist',
  'tattoo-artist': 'Tattoo Artist',
  'receptionist': 'Receptionist',
  'salon-manager': 'Salon Manager',
  'booth-rental': 'Booth Rental',
  'makeup-artist': 'Makeup Artist',
  'other-beauty': 'Other Beauty Services'
};

const benefitOptions = [
  'Health Insurance',
  'Paid Time Off',
  'Flexible Schedule',
  'Commission Structure',
  'Professional Development',
  'Product Discounts',
  'Training Provided',
  'Booth Rental Available'
];

const ConsolidatedJobForm: React.FC<ConsolidatedJobFormProps> = ({
  selectedProfession,
  onSubmit,
  onBack,
  isSubmitting
}) => {
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);
  
  const form = useForm<SinglePageJobFormData>({
    resolver: zodResolver(singlePageJobFormSchema),
    defaultValues: {
      profession: selectedProfession,
      salonName: '',
      location: '',
      employmentType: undefined,
      compensationType: undefined,
      compensationDetails: '',
      jobDescriptionEnglish: '',
      jobDescriptionVietnamese: selectedProfession === 'nail-tech' ? 'Khách sang, tip cao, giá nails cao, khu Mỹ trắng, chủ dễ thương. Tuyển thợ nail có kinh nghiệm, siêng năng, tay nghề tốt.' : '',
      benefits: [],
      contactName: '',
      contactPhone: '',
      contactEmail: ''
    }
  });

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setPhotoUploads(prev => [...prev, ...files]);
  };

  const removePhoto = (index: number) => {
    setPhotoUploads(prev => prev.filter((_, i) => i !== index));
  };

  const handleBenefitChange = (benefit: string, checked: boolean) => {
    setSelectedBenefits(prev => {
      if (checked) {
        return [...prev, benefit];
      } else {
        return prev.filter(b => b !== benefit);
      }
    });
  };

  const handleSubmit = (data: SinglePageJobFormData) => {
    onSubmit({
      ...data,
      benefits: selectedBenefits,
      photoUploads
    });
  };

  const isNailTech = selectedProfession === 'nail-tech';

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Templates
        </Button>
        <h1 className="text-3xl font-bold">Post {professionTitles[selectedProfession]} Position</h1>
        <p className="text-gray-600 mt-2">Fill out all the details for your job posting</p>
      </div>

      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="salonName">Salon/Business Name *</Label>
                <Input
                  id="salonName"
                  placeholder="Enter your salon name"
                  {...form.register('salonName')}
                />
                {form.formState.errors.salonName && (
                  <p className="text-sm text-red-600">{form.formState.errors.salonName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g., San Jose, CA"
                  {...form.register('location')}
                />
                {form.formState.errors.location && (
                  <p className="text-sm text-red-600">{form.formState.errors.location.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Employment Type *</Label>
                <Select onValueChange={(value) => form.setValue('employmentType', value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Temporary">Temporary</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.employmentType && (
                  <p className="text-sm text-red-600">{form.formState.errors.employmentType.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Compensation Type *</Label>
                <Select onValueChange={(value) => form.setValue('compensationType', value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select compensation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="commission">Commission</SelectItem>
                    <SelectItem value="salary">Salary</SelectItem>
                    <SelectItem value="per_service">Per Service</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.compensationType && (
                  <p className="text-sm text-red-600">{form.formState.errors.compensationType.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="compensationDetails">Compensation Details *</Label>
              <Input
                id="compensationDetails"
                placeholder="e.g., $20-25/hour, 50% commission, $40k-50k annually"
                {...form.register('compensationDetails')}
              />
              {form.formState.errors.compensationDetails && (
                <p className="text-sm text-red-600">{form.formState.errors.compensationDetails.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Job Descriptions */}
        <Card>
          <CardHeader>
            <CardTitle>Job Descriptions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="jobDescriptionEnglish">Job Description (English) *</Label>
              <Textarea
                id="jobDescriptionEnglish"
                placeholder="Describe the job responsibilities, requirements, and qualifications..."
                rows={6}
                {...form.register('jobDescriptionEnglish')}
              />
              {form.formState.errors.jobDescriptionEnglish && (
                <p className="text-sm text-red-600">{form.formState.errors.jobDescriptionEnglish.message}</p>
              )}
            </div>

            {isNailTech ? (
              <div className="space-y-2">
                <Label htmlFor="jobDescriptionVietnamese">Job Description (Vietnamese) *</Label>
                <Textarea
                  id="jobDescriptionVietnamese"
                  placeholder="Mô tả công việc bằng tiếng Việt..."
                  rows={6}
                  {...form.register('jobDescriptionVietnamese')}
                />
                {form.formState.errors.jobDescriptionVietnamese && (
                  <p className="text-sm text-red-600">{form.formState.errors.jobDescriptionVietnamese.message}</p>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="jobDescriptionVietnamese">Job Description (Vietnamese) - Optional</Label>
                <Textarea
                  id="jobDescriptionVietnamese"
                  placeholder="Mô tả công việc bằng tiếng Việt (không bắt buộc)..."
                  rows={4}
                  {...form.register('jobDescriptionVietnamese')}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card>
          <CardHeader>
            <CardTitle>Benefits & Perks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {benefitOptions.map((benefit) => (
                <div key={benefit} className="flex items-center space-x-2">
                  <Checkbox
                    id={benefit}
                    checked={selectedBenefits.includes(benefit)}
                    onCheckedChange={(checked) => handleBenefitChange(benefit, checked as boolean)}
                  />
                  <Label htmlFor={benefit} className="text-sm">{benefit}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contactName">Contact Name *</Label>
                <Input
                  id="contactName"
                  placeholder="Your name"
                  {...form.register('contactName')}
                />
                {form.formState.errors.contactName && (
                  <p className="text-sm text-red-600">{form.formState.errors.contactName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone">Phone Number *</Label>
                <Input
                  id="contactPhone"
                  placeholder="e.g., 408-555-1212"
                  {...form.register('contactPhone')}
                />
                {form.formState.errors.contactPhone && (
                  <p className="text-sm text-red-600">{form.formState.errors.contactPhone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email Address *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="your.email@example.com"
                  {...form.register('contactEmail')}
                />
                {form.formState.errors.contactEmail && (
                  <p className="text-sm text-red-600">{form.formState.errors.contactEmail.message}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Photo Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Salon Photos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600 mb-2">Upload photos of your salon</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="photo-upload"
              />
              <Button 
                type="button" 
                variant="outline"
                onClick={() => document.getElementById('photo-upload')?.click()}
              >
                Choose Photos
              </Button>
            </div>

            {photoUploads.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {photoUploads.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                      onClick={() => removePhoto(index)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="text-center pt-6">
          <Button 
            type="submit" 
            className="w-full md:w-auto px-8 py-3 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Job Post...' : 'Create Premium Job Post'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ConsolidatedJobForm;
