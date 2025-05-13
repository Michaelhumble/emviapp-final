
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { BetterResultsSection } from '@/components/posting/job';
import { YesLadderSection } from '@/components/posting/job';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import { JobBasicInfo } from './JobBasicInfo';
import { JobDescription } from './JobDescription';
import { JobContactInfo } from './JobContactInfo';
import { JobPricing } from './JobPricing';
import { Button } from '@/components/ui/button';
import { useJobTemplates } from '@/hooks/useJobTemplates';
import { useJobPricing } from '@/hooks/useJobPricing';
import { useTranslation } from '@/hooks/useTranslation';
import { Loader2 } from 'lucide-react';

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  initialValues?: Partial<JobFormValues>;
  isSubmitting?: boolean;
  userStats?: {
    jobPostCount: number;
    hasReferrals?: boolean;
  };
}

export function JobForm({ 
  onSubmit,
  initialValues,
  isSubmitting = false,
  userStats
}: JobFormProps) {
  const { t } = useTranslation();
  const { getTemplateForIndustry } = useJobTemplates();
  const { calculateJobPrice } = useJobPricing();
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: initialValues || {
      title: '',
      location: '',
      jobType: 'full-time',
      salary: '',
      jobSummary: '',
      fullDescription: '',
      requirements: '',
      benefits: '',
      phoneNumber: '',
      contactEmail: '',
      contactName: '',
      pricingTier: 'standard',
      showAtTop: false,
      isHotListing: false,
      isUrgent: false,
      autoRenew: false,
      industry: 'nails'
    }
  });

  const handleFormSubmit = (values: JobFormValues) => {
    onSubmit(values);
  };

  const handleLoadTemplate = (industry: string) => {
    const template = getTemplateForIndustry(industry);
    if (template) {
      Object.entries(template).forEach(([key, value]) => {
        if (value) {
          form.setValue(key as keyof JobFormValues, value);
        }
      });
    }
  };

  const selectedPricingTier = form.watch('pricingTier');
  const industry = form.watch('industry');
  
  // Calculate price whenever relevant fields change
  const price = calculateJobPrice({
    selectedPricingTier,
    isFirstPost: userStats?.jobPostCount === 0,
    showAtTop: form.watch('showAtTop'),
    isHotListing: form.watch('isHotListing'),
    isUrgent: form.watch('isUrgent'),
    hasReferrals: userStats?.hasReferrals
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <div className="space-y-6">
          <JobBasicInfo 
            form={form} 
            onLoadTemplate={handleLoadTemplate}
          />
          
          <Separator className="my-6" />
          
          <JobDescription form={form} />
          
          {/* Insert the BetterResultsSection component right after description */}
          <BetterResultsSection />
          
          {/* Insert the YesLadderSection component right after BetterResultsSection */}
          <YesLadderSection />
          
          <Separator className="my-6" />
          
          <JobContactInfo form={form} />
          
          <Separator className="my-6" />
          
          <JobPricing 
            form={form} 
            price={price}
            isFirstPost={userStats?.jobPostCount === 0}
          />
        </div>

        <div className="flex justify-end mt-8">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="px-8"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('Processing...', 'Đang xử lý...')}
              </>
            ) : (
              t('Post Job', 'Đăng việc')
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
