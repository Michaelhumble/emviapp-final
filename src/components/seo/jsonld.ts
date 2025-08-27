export const buildOrganizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "EmviApp",
  "description": "Premium beauty platform connecting professionals with opportunities",
  "url": "https://www.emvi.app",
  "logo": "https://www.emvi.app/logo.png",
  "foundingDate": "2024",
  "industry": "Beauty and Personal Care",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "url": "https://www.emvi.app/contact"
  },
  "sameAs": [
    "https://linkedin.com/company/emviapp",
    "https://instagram.com/emviapp", 
    "https://tiktok.com/@emviapp",
    "https://youtube.com/@emviapp"
  ]
});

export const buildWebsiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "EmviApp",
  "url": "https://www.emvi.app",
  "description": "The Beauty Industry's Missing Piece - Premium platform for beauty professionals",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.emvi.app/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
});

export const buildBreadcrumbJsonLd = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const buildJobPostingJsonLd = (job: {
  id: string;
  title: string;
  description: string;
  location?: string;
  salary?: string;
  company?: string;
  created_at: string;
  expires_at?: string;
  employmentType?: string;
  workFromHome?: boolean;
  contactEmail?: string;
  contactPhone?: string;
  requirements?: string;
  category?: string;
}) => {
  // Clean description and requirements
  const cleanDescription = job.description.replace(/<[^>]*>/g, '').trim();
  const jobDescription = job.requirements 
    ? `${cleanDescription}\n\nRequirements: ${job.requirements.replace(/<[^>]*>/g, '').trim()}`
    : cleanDescription;

  // Determine employment type based on category and description
  const getEmploymentType = () => {
    const desc = jobDescription.toLowerCase();
    if (desc.includes('full-time') || desc.includes('full time')) return "FULL_TIME";
    if (desc.includes('part-time') || desc.includes('part time')) return "PART_TIME";
    if (desc.includes('contract') || desc.includes('contractor')) return "CONTRACTOR";
    if (desc.includes('temporary') || desc.includes('temp')) return "TEMPORARY";
    if (desc.includes('internship') || desc.includes('intern')) return "INTERN";
    // Default for beauty industry
    return job.employmentType || "CONTRACTOR";
  };

  // Enhanced organization with proper contact info
  const hiringOrganization: any = {
    "@type": "Organization",
    "name": job.company || "EmviApp Beauty Partner",
    "url": "https://www.emvi.app",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.emvi.app/logo.png",
      "width": 600,
      "height": 60
    }
  };

  // Add contact point if available
  if (job.contactEmail || job.contactPhone) {
    hiringOrganization.contactPoint = {
      "@type": "ContactPoint",
      "contactType": "recruitment",
      ...(job.contactEmail && { "email": job.contactEmail }),
      ...(job.contactPhone && { "telephone": job.contactPhone })
    };
  }

  // Build comprehensive job location
  const jobLocation: any = {
    "@type": "Place"
  };

  if (job.location) {
    // Parse location for better structure
    const locationParts = job.location.split(',').map(p => p.trim());
    if (locationParts.length >= 2) {
      // Assume format like "City, State" or "City, State ZIP"
      jobLocation.address = {
        "@type": "PostalAddress",
        "addressLocality": locationParts[0],
        "addressRegion": locationParts[1].split(' ')[0], // Get state code
        "addressCountry": "US"
      };
    } else {
      jobLocation.address = {
        "@type": "PostalAddress",
        "addressLocality": job.location,
        "addressCountry": "US"
      };
    }
  } else {
    jobLocation.address = {
      "@type": "PostalAddress",
      "addressCountry": "US"
    };
  }

  // Build base salary if available
  const buildBaseSalary = () => {
    if (!job.salary) return undefined;
    
    const salaryStr = job.salary.toLowerCase();
    
    // Parse different salary formats
    if (salaryStr.includes('hour') || salaryStr.includes('/hr')) {
      const match = job.salary.match(/\$?(\d+(?:,\d{3})*(?:\.\d{2})?)/);
      if (match) {
        return {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": {
            "@type": "QuantitativeValue",
            "value": parseFloat(match[1].replace(',', '')),
            "unitText": "HOUR"
          }
        };
      }
    } else if (salaryStr.includes('week') || salaryStr.includes('/wk')) {
      const match = job.salary.match(/\$?(\d+(?:,\d{3})*(?:\.\d{2})?)/);
      if (match) {
        return {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": {
            "@type": "QuantitativeValue",
            "value": parseFloat(match[1].replace(',', '')),
            "unitText": "WEEK"
          }
        };
      }
    } else if (salaryStr.includes('year') || salaryStr.includes('/yr') || salaryStr.includes('annual')) {
      const match = job.salary.match(/\$?(\d+(?:,\d{3})*(?:\.\d{2})?)/);
      if (match) {
        return {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": {
            "@type": "QuantitativeValue",
            "value": parseFloat(match[1].replace(',', '')),
            "unitText": "YEAR"
          }
        };
      }
    }
    
    // Default to showing as text if can't parse
    return {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": {
        "@type": "QuantitativeValue",
        "value": job.salary,
        "unitText": "OTHER"
      }
    };
  };

  // Calculate validThrough (30 days from creation or explicit expiry)
  const validThrough = job.expires_at || 
    new Date(new Date(job.created_at).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": jobDescription,
    "datePosted": job.created_at,
    "validThrough": validThrough,
    "employmentType": getEmploymentType(),
    "url": `https://www.emvi.app/jobs/${job.id}`,
    "identifier": {
      "@type": "PropertyValue",
      "name": "EmviApp Job ID",
      "value": job.id
    },
    "hiringOrganization": hiringOrganization,
    "jobLocation": jobLocation,
    "industry": "Beauty and Personal Care Services",
    "occupationalCategory": job.category || "Beauty and Personal Care",
    "jobLocationType": job.workFromHome ? "TELECOMMUTE" : undefined,
    "applicantLocationRequirements": {
      "@type": "Country",
      "name": "US"
    },
    ...(job.salary && { "baseSalary": buildBaseSalary() }),
    "directApply": true,
    "jobBenefits": "Professional development opportunities, Flexible scheduling, Industry networking",
    "workHours": "Flexible scheduling available",
    "qualifications": job.requirements || "Experience in beauty and personal care preferred"
  };
};

