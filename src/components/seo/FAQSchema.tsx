import React from 'react';
import { Helmet } from 'react-helmet-async';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
  pageTitle?: string;
}

const FAQSchema: React.FC<FAQSchemaProps> = ({ faqs, pageTitle = "Frequently Asked Questions" }) => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": pageTitle,
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
};

export default FAQSchema;

// Common beauty industry FAQs
export const BEAUTY_FAQS: FAQItem[] = [
  {
    question: "How do I find beauty jobs near me?",
    answer: "Use EmviApp to search for beauty jobs by location, category, and experience level. Filter by nail technician, hair stylist, barber, massage therapist, and more."
  },
  {
    question: "What qualifications do I need for beauty jobs?",
    answer: "Requirements vary by role and state. Most positions require relevant certification or license. Check specific job requirements and your state's cosmetology board for details."
  },
  {
    question: "How much do beauty professionals earn?",
    answer: "Beauty professional salaries vary by location, experience, and specialization. Nail technicians earn $25,000-$45,000, hair stylists $30,000-$60,000, and experienced professionals can earn significantly more."
  },
  {
    question: "Can I work part-time in the beauty industry?",
    answer: "Yes, many beauty positions offer flexible scheduling including part-time, freelance, and booth rental opportunities. EmviApp lists various employment types to fit your schedule."
  },
  {
    question: "How do I advance my beauty career?",
    answer: "Continue education, build a strong portfolio, network with industry professionals, and specialize in high-demand services. EmviApp connects you with growth opportunities at top salons."
  }
];

export const SALON_FAQS: FAQItem[] = [
  {
    question: "How do I find the best salon near me?",
    answer: "Use EmviApp's salon directory to browse local salons, read reviews, view services, and compare pricing. Filter by specialty, location, and customer ratings."
  },
  {
    question: "What services do beauty salons typically offer?",
    answer: "Full-service salons offer hair cutting and styling, coloring, nail services, skincare treatments, massage, makeup application, and specialized treatments like extensions or chemical services."
  },
  {
    question: "How do I book appointments at salons?",
    answer: "Many salons on EmviApp offer online booking, phone reservations, or walk-in appointments. Check individual salon profiles for their preferred booking methods and availability."
  },
  {
    question: "What should I expect during my first salon visit?",
    answer: "Arrive early for consultation, discuss your goals with your stylist, ask about pricing and aftercare, and communicate any allergies or sensitivities before services begin."
  }
];