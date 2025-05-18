
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Upload, X, Info } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import MultiSelect, { Option } from '@/components/ui/multi-select';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';
import { JobFormValues } from './jobFormSchema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';

const specialtiesOptions: Option[] = [
  { value: 'acrylic', label: 'Acrylic' },
  { value: 'gel', label: 'Gel' },
  { value: 'dipping-powder', label: 'Dipping Powder' },
  { value: 'nail-art', label: 'Nail Art' },
  { value: 'manicure', label: 'Manicure' },
  { value: 'pedicure', label: 'Pedicure' },
  { value: 'waxing', label: 'Waxing' },
  { value: 'facial', label: 'Facial' },
  { value: 'threading', label: 'Threading' },
  { value: 'lashes', label: 'Eyelash Extensions' },
  { value: 'micro-blading', label: 'Microblading' },
  { value: 'hair-color', label: 'Hair Color' },
  { value: 'hair-cut', label: 'Hair Cutting' },
  { value: 'hair-styling', label: 'Hair Styling' },
  { value: 'massage', label: 'Massage' },
  { value: 'makeup', label: 'Makeup' }
];

const requirementsOptions: Option[] = [
  { value: 'license', label: 'Active Cosmetology License' },
  { value: 'experience', label: 'Minimum Experience' },
  { value: 'customer-service', label: 'Customer Service Skills' },
  { value: 'english', label: 'English Speaking' },
  { value: 'vietnamese', label: 'Vietnamese Speaking' },
  { value: 'mandarin', label: 'Mandarin Speaking' },
  { value: 'spanish', label: 'Spanish Speaking' },
  { value: 'weekend-availability', label: 'Weekend Availability' },
  { value: 'evening-availability', label: 'Evening Availability' },
  { value: 'own-tools', label: 'Own Tools/Equipment' },
  { value: 'teamwork', label: 'Team Player' },
  { value: 'portfolio', label: 'Portfolio/Work Samples' }
];

interface JobFormProps {
  initialValues?: JobFormValues;
  onSubmit: (data: JobFormValues) => void;
  onBack?: () => void;
  isSubmitting?: boolean;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  showVietnameseByDefault?: boolean;
}

const jobTypeOptions = ["full-time", "part-time", "contract", "temporary", "commission"] as const;
const experienceLevelOptions = ["entry", "intermediate", "experienced", "senior"] as const;

