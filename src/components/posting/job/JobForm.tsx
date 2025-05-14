import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { JobPostPhotoUpload } from './JobPostPhotoUpload';
import { JOB_TEMPLATES, JOB_TYPES } from './jobFormConstants';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import PolishedDescriptionsModal from './PolishedDescriptionsModal';
import { Sparkles } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { jobFormEn } from '@/constants/jobForm.en';
import { jobFormVi } from '@/constants/jobForm.vi';

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
  const { isVietnamese, t } = useTranslation();
  const formText = isVietnamese ? jobFormVi : jobFormEn;
  
  const [showPolishModal, setShowPolishModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: defaultValues.title || '',
      location: defaultValues.location || '',
      type: defaultValues.type || '',
      description: defaultValues.description || '',
      contactEmail: defaultValues.contactEmail || '',
      contactPhone: defaultValues.contactPhone || '',
    },
    mode: "onChange"
  });

  const { watch } = form;
  const descriptionValue = watch("description");

  useEffect(() => {
    if (selectedTemplate) {
      const template = JOB_TEMPLATES.find(t => t.id === selectedTemplate);
      if (template) {
        form.setValue('title', template.title);
        form.setValue('type', template.type);
        form.setValue('description', template.description);
      }
    }
  }, [selectedTemplate, form]);

  const handleSubmit = (values: JobFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <Card className="bg-white shadow-md rounded-lg">
          <CardContent className="p-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="template"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{formText.templateLabel}</FormLabel>
                    <Select onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedTemplate(value);
                    }}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={formText.templatePlaceholder} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {JOB_TEMPLATES.map((template) => (
                          <SelectItem key={template.id} value={template.id}>{template.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {isVietnamese
                        ? "Chọn mẫu công việc giúp bạn điền nhanh hơn"
                        : "Choose a job template to fill the form faster"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-md rounded-lg">
          <CardContent className="p-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {formText.titleLabel}
                      <span className="text-red-500">{formText.requiredLabel}</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={formText.titlePlaceholder} {...field} />
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
                    <FormLabel>
                      {formText.locationLabel}
                      <span className="text-red-500">{formText.requiredLabel}</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={formText.locationPlaceholder} {...field} />
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
                    <FormLabel>{formText.jobTypeLabel}</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={formText.jobTypePlaceholder} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(JOB_TYPES).map(([key, value]) => (
                          <SelectItem key={key} value={key}>{isVietnamese ? value.vi : value.en}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {formText.descriptionLabel}
                      <span className="text-red-500">{formText.requiredLabel}</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={formText.descriptionPlaceholder}
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {isVietnamese
                        ? `Tối thiểu 10 ký tự. Còn ${Math.max(0, 500 - (descriptionValue?.length || 0))} ký tự`
                        : `Minimum 10 characters. ${Math.max(0, 500 - (descriptionValue?.length || 0))} characters remaining`}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="compensation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{formText.compensationLabel}</FormLabel>
                    <FormControl>
                      <Input placeholder={formText.compensationPlaceholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-md rounded-lg">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">{formText.contactInfoLabel}</h4>

              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{formText.contactInfoEmail}</FormLabel>
                    <FormControl>
                      <Input placeholder={formText.contactInfoEmailPlaceholder} type="email" {...field} />
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
                    <FormLabel>{formText.contactInfoPhone}</FormLabel>
                    <FormControl>
                      <Input placeholder={formText.contactInfoPhonePlaceholder} type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-md rounded-lg">
          <CardContent className="p-6">
            <JobPostPhotoUpload
              photoUploads={photoUploads}
              setPhotoUploads={setPhotoUploads}
            />
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-md rounded-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="urgent"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <div className="space-y-0">
                      <FormLabel>{formText.urgentLabel}</FormLabel>
                      <FormDescription>
                        {formText.urgentHelpText}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* AI Polish button and modal */}
        <div className="flex justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setShowPolishModal(true)}
            disabled={isSubmitting || !form.getValues('description')}
          >
            {formText.aiPolishButton}
            <Sparkles className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <PolishedDescriptionsModal
          show={showPolishModal}
          onClose={() => setShowPolishModal(false)}
          description={form.getValues('description') || ''}
          form={form}
        />
        
        {/* Submit button */}
        <Button disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {formText.continue}
        </Button>
        
        {/* 🔒 YES LADDER SECTION – Visual Trust + Emotional Support */}
        {isVietnamese && (
          <Card className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200 mt-6">
            <h3 className="text-xl font-semibold mb-4">🌟 Sẵn sàng tìm thợ giỏi chưa?</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Checkbox checked disabled id="yes-1" />
                <label htmlFor="yes-1" className="text-sm">Tôi muốn tuyển người làm liền, không đợi lâu.</label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox checked disabled id="yes-2" />
                <label htmlFor="yes-2" className="text-sm">Tôi muốn tiệm được thấy đầu trang để nhiều người apply.</label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox checked disabled id="yes-3" />
                <label htmlFor="yes-3" className="text-sm">Tôi muốn nhận tip cao và khách sang mỗi ngày.</label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox checked disabled id="yes-4" />
                <label htmlFor="yes-4" className="text-sm">Tôi muốn có hình đẹp, bài viết ấn tượng để tuyển thợ giỏi.</label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox checked disabled id="yes-5" />
                <label htmlFor="yes-5" className="text-sm">Tôi sẵn sàng đầu tư để tiệm phát triển lâu dài.</label>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Button type="button" className="bg-rose-600 text-white rounded-full px-6 py-3 text-lg shadow-md hover:bg-rose-700">
                👉 Xem các gói đăng bài nổi bật
              </Button>
            </div>
          </Card>
        )}
      </form>
    </Form>
  );
};

export default JobForm;
