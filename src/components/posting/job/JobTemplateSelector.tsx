
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { IndustryType, JobFormValues } from './jobFormSchema';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface JobTemplateSelectorProps {
  onTemplateSelect: (template: JobFormValues) => void;
}

const templates: Record<string, JobFormValues> = {
  nails: {
    title: "Nail Technician Position",
    description: "We are seeking skilled nail technicians to join our salon. The ideal candidate has experience with manicures, pedicures, gel, and acrylic services. Must be detail-oriented with excellent customer service skills.",
    vietnameseDescription: "Chúng tôi đang tìm kiếm thợ nail có kỹ năng để tham gia vào tiệm của chúng tôi. Ứng viên lý tưởng có kinh nghiệm với dịch vụ làm móng tay, móng chân, gel và bột. Phải chú ý đến chi tiết với kỹ năng dịch vụ khách hàng xuất sắc.",
    location: "",
    jobType: "full-time",
    experience_level: "experienced",
    contactEmail: "",
    specialties: ["Manicure", "Pedicure", "Gel Polish", "Acrylic"],
    requirements: ["Valid license", "2+ years experience", "English speaking"]
  },
  hair: {
    title: "Hair Stylist Wanted",
    description: "Join our team as a professional hair stylist. We're looking for someone skilled in cutting, coloring, styling, and providing excellent client consultations. Must have a portfolio demonstrating versatility across hair types.",
    vietnameseDescription: "",
    location: "",
    jobType: "full-time",
    experience_level: "experienced",
    contactEmail: "",
    specialties: ["Haircuts", "Coloring", "Styling", "Treatments"],
    requirements: ["Cosmetology license", "2+ years experience", "Client-focused attitude"]
  },
  lash: {
    title: "Lash Artist Position Available",
    description: "Seeking an experienced lash artist to join our beauty studio. Must be skilled in classic and volume lash applications with attention to safety and client comfort. Knowledge of lash lifts is a plus.",
    vietnameseDescription: "",
    location: "",
    jobType: "full-time",
    experience_level: "experienced",
    contactEmail: "",
    specialties: ["Classic Lashes", "Volume Lashes", "Lash Lifts", "Lash Removal"],
    requirements: ["Lash certification", "Minimum 1 year experience", "Portfolio of work"]
  },
  massage: {
    title: "Massage Therapist Needed",
    description: "Looking for a licensed massage therapist to join our wellness center. Experience in Swedish, deep tissue, and hot stone preferred. Must have excellent anatomical knowledge and ability to customize treatments.",
    vietnameseDescription: "",
    location: "",
    jobType: "part-time",
    experience_level: "experienced",
    contactEmail: "",
    specialties: ["Swedish", "Deep Tissue", "Hot Stone", "Aromatherapy"],
    requirements: ["Massage therapy license", "Certification in massage modalities", "Professional demeanor"]
  },
  barber: {
    title: "Skilled Barber Wanted",
    description: "We're hiring experienced barbers for our modern barbershop. Looking for professionals skilled in precision cuts, fades, beard trims, and classic hot towel shaves. Must have excellent customer service skills.",
    vietnameseDescription: "",
    location: "",
    jobType: "full-time",
    experience_level: "experienced",
    contactEmail: "",
    specialties: ["Fades", "Classic Cuts", "Beard Trims", "Straight Razor Shaves"],
    requirements: ["Barber license", "2+ years experience", "Knowledge of current trends"]
  },
  makeup: {
    title: "Makeup Artist Position",
    description: "Seeking a talented makeup artist for our beauty studio. Must be skilled in various makeup techniques for different occasions including bridal, special events, and everyday looks. Product knowledge is essential.",
    vietnameseDescription: "",
    location: "",
    jobType: "part-time",
    experience_level: "experienced",
    contactEmail: "",
    specialties: ["Bridal", "Special Event", "Natural Looks", "Editorial"],
    requirements: ["Makeup certification preferred", "Updated portfolio", "Experience with diverse skin tones"]
  },
  brows: {
    title: "Brow Artist Needed",
    description: "Join our team as a specialized brow artist. Looking for someone skilled in microblading, threading, tinting, and brow mapping. Must have attention to detail and excellent symmetry skills.",
    vietnameseDescription: "",
    location: "",
    jobType: "part-time",
    experience_level: "experienced",
    contactEmail: "",
    specialties: ["Microblading", "Threading", "Tinting", "Brow Mapping"],
    requirements: ["Brow certification", "Portfolio of work", "Knowledge of facial proportions"]
  },
  skincare: {
    title: "Skincare Specialist Position",
    description: "Seeking a licensed esthetician to join our spa. Must be experienced in facials, chemical peels, extractions, and skin analysis. Knowledge of product ingredients and skincare technology is required.",
    vietnameseDescription: "",
    location: "",
    jobType: "full-time",
    experience_level: "experienced",
    contactEmail: "",
    specialties: ["Facials", "Chemical Peels", "Extractions", "Skin Analysis"],
    requirements: ["Esthetician license", "Product knowledge", "2+ years experience"]
  },
  tattoo: {
    title: "Tattoo Artist Wanted",
    description: "Looking for a professional tattoo artist to join our studio. Must have a strong portfolio demonstrating various styles and technical skill. Knowledge of sterilization practices and safety protocols is essential.",
    vietnameseDescription: "",
    location: "",
    jobType: "full-time",
    experience_level: "experienced",
    contactEmail: "",
    specialties: ["Traditional", "Realistic", "Blackwork", "Color"],
    requirements: ["Bloodborne Pathogens certification", "Portfolio of work", "3+ years experience"]
  },
  custom: {
    title: "",
    description: "",
    vietnameseDescription: "",
    location: "",
    jobType: "full-time",
    experience_level: "experienced",
    contactEmail: "",
    specialties: [],
    requirements: []
  }
};

