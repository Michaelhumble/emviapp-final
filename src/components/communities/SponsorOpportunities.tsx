
import React from 'react';
import { motion } from 'framer-motion';
import { Star, TrendingUp, Users, Eye, Crown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const SponsorOpportunities = () => {
  const sponsorPackages = [
    {
      name: "Community Spotlight",
      description: "Feature your brand in our most active communities",
      reach: "50K+ monthly views",
      engagement: "12% avg engagement",
      communities: 15,
      price: "Coming Soon",
      features: [
        "Premium community placement",
        "Featured in daily digest",
        "Custom branded content",
        "Direct member engagement"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Industry Leader",
      description: "Become the go-to brand for beauty professionals",
      reach: "100K+ monthly views",
      engagement: "18% avg engagement", 
      communities: 30,
      price: "Contact Us",
      features: [
        "All Spotlight features",
        "Exclusive event partnerships",
        "Thought leadership content",
        "Priority customer support"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Platform Partner",
      description: "Maximum exposure across our entire network",
      reach: "250K+ monthly views",
      engagement: "25% avg engagement",
      communities: "All",
      price: "Custom Pricing",
      features: [
        "All previous features",
        "Co-branded initiatives",
        "Custom integration options",
        "Dedicated account manager"
      ],
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const benefits = [
    {
      icon: Users,
      title: "47K+ Active Professionals",
      description: "Reach verified beauty industry professionals"
    },
    {
      icon: TrendingUp,
      title: "High Engagement Rates",
      description: "3x higher than traditional social media"
    },
    {
      icon: Eye,
      title: "Quality Audience",
      description: "Decision-makers and industry influencers"
    },
    {
      icon: Crown,
      title: "Premium Placement",
      description: "Stand out in our premium communities"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
              Partner with the Beauty Industry's
              <span className="block bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                Most Influential Community
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Connect your brand with thousands of passionate beauty professionals who trust EmviApp for their career growth
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
              >
                <benefit.icon className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-300 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Sponsor Packages */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {sponsorPackages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 ${
                  index === 1 ? 'transform lg:scale-105 border-yellow-400/50' : ''
                }`}
              >
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-1">
                      <Crown className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${pkg.color} flex items-center justify-center mb-6`}>
                  <Sparkles className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-3">{pkg.name}</h3>
                <p className="text-gray-300 mb-6">{pkg.description}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Monthly Reach:</span>
                    <span className="font-semibold">{pkg.reach}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Engagement:</span>
                    <span className="font-semibold">{pkg.engagement}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Communities:</span>
                    <span className="font-semibold">{pkg.communities}</span>
                  </div>
                </div>

                <div className="border-t border-white/20 pt-6 mb-6">
                  <ul className="space-y-3">
                    {pkg.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-3">
                        <Star className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-center">
                  <div className={`text-3xl font-bold mb-4 bg-gradient-to-r ${pkg.color} bg-clip-text text-transparent`}>
                    {pkg.price}
                  </div>
                  <Button 
                    className={`w-full bg-gradient-to-r ${pkg.color} hover:opacity-90 text-white`}
                  >
                    Get Started
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl p-12 border border-purple-500/30"
          >
            <h3 className="text-3xl font-bold mb-4">
              Ready to Reach 47,000+ Beauty Professionals?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join industry leaders who trust EmviApp to connect with the most engaged beauty community online
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold px-8"
              >
                Schedule a Call
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Download Media Kit
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SponsorOpportunities;
