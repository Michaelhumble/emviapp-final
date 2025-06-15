
import React from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, TrendingUp, Star, Crown, Fire } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const FeaturedCommunities = () => {
  const communities = [
    {
      id: 1,
      name: "Elite Nail Artists Network",
      description: "Premium techniques, advanced tutorials, and industry secrets from top professionals",
      members: 12847,
      posts: 2847,
      image: "/lovable-uploads/c540558f-09db-483f-b844-bacb8824f789.png",
      category: "Nail Art",
      isFeatured: true,
      isHot: true,
      badges: ["Expert Level", "Verified Pros"],
      growth: "+247 this week"
    },
    {
      id: 2,
      name: "Hair Color Mastery",
      description: "Master the art of color theory, balayage techniques, and corrective color",
      members: 9234,
      posts: 1847,
      image: "/lovable-uploads/4c2d8a4c-e191-40a0-8666-147cbcc488d4.png",
      category: "Hair Styling",
      isFeatured: true,
      isHot: false,
      badges: ["Color Certified", "Weekly Challenges"],
      growth: "+189 this week"
    },
    {
      id: 3,
      name: "Lash Extension Pros",
      description: "Professional lash techniques, safety protocols, and business growth strategies",
      members: 8956,
      posts: 1567,
      image: "/lovable-uploads/583cdb14-9991-4d8f-8d00-711aa760fdeb.png",
      category: "Lash & Brow",
      isFeatured: false,
      isHot: true,
      badges: ["Safety First", "Business Tips"],
      growth: "+156 this week"
    },
    {
      id: 4,
      name: "Beauty Business Empire",
      description: "Scale your beauty business, marketing strategies, and financial freedom",
      members: 15634,
      posts: 3247,
      image: "/lovable-uploads/bd8f013b-6b07-4709-858e-11495dc92392.png",
      category: "Business",
      isFeatured: true,
      isHot: true,
      badges: ["Million Dollar Tips", "Success Stories"],
      growth: "+387 this week"
    },
    {
      id: 5,
      name: "Makeup Artistry Academy",
      description: "From basics to editorial looks, master every makeup technique",
      members: 11247,
      posts: 2134,
      image: "/lovable-uploads/4963d98c-613d-4a9a-99a4-7fa4b2e22717.png",
      category: "Makeup",
      isFeatured: false,
      isHot: false,
      badges: ["All Levels", "Portfolio Building"],
      growth: "+98 this week"
    },
    {
      id: 6,
      name: "Skincare Science Hub",
      description: "Evidence-based skincare, ingredient education, and treatment protocols",
      members: 7891,
      posts: 1456,
      image: "/lovable-uploads/94ea5644-26ac-4862-a6fc-b5b4c5c1fbb5.png",
      category: "Skincare",
      isFeatured: false,
      isHot: false,
      badges: ["Science Based", "Licensed Estheticians"],
      growth: "+67 this week"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-playfair">
              Featured Communities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join the most active and successful beauty communities where professionals share, learn, and grow together
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communities.map((community, index) => (
              <motion.div
                key={community.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                {/* Featured Badge */}
                {community.isFeatured && (
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                      <Crown className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}

                {/* Hot Badge */}
                {community.isHot && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
                      <Fire className="h-3 w-3 mr-1" />
                      Hot
                    </Badge>
                  </div>
                )}

                {/* Community Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={community.image}
                    alt={community.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Quick Stats Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{community.members.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{community.posts.toLocaleString()}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-white/20 border-white/30 text-white">
                        {community.category}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Community Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {community.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {community.description}
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {community.badges.map((badge, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>

                  {/* Growth Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-green-600 text-sm">
                      <TrendingUp className="h-4 w-4" />
                      <span>{community.growth}</span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Join Button */}
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                    Join Community
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <Button variant="outline" size="lg" className="px-12">
              Load More Communities
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCommunities;
