
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CreateCommunityModal from './CreateCommunityModal';

const CreateDiscoverSection = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    'All', 'Nail Art', 'Hair Styling', 'Makeup', 'Skincare', 'Lash & Brow', 'Business Tips'
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Create Community CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
              Start Your Own Community
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Have something unique to share? Create your own community and become a leader in your field
            </p>
            
            <Button 
              onClick={() => setShowCreateModal(true)}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold shadow-lg"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create Community
            </Button>
          </motion.div>

          {/* Discovery Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-3xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 font-playfair">
                Discover Communities
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TrendingUp className="h-4 w-4" />
                <span>2,847 active communities</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search communities, topics, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg bg-white border-2 border-gray-200 focus:border-purple-500 rounded-xl"
              />
              <Button 
                variant="ghost" 
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category, index) => (
                <Button
                  key={category}
                  variant={index === 0 ? "default" : "outline"}
                  size="sm"
                  className={index === 0 ? "bg-purple-600 hover:bg-purple-700" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="text-2xl font-bold text-purple-600 mb-1">847</div>
                <div className="text-sm text-gray-600">Trending Today</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="text-2xl font-bold text-blue-600 mb-1">234</div>
                <div className="text-sm text-gray-600">New This Week</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="text-2xl font-bold text-green-600 mb-1">1.2K</div>
                <div className="text-sm text-gray-600">Most Active</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="text-2xl font-bold text-pink-600 mb-1">567</div>
                <div className="text-sm text-gray-600">Near You</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <CreateCommunityModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
      />
    </section>
  );
};

export default CreateDiscoverSection;
