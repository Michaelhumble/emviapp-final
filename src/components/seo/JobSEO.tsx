import React from 'react';
import BaseSEO from './BaseSEO';
import { Job } from '@/types/job';
import { stripHtml, getValidThrough, shouldNoIndex } from '@/utils/seo/jobSeoLogic';
import { buildJobPostingJsonLd } from './jsonld';

interface JobSEOProps {
  job: Job;
  baseUrl?: string;
}

const JobSEO: React.FC<JobSEOProps> = ({ job, baseUrl = 'https://www.emvi.app' }) => {
  const jobUrl = `${baseUrl}/jobs/${job.id}`;
  
  // Enhanced title with location, role, and salary if available
  const title = `${job.title}${job.location ? ` in ${job.location}` : ''}${job.salary_range ? ` - ${job.salary_range}` : ''} | EmviApp Jobs`;
  
  // Enhanced meta description with key details
  const description = job.description 
    ? `${stripHtml(job.description).substring(0, 120)}... ${job.location ? `Located in ${job.location}. ` : ''}Apply now on EmviApp.`
    : `${job.title} position${job.location ? ` in ${job.location}` : ''}${job.salary_range ? ` - ${job.salary_range}` : ''}${job.company ? ` at ${job.company}` : ''}. Apply now on EmviApp's beauty job platform.`;
  
  const noIndex = shouldNoIndex(job);
  
  // Determine og:image with fallback
  const ogImage = (job as any).image || '/og-job.jpg';
  
  // JobPosting JSON-LD
  const jobJsonLd = buildJobPostingJsonLd({
    id: job.id,
    title: job.title,
    description: job.description || `${job.title} position available.`,
    location: job.location,
    salary: job.compensation_details || job.salary_range,
    company: job.company || job.contact_info?.owner_name,
    created_at: job.created_at || new Date().toISOString(),
    expires_at: job.expires_at
  });

  return (
    <BaseSEO
      title={title}
      description={description}
      canonical={jobUrl}
      ogImage={ogImage}
      noindex={noIndex}
      jsonLd={[jobJsonLd]}
      type="article"
    />
  );
};

export default JobSEO;