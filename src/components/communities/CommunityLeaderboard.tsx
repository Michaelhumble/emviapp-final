
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Users, Star, Crown, Medal, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const CommunityLeaderboard = () => {
  const topCommunities = [
    {
      rank: 1,
      name: "Beauty Business Empire",
      members: 15634,
      growth: "+387 this week",
      category: "Business",
      image: "/lovable-uploads/bd8f013b-6b07-4709-858e-11495dc92392.png",
      badge: "Fastest Growing"
    },
    {
      rank: 2,
      name: "Elite Nail Artists Network",
      members: 12847,
      growth: "+247 this week",
      category: "Nail Art",
      image: "/lovable-uploads/c540558f-09db-483f-b844-bacb8824f789.png",
      badge: "Most Engaged"
    },
    {
      rank: 3,
      name: "Makeup Artistry Academy",
      members: 11247,
      growth: "+198 this week",
      category: "Makeup",
      image: "/lovable-uploads/4963d98c-613d-4a9a-99a4-7fa4b2e22717.png",
      badge: "Top Quality"
    }
  ];

  const topContributors = [
    {
      name: "Sarah Chen",
      title: "Nail Art Specialist",
      posts: 247,
      likes: 15634,
      communities: 5,
      avatar: "/lovable-uploads/583cdb14-9991-4d8f-8d00-711aa760fdeb.png",
      badge: "Super Contributor"
    },
    {
      name: "Maria Rodriguez",
      title: "Hair Color Expert",
      posts: 189,
      likes: 12847,
      communities: 3,
      avatar: "/lovable-uploads/4c2d8a4c-e191-40a0-8666-147cbcc488d4.png",
      badge: "Community Leader"
    },
    {
      name: "Jessica Kim",
      title: "Lash Technician",
      posts: 156,
      likes: 9234,
      communities: 4,
      avatar: "/lovable-uploads/94ea5644-26ac-4862-a6fc-b5b4c5c1fbb5.png",
      badge: "Rising Star"
    }
  ];

  const getRankIcon = (rank: number) => {
    switch(rank) {
      case 1: return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2: return <Medal className="h-6 w-6 text-gray-400" />;
      case 3: return <Award className="h-6 w-6 text-amber-600" />;
      default: return <Trophy className="h-6 w-6 text-gray-300" />;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-playfair">
              Community Leaderboards
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Celebrating the most active communities and top contributors who make our platform amazing
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Top Communities */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-8">
                <Trophy className="h-8 w-8 text-yellow-500" />
                <h3 className="text-2xl font-bold text-gray-900 font-playfair">
                  Top Communities
                </h3>
              </div>

              <div className="space-y-6">
                {topCommunities.map((community, index) => (
                  <motion.div
                    key={community.rank}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-4 p-4 rounded-xl ${
                      community.rank === 1 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200' :
                      community.rank === 2 ? 'bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-gray-200' :
                      'bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {getRankIcon(community.rank)}
                      <div className="text-2xl font-bold text-gray-700">
                        #{community.rank}
                      </div>
                    </div>

                    <img
                      src={community.image}
                      alt={community.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />

                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{community.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{community.members.toLocaleString()} members</span>
                        </div>
                        <div className="flex items-center gap-1 text-green-600">
                          <TrendingUp className="h-4 w-4" />
                          <span>{community.growth}</span>
                        </div>
                      </div>
                    </div>

                    <Badge className={
                      community.rank === 1 ? "bg-yellow-500 hover:bg-yellow-600" :
                      community.rank === 2 ? "bg-gray-500 hover:bg-gray-600" :
                      "bg-amber-500 hover:bg-amber-600"
                    }>
                      {community.badge}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Top Contributors */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-8">
                <Star className="h-8 w-8 text-purple-500" />
                <h3 className="text-2xl font-bold text-gray-900 font-playfair">
                  Top Contributors
                </h3>
              </div>

              <div className="space-y-6">
                {topContributors.map((contributor, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-4 p-4 rounded-xl ${
                      index === 0 ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200' :
                      index === 1 ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200' :
                      'bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {getRankIcon(index + 1)}
                      <div className="text-2xl font-bold text-gray-700">
                        #{index + 1}
                      </div>
                    </div>

                    <img
                      src={contributor.avatar}
                      alt={contributor.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{contributor.name}</h4>
                      <p className="text-sm text-gray-600 mb-1">{contributor.title}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{contributor.posts} posts</span>
                        <span>{contributor.likes.toLocaleString()} likes</span>
                        <span>{contributor.communities} communities</span>
                      </div>
                    </div>

                    <Badge className={
                      index === 0 ? "bg-purple-500 hover:bg-purple-600" :
                      index === 1 ? "bg-blue-500 hover:bg-blue-600" :
                      "bg-green-500 hover:bg-green-600"
                    }>
                      {contributor.badge}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityLeaderboard;
