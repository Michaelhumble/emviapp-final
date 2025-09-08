import React from 'react';
import { Helmet } from 'react-helmet-async';
import { parseEmploymentType, parseSalaryInfo, parseJobLocation } from '@/utils/seo/jsonld';

interface JobPostingSchemaProps {
  job: {
    id: string;
    title: string;
    description?: string;
    company?: string;
    location?: string;
    compensationDetails?: string;
    compensationType?: string;
    category: string;
    createdAt?: string;
    updatedAt?: string;
    validUntil?: string;
  };
}

const JobPostingSchema: React.FC<JobPostingSchemaProps> = ({ job }) => {
  const employmentType = parseEmploymentType(job.compensationType, job.description, job.title);
  const salaryInfo = parseSalaryInfo(job.compensationDetails);
  const locationInfo = parseJobLocation(job.location);
  
  const validUntil = job.validUntil || 
    new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(); // 45 days from now

  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description || `${job.title} position available at ${job.company || 'beauty salon'} in ${job.location || 'various locations'}.`,
    "identifier": {
      "@type": "PropertyValue",
      "name": "EmviApp Job ID",
      "value": job.id
    },
    "datePosted": job.createdAt || new Date().toISOString(),
    "validThrough": validUntil,
    "employmentType": employmentType,
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.company || "Beauty Salon",
      "url": "https://www.emvi.app"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        ...locationInfo
      }
    },
    "industry": "Beauty and Personal Care",
    "occupationalCategory": job.category,
    ...(salaryInfo && {
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": salaryInfo.currency,
        "value": {
          "@type": "QuantitativeValue",
          "value": salaryInfo.value,
          "unitText": salaryInfo.unitText
        }
      }
    }),
    "url": `https://www.emvi.app/${job.category}/${job.id}`,
    "applicationContact": {
      "@type": "ContactPoint",
      "contactType": "HR",
      "url": `https://www.emvi.app/${job.category}/${job.id}`
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(jobPostingSchema)}
      </script>
    </Helmet>
  );
};

export default JobPostingSchema;