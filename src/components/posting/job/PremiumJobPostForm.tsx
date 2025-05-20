
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobFormSchema, JobFormValues } from '@/components/posting/job/jobFormSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Briefcase, DollarSign, MapPin, Phone, Mail, Upload, ChevronDown, ChevronUp } from 'lucide-react';
import { PricingSection } from '@/components/posting/PricingSection';
import PhotoUploader from '@/components/posting/PhotoUploader';
import { usePricing } from '@/context/pricing/PricingContext';
import { uploadFiles } from '@/utils/uploadthing';
import { PricingOptions, JobPricingOption } from '@/utils/posting/types';
import { cn } from '@/lib/utils';

interface PremiumJobPostFormProps {
  onSubmit: (data: JobFormValues, uploads: File[], pricingOptions: PricingOptions) => Promise<boolean>;
  onStepChange?: (step: number) => void;
  initialTemplate?: JobFormValues;
  onBack?: () => void;
  isCustomTemplate?: boolean;
  maxPhotos?: number;
}

const pricingTiers: JobPricingOption[] = [
  {
    id: 'standard',
    name: 'Standard',
    price: 29,
    description: 'Basic visibility for 30 days',
    tier: 'standard',
    features: ['30 days listing', 'Basic search visibility', 'Email support'],
    priceMonthly: 29
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 49,
    description: 'Enhanced visibility for your job post',
    tier: 'premium',
    popular: true,
    features: ['Feature on homepage', 'Higher search ranking', '60 days listing', 'Priority support'],
    priceMonthly: 49
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 89,
    description: 'Maximum visibility and promotion',
    tier: 'gold',
    features: [
      'Top of search results',
      '90 days listing',
      'Social media promotion',
      'Featured badge',
      'Premium support'
    ],
    priceMonthly: 89
  }
];

