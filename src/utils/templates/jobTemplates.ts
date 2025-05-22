
import { JobFormValues } from "@/components/posting/job/jobFormSchema";

export interface JobTemplate {
  id: string;
  defaultValues: Partial<JobFormValues>;
}

export const jobTemplates: JobTemplate[] = [
  {
    id: 'nails',
    defaultValues: {
      title: 'Nail Technician Needed',
      jobType: 'full-time',
      description: 'We are seeking an experienced nail technician skilled in manicures, pedicures, and nail art to join our team.',
      vietnameseDescription: 'Chúng tôi đang tìm kiếm một kỹ thuật viên làm móng có kinh nghiệm thành thạo các dịch vụ làm móng tay, móng chân và nghệ thuật móng.',
      specialties: ['acrylic', 'gel', 'dip-powder', 'pedicure', 'manicure'],
      weekly_pay: true,
      compensation_type: 'commission',
    }
  },
  {
    id: 'hair',
    defaultValues: {
      title: 'Hair Stylist Position Available',
      jobType: 'full-time',
      description: 'Seeking talented hair stylist with skills in cutting, coloring, and styling for our growing salon.',
      specialties: ['haircut', 'color', 'highlights', 'balayage', 'styling'],
      compensation_type: 'commission',
    }
  },
  {
    id: 'lashes',
    defaultValues: {
      title: 'Lash Technician Needed',
      jobType: 'full-time',
      description: 'Seeking experienced lash technician skilled in eyelash extensions and lash lifting services.',
      specialties: ['lashes', 'extensions'],
      compensation_type: 'commission',
    }
  },
  {
    id: 'barber',
    defaultValues: {
      title: 'Barber Needed',
      jobType: 'full-time',
      description: 'Looking for a skilled barber with experience in men\'s grooming, fades, and traditional cuts.',
      specialties: ['barber', 'fades', 'beard-trim'],
      compensation_type: 'commission',
    }
  },
  {
    id: 'skincare',
    defaultValues: {
      title: 'Esthetician Position',
      jobType: 'full-time',
      description: 'Seeking licensed esthetician for facials, skin treatments, and skincare consultations.',
      specialties: ['facial', 'skincare', 'waxing'],
      compensation_type: 'hourly',
    }
  },
  {
    id: 'spa',
    defaultValues: {
      title: 'Spa Technician Needed',
      jobType: 'full-time',
      description: 'Seeking spa technician for body treatments, wraps, and therapeutic services.',
      specialties: ['spa', 'bodywraps', 'treatments'],
      compensation_type: 'hourly',
    }
  },
  {
    id: 'massage',
    defaultValues: {
      title: 'Massage Therapist Needed',
      jobType: 'full-time',
      description: 'Looking for licensed massage therapist experienced in various massage modalities.',
      specialties: ['massage', 'deep-tissue', 'swedish'],
      compensation_type: 'commission',
    }
  },
  {
    id: 'makeup',
    defaultValues: {
      title: 'Makeup Artist Position',
      jobType: 'part-time',
      description: 'Seeking talented makeup artist for various occasions including bridal and special events.',
      specialties: ['makeup', 'bridal', 'special-event'],
      compensation_type: 'commission',
    }
  },
  {
    id: 'tattoo',
    defaultValues: {
      title: 'Tattoo Artist Wanted',
      jobType: 'full-time',
      description: 'Seeking experienced tattoo artist with strong portfolio to join our studio.',
      specialties: ['tattoo', 'custom-design'],
      compensation_type: 'commission',
    }
  },
  {
    id: 'receptionist',
    defaultValues: {
      title: 'Salon Receptionist Position',
      jobType: 'full-time',
      description: 'Seeking friendly, organized receptionist to manage front desk operations.',
      specialties: [],
      compensation_type: 'hourly',
    }
  },
  {
    id: 'manager',
    defaultValues: {
      title: 'Salon Manager Needed',
      jobType: 'full-time',
      description: 'Looking for experienced salon manager to oversee daily operations and team management.',
      specialties: [],
      compensation_type: 'salary',
    }
  },
  {
    id: 'booth',
    defaultValues: {
      title: 'Booth Rental Available',
      jobType: 'commission',
      description: 'Booth rental space available for independent beauty professionals in prime location.',
      specialties: [],
    }
  }
];

export const getJobTemplate = (industryId: string): Partial<JobFormValues> => {
  const template = jobTemplates.find(t => t.id === industryId);
  return template?.defaultValues || {};
};
