
import React from 'react';
import { motion } from 'framer-motion';
import { Star, TrendingUp, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const SpotlightStories = () => {
  const stories = [
    {
      id: 1,
      title: "From Hobby to $100K: Maria's Nail Art Journey",
      excerpt: "How I transformed my passion for nail art into a six-figure business in just 18 months",
      author: "Maria Rodriguez",
      authorImage: "/lovable-uploads/4c2d8a4c-e191-40a0-8666-147cbcc488d4.png",
      coverImage: "/lovable-uploads/c540558f-09db-483f-b844-bacb8824f789.png",
      readTime: "8 min read",
      views: 15634,
      likes: 2847,
      community: "Business Growth",
      featured: true,
      timeAgo: "2 hours ago"
    },
    {
      id: 2,
      title: "The Color Theory That Changed My Career",
      excerpt: "Master the science behind perfect color matching and create stunning transformations",
      author: "Sarah Chen",
      authorImage: "/lovable-uploads/583cdb14-9991-4d8f-8d00-711aa760fdeb.png",
      coverImage: "/lovable-uploads/bd8f013b-6b07-4709-858e-11495dc92392.png",
      readTime: "12 min read",
      views: 12847,
      likes: 1956,
      community: "Hair Mastery",
      featured: false,
      timeAgo: "5 hours ago"
    },
    {
      id: 3,
      title: "Building Client Loyalty: The Secret Formula",
      excerpt: "The proven strategies that helped me build a waiting list of 500+ clients",
      author: "Jessica Kim",
      authorImage: "/lovable-uploads/94ea5644-26ac-4862-a6fc-b5b4c5c1fbb5.png",
      coverImage: "/lovable-uploads/4963d98c-613d-4a9a-99a4-7fa4b2e22717.png",
      readTime: "6 min read",
      views: 9234,
      likes: 1456,
      community: "Client Relations",
      featured: false,
      timeAgo: "1 day ago"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-playfair">
              Success Story Spotlight
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from real members who transformed their careers and lives through our communities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <motion.article
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group cursor-pointer ${
                  story.featured 
                    ? 'lg:col-span-2 lg:row-span-2' 
                    : ''
                }`}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                  {/* Featured Badge */}
                  {story.featured && (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                        <Star className="h-3 w-3 mr-1" />
                        Featured Story
                      </Badge>
                    </div>
                  )}

                  {/* Story Image */}
                  <div className={`relative overflow-hidden ${story.featured ? 'h-80' : 'h-48'}`}>
                    <img
                      src={story.coverImage}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    {/* Story Stats */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between text-white text-sm">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{story.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4" />
                            <span>{story.likes.toLocaleString()}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-white/20 border-white/30 text-white">
                          {story.community}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Story Content */}
                  <div className={`p-6 ${story.featured ? 'p-8' : ''}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={story.authorImage}
                        alt={story.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{story.author}</div>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{story.readTime}</span>
                          </div>
                          <span>•</span>
                          <span>{story.timeAgo}</span>
                        </div>
                      </div>
                    </div>

                    <h3 className={`font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors ${
                      story.featured ? 'text-2xl lg:text-3xl' : 'text-xl'
                    }`}>
                      {story.title}
                    </h3>
                    
                    <p className={`text-gray-600 mb-6 leading-relaxed ${
                      story.featured ? 'text-lg' : 'text-sm'
                    }`}>
                      {story.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <Button 
                        variant="outline" 
                        size={story.featured ? "default" : "sm"}
                        className="group-hover:bg-purple-600 group-hover:text-white transition-colors"
                      >
                        Read Full Story
                      </Button>
                      
                      <div className="flex items-center gap-2 text-gray-500">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Trending</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* View All Stories */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <Button size="lg" variant="outline" className="px-12">
              View All Success Stories
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SpotlightStories;
