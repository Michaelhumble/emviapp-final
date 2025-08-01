import React from 'react';
import DynamicSEO from './DynamicSEO';
import { Job } from '@/types/job';

interface JobSEOProps {
  job: Job;
  baseUrl?: string;
}

const JobSEO: React.FC<JobSEOProps> = ({ job, baseUrl = 'https://emvi.app' }) => {
  const jobUrl = `${baseUrl}/${job.category}/${job.id}`;
  
  // Create SEO-friendly title
  const title = `${job.title} - ${job.location || 'Beauty Job'} | EmviApp`;
  
  // Generate description from job details
  const description = job.description 
    ? `${job.description.substring(0, 150)}...`
    : `${job.title} position available in ${job.location || 'the beauty industry'}. Apply now on EmviApp.`;
  
  // Get primary image
  const image = job.image_urls?.[0] || job.image_url || `${baseUrl}/og-job-default.jpg`;
  
  // Generate structured data for JobPosting
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description || description,
    "datePosted": job.created_at,
    "hiringOrganization": {
      "@type": "Organization",
      "name": "EmviApp",
      "sameAs": baseUrl
    },
    "jobLocation": job.location ? {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.location
      }
    } : undefined,
    "employmentType": getEmploymentType(job.category),
    "industry": "Beauty and Personal Care",
    "occupationalCategory": job.category,
    "baseSalary": job.compensation_details || job.salary_range ? {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": {
        "@type": "QuantitativeValue",
        "value": extractSalaryAmount(job.compensation_details || job.salary_range),
        "unitText": "HOUR"
      }
    } : undefined,
    "url": jobUrl,
    "image": image
  };

  return (
    <DynamicSEO
      title={title}
      description={description}
      image={image}
      url={jobUrl}
      type="article"
      tags={[job.category, 'beauty job', 'career', job.location].filter(Boolean)}
      structuredData={structuredData}
      canonicalUrl={jobUrl}
    />
  );
};

// Helper functions
function getEmploymentType(category: string): string {
  const fullTimeCategories = ['hair', 'nails', 'skincare', 'makeup'];
  return fullTimeCategories.includes(category.toLowerCase()) ? 'FULL_TIME' : 'PART_TIME';
}

function extractSalaryAmount(salaryString: string | null): number | undefined {
  if (!salaryString) return undefined;
  
  const numbers = salaryString.match(/\d+/g);
  return numbers ? parseInt(numbers[0]) : undefined;
}

export default JobSEO;