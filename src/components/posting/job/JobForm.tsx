
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { 
  ArrowRight, 
  Sparkles, 
  Upload, 
  Lock, 
  Check, 
  Clock, 
  Users, 
  Briefcase,
  ChevronDown 
} from 'lucide-react';
import { 
  jobFormSchema, 
  JobFormValues, 
  IndustryType, 
  industryTypes 
} from './jobFormSchema';
import { JobDetailsSection } from './JobDetailsSection';
import { JobTemplateSelector } from './JobTemplateSelector';
import { AIPolishModal } from './AIPolishModal';
import { uploadImage } from '@/utils/uploadImage';
import { ProgressBar } from './ProgressBar';

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  isSubmitting: boolean;
}

export const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting
}) => {
  const { t } = useTranslation();
  const [formStep, setFormStep] = useState(1);
  const [formValues, setFormValues] = useState<Partial<JobFormValues>>({
    title: '',
    description: '',
    location: '',
    salary_range: '',
    contactEmail: '',
    jobType: 'full-time',
    experience_level: 'intermediate'
  });
  const [showAIPolish, setShowAIPolish] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: formValues as JobFormValues,
  });

  // Update form when formValues change
  useEffect(() => {
    Object.entries(formValues).forEach(([key, value]) => {
      if (value !== undefined) {
        form.setValue(key as any, value);
      }
    });
  }, [formValues, form]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    setPhotoUploads(prev => [...prev, ...newFiles]);

    // Handle image upload with progress
    setIsUploading(true);
    try {
      for (let i = 0; i < newFiles.length; i++) {
        await uploadImage(newFiles[i], (progress) => {
          setUploadProgress(progress);
        });
      }
      toast.success('Images uploaded successfully');
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Error uploading images');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleFormSubmit = (data: JobFormValues) => {
    onSubmit(data);
  };

  const updateFormValues = (updates: Partial<JobFormValues>) => {
    setFormValues(prev => ({
      ...prev,
      ...updates
    }));
  };

  const applyTemplate = (industryType: IndustryType) => {
    // Logic to apply the template will be implemented in JobTemplateSelector
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-violet-50 to-purple-50 px-8 py-10 border-b border-purple-100">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-pink-300 to-blue-400"></div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          {t("Post a Job")}
        </h1>
        <p className="text-gray-600 mb-6 max-w-2xl">
          {t("Quickly attract the best beauty professionals with one simple post.")}
        </p>
        
        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Clock size={16} className="mr-1 text-gray-500" />
            <span>{t("2 min setup")}</span>
          </div>
          <div className="flex items-center">
            <Users size={16} className="mr-1 text-gray-500" />
            <span>{t("Trusted by 1,000+ salons")}</span>
          </div>
          <div className="flex items-center">
            <Check size={16} className="mr-1 text-green-500" />
            <span>{t("Instant access to top talent")}</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <ProgressBar currentStep={formStep} totalSteps={3} />
      </div>
      
      {/* Form Content */}
      <div className="p-8">
        {/* Step Indicator */}
        <div className="mb-8 text-sm font-medium text-gray-500">
          {t("Step")} {formStep} {t("of")} 3: {formStep === 1 ? t("Job Details") : formStep === 2 ? t("Photos & Requirements") : t("Review & Publish")}
        </div>
        
        {/* Industry Template Selector */}
        <div className="mb-8">
          <JobTemplateSelector 
            onSelectTemplate={(industryType, templateData) => {
              setFormValues(prev => ({
                ...prev,
                ...templateData
              }));
            }}
          />
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
            {formStep === 1 && (
              <JobDetailsSection 
                formValues={formValues}
                onChange={updateFormValues}
              />
            )}
            
            {formStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                  {t("Job Photos & Additional Requirements")}
                </h2>
                
                {/* Photo Upload Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">{t("Upload Photos")}</h3>
                  <p className="text-gray-600 text-sm">
                    {t("Adding photos of your salon increases applications by 80%")}
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    {photoUploads.map((file, index) => (
                      <div key={index} className="relative w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
                        <img 
                          src={URL.createObjectURL(file)} 
                          alt={`Upload ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPhotoUploads(prev => prev.filter((_, i) => i !== index));
                          }}
                          className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center text-red-500 hover:bg-white"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    
                    <label className="w-24 h-24 bg-gray-50 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-colors">
                      <Upload size={20} className="text-gray-400 mb-1" />
                      <span className="text-xs text-gray-500">Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  
                  {isUploading && (
                    <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-500 transition-all duration-300" 
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
                
                {/* AI Polish */}
                <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Sparkles className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        {t("AI Polish Your Job Post")}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {t("Let our AI rewrite your job description to attract more qualified candidates.")}
                      </p>
                      <Button
                        type="button"
                        variant="default"
                        size="sm"
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                        onClick={() => setShowAIPolish(true)}
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        {t("Polish with AI")}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {formStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                  {t("Review & Publish")}
                </h2>
                
                <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                  <h3 className="font-medium">{formValues.title}</h3>
                  <p className="text-gray-700 whitespace-pre-line">{formValues.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">{t("Location")}:</span> {formValues.location}
                    </div>
                    <div>
                      <span className="text-gray-500">{t("Salary Range")}:</span> {formValues.salary_range}
                    </div>
                    <div>
                      <span className="text-gray-500">{t("Experience")}:</span> {formValues.experience_level}
                    </div>
                    <div>
                      <span className="text-gray-500">{t("Job Type")}:</span> {formValues.jobType}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Form Navigation */}
            <div className="flex justify-between pt-6 border-t border-gray-100">
              {formStep > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setFormStep(prev => Math.max(1, prev - 1))}
                >
                  {t("Previous")}
                </Button>
              ) : <div />}
              
              {formStep < 3 ? (
                <Button
                  type="button"
                  onClick={() => setFormStep(prev => Math.min(3, prev + 1))}
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
                >
                  {t("Continue")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 w-full h-full transition-all duration-300 scale-x-0 transform bg-white/10 origin-left group-hover:scale-x-100"></span>
                  <span className="relative flex items-center">
                    <Lock className="mr-2 h-4 w-4 text-white/80" />
                    {isSubmitting ? t("Submitting...") : t("Continue to Pricing")}
                  </span>
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
      
      {/* Social Proof Footer */}
      <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
        <p className="text-center text-sm text-gray-500">
          <Briefcase className="inline-block mr-1 h-3 w-3" />
          {t("Join 10,000+ beauty professionals finding their perfect match on EmviApp")}
        </p>
      </div>
      
      {/* AI Polish Modal */}
      <AIPolishModal 
        open={showAIPolish}
        onClose={() => setShowAIPolish(false)}
        currentDescription={formValues.description || ''}
        jobTitle={formValues.title || ''}
        onApply={(polishedText) => {
          setFormValues(prev => ({
            ...prev,
            description: polishedText
          }));
          setShowAIPolish(false);
        }}
      />
    </div>
  );
};
