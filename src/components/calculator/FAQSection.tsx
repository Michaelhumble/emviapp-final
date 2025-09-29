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
      question: 'Is this valuation legally binding?',
      answer: 'No, this is an estimate based on market data and industry standards. For a formal appraisal, consult a licensed business broker or appraiser.',
    },
    {
      question: 'How accurate is the calculator?',
      answer: 'Our algorithm uses actual salon sale data and industry multiples. Accuracy improves when you provide complete information, especially Google reviews and exact lease terms.',
    },
    {
      question: 'What happens after I get my estimate?',
      answer: 'You can list your salon for free on EmviApp (12 months free promotion), download a PDF report, or simply use the estimate for your planning. No obligation.',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto my-16">
      <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
