import React from 'react';
import { Helmet } from 'react-helmet-async';
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
  const canonical = `https://www.emvi.app${url}`;
  const imageAlt = generateImageAlt(job.title, job.category);
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="article" />
      <meta property="og:image" content="https://www.emvi.app/og-job.jpg" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://www.emvi.app/og-job.jpg" />
      <meta name="twitter:image:alt" content={imageAlt} />
    </Helmet>
  );
};

export default JobPageSEO;