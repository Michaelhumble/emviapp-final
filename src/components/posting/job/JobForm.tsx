
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import JobPostPhotoUpload from './JobPostPhotoUpload';
import PolishedDescriptionsModal from './PolishedDescriptionsModal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { jobFormEn } from '@/constants/jobForm.en';
import { jobFormVi } from '@/constants/jobForm.vi';
import { useTranslation } from '@/hooks/useTranslation';
import { usePolishedDescriptions } from '@/hooks/usePolishedDescriptions';
import { Loader2 } from 'lucide-react';

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  isSubmitting?: boolean;
  defaultValues?: Partial<JobFormValues>;
}

const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting = false,
  defaultValues = {}
}) => {
  const navigate = useNavigate();
  const { isVietnamese } = useTranslation();
  const t = isVietnamese ? jobFormVi : jobFormEn;
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      type: '',
      compensation: '',
      contactEmail: '',
      contactPhone: '',
      isUrgent: false,
      payWeekly: false,
      provideLunch: false,
      qualityProducts: false,
      reviewBonuses: false,
      flexibleHours: false,
      growthOpportunities: false,
      ...defaultValues
    }
  });
  
  const [polishModalOpen, setPolishModalOpen] = useState(false);
  const { isLoadingDescriptions, getPolishedDescriptions } = usePolishedDescriptions();
  const [currentDescription, setCurrentDescription] = useState('');
  
  const descriptionValue = form.watch('description');
  
  const handlePolishWithAI = async () => {
    if (descriptionValue.trim().length < 10) {
      form.setError('description', {
        type: 'manual',
        message: t.descriptionTooShort
      });
      return;
    }
    
    setCurrentDescription(descriptionValue);
    setPolishModalOpen(true);
  };
  
  const handlePolishedDescriptionSelect = (description: string) => {
    form.setValue('description', description);
    setPolishModalOpen(false);
  };
  
  // Handle the form submission
  const handleFormSubmit = (values: JobFormValues) => {
    onSubmit(values);
  };
  
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">{t.jobDetails}</h2>
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.jobTitle} *</FormLabel>
                  <FormControl>
                    <Input placeholder={t.jobTitlePlaceholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.jobType}</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t.selectJobType} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="full-time">{t.fullTime}</SelectItem>
                      <SelectItem value="part-time">{t.partTime}</SelectItem>
                      <SelectItem value="temporary">{t.temporary}</SelectItem>
                      <SelectItem value="contract">{t.contract}</SelectItem>
                      <SelectItem value="booth-rental">{t.boothRental}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.location} *</FormLabel>
                  <FormControl>
                    <Input placeholder={t.locationPlaceholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="compensation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.compensation}</FormLabel>
                  <FormControl>
                    <Input placeholder={t.compensationPlaceholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel>{t.description} *</FormLabel>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      className="h-8 text-xs"
                      onClick={handlePolishWithAI}
                      disabled={isLoadingDescriptions || field.value.length < 10}
                    >
                      {isLoadingDescriptions ? (
                        <>
                          <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                          {t.polishing}
                        </>
                      ) : (
                        t.polishWithAI
                      )}
                    </Button>
                  </div>
                  <FormControl>
                    <Textarea 
                      placeholder={t.descriptionPlaceholder} 
                      className="min-h-[200px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="mt-6">
              <h3 className="text-md font-semibold mb-3">{t.perksAndBenefits}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="isUrgent"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">{t.urgentHiring}</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="payWeekly"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">{t.payWeekly}</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="provideLunch"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">{t.provideLunch}</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="qualityProducts"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">{t.qualityProducts}</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="reviewBonuses"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">{t.reviewBonuses}</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="flexibleHours"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">{t.flexibleHours}</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="growthOpportunities"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">{t.growthOpportunities}</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <h3 className="text-lg font-semibold mt-6">{t.jobPhotos}</h3>
            <JobPostPhotoUpload
              photoUploads={photoUploads}
              setPhotoUploads={setPhotoUploads}
              maxPhotos={5}
              translations={{
                dragDropText: t.dragDropText,
                photoCount: (count, max) => `${count} / ${max} ${t.photosAdded}`
              }}
            />
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">{t.contactInformation}</h3>
              
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.email} *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder={t.emailPlaceholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem className="mt-3">
                    <FormLabel>{t.phone} *</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder={t.phonePlaceholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {isVietnamese && (
            <Card className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200 mt-6">
              <h3 className="text-xl font-semibold mb-4">🌟 Sẵn sàng tìm thợ giỏi chưa?</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox checked disabled />
                  <span>Tôi muốn tuyển người làm liền, không đợi lâu.</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox checked disabled />
                  <span>Tôi muốn tiệm được thấy đầu trang để nhiều người apply.</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox checked disabled />
                  <span>Tôi muốn nhận tip cao và khách sang mỗi ngày.</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox checked disabled />
                  <span>Tôi muốn có hình đẹp, bài viết ấn tượng để tuyển thợ giỏi.</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox checked disabled />
                  <span>Tôi sẵn sàng đầu tư để tiệm phát triển lâu dài.</span>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Button className="bg-rose-600 text-white rounded-full px-6 py-3 text-lg shadow-md hover:bg-rose-700">
                  👉 Xem các gói đăng bài nổi bật
                </Button>
              </div>
            </Card>
          )}
          
          <div className="flex justify-end pt-6">
            <Button 
              type="submit"
              className="px-8"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.submitting}
                </>
              ) : (
                t.continue
              )}
            </Button>
          </div>
        </form>
      </Form>

      <PolishedDescriptionsModal
        isOpen={polishModalOpen}
        onClose={() => setPolishModalOpen(false)}
        descriptions={getPolishedDescriptions(currentDescription)}
        onSelect={handlePolishedDescriptionSelect}
        isLoading={isLoadingDescriptions}
      />
    </>
  );
};

export default JobForm;
