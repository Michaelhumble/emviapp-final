import React from 'react';
import { motion } from 'framer-motion';
import { Star, TrendingUp, Users, Award } from 'lucide-react';

const SuccessStoriesSection = () => {
  const successStories = [
    {
      name: "Maria Rodriguez",
      salon: "Bella Vista Salon",
      location: "Austin, TX",
      story: "Sold in 18 days for $275K - EmviApp brought me 12 qualified buyers!",
      rating: 5,
      image: "💇‍♀️",
      metrics: { days: 18, offers: 12, price: "$275K" }
    },
    {
      name: "David Chen",
      salon: "Elite Beauty Studio", 
      location: "Miami, FL",
      story: "Found my dream salon through EmviApp. The verification process gave me confidence.",
      rating: 5,
      image: "✂️",
      metrics: { saved: "6 months", verified: "100%", satisfaction: "Perfect" }
    },
    {
      name: "Sarah Johnson",
      salon: "Luxe Nail Bar",
      location: "Houston, TX", 
      story: "Listed for free, got featured, and sold above asking price. EmviApp changed my life!",
      rating: 5,
      image: "💅",
      metrics: { profit: "+15%", exposure: "50K+", time: "3 weeks" }
    }
  ];

  return (
    <section id="success-stories" className="py-20 bg-gradient-to-br from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-playfair font-bold text-gray-900 mb-6">
            Real Stories, Real Results
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of salon owners who've transformed their businesses with EmviApp
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-purple-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-6xl mb-4">{story.image}</div>
              
              <div className="flex items-center gap-1 mb-4">
                {[...Array(story.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <blockquote className="text-gray-700 text-lg mb-6 leading-relaxed">
                "{story.story}"
              </blockquote>

              <div className="border-t pt-4">
                <div className="font-semibold text-gray-900">{story.name}</div>
                <div className="text-purple-600 font-medium">{story.salon}</div>
                <div className="text-gray-500 text-sm">{story.location}</div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                {Object.entries(story.metrics).map(([key, value]) => (
                  <div key={key} className="bg-purple-50 rounded-lg p-2">
                    <div className="text-purple-600 font-bold text-sm">{value}</div>
                    <div className="text-gray-500 text-xs capitalize">{key}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h3>
            <p className="text-purple-100 mb-6 text-lg">
              Join over 4,000 verified salon owners who trust EmviApp with their business
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div className="flex flex-col items-center">
                <TrendingUp className="w-8 h-8 mb-2" />
                <div className="font-bold text-xl">Average 3-4 weeks</div>
                <div className="text-purple-200 text-sm">to sell</div>
              </div>
              <div className="flex flex-col items-center">
                <Users className="w-8 h-8 mb-2" />
                <div className="font-bold text-xl">100% verified</div>
                <div className="text-purple-200 text-sm">buyer network</div>
              </div>
              <div className="flex flex-col items-center">
                <Award className="w-8 h-8 mb-2" />
                <div className="font-bold text-xl">$0 listing fee</div>
                <div className="text-purple-200 text-sm">to get started</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;