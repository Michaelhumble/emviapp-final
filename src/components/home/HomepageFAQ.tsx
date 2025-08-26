import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HomepageFAQ = () => {
  const faqs = [
    {
      question: "How does EmviApp help beauty professionals find jobs?",
      answer: "EmviApp uses AI-powered matching to connect beauty professionals with the right opportunities. Our platform analyzes your skills, experience, and preferences to show you relevant job openings at salons and spas. You can also showcase your portfolio and get discovered by employers actively seeking talent."
    },
    {
      question: "Is EmviApp free to use for artists and professionals?",
      answer: "Yes! Creating a profile, browsing jobs, and applying to positions is completely free for beauty professionals. We also offer premium features to help boost your visibility and access to exclusive opportunities. Salons pay to post jobs and access our premium talent pool."
    },
    {
      question: "What types of beauty professionals can use EmviApp?",
      answer: "EmviApp serves all beauty industry professionals including nail technicians, hair stylists, barbers, estheticians, massage therapists, makeup artists, lash technicians, and salon owners. Whether you're just starting out or are an experienced professional, there's a place for you on our platform."
    },
    {
      question: "How do I get started on EmviApp?",
      answer: "Getting started is simple! Create your free profile, add your skills and experience, upload portfolio photos, and start browsing opportunities. Our AI will begin matching you with relevant jobs immediately. You can also set up job alerts to get notified of new opportunities that match your criteria."
    },
    {
      question: "Can salon owners post jobs and find talent?",
      answer: "Absolutely! Salon owners can post job listings, browse our talent database, and connect with qualified professionals. Our platform makes it easy to find the right fit for your team, whether you're looking for experienced stylists or entry-level talent ready to grow with your business."
    },
    {
      question: "How does the AI matching system work?",
      answer: "Our AI analyzes multiple factors including your skills, experience level, location preferences, specialty areas, and career goals. It then matches you with relevant opportunities and helps salons find professionals who meet their specific needs. The system learns from your interactions to provide better matches over time."
    }
  ];

  const faqSchema = {
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
  };

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about getting started with EmviApp
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-xl border border-gray-100 px-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground py-6 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default HomepageFAQ;