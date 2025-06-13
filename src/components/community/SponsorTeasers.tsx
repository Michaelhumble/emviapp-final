
import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, CreditCard, BarChart3, Users, Calendar, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SponsorTeasers = () => {
  const comingFeatures = [
    {
      icon: <CreditCard className="h-8 w-8 text-green-500" />,
      title: "Integrated POS System",
      description: "Complete payment processing, inventory tracking, and sales analytics all in one place.",
      benefits: ["Process payments instantly", "Track inventory automatically", "Generate sales reports"],
      image: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/photos/generated(15).png",
      votes: 1247
    },
    {
      icon: <Smartphone className="h-8 w-8 text-blue-500" />,
      title: "SMS Marketing Suite",
      description: "Automated appointment reminders, promotional campaigns, and customer engagement tools.",
      benefits: ["Reduce no-shows by 80%", "Increase rebookings", "Personalized promotions"],
      image: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/photos/generated(21).png",
      votes: 923
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-purple-500" />,
      title: "Business Intelligence Dashboard",
      description: "Advanced analytics, customer insights, and performance tracking for data-driven decisions.",
      benefits: ["Track key metrics", "Identify growth opportunities", "Optimize pricing strategies"],
      image: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/photos/generated(27).png",
      votes: 678
    },
    {
      icon: <Users className="h-8 w-8 text-pink-500" />,
      title: "Team Collaboration Hub",
      description: "Streamlined communication, shift management, and team performance tracking.",
      benefits: ["Coordinate schedules easily", "Share best practices", "Track team goals"],
      image: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/photos/generated(33).png",
      votes: 834
    }
  ];

  const sponsorBenefits = [
    "Direct access to 15,000+ engaged beauty professionals",
    "Authentic product placement in real-world scenarios",
    "Community-driven feedback for product development",
    "Brand partnership opportunities with rising stars",
    "Targeted advertising to specific beauty specialties"
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-white via-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2">
            Coming Soon
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Future Features You'll Love
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Vote for the features you want most. Your voice shapes EmviApp's future.
          </p>
        </motion.div>

        {/* Coming Soon Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {comingFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-purple-200 hover:shadow-lg transition-shadow relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    Coming Soon
                  </Badge>
                </div>
                
                <div className="relative">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    {feature.icon}
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{feature.title}</span>
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <h4 className="font-semibold text-sm text-gray-800">Key Benefits:</h4>
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm text-gray-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">Community Vote</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                      {feature.votes} votes
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Sponsor Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Partner With EmviApp
            </h3>
            <p className="text-purple-100 max-w-2xl mx-auto">
              Join leading beauty brands in supporting our growing community of professionals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-semibold mb-4">Why Partner With Us?</h4>
              <ul className="space-y-3">
                {sponsorBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span className="text-purple-100">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h5 className="text-lg font-semibold mb-2">Community Size</h5>
                <div className="text-3xl font-bold text-yellow-400 mb-1">15,247</div>
                <p className="text-sm text-purple-100">Active Beauty Professionals</p>
                
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-yellow-400">89%</div>
                      <div className="text-xs text-purple-100">Engagement Rate</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-yellow-400">$2.1M</div>
                      <div className="text-xs text-purple-100">Monthly Revenue</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorTeasers;