const PremiumJobPostForm: React.FC<PremiumJobPostFormProps> = ({
  onSubmit,
  onStepChange,
  initialTemplate,
  onBack,
  isCustomTemplate = false,
  maxPhotos = 5
}) => {
  const { pricingOptions, setPricingOptions } = usePricing();
  const [step, setStep] = useState<number>(1);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [language, setLanguage] = useState<'english' | 'vietnamese'>('english');

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: initialTemplate || {
      title: '',
      description: '',
      vietnameseDescription: '',
      location: '',
      jobType: 'Full-time',
      compensation_type: 'Commission',
      compensation_details: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      salonName: '',
      weekly_pay: false,
      has_housing: false,
      owner_will_train: false,
      no_supply_deduction: false,
      specialties: []
    }
  });

  const totalSteps = 4;

  const handleNext = async () => {
    const fieldsToValidate = getFieldsForCurrentStep();
    const result = await form.trigger(fieldsToValidate as any);
    
    if (result) {
      setStep(Math.min(step + 1, totalSteps));
      if (onStepChange) onStepChange(Math.min(step + 1, totalSteps));
      window.scrollTo(0, 0);
    }
  };
  
  const handlePrevious = () => {
    setStep(Math.max(step - 1, 1));
    if (onStepChange) onStepChange(Math.max(step - 1, 1));
    window.scrollTo(0, 0);
  };

  const handlePhotoChange = (files: File[]) => {
    setPhotoUploads(files);
  };

  const getFieldsForCurrentStep = () => {
    switch (step) {
      case 1:
        return ['salonName', 'title', 'location'];
      case 2:
        return ['description', 'vietnameseDescription'];
      case 3:
        return ['compensation_type', 'compensation_details', 'contactName', 'contactPhone', 'contactEmail'];
      default:
        return [];
    }
  };

  const handleFormSubmit = async (data: JobFormValues) => {
    setSubmitting(true);
    
    try {
      const success = await onSubmit(data, photoUploads, pricingOptions);
      if (!success) {
        setSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitting(false);
    }
  };

  const handleSelectPricingTier = (tier: string) => {
    setPricingOptions({
      ...pricingOptions,
      selectedPricingTier: tier as any
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-medium">
            {step === 1 && 'Basic Information'}
            {step === 2 && 'Job Description'}
            {step === 3 && 'Contact & Compensation'}
            {step === 4 && 'Upload Photos & Confirm'}
          </h2>
          <span className="text-sm text-gray-500">Step {step} of {totalSteps}</span>
        </div>
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <Card className="bg-white shadow-md rounded-xl overflow-hidden border-0 backdrop-blur-sm bg-white/90">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-2xl font-playfair font-bold mb-6 text-center">Job Details</h3>
                
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="salonName"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-baseline justify-between">
                          <FormLabel className="text-base">
                            Salon Name <span className="text-red-500">*</span>
                            <div className="text-xs text-gray-500">Tên tiệm</div>
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Input 
                            placeholder="Enter salon name" 
                            {...field} 
                            className="h-12 text-base" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-baseline justify-between">
                          <FormLabel className="text-base">
                            Job Title <span className="text-red-500">*</span>
                            <div className="text-xs text-gray-500">Vị trí tuyển dụng</div>
                          </FormLabel>
                        </div>
                        <FormControl>
                          <div className="relative">
                            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <Input 
                              placeholder="Example: Nail Technician, Hair Stylist" 
                              {...field} 
                              className="h-12 pl-10 text-base" 
                            />
                          </div>
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
                        <div className="flex items-baseline justify-between">
                          <FormLabel className="text-base">
                            Location <span className="text-red-500">*</span>
                            <div className="text-xs text-gray-500">Địa điểm</div>
                          </FormLabel>
                        </div>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <Input 
                              placeholder="City, State (e.g., Houston, TX)" 
                              {...field} 
                              className="h-12 pl-10 text-base" 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Job Description */}
          {step === 2 && (
            <Card className="bg-white shadow-md rounded-xl overflow-hidden border-0 backdrop-blur-sm bg-white/90">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-2xl font-playfair font-bold mb-6 text-center">Job Description</h3>
                
                <div className="mb-4 flex justify-center border-b">
                  <button
                    type="button"
                    onClick={() => setLanguage('english')}
                    className={`px-4 py-2 ${
                      language === 'english' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('vietnamese')}
                    className={`px-4 py-2 ${
                      language === 'vietnamese' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'
                    }`}
                  >
                    Vietnamese / Tiếng Việt
                  </button>
                </div>
                
                <div className="space-y-6">
                  {language === 'english' ? (
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-baseline justify-between">
                            <FormLabel className="text-base">
                              Job Description (English) <span className="text-red-500">*</span>
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe the job, requirements, and benefits..." 
                              {...field} 
                              className="min-h-[200px] text-base p-4" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <FormField
                      control={form.control}
                      name="vietnameseDescription"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-baseline justify-between">
                            <FormLabel className="text-base">
                              Job Description (Vietnamese) <span className="text-red-500">*</span>
                              <div className="text-xs text-gray-500">Mô tả công việc</div>
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Textarea 
                              placeholder="Mô tả công việc, yêu cầu và lợi ích..." 
                              {...field} 
                              className="min-h-[200px] text-base p-4" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Compensation & Contact */}
          {step === 3 && (
            <Card className="bg-white shadow-md rounded-xl overflow-hidden border-0 backdrop-blur-sm bg-white/90">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-2xl font-playfair font-bold mb-6 text-center">Compensation & Contact</h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="compensation_type"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-baseline justify-between">
                            <FormLabel className="text-base">
                              Compensation Type
                              <div className="text-xs text-gray-500">Hình thức trả lương</div>
                            </FormLabel>
                          </div>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <SelectTrigger className="h-12 pl-10 text-base">
                                  <SelectValue placeholder="Select compensation type" />
                                </SelectTrigger>
                              </div>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Salary">Salary / Lương</SelectItem>
                              <SelectItem value="Commission">Commission / Hoa hồng</SelectItem>
                              <SelectItem value="Both">Both / Cả hai</SelectItem>
                              <SelectItem value="Other">Other / Khác</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="compensation_details"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-baseline justify-between">
                            <FormLabel className="text-base">
                              Compensation Details
                              <div className="text-xs text-gray-500">Chi tiết lương</div>
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Input 
                              placeholder="E.g., $15/hr + tips, 60% commission" 
                              {...field} 
                              className="h-12 text-base" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div className="flex items-center space-x-2">
                      <FormField
                        control={form.control}
                        name="weekly_pay"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox 
                                checked={field.value} 
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-0.5">
                              <FormLabel className="text-base cursor-pointer">Weekly Pay</FormLabel>
                              <p className="text-xs text-gray-500">Trả lương hàng tuần</p>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <FormField
                        control={form.control}
                        name="has_housing"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox 
                                checked={field.value} 
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-0.5">
                              <FormLabel className="text-base cursor-pointer">Housing Provided</FormLabel>
                              <p className="text-xs text-gray-500">Có chỗ ở</p>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <FormField
                        control={form.control}
                        name="owner_will_train"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox 
                                checked={field.value} 
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-0.5">
                              <FormLabel className="text-base cursor-pointer">Will Train</FormLabel>
                              <p className="text-xs text-gray-500">Sẽ đào tạo</p>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <FormField
                        control={form.control}
                        name="no_supply_deduction"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox 
                                checked={field.value} 
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-0.5">
                              <FormLabel className="text-base cursor-pointer">No Supply Deduction</FormLabel>
                              <p className="text-xs text-gray-500">Không trừ tiền vật liệu</p>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="font-bold text-lg mb-4">Contact Information</h4>
                  </div>

                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-baseline justify-between">
                          <FormLabel className="text-base">
                            Contact Name <span className="text-red-500">*</span>
                            <div className="text-xs text-gray-500">Tên liên hệ</div>
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Input 
                            placeholder="Enter contact name" 
                            {...field} 
                            className="h-12 text-base" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-baseline justify-between">
                            <FormLabel className="text-base">
                              Contact Phone <span className="text-red-500">*</span>
                              <div className="text-xs text-gray-500">Số điện thoại</div>
                            </FormLabel>
                          </div>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                              <Input 
                                placeholder="(123) 456-7890" 
                                type="tel" 
                                {...field} 
                                className="h-12 pl-10 text-base" 
                              />
                            </div>
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
                          <div className="flex items-baseline justify-between">
                            <FormLabel className="text-base">
                              Contact Email <span className="text-red-500">*</span>
                              <div className="text-xs text-gray-500">Email</div>
                            </FormLabel>
                          </div>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                              <Input 
                                placeholder="email@example.com" 
                                type="email" 
                                {...field} 
                                className="h-12 pl-10 text-base" 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Upload Photos & Pricing */}
          {step === 4 && (
            <>
              <Card className="bg-white shadow-md rounded-xl overflow-hidden border-0 backdrop-blur-sm bg-white/90 mb-8">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-2xl font-playfair font-bold mb-6 text-center">Upload Photos</h3>
                  
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <p className="text-gray-600">Add photos to make your job post stand out (up to {maxPhotos} photos)</p>
                    </div>
                    
                    <PhotoUploader 
                      onChange={handlePhotoChange} 
                      files={photoUploads}
                      maxFiles={maxPhotos} 
                      accept="image/*"
                    />
                  </div>
                </CardContent>
              </Card>

              <PricingSection 
                pricingOptions={pricingTiers} 
                selectedTier={pricingOptions.selectedPricingTier} 
                onSelectTier={handleSelectPricingTier}
              />

              <Card className="bg-white shadow-md rounded-xl overflow-hidden border-0 backdrop-blur-sm bg-white/90 mt-8">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-2xl font-playfair font-bold mb-6 text-center">Job Post Preview</h3>
                  
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                    <h4 className="text-xl font-bold">{form.watch('title') || 'Job Title'}</h4>
                    <p className="text-gray-500 flex items-center mt-1">
                      <MapPin className="w-4 h-4 mr-1" /> {form.watch('location') || 'Location'}
                    </p>
                    
                    <div className="mt-4">
                      <p className="font-medium">Description:</p>
                      <p className="text-gray-700 whitespace-pre-line">
                        {form.watch('description') || 'No description provided.'}
                      </p>
                    </div>
                    
                    {form.watch('vietnameseDescription') && (
                      <div className="mt-4">
                        <p className="font-medium">Mô tả công việc:</p>
                        <p className="text-gray-700 whitespace-pre-line">
                          {form.watch('vietnameseDescription')}
                        </p>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="font-medium">Salon:</p>
                        <p className="text-gray-700">{form.watch('salonName') || 'Salon Name'}</p>
                      </div>
                      <div>
                        <p className="font-medium">Compensation:</p>
                        <p className="text-gray-700">
                          {form.watch('compensation_type')} 
                          {form.watch('compensation_details') ? ` - ${form.watch('compensation_details')}` : ''}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {form.watch('weekly_pay') && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Weekly Pay</span>
                      )}
                      {form.watch('has_housing') && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Housing Provided</span>
                      )}
                      {form.watch('owner_will_train') && (
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Will Train</span>
                      )}
                      {form.watch('no_supply_deduction') && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">No Supply Deduction</span>
                      )}
                    </div>
                    
                    {photoUploads.length > 0 && (
                      <div className="mt-4">
                        <p className="font-medium mb-2">Photos:</p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                          {photoUploads.map((file, index) => (
                            <div key={index} className="aspect-square rounded-md overflow-hidden bg-gray-200">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <p className="font-medium">Contact:</p>
                      <p className="text-gray-700">{form.watch('contactName') || 'Contact Name'}</p>
                      <p className="text-gray-700">{form.watch('contactPhone') || 'Contact Phone'}</p>
                      <p className="text-gray-700">{form.watch('contactEmail') || 'Contact Email'}</p>
                    </div>
                  </div>

                  <div className="mt-6 bg-purple-50 border border-purple-100 rounded-lg p-4 flex items-center">
                    <div className="mr-4 text-purple-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold">Your job post will reach thousands of qualified candidates</h4>
                      <p className="text-sm text-gray-600">
                        Over 80% of EmviApp users find their perfect job match within 2 weeks of posting
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={step === 1 && onBack ? onBack : handlePrevious}
              disabled={submitting}
              className={cn(
                "border-gray-300 px-6 py-5 text-base h-auto",
                step === 1 && !onBack ? "invisible" : ""
              )}
            >
              {step === 1 && onBack ? "Back to Templates" : "Previous"}
            </Button>
            
            {step < totalSteps ? (
              <Button 
                type="button" 
                onClick={handleNext}
                className="px-6 py-5 text-base h-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Next Step
              </Button>
            ) : (
              <Button 
                type="submit"
                disabled={submitting}
                className="px-6 py-5 text-base h-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {submitting ? "Submitting..." : "Submit & Pay"}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PremiumJobPostForm;
