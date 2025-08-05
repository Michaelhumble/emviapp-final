
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, Sparkles } from "lucide-react";

const EmviQASection = () => {
  const qaData = [
    {
      question: "Why should I pay to post a job here instead of using free Facebook groups or social media?",
      answer: "While Facebook and social media are crowded and random, EmviApp is designed exclusively for beauty professionals. Your posts reach the right audience instantly—no more sifting through unrelated spam. Plus, our AI actively matches your jobs with the most qualified local artists, giving you a real advantage. You invest in better results, not just in visibility."
    },
    {
      question: "Everything is free right now—so why will I need to pay in the future?",
      answer: "Right now, we're building the community and offering our core features for free so everyone can experience the value risk-free. As we grow, premium options will unlock more advanced tools and visibility. Early adopters will always get special benefits—being here early means you'll help shape the platform and get rewarded."
    },
    {
      question: "How does your AI actually help bring new customers to my salon?",
      answer: "Our AI doesn't just promote you—it understands what customers want and connects them to your services automatically. It helps fill your empty spots, recommends your salon based on real preferences, and keeps your business top-of-mind for anyone searching nearby. It's like having a personal digital marketing team working for you, 24/7."
    },
    {
      question: "If the economy is down and salons are struggling, how can EmviApp help?",
      answer: "When times are tough, visibility and community support are everything. EmviApp highlights special offers, shares your story, and helps you connect with loyal clients and new opportunities. We're here to help you adapt, grow, and stay resilient—no matter what the market looks like."
    },
    {
      question: "How do I find high-quality artists and customers here?",
      answer: "Every artist on EmviApp has a detailed profile, verified reviews, and real work showcased. You're not just posting into the void—you're connecting with motivated, vetted professionals and customers who are ready to engage."
    },
    {
      question: "How does EmviApp help artists find better salons?",
      answer: "Artists can browse honest salon profiles, see real reviews, and apply directly to salons that fit their style and values. No more blind applications or bad matches—EmviApp empowers you to find the right environment where you can truly thrive."
    },
    {
      question: "Is EmviApp just another \"scam\" app? What if I don't get results?",
      answer: "We believe in total transparency and real, measurable impact. No fake promises or empty hype—just results you can see. If something doesn't work, our team listens, adapts, and makes it right. We're building EmviApp together, with and for the community."
    },
    {
      question: "How does EmviApp help me grow and manage multiple salons?",
      answer: "You'll have one dashboard for all your locations, easy staff management, and the ability to promote across your network. As we roll out more features, managing multi-location salons will get even simpler—with special rewards for power users."
    },
    {
      question: "There are already proven apps—why should I try EmviApp?",
      answer: "EmviApp is built by people who understand beauty, not just tech. We're fresh, hungry, and 100% focused on YOUR needs, not a giant company's agenda. Join now to help us build something truly for you—and get VIP treatment as an early adopter."
    },
    {
      question: "What truly makes EmviApp different from every other app?",
      answer: "We're not just another listing platform. EmviApp combines smart AI, real community, verified reviews, and a focus on the beauty industry. You're not lost in a sea of irrelevant posts—you're at the heart of a movement built on trust, authenticity, and connection."
    },
    {
      question: "Will EmviApp be here for the long-term?",
      answer: "We're committed for the long haul. Our mission is to empower every beauty professional. The more people join and support, the stronger and more sustainable EmviApp becomes. We're transparent about growth and invite you to be a part of our story."
    },
    {
      question: "What is EmviApp's mission and vision?",
      answer: "EmviApp exists to unite and elevate the beauty industry—making it easier for salons, artists, and customers to find each other, grow, and succeed together. Our vision is an empowered, supportive, and thriving beauty community everywhere."
    },
    {
      question: "How can I invest or become a shareholder in EmviApp?",
      answer: "We welcome those who want to grow with us! Sign up for updates—when the time is right, we'll offer investment and partnership opportunities to our most passionate supporters first."
    },
    {
      question: "I'm a social influencer—how can EmviApp help me and get me involved?",
      answer: "We LOVE working with passionate voices! Join our Brand Ambassador program, get early access to features, and help shape the future of beauty tech while earning exclusive perks and recognition."
    },
    {
      question: "I know the beauty business inside out—can I help EmviApp grow?",
      answer: "Absolutely! We're always looking for experienced advisors, beta testers, and industry partners. Reach out—your knowledge can help steer EmviApp to greatness, and we love rewarding those who make a difference."
    },
    {
      question: "Why should I sponsor EmviApp as a beauty supplier?",
      answer: "You'll reach an active, loyal, and growing community of real professionals. Sponsoring EmviApp puts your brand in the spotlight with those who matter most—plus, you'll help shape the features that support your business needs."
    },
    {
      question: "With so many platforms out there, why should I trust EmviApp?",
      answer: "We're open, honest, and transparent in everything we do. User stories, real results, and community-driven development set us apart. You're not just a user—you're a partner in something special."
    },
    {
      question: "Why does EmviApp seem to focus more on nails than other beauty fields?",
      answer: "We started in nails because that's where the need was greatest, but we're rapidly expanding to include hair, skincare, massage, and more. If you join now, you'll help us shape every new industry we support."
    },
    {
      question: "I run a massage salon. Why do I need to add employee photos?",
      answer: "Photos build trust and connection, even for massage or spa services. Clients want to know who they'll be working with—seeing your team's professionalism helps you stand out and get more bookings."
    },
    {
      question: "Will EmviApp help me run all my businesses from one place in the future?",
      answer: "That's our goal! We're developing tools for bookings, marketing, payments, team management, and more—all in one easy platform. You'll have everything you need to grow, right at your fingertips."
    },
    {
      question: "I'm an investor and want to help EmviApp scale. How do I reach the founders?",
      answer: "We'd love to connect! Use our Contact page or email us directly—founders read every message from serious partners and investors."
    },
    {
      question: "I'm not in the beauty business but know people who are—how can I benefit?",
      answer: "Join our referral program! When you invite new salons, artists, or customers, you earn rewards and recognition as a key part of our growth."
    },
    {
      question: "How does EmviApp help salons struggling to find staff or artists?",
      answer: "EmviApp actively matches your open positions with top local talent, using smart filters and AI-powered recommendations. No more hoping for the right fit—let us bring the right people to you."
    },
    {
      question: "I want to buy a salon but don't know if it's a good deal. Can EmviApp help?",
      answer: "Yes! Our platform provides transparent business info, real community reviews, and AI insights to help you make smarter decisions before investing."
    },
    {
      question: "How can EmviApp help me relocate and find a great salon before I move?",
      answer: "Search by city or zip code, see honest reviews, and connect with salon owners in advance—so you can line up work before you even arrive."
    },
    {
      question: "How do I sell my salon quickly using EmviApp?",
      answer: "List your salon for sale, highlight its unique features, and reach qualified buyers already searching for new opportunities in your area."
    },
    {
      question: "I'm renting a studio or chair—how do I find clients?",
      answer: "EmviApp's geo-targeted search puts your services in front of nearby customers looking for exactly what you offer—no more empty chairs."
    },
    {
      question: "How can I promote all my services to everyone nearby?",
      answer: "When users open the app, they see local offers and services—your business gets instant visibility and more bookings with just a few taps."
    },
    {
      question: "How can I recruit the best artists without drama?",
      answer: "We believe in ethical recruiting—attract top talent by offering a great environment, fair pay, and clear opportunities. Our AI helps you connect with artists ready for a new chapter, no poaching required."
    },
    {
      question: "How can I find managers or support staff for my salon?",
      answer: "We're expanding our hiring tools to include managers and support staff. Soon you'll be able to post jobs and find experienced professionals to help your business run smoothly."
    }
  ];

  // Sparkle animation variants
  const sparkleVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.4, 1, 0.4],
      rotate: [0, 180, 360],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Premium gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(252,250,255,0.98) 25%, rgba(255,249,245,0.95) 50%, rgba(252,250,255,0.98) 75%, rgba(255,255,255,0.95) 100%)"
        }}
      />
      
      {/* Animated sparkles */}
      <motion.div
        className="absolute top-20 left-1/4 text-amber-400 text-lg opacity-60"
        variants={sparkleVariants}
        animate="animate"
      >
        <Sparkles />
      </motion.div>
      <motion.div
        className="absolute top-40 right-1/5 text-purple-400 text-sm opacity-50"
        variants={sparkleVariants}
        animate="animate"
        style={{ animationDelay: "1s" }}
      >
        <Sparkles />
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-1/6 text-rose-400 text-base opacity-60"
        variants={sparkleVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
      >
        <Sparkles />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-2xl">❓</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
              EmviApp Community Q&A
            </h2>
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-2xl animate-pulse">✨</span>
            </div>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
            Real questions from our community, answered with transparency and care.
          </p>
        </motion.div>

        {/* Enhanced Q&A Accordion */}
        <motion.div
          className="max-w-5xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-purple-100">
            <Accordion type="single" collapsible className="space-y-6">
              {qaData.map((qa, index) => {
                const gradients = [
                  "from-purple-50 to-violet-50 border-purple-200",
                  "from-blue-50 to-cyan-50 border-blue-200", 
                  "from-pink-50 to-rose-50 border-pink-200",
                  "from-green-50 to-emerald-50 border-green-200",
                  "from-orange-50 to-amber-50 border-orange-200"
                ];
                const currentGradient = gradients[index % gradients.length];
                
                return (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border-0"
                  >
                    <div className={`bg-gradient-to-br ${currentGradient} rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-l-4`}>
                      <AccordionTrigger className="px-6 py-6 hover:no-underline text-left group">
                        <div className="flex items-start gap-4 w-full">
                          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                            <span className="text-sm font-bold text-purple-600">{index + 1}</span>
                          </div>
                          <span className="text-lg font-semibold text-gray-800 leading-relaxed pr-4 group-hover:text-purple-700 transition-colors duration-300">
                            {qa.question}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6">
                        <div className="ml-12 bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-white/50">
                          <p className="text-gray-700 leading-relaxed text-base">
                            {qa.answer}
                          </p>
                        </div>
                      </AccordionContent>
                    </div>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </motion.div>

        {/* Enhanced Final CTA Block */}
        <motion.div
          className="text-center max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 rounded-3xl p-12 md:p-16 shadow-2xl">
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="text-4xl">🚀</span>
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                Ready to Join the Movement?
              </h3>
              <span className="text-4xl">💫</span>
            </div>
            
            <p className="text-xl text-purple-100 leading-relaxed mb-10 max-w-4xl mx-auto">
              EmviApp isn't just another app—it's a mission, a movement, and a community. If you're ready to grow, share, and succeed together, join us and let's make the beauty industry better for everyone!
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <a href="http://emviapp-final.lovable.app/auth/signup?redirect=%2F">
                <Button 
                  size="lg" 
                  className="bg-white text-purple-900 hover:bg-gray-50 font-bold px-12 py-6 rounded-2xl text-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <span className="flex items-center">
                    <span className="mr-3">✨ Join Now – Experience the Difference</span>
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </Button>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EmviQASection;