interface TemplateCardProps {
  title: string;
  subtitle: string;
  bgColor: string;
  onClick: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ title, subtitle, bgColor, onClick }) => {
  return (
    <Card 
      className={`relative overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer ${bgColor}`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const JobTemplateSelector: React.FC<JobTemplateSelectorProps> = ({ onTemplateSelect }) => {
  const animation = useScrollAnimation({ 
    animation: 'fade-in',
    threshold: 0.1 
  });

  const handleTemplateSelect = (templateKey: string) => {
    onTemplateSelect(templates[templateKey]);
  };
  
  return (
    <div className="space-y-8" ref={animation.ref as React.RefObject<HTMLDivElement>}>
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Select a Job Template</h2>
        <p className="text-muted-foreground">Customize your job listing in one click</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
        <TemplateCard
          title="Nail Technician"
          subtitle="Fill nail tech positions quickly"
          bgColor="bg-[#F2FCE2]"
          onClick={() => handleTemplateSelect('nails')}
        />
        
        <TemplateCard
          title="Hair Stylist"
          subtitle="Find qualified hair stylists"
          bgColor="bg-[#FEF7CD]"
          onClick={() => handleTemplateSelect('hair')}
        />
        
        <TemplateCard
          title="Lash Artist"
          subtitle="Recruit skilled lash specialists"
          bgColor="bg-[#E5DEFF]"
          onClick={() => handleTemplateSelect('lash')}
        />
        
        <TemplateCard
          title="Massage Therapist"
          subtitle="Hire licensed massage professionals"
          bgColor="bg-[#FFDEE2]"
          onClick={() => handleTemplateSelect('massage')}
        />
        
        <TemplateCard
          title="Barber"
          subtitle="Connect with experienced barbers"
          bgColor="bg-[#FDE1D3]"
          onClick={() => handleTemplateSelect('barber')}
        />

        <TemplateCard
          title="Makeup Artist"
          subtitle="Find talented makeup professionals"
          bgColor="bg-[#D3E4FD]"
          onClick={() => handleTemplateSelect('makeup')}
        />

        <TemplateCard
          title="Brow Artist"
          subtitle="Recruit specialized brow techs"
          bgColor="bg-[#F1F0FB]"
          onClick={() => handleTemplateSelect('brows')}
        />

        <TemplateCard
          title="Skincare Specialist"
          subtitle="Hire licensed estheticians"
          bgColor="bg-[#F2FCE2]"
          onClick={() => handleTemplateSelect('skincare')}
        />

        <TemplateCard
          title="Tattoo Artist"
          subtitle="Connect with professional tattooers"
          bgColor="bg-[#FEF7CD]"
          onClick={() => handleTemplateSelect('tattoo')}
        />

        <TemplateCard
          title="Custom Job"
          subtitle="Create your own job template"
          bgColor="bg-[#E5DEFF]"
          onClick={() => handleTemplateSelect('custom')}
        />
      </div>

      <div className="text-center text-sm text-gray-500 pt-4">
        Inspired by Sunshine ☀️
      </div>
    </div>
  );
};

export default JobTemplateSelector;
