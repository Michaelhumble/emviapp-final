import React from 'react';
import { Helmet } from 'react-helmet-async';

interface JobPostingStructuredDataProps {
  job: {
    id: string;
    title: string;
    description?: string;
    location?: string;
    salary_range?: string;
    company?: string;
    salonName?: string;
    created_at?: string;
    expires_at?: string;
    employment_type?: string;
    requirements?: string;
    compensation_details?: string;
    contact_info?: {
      email?: string;
      phone?: string;
      owner_name?: string;
    };
    category?: string;
    is_remote?: boolean;
  };
  baseUrl?: string;
}

const JobPostingStructuredData: React.FC<JobPostingStructuredDataProps> = ({ 
  job, 
  baseUrl = 'https://www.emvi.app' 
}) => {
  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description || `${job.title} position available at ${job.company || job.salonName || 'EmviApp partner'}.`,
    "identifier": {
      "@type": "PropertyValue",
      "name": "EmviApp Job ID",
      "value": job.id
    },
    "datePosted": job.created_at || new Date().toISOString(),
    "validThrough": job.expires_at || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    "employmentType": job.employment_type || "FULL_TIME",
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.company || job.salonName || job.contact_info?.owner_name || "Beauty Salon",
      "sameAs": baseUrl,
      "logo": `${baseUrl}/emvi-heart-og.png`
    },
    "jobLocation": job.is_remote ? {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "US"
      },
      "name": "Remote"
    } : {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.location || "Various Locations",
        "addressRegion": "US",
        "addressCountry": "US"
      }
    },
    "baseSalary": job.salary_range || job.compensation_details ? {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": {
        "@type": "QuantitativeValue",
        "value": job.salary_range || job.compensation_details,
        "unitText": "YEAR"
      }
    } : undefined,
    "workHours": job.employment_type === 'PART_TIME' ? "Part-time hours" : "Full-time hours",
    "qualifications": job.requirements || `Experience in ${job.category || 'beauty industry'} preferred`,
    "responsibilities": job.description || `Perform ${job.title} duties at our beauty establishment`,
    "benefits": "Competitive compensation and benefits package",
    "url": `${baseUrl}/jobs/${job.id}`,
    "applicationContact": {
      "@type": "ContactPoint",
      "contactType": "HR",
      "email": job.contact_info?.email,
      "telephone": job.contact_info?.phone,
      "url": `${baseUrl}/jobs/${job.id}`
    },
    "industry": "Beauty and Personal Care",
    "occupationalCategory": job.category || "Beauty Professional",
    "jobBenefits": [
      "Flexible scheduling",
      "Professional development opportunities", 
      "Competitive compensation"
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(jobPostingSchema)}
      </script>
    </Helmet>
  );
};

export default JobPostingStructuredData;