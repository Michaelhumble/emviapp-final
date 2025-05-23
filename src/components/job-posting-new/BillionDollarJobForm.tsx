
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ArrowRight, Building2, MapPin, Briefcase, FileText, Camera, Eye } from 'lucide-react';
import { billionDollarJobFormSchema, type BillionDollarJobFormData } from './billionDollarJobFormSchema';
import PhotoUploader from '@/components/posting/PhotoUploader';
import { useTranslation } from '@/hooks/useTranslation';

interface BillionDollarJobFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

const steps = [
  { id: 1, title: 'Job Details', icon: Briefcase },
  { id: 2, title: 'Location & Type', icon: MapPin },
  { id: 3, title: 'Job Description', icon: FileText },
  { id: 4, title: 'Upload Photos', icon: Camera },
  { id: 5, title: 'Review & Publish', icon: Eye }
];

const BillionDollarJobForm: React.FC<BillionDollarJobFormProps> = ({
  initialData,
  onSubmit,
  onBack,
  isSubmitting = false
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const { t } = useTranslation();

  const form = useForm<BillionDollarJobFormData>({
    resolver: zodResolver(billionDollarJobFormSchema),
    defaultValues: {
      salonName: initialData?.company || initialData?.salonName || '',
      jobTitle: initialData?.title || '',
      location: initialData?.location || '',
      jobDescription: initialData?.description || getDefaultEnglishDescription(initialData?.title),
      vietnameseDescription: getDefaultVietnameseDescription(initialData?.title),
      employmentType: initialData?.employmentType || 'Full-time'
    }
  });

  function getDefaultEnglishDescription(jobTitle: string = ''): string {
    const lowerTitle = jobTitle.toLowerCase();
    
    if (lowerTitle.includes('nail')) {
      return 'We are seeking an experienced nail technician to join our growing team. The ideal candidate will have excellent technical skills in manicures, pedicures, and nail art, with a passion for delivering exceptional customer service.';
    } else if (lowerTitle.includes('hair')) {
      return 'Join our dynamic salon team as a skilled hair stylist. We are looking for a creative professional with expertise in cutting, coloring, and styling to help our clients look and feel their best.';
    } else if (lowerTitle.includes('lash')) {
      return 'We are hiring a talented lash technician specializing in eyelash extensions and treatments. The perfect candidate will have certification and experience in creating beautiful, natural-looking lash enhancements.';
    } else if (lowerTitle.includes('barber')) {
      return 'Our barbershop is seeking a skilled barber with expertise in men\'s grooming, traditional cuts, and modern styling techniques. Join our team and showcase your talent in a professional environment.';
    }
    
    return 'We are looking for a dedicated beauty professional to join our team. The ideal candidate will have relevant experience, excellent customer service skills, and a passion for the beauty industry.';
  }

  function getDefaultVietnameseDescription(jobTitle: string = ''): string {
    const lowerTitle = jobTitle.toLowerCase();
    
    if (lowerTitle.includes('nail')) {
      return 'Chúng tôi đang tìm kiếm một kỹ thuật viên nail có kinh nghiệm để gia nhập đội ngũ đang phát triển của chúng tôi. Ứng viên lý tưởng sẽ có kỹ năng kỹ thuật xuất sắc trong manicure, pedicure và nail art, với đam mê mang đến dịch vụ khách hàng đặc biệt.';
    }
    
    return '(Tùy chọn - Optional)';
  }

  const nextStep = async () => {
    const isValid = await form.trigger();
    if (isValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleSubmit = async (data: BillionDollarJobFormData) => {
    const formData = {
      ...data,
      photos: photoUploads,
      initialData
    };
    await onSubmit(formData);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Building2 className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Details</h2>
              <p className="text-gray-600">Let's start with the basic information about this position</p>
            </div>

            <FormField
              control={form.control}
              name="salonName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 font-medium">
                    Salon/Business Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Luxury Nails & Spa"
                      className="border-gray-300 bg-white hover:border-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 font-medium">
                    Job Title <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Senior Nail Technician"
                      className="border-gray-300 bg-white hover:border-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <MapPin className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Location & Employment</h2>
              <p className="text-gray-600">Where is this position located and what type of work is it?</p>
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 font-medium">
                    Location <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Houston, TX or San Jose, CA"
                      className="border-gray-300 bg-white hover:border-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="employmentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 font-medium">
                    Employment Type <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-gray-300 bg-white hover:border-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
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
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <FileText className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Description</h2>
              <p className="text-gray-600">Describe what makes this opportunity special</p>
            </div>

            <FormField
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 font-medium">
                    English Job Description <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the role, responsibilities, and what makes this opportunity special..."
                      className="min-h-[120px] border-gray-300 bg-white hover:border-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vietnameseDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 font-medium">
                    Vietnamese Job Description (Tiếng Việt) <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Mô tả vai trò, trách nhiệm và điều đặc biệt của cơ hội này..."
                      className="min-h-[120px] border-gray-300 bg-white hover:border-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Camera className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Salon/Job Photos</h2>
              <p className="text-gray-600">Showcase your salon and attract the best candidates</p>
            </div>

            <PhotoUploader
              files={photoUploads}
              onChange={setPhotoUploads}
              maxFiles={5}
              accept="image/*"
              className="border-2 border-dashed border-purple-200 hover:border-purple-400 rounded-lg p-8"
            />

            {photoUploads.length === 0 && (
              <div className="text-center text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
                At least one photo is required to publish your job posting
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Eye className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Publish</h2>
              <p className="text-gray-600">Ready to publish your premium job post on EmviApp?</p>
            </div>

            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="text-lg">Job Posting Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{form.watch('jobTitle')}</h3>
                  <p className="text-gray-600">{form.watch('salonName')}</p>
                  <p className="text-sm text-gray-500">{form.watch('location')} • {form.watch('employmentType')}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">English Description:</h4>
                  <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded">
                    {form.watch('jobDescription')?.substring(0, 200)}...
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Vietnamese Description:</h4>
                  <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded">
                    {form.watch('vietnameseDescription')?.substring(0, 200)}...
                  </p>
                </div>

                {photoUploads.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Photos ({photoUploads.length}):</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {photoUploads.slice(0, 3).map((file, index) => (
                        <img
                          key={index}
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-20 object-cover rounded"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-4xl mx-auto">
        {/* Step Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? 'bg-purple-600 border-purple-600 text-white' 
                    : 'border-gray-300 text-gray-400'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <div className="ml-3 hidden md:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-purple-600' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden md:block w-20 h-0.5 ml-4 ${
                    currentStep > step.id ? 'bg-purple-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {currentStep === 1 ? 'Back to Templates' : 'Previous'}
          </Button>

          {currentStep < steps.length ? (
            <Button
              type="button"
              onClick={nextStep}
              disabled={currentStep === 4 && photoUploads.length === 0}
              className="flex items-center bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting || photoUploads.length === 0}
              className="flex items-center bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Premium Job Post'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default BillionDollarJobForm;