export const buildPersonJsonLd = (person: {
  name: string;
  jobTitle?: string;
  location?: string;
  bio?: string;
  image?: string;
  url: string;
  sameAs?: string[];
  worksFor?: string;
  yearsOfExperience?: number;
}) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": person.name,
  "jobTitle": person.jobTitle || "Beauty Professional",
  "description": person.bio,
  "image": person.image,
  "url": person.url,
  "mainEntityOfPage": person.url,
  ...(person.location && {
    "address": {
      "@type": "PostalAddress",
      "addressLocality": person.location
    }
  }),
  ...(person.sameAs && { "sameAs": person.sameAs }),
  ...(person.worksFor && {
    "worksFor": {
      "@type": "Organization", 
      "name": person.worksFor
    }
  }),
  ...(person.yearsOfExperience && {
    "hasOccupation": {
      "@type": "Occupation",
      "name": person.jobTitle || "Beauty Professional",
      "experienceRequirements": `${person.yearsOfExperience}+ years`
    }
  })
});

export const buildArticleJsonLd = (article: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  image?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.description,
  "author": {
    "@type": "Person",
    "name": article.author
  },
  "publisher": {
    "@type": "Organization",
    "name": "EmviApp",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.emvi.app/logo.png"
    }
  },
  "datePublished": article.datePublished,
  "dateModified": article.dateModified || article.datePublished,
  "url": article.url,
  "mainEntityOfPage": article.url,
  ...(article.image && {
    "image": {
      "@type": "ImageObject",
      "url": article.image
    }
  })
});

export const buildFAQJsonLd = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});