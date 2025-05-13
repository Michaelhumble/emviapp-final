
import { useState, useCallback } from 'react';

type TemplateType = {
  [key: string]: string;
};

const templates: Record<string, TemplateType> = {
  nails: {
    title: "Nail Technician",
    jobSummary: "Looking for experienced nail technicians to join our busy salon. Competitive pay and flexible hours available.",
    fullDescription: "We are seeking skilled nail technicians with expertise in manicures, pedicures, and nail enhancements. Our salon provides a friendly, professional environment with a loyal customer base. The ideal candidate will have excellent customer service skills and attention to detail.",
    requirements: "- At least 1 year of experience\n- Knowledge of acrylic, gel, and dip powder techniques\n- Valid nail technician license\n- Ability to communicate effectively with clients\n- Professional appearance",
    benefits: "- Competitive commission structure\n- Flexible scheduling\n- Product discounts\n- Paid training opportunities\n- Growing salon with loyal clients"
  },
  hair: {
    title: "Hair Stylist",
    jobSummary: "Seeking experienced hair stylists for upscale salon. Great earning potential.",
    fullDescription: "Join our team of talented stylists in a modern, upscale salon environment. We're looking for passionate professionals who can provide exceptional styling, cutting, coloring, and treatment services to our diverse clientele.",
    requirements: "- Cosmetology license required\n- Minimum 2 years salon experience preferred\n- Skilled in current cutting and coloring techniques\n- Portfolio of work recommended\n- Client-focused attitude",
    benefits: "- High commission rates\n- Booth rental options available\n- Continuing education opportunities\n- Retail commission incentives\n- Team-oriented culture"
  },
  spa: {
    title: "Massage Therapist",
    jobSummary: "Licensed massage therapist needed for growing day spa. Full and part-time positions available.",
    fullDescription: "Our wellness-focused day spa is expanding and seeking licensed massage therapists to join our team. We offer a variety of services including Swedish, deep tissue, hot stone, and prenatal massage in a serene, client-centered environment.",
    requirements: "- Current massage therapy license\n- Proficiency in multiple massage modalities\n- Excellent client communication skills\n- Ability to maintain detailed client records\n- Professional demeanor and appearance",
    benefits: "- Competitive pay structure\n- Flexible scheduling\n- Health benefits for full-time employees\n- Continuing education reimbursement\n- Professional development opportunities"
  },
  lashes: {
    title: "Lash Technician",
    jobSummary: "Experienced lash artist needed for boutique beauty studio. Classic and volume experience required.",
    fullDescription: "We are looking for a skilled lash technician to join our growing beauty studio. The ideal candidate will be proficient in both classic and volume lash extensions, with an eye for detail and commitment to safety and hygiene standards.",
    requirements: "- Certification in lash extensions\n- Experience with classic and volume techniques\n- Knowledge of proper sanitation procedures\n- Excellent hand-eye coordination\n- Strong time management skills",
    benefits: "- Competitive commission structure\n- Product discounts\n- Flexible schedule\n- Clean, modern workspace\n- Social media promotion of your work"
  },
  skincare: {
    title: "Esthetician",
    jobSummary: "Licensed esthetician needed for luxury spa. Experience with advanced treatments preferred.",
    fullDescription: "Join our team of skincare professionals providing high-end treatments in a luxury spa setting. We're looking for an experienced esthetician skilled in facials, chemical peels, microdermabrasion, and other advanced skincare services.",
    requirements: "- Current esthetician license\n- 2+ years of experience\n- Knowledge of premium skincare lines\n- Experience with advanced treatments\n- Excellent client consultation skills",
    benefits: "- Competitive pay plus tips\n- Retail commission opportunities\n- Continuing education\n- Employee discounts on services and products\n- Professional growth opportunities"
  }
};

export const useJobTemplates = () => {
  const [loading, setLoading] = useState(false);

  const getTemplateForIndustry = useCallback((industry: string): TemplateType | null => {
    setLoading(true);
    
    try {
      const template = templates[industry] || null;
      return template;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getTemplateForIndustry, loading };
};
