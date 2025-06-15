
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, TrendingUp, Heart, MessageCircle, Users, Star, Award, Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  role: string;
  community: string;
  points: number;
  badge: string;
  stats: {
    posts: number;
    likes: number;
    comments: number;
    helps: number;
  };
  isVerified: boolean;
  growth: number; // percentage
}

const Leaderboards = () => {
  const [activeTab, setActiveTab] = useState('top-contributors');

  const topContributors: LeaderboardEntry[] = [
    {
      rank: 1,
      name: 'Maria Santos',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c11c?q=80&w=100&auto=format&fit=crop',
      role: 'Master Nail Artist',
      community: 'Nail Artists United',
      points: 15847,
      badge: 'Community Champion',
      stats: { posts: 247, likes: 12847, comments: 3254, helps: 189 },
      isVerified: true,
      growth: 23
    },
    {
      rank: 2,
      name: 'Alex Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop',
      role: 'Color Specialist',
      community: 'Hair Colorists Elite',
      points: 14532,
      badge: 'Master Helper',
      stats: { posts: 198, likes: 9876, comments: 2847, helps: 234 },
      isVerified: true,
      growth: 18
    },
    {
      rank: 3,
      name: 'Sophia Kim',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
      role: 'Makeup Artist',
      community: 'Makeup Masters NYC',
      points: 12943,
      badge: 'Rising Star',
      stats: { posts: 156, likes: 8745, comments: 1987, helps: 145 },
      isVerified: true,
      growth: 34
    },
    {
      rank: 4,
      name: 'Jessica Chen',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop',
      role: 'Salon Owner',
      community: 'Salon Owners Hub',
      points: 11287,
      badge: 'Business Mentor',
      stats: { posts: 134, likes: 7234, comments: 1654, helps: 198 },
      isVerified: true,
      growth: 15
    },
    {
      rank: 5,
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=100&auto=format&fit=crop',
      role: 'Lash Artist',
      community: 'Lash Extension Pros',
      points: 10654,
      badge: 'Technique Expert',
      stats: { posts: 123, likes: 6789, comments: 1456, helps: 167 },
      isVerified: false,
      growth: 28
    }
  ];

  const badges = [
    { name: 'Community Champion', icon: Crown, color: 'text-yellow-500', description: 'Top contributor overall' },
    { name: 'Master Helper', icon: Heart, color: 'text-red-500', description: 'Most helpful responses' },
    { name: 'Rising Star', icon: Star, color: 'text-purple-500', description: 'Fastest growing member' },
    { name: 'Business Mentor', icon: TrendingUp, color: 'text-green-500', description: 'Business advice expert' },
    { name: 'Technique Expert', icon: Award, color: 'text-blue-500', description: 'Technical skill master' }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Award className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Trophy className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getBadgeIcon = (badgeName: string) => {
    const badge = badges.find(b => b.name === badgeName);
    if (!badge) return <Star className="h-4 w-4" />;
    const Icon = badge.icon;
    return <Icon className={`h-4 w-4 ${badge.color}`} />;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Community
            <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
              {" "}Champions
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-purple-100 max-w-3xl mx-auto"
          >
            Celebrating the members who inspire, help, and build our amazing community
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: 'top-contributors', label: 'Top Contributors', icon: Crown },
              { id: 'most-helpful', label: 'Most Helpful', icon: Heart },
              { id: 'rising-stars', label: 'Rising Stars', icon: TrendingUp },
              { id: 'monthly-mvp', label: 'Monthly MVPs', icon: Award }
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'outline'}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-yellow-400 to-pink-500 text-black' 
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Leaderboard */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Top 3 Podium */}
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">Top Contributors This Month</h3>
                
                {/* Podium Visual */}
                <div className="flex items-end justify-center gap-4 mb-8">
                  {[topContributors[1], topContributors[0], topContributors[2]].map((contributor, index) => {
                    const actualRank = contributor.rank;
                    const podiumHeight = actualRank === 1 ? 'h-32' : actualRank === 2 ? 'h-24' : 'h-20';
                    
                    return (
                      <motion.div
                        key={contributor.name}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="text-center"
                      >
                        <img
                          src={contributor.avatar}
                          alt={contributor.name}
                          className={`w-16 h-16 rounded-full object-cover mx-auto mb-4 border-4 ${
                            actualRank === 1 ? 'border-yellow-400' : 
                            actualRank === 2 ? 'border-gray-400' : 'border-amber-600'
                          }`}
                        />
                        <div className={`${podiumHeight} w-20 mx-auto rounded-t-lg ${
                          actualRank === 1 ? 'bg-gradient-to-t from-yellow-600 to-yellow-400' :
                          actualRank === 2 ? 'bg-gradient-to-t from-gray-600 to-gray-400' :
                          'bg-gradient-to-t from-amber-700 to-amber-600'
                        } flex items-center justify-center`}>
                          {getRankIcon(actualRank)}
                        </div>
                        <p className="text-white font-semibold mt-2">{contributor.name}</p>
                        <p className="text-purple-200 text-sm">{contributor.points.toLocaleString()} pts</p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Full Rankings */}
                <div className="space-y-4">
                  {topContributors.map((contributor, index) => (
                    <motion.div
                      key={contributor.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center justify-center w-12">
                        {getRankIcon(contributor.rank)}
                      </div>
                      
                      <img
                        src={contributor.avatar}
                        alt={contributor.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-white font-semibold">{contributor.name}</h4>
                          {contributor.isVerified && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                          <Badge className="bg-white/20 text-white border-0 text-xs">
                            {getBadgeIcon(contributor.badge)}
                            <span className="ml-1">{contributor.badge}</span>
                          </Badge>
                        </div>
                        <p className="text-purple-200 text-sm">
                          {contributor.role} • {contributor.community}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-white font-bold text-lg">
                          {contributor.points.toLocaleString()}
                        </div>
                        <div className="text-green-400 text-sm flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +{contributor.growth}%
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats & Badges */}
            <div className="space-y-6">
              {/* Achievement Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20"
              >
                <h3 className="text-xl font-bold text-white mb-6">Achievement Badges</h3>
                <div className="space-y-4">
                  {badges.map((badge, index) => (
                    <div key={badge.name} className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center`}>
                        <badge.icon className={`h-5 w-5 ${badge.color}`} />
                      </div>
                      <div>
                        <p className="text-white font-medium">{badge.name}</p>
                        <p className="text-purple-200 text-sm">{badge.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Community Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20"
              >
                <h3 className="text-xl font-bold text-white mb-6">This Month's Impact</h3>
                <div className="space-y-4">
                  {[
                    { label: 'New Posts', value: '2,847', icon: MessageCircle, color: 'text-blue-400' },
                    { label: 'Helpful Answers', value: '1,234', icon: Heart, color: 'text-red-400' },
                    { label: 'New Members', value: '567', icon: Users, color: 'text-green-400' },
                    { label: 'Success Stories', value: '89', icon: Star, color: 'text-yellow-400' }
                  ].map((stat, index) => (
                    <div key={stat.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                        <span className="text-purple-200">{stat.label}</span>
                      </div>
                      <span className="text-white font-bold">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Join Competition CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-yellow-400 to-pink-500 rounded-3xl p-6 text-center"
              >
                <Trophy className="h-12 w-12 text-black mx-auto mb-4" />
                <h3 className="text-xl font-bold text-black mb-2">Join the Rankings!</h3>
                <p className="text-black/80 mb-4">
                  Share your knowledge, help others, and climb the leaderboard
                </p>
                <Button className="bg-black text-white hover:bg-gray-800">
                  Start Contributing
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leaderboards;
