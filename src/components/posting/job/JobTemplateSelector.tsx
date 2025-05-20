
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brush, FileSpreadsheet, Ruler, Sparkles } from 'lucide-react';
import { JobFormValues } from './jobFormSchema';
import { cn } from '@/lib/utils';

export type JobTemplateType = 'nail-tech' | 'hair-stylist' | 'esthetician' | 'custom';

interface JobTemplateSelectorProps {
  onTemplateSelect: (template: JobFormValues, templateType: JobTemplateType) => void;
}

const JobTemplateSelector: React.FC<JobTemplateSelectorProps> = ({ onTemplateSelect }) => {
  const templates: { [key in JobTemplateType]: { name: string; title: string; description: string; icon: React.ReactNode; template: JobFormValues } } = {
    'nail-tech': {
      name: 'Nail Technician',
      title: 'Hiring Experienced Nail Technician',
      description: 'Our salon is looking for a skilled nail technician to join our team.',
      icon: <Ruler className="h-6 w-6" />,
      template: {
        title: 'Experienced Nail Technician Needed',
        description: 'We are currently seeking an experienced nail technician to join our growing team. The ideal candidate will have at least 1 year of experience with acrylic, gel, and dip powder techniques. Our salon offers competitive commission, a friendly environment, and consistent clientele.',
        vietnameseDescription: 'Chúng tôi đang tìm kiếm thợ nail có kinh nghiệm để tham gia đội ngũ đang phát triển của chúng tôi. Ứng viên lý tưởng sẽ có ít nhất 1 năm kinh nghiệm với các kỹ thuật acrylic, gel và dip powder. Salon của chúng tôi cung cấp hoa hồng cạnh tranh, môi trường thân thiện và khách hàng ổn định.',
        location: '',
        jobType: 'Full-time',
        compensation_type: 'Commission',
        compensation_details: '60-70% commission',
        salonName: '',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        weekly_pay: true,
        has_housing: false,
        owner_will_train: false,
        no_supply_deduction: true,
        requirements: ['license', 'experience', 'english'],
        specialties: ['acrylic', 'gel', 'dip-powder']
      }
    },
    'hair-stylist': {
      name: 'Hair Stylist',
      title: 'Hair Stylist Position Available',
      description: 'Join our team as a creative hair stylist with opportunities for growth.',
      icon: <Brush className="h-6 w-6" />,
      template: {
        title: 'Hair Stylist / Colorist Wanted',
        description: 'Looking for a talented hair stylist with coloring experience to join our upscale salon. We offer a supportive team environment, ongoing education opportunities, and a high-end clientele. Experience with balayage, highlights, and current color trends is preferred.',
        vietnameseDescription: 'Đang tìm kiếm một thợ làm tóc tài năng có kinh nghiệm nhuộm để tham gia salon cao cấp của chúng tôi. Chúng tôi cung cấp môi trường làm việc hỗ trợ, cơ hội đào tạo liên tục và khách hàng cao cấp. Ưu tiên kinh nghiệm với balayage, highlights và xu hướng màu hiện tại.',
        location: '',
        jobType: 'Full-time',
        compensation_type: 'Hourly + Commission',
        compensation_details: 'Base hourly rate plus 40-50% commission',
        salonName: '',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        weekly_pay: true,
        has_housing: false,
        owner_will_train: false,
        no_supply_deduction: true,
        requirements: ['license', 'experience', 'english'],
        specialties: ['color', 'balayage', 'haircut']
      }
    },
    'esthetician': {
      name: 'Esthetician',
      title: 'Esthetician Position Open',
      description: 'Seeking a licensed esthetician for facials, waxing, and skincare services.',
      icon: <Sparkles className="h-6 w-6" />,
      template: {
        title: 'Licensed Esthetician Needed',
        description: 'We are hiring a licensed esthetician to provide facials, waxing, and other skincare services. The ideal candidate will have experience with various facial treatments, lash services, and waxing techniques. We provide a clean, modern workspace with all equipment provided.',
        vietnameseDescription: 'Chúng tôi đang tuyển dụng một chuyên viên thẩm mỹ được cấp phép để cung cấp dịch vụ chăm sóc da mặt, wax lông và các dịch vụ chăm sóc da khác. Ứng viên lý tưởng sẽ có kinh nghiệm với các liệu pháp chăm sóc da mặt, dịch vụ mi và kỹ thuật wax lông. Chúng tôi cung cấp không gian làm việc sạch sẽ, hiện đại với đầy đủ thiết bị.',
        location: '',
        jobType: 'Full-time',
        compensation_type: 'Hourly + Commission',
        compensation_details: 'Hourly rate + tips + commission on product sales',
        salonName: '',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        weekly_pay: true,
        has_housing: false,
        owner_will_train: false,
        no_supply_deduction: true,
        requirements: ['license', 'experience', 'english'],
        specialties: ['facial', 'waxing', 'lashes']
      }
    },
    'custom': {
      name: 'Blank Template',
      title: 'Create Custom Job Post',
      description: 'Start from scratch and create a fully customized job posting.',
      icon: <FileSpreadsheet className="h-6 w-6" />,
      template: {
        title: '',
        description: '',
        vietnameseDescription: '',
        location: '',
        jobType: '',
        compensation_type: '',
        compensation_details: '',
        salonName: '',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        weekly_pay: false,
        has_housing: false,
        owner_will_train: false,
        no_supply_deduction: false,
        requirements: [],
        specialties: []
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-center">Select a Template</h2>
      <p className="text-center text-gray-600 mb-8">Choose a pre-filled template or create a custom job post from scratch.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(Object.keys(templates) as JobTemplateType[]).map((key) => {
          const template = templates[key];
          
          return (
            <Card 
              key={key}
              className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                key === 'custom' && "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200"
              )}
              onClick={() => onTemplateSelect(template.template, key)}
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "p-2 rounded-full",
                    key === 'nail-tech' && "bg-blue-100 text-blue-700",
                    key === 'hair-stylist' && "bg-purple-100 text-purple-700",
                    key === 'esthetician' && "bg-pink-100 text-pink-700",
                    key === 'custom' && "bg-gray-100 text-gray-700"
                  )}>
                    {template.icon}
                  </div>
                  <CardTitle>{template.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-medium mb-2">{template.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                <Button 
                  variant="outline"
                  className={cn(
                    "w-full",
                    key === 'custom' && "border-gray-300 hover:bg-gray-100"
                  )}
                >
                  Use This Template
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default JobTemplateSelector;
