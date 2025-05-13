
import { useCallback } from 'react';

export const useJobTemplates = () => {
  const getTemplateForIndustry = useCallback((industry: string) => {
    switch (industry) {
      case 'nails':
        return {
          title: 'Nail Technician',
          jobSummary: 'We are seeking experienced nail technicians to join our friendly salon. Offering competitive pay and a supportive team environment.',
          requirements: '- 2+ years experience with acrylics, dip, and gel\n- Valid nail license\n- Strong customer service skills\n- English proficiency (Vietnamese is a plus)\n- Reliable transportation',
          benefits: '- Competitive commission (up to 70%)\n- Health insurance available\n- Flexible schedule\n- Friendly work environment\n- Weekly pay available'
        };
      case 'hair':
        return {
          title: 'Hair Stylist',
          jobSummary: 'Looking for skilled hair stylists to work in our full-service salon. Great opportunity for those with a passion for hair design and client satisfaction.',
          requirements: '- Cosmetology license\n- 2+ years experience in cutting, coloring, and styling\n- Knowledge of current trends\n- Strong client communication skills\n- Portfolio of work preferred',
          benefits: '- Competitive pay structure\n- Flexible scheduling\n- Training opportunities\n- Product discounts\n- Growth potential'
        };
      case 'spa':
        return {
          title: 'Massage Therapist',
          jobSummary: 'Seeking licensed massage therapists to join our wellness spa. Create personalized therapeutic experiences in a relaxing environment.',
          requirements: '- Massage therapy license\n- 1+ years professional experience\n- Knowledge of multiple modalities (Swedish, Deep Tissue, etc.)\n- Excellent customer service skills\n- Ability to maintain client records',
          benefits: '- Competitive pay plus tips\n- Flexible scheduling\n- Continuing education opportunities\n- Free treatments\n- Professional development support'
        };
      case 'barber':
        return {
          title: 'Barber',
          jobSummary: 'Join our modern barbershop team. We focus on precision cuts, classic shaves, and exceptional client experiences.',
          requirements: '- Barber license\n- 1+ years experience\n- Proficiency in fade techniques and beard grooming\n- Customer-oriented approach\n- Reliability and punctuality',
          benefits: '- Competitive commission structure\n- Flexible schedule\n- Training on latest techniques\n- Product discounts\n- Friendly team atmosphere'
        };
      default:
        return null;
    }
  }, []);

  return {
    getTemplateForIndustry
  };
};
