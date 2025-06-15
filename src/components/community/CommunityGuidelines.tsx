
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Heart, Users, Star, AlertCircle } from 'lucide-react';

const CommunityGuidelines = () => {
  const guidelines = [
    {
      icon: Heart,
      title: "Be Supportive",
      description: "Lift each other up. Share knowledge, celebrate wins, and offer constructive feedback."
    },
    {
      icon: Shield,
      title: "Stay Professional", 
      description: "Maintain industry standards. No spam, self-promotion without value, or unprofessional conduct."
    },
    {
      icon: Users,
      title: "Respect Everyone",
      description: "All experience levels welcome. No judgment based on skill level, location, or background."
    },
    {
      icon: Star,
      title: "Share Quality Content",
      description: "Post relevant, helpful content. Include details, context, and authentic experiences."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-['Playfair_Display']">
              Community Guidelines
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-['Inter']">
              We've built the most supportive beauty community by maintaining high standards 
              and genuine respect for every member.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {guidelines.map((guideline, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center">
                  <guideline.icon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-['Inter']">
                  {guideline.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-['Inter']">
                  {guideline.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 shadow-sm border-l-4 border-purple-500"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <AlertCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 font-['Inter']">
                  Moderation & Safety
                </h3>
                <p className="text-gray-600 mb-4 font-['Inter']">
                  Our community is actively moderated by beauty industry professionals. 
                  We use both automated systems and human review to ensure quality discussions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="text-sm text-gray-500 font-['Inter']">
                    <strong>Response Time:</strong> Issues resolved within 2 hours
                  </div>
                  <div className="text-sm text-gray-500 font-['Inter']">
                    <strong>Moderation:</strong> 24/7 professional oversight
                  </div>
                  <div className="text-sm text-gray-500 font-['Inter']">
                    <strong>Appeals:</strong> Fair review process for all decisions
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="text-center mt-12">
            <p className="text-sm text-gray-500 mb-4 font-['Inter']">
              Questions about our guidelines? Our moderation team is here to help.
            </p>
            <div className="text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent">
              Inspired by Sunshine ☀️
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityGuidelines;
