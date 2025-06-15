
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, Sparkles, TrendingUp, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Community {
  id: string;
  name: string;
  description: string;
  image: string;
  members: number;
  category: string;
  location?: string;
  isNew?: boolean;
  isTrending?: boolean;
  recentActivity: string;
}

const CommunityDiscovery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const communities: Community[] = [
    {
      id: '1',
      name: 'Nail Artists United',
      description: 'The largest community of nail artists sharing techniques, designs, and building their businesses.',
      image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=400&auto=format&fit=crop',
      members: 12847,
      category: 'Nails',
      location: 'Global',
      isTrending: true,
      recentActivity: '47 new posts today'
    },
    {
      id: '2',
      name: 'Makeup Masters NYC',
      description: 'Elite makeup artists in New York sharing gigs, techniques, and networking opportunities.',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=400&auto=format&fit=crop',
      members: 8934,
      category: 'Makeup',
      location: 'New York',
      recentActivity: '23 new members this week'
    },
    {
      id: '3',
      name: 'Salon Owners Hub',
      description: 'Business strategies, marketing tips, and success stories from successful salon owners.',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=400&auto=format&fit=crop',
      members: 5672,
      category: 'Business',
      isNew: true,
      recentActivity: 'Hot discussion on pricing strategies'
    },
    {
      id: '4',
      name: 'Hair Colorists Elite',
      description: 'Advanced color techniques, product reviews, and trend forecasting for professional colorists.',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=400&auto=format&fit=crop',
      members: 9876,
      category: 'Hair',
      isTrending: true,
      recentActivity: '127 photos shared today'
    },
    {
      id: '5',
      name: 'Lash Extension Pros',
      description: 'Master the art of lash extensions with tips from certified professionals worldwide.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400&auto=format&fit=crop',
      members: 6543,
      category: 'Lashes',
      recentActivity: 'New technique tutorial posted'
    },
    {
      id: '6',
      name: 'Beauty Entrepreneurs',
      description: 'From side hustle to empire - build your beauty business with fellow entrepreneurs.',
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=400&auto=format&fit=crop',
      members: 11234,
      category: 'Business',
      isNew: true,
      recentActivity: 'Success story: $10K month!'
    }
  ];

  const categories = ['All', 'Nails', 'Makeup', 'Hair', 'Lashes', 'Business'];

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || community.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-20 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Discover Your
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {" "}Perfect Community
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Join specialized groups of beauty professionals who share your passion and ambition
          </motion.p>
        </div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search communities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
            <Button variant="outline" className="h-12 px-6">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer px-4 py-2 text-sm transition-all duration-200 ${
                  selectedCategory === category 
                    ? 'bg-purple-600 text-white' 
                    : 'hover:bg-purple-100'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCommunities.map((community, index) => (
            <motion.div
              key={community.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                {/* Image Header */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={community.image} 
                    alt={community.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {community.isTrending && (
                      <Badge className="bg-red-500 text-white">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        Trending
                      </Badge>
                    )}
                    {community.isNew && (
                      <Badge className="bg-green-500 text-white">
                        <Sparkles className="mr-1 h-3 w-3" />
                        New
                      </Badge>
                    )}
                  </div>

                  {/* Member Count */}
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-gray-900">
                      {community.members.toLocaleString()} members
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{community.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {community.category}
                    </Badge>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {community.description}
                  </p>

                  {/* Location & Activity */}
                  <div className="space-y-2 mb-6">
                    {community.location && (
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="mr-1 h-4 w-4" />
                        {community.location}
                      </div>
                    )}
                    <div className="text-sm text-green-600 font-medium">
                      🔥 {community.recentActivity}
                    </div>
                  </div>

                  {/* Join Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle join logic
                    }}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Join Community
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Create Community CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Don't see your niche?</h3>
            <p className="text-lg mb-6 opacity-90">
              Create your own community and become a leader in your specialty
            </p>
            <Button 
              size="lg"
              variant="secondary"
              className="bg-white text-purple-600 hover:bg-gray-100"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Start Your Community
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityDiscovery;
