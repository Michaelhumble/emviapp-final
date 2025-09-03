import React from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface CityRoleFaqJsonLdProps {
  role: string;
  rolePlural: string;
  city: string;
  state: string;
  faqs?: FAQ[];
}

const CityRoleFaqJsonLd: React.FC<CityRoleFaqJsonLdProps> = ({ 
  role, 
  rolePlural, 
  city, 
  state, 
  faqs 
}) => {
  // Generate default FAQs if none provided
  const defaultFaqs: FAQ[] = [
    {
      question: `How do I find ${rolePlural.toLowerCase()} in ${city}, ${state}?`,
      answer: `Browse our verified ${rolePlural.toLowerCase()} in ${city}, ${state} on EmviApp. You can view their profiles, specialties, availability, and contact them directly through our platform.`
    },
    {
      question: `Are the ${rolePlural.toLowerCase()} in ${city} licensed and verified?`,
      answer: `Yes, all ${rolePlural.toLowerCase()} on EmviApp undergo verification including license validation, portfolio review, and background checks to ensure you're working with qualified professionals.`
    },
    {
      question: `How much do ${rolePlural.toLowerCase()} charge in ${city}, ${state}?`,
      answer: `Pricing for ${rolePlural.toLowerCase()} in ${city} varies based on experience, services offered, and salon location. Most professionals list their service rates and availability on their profiles.`
    },
    {
      question: `Can I hire ${rolePlural.toLowerCase()} for events or temporary work in ${city}?`,
      answer: `Many ${rolePlural.toLowerCase()} in ${city} offer freelance services for special events, temporary coverage, or short-term contracts. Check their availability and booking preferences on their profiles.`
    },
    {
      question: `How quickly can I connect with ${rolePlural.toLowerCase()} in ${city}?`,
      answer: `Most ${rolePlural.toLowerCase()} in ${city} respond within 24 hours. Many are available for immediate booking or next-day appointments depending on their schedule and your needs.`
    }
  ];

  const faqData = faqs || defaultFaqs;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd, null, 0)
      }}
    />
  );
};

export default CityRoleFaqJsonLd;