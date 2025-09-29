import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: '⚖️ Is this valuation legally binding?',
      answer: 'No, this is an estimate based on market data and industry standards. For a formal appraisal, consult a licensed business broker or appraiser.',
    },
    {
      question: '📊 How accurate is the calculator?',
      answer: 'Our algorithm uses actual salon sale data and industry multiples. Accuracy improves when you provide complete information, especially Google reviews and exact lease terms.',
    },
    {
      question: '🚀 What happens after I get my estimate?',
      answer: "After you get your estimate, you can choose to list your salon for sale on EmviApp, share your valuation with potential buyers, or save a PDF report for planning. There's no obligation—your data is private and secure.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto my-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`}
            className="border border-purple-100 rounded-xl px-6 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <AccordionTrigger className="text-left font-bold text-lg hover:text-purple-600 py-6">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-6 text-base leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
