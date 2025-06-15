
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Star, TrendingUp, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const FeaturedCommunities = () => {
  const featuredGroups = [
    {
      id: 1,
      name: "Nail Art Masters",
      description: "Advanced techniques, trending designs, and pro tips from certified nail artists",
      members: 12847,
      image: "/lovable-uploads/nail-art-community.jpg",
      trending: true,
      category: "Nail Art",
      growth: "+234 this week"
    },
    {
      id: 2,
      name: "Hair Color Innovators",
      description: "Revolutionary coloring techniques and formula discussions",
      members: 8932,
      image: "/lovable-uploads/hair-color-community.jpg",
      trending: true,
      category: "Hair Styling",
      growth: "+189 this week"
    },
    {
      id: 3,
      name: "Lash Extension Pros",
      description: "Perfect application methods and client retention strategies",
      members: 6754,
      image: "/lovable-uploads/lash-community.jpg",
      trending: false,
      category: "Lash & Brow",
      growth: "+98 this week"
    },
    {
      id: 4,
      name: "Makeup Artists United",
      description: "Bridal, editorial, and everyday makeup artistry collective",
      members: 15632,
      image: "/lovable-uploads/makeup-community.jpg",
      trending: true,
      category: "Makeup",
      growth: "+312 this week"
    },
    {
      id: 5,
      name: "Salon Business Growth",
      description: "Marketing strategies, client management, and profit optimization",
      members: 4567,
      image: "/lovable-uploads/business-community.jpg",
      trending: false,
      category: "Business",
      growth: "+67 this week"
    },
    {
      id: 6,
      name: "Skincare Specialists",
      description: "Advanced treatments, product knowledge, and skin analysis",
      members: 9823,
      image: "/lovable-uploads/skincare-community.jpg",
      trending: true,
      category: "Skincare",
      growth: "+156 this week"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-playfair">
              Featured Communities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of beauty professionals sharing knowledge, growing their skills, 
              and building lasting connections in these thriving communities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredGroups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
              >
                <div className="relative h-48 bg-gradient-to-br from-purple-400 to-pink-400">
                  <div className="absolute inset-0 bg-black/20"></div>
                  {group.trending && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-red-500 text-white flex items-center gap-1">
                        <Flame className="h-3 w-3" />
                        Trending
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90 text-gray-800">
                      {group.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-2 font-playfair">
                      {group.name}
                    </h3>
                    <div className="flex items-center gap-2 text-white/90 text-sm">
                      <Users className="h-4 w-4" />
                      <span>{group.members.toLocaleString()} members</span>
                      <TrendingUp className="h-4 w-4 ml-2" />
                      <span>{group.growth}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {group.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">4.8 rating</span>
                    </div>
                    <Button 
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      Join Community
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-4 text-lg font-semibold"
            >
              Explore All Communities
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCommunities;
