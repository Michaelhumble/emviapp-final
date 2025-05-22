
import { JobFormValues, IndustryType, JobTemplateType } from '@/components/posting/job/jobFormSchema';
import { beautySpecialties, commonRequirements } from '@/data/specialties';

// Export the templates for different job types
export const getJobTemplate = (templateType: JobTemplateType): JobFormValues => {
  // Default template values shared across all templates
  const defaultTemplate: JobFormValues = {
    title: '',
    salonName: '',
    description: '',
    location: '',
    jobType: 'full-time',
    compensation_type: 'hourly',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    weekly_pay: false,
    has_housing: false,
    has_wax_room: false,
    owner_will_train: false,
    no_supply_deduction: false,
    requirements: [],
    specialties: [],
    industry: templateType,
  };

  // Template-specific values
  switch (templateType) {
    case 'nails':
      return {
        ...defaultTemplate,
        title: 'Nail Technician',
        description: 'We are seeking experienced nail technicians to join our growing team. The ideal candidate should be skilled in manicures, pedicures, and various nail enhancement techniques.',
        vietnameseDescription: 'Chúng tôi đang tìm kiếm thợ nail có kinh nghiệm để tham gia vào đội ngũ đang phát triển của chúng tôi. Ứng viên lý tưởng phải có kỹ năng làm móng tay, móng chân và các kỹ thuật làm móng khác nhau.',
        specialties: beautySpecialties.nails,
        requirements: commonRequirements,
        compensation_type: 'commission',
        salary_range: '$800-1200/week',
        weekly_pay: true,
        experience_level: '1+ years',
      };
    case 'hair':
      return {
        ...defaultTemplate,
        title: 'Hair Stylist',
        description: 'Join our salon as a professional hair stylist. We're looking for talented individuals with a passion for hair cutting, coloring, and styling techniques.',
        specialties: beautySpecialties.hair,
        requirements: commonRequirements,
        compensation_type: 'commission',
        salary_range: '$800-1500/week',
        weekly_pay: true,
        experience_level: '2+ years',
      };
    case 'lashes':
      return {
        ...defaultTemplate,
        title: 'Lash Technician',
        description: 'We are looking for certified lash technicians skilled in classic and volume lash extensions. Join our beauty studio and grow your career in a supportive environment.',
        specialties: beautySpecialties.lashes,
        requirements: commonRequirements,
        compensation_type: 'hourly',
        salary_range: '$700-1100/week',
        experience_level: '1+ years',
      };
    case 'barber':
      return {
        ...defaultTemplate,
        title: 'Barber',
        description: 'Experienced barber needed for our modern barbershop. Skills in men's cuts, fades, beard trimming, and hot towel shaves are required.',
        specialties: beautySpecialties.barber,
        requirements: commonRequirements,
        compensation_type: 'commission',
        salary_range: '$800-1400/week',
        experience_level: '2+ years',
      };
    case 'skincare':
      return {
        ...defaultTemplate,
        title: 'Esthetician',
        description: 'Licensed esthetician wanted for our spa. Must be experienced in facials, peels, and other skincare treatments.',
        specialties: beautySpecialties.skincare,
        requirements: commonRequirements,
        compensation_type: 'hourly',
        salary_range: '$700-1200/week',
        experience_level: '1+ years',
      };
    case 'massage':
      return {
        ...defaultTemplate,
        title: 'Massage Therapist',
        description: 'Licensed massage therapist needed for our wellness center. Experience in various massage modalities required.',
        specialties: beautySpecialties.massage,
        requirements: commonRequirements,
        compensation_type: 'hourly',
        salary_range: '$800-1300/week',
        experience_level: '2+ years',
      };
    case 'tattoo':
      return {
        ...defaultTemplate,
        title: 'Tattoo Artist',
        description: 'Talented tattoo artist with a strong portfolio needed for our studio. Must have excellent line work and shading skills.',
        specialties: beautySpecialties.tattoo,
        requirements: commonRequirements,
        compensation_type: 'commission',
        salary_range: '$1000-2500/week',
        experience_level: '3+ years',
      };
    case 'makeup':
      return {
        ...defaultTemplate,
        title: 'Makeup Artist',
        description: 'Professional makeup artist needed for our salon. Experience in bridal, special occasion, and editorial makeup preferred.',
        specialties: beautySpecialties.makeup,
        requirements: commonRequirements,
        compensation_type: 'commission',
        salary_range: '$700-1500/week',
        experience_level: '2+ years',
      };
    case 'booth':
      return {
        ...defaultTemplate,
        title: 'Booth Rental Available',
        description: 'Booth rental opportunity for independent beauty professionals. Great location with high foot traffic and established clientele.',
        requirements: ['Valid professional license', 'Own clientele preferred', 'Must carry own liability insurance', 'Professional attitude'],
        compensation_type: 'commission',
        salary_range: 'Varies based on services',
        experience_level: '2+ years',
      };
    case 'spa':
    case 'receptionist':
    case 'manager':
    case 'beauty':
      return {
        ...defaultTemplate,
        title: templateType === 'spa' ? 'Spa Technician' : 
               templateType === 'receptionist' ? 'Salon Receptionist' :
               templateType === 'manager' ? 'Salon Manager' : 'Beauty Professional',
        description: `We are currently hiring a ${templateType === 'spa' ? 'Spa Technician' : 
               templateType === 'receptionist' ? 'Salon Receptionist' :
               templateType === 'manager' ? 'Salon Manager' : 'Beauty Professional'} to join our team.`,
        requirements: commonRequirements.slice(0, 5),
        compensation_type: 'hourly',
        salary_range: templateType === 'manager' ? '$900-1800/week' : '$600-1000/week',
        experience_level: templateType === 'manager' ? '3+ years' : '1+ years',
      };
    case 'custom':
    default:
      return defaultTemplate;
  }
};

// Export any types that need to be used by other components
export type { JobTemplateType };
