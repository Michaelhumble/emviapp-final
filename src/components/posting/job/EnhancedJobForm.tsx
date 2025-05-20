import React, { useState, useCallback } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { JobFormValues, jobFormSchema } from './jobFormSchema';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';
import { MultiSelect } from '@/components/ui/multi-select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { UploadButton } from "@/utils/uploadthing";
import { getImageData } from "@/utils/uploadthing";
import { PricingOptions } from '@/utils/posting/types';
import { usePricing } from '@/context/pricing/PricingContext';
import { PricingSummary } from '@/components/posting/PricingSummary';
import { PaymentSummary } from "@/components/posting/PaymentSummary";
import JobSummary from '@/components/posting/JobSummary';
import { useNavigate } from 'react-router-dom';
import { Separator } from "@/components/ui/separator"
import { IndustryTypes } from './jobFormSchema';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface JobFormProps {
  onSubmit: (data: JobFormValues, uploads: File[], pricingOptions: PricingOptions) => Promise<boolean>;
  initialTemplate?: JobFormValues;
  onBack?: () => void;
  isCustomTemplate?: boolean;
  maxPhotos?: number;
  onStepChange?: (step: number) => void;
}

type FormSteps = 1 | 2 | 3;

const EnhancedJobForm: React.FC<JobFormProps> = ({ 
  onSubmit, 
  initialTemplate, 
  onBack, 
  isCustomTemplate, 
  maxPhotos = 5,
  onStepChange
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pricingOptions, updatePricingOptions } = usePricing();
  const [currentStep, setCurrentStep] = useState<FormSteps>(1);
  const [uploads, setUploads] = useState<File[]>([]);
  const [uploadUrls, setUploadUrls] = useState<string[]>([]);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [industry, setIndustry] = useState<string>('nails');

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: initialTemplate?.title || '',
      description: initialTemplate?.description || '',
      vietnameseDescription: initialTemplate?.vietnameseDescription || '',
      location: initialTemplate?.location || '',
      jobType: initialTemplate?.jobType || '',
      compensation_type: initialTemplate?.compensation_type || '',
      compensation_details: initialTemplate?.compensation_details || '',
      salary_range: initialTemplate?.salary_range || '',
      experience_level: initialTemplate?.experience_level || '',
      contactName: initialTemplate?.contactName || '',
      contactPhone: initialTemplate?.contactPhone || '',
      contactEmail: initialTemplate?.contactEmail || '',
      contactZalo: initialTemplate?.contactZalo || '',
      salonName: initialTemplate?.salonName || '',
      weekly_pay: initialTemplate?.weekly_pay || false,
      has_housing: initialTemplate?.has_housing || false,
      has_wax_room: initialTemplate?.has_wax_room || false,
      owner_will_train: initialTemplate?.owner_will_train || false,
      no_supply_deduction: initialTemplate?.no_supply_deduction || false,
      specialties: initialTemplate?.specialties || [],
      requirements: initialTemplate?.requirements || '',
      templateType: initialTemplate?.templateType || '',
      image: initialTemplate?.image || '',
    },
  });

  const handleImageUpload = async (files: File[]) => {
    if (!files || files.length === 0) {
      toast.error("No files selected.");
      return;
    }
  
    if (files.length > maxPhotos) {
      toast.error(`You can only upload a maximum of ${maxPhotos} photos.`);
      return;
    }
  
    setIsImageUploading(true);
    try {
      const imageUrls = await Promise.all(
        files.map(async (file) => {
          const imageData = await getImageData(file);
          return imageData.url;
        })
      );
  
      setUploads(files);
      setUploadUrls(imageUrls);
      toast.success("Images uploaded successfully!");
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload images. Please try again.");
    } finally {
      setIsImageUploading(false);
    }
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => {
      const nextStep = (prev + 1) as FormSteps;
      onStepChange && onStepChange(nextStep);
      return nextStep;
    });
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => {
      const prevStep = (prev - 1) as FormSteps;
       onStepChange && onStepChange(prevStep);
      return prevStep;
    });
  };

  const handleSubmit = async (values: JobFormValues) => {
    console.log('Pricing Options before submit:', pricingOptions);
    const success = await onSubmit(values, uploads, pricingOptions);
    if (success) {
      navigate('/dashboard');
    }
  };

  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <CardHeader>
              <CardTitle>{t({
                english: "Job Details",
                vietnamese: "Chi tiết công việc"
              })}</CardTitle>
              <CardDescription>{t({
                english: "Enter the details about the job you are offering.",
                vietnamese: "Nhập chi tiết về công việc bạn đang cung cấp."
              })}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t({
                      english: "Job Title",
                      vietnamese: "Tiêu đề công việc"
                    })}</FormLabel>
                    <FormControl>
                      <Input placeholder={t({
                        english: "e.g., Nail Technician",
                        vietnamese: "ví dụ: Kỹ thuật viên làm móng"
                      })} {...field} />
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
                    <FormLabel>{t({
                      english: "Description",
                      vietnamese: "Mô tả"
                    })}</FormLabel>
                    <FormControl>
                      <Textarea placeholder={t({
                        english: "Describe the job and responsibilities",
                        vietnamese: "Mô tả công việc và trách nhiệm"
                      })} {...field} />
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
                    <FormLabel>{t({
                      english: "Vietnamese Description",
                      vietnamese: "Mô tả tiếng Việt"
                    })}</FormLabel>
                    <FormControl>
                      <Textarea placeholder={t({
                        english: "Describe the job and responsibilities in Vietnamese",
                        vietnamese: "Mô tả công việc và trách nhiệm bằng tiếng Việt"
                      })} {...field} />
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
                    <FormLabel>{t({
                      english: "Location",
                      vietnamese: "Địa điểm"
                    })}</FormLabel>
                    <FormControl>
                      <Input placeholder={t({
                        english: "e.g., New York, NY",
                        vietnamese: "ví dụ: New York, NY"
                      })} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t({
                      english: "Job Type",
                      vietnamese: "Loại công việc"
                    })}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t({
                            english: "Select a job type",
                            vietnamese: "Chọn một loại công việc"
                          })} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {IndustryTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              {onBack && (
                <Button variant="outline" onClick={onBack}>
                  {t({
                    english: "Back to Templates",
                    vietnamese: "Quay lại Mẫu"
                  })}
                </Button>
              )}
              <Button onClick={handleNextStep}>
                {t({
                  english: "Next",
                  vietnamese: "Tiếp theo"
                })}
              </Button>
            </CardFooter>
          </>
        );
      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle>{t({
                english: "Compensation & Details",
                vietnamese: "Bồi thường & Chi tiết"
              })}</CardTitle>
              <CardDescription>{t({
                english: "Set the compensation details and other job specifics.",
                vietnamese: "Đặt chi tiết bồi thường và các chi tiết cụ thể khác của công việc."
              })}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="compensation_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t({
                      english: "Compensation Type",
                      vietnamese: "Loại bồi thường"
                    })}</FormLabel>
                    <FormControl>
                      <Input placeholder={t({
                        english: "e.g., Hourly",
                        vietnamese: "ví dụ: Hàng giờ"
                      })} {...field} />
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
                    <FormLabel>{t({
                      english: "Compensation Details",
                      vietnamese: "Chi tiết bồi thường"
                    })}</FormLabel>
                    <FormControl>
                      <Textarea placeholder={t({
                        english: "Enter compensation details",
                        vietnamese: "Nhập chi tiết bồi thường"
                      })} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salary_range"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t({
                      english: "Salary Range",
                      vietnamese: "Khoảng lương"
                    })}</FormLabel>
                    <FormControl>
                      <Input placeholder={t({
                        english: "e.g., $40k - $60k",
                        vietnamese: "ví dụ: $40k - $60k"
                      })} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="experience_level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t({
                      english: "Experience Level",
                      vietnamese: "Cấp độ kinh nghiệm"
                    })}</FormLabel>
                    <FormControl>
                      <Input placeholder={t({
                        english: "e.g., Mid-level",
                        vietnamese: "ví dụ: Cấp trung"
                      })} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handlePrevStep}>
                {t({
                  english: "Previous",
                  vietnamese: "Trước"
                })}
              </Button>
              <Button onClick={handleNextStep}>
                {t({
                  english: "Next",
                  vietnamese: "Tiếp theo"
                })}
              </Button>
            </CardFooter>
          </>
        );
      case 3:
        return (
          <>
            <CardHeader>
              <CardTitle>{t({
                english: "Salon & Contact",
                vietnamese: "Salon & Liên hệ"
              })}</CardTitle>
              <CardDescription>{t({
                english: "Enter salon details and contact information.",
                vietnamese: "Nhập chi tiết salon và thông tin liên hệ."
              })}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="salonName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t({
                      english: "Salon Name",
                      vietnamese: "Tên Salon"
                    })}</FormLabel>
                    <FormControl>
                      <Input placeholder={t({
                        english: "Enter salon name",
                        vietnamese: "Nhập tên salon"
                      })} {...field} />
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
                    <FormLabel>{t({
                      english: "Contact Name",
                      vietnamese: "Tên liên hệ"
                    })}</FormLabel>
                    <FormControl>
                      <Input placeholder={t({
                        english: "Enter contact name",
                        vietnamese: "Nhập tên liên hệ"
                      })} {...field} />
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
                    <FormLabel>{t({
                      english: "Contact Phone",
                      vietnamese: "Điện thoại liên hệ"
                    })}</FormLabel>
                    <FormControl>
                      <Input placeholder={t({
                        english: "Enter contact phone",
                        vietnamese: "Nhập điện thoại liên hệ"
                      })} {...field} />
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
                    <FormLabel>{t({
                      english: "Contact Email",
                      vietnamese: "Email liên hệ"
                    })}</FormLabel>
                    <FormControl>
                      <Input placeholder={t({
                        english: "Enter contact email",
                        vietnamese: "Nhập email liên hệ"
                      })} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactZalo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t({
                      english: "Contact Zalo",
                      vietnamese: "Zalo liên hệ"
                    })}</FormLabel>
                    <FormControl>
                      <Input placeholder={t({
                        english: "Enter contact Zalo",
                        vietnamese: "Nhập Zalo liên hệ"
                      })} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handlePrevStep}>
                {t({
                  english: "Previous",
                  vietnamese: "Trước"
                })}
              </Button>
              <Button type="submit" onClick={form.handleSubmit(handleSubmit)}>
                {t({
                  english: "Submit",
                  vietnamese: "Gửi"
                })}
              </Button>
            </CardFooter>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Form {...form}>
      <div className="md:flex gap-4">
        <div className="md:w-1/2">
          <Card className="bg-white shadow-md rounded-lg">
            {renderFormStep()}
          </Card>
          <Card className="bg-white shadow-md rounded-lg mt-4">
            <CardHeader>
              <CardTitle>{t({
                english: "Upload Photos",
                vietnamese: "Tải ảnh lên"
              })}</CardTitle>
              <CardDescription>{t({
                english: "Upload up to 5 photos to showcase the job.",
                vietnamese: "Tải lên tối đa 5 ảnh để giới thiệu công việc."
              })}</CardDescription>
            </CardHeader>
            <CardContent>
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res.length > 0) {
                    handleImageUpload(uploads);
                    toast.success("Images uploaded successfully!");
                  }
                }}
                onUploadError={(error) => {
                  toast.error(`Error uploading images: ${error.message}`);
                }}
                content={{
                  button({ isUploading }) {
                    return (
                      <Button disabled={isUploading}>
                        {isUploading
                          ? t({
                            english: "Uploading...",
                            vietnamese: "Đang tải lên..."
                          })
                          : t({
                            english: "Upload Images",
                            vietnamese: "Tải ảnh lên"
                          })}
                      </Button>
                    );
                  },
                  label({ maxFiles }) {
                    return (
                      <Label>
                        {t({
                          english: "Upload up to",
                          vietnamese: "Tải lên tối đa"
                        })} {maxFiles} {t({
                          english: "images",
                          vietnamese: "ảnh"
                        })}
                      </Label>
                    );
                  },
                }}
                maxFileCount={maxPhotos}
                appearance={{
                  labelButton: "block",
                  showFiletype: false,
                  showFilename: false,
                }}
              />
            </CardContent>
          </Card>
        </div>

        <div className="md:w-1/2">
          <JobSummary
            title={form.getValues("title")}
            description={form.getValues("description")}
            location={form.getValues("location")}
            contactEmail={form.getValues("contactEmail")}
            contactPhone={form.getValues("contactPhone")}
            pricingPlan={pricingOptions.selectedPricingTier}
            jobType={form.getValues("jobType")}
            salonName={form.getValues("salonName")}
          />
          <PricingSummary />
          <PaymentSummary priceData={{
            basePrice: pricingOptions.selectedPricingTier?.price || 0,
            discountedPrice: pricingOptions.selectedPricingTier?.price || 0,
            finalPrice: pricingOptions.selectedPricingTier?.price || 0,
            discountPercentage: 0,
            discountLabel: '',
            discountAmount: 0,
            isFoundersDiscount: false,
          }} />
        </div>
      </div>
    </Form>
  );
};

export default EnhancedJobForm;
