
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Star, Crown, Zap, Award, ExternalLink, Timer } from 'lucide-react';

const ExclusiveOpportunities = () => {
  const opportunities = [
    {
      id: 1,
      type: 'Partnership',
      title: 'MAC Cosmetics Artist Program',
      description: 'Exclusive partnership opportunity for top-performing members. Work directly with MAC on campaigns and events.',
      deadline: '3 days left',
      participants: '12/20 spots',
      requirements: ['Portfolio review', '5+ years experience', 'Social media presence'],
      value: '$50K+ potential',
      urgent: true,
      image: 'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?q=80&w=400'
    },
    {
      id: 2,
      type: 'Mentorship',
      title: 'Celebrity Stylist Mentorship',
      description: 'One-on-one mentorship with A-list celebrity stylists. Limited to 5 members per quarter.',
      deadline: '1 week left',
      participants: '3/5 spots',
      requirements: ['Advanced skills', 'Professional commitment', 'Growth mindset'],
      value: 'Priceless',
      urgent: false,
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=400'
    },
    {
      id: 3,
      type: 'Event',
      title: 'Fashion Week Backstage Access',
      description: 'Work backstage at New York Fashion Week with top models and designers. Portfolio-building opportunity.',
      deadline: '5 days left',
      participants: '8/15 spots',
      requirements: ['Professional kit', 'NYC availability', 'Insurance coverage'],
      value: '$25K+ exposure',
      urgent: true,
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=400'
    }
  ];

  const benefits = [
    {
      icon: Crown,
      title: 'VIP Access',
      description: 'First access to high-paying gigs and celebrity collaborations'
    },
    {
      icon: Users,
      title: 'Network Events',
      description: 'Exclusive member meetups in major cities with industry leaders'
    },
    {
      icon: Award,
      title: 'Skill Certification',
      description: 'Official certifications recognized by top beauty brands'
    },
    {
      icon: Zap,
      title: 'Fast-Track Growth',
      description: 'Accelerated programs to 10x your income in 12 months'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-purple-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-6 py-3 mb-6"
          >
            <Crown className="h-5 w-5 text-yellow-400" />
            <span className="text-yellow-400 font-semibold">Members Only</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 font-playfair"
          >
            Exclusive Opportunities
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-purple-200 max-w-3xl mx-auto"
          >
            Access high-paying gigs, celebrity collaborations, and career-changing opportunities available only to our verified members
          </motion.p>
        </div>

        {/* Exclusive Opportunities */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {opportunities.map((opportunity, index) => (
              <motion.div
                key={opportunity.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300">
                  {/* Urgent Badge */}
                  {opportunity.urgent && (
                    <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Timer className="h-3 w-3" />
                      URGENT
                    </div>
                  )}
                  
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={opportunity.image}
                      alt={opportunity.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {opportunity.type}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 font-playfair">
                      {opportunity.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {opportunity.description}
                    </p>

                    {/* Requirements */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-purple-200 mb-2">Requirements:</h4>
                      <ul className="space-y-1">
                        {opportunity.requirements.map((req, i) => (
                          <li key={i} className="text-sm text-gray-300 flex items-center gap-2">
                            <Star className="h-3 w-3 text-yellow-400 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/10 rounded-lg p-3 text-center">
                        <Clock className="h-4 w-4 text-orange-400 mx-auto mb-1" />
                        <div className="text-sm text-white font-semibold">{opportunity.deadline}</div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3 text-center">
                        <Users className="h-4 w-4 text-blue-400 mx-auto mb-1" />
                        <div className="text-sm text-white font-semibold">{opportunity.participants}</div>
                      </div>
                    </div>

                    {/* Value */}
                    <div className="text-center mb-4">
                      <div className="text-2xl font-bold text-green-400">{opportunity.value}</div>
                      <div className="text-sm text-gray-300">Potential Value</div>
                    </div>

                    {/* Apply Button */}
                    <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Apply Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Member Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-8 font-playfair">
            Why Members Get First Access
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{benefit.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExclusiveOpportunities;
