import React from 'react';
import ComprehensiveSEO from './ComprehensiveSEO';
import { Job } from '@/types/job';
import { SITE_BASE_URL } from '@/config/seo';

interface JobsPageSEOProps {
  jobs: Job[];
  currentPage?: number;
  location?: string;
  category?: string;
}

const JobsPageSEO: React.FC<JobsPageSEOProps> = ({ 
  jobs = [], 
  currentPage = 1,
  location,
  category
}) => {
  const baseUrl = SITE_BASE_URL || 'https://www.emvi.app';
  
  // Generate dynamic title and description
  const locationText = location ? ` in ${location}` : '';
  const categoryText = category ? `${category} ` : 'Beauty ';
  const pageText = currentPage > 1 ? ` - Page ${currentPage}` : '';
  
  const title = `${categoryText}Jobs${locationText} | EmviApp${pageText}`;
  const description = `Find ${categoryText.toLowerCase()}jobs${locationText} on EmviApp. Connect with top salons and beauty professionals. ${jobs.length} active opportunities available.`;

  // Generate ItemList structured data for visible jobs
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${categoryText}Jobs${locationText}`,
    "description": description,
    "numberOfItems": jobs.length,
    "itemListElement": jobs.slice(0, 20).map((job, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "JobPosting",
        "title": job.title,
        "description": job.description || `${job.title} position in ${job.location || 'multiple locations'}`,
        "url": `${baseUrl}/jobs/${job.id}`,
        "datePosted": job.created_at,
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": job.location || "Various Locations"
          }
        },
        "hiringOrganization": {
          "@type": "Organization",
          "name": job.salonName || "Beauty Salon"
        }
      }
    }))
  };

  // Generate JobCollection structured data
  const jobCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "Collection",
    "name": `${categoryText}Job Listings`,
    "description": `Collection of ${categoryText.toLowerCase()}job opportunities${locationText}`,
    "url": `${baseUrl}/jobs`,
    "hasPart": jobs.slice(0, 10).map(job => ({
      "@type": "JobPosting",
      "title": job.title,
      "url": `${baseUrl}/jobs/${job.id}`
    }))
  };

  const structuredData = [itemListSchema, jobCollectionSchema];

  return (
    <ComprehensiveSEO
      title={title}
      description={description}
      canonicalUrl={`${baseUrl}/jobs`}
      structuredData={structuredData}
      tags={[
        'beauty jobs',
        'nail technician jobs',
        'hair stylist jobs', 
        'barber jobs',
        'beauty careers',
        'salon opportunities',
        ...(category ? [category] : []),
        ...(location ? [location.toLowerCase()] : [])
      ]}
    />
  );
};

export default JobsPageSEO;