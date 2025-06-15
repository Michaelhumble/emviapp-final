
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ChevronDown, ChevronUp, Star, Users, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CommunitiesQA = () => {
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const faqs = [
    {
      question: "What is EmviApp Communities?",
      answer: "EmviApp Communities is the ultimate platform for beauty professionals to connect, learn, and grow together. Create or join specialized groups, share experiences, get expert advice, and build meaningful relationships with like-minded professionals in your field.",
      category: "Getting Started",
      featured: true
    },
    {
      question: "Why choose EmviApp over Facebook or Instagram groups?",
      answer: "Unlike social media platforms, EmviApp is built specifically for beauty professionals. We offer verified member profiles, industry-specific features, professional networking tools, educational resources, and a spam-free environment focused on career growth and business success.",
      category: "Platform Benefits",
      featured: true
    },
    {
      question: "How does the referral system work?",
      answer: "Earn credits every time someone joins using your referral link! You get 10 credits per signup, plus bonus rewards when your referrals achieve milestones. Use credits to boost your posts, access premium features, or redeem exclusive benefits.",
      category: "Referrals & Rewards",
      featured: false
    },
    {
      question: "Can I create my own community?",
      answer: "Absolutely! Any verified member can create their own community. Choose from public or private settings, set your own rules, moderate discussions, and build your following. Great for sharing specialized knowledge or creating local networking groups.",
      category: "Community Creation",
      featured: false
    },
    {
      question: "Are communities free to join?",
      answer: "Most communities are completely free! Some premium or specialized communities may require membership fees set by their creators, but there are thousands of free communities covering every aspect of the beauty industry.",
      category: "Pricing",
      featured: false
    },
    {
      question: "How do I find communities in my area?",
      answer: "Use our advanced search filters to find communities by location, specialty, experience level, and more. You can also browse trending local groups or get personalized recommendations based on your profile and interests.",
      category: "Discovery",
      featured: false
    },
    {
      question: "What makes EmviApp communities different?",
      answer: "Our communities focus on real professional growth with verified experts, quality content curation, integrated learning tools, direct mentorship opportunities, and a supportive environment free from the noise of general social media.",
      category: "Platform Benefits",
      featured: false
    },
    {
      question: "Can I monetize my expertise in communities?",
      answer: "Yes! Share exclusive content, offer paid consultations, host premium workshops, create paid courses, or use our built-in tipping system. Many members earn significant income by sharing their expertise with the community.",
      category: "Monetization",
      featured: false
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const featuredFaqs = faqs.filter(faq => faq.featured);
  const regularFaqs = faqs.filter(faq => !faq.featured);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-playfair">
              Everything You Need to Know
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get answers to the most common questions about EmviApp Communities and discover how to maximize your experience
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">47,000+</div>
              <div className="text-gray-600">Active Members</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
              <MessageSquare className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">2,847</div>
              <div className="text-gray-600">Active Communities</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
              <Star className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">4.9/5</div>
              <div className="text-gray-600">Member Satisfaction</div>
            </div>
          </motion.div>

          {/* Featured FAQs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-purple-600" />
              Most Asked Questions
            </h3>
            
            <div className="space-y-4">
              {featuredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl border-2 border-purple-200 overflow-hidden shadow-lg"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-purple-50 transition-colors"
                  >
                    <div>
                      <span className="inline-block bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full mb-2">
                        {faq.category}
                      </span>
                      <h4 className="font-bold text-gray-900 text-lg">{faq.question}</h4>
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
          </motion.div>

          {/* Regular FAQs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">More Questions</h3>
            
            <div className="space-y-3">
              {regularFaqs.map((faq, index) => (
                <motion.div
                  key={index + featuredFaqs.length}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => toggleItem(index + featuredFaqs.length)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full mb-2">
                        {faq.category}
                      </span>
                      <h4 className="font-semibold text-gray-900">{faq.question}</h4>
                    </div>
                    {openItems.includes(index + featuredFaqs.length) ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  
                  {openItems.includes(index + featuredFaqs.length) && (
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
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white"
          >
            <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Our community managers are here to help! Get personalized answers and guidance to make the most of your EmviApp experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold"
              >
                Contact Support
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Join Help Community
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommunitiesQA;
