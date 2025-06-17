
import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Star, Zap, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PremiumTooltips from './PremiumTooltips';
import { useCTAInteractions } from '@/hooks/useCTAInteractions';

const SponsorTeasers = () => {
  const { handleCTAClick, isLoading } = useCTAInteractions();

  const opportunities = [
    {
      id: 1,
      title: "Elite Brand Partnership",
      company: "Luxury Beauty Co.",
      description: "Exclusive collaboration opportunity for top-rated artists",
      badge: "VIP Only",
      badgeColor: "bg-purple-500",
      icon: Crown,
      requirements: "5+ years experience, 100+ reviews"
    },
    {
      id: 2,
      title: "Master Class Instructor",
      company: "Beauty Academy Pro",
      description: "Teach advanced techniques to aspiring professionals",
      badge: "Premium",
      badgeColor: "bg-amber-500", 
      icon: Star,
      requirements: "Certified instructor, portfolio review"
    },
    {
      id: 3,
      title: "Product Development Consultant",
      company: "InnoBeauty Labs",
      description: "Help develop next-gen beauty tools and products",
      badge: "Exclusive",
      badgeColor: "bg-emerald-500",
      icon: Zap,
      requirements: "Industry expertise, NDA required"
    }
  ];

  return (
    <div className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-6"
      >
        <h2 className="text-2xl font-bold font-serif text-gray-900 mb-2">
          ✨ Exclusive Opportunities
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Premium partnerships and collaborations available only to our most trusted professionals
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {opportunities.map((opportunity, index) => {
          const Icon = opportunity.icon;
          return (
            <motion.div
              key={opportunity.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <PremiumTooltips type="premium" message="Premium feature - Upgrade to unlock exclusive opportunities!">
                <Card className="relative overflow-hidden border-2 border-transparent bg-gradient-to-br from-white to-gray-50 hover:border-purple-200 transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <span className={`inline-block px-2 py-1 text-xs font-medium text-white rounded-full ${opportunity.badgeColor} mb-2`}>
                            {opportunity.badge}
                          </span>
                        </div>
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 bg-green-500 rounded-full"
                      />
                    </div>
                    
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      {opportunity.title}
                    </h3>
                    <p className="text-purple-600 font-medium text-sm mb-3">
                      {opportunity.company}
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                      {opportunity.description}
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      Requirements: {opportunity.requirements}
                    </p>
                    
                    <Button 
                      onClick={() => handleCTAClick('apply_now', opportunity.id.toString())}
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white group-hover:shadow-lg transition-all"
                    >
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </PremiumTooltips>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SponsorTeasers;
