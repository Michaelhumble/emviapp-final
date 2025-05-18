
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';
import { useForm, FormProvider } from "react-hook-form";
import MultiSelect, { Option } from '@/components/ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getAllSpecialties, commonRequirements } from '@/data/specialties';
import { JobFormValues } from './jobFormSchema';
import { useTranslation } from '@/hooks/useTranslation';
import { ArrowLeft } from 'lucide-react';
import { CreatableMultiSelect } from '@/components/ui/creatable-multi-select';

interface JobFormProps {
  onSubmit: (data: JobFormValues) => void;
  initialValues?: JobFormValues;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  isSubmitting?: boolean;
  onBack?: () => void;
  showVietnameseByDefault?: boolean;
}

const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  initialValues,
  photoUploads,
  setPhotoUploads,
  isSubmitting = false,
  onBack,
  showVietnameseByDefault = false
}) => {
  const { t } = useTranslation();
  const [showVietnamese, setShowVietnamese] = useState(showVietnameseByDefault);
  
  // Define allowed job types and experience levels
  const allowedJobTypes = ["full-time", "part-time", "contract", "temporary", "commission"] as const;
  const allowedExperienceLevels = ["entry", "intermediate", "experienced", "senior"] as const;
  
  // Form state
  const [title, setTitle] = useState(initialValues?.title || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [vietnameseDescription, setVietnameseDescription] = useState(initialValues?.vietnameseDescription || '');
  const [location, setLocation] = useState(initialValues?.location || '');
  const [contactEmail, setContactEmail] = useState(initialValues?.contactEmail || '');
  const [contactName, setContactName] = useState(initialValues?.contactName || '');
  const [contactPhone, setContactPhone] = useState(initialValues?.contactPhone || '');
  const [jobType, setJobType] = useState<"full-time" | "part-time" | "contract" | "temporary" | "commission">(
    initialValues?.jobType || "full-time"
  );
  const [experienceLevel, setExperienceLevel] = useState<"entry" | "intermediate" | "experienced" | "senior">(
    initialValues?.experience_level || "experienced"
  );
  const [compensationDetails, setCompensationDetails] = useState(initialValues?.compensation_details || '');
  const [salaryRange, setSalaryRange] = useState(initialValues?.salary_range || '');
  
  // Convert string arrays to Option arrays for the multi-select components
  const allSpecialtiesOptions: Option[] = getAllSpecialties().map(s => ({ value: s, label: s }));
  const commonRequirementsOptions: Option[] = commonRequirements.map(r => ({ value: r, label: r }));
  
  // State for selected specialties and requirements with proper Option[] type
  const [selectedSpecialties, setSelectedSpecialties] = useState<Option[]>(
    (initialValues?.specialties || []).map(s => ({ value: s, label: s }))
  );
  
  const [selectedRequirements, setSelectedRequirements] = useState<Option[]>(
    (initialValues?.requirements || []).map(r => ({ value: r, label: r }))
  );
  
  // Create form methods to provide via FormProvider
  const formMethods = useForm();
  
  // Handle job type change with type safety
  const handleJobTypeChange = (value: string) => {
    if (allowedJobTypes.includes(value as any)) {
      setJobType(value as typeof allowedJobTypes[number]);
    }
  };
  
  // Handle experience level change with type safety
  const handleExperienceLevelChange = (value: string) => {
    if (allowedExperienceLevels.includes(value as any)) {
      setExperienceLevel(value as typeof allowedExperienceLevels[number]);
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData: JobFormValues = {
      title,
      description,
      vietnameseDescription: showVietnamese ? vietnameseDescription : '',
      location,
      jobType,
      experience_level: experienceLevel,
      compensation_details: compensationDetails,
      salary_range: salaryRange,
      contactEmail,
      contactName,
      contactPhone,
      specialties: selectedSpecialties.map(option => option.value),
      requirements: selectedRequirements.map(option => option.value),
    };
    
    onSubmit(formData);
  };
  
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {onBack && (
          <div className="mb-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onBack}
              className="flex items-center text-gray-500 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              {t({
                english: 'Back to Templates',
                vietnamese: 'Quay lại Mẫu'
              })}
            </Button>
          </div>
        )}
        
        <div className="space-y-5">
          {/* Job Basic Info */}
          <div>
            <h3 className="text-lg font-medium mb-4">
              {t({
                english: 'Basic Information',
                vietnamese: 'Thông tin cơ bản'
              })}
            </h3>
            
            <div className="grid gap-4">
              <div>
                <Label htmlFor="title">
                  {t({
                    english: 'Job Title',
                    vietnamese: 'Chức danh công việc'
                  })}*
                </Label>
                <Input 
                  id="title" 
                  placeholder="e.g. Nail Technician, Hair Stylist"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="location">
                  {t({
                    english: 'Location',
                    vietnamese: 'Địa điểm'
                  })}*
                </Label>
                <Input 
                  id="location" 
                  placeholder="e.g. San Jose, CA"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="jobType">
                    {t({
                      english: 'Job Type',
                      vietnamese: 'Loại công việc'
                    })}
                  </Label>
                  <Select value={jobType} onValueChange={handleJobTypeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder={t({
                        english: 'Select job type',
                        vietnamese: 'Chọn loại công việc'
                      })} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">
                        {t({
                          english: 'Full-Time',
                          vietnamese: 'Toàn thời gian'
                        })}
                      </SelectItem>
                      <SelectItem value="part-time">
                        {t({
                          english: 'Part-Time',
                          vietnamese: 'Bán thời gian'
                        })}
                      </SelectItem>
                      <SelectItem value="contract">
                        {t({
                          english: 'Contract',
                          vietnamese: 'Hợp đồng'
                        })}
                      </SelectItem>
                      <SelectItem value="temporary">
                        {t({
                          english: 'Temporary',
                          vietnamese: 'Tạm thời'
                        })}
                      </SelectItem>
                      <SelectItem value="commission">
                        {t({
                          english: 'Commission',
                          vietnamese: 'Hoa hồng'
                        })}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="experience">
                    {t({
                      english: 'Experience Level',
                      vietnamese: 'Cấp độ kinh nghiệm'
                    })}
                  </Label>
                  <Select value={experienceLevel} onValueChange={handleExperienceLevelChange}>
                    <SelectTrigger>
                      <SelectValue placeholder={t({
                        english: 'Select experience level',
                        vietnamese: 'Chọn cấp độ kinh nghiệm'
                      })} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">
                        {t({
                          english: 'Entry Level',
                          vietnamese: 'Mới vào nghề'
                        })}
                      </SelectItem>
                      <SelectItem value="intermediate">
                        {t({
                          english: 'Intermediate',
                          vietnamese: 'Trung cấp'
                        })}
                      </SelectItem>
                      <SelectItem value="experienced">
                        {t({
                          english: 'Experienced',
                          vietnamese: 'Có kinh nghiệm'
                        })}
                      </SelectItem>
                      <SelectItem value="senior">
                        {t({
                          english: 'Senior',
                          vietnamese: 'Cao cấp'
                        })}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div>
            <h3 className="text-lg font-medium mb-4">
              {t({
                english: 'Job Description',
                vietnamese: 'Mô tả công việc'
              })}
            </h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">
                  {t({
                    english: 'Description (English)',
                    vietnamese: 'Mô tả (Tiếng Anh)'
                  })}*
                </Label>
                <Textarea 
                  id="description" 
                  rows={5}
                  placeholder="Describe the job position, requirements, benefits, etc."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="showVietnamese" 
                  checked={showVietnamese}
                  onChange={() => setShowVietnamese(!showVietnamese)}
                  className="mr-2 h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="showVietnamese" className="text-sm cursor-pointer">
                  {t({
                    english: 'Add Vietnamese description',
                    vietnamese: 'Thêm mô tả tiếng Việt'
                  })}
                </Label>
              </div>
              
              {showVietnamese && (
                <div>
                  <Label htmlFor="vietnameseDescription">
                    {t({
                      english: 'Description (Vietnamese)',
                      vietnamese: 'Mô tả (Tiếng Việt)'
                    })}
                  </Label>
                  <Textarea 
                    id="vietnameseDescription" 
                    rows={5}
                    placeholder="Mô tả vị trí công việc, yêu cầu, lợi ích, v.v."
                    value={vietnameseDescription}
                    onChange={(e) => setVietnameseDescription(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
          
          {/* Compensation */}
          <div>
            <h3 className="text-lg font-medium mb-4">
              {t({
                english: 'Compensation',
                vietnamese: 'Thù lao'
              })}
            </h3>
            
            <div className="grid gap-4">
              <div>
                <Label htmlFor="compensation_details">
                  {t({
                    english: 'Compensation Details',
                    vietnamese: 'Chi tiết thù lao'
                  })}
                </Label>
                <Input 
                  id="compensation_details" 
                  placeholder="e.g. Hourly rate + commission, $25-35/hr + tips"
                  value={compensationDetails}
                  onChange={(e) => setCompensationDetails(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="salary_range">
                  {t({
                    english: 'Salary Range',
                    vietnamese: 'Phạm vi lương'
                  })}
                </Label>
                <Input 
                  id="salary_range" 
                  placeholder="e.g. $50,000 - $70,000/year"
                  value={salaryRange}
                  onChange={(e) => setSalaryRange(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {/* Skills & Requirements */}
          <div>
            <h3 className="text-lg font-medium mb-4">
              {t({
                english: 'Skills & Requirements',
                vietnamese: 'Kỹ năng & Yêu cầu'
              })}
            </h3>
            
            <div className="grid gap-4">
              <div>
                <Label htmlFor="specialties" className="mb-1 block">
                  {t({
                    english: 'Specialties',
                    vietnamese: 'Chuyên môn'
                  })}
                </Label>
                <MultiSelect
                  options={allSpecialtiesOptions}
                  selected={selectedSpecialties.map(o => o.value)}
                  onChange={(values) => {
                    setSelectedSpecialties(
                      values.map(value => ({ value, label: value }))
                    );
                  }}
                  placeholder={t({
                    english: "Select specialties...",
                    vietnamese: "Chọn chuyên môn..."
                  })}
                />
              </div>
              
              <div>
                <Label htmlFor="requirements" className="mb-1 block">
                  {t({
                    english: 'Requirements',
                    vietnamese: 'Yêu cầu'
                  })}
                </Label>
                <CreatableMultiSelect
                  value={selectedRequirements.map(o => o.value)}
                  onChange={(values) => {
                    setSelectedRequirements(
                      values.map(value => ({ value, label: value }))
                    );
                  }}
                  options={commonRequirements}
                />
              </div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium mb-4">
              {t({
                english: 'Contact Information',
                vietnamese: 'Thông tin liên hệ'
              })}
            </h3>
            
            <div className="grid gap-4">
              <div>
                <Label htmlFor="contactEmail">
                  {t({
                    english: 'Email',
                    vietnamese: 'Email'
                  })}*
                </Label>
                <Input 
                  id="contactEmail" 
                  type="email"
                  placeholder="contact@example.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactName">
                    {t({
                      english: 'Contact Name',
                      vietnamese: 'Tên người liên hệ'
                    })}
                  </Label>
                  <Input 
                    id="contactName" 
                    placeholder="John Smith"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="contactPhone">
                    {t({
                      english: 'Phone Number',
                      vietnamese: 'Số điện thoại'
                    })}
                  </Label>
                  <Input 
                    id="contactPhone" 
                    placeholder="(123) 456-7890"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-4 flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 transition-all bg-purple-600 hover:bg-purple-700 text-white"
          >
            {isSubmitting ? 
              t({
                english: 'Processing...',
                vietnamese: 'Đang xử lý...'
              }) : 
              t({
                english: 'Continue to Review',
                vietnamese: 'Tiếp tục xem lại'
              })
            }
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default JobForm;
