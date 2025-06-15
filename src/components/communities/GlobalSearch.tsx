
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, TrendingUp, Users, Hash, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const GlobalSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All', count: '15.2K' },
    { id: 'communities', label: 'Communities', count: '2.8K' },
    { id: 'people', label: 'People', count: '47K' },
    { id: 'events', label: 'Events', count: '234' },
    { id: 'topics', label: 'Topics', count: '9.1K' }
  ];

  const trendingSearches = [
    { term: '#NailArtTrends2024', type: 'hashtag', searches: '15.2K' },
    { term: 'Hair Color Theory', type: 'topic', searches: '12.8K' },
    { term: 'Business Growth', type: 'topic', searches: '9.4K' },
    { term: 'Lash Extensions', type: 'topic', searches: '8.7K' },
    { term: '#BeautyEntrepreneur', type: 'hashtag', searches: '7.9K' },
    { term: 'Skincare Science', type: 'topic', searches: '6.5K' }
  ];

  const popularCommunities = [
    {
      name: "Elite Nail Artists Network",
      members: 12847,
      category: "Nail Art",
      location: "Global",
      image: "/lovable-uploads/c540558f-09db-483f-b844-bacb8824f789.png"
    },
    {
      name: "Beauty Business Empire",
      members: 15634,
      category: "Business",
      location: "Global", 
      image: "/lovable-uploads/bd8f013b-6b07-4709-858e-11495dc92392.png"
    },
    {
      name: "Hair Color Mastery",
      members: 9234,
      category: "Hair Styling",
      location: "North America",
      image: "/lovable-uploads/4c2d8a4c-e191-40a0-8666-147cbcc488d4.png"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-playfair">
              Discover Everything Beauty
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Search across communities, find experts, discover trending topics, and connect with professionals worldwide
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
              <Input
                placeholder="Search communities, people, events, topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-16 py-4 text-lg bg-white border-2 border-gray-200 focus:border-purple-500 rounded-2xl shadow-lg"
              />
              <Button 
                variant="ghost" 
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Filter className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                onClick={() => setActiveFilter(filter.id)}
                className={`${
                  activeFilter === filter.id 
                    ? "bg-purple-600 hover:bg-purple-700" 
                    : "hover:bg-purple-50"
                }`}
              >
                {filter.label}
                <Badge variant="secondary" className="ml-2">
                  {filter.count}
                </Badge>
              </Button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Trending Searches */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                  <h3 className="text-xl font-bold text-gray-900">Trending Now</h3>
                </div>

                <div className="space-y-3">
                  {trendingSearches.map((search, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center justify-between p-3 bg-white rounded-xl hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Hash className="h-4 w-4 text-purple-600" />
                        <div>
                          <div className="font-medium text-gray-900">{search.term}</div>
                          <div className="text-xs text-gray-500">{search.searches} searches</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {search.type}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Popular Communities */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2"
            >
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Popular Communities</h3>
                </div>

                <div className="space-y-4">
                  {popularCommunities.map((community, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <img
                        src={community.image}
                        alt={community.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">{community.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{community.members.toLocaleString()} members</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{community.location}</span>
                          </div>
                        </div>
                      </div>

                      <Badge variant="outline">{community.category}</Badge>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                    View All Communities
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalSearch;
