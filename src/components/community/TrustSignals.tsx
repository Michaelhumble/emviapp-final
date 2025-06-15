
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Shield, Heart, TrendingUp } from 'lucide-react';

const TrustSignals = () => {
  const stats = [
    {
      icon: Star,
      value: "4.9/5",
      label: "Community Rating",
      description: "Based on 8,200+ reviews"
    },
    {
      icon: Shield,
      value: "100%",
      label: "Verified Members",
      description: "All professionals verified"
    },
    {
      icon: Heart,
      value: "94%",
      label: "Success Rate",
      description: "Members achieving goals"
    },
    {
      icon: TrendingUp,
      value: "2.5x",
      label: "Average Growth",
      description: "In member earnings"
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-['Playfair_Display']">
              Trusted by Beauty Professionals Nationwide
            </h2>
            <p className="text-gray-600 font-['Inter']">
              Real results from real members building successful beauty careers
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2 font-['Inter']">
                  {stat.value}
                </div>
                <div className="font-semibold text-gray-700 mb-1 font-['Inter']">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-500 font-['Inter']">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
