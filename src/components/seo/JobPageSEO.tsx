import React from 'react';
import BaseSEO from './BaseSEO';
import { generateMetaDescription, generateImageAlt } from '@/utils/seoHelpers';

interface JobPageSEOProps {
  job: {
    title: string;
    description?: string;
    location?: string;
    category: string;
    company?: string;
  };
  url: string;
}

const JobPageSEO: React.FC<JobPageSEOProps> = ({ job, url }) => {
  const title = `${job.title} - ${job.location || 'Remote'} | EmviApp`;
  const description = generateMetaDescription(
    job.description || `${job.title} position at ${job.company || 'premium salon'}. Join EmviApp to find your dream beauty career.`,
    160
  );
  const imageAlt = generateImageAlt(job.title, job.category);
  
  return (
    <BaseSEO
      title={title}
      description={description}
      canonical={url}
      type="article"
      ogImage="/og-job.jpg"
    />
  );
};

export default JobPageSEO;