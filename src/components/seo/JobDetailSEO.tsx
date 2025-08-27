import React from 'react';
import ComprehensiveSEO from './ComprehensiveSEO';
import { Job } from '@/types/job';
import { SITE_BASE_URL } from '@/config/seo';

interface JobDetailSEOProps {
  job: Job;
}

const JobDetailSEO: React.FC<JobDetailSEOProps> = ({ job }) => {
  const baseUrl = SITE_BASE_URL || 'https://www.emvi.app';
  
  // Generate SEO-friendly title
  const title = `${job.title} - ${job.location || 'Beauty Job'} | EmviApp`;
  
  // Generate description from job description or use default
  const description = job.description 
    ? `${job.description.slice(0, 140)}... Apply now on EmviApp.`
    : `Apply for ${job.title} position in ${job.location || 'multiple locations'}. Join thousands of beauty professionals on EmviApp.`;

  // Generate breadcrumbs
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Jobs', url: '/jobs' },
    { name: job.category || 'Beauty', url: `/${job.category || 'jobs'}` },
    { name: job.title, url: `/jobs/${job.id}` }
  ];

  // Generate JobPosting structured data
  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description || `${job.title} position available in ${job.location || 'multiple locations'}`,
    "identifier": {
      "@type": "PropertyValue",
      "name": "EmviApp Job ID",
      "value": job.id
    },
    "datePosted": job.created_at,
    "validThrough": job.expires_at || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now if no expiry
    "employmentType": job.employment_type || "FULL_TIME",
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.salonName || "Beauty Salon",
      "sameAs": baseUrl
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.location || "Various Locations",
        "addressRegion": "US",
        "addressCountry": "US"
      }
    },
    "baseSalary": job.salary_range ? {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": {
        "@type": "QuantitativeValue",
        "value": job.salary_range,
        "unitText": "YEAR"
      }
    } : undefined,
    "workHours": "Monday to Friday",
    "qualifications": job.requirements || "Experience in beauty industry preferred",
    "responsibilities": job.description || `Perform ${job.title} duties at our beauty establishment`,
    "benefits": job.benefits || "Competitive compensation and benefits package",
    "url": `${baseUrl}/jobs/${job.id}`,
    "applicationContact": {
      "@type": "ContactPoint",
      "contactType": "HR",
      "url": `${baseUrl}/jobs/${job.id}`
    }
  };

  const structuredData = [jobPostingSchema];

  return (
    <ComprehensiveSEO
      title={title}
      description={description}
      type="article"
      canonicalUrl={`${baseUrl}/jobs/${job.id}`}
      breadcrumbs={breadcrumbs}
      structuredData={structuredData}
      tags={[
        job.category || 'beauty',
        'beauty jobs',
        'nail technician',
        'hair stylist',
        'salon jobs',
        job.location || 'beauty careers'
      ]}
    />
  );
};

export default JobDetailSEO;