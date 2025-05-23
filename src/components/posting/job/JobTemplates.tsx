
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { JobFormValues, JobType } from './jobFormSchema';
import { useForm } from 'react-hook-form';

interface JobTemplateProps {
  onTemplateSelect: (template: Partial<JobFormValues>) => void;
  expressMode?: boolean;
}

interface TemplateCardProps {
  title: string;
  description: string;
  onSelect: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ title, description, onSelect }) => (
  <Card className="cursor-pointer hover:shadow-md transition-shadow border border-gray-200 h-full" onClick={onSelect}>
    <CardContent className="p-4 flex flex-col h-full">
      <h3 className="font-medium text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-600 flex-grow">{description}</p>
      <Button variant="ghost" className="mt-4 self-start">Use Template</Button>
    </CardContent>
  </Card>
);

const JobTemplates: React.FC<JobTemplateProps> = ({ onTemplateSelect, expressMode = false }) => {
  const populateNailTechTemplate = () => {
    onTemplateSelect({
      title: "Nail Technician Needed",
      salonName: "Beautiful Nails Salon",
      description: "Looking for an experienced nail technician to join our busy salon. Must have at least 2 years experience with acrylics, gels, and nail art. Great earning potential with commission-based pay structure. Friendly team environment with regular clients.",
      vietnameseDescription: "Cần thợ nail có kinh nghiệm tham gia salon của chúng tôi. Phải có ít nhất 2 năm kinh nghiệm với bột, gel, và vẽ móng. Tiềm năng thu nhập tốt với cơ cấu trả lương theo hoa hồng. Môi trường làm việc thân thiện với khách hàng thường xuyên.",
      location: "Boston, MA",
      jobType: "full-time" as JobType,
      compensation_type: "commission",
      compensation_details: "$800-1200/week potential earnings",
      weekly_pay: true,
      has_housing: true,
      has_wax_room: false,
      requirements: ["2+ years experience", "Acrylic and gel skills", "Nail art"]
    });
  };

  const populateHairStylistTemplate = () => {
    onTemplateSelect({
      title: "Hair Stylist Position Available",
      salonName: "Chic Cuts Salon",
      description: "Seeking a skilled hair stylist to join our upscale salon. Must be proficient in cutting, coloring, and styling various hair types. Strong customer service skills required. Commission-based compensation with potential for growth.",
      vietnameseDescription: "Đang tìm một thợ tóc có kỹ năng để tham gia vào salon cao cấp của chúng tôi. Phải thành thạo cắt, nhuộm và tạo kiểu các loại tóc khác nhau. Yêu cầu kỹ năng chăm sóc khách hàng tốt. Thù lao dựa trên hoa hồng với tiềm năng tăng trưởng.",
      location: "Chicago, IL",
      jobType: "part-time" as JobType,
      compensation_type: "commission",
      compensation_details: "30-50% commission on services",
      weekly_pay: false,
      has_housing: false,
      requirements: ["Color and cutting experience", "Client-building skills", "Portfolio required"]
    });
  };

  const populateReceptionistTemplate = () => {
    onTemplateSelect({
      title: "Salon Receptionist/Front Desk",
      salonName: "Glamour Salon & Spa",
      description: "Now hiring a friendly, organized receptionist for our busy salon and spa. Duties include scheduling appointments, answering phones, greeting clients, and processing payments. Must have excellent customer service skills and be detail-oriented.",
      vietnameseDescription: "Đang tuyển một lễ tân thân thiện, có tổ chức cho salon và spa bận rộn của chúng tôi. Nhiệm vụ bao gồm lên lịch hẹn, trả lời điện thoại, chào đón khách hàng và xử lý thanh toán. Phải có kỹ năng chăm sóc khách hàng tốt và chú ý đến chi tiết.",
      location: "Miami, FL",
      jobType: "full-time" as JobType,
      compensation_type: "hourly",
      compensation_details: "$15-18/hour based on experience",
      weekly_pay: true,
      has_housing: false,
      requirements: ["Customer service experience", "Computer skills", "Multi-tasking ability"]
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Choose a Template</h2>
      <p className="text-gray-600">Select a template as a starting point for your job posting</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TemplateCard 
          title="Nail Technician" 
          description="Template for hiring nail techs with details about commission and requirements" 
          onSelect={populateNailTechTemplate} 
        />
        
        <TemplateCard 
          title="Hair Stylist" 
          description="Template for recruiting experienced hair stylists with commission structure" 
          onSelect={populateHairStylistTemplate} 
        />
        
        <TemplateCard 
          title="Receptionist" 
          description="Template for hiring a salon front desk/receptionist position" 
          onSelect={populateReceptionistTemplate} 
        />
      </div>
    </div>
  );
};

export default JobTemplates;
