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
}) => ({
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": job.title,
  "description": job.description.replace(/<[^>]*>/g, ''), // Strip HTML
  "datePosted": job.created_at,
  "validThrough": job.expires_at || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  "employmentType": job.employmentType || "CONTRACTOR",
  "url": `https://www.emvi.app/jobs/${job.id}`,
  "applicantLocationRequirements": {
    "@type": "Country",
    "name": "US"
  },
  "jobLocationType": job.workFromHome ? "TELECOMMUTE" : undefined,
  "identifier": {
    "@type": "PropertyValue",
    "name": "EmviApp",
    "value": job.id
  },
  "hiringOrganization": {
    "@type": "Organization",
    "name": job.company || "EmviApp Partner",
    "url": "https://www.emvi.app",
    "logo": "https://www.emvi.app/logo.png"
  },
  "jobLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": job.location || "Remote",
      "addressCountry": "US"
    }
  },
  "industry": "Beauty and Personal Care",
  "occupationalCategory": "Beauty and Personal Care",
  ...(job.salary && {
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": {
        "@type": "QuantitativeValue",
        "value": job.salary,
        "unitText": "HOUR"
      }
    }
  })
});

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