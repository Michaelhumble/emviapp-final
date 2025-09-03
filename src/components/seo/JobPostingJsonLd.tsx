import React from 'react';
import { sanitizeHtmlForJsonLd, parseEmploymentType, parseSalaryInfo, parseJobLocation } from '@/utils/seo/jsonld';

export interface JobPostingProps {
  id: string;
  title: string;
  descriptionHtml: string;
  datePostedISO: string;
  validThroughISO?: string;
  employmentType?: string[];
  hiringOrganization: {
    name: string;
    sameAs?: string;
    logoUrl?: string;
  };
  jobLocation: {
    streetAddress?: string;
    addressLocality: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry: string;
  };
  baseSalary?: {
    currency: string;
    value: number;
    unitText: "HOUR" | "DAY" | "WEEK" | "MONTH" | "YEAR";
  };
  applicantLocationRequirements?: string;
  directApply?: boolean;
  languages?: string[];
  canonicalUrl: string;
}

const JobPostingJsonLd: React.FC<JobPostingProps> = ({
  id,
  title,
  descriptionHtml,
  datePostedISO,
  validThroughISO,
  employmentType,
  hiringOrganization,
  jobLocation,
  baseSalary,
  applicantLocationRequirements,
  directApply = true,
  languages,
  canonicalUrl
}) => {
  // Sanitize description
  const sanitizedDescription = sanitizeHtmlForJsonLd(descriptionHtml);
  
  // Build the JSON-LD object
  const jsonLd: any = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": title,
    "description": sanitizedDescription,
    "datePosted": datePostedISO,
    "identifier": {
      "@type": "PropertyValue",
      "name": "EmviApp Job ID",
      "value": id
    },
    "url": canonicalUrl,
    "hiringOrganization": {
      "@type": "Organization",
      "name": hiringOrganization.name,
      ...(hiringOrganization.sameAs && { "sameAs": hiringOrganization.sameAs }),
      ...(hiringOrganization.logoUrl && {
        "logo": {
          "@type": "ImageObject",
          "url": hiringOrganization.logoUrl
        }
      })
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        ...(jobLocation.streetAddress && { "streetAddress": jobLocation.streetAddress }),
        "addressLocality": jobLocation.addressLocality,
        ...(jobLocation.addressRegion && { "addressRegion": jobLocation.addressRegion }),
        ...(jobLocation.postalCode && { "postalCode": jobLocation.postalCode }),
        "addressCountry": jobLocation.addressCountry
      }
    },
    "directApply": directApply,
    "industry": "Beauty and Personal Care Services"
  };

  // Add optional fields only if they exist
  if (validThroughISO) {
    jsonLd.validThrough = validThroughISO;
  }

  if (employmentType && employmentType.length > 0) {
    jsonLd.employmentType = employmentType;
  }

  if (baseSalary) {
    jsonLd.baseSalary = {
      "@type": "MonetaryAmount",
      "currency": baseSalary.currency,
      "value": {
        "@type": "QuantitativeValue",
        "value": baseSalary.value,
        "unitText": baseSalary.unitText
      }
    };
  }

  if (applicantLocationRequirements) {
    jsonLd.applicantLocationRequirements = {
      "@type": "Country",
      "name": applicantLocationRequirements
    };
  }

  if (languages && languages.length > 0) {
    jsonLd.inLanguage = languages;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd, null, 0)
      }}
    />
  );
};

export default JobPostingJsonLd;