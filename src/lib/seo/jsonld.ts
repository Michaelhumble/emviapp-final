import { SITE_BASE_URL } from '@/config/seo';

// Helper function to safely escape HTML and return plain text
export const stripHtml = (html: string): string => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();
};

// Organization schema for EmviApp
export const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "EmviApp",
  "description": "Premium beauty platform connecting professionals with opportunities",
  "url": SITE_BASE_URL,
  "logo": `${SITE_BASE_URL}/icons/emvi-master-512.png`,
  "sameAs": [
    "https://linkedin.com/company/emviapp",
    "https://instagram.com/emviapp",
    "https://tiktok.com/@emviapp",
    "https://youtube.com/@emviapp"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "url": `${SITE_BASE_URL}/contact`
  }
});

// Website schema
export const websiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "EmviApp",
  "description": "The Beauty Industry's Missing Piece - Premium platform for beauty professionals",
  "url": SITE_BASE_URL,
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${SITE_BASE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
});

// JobPosting schema
export interface JobPostingData {
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
}

export const jobPostingJsonLd = (job: JobPostingData) => {
  const validThrough = job.expires_at || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  const description = job.description 
    ? stripHtml(job.description)
    : `${job.title} position available at ${job.company || job.salonName || 'EmviApp partner'}.`;

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": description,
    "identifier": {
      "@type": "PropertyValue",
      "name": "EmviApp Job ID",
      "value": job.id
    },
    "datePosted": job.created_at || new Date().toISOString(),
    "validThrough": validThrough,
    "employmentType": job.employment_type || "FULL_TIME",
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.company || job.salonName || job.contact_info?.owner_name || "Beauty Salon",
      "sameAs": SITE_BASE_URL,
      "logo": `${SITE_BASE_URL}/icons/emvi-master-512.png`
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
    "responsibilities": description,
    "benefits": "Competitive compensation and benefits package",
    "url": `${SITE_BASE_URL}/jobs/${job.id}`,
    "applicationContact": {
      "@type": "ContactPoint",
      "contactType": "HR",
      "email": job.contact_info?.email,
      "telephone": job.contact_info?.phone,
      "url": `${SITE_BASE_URL}/jobs/${job.id}`
    },
    "industry": "Beauty and Personal Care",
    "occupationalCategory": job.category || "Beauty Professional"
  };
};

// ItemList schema for job listings
export const jobListingsJsonLd = (jobs: JobPostingData[], listName: string = "Beauty Jobs") => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": listName,
  "description": `Collection of ${listName.toLowerCase()} on EmviApp`,
  "numberOfItems": jobs.length,
  "itemListElement": jobs.slice(0, 20).map((job, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "JobPosting",
      "title": job.title,
      "description": job.description ? stripHtml(job.description) : `${job.title} position in ${job.location || 'multiple locations'}`,
      "url": `${SITE_BASE_URL}/jobs/${job.id}`,
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
        "name": job.salonName || job.company || "Beauty Salon"
      }
    }
  }))
});

// LocalBusiness schema for salons
export interface LocalBusinessData {
  name: string;
  url: string;
  telephone?: string;
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string;
  geo?: { latitude: number; longitude: number };
  openingHours?: string[];
  priceRange?: string;
  image?: string[];
  sameAs?: string[];
  aggregateRating?: { ratingValue: number; reviewCount: number };
  businessType?: string;
}

export const localBusinessJsonLd = (business: LocalBusinessData) => {
  const data: any = {
    "@context": "https://schema.org",
    "@type": business.businessType || "NailSalon",
    "name": business.name,
    "url": business.url,
    "image": business.image,
    "telephone": business.telephone,
    "priceRange": business.priceRange,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": business.streetAddress,
      "addressLocality": business.addressLocality,
      "addressRegion": business.addressRegion,
      "postalCode": business.postalCode,
      "addressCountry": business.addressCountry || "US",
    },
    "geo": business.geo && { "@type": "GeoCoordinates", ...business.geo },
    "openingHours": business.openingHours,
    "sameAs": business.sameAs,
  };

  // Only add aggregateRating if both values are present and valid
  if (business.aggregateRating && business.aggregateRating.ratingValue > 0 && business.aggregateRating.reviewCount > 0) {
    data.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": business.aggregateRating.ratingValue,
      "reviewCount": business.aggregateRating.reviewCount,
      "bestRating": 5,
      "worstRating": 1
    };
  }

  // Clean up undefined values
  Object.keys(data).forEach(key => {
    if (data[key] === undefined || data[key] === null) {
      delete data[key];
    }
  });

  // Clean up address object if all fields are undefined
  if (data.address && Object.values(data.address).every(val => val === undefined || val === null)) {
    delete data.address;
  }

  return data;
};

// Article schema for blog posts
export interface ArticleData {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  url: string;
  image?: string;
  articleBody?: string;
}

export const articleJsonLd = (article: ArticleData) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.headline,
  "description": article.description,
  "datePublished": article.datePublished,
  "dateModified": article.dateModified || article.datePublished,
  "author": {
    "@type": "Person",
    "name": article.author || "EmviApp Editorial Team"
  },
  "publisher": {
    "@type": "Organization",
    "name": "EmviApp",
    "url": SITE_BASE_URL,
    "logo": {
      "@type": "ImageObject",
      "url": `${SITE_BASE_URL}/icons/emvi-master-512.png`
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": article.url
  },
  "image": article.image ? {
    "@type": "ImageObject",
    "url": article.image,
    "width": 1200,
    "height": 630
  } : undefined,
  "articleBody": article.articleBody
});

// FAQ schema
export interface FAQData {
  question: string;
  answer: string;
}

export const faqJsonLd = (faqs: FAQData[]) => ({
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

// BreadcrumbList schema
export interface BreadcrumbData {
  name: string;
  url: string;
}

export const breadcrumbJsonLd = (breadcrumbs: BreadcrumbData[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": breadcrumb.name,
    "item": breadcrumb.url
  }))
});

// Collection schema for artist listings  
export interface ArtistData {
  id: string;
  name: string;
  specialties?: string;
  location?: string;
  url: string;
}

export const artistCollectionJsonLd = (artists: ArtistData[], cityState?: string, role?: string) => {
  const locationText = cityState ? ` in ${cityState}` : '';
  const roleText = role ? `${role.replace('-', ' ')} ` : '';
  
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${roleText}Artists${locationText}`.trim(),
    "description": `Professional ${roleText.toLowerCase()}artists available for hire${locationText}`,
    "numberOfItems": artists.length,
    "itemListElement": artists.map((artist, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Person",
        "name": artist.name,
        "jobTitle": artist.specialties || `${roleText}Artist`,
        "workLocation": artist.location,
        "url": artist.url
      }
    }))
  };
};