const JobForm: React.FC<JobFormProps> = ({ 
  initialValues, 
  onSubmit, 
  onBack, 
  isSubmitting,
  photoUploads,
  setPhotoUploads,
  showVietnameseByDefault = false
}) => {
  const { t, isVietnamese, toggleLanguage } = useTranslation();
  const [showVietnameseField, setShowVietnameseField] = useState(showVietnameseByDefault);
  
  const [title, setTitle] = useState(initialValues?.title || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [vietnameseDescription, setVietnameseDescription] = useState(initialValues?.vietnameseDescription || '');
  const [jobType, setJobType] = useState<"full-time" | "part-time" | "contract" | "temporary" | "commission">(
    initialValues?.jobType as "full-time" | "part-time" | "contract" | "temporary" | "commission" || "full-time"
  );
  const [experienceLevel, setExperienceLevel] = useState<"entry" | "intermediate" | "experienced" | "senior">(
    initialValues?.experience_level as "entry" | "intermediate" | "experienced" | "senior" || "experienced"
  );
  const [location, setLocation] = useState(initialValues?.location || '');
  const [salary_range, setSalaryRange] = useState(initialValues?.salary_range || '');
  const [compensation_details, setCompensationDetails] = useState(initialValues?.compensation_details || '');
  const [contactName, setContactName] = useState(initialValues?.contactName || '');
  const [contactPhone, setContactPhone] = useState(initialValues?.contactPhone || '');
  const [contactEmail, setContactEmail] = useState(initialValues?.contactEmail || '');
  
  const [specialties, setSpecialties] = useState<string[]>(initialValues?.specialties || []);
  const [requirements, setRequirements] = useState<string[]>(initialValues?.requirements || []);
  
  // Map string arrays to Option arrays for the MultiSelect component
  const mapStringsToOptions = (strings: string[]): Option[] => {
    return strings.map(s => ({
      value: s.toLowerCase(),
      label: s
    }));
  };

  const mapOptionsToStrings = (options: Option[]): string[] => {
    return options.map(option => option.label);
  };

  const [specialtiesOptions, setSpecialtiesOptions] = useState<Option[]>(
    mapStringsToOptions(initialValues?.specialties || [])
  );
  
  const [requirementsOptions, setRequirementsOptions] = useState<Option[]>(
    mapStringsToOptions(initialValues?.requirements || [])
  );

  const handleJobTypeChange = (value: string) => {
    // Type validation for jobType
    if (jobTypeOptions.includes(value as any)) {
      setJobType(value as typeof jobTypeOptions[number]);
    }
  };

  const handleExperienceLevelChange = (value: string) => {
    // Type validation for experienceLevel
    if (experienceLevelOptions.includes(value as any)) {
      setExperienceLevel(value as typeof experienceLevelOptions[number]);
    }
  };

  const handleSpecialtiesChange = (newOptions: Option[]) => {
    setSpecialtiesOptions(newOptions);
    setSpecialties(mapOptionsToStrings(newOptions));
  };

  const handleRequirementsChange = (newOptions: Option[]) => {
    setRequirementsOptions(newOptions);
    setRequirements(mapOptionsToStrings(newOptions));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const newFiles = Array.from(files);
    setPhotoUploads(prev => [...prev, ...newFiles]);
    
    // Reset the input value to allow selecting the same file again
    event.target.value = '';
  };

  const removePhoto = (index: number) => {
    setPhotoUploads(prev => prev.filter((_, i) => i !== index));
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    // Validate required fields
    if (!title || !description || !location || !contactEmail) {
      toast.error(t({
        english: "Please fill in all required fields",
        vietnamese: "Vui lòng điền đầy đủ thông tin bắt buộc"
      }));
      return;
    }
    
    const formData: JobFormValues = {
      title,
      description,
      vietnameseDescription,
      location,
      jobType,
      experience_level: experienceLevel,
      salary_range,
      compensation_details,
      contactName,
      contactEmail,
      contactPhone,
      specialties,
      requirements
    };
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-playfair font-medium mb-6">
            {t({
              english: "Job Details",
              vietnamese: "Chi Tiết Công Việc"
            })}
          </h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-base">
                {t({
                  english: "Job Title",
                  vietnamese: "Chức Danh"
                })} *
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t({
                  english: "e.g., Nail Technician, Hair Stylist",
                  vietnamese: "vd: Thợ Nail, Thợ Tóc"
                })}
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="location" className="text-base">
                {t({
                  english: "Location",
                  vietnamese: "Địa Điểm"
                })} *
              </Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={t({
                  english: "City, State",
                  vietnamese: "Thành Phố, Tiểu Bang"
                })}
                required
                className="mt-1"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="jobType" className="text-base">
                  {t({
                    english: "Job Type",
                    vietnamese: "Loại Công Việc"
                  })}
                </Label>
                <Select value={jobType} onValueChange={handleJobTypeChange}>
                  <SelectTrigger id="jobType" className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">
                      {t({
                        english: "Full-time",
                        vietnamese: "Toàn thời gian"
                      })}
                    </SelectItem>
                    <SelectItem value="part-time">
                      {t({
                        english: "Part-time",
                        vietnamese: "Bán thời gian"
                      })}
                    </SelectItem>
                    <SelectItem value="contract">
                      {t({
                        english: "Contract",
                        vietnamese: "Hợp đồng"
                      })}
                    </SelectItem>
                    <SelectItem value="temporary">
                      {t({
                        english: "Temporary",
                        vietnamese: "Tạm thời"
                      })}
                    </SelectItem>
                    <SelectItem value="commission">
                      {t({
                        english: "Commission",
                        vietnamese: "Hoa Hồng"
                      })}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="experienceLevel" className="text-base">
                  {t({
                    english: "Experience Level",
                    vietnamese: "Mức Kinh Nghiệm"
                  })}
                </Label>
                <Select value={experienceLevel} onValueChange={handleExperienceLevelChange}>
                  <SelectTrigger id="experienceLevel" className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">
                      {t({
                        english: "Entry Level",
                        vietnamese: "Mới Vào Nghề"
                      })}
                    </SelectItem>
                    <SelectItem value="intermediate">
                      {t({
                        english: "Intermediate",
                        vietnamese: "Trung Cấp"
                      })}
                    </SelectItem>
                    <SelectItem value="experienced">
                      {t({
                        english: "Experienced",
                        vietnamese: "Có Kinh Nghiệm"
                      })}
                    </SelectItem>
                    <SelectItem value="senior">
                      {t({
                        english: "Senior",
                        vietnamese: "Cao Cấp"
                      })}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="description" className="text-base">
                    {t({
                      english: "Job Description",
                      vietnamese: "Mô Tả Công Việc"
                    })} *
                  </Label>
                  <div className="flex items-center space-x-1">
                    <Switch
                      id="vietnameseToggle"
                      checked={showVietnameseField}
                      onCheckedChange={setShowVietnameseField}
                      className="data-[state=checked]:bg-purple-600"
                    />
                    <Label htmlFor="vietnameseToggle" className="text-xs">
                      + {t({
                        english: "Vietnamese",
                        vietnamese: "Tiếng Việt"
                      })}
                    </Label>
                  </div>
                </div>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t({
                    english: "Describe the job responsibilities and requirements",
                    vietnamese: "Mô tả trách nhiệm và yêu cầu công việc"
                  })}
                  className="min-h-[150px] mt-1"
                  required
                />
              </div>
              
              {showVietnameseField && (
                <div>
                  <Label htmlFor="vietnameseDescription" className="text-base flex items-center">
                    <span className="mr-1">
                      {t({
                        english: "Vietnamese Description",
                        vietnamese: "Mô Tả Bằng Tiếng Việt"
                      })}
                    </span>
                    <span className="text-xs text-purple-600 font-normal">(đề xuất)</span>
                  </Label>
                  <Textarea
                    id="vietnameseDescription"
                    value={vietnameseDescription}
                    onChange={(e) => setVietnameseDescription(e.target.value)}
                    placeholder="Mô tả công việc bằng tiếng Việt"
                    className="min-h-[150px] mt-1"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        
        <Card className="overflow-hidden">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-medium font-playfair">
              {t({
                english: "Compensation",
                vietnamese: "Thù Lao"
              })}
            </h3>
            
            <div>
              <Label htmlFor="salary_range" className="text-sm">
                {t({
                  english: "Salary Range",
                  vietnamese: "Khoảng Lương"
                })}
              </Label>
              <Input
                id="salary_range"
                value={salary_range}
                onChange={(e) => setSalaryRange(e.target.value)}
                placeholder={t({
                  english: "e.g., $50,000 - $65,000/year or $25-35/hour",
                  vietnamese: "vd: $50,000 - $65,000/năm hoặc $25-35/giờ"
                })}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="compensation_details" className="text-sm">
                {t({
                  english: "Additional Compensation Details",
                  vietnamese: "Chi Tiết Thù Lao Bổ Sung"
                })}
              </Label>
              <Textarea
                id="compensation_details"
                value={compensation_details}
                onChange={(e) => setCompensationDetails(e.target.value)}
                placeholder={t({
                  english: "Commission structure, tips, benefits, etc.",
                  vietnamese: "Cơ cấu hoa hồng, tiền tip, phúc lợi, v.v."
                })}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>
        
        <div>
          <h3 className="text-lg font-medium mb-3 font-playfair">
            {t({
              english: "Job Photo (Optional)",
              vietnamese: "Hình Ảnh Công Việc (Tùy Chọn)"
            })}
          </h3>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center">
                <Upload className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  {t({
                    english: "Add a photo of your salon or work environment",
                    vietnamese: "Thêm hình ảnh của tiệm hoặc môi trường làm việc"
                  })}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {t({
                    english: "Helps candidates visualize the workplace",
                    vietnamese: "Giúp ứng viên hình dung nơi làm việc"
                  })}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('photo-upload')?.click()}
              >
                {t({
                  english: "Select Photo",
                  vietnamese: "Chọn Hình Ảnh"
                })}
              </Button>
            </div>
          </div>

          {photoUploads.length > 0 && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">
                {t({
                  english: "Uploaded Photos",
                  vietnamese: "Hình Ảnh Đã Tải Lên"
                })} ({photoUploads.length})
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {photoUploads.map((file, index) => (
                  <div key={`${file.name}-${index}`} className="relative group">
                    <div className="aspect-video rounded-md border bg-gray-100 overflow-hidden">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Job photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3 font-playfair">
              {t({
                english: "Skills & Specialties",
                vietnamese: "Kỹ Năng & Chuyên Môn"
              })}
            </h3>
            
            <div>
              <Label htmlFor="specialties" className="text-sm">
                {t({
                  english: "Select all that apply",
                  vietnamese: "Chọn tất cả các áp dụng"
                })}
              </Label>
              
              <MultiSelect
                options={specialtiesOptions}
                selected={specialtiesOptions.map(option => option.value)}
                onChange={handleSpecialtiesChange}
                placeholder={t({
                  english: "Select specialties",
                  vietnamese: "Chọn chuyên môn"
                })}
                className="mt-1"
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3 font-playfair">
              {t({
                english: "Requirements",
                vietnamese: "Yêu Cầu"
              })}
            </h3>
            
            <div>
              <Label htmlFor="requirements" className="text-sm">
                {t({
                  english: "Select all that apply",
                  vietnamese: "Chọn tất cả các áp dụng"
                })}
              </Label>
              
              <MultiSelect
                options={requirementsOptions}
                selected={requirementsOptions.map(option => option.value)}
                onChange={handleRequirementsChange}
                placeholder={t({
                  english: "Select requirements",
                  vietnamese: "Chọn yêu cầu"
                })}
                className="mt-1"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-playfair font-medium mb-6">
            {t({
              english: "Contact Information",
              vietnamese: "Thông Tin Liên Hệ"
            })}
          </h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="contactName" className="text-base">
                {t({
                  english: "Contact Person",
                  vietnamese: "Người Liên Hệ"
                })}
              </Label>
              <Input
                id="contactName"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder={t({
                  english: "Name of person to contact",
                  vietnamese: "Tên người liên hệ"
                })}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="contactEmail" className="text-base">
                {t({
                  english: "Contact Email",
                  vietnamese: "Email Liên Hệ"
                })} *
              </Label>
              <Input
                id="contactEmail"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder={t({
                  english: "Email address for applications",
                  vietnamese: "Địa chỉ email nhận đơn ứng tuyển"
                })}
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="contactPhone" className="text-base">
                {t({
                  english: "Contact Phone",
                  vietnamese: "Số Điện Thoại Liên Hệ"
                })}
              </Label>
              <Input
                id="contactPhone"
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder={t({
                  english: "Phone number (optional)",
                  vietnamese: "Số điện thoại (không bắt buộc)"
                })}
                className="mt-1"
              />
            </div>
          </div>
        </div>
      </div>
      
      <Alert className="bg-amber-50 border border-amber-200">
        <Info className="h-4 w-4 text-amber-500" />
        <AlertDescription className="text-amber-800 text-sm">
          {t({
            english: "Fields marked with * are required. More details increase your chances of finding qualified candidates.",
            vietnamese: "Các trường đánh dấu * là bắt buộc. Thông tin chi tiết hơn sẽ tăng cơ hội tìm được ứng viên phù hợp."
          })}
        </AlertDescription>
      </Alert>
      
      <div className="flex justify-between">
        {onBack && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onBack}
            disabled={isSubmitting}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t({
              english: "Back",
              vietnamese: "Quay lại"
            })}
          </Button>
        )}
        
        <Button 
          type="submit" 
          className="ml-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            t({
              english: "Processing...",
              vietnamese: "Đang xử lý..."
            })
          ) : (
            <>
              {t({
                english: "Continue to Review",
                vietnamese: "Tiếp tục xem lại"
              })}
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default JobForm;
