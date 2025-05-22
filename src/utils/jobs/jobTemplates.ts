
import { JobFormValues, IndustryType, JobTemplateType } from '@/components/posting/job/jobFormSchema';

export const getJobTemplate = (type: JobTemplateType): JobFormValues => {
  switch (type) {
    case 'nails':
      return {
        title: 'Nail Technician',
        salonName: '',
        description: 'We are seeking experienced nail technicians to join our salon team. Successful candidates will perform manicures, pedicures, and nail enhancements with excellent attention to detail and customer service.',
        vietnameseDescription: 'Chúng tôi đang tìm kiếm thợ nail có kinh nghiệm để gia nhập đội ngũ của tiệm. Ứng viên sẽ thực hiện các dịch vụ làm móng tay, móng chân và đắp móng với sự chú ý đến chi tiết và dịch vụ khách hàng xuất sắc.',
        location: '',
        jobType: 'full-time',
        compensation_type: 'commission',
        compensation_details: '60/40 split',
        weekly_pay: true,
        has_housing: false,
        has_wax_room: false,
        owner_will_train: false,
        no_supply_deduction: false,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        requirements: ['Valid nail technician license', 'At least 1 year experience', 'Excellent customer service skills', 'Ability to work weekends'],
        specialties: ['Manicures', 'Pedicures', 'Gel', 'Acrylic', 'Nail Art'],
        salary_range: '$800-$1500/week',
        experience_level: '1+ years',
        industry: 'nails',
        templateType: 'nails'
      };

    case 'hair':
      return {
        title: 'Hair Stylist',
        salonName: '',
        description: 'Looking for a talented Hair Stylist to join our team. The ideal candidate will provide exceptional hair services including cutting, coloring, styling, and treatments. Must have a passion for customer satisfaction and staying current with industry trends.',
        vietnameseDescription: '',
        location: '',
        jobType: 'full-time',
        compensation_type: 'commission',
        compensation_details: '50/50 split',
        weekly_pay: true,
        has_housing: false,
        has_wax_room: false,
        owner_will_train: false,
        no_supply_deduction: false,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        requirements: ['Cosmetology license', 'Experience with cutting and coloring', 'Strong communication skills', 'Portfolio of previous work preferred'],
        specialties: ['Hair Cutting', 'Color', 'Highlights', 'Styling', 'Extensions'],
        salary_range: '$30,000-$60,000/year',
        experience_level: '2+ years',
        industry: 'hair',
        templateType: 'hair'
      };

    case 'lashes':
      return {
        title: 'Lash Technician',
        salonName: '',
        description: 'We are looking for a certified Lash Technician to join our beauty team. You will be responsible for applying and maintaining eyelash extensions with precision and attention to detail.',
        vietnameseDescription: '',
        location: '',
        jobType: 'full-time',
        compensation_type: 'commission',
        compensation_details: '55/45 split',
        weekly_pay: false,
        has_housing: false,
        has_wax_room: false,
        owner_will_train: false,
        no_supply_deduction: false,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        requirements: ['Lash certification', 'Good eye-hand coordination', 'Attention to detail', 'Knowledge of lash application techniques'],
        specialties: ['Classic Lashes', 'Volume Lashes', 'Hybrid Sets', 'Lash Lifts'],
        salary_range: '$700-$1200/week',
        experience_level: '1+ years',
        industry: 'lashes',
        templateType: 'lashes'
      };

    case 'booth':
      return {
        title: 'Booth Rental Available',
        salonName: '',
        description: 'Prime booth rental available for beauty professionals. Great location with high foot traffic and established clientele. Perfect for nail technicians, hair stylists, estheticians, or lash artists looking to be their own boss.',
        vietnameseDescription: '',
        location: '',
        jobType: 'contract',
        compensation_type: 'hourly', // This needs to match one of the enum values
        compensation_details: 'Weekly/monthly booth rental',
        weekly_pay: false,
        has_housing: false,
        has_wax_room: false,
        owner_will_train: false,
        no_supply_deduction: false,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        requirements: ['Valid cosmetology or related license', 'Own clientele preferred', 'Professional attitude', 'Liability insurance'],
        specialties: [],
        salary_range: 'Varies based on services',
        experience_level: '1+ years',
        industry: 'booth',
        templateType: 'booth'
      };

    case 'skincare':
      return {
        title: 'Esthetician',
        salonName: '',
        description: 'Seeking a licensed Esthetician to join our spa team. Responsibilities include facials, skin treatments, waxing, and skin care consultations. Must have excellent customer service skills.',
        vietnameseDescription: '',
        location: '',
        jobType: 'full-time',
        compensation_type: 'commission',
        compensation_details: '50/50 split',
        weekly_pay: false,
        has_housing: false,
        has_wax_room: false,
        owner_will_train: false,
        no_supply_deduction: false,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        requirements: ['Esthetician license', 'Knowledge of skin types and treatments', 'Experience with facial treatments and waxing', 'Retail sales ability'],
        specialties: ['Facials', 'Chemical Peels', 'Microdermabrasion', 'Waxing', 'Skin Analysis'],
        salary_range: '$35,000-$50,000/year',
        experience_level: '2+ years',
        industry: 'skincare',
        templateType: 'skincare'
      };

    case 'spa':
      return {
        title: 'Spa Technician',
        salonName: '',
        description: 'Join our luxury spa as a Spa Technician providing massage, body treatments, and spa services. Must have excellent technique and a calming presence.',
        vietnameseDescription: '',
        location: '',
        jobType: 'full-time',
        compensation_type: 'hourly',
        compensation_details: '$20-25/hr plus tips',
        weekly_pay: false,
        has_housing: false,
        has_wax_room: false,
        owner_will_train: false,
        no_supply_deduction: false,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        requirements: ['Massage therapy license or spa certification', 'Experience with body treatments', 'Professional demeanor', 'Available weekends'],
        specialties: ['Swedish Massage', 'Body Wraps', 'Salt Scrubs', 'Hot Stone Therapy'],
        salary_range: '$30,000-$45,000/year',
        experience_level: '1+ years',
        industry: 'spa',
        templateType: 'spa'
      };

    case 'receptionist':
      return {
        title: 'Salon Receptionist',
        salonName: '',
        description: 'We are seeking a professional front desk receptionist for our salon. Responsibilities include greeting clients, scheduling appointments, answering phones, and processing payments.',
        vietnameseDescription: '',
        location: '',
        jobType: 'full-time',
        compensation_type: 'hourly',
        compensation_details: '$15-18/hr',
        weekly_pay: false,
        has_housing: false,
        has_wax_room: false,
        owner_will_train: false,
        no_supply_deduction: false,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        requirements: ['Previous customer service experience', 'Basic computer skills', 'Multi-tasking ability', 'Professional appearance'],
        specialties: [],
        salary_range: '$25,000-$35,000/year',
        experience_level: 'Entry level',
        industry: 'receptionist',
        templateType: 'receptionist'
      };

    case 'manager':
      return {
        title: 'Salon Manager',
        salonName: '',
        description: 'Experienced Salon Manager needed to oversee daily operations, staff management, inventory control, and client satisfaction. Looking for a leader who can help grow our business.',
        vietnameseDescription: '',
        location: '',
        jobType: 'full-time',
        compensation_type: 'salary',
        compensation_details: 'Competitive salary plus bonus',
        weekly_pay: false,
        has_housing: false,
        has_wax_room: false,
        owner_will_train: false,
        no_supply_deduction: false,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        requirements: ['3+ years salon management experience', 'Staff supervision experience', 'Strong business acumen', 'Customer service excellence'],
        specialties: [],
        salary_range: '$40,000-$60,000/year',
        experience_level: '3+ years',
        industry: 'manager',
        templateType: 'manager'
      };

    case 'massage':
      return {
        title: 'Massage Therapist',
        salonName: '',
        description: 'Licensed Massage Therapist wanted for busy spa. Must be proficient in various massage techniques including Swedish, deep tissue, and hot stone therapy.',
        vietnameseDescription: '',
        location: '',
        jobType: 'full-time',
        compensation_type: 'commission',
        compensation_details: '60/40 split',
        weekly_pay: false,
        has_housing: false,
        has_wax_room: false,
        owner_will_train: false,
        no_supply_deduction: false,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        requirements: ['Massage therapy license', 'Knowledge of multiple massage techniques', 'Physical stamina', 'Professional demeanor'],
        specialties: ['Swedish Massage', 'Deep Tissue', 'Sports Massage', 'Hot Stone'],
        salary_range: '$35,000-$55,000/year',
        experience_level: '2+ years',
        industry: 'massage',
        templateType: 'massage'
      };

    case 'tattoo':
      return {
        title: 'Tattoo Artist',
        salonName: '',
        description: 'Talented Tattoo Artist needed for established studio. Must have a strong portfolio, excellent drawing skills, and knowledge of tattoo techniques and safety protocols.',
        vietnameseDescription: '',
        location: '',
        jobType: 'full-time',
        compensation_type: 'commission',
        compensation_details: '50/50 split',
        weekly_pay: false,
        has_housing: false,
        has_wax_room: false,
        owner_will_train: false,
        no_supply_deduction: false,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        requirements: ['Professional tattoo experience', 'Strong portfolio', 'Knowledge of sterilization procedures', 'Artistic ability'],
        specialties: ['Traditional', 'Realism', 'Japanese', 'Black and Grey', 'Color Work'],
        salary_range: 'Commission-based',
        experience_level: '3+ years',
        industry: 'tattoo',
        templateType: 'tattoo'
      };

    case 'makeup':
      return {
        title: 'Makeup Artist',
        salonName: '',
        description: 'Creative Makeup Artist needed for our beauty studio. Experience with bridal, special event, and editorial makeup application required. Must be able to work with diverse clientele.',
        vietnameseDescription: '',
        location: '',
        jobType: 'part-time',
        compensation_type: 'commission',
        compensation_details: '60/40 split',
        weekly_pay: false,
        has_housing: false,
        has_wax_room: false,
        owner_will_train: false,
        no_supply_deduction: false,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        requirements: ['Makeup certification preferred', 'Professional makeup kit', 'Portfolio of previous work', 'Excellent color theory knowledge'],
        specialties: ['Bridal', 'Special Event', 'Natural Makeup', 'Glamour', 'Editorial'],
        salary_range: 'Varies by bookings',
        experience_level: '1+ years',
        industry: 'makeup',
        templateType: 'makeup'
      };

    case 'barber':
      return {
        title: 'Barber',
        salonName: '',
        description: 'Professional Barber wanted for modern barbershop. Skills in precision cutting, fades, beard grooming, and straight razor shaves required. Must have excellent customer service skills.',
        vietnameseDescription: '',
        location: '',
        jobType: 'full-time',
        compensation_type: 'commission',
        compensation_details: '60/40 split',
        weekly_pay: false,
        has_housing: false,
        has_wax_room: false,
        owner_will_train: false,
        no_supply_deduction: false,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        requirements: ['Barber license', 'Experience with modern cutting techniques', 'Knowledge of men\'s grooming trends', 'Customer service skills'],
        specialties: ['Fades', 'Beard Trims', 'Straight Razor Shaves', 'Hair Design'],
        salary_range: '$30,000-$50,000/year',
        experience_level: '2+ years',
        industry: 'barber',
        templateType: 'barber'
      };

    case 'beauty':
      return {
        title: 'Beauty Professional',
        salonName: '',
        description: 'Seeking a skilled Beauty Professional with multiple specialties to join our full-service salon. Experience in at least two beauty disciplines preferred.',
        vietnameseDescription: '',
        location: '',
        jobType: 'full-time',
        compensation_type: 'commission',
        compensation_details: '55/45 split',
        weekly_pay: false,
        has_housing: false,
        has_wax_room: false,
        owner_will_train: false,
        no_supply_deduction: false,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        requirements: ['Relevant beauty licensing', 'Multi-discipline skills preferred', 'Client-focused attitude', 'Team player'],
        specialties: [],
        salary_range: 'Based on experience and services',
        experience_level: '2+ years',
        industry: 'beauty',
        templateType: 'beauty'
      };

    case 'custom':
    default:
      return {
        title: '',
        salonName: '',
        description: '',
        vietnameseDescription: '',
        location: '',
        jobType: 'full-time',
        compensation_type: 'hourly',
        compensation_details: '',
        weekly_pay: false,
        has_housing: false,
        has_wax_room: false,
        owner_will_train: false,
        no_supply_deduction: false,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        requirements: [],
        specialties: [],
        salary_range: '',
        experience_level: '',
        industry: 'custom',
        templateType: 'custom'
      };
  }
};
