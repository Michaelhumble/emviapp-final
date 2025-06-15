
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, TrendingUp, Sparkles, Shield, Zap, Award, Globe } from 'lucide-react';

const WhyJoinSection = () => {
  const reasons = [
    {
      icon: Heart,
      title: "Genuine Support System",
      description: "Real beauty professionals who understand your journey and celebrate your wins like their own.",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: TrendingUp,
      title: "Career Growth Acceleration",
      description: "Members see 3x faster business growth through mentorship, referrals, and proven strategies.",
      gradient: "from-emerald-500 to-green-500"
    },
    {
      icon: Users,
      title: "Industry Connections",
      description: "Network with top artists, salon owners, and industry leaders who open doors to opportunities.",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      icon: Sparkles,
      title: "Viral Success Stories",
      description: "Our members go viral regularly. Learn the secrets behind transformations that capture millions.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Safe Space to Grow",
      description: "No judgment, only encouragement. Share struggles, ask questions, and grow without fear.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Zap,
      title: "Instant Expert Advice",
      description: "Get answers from experienced professionals within hours, not weeks. No question too small.",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: Award,
      title: "Recognition & Credibility",
      description: "Build your reputation through community endorsements and peer recognition programs.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: Globe,
      title: "National Opportunities",
      description: "Access to brand partnerships, collaborations, and opportunities across the entire US market.",
      gradient: "from-teal-500 to-cyan-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Join
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {" "}EmviApp?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            This isn't just another platform. It's where beauty professionals become industry leaders, 
            dreams turn into reality, and careers transform forever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 h-full">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${reason.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <reason.icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                  {reason.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {reason.description}
                </p>

                {/* Hover Effect */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className={`h-1 bg-gradient-to-r ${reason.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Trusted by Industry Leaders</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              {[
                { stat: "98%", label: "Member Satisfaction" },
                { stat: "15K+", label: "Active Professionals" },
                { stat: "3x", label: "Average Growth Rate" },
                { stat: "50+", label: "Cities Represented" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    {item.stat}
                  </div>
                  <div className="text-gray-600 text-sm">{item.label}</div>
                </div>
              ))}
            </div>

            <p className="text-gray-600 italic">
              "EmviApp isn't just changing careers—it's transforming lives. This is where the future of beauty begins."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyJoinSection;
