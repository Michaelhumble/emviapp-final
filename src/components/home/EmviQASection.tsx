
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
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-gray-800 mb-6 leading-tight">
            EmviApp Community Q&A
            <span className="inline-block ml-2 text-3xl md:text-4xl lg:text-5xl animate-pulse">✨</span>
          </h2>
        </motion.div>

        {/* Q&A Accordion */}
        <motion.div
          className="max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div 
            className="rounded-3xl p-8 md:p-12 backdrop-blur-xl border border-white/30 shadow-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 50%, rgba(252,252,255,0.8) 100%)",
              boxShadow: "0 32px 64px -12px rgba(139,92,246,0.1), 0 0 0 1px rgba(255,255,255,0.2), inset 0 1px 0 rgba(255,255,255,0.3)"
            }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {qaData.map((qa, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-0 rounded-2xl overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.4) 100%)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.5)"
                  }}
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline text-left font-medium text-gray-800 hover:text-purple-700 transition-colors duration-200">
                    <span className="text-sm md:text-base leading-relaxed pr-4">
                      {index + 1}. {qa.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 text-gray-700 leading-relaxed">
                    <div className="text-sm md:text-base pt-2">
                      {qa.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>

        {/* Final CTA Block */}
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div 
            className="rounded-3xl p-12 md:p-16 backdrop-blur-xl border border-white/40"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(252,250,255,0.9) 50%, rgba(255,249,245,0.95) 100%)",
              boxShadow: "0 32px 64px -12px rgba(139,92,246,0.15), 0 0 0 1px rgba(255,255,255,0.3), inset 0 1px 0 rgba(255,255,255,0.4)"
            }}
          >
            <h3 className="text-3xl md:text-4xl font-playfair font-bold text-gray-800 mb-6">
              Ready to Join the Movement?
            </h3>
            
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
              EmviApp isn't just another app—it's a mission, a movement, and a community. If you're ready to grow, share, and succeed together, join us and let's make the beauty industry better for everyone!
            </p>
            
            <Link to="/auth/signup">
              <Button 
                size="lg" 
                className="text-lg px-12 py-6 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #F59E0B 100%)",
                  boxShadow: "0 8px 32px rgba(139,92,246,0.3), inset 0 1px 0 rgba(255,255,255,0.2)"
                }}
              >
                Join Now – Experience the Difference
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EmviQASection;
