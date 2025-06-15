
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Award, MessageSquare, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CommentsSection from './CommentsSection';

const AuthenticStories = () => {
  const stories = [
    {
      id: "story-1",
      name: "Sarah Chen",
      role: "Independent Nail Artist",
      location: "San Francisco, CA",
      image: "https://images.unsplash.com/photo-1494790108755-2616c27de617?q=80&w=1887&auto=format&fit=crop",
      story: "After 3 years working in salons, I finally took the leap to go independent. The EmviApp community guided me through every step - from setting up my LLC to finding my first clients. I went from $2,800/month to $8,500/month in just 6 months.",
      achievement: "3x Income Growth",
      timeAgo: "2 days ago",
      likes: 247,
      comments: 89,
      verified: true
    },
    {
      id: "story-2", 
      name: "Maria Rodriguez",
      role: "Salon Owner",
      location: "Austin, TX",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1900&auto=format&fit=crop",
      story: "Opening my salon felt impossible until I connected with other owners here. They shared everything - vendor contacts, staffing strategies, even their P&L breakdowns. Now we're booked solid 3 months out and I'm mentoring other new owners.",
      achievement: "Opened Dream Salon",
      timeAgo: "5 days ago",
      likes: 412,
      comments: 156,
      verified: true
    },
    {
      id: "story-3",
      name: "Jessica Williams", 
      role: "Hair Colorist",
      location: "Miami, FL",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop",
      story: "I was charging $80 for full highlights and barely surviving. The pricing guides and confidence coaching I found here changed everything. I raised my prices to $220 and my clients actually respect me more. Confidence is everything.",
      achievement: "Doubled Rates",
      timeAgo: "1 week ago", 
      likes: 324,
      comments: 203,
      verified: true
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white to-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-['Playfair_Display']">
              Real Stories, Real Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-['Inter']">
              These are the voices of our community - beauty professionals who've transformed 
              their careers with support, guidance, and genuine connections.
            </p>
          </div>

          <div className="space-y-12">
            {stories.map((story, index) => (
              <motion.article
                key={story.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Profile Section */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <img
                        src={story.image}
                        alt={story.name}
                        className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover shadow-lg"
                      />
                      {story.verified && (
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <Award className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1 font-['Inter']">
                          {story.name}
                        </h3>
                        <p className="text-purple-600 font-semibold mb-2 font-['Inter']">
                          {story.role}
                        </p>
                        <div className="flex items-center text-gray-500 text-sm font-['Inter']">
                          <MapPin className="h-4 w-4 mr-1" />
                          {story.location}
                          <span className="mx-2">•</span>
                          {story.timeAgo}
                        </div>
                      </div>
                      
                      <div className="mt-4 lg:mt-0">
                        <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-sm font-semibold">
                          <Award className="h-3 w-3 mr-1" />
                          {story.achievement}
                        </span>
                      </div>
                    </div>

                    <blockquote className="text-lg leading-relaxed text-gray-700 mb-6 font-['Inter'] italic">
                      "{story.story}"
                    </blockquote>

                    {/* Engagement Section */}
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                      <div className="flex items-center space-x-6">
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors group">
                          <Heart className="h-5 w-5 group-hover:fill-current" />
                          <span className="font-medium">{story.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                          <MessageSquare className="h-5 w-5" />
                          <span className="font-medium">{story.comments}</span>
                        </button>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-purple-200 text-purple-600 hover:bg-purple-50"
                      >
                        Connect
                      </Button>
                    </div>

                    {/* Comments Section */}
                    <div className="mt-6">
                      <CommentsSection storyId={story.id} />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold"
            >
              Share Your Success Story
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthenticStories;
