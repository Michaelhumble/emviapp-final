
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const CommunityFAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([0]); // First item open by default

  const faqs = [
    {
      question: "How do I build a consistent client base?",
      answer: "Focus on exceptional service, ask for referrals, maintain active social media presence, and always follow up with clients. Building relationships is key to retention.",
      category: "Business"
    },
    {
      question: "What are the current nail art trends?",
      answer: "Minimalist designs, chrome finishes, and 3D elements are popular. Follow industry leaders and adapt trends to your personal style and client preferences.",
      category: "Techniques"
    },
    {
      question: "How should I price my services?",
      answer: "Research local market rates, factor in your experience level, overhead costs, and time investment. Don't undervalue your skills - quality work deserves fair compensation.",
      category: "Business"
    },
    {
      question: "Best practices for client consultations?",
      answer: "Listen actively, ask about lifestyle and preferences, show portfolio examples, discuss maintenance, and always manage expectations clearly before starting.",
      category: "Client Relations"
    },
    {
      question: "How to handle difficult clients?",
      answer: "Stay professional, set clear boundaries, document everything, and know when to refer them elsewhere. Your mental health and business reputation matter.",
      category: "Client Relations"
    },
    {
      question: "Essential tools for mobile beauty services?",
      answer: "Invest in portable lighting, quality travel cases, sanitization supplies, and backup equipment. Organization and hygiene are crucial for mobile success.",
      category: "Equipment"
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 font-playfair text-center">
        Frequently Asked Questions
      </h3>
      
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
                  {faq.category}
                </span>
                <h4 className="font-semibold text-gray-900">{faq.question}</h4>
              </div>
              {openItems.includes(index) ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            
            {openItems.includes(index) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="px-6 pb-4"
              >
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommunityFAQ;
