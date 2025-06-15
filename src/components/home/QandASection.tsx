
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const qandaData = [
  {
    question: "What is EmviApp?",
    answer: "EmviApp is the first platform purpose-built for the beauty industry with embedded AI intelligence. We connect artists, salons, and customers while providing smart tools to grow your beauty business."
  },
  {
    question: "How does EmviApp help salon owners?",
    answer: "EmviApp helps salon owners by providing AI-powered client matching, automated booking management, team collaboration tools, and data-driven insights to increase revenue and streamline operations."
  },
  {
    question: "Can artists use EmviApp independently?",
    answer: "Yes! Independent artists can create profiles, showcase their work, connect with clients, and manage their bookings. Our platform supports both salon-based and freelance beauty professionals."
  },
  {
    question: "What AI features does EmviApp offer?",
    answer: "Our AI provides smart client matching, automated scheduling optimization, personalized marketing recommendations, performance analytics, and predictive insights to help grow your business."
  },
  {
    question: "Is EmviApp free to use?",
    answer: "EmviApp offers both free and premium plans. Basic features are available for free, while advanced AI tools, enhanced visibility, and premium support require a subscription."
  },
  {
    question: "How do I get started with EmviApp?",
    answer: "Simply sign up for a free account, complete your profile, and start connecting with the beauty community. Our onboarding process will guide you through setting up your services and preferences."
  },
  {
    question: "Can customers book appointments through EmviApp?",
    answer: "Yes! Customers can browse artists and salons, view availability, and book appointments directly through our platform. Our AI ensures the best matches between clients and service providers."
  },
  {
    question: "What types of beauty services are supported?",
    answer: "EmviApp supports all beauty services including hair styling, nail art, makeup, skincare, massage, eyelash extensions, microblading, and more. We're constantly expanding our service categories."
  },
  {
    question: "How does the referral program work?",
    answer: "Our referral program rewards you for bringing new users to EmviApp. You earn credits and rewards when someone signs up using your referral link and becomes an active user."
  },
  {
    question: "Is my data secure on EmviApp?",
    answer: "Absolutely. We use enterprise-grade security measures to protect your data, including encryption, secure hosting, and strict privacy policies. Your information is never shared without your consent."
  },
  {
    question: "Can I integrate EmviApp with my existing booking system?",
    answer: "We're working on integrations with popular booking systems. Contact our support team to discuss your specific needs and timeline for integration options."
  },
  {
    question: "What support is available?",
    answer: "We offer comprehensive support including live chat, email support, help documentation, video tutorials, and dedicated account managers for premium users."
  },
  {
    question: "How does EmviApp handle payments?",
    answer: "EmviApp uses secure payment processing through trusted providers. Artists and salons can receive payments directly, and we handle all transaction security and compliance."
  },
  {
    question: "Can I customize my EmviApp profile?",
    answer: "Yes! You can fully customize your profile with photos, services, pricing, availability, bio, and more. Our AI helps optimize your profile for maximum visibility."
  },
  {
    question: "What makes EmviApp different from other platforms?",
    answer: "EmviApp is the only platform built specifically for the beauty industry with AI at its core. We understand beauty professionals' unique needs and provide tailored solutions you won't find elsewhere."
  },
  {
    question: "How do I boost my visibility on EmviApp?",
    answer: "Complete your profile, upload quality photos, maintain good reviews, stay active on the platform, and consider our premium visibility features to reach more clients."
  },
  {
    question: "Can teams collaborate on EmviApp?",
    answer: "Yes! Salon teams can collaborate through shared calendars, client management tools, team messaging, and performance tracking. Perfect for multi-artist salons."
  },
  {
    question: "What analytics does EmviApp provide?",
    answer: "Our analytics dashboard shows booking trends, client demographics, revenue insights, performance metrics, and AI-powered recommendations to grow your business."
  },
  {
    question: "How do I manage my availability?",
    answer: "Our smart calendar system lets you set availability, block time off, manage recurring schedules, and automatically sync with your bookings. AI helps optimize your schedule."
  },
  {
    question: "Can I offer packages and deals on EmviApp?",
    answer: "Yes! You can create service packages, seasonal promotions, and special deals. Our platform helps promote these offers to the right clients at the right time."
  },
  {
    question: "What if I need help setting up my account?",
    answer: "Our onboarding specialists are here to help! We offer free setup assistance, best practice guidance, and ongoing support to ensure your success on EmviApp."
  },
  {
    question: "How does EmviApp handle reviews and ratings?",
    answer: "We have a comprehensive review system that builds trust and credibility. Clients can leave detailed reviews, and our AI helps match you with clients likely to leave positive feedback."
  },
  {
    question: "Can I use EmviApp on mobile?",
    answer: "Absolutely! EmviApp is fully mobile-optimized and works seamlessly on all devices. We're also developing dedicated mobile apps for an even better experience."
  },
  {
    question: "What training resources are available?",
    answer: "We provide extensive training materials including video tutorials, webinars, best practice guides, and success stories to help you maximize your EmviApp experience."
  },
  {
    question: "How do I contact EmviApp support?",
    answer: "You can reach us through live chat, email support, or our help center. Premium users get priority support and dedicated account management."
  }
];

const QandASection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Have Questions?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get answers to the most common questions about EmviApp and how we can help grow your beauty business.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {qandaData.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="px-6 py-4 text-left font-medium text-gray-900 hover:text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <div className="space-x-4">
            <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
              Contact Support
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QandASection;
