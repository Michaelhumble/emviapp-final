
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, Search, MessageCircleQuestion, Star, TrendingUp, Building2, Users, Heart } from "lucide-react";

const EmviQASection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const qaData = [
    {
      question: "Why should I pay to post a job here instead of using free Facebook groups or social media?",
      answer: "While Facebook and social media are crowded and random, EmviApp is designed exclusively for beauty professionals. Your posts reach the right audience instantly—no more sifting through unrelated spam. Plus, our AI actively matches your jobs with the most qualified local artists, giving you a real advantage. You invest in better results, not just in visibility.",
      category: "platform",
      popular: true
    },
    {
      question: "Everything is free right now—so why will I need to pay in the future?",
      answer: "Right now, we're building the community and offering our core features for free so everyone can experience the value risk-free. As we grow, premium options will unlock more advanced tools and visibility. Early adopters will always get special benefits—being here early means you'll help shape the platform and get rewarded.",
      category: "platform",
      popular: true
    },
    {
      question: "How does your AI actually help bring new customers to my salon?",
      answer: "Our AI doesn't just promote you—it understands what customers want and connects them to your services automatically. It helps fill your empty spots, recommends your salon based on real preferences, and keeps your business top-of-mind for anyone searching nearby. It's like having a personal digital marketing team working for you, 24/7.",
      category: "business",
      popular: true
    },
    {
      question: "If the economy is down and salons are struggling, how can EmviApp help?",
      answer: "When times are tough, visibility and community support are everything. EmviApp highlights special offers, shares your story, and helps you connect with loyal clients and new opportunities. We're here to help you adapt, grow, and stay resilient—no matter what the market looks like.",
      category: "business",
      popular: false
    },
    {
      question: "How do I find high-quality artists and customers here?",
      answer: "Every artist on EmviApp has a detailed profile, verified reviews, and real work showcased. You're not just posting into the void—you're connecting with motivated, vetted professionals and customers who are ready to engage.",
      category: "community",
      popular: true
    },
    {
      question: "How does EmviApp help artists find better salons?",
      answer: "Artists can browse honest salon profiles, see real reviews, and apply directly to salons that fit their style and values. No more blind applications or bad matches—EmviApp empowers you to find the right environment where you can truly thrive.",
      category: "community",
      popular: false
    },
    {
      question: "Is EmviApp just another \"scam\" app? What if I don't get results?",
      answer: "We believe in total transparency and real, measurable impact. No fake promises or empty hype—just results you can see. If something doesn't work, our team listens, adapts, and makes it right. We're building EmviApp together, with and for the community.",
      category: "platform",
      popular: true
    },
    {
      question: "How does EmviApp help me grow and manage multiple salons?",
      answer: "You'll have one dashboard for all your locations, easy staff management, and the ability to promote across your network. As we roll out more features, managing multi-location salons will get even simpler—with special rewards for power users.",
      category: "business",
      popular: false
    },
    {
      question: "There are already proven apps—why should I try EmviApp?",
      answer: "EmviApp is built by people who understand beauty, not just tech. We're fresh, hungry, and 100% focused on YOUR needs, not a giant company's agenda. Join now to help us build something truly for you—and get VIP treatment as an early adopter.",
      category: "platform",
      popular: true
    },
    {
      question: "What truly makes EmviApp different from every other app?",
      answer: "We're not just another listing platform. EmviApp combines smart AI, real community, verified reviews, and a focus on the beauty industry. You're not lost in a sea of irrelevant posts—you're at the heart of a movement built on trust, authenticity, and connection.",
      category: "platform",
      popular: true
    },
    {
      question: "Will EmviApp be here for the long-term?",
      answer: "We're committed for the long haul. Our mission is to empower every beauty professional. The more people join and support, the stronger and more sustainable EmviApp becomes. We're transparent about growth and invite you to be a part of our story.",
      category: "platform",
      popular: false
    },
    {
      question: "What is EmviApp's mission and vision?",
      answer: "EmviApp exists to unite and elevate the beauty industry—making it easier for salons, artists, and customers to find each other, grow, and succeed together. Our vision is an empowered, supportive, and thriving beauty community everywhere.",
      category: "platform",
      popular: false
    },
    {
      question: "How can I invest or become a shareholder in EmviApp?",
      answer: "We welcome those who want to grow with us! Sign up for updates—when the time is right, we'll offer investment and partnership opportunities to our most passionate supporters first.",
      category: "platform",
      popular: false
    },
    {
      question: "I'm a social influencer—how can EmviApp help me and get me involved?",
      answer: "We LOVE working with passionate voices! Join our Brand Ambassador program, get early access to features, and help shape the future of beauty tech while earning exclusive perks and recognition.",
      category: "community",
      popular: false
    },
    {
      question: "I know the beauty business inside out—can I help EmviApp grow?",
      answer: "Absolutely! We're always looking for experienced advisors, beta testers, and industry partners. Reach out—your knowledge can help steer EmviApp to greatness, and we love rewarding those who make a difference.",
      category: "community",
      popular: false
    },
    {
      question: "Why should I sponsor EmviApp as a beauty supplier?",
      answer: "You'll reach an active, loyal, and growing community of real professionals. Sponsoring EmviApp puts your brand in the spotlight with those who matter most—plus, you'll help shape the features that support your business needs.",
      category: "business",
      popular: false
    },
    {
      question: "With so many platforms out there, why should I trust EmviApp?",
      answer: "We're open, honest, and transparent in everything we do. User stories, real results, and community-driven development set us apart. You're not just a user—you're a partner in something special.",
      category: "platform",
      popular: false
    },
    {
      question: "Why does EmviApp seem to focus more on nails than other beauty fields?",
      answer: "We started in nails because that's where the need was greatest, but we're rapidly expanding to include hair, skincare, massage, and more. If you join now, you'll help us shape every new industry we support.",
      category: "platform",
      popular: false
    },
    {
      question: "I run a massage salon. Why do I need to add employee photos?",
      answer: "Photos build trust and connection, even for massage or spa services. Clients want to know who they'll be working with—seeing your team's professionalism helps you stand out and get more bookings.",
      category: "business",
      popular: false
    },
    {
      question: "Will EmviApp help me run all my businesses from one place in the future?",
      answer: "That's our goal! We're developing tools for bookings, marketing, payments, team management, and more—all in one easy platform. You'll have everything you need to grow, right at your fingertips.",
      category: "business",
      popular: false
    },
    {
      question: "I'm an investor and want to help EmviApp scale. How do I reach the founders?",
      answer: "We'd love to connect! Use our Contact page or email us directly—founders read every message from serious partners and investors.",
      category: "platform",
      popular: false
    },
    {
      question: "I'm not in the beauty business but know people who are—how can I benefit?",
      answer: "Join our referral program! When you invite new salons, artists, or customers, you earn rewards and recognition as a key part of our growth.",
      category: "community",
      popular: false
    },
    {
      question: "How does EmviApp help salons struggling to find staff or artists?",
      answer: "EmviApp actively matches your open positions with top local talent, using smart filters and AI-powered recommendations. No more hoping for the right fit—let us bring the right people to you.",
      category: "business",
      popular: true
    },
    {
      question: "I want to buy a salon but don't know if it's a good deal. Can EmviApp help?",
      answer: "Yes! Our platform provides transparent business info, real community reviews, and AI insights to help you make smarter decisions before investing.",
      category: "business",
      popular: false
    },
    {
      question: "How can EmviApp help me relocate and find a great salon before I move?",
      answer: "Search by city or zip code, see honest reviews, and connect with salon owners in advance—so you can line up work before you even arrive.",
      category: "community",
      popular: false
    },
    {
      question: "How do I sell my salon quickly using EmviApp?",
      answer: "List your salon for sale, highlight its unique features, and reach qualified buyers already searching for new opportunities in your area.",
      category: "business",
      popular: false
    },
    {
      question: "I'm renting a studio or chair—how do I find clients?",
      answer: "EmviApp's geo-targeted search puts your services in front of nearby customers looking for exactly what you offer—no more empty chairs.",
      category: "business",
      popular: false
    },
    {
      question: "How can I promote all my services to everyone nearby?",
      answer: "When users open the app, they see local offers and services—your business gets instant visibility and more bookings with just a few taps.",
      category: "business",
      popular: false
    },
    {
      question: "How can I recruit the best artists without drama?",
      answer: "We believe in ethical recruiting—attract top talent by offering a great environment, fair pay, and clear opportunities. Our AI helps you connect with artists ready for a new chapter, no poaching required.",
      category: "business",
      popular: false
    },
    {
      question: "How can I find managers or support staff for my salon?",
      answer: "We're expanding our hiring tools to include managers and support staff. Soon you'll be able to post jobs and find experienced professionals to help your business run smoothly.",
      category: "business",
      popular: false
    }
  ];

  const categories = [
    { id: "all", name: "All Questions", icon: MessageCircleQuestion, color: "slate" },
    { id: "platform", name: "Platform & Features", icon: TrendingUp, color: "purple" },
    { id: "business", name: "Business Growth", icon: Building2, color: "blue" },
    { id: "community", name: "Community & Network", icon: Users, color: "emerald" },
  ];

  const filteredQAs = qaData.filter(qa => {
    const matchesSearch = qa.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         qa.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || qa.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularQAs = qaData.filter(qa => qa.popular).slice(0, 6);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-orange-50/20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-orange-100/20 to-amber-100/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-br from-purple-100/20 to-pink-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Number Badge */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/60 rounded-full px-6 py-3 shadow-sm">
            <span className="w-8 h-8 bg-gradient-to-r from-orange-600 to-amber-600 text-white text-sm font-bold rounded-full flex items-center justify-center">
              6
            </span>
            <span className="text-orange-700 font-semibold text-sm font-primary tracking-wide">
              Community Q&A
            </span>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6 leading-tight tracking-tight">
            EmviApp{" "}
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
              Community Q&A
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-primary mb-8">
            Real questions from our community members, answered by industry experts and successful professionals.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-4 text-lg rounded-xl border-slate-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-300"
            />
          </div>
        </motion.div>

        {/* Popular Questions Preview */}
        {searchTerm === "" && selectedCategory === "all" && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Star className="h-6 w-6 text-amber-500" />
              <h3 className="text-2xl font-display font-bold text-slate-900">
                Most Popular Questions
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularQAs.map((qa, index) => (
                <motion.div
                  key={`popular-${index}`}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-gradient-to-br from-white to-orange-50/30 p-6 rounded-2xl shadow-sm border border-orange-100/60 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Heart className="h-4 w-4 text-orange-600" />
                    </div>
                    <h4 className="font-display font-semibold text-slate-900 text-sm leading-relaxed group-hover:text-orange-700 transition-colors duration-300">
                      {qa.question}
                    </h4>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed font-primary line-clamp-3">
                    {qa.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            
            const getButtonStyles = () => {
              if (isActive) {
                switch (category.color) {
                  case "purple":
                    return "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg";
                  case "blue":
                    return "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg";
                  case "emerald":
                    return "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg";
                  default:
                    return "bg-gradient-to-r from-slate-600 to-slate-700 text-white shadow-lg";
                }
              }
              
              switch (category.color) {
                case "purple":
                  return "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-purple-300";
                case "blue":
                  return "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-blue-300";
                case "emerald":
                  return "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-emerald-300";
                default:
                  return "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300";
              }
            };
            
            return (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl font-primary font-medium text-sm transition-all duration-300 ${getButtonStyles()}`}
              >
                <Icon className="h-4 w-4" />
                {category.name}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Q&A Accordion */}
        <motion.div
          className="max-w-5xl mx-auto mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-6">
            {filteredQAs.map((qa, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <AccordionItem 
                  value={`item-${index}`}
                  className="border-0"
                >
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 hover:shadow-xl hover:border-slate-300/80 transition-all duration-500 overflow-hidden">
                    <AccordionTrigger className="px-8 py-6 hover:no-underline text-left group-hover:bg-slate-50/50 transition-all duration-300">
                      <div className="flex items-start gap-6 w-full">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-orange-200 group-hover:to-amber-200 transition-all duration-300">
                          <span className="text-lg font-bold text-orange-600">{index + 1}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-lg font-display font-bold text-slate-900 leading-relaxed pr-6 group-hover:text-orange-700 transition-colors duration-300 block">
                            {qa.question}
                          </span>
                          {qa.popular && (
                            <div className="flex items-center gap-2 mt-2">
                              <Star className="h-4 w-4 text-amber-500" />
                              <span className="text-xs font-primary font-medium text-amber-600">Popular</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-6">
                      <div className="ml-18 bg-gradient-to-br from-slate-50/80 to-orange-50/30 p-6 rounded-xl border border-slate-100">
                        <p className="text-slate-700 leading-relaxed font-primary text-base">
                          {qa.answer}
                        </p>
                      </div>
                    </AccordionContent>
                  </div>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

          {filteredQAs.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <MessageCircleQuestion className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-display font-semibold text-slate-600 mb-2">
                No questions found
              </h3>
              <p className="text-slate-500 font-primary">
                Try adjusting your search or browse different categories
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-gradient-to-br from-white to-orange-50/50 p-8 md:p-12 rounded-3xl shadow-xl border border-orange-100/60 max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-lg text-slate-600 mb-8 font-primary leading-relaxed">
              Join our growing community and get answers from real beauty professionals
            </p>
            
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <a href="http://emviapp-final.lovable.app/auth/signup?redirect=%2F">
                <Button 
                  size="lg"
                  className="font-primary font-bold px-10 py-5 text-lg bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span className="flex items-center gap-3">
                    <span>✨ Join Our Community</span>
                    <ArrowRight className="h-6 w-6" />
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
