
import { Job } from "@/types/job";
import { 
  generatePlaceholderBenefits, 
  generatePlaceholderCompanyDescription, 
  generatePlaceholderQualifications, 
  generatePlaceholderResponsibilities 
} from "./placeholderGenerators";
import { generateVietnameseNailSampleJobs } from "./vietnameseNailJobSamples";

export const formatJobListings = (data: any[]): Job[] => {
  const formattedJobs = data?.map(post => {
    const metadata = post.metadata as Record<string, any> || {};
    
    // Parse responsibilities, qualifications, and benefits if they exist, or generate placeholders
    const responsibilities = metadata.responsibilities ? 
      (typeof metadata.responsibilities === 'string' ? 
        JSON.parse(metadata.responsibilities) : 
        metadata.responsibilities) :
      generatePlaceholderResponsibilities(post.title || '');
      
    const qualifications = metadata.qualifications ?
      (typeof metadata.qualifications === 'string' ? 
        JSON.parse(metadata.qualifications) : 
        metadata.qualifications) :
      generatePlaceholderQualifications();
      
    const benefits = metadata.benefits ?
      (typeof metadata.benefits === 'string' ? 
        JSON.parse(metadata.benefits) : 
        metadata.benefits) :
      generatePlaceholderBenefits(Boolean(metadata.weekly_pay));

    const companyDescription = metadata.company_description || 
      generatePlaceholderCompanyDescription(post.location || '');
    
    return {
      id: post.id,
      created_at: post.created_at,
      title: post.title || '',
      company: String(metadata.company || ''),
      location: post.location || '',
      salary_range: String(metadata.salary_range || ''),
      description: post.content || '',
      requirements: String(metadata.requirements || ''),
      weekly_pay: Boolean(metadata.weekly_pay) || false,
      owner_will_train: Boolean(metadata.owner_will_train) || false,
      employment_type: String(metadata.employment_type || 'full-time'),
      user_id: post.user_id,
      is_nationwide: post.is_nationwide || false,
      responsibilities,
      qualifications,
      benefits,
      company_description: companyDescription,
      contact_info: {
        phone: metadata.phone || '(555) 123-4567',
        email: metadata.email || 'contact@salon.com'
      },
      trust_indicators: {
        verified: Math.random() > 0.3, // 70% chance of being verified
        activelyHiring: Math.random() > 0.2, // 80% chance of actively hiring
        chatAvailable: Math.random() > 0.5 // 50% chance of chat available
      }
    };
  }) || [];

  // Add sample Vietnamese nail job listings but only if there are fewer than 5 real jobs
  if (formattedJobs.length < 5) {
    const sampleJobs = generateVietnameseNailSampleJobs(15);
    return [...formattedJobs, ...sampleJobs];
  }
  
  return formattedJobs;
};
