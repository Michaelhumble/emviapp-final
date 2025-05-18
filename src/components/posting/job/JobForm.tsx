
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { JobFormValues } from './jobFormSchema';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from '@/hooks/useTranslation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { specialties } from '@/data/specialties';
import { Checkbox } from '@/components/ui/checkbox';
import { z } from 'zod';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';

interface JobFormProps {
  onSubmit: (data: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  isSubmitting?: boolean;
  initialValues?: JobFormValues;
  onBack?: () => void;
  showVietnameseByDefault?: boolean;
}

// Create a schema for form validation
const jobFormSchema = z.object({
  title: z.string().min(1, { message: "Job title is required" }),
  description: z.string().min(1, { message: "Job description is required" }),
  vietnameseDescription: z.string().optional(),
  location: z.string().min(1, { message: "Job location is required" }),
  jobType: z.enum(['full-time', 'part-time', 'contract', 'temporary', 'commission']),
  experience_level: z.enum(['entry', 'intermediate', 'experienced', 'senior']),
  contactEmail: z.string().email({ message: "Valid email is required" }),
  contactName: z.string().optional(),
  contactPhone: z.string().optional(),
  compensation_details: z.string().optional(),
  salary_range: z.string().optional(),
  requirements: z.array(z.string()).optional(),
  specialties: z.array(z.string()).optional(),
});

const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting = false,
  initialValues,
  onBack,
  showVietnameseByDefault = false
}) => {
  const { t } = useTranslation();
  const [showVietnamese, setShowVietnamese] = useState(showVietnameseByDefault);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [requirements, setRequirements] = useState<string[]>([]);
  const [newRequirement, setNewRequirement] = useState('');

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: initialValues?.title || '',
      description: initialValues?.description || '',
      vietnameseDescription: initialValues?.vietnameseDescription || '',
      location: initialValues?.location || '',
      jobType: initialValues?.jobType || 'full-time',
      experience_level: initialValues?.experience_level || 'experienced',
      contactEmail: initialValues?.contactEmail || '',
      contactName: initialValues?.contactName || '',
      contactPhone: initialValues?.contactPhone || '',
      compensation_details: initialValues?.compensation_details || '',
      salary_range: initialValues?.salary_range || '',
      requirements: initialValues?.requirements || [],
      specialties: initialValues?.specialties || [],
    },
  });

  useEffect(() => {
    if (initialValues?.requirements) {
      setRequirements(initialValues.requirements);
    }
    if (initialValues?.specialties) {
      setSelectedSpecialties(initialValues.specialties);
    }
  }, [initialValues]);

  const handleSpecialtyToggle = (specialty: string) => {
    setSelectedSpecialties(prev => 
      prev.includes(specialty) 
        ? prev.filter(item => item !== specialty) 
        : [...prev, specialty]
    );
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setRequirements(prev => [...prev, newRequirement.trim()]);
      setNewRequirement('');
    }
  };

  const removeRequirement = (index: number) => {
    setRequirements(prev => prev.filter((_, i) => i !== index));
  };

  const handleFormSubmit = (values: JobFormValues) => {
    try {
      // Combine form values with specialty and requirements arrays
      const formData = {
        ...values,
        specialties: selectedSpecialties,
        requirements: requirements
      };
      
      onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Failed to submit form. Please check all fields and try again.");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
          {onBack && (
            <Button
              type="button"
              variant="ghost"
              onClick={onBack}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t({
                english: 'Back to Templates',
                vietnamese: 'Quay lại Mẫu'
              })}
            </Button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Job Details Section */}
            <div className="space-y-6">
              <h2 className="font-medium text-lg">
                {t({
                  english: 'Job Details',
                  vietnamese: 'Chi tiết công việc'
                })}
              </h2>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t({
                        english: 'Job Title',
                        vietnamese: 'Tiêu đề công việc'
                      })} *
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Nail Technician" {...field} />
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
                    <FormLabel>
                      {t({
                        english: 'Job Description',
                        vietnamese: 'Mô tả công việc'
                      })} *
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the job responsibilities and qualifications..." 
                        className="min-h-[120px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <div className="flex items-center justify-between mb-2">
                  <FormLabel>
                    {t({
                      english: 'Vietnamese Description',
                      vietnamese: 'Mô tả bằng tiếng Việt'
                    })}
                  </FormLabel>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={showVietnamese} 
                      onCheckedChange={setShowVietnamese} 
                    />
                    <span className="text-sm text-gray-500">
                      {showVietnamese ? 
                        t({
                          english: 'Enabled',
                          vietnamese: 'Đã bật'
                        }) : 
                        t({
                          english: 'Disabled',
                          vietnamese: 'Đã tắt'
                        })
                      }
                    </span>
                  </div>
                </div>
                
                {showVietnamese && (
                  <FormField
                    control={form.control}
                    name="vietnameseDescription"
                    render={({ field }) => (
                      <FormItem>
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
                )}
              </div>

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t({
                        english: 'Location',
                        vietnamese: 'Địa điểm'
                      })} *
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Los Angeles, CA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="jobType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t({
                          english: 'Job Type',
                          vietnamese: 'Loại công việc'
                        })}
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                      <FormLabel>
                        {t({
                          english: 'Experience Level',
                          vietnamese: 'Mức kinh nghiệm'
                        })}
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
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

              <FormField
                control={form.control}
                name="salary_range"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t({
                        english: 'Salary/Compensation Range',
                        vietnamese: 'Mức lương/bồi thường'
                      })}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., $50-70k/year, $25-35/hour" {...field} />
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
                    <FormLabel>
                      {t({
                        english: 'Compensation Details',
                        vietnamese: 'Chi tiết bồi thường'
                      })}
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Additional details about compensation, benefits, etc..." 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Contact Info & Requirements Section */}
            <div className="space-y-6">
              <h2 className="font-medium text-lg">
                {t({
                  english: 'Contact Information',
                  vietnamese: 'Thông tin liên hệ'
                })}
              </h2>

              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t({
                        english: 'Contact Email',
                        vietnamese: 'Email liên hệ'
                      })} *
                    </FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email for applicants" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t({
                        english: 'Contact Name',
                        vietnamese: 'Tên liên hệ'
                      })}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Name of the person to contact" {...field} />
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
                    <FormLabel>
                      {t({
                        english: 'Contact Phone',
                        vietnamese: 'Số điện thoại liên hệ'
                      })}
                    </FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="Phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <h2 className="font-medium text-lg mt-8">
                {t({
                  english: 'Job Requirements',
                  vietnamese: 'Yêu cầu công việc'
                })}
              </h2>
              
              <Card className="p-4 border border-[#e8e1d5] bg-[#fdfbf8]">
                <CardContent className="p-0 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Input 
                      placeholder="Add a requirement"
                      value={newRequirement}
                      onChange={(e) => setNewRequirement(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                      className="flex-1"
                    />
                    <Button type="button" onClick={addRequirement}>Add</Button>
                  </div>
                  
                  {requirements.length > 0 ? (
                    <ul className="space-y-2">
                      {requirements.map((req, index) => (
                        <li key={index} className="flex items-center justify-between p-2 bg-white rounded-md border border-[#f0ece4]">
                          <span className="text-sm">{req}</span>
                          <Button 
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRequirement(index)}
                            className="h-8 px-2 text-gray-500 hover:text-red-500"
                          >
                            Remove
                          </Button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 italic">No requirements added yet</p>
                  )}
                </CardContent>
              </Card>

              <h2 className="font-medium text-lg mt-8">
                {t({
                  english: 'Job Specialties',
                  vietnamese: 'Chuyên môn công việc'
                })}
              </h2>

              <div className="grid grid-cols-2 gap-2">
                {specialties.map((specialty) => (
                  <div key={specialty.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={specialty.id}
                      checked={selectedSpecialties.includes(specialty.value)}
                      onCheckedChange={() => handleSpecialtyToggle(specialty.value)}
                    />
                    <label htmlFor={specialty.id} className="text-sm cursor-pointer">
                      {specialty.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <Button 
              type="submit" 
              className="w-full md:w-auto" 
              disabled={isSubmitting || !form.formState.isValid}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t({
                    english: 'Submitting...',
                    vietnamese: 'Đang gửi...'
                  })}
                </>
              ) : (
                t({
                  english: 'Review & Publish',
                  vietnamese: 'Xem lại & Đăng'
                })
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default JobForm;
