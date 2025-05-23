
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { billionDollarJobFormSchema, BillionDollarJobFormData } from './billionDollarJobFormSchema';
import PhotoUploader from '@/components/posting/PhotoUploader';
import { 
  Scissors, 
  Fingerprint, 
  Sparkles, 
  Heart, 
  Palette, 
  Building,
  Users,
  Home,
  Brush,
  Zap,
  ArrowLeft,
  MapPin,
  Briefcase,
  DollarSign,
  Phone,
  Mail,
  User,
  Camera
} from 'lucide-react';

interface BillionDollarJobFormProps {
  initialData?: any;
  onSubmit: (data: BillionDollarJobFormData & { photos: File[] }) => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

const professionOptions = [
  { value: 'nail-technician', label: 'Nail Technician', icon: Fingerprint },
  { value: 'hair-stylist', label: 'Hair Stylist', icon: Scissors },
  { value: 'barber', label: 'Barber', icon: Scissors },
  { value: 'lash-technician', label: 'Lash Technician', icon: Sparkles },
  { value: 'esthetician', label: 'Esthetician', icon: Heart },
  { value: 'massage-therapist', label: 'Massage Therapist', icon: Heart },
  { value: 'makeup-artist', label: 'Makeup Artist', icon: Palette },
  { value: 'tattoo-artist', label: 'Tattoo Artist', icon: Zap },
  { value: 'receptionist', label: 'Receptionist', icon: Users },
  { value: 'salon-manager', label: 'Salon Manager', icon: Building },
  { value: 'booth-rental', label: 'Booth Rental', icon: Home },
  { value: 'other', label: 'Other Beauty Professional', icon: Brush }
];

const BillionDollarJobForm: React.FC<BillionDollarJobFormProps> = ({
  initialData,
  onSubmit,
  onBack,
  isSubmitting = false
}) => {
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [selectedProfession, setSelectedProfession] = useState<string>('');

  const form = useForm<BillionDollarJobFormData>({
    resolver: zodResolver(billionDollarJobFormSchema),
    defaultValues: {
      salonName: '',
      jobTitle: '',
      location: '',
      jobDescription: '',
      vietnameseDescription: '',
      employmentType: undefined,
      ...initialData
    }
  });

  const handleFormSubmit = (data: BillionDollarJobFormData) => {
    onSubmit({ ...data, photos: photoUploads });
  };

  const isNailJob = selectedProfession === 'nail-technician';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-purple-600 hover:text-purple-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Templates
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Create Your Premium Job Post
            </h1>
            <p className="text-lg text-gray-600">Fill out all details in one simple form</p>
          </div>
        </div>

        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Profession Selection */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-white to-purple-25">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl">
                <Briefcase className="w-5 h-5 mr-2 text-purple-600" />
                Job Profession
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select onValueChange={setSelectedProfession} value={selectedProfession}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select the beauty profession" />
                </SelectTrigger>
                <SelectContent>
                  {professionOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center">
                          <IconComponent className="w-4 h-4 mr-2 text-purple-600" />
                          {option.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Basic Job Information */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl">
                <Building className="w-5 h-5 mr-2 text-purple-600" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="salonName" className="text-sm font-medium text-gray-700">
                    Salon/Business Name *
                  </Label>
                  <Input
                    id="salonName"
                    placeholder="e.g., Sunshine Nails Spa"
                    className="mt-1 h-11"
                    {...form.register('salonName')}
                  />
                  {form.formState.errors.salonName && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.salonName.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="jobTitle" className="text-sm font-medium text-gray-700">
                    Job Title *
                  </Label>
                  <Input
                    id="jobTitle"
                    placeholder="e.g., Senior Nail Technician"
                    className="mt-1 h-11"
                    {...form.register('jobTitle')}
                  />
                  {form.formState.errors.jobTitle && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.jobTitle.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="location" className="text-sm font-medium text-gray-700 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Location *
                </Label>
                <Input
                  id="location"
                  placeholder="e.g., San Jose, CA"
                  className="mt-1 h-11"
                  {...form.register('location')}
                />
                {form.formState.errors.location && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.location.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="employmentType" className="text-sm font-medium text-gray-700">
                  Employment Type *
                </Label>
                <Select onValueChange={(value) => form.setValue('employmentType', value as any)}>
                  <SelectTrigger className="mt-1 h-11">
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
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.employmentType.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Job Descriptions */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl">
                <Brush className="w-5 h-5 mr-2 text-purple-600" />
                Job Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="jobDescription" className="text-sm font-medium text-gray-700">
                  English Description *
                </Label>
                <Textarea
                  id="jobDescription"
                  placeholder="Describe the job responsibilities, requirements, and what makes this opportunity special..."
                  className="mt-1 min-h-[120px] resize-y"
                  {...form.register('jobDescription')}
                />
                {form.formState.errors.jobDescription && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.jobDescription.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="vietnameseDescription" className="text-sm font-medium text-gray-700">
                  Vietnamese Description {isNailJob ? '*' : '(Optional)'}
                </Label>
                <Textarea
                  id="vietnameseDescription"
                  placeholder={isNailJob ? 
                    "Mô tả chi tiết về công việc, yêu cầu và những gì làm cho cơ hội này đặc biệt..." :
                    "Mô tả công việc bằng tiếng Việt (tùy chọn)..."
                  }
                  className="mt-1 min-h-[120px] resize-y"
                  {...form.register('vietnameseDescription')}
                />
                {form.formState.errors.vietnameseDescription && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.vietnameseDescription.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Photo Upload */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl">
                <Camera className="w-5 h-5 mr-2 text-purple-600" />
                Salon/Workspace Photos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Upload photos of your salon, workspace, or team to attract more candidates
              </p>
              <PhotoUploader
                files={photoUploads}
                onChange={setPhotoUploads}
                maxFiles={5}
                accept="image/*"
              />
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="text-center pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              {isSubmitting ? 'Creating Job Post...' : 'Create Premium Job Post'}
            </Button>
            <p className="text-sm text-gray-500 mt-3">
              Your job will be featured prominently on EmviApp
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BillionDollarJobForm;
