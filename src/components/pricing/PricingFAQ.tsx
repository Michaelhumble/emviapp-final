
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Shield, Star, Crown } from 'lucide-react';
import { Card } from '@/components/ui/card';

const PricingFAQ = () => {
  const [openItem, setOpenItem] = useState<number | null>(0);

  const faqItems = [
    {
      question: "What makes Diamond Exclusive so special?",
      answer: "Diamond members get the highest placement, exclusive styling, a personal account manager, premium analytics, and annual-only benefits. Only 5 spots available per year.",
      icon: <Crown className="h-5 w-5 text-cyan-600" />
    },
    {
      question: "Can I upgrade or downgrade my plan anytime?",
      answer: "Yes! You can upgrade immediately. Downgrades take effect at your next billing cycle. Diamond requires approval and is annual-only.",
      icon: <Star className="h-5 w-5 text-purple-600" />
    },
    {
      question: "What if I'm not satisfied with my results?",
      answer: "We offer a 30-day money-back guarantee on all paid plans. If you don't see increased visibility and bookings, we'll refund your investment.",
      icon: <Shield className="h-5 w-5 text-green-600" />
    },
    {
      question: "How does the limited spots system work?",
      answer: "Gold and Premium have limited featured spots to maintain exclusivity. Diamond is invite-only with just 5 annual spots. When spots fill up, there's a waitlist.",
      icon: <Star className="h-5 w-5 text-amber-600" />
    },
    {
      question: "Is there a setup fee or hidden costs?",
      answer: "No setup fees, no hidden costs. What you see is what you pay. All plans include secure hosting, customer support, and core features.",
      icon: <Shield className="h-5 w-5 text-blue-600" />
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold font-playfair text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-xl text-gray-600">
          Everything you need to know about our pricing plans
        </p>
      </div>

      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <button
                onClick={() => setOpenItem(openItem === index ? null : index)}
                className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-inset"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="text-lg font-semibold text-gray-900">
                      {item.question}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: openItem === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  </motion.div>
                </div>
              </button>
              
              <AnimatePresence>
                {openItem === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed pl-8">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default PricingFAQ;
