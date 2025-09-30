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
      question: '💳 Do I need to pay to post my salon for sale?',
      answer: 'Yes. EmviApp uses paid listings to keep quality high and reduce spam. You can choose monthly visibility (1, 3, 6, or 12 months) with discounted longer terms. All listings expire after 30 days unless you renew or enable auto-renew.',
    },
    {
      question: '⏰ What happens when my listing expires?',
      answer: "We'll show the last active day and give you one-click renew options. If auto-renew is off, your listing simply stops showing until you renew.",
    },
    {
      question: '⬆️ Can I upgrade visibility later?',
      answer: 'Yes. You can upgrade to Featured tiers anytime for more exposure (Premiere, Gold, or Top Diamond Featured).',
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
