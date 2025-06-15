
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Star, Shield, Users, Sparkles } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'features' | 'community' | 'business';
  isPopular?: boolean;
}

const CommunityFAQ = () => {
  const [openItems, setOpenItems] = useState<string[]>(['what-is-emviapp']);

  const faqData: FAQItem[] = [
    {
      question: "What is EmviApp and how is it different from other platforms?",
      answer: "EmviApp is the first platform designed exclusively for beauty professionals. Unlike general social networks, we focus on career growth, skill development, and business success in the beauty industry. Our community features industry-specific tools, verified professionals, and success-driven content that helps you build a thriving beauty career.",
      category: 'general',
      isPopular: true
    },
    {
      question: "Why should I use EmviApp instead of Facebook or Instagram?",
      answer: "While Facebook and Instagram are great for general social networking, EmviApp is purpose-built for beauty professionals. We offer specialized communities, industry-specific advice, business tools, verified credentials, and a focused environment where every interaction is designed to advance your beauty career. Plus, no algorithm hiding your content from potential clients!",
      category: 'general',
      isPopular: true
    },
    {
      question: "How does the referral system work?",
      answer: "Our referral system rewards you for growing the community! When you invite someone who joins and becomes active, you earn points, unlock premium features, and get priority in our success programs. Successful referrers also get featured in our spotlight stories and can earn monetary rewards through our partner program.",
      category: 'business',
      isPopular: true
    },
    {
      question: "Is EmviApp really free to use?",
      answer: "Yes! Core community features, posting, networking, and basic business tools are completely free. We also offer premium memberships with advanced features like priority support, exclusive events, advanced analytics, and business acceleration programs for professionals ready to scale their success.",
      category: 'features'
    },
    {
      question: "How do I get verified on EmviApp?",
      answer: "Verification shows you're a legitimate beauty professional. Submit your license, certifications, or portfolio for review. Verified members get increased visibility, access to exclusive opportunities, and a trust badge that helps attract more clients. The process typically takes 2-3 business days.",
      category: 'community'
    },
    {
      question: "Can I really find clients through EmviApp?",
      answer: "Absolutely! Our platform is designed to connect beauty professionals with clients. Many members report booking their calendars within weeks of joining. We provide profile optimization tools, portfolio showcases, booking systems, and local discovery features that help clients find you easily.",
      category: 'business',
      isPopular: true
    },
    {
      question: "What kind of support does EmviApp provide?",
      answer: "We offer comprehensive support including: 24/7 community support, business mentorship programs, marketing guidance, technical assistance, skill development resources, and access to industry experts. Premium members get priority support and one-on-one consultation opportunities.",
      category: 'features'
    },
    {
      question: "How do the communities work?",
      answer: "Communities are specialized groups for different beauty niches (nail artists, makeup artists, hair stylists, etc.). Each community has expert moderators, exclusive content, skill-sharing sessions, and networking opportunities. You can join multiple communities based on your interests and expertise.",
      category: 'community'
    },
    {
      question: "Is my personal information safe on EmviApp?",
      answer: "Your privacy and security are our top priorities. We use bank-level encryption, never sell your data, and give you complete control over your information visibility. You choose what to share publicly, with your network, or keep private. We're also GDPR compliant and regularly audited for security.",
      category: 'general'
    },
    {
      question: "How do I maximize my success on EmviApp?",
      answer: "Success comes from active engagement! Complete your profile, showcase your best work, participate in communities, help others with advice, share your journey, and stay consistent. Our most successful members typically see results within 30-60 days of active participation.",
      category: 'business'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Questions', icon: HelpCircle },
    { id: 'general', label: 'General', icon: Star },
    { id: 'features', label: 'Features', icon: Sparkles },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'business', label: 'Business', icon: Shield }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredFAQs = selectedCategory === 'all' 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory);

  const toggleItem = (index: string) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const getQuestionId = (question: string, index: number) => {
    return question.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `question-${index}`;
  };

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600"
          >
            Everything you need to know about EmviApp and our community
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <category.icon className="h-4 w-4" />
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((item, index) => {
            const questionId = getQuestionId(item.question, index);
            const isOpen = openItems.includes(questionId);
            
            return (
              <motion.div
                key={questionId}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-2xl border-2 transition-all duration-200 ${
                  isOpen ? 'border-purple-200 shadow-lg' : 'border-gray-100 hover:border-gray-200'
                } ${item.isPopular ? 'ring-2 ring-yellow-100' : ''}`}
              >
                <button
                  onClick={() => toggleItem(questionId)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 rounded-2xl transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    {item.isPopular && (
                      <Star className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {item.question}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-purple-500">
                          <p className="text-gray-700 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12 p-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl"
        >
          <HelpCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Our community experts are here to help you succeed
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors">
              Ask the Community
            </button>
            <button className="border-2 border-purple-200 text-purple-700 px-6 py-3 rounded-full hover:bg-purple-50 transition-colors">
              Contact Support
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityFAQ;
