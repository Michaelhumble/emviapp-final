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
  
  const title = `${job.title} - ${job.location || 'Remote'} | EmviApp`;
  const description = stripHtml(job.description)?.substring(0, 160) || 
    `${job.title} position in ${job.location || 'Remote'}. Apply now on EmviApp.`;
  
  const noIndex = shouldNoIndex(job);
  
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
      ogImage={`${baseUrl}/og-job.jpg`}
      noindex={noIndex}
      jsonLd={[jobJsonLd]}
      type="article"
    />
  );
};

export default JobSEO;