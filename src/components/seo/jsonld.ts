export const buildOrganizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "EmviApp",
  "description": "Premium beauty platform connecting professionals with opportunities worldwide",
  "url": "https://www.emvi.app",
  "logo": "https://www.emvi.app/logo.png",
  "foundingDate": "2024",
  "industry": "Beauty and Personal Care Technology",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "url": "https://www.emvi.app/contact",
    "telephone": "+1-844-EMVIAPP",
    "email": "support@emvi.app"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1234 Innovation Drive",
    "addressLocality": "San Francisco",
    "addressRegion": "CA",
    "postalCode": "94105",
    "addressCountry": "US"
  },
  "sameAs": [
    "https://www.facebook.com/emviapp",
    "https://www.instagram.com/emviapp",
    "https://www.linkedin.com/company/emviapp",
    "https://www.youtube.com/@emviapp",
    "https://twitter.com/emviapp",
    "https://www.tiktok.com/@emviapp",
    "https://www.crunchbase.com/organization/emviapp",
    "https://apnews.com/press-release/ein-presswire-newsmatics/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry-d88a14938f130a67055f7826439cfb7c"
  ]
});

export const buildWebsiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "EmviApp",
  "url": "https://www.emvi.app",
  "description": "The Beauty Industry's Missing Piece - Premium platform for beauty professionals",
  "publisher": {
    "@type": "Organization",
    "name": "EmviApp",
    "url": "https://www.emvi.app",
    "logo": "https://www.emvi.app/logo.png",
    "sameAs": [
      "https://www.facebook.com/emviapp",
      "https://www.instagram.com/emviapp",
      "https://www.linkedin.com/company/emviapp",
      "https://www.youtube.com/@emviapp",
      "https://twitter.com/emviapp",
      "https://www.tiktok.com/@emviapp"
    ]
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.emvi.app/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
});

// Helper to sanitize JSON-LD data
const sanitizeJsonLdValue = (value: any): any => {
  if (value === null || value === undefined) return "";
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'object' && !Array.isArray(value)) {
    const sanitized: any = {};
    Object.keys(value).forEach(key => {
      sanitized[key] = sanitizeJsonLdValue(value[key]);
    });
    return sanitized;
  }
  if (Array.isArray(value)) {
    return value.map(item => sanitizeJsonLdValue(item));
  }
  return value;
};

export const buildBreadcrumbJsonLd = (items: Array<{ name: string; url: string }>) => {
  const sanitizedItems = items.filter(item => item.name && item.url).map(item => ({
    "@type": "ListItem" as const,
    "position": items.indexOf(item) + 1,
    "name": sanitizeJsonLdValue(item.name),
    "item": sanitizeJsonLdValue(item.url)
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList" as const,
    "itemListElement": sanitizedItems
  };
};

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
}) => {
  const sanitizedArticle = sanitizeJsonLdValue(article);
  
  const jsonLd: any = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": sanitizedArticle.title || "",
    "description": sanitizedArticle.description || "",
    "author": {
      "@type": "Person",
      "name": sanitizedArticle.author || "EmviApp Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "EmviApp",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.emvi.app/logo.png"
      }
    },
    "datePublished": sanitizedArticle.datePublished || new Date().toISOString(),
    "dateModified": sanitizedArticle.dateModified || sanitizedArticle.datePublished || new Date().toISOString(),
    "url": sanitizedArticle.url || "https://www.emvi.app/blog",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": sanitizedArticle.url || "https://www.emvi.app/blog"
    }
  };

  if (sanitizedArticle.image) {
    jsonLd.image = {
      "@type": "ImageObject",
      "url": sanitizedArticle.image
    };
  }

  return jsonLd;
};

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

export const buildLocalBusinessJsonLd = (salon: {
  id: string;
  name?: string;
  title?: string;
  description?: string;
  tagline?: string;
  summary?: string;
  location?: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  hours?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    googleBusiness?: string;
    yelp?: string;
  };
}) => {
  const salonName = salon.name || salon.title || "Premium Beauty Salon";
  const salonDescription = salon.description || salon.tagline || salon.summary || `${salonName} - Premier beauty services and treatments`;
  
  // Build address object
  const address: any = {
    "@type": "PostalAddress",
    "addressCountry": salon.country || "US"
  };
  
  if (salon.address) address.streetAddress = salon.address;
  if (salon.city) address.addressLocality = salon.city;
  if (salon.state) address.addressRegion = salon.state;
  if (salon.zipCode) address.postalCode = salon.zipCode;
  if (salon.location && !salon.city) {
    // Parse location string like "Austin, TX" 
    const locationParts = salon.location.split(',').map(s => s.trim());
    if (locationParts.length >= 2) {
      address.addressLocality = locationParts[0];
      address.addressRegion = locationParts[1];
    }
  }

  // Build geo coordinates if available
  const geo = (salon.latitude && salon.longitude) ? {
    "@type": "GeoCoordinates",
    "latitude": salon.latitude,
    "longitude": salon.longitude
  } : undefined;

  // Build sameAs array from social media and citations
  const sameAs: string[] = [];
  if (salon.socialMedia?.instagram) sameAs.push(salon.socialMedia.instagram);
  if (salon.socialMedia?.facebook) sameAs.push(salon.socialMedia.facebook);
  if (salon.socialMedia?.googleBusiness) sameAs.push(salon.socialMedia.googleBusiness);
  if (salon.socialMedia?.yelp) sameAs.push(salon.socialMedia.yelp);
  if (salon.website) sameAs.push(salon.website);
  
  // Add citation URLs for better local SEO
  const citationUrls = [
    `https://www.google.com/search?q=${encodeURIComponent(salonName + ' ' + (salon.location || salon.city || ''))}`,
    `https://www.yelp.com/search?find_desc=${encodeURIComponent(salonName)}&find_loc=${encodeURIComponent(salon.location || salon.city || '')}`,
    `https://foursquare.com/explore?q=${encodeURIComponent(salonName)}`
  ];
  sameAs.push(...citationUrls);

  const jsonLd: any = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": salonName,
    "description": salonDescription,
    "url": `https://www.emvi.app/salons/${salon.id}`,
    "address": address,
    "priceRange": "$$-$$$",
    "servedCuisine": undefined, // Remove this for beauty salons
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Beauty Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Professional Beauty Services",
            "description": "Full range of beauty treatments and services"
          }
        }
      ]
    }
  };

  // Add optional fields
  if (salon.phone) jsonLd.telephone = salon.phone;
  if (salon.email) jsonLd.email = salon.email;
  if (geo) jsonLd.geo = geo;
  if (sameAs.length > 0) jsonLd.sameAs = sameAs;
  
  // Parse opening hours if available
  if (salon.hours) {
    // Simple hours parsing - could be enhanced based on actual format
    jsonLd.openingHoursSpecification = {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "09:00",
      "closes": "18:00"
    };
  }

  return jsonLd;
};