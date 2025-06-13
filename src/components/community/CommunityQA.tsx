
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Heart, Users, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CommunityQA = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const qaData = [
    {
      question: "What is EmviApp?",
      answer: "EmviApp is a community-driven platform connecting beauty professionals with clients. We're building a transparent ecosystem where artists, salon owners, and customers can thrive together through authentic connections and shared success.",
      icon: <Heart className="h-5 w-5 text-pink-500" />
    },
    {
      question: "Why was EmviApp created?",
      answer: "We saw talented beauty professionals struggling to find clients and customers having difficulty finding trusted artists. EmviApp bridges this gap by creating genuine connections based on quality work and authentic reviews.",
      icon: <Users className="h-5 w-5 text-purple-500" />
    },
    {
      question: "What makes EmviApp trustworthy?",
      answer: "Complete transparency is our foundation. All reviews are verified, profiles are authentic, and we openly share our development process. We believe trust is earned through consistent honest actions, not marketing promises.",
      icon: <Shield className="h-5 w-5 text-blue-500" />
    },
    {
      question: "How does EmviApp benefit customers, artists, and salon owners?",
      answer: "Customers find verified, talented professionals nearby. Artists get discovered by ideal clients and grow their business. Salon owners access tools to manage their team and attract new customers. Everyone wins when the community thrives."
    },
    {
      question: "How does the referral system work and benefit everyone?",
      answer: "When you invite friends who become active users, everyone earns credits. These credits can be used for profile boosts, premium features, or supporting your favorite artists. It's our way of thanking you for growing our community."
    },
    {
      question: "Is EmviApp free, and what current costs exist, if any?",
      answer: "EmviApp is completely free to use. Profile creation, browsing, booking, and basic features cost nothing. We're exploring optional premium features for the future, but our core mission remains accessible to everyone."
    },
    {
      question: "What exciting features are planned for the future?",
      answer: "We're developing AI-powered match-making, integrated booking systems, community challenges, and business tools for salon owners. Every feature is designed based on real user feedback and genuine needs."
    },
    {
      question: "How does EmviApp protect user data and privacy?",
      answer: "Your data belongs to you. We use industry-standard encryption, never sell personal information, and give you full control over your privacy settings. Transparency reports are available upon request."
    },
    {
      question: "How can users actively participate in and benefit from community engagement?",
      answer: "Share your work, support other artists, leave genuine reviews, and participate in community stories. Active members build stronger networks, gain more visibility, and earn rewards through our credit system."
    },
    {
      question: "How does EmviApp help salons grow their businesses?",
      answer: "We provide tools for team management, client booking coordination, and marketing support. Our platform showcases your salon's unique culture and helps attract clients who appreciate your specific style and values."
    },
    {
      question: "How does EmviApp ensure customer satisfaction?",
      answer: "Through verified reviews, clear communication tools, and our commitment to resolving any issues quickly. We believe satisfied customers create a better environment for everyone in our community."
    },
    {
      question: "What specific benefits do artists gain from joining EmviApp?",
      answer: "Increased visibility, tools to showcase your portfolio, direct client communication, booking management, and a supportive community of peers. Your talent gets the recognition it deserves."
    },
    {
      question: "Why would businesses want to sponsor or partner with EmviApp?",
      answer: "Our engaged community of beauty professionals represents a valuable, targeted audience. Partners gain authentic access to users who are genuinely interested in quality beauty products and services."
    },
    {
      question: "Can you share inspiring stories from current users?",
      answer: "Artists have tripled their client base, salon owners have streamlined operations, and customers have discovered their perfect beauty professionals. Real success stories from real people drive our passion."
    },
    {
      question: "How responsive and helpful is EmviApp's customer support?",
      answer: "We pride ourselves on personal, helpful support. Real humans respond to every inquiry, and we're constantly improving based on your feedback. Your success is our success."
    },
    {
      question: "What's the ultimate goal and mission of EmviApp?",
      answer: "To create the most supportive, authentic beauty community in the world. Where talent is recognized, connections are genuine, and everyone has the opportunity to succeed together."
    },
    {
      question: "Is EmviApp user-friendly for tech beginners?",
      answer: "Absolutely! Our interface is designed for simplicity. If you can use social media, you can use EmviApp. We also provide helpful guides and personal support when needed."
    },
    {
      question: "How does EmviApp utilize user feedback?",
      answer: "Every feature we build starts with user feedback. We regularly survey our community, respond to suggestions, and prioritize development based on what you actually need and want."
    },
    {
      question: "How transparent is EmviApp about its operations?",
      answer: "Complete transparency is our policy. We share our development progress, explain our decisions, and admit our mistakes. You can always see what we're working on and why."
    },
    {
      question: "Is EmviApp suitable for all beauty professionals?",
      answer: "Yes! Whether you're a nail technician, hair stylist, makeup artist, esthetician, or salon owner, EmviApp is designed to support your unique needs and help you connect with your ideal clients."
    },
    {
      question: "How reliable and stable is EmviApp's platform?",
      answer: "We use enterprise-grade infrastructure to ensure consistent availability. While we're always improving, our platform is built for reliability and grows stronger with each update."
    },
    {
      question: "How secure is user data on EmviApp?",
      answer: "Security is paramount. We employ bank-level encryption, regular security audits, and follow industry best practices. Your data security is never compromised for convenience."
    },
    {
      question: "How does EmviApp plan to positively impact the beauty industry?",
      answer: "By elevating talented professionals, supporting small businesses, and creating standards for authentic, quality service. We want to make the beauty industry more transparent and accessible for everyone."
    },
    {
      question: "How does EmviApp empower users to become brand ambassadors?",
      answer: "Active community members naturally become advocates for quality and authenticity. We support your voice by providing platforms to share your expertise and connect with others who share your values."
    },
    {
      question: "What's the long-term vision for the EmviApp community?",
      answer: "A thriving ecosystem where every beauty professional has the opportunity to succeed, every client finds their perfect match, and the entire industry benefits from increased standards and authentic connections."
    }
  ];

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Community Q&A
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Honest answers to your questions about EmviApp. Transparency is our foundation.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {qaData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="border border-purple-100 hover:border-purple-200 transition-colors">
                <CardHeader 
                  className="cursor-pointer p-4"
                  onClick={() => toggleOpen(index)}
                >
                  <CardTitle className="flex items-center justify-between text-left">
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="text-gray-800">{item.question}</span>
                    </div>
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-purple-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-purple-500" />
                    )}
                  </CardTitle>
                </CardHeader>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent className="pt-0 pb-4 px-4">
                        <p className="text-gray-600 leading-relaxed pl-8">
                          {item.answer}
                        </p>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityQA;
