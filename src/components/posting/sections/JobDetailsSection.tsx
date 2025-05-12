
import React from 'react';
import { Job } from '@/types/job';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useTranslation } from '@/hooks/useTranslation';
import { Separator } from "@/components/ui/separator";
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Languages, 
  FileText, 
  HelpCircle,
  Building2,
  Image,
  Upload
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface JobDetailsSectionProps {
  details: Partial<Job>;
  onChange: (details: Partial<Job>) => void;
}

const JobDetailsSection = ({ details, onChange }: JobDetailsSectionProps) => {
  const { t, isVietnamese } = useTranslation();
  
  const industries = [
    { value: 'Nails', label: 'Nails' },
    { value: 'Hair', label: 'Hair' },
    { value: 'Barber', label: 'Barber' },
    { value: 'Tattoo', label: 'Tattoo' },
    { value: 'Skincare', label: 'Skincare' },
    { value: 'Massage', label: 'Massage' },
    { value: 'Makeup', label: 'Makeup' },
    { value: 'Other', label: 'Other' }
  ];
  
  const employmentTypes = [
    { value: 'full-time', label: t('Full Time', 'Toàn thời gian') },
    { value: 'part-time', label: t('Part Time', 'Bán thời gian') },
    { value: 'commission', label: t('Commission', 'Hoa hồng') },
    { value: 'booth-rental', label: t('Rent a Booth', 'Thuê quầy') },
  ];
  
  // Field helper components
  const FormField = ({ 
    label, 
    vietnameseLabel, 
    children, 
    tooltip,
    icon: Icon,
    required = false
  }: { 
    label: string, 
    vietnameseLabel?: string, 
    children: React.ReactNode,
    tooltip?: string,
    icon?: React.ElementType,
    required?: boolean
  }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-primary" />}
          <Label className="text-base font-medium flex items-center">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </Label>
        </div>
        
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-gray-400 hover:text-primary transition-colors cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs bg-white p-2 shadow-lg">
                <p className="text-sm">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      
      {isVietnamese && vietnameseLabel && (
        <small className="block text-xs text-gray-400 -mt-1">{vietnameseLabel}</small>
      )}
      
      {children}
    </div>
  );
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 bg-white p-8 rounded-xl shadow-sm border"
    >
      <div>
        <h2 className="text-2xl font-playfair font-semibold text-gray-800">
          Post a Job Listing
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Let artists know what makes your opportunity special
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Job Title */}
        <FormField 
          label={t('Job Title', 'Chức danh')}
          vietnameseLabel="Tên công việc"
          tooltip="Use a clear title with any urgency or keywords"
          icon={Briefcase}
          required
        >
          <div className="relative">
            <Input
              value={details.title || ''}
              onChange={(e) => onChange({ ...details, title: e.target.value })}
              placeholder="Nail Technician – Full Time (Start ASAP)"
              className="pl-10 shadow-sm"
              required
            />
            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </FormField>
        
        {/* Industry */}
        <FormField 
          label={t('Industry', 'Ngành nghề')}
          vietnameseLabel="Chọn ngành nghề phù hợp"
          tooltip="This helps us match your post with the right artists"
          icon={Building2}
          required
        >
          <Select 
            value={details.industry || 'Nails'}
            onValueChange={(value) => onChange({ ...details, industry: value })}
          >
            <SelectTrigger className="shadow-sm">
              <SelectValue placeholder={t('Select industry', 'Chọn ngành nghề')} />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry.value} value={industry.value}>
                  {industry.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {details.industry === 'Nails' && isVietnamese && (
            <div className="mt-1 text-xs px-2 py-1 bg-amber-50 text-amber-700 rounded-md inline-block">
              <span className="font-medium">💅 Phổ biến nhất cho thợ nail</span>
            </div>
          )}
        </FormField>
      </div>
      
      {/* Employment Type */}
      <FormField 
        label={t('Employment Type', 'Loại việc làm')}
        vietnameseLabel="Hình thức làm việc"
        tooltip="Select the work arrangement for this position"
        icon={Briefcase}
        required
      >
        <ToggleGroup 
          type="single" 
          className="justify-start flex-wrap"
          value={details.employment_type || 'full-time'}
          onValueChange={(value) => value && onChange({ ...details, employment_type: value })}
        >
          {employmentTypes.map((type) => (
            <ToggleGroupItem 
              key={type.value} 
              value={type.value}
              className="bg-white data-[state=on]:bg-primary data-[state=on]:text-white"
            >
              {type.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </FormField>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Location */}
        <FormField 
          label={t('Location', 'Địa điểm')}
          vietnameseLabel="Nơi làm việc"
          tooltip="Enter where the job is located (not your business address)"
          icon={MapPin}
          required
        >
          <div className="relative">
            <Input
              value={details.location || ''}
              onChange={(e) => onChange({ ...details, location: e.target.value })}
              placeholder="E.g. Houston, TX near Bellaire"
              className="pl-10 shadow-sm"
            />
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </FormField>
        
        {/* Salary / Pay Format */}
        <FormField 
          label={t('Salary / Pay Format', 'Lương / Thù lao')}
          vietnameseLabel="Mức lương hoặc hình thức trả lương"
          tooltip="Use weekly format if possible — artists prefer it"
          icon={DollarSign}
        >
          <div className="relative">
            <Input
              value={details.compensation_details || ''}
              onChange={(e) => onChange({ ...details, compensation_details: e.target.value })}
              placeholder="E.g. $1,200/week or 60% commission"
              className="pl-10 shadow-sm"
            />
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </FormField>
      </div>
      
      {/* Languages Spoken at Work */}
      <FormField 
        label={t('Languages Spoken at Work', 'Ngôn ngữ sử dụng tại nơi làm việc')}
        vietnameseLabel="Ngôn ngữ sử dụng tại salon"
        tooltip="List all languages spoken in your salon"
        icon={Languages}
      >
        <div className="relative">
          <Input
            value={details.preferred_languages?.join(', ') || ''}
            onChange={(e) => {
              const langArray = e.target.value.split(',').map(lang => lang.trim()).filter(Boolean);
              onChange({ ...details, preferred_languages: langArray });
            }}
            placeholder="E.g. English, Vietnamese"
            className="pl-10 shadow-sm"
          />
          <Languages className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
        
        {details.industry === 'Nails' && (
          <div className="mt-1 text-xs px-2 py-1 bg-neutral-50 text-neutral-600 rounded-md inline-block">
            <span>🗣️ {t('Most salons speak Vietnamese', 'Hầu hết các salon đều nói tiếng Việt')}</span>
          </div>
        )}
      </FormField>
      
      {/* Describe Your Salon or Team */}
      <FormField 
        label={t('Describe Your Salon or Team', 'Mô tả về Salon của bạn')}
        vietnameseLabel="Mô tả về đội ngũ và môi trường làm việc"
        tooltip="Tell artists what your salon is like, how busy it is, and why they'll love it"
        icon={FileText}
        required
      >
        <div className="relative">
          <Textarea
            value={details.description || ''}
            onChange={(e) => onChange({ ...details, description: e.target.value })}
            placeholder="Tell artists what your salon is like, how busy it is, and why they'll love it"
            className="min-h-[120px] pl-10 shadow-sm"
            rows={4}
          />
          <FileText className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
        </div>
      </FormField>
      
      {/* Photo Upload */}
      <FormField 
        label={t('Photo Upload (optional)', 'Tải ảnh lên (không bắt buộc)')}
        vietnameseLabel="Hình ảnh về salon hoặc môi trường làm việc"
        tooltip="Upload a photo of your salon, work, or team"
        icon={Image}
      >
        <div className="flex items-center space-x-3">
          {details.image ? (
            <div className="relative w-24 h-24 rounded-md overflow-hidden">
              <img 
                src={details.image} 
                alt="Uploaded preview" 
                className="object-cover w-full h-full"
              />
              <button
                type="button"
                onClick={() => onChange({ ...details, image: '' })}
                className="absolute top-1 right-1 bg-black bg-opacity-70 p-1 rounded-full hover:bg-opacity-90"
              >
                <span className="text-white text-xs">×</span>
              </button>
            </div>
          ) : (
            <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center bg-gray-50">
              <Image className="h-8 w-8 text-gray-400" />
            </div>
          )}
          
          <div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex items-center"
              onClick={() => {
                // This would typically trigger a file input
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = 'image/jpeg,image/png,image/webp';
                fileInput.onchange = (e: Event) => {
                  const target = e.target as HTMLInputElement;
                  if (target.files && target.files[0]) {
                    const file = target.files[0];
                    // In a real implementation, this would upload to Supabase
                    // For now, we'll just create a data URL for preview
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      if (e.target?.result) {
                        onChange({ ...details, image: e.target.result as string });
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                };
                fileInput.click();
              }}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Image
            </Button>
            <p className="text-xs text-gray-500 mt-1">
              Accepts JPG, PNG or WebP (max 5MB)
            </p>
          </div>
        </div>
      </FormField>
      
      {/* Divider before pricing section */}
      <Separator className="my-8" />
    </motion.div>
  );
};

export default JobDetailsSection;
