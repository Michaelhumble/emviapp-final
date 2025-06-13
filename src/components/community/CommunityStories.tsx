
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Heart, MessageCircle, Share2, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CommunityStories = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const stories = [
    {
      id: 1,
      author: "Maria Rodriguez",
      level: "Gold Artist",
      story: "Started with just a passion and a dream. Today, I have my own booth and loyal clients who became friends. EmviApp helped me showcase my work to the right people.",
      image: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/photos/generated(04).png",
      likes: 127,
      comments: 23,
      shares: 8,
      timeAgo: "2 hours ago",
      icon: "🏆"
    },
    {
      id: 2,
      author: "David Chen",
      level: "Master Stylist",
      story: "Every client teaches me something new. This transformation took 4 hours, but seeing her confidence shine made every minute worth it. We're not just doing hair, we're changing lives.",
      image: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/photos/generated(08).png",
      likes: 89,
      comments: 31,
      shares: 12,
      timeAgo: "5 hours ago",
      icon: "✨"
    },
    {
      id: 3,
      author: "Sophie Williams",
      level: "Rising Star",
      story: "Six months ago, I was nervous about every appointment. The community here lifted me up, shared techniques, and celebrated my growth. Now I'm booked solid and loving every day!",
      image: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/photos/generated(12).png",
      likes: 156,
      comments: 42,
      shares: 18,
      timeAgo: "1 day ago",
      icon: "🌟"
    }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-white to-purple-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Community Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Real stories from real professionals. Share your journey and inspire others.
          </p>

          {/* Share Your Story Card */}
          <Card className="max-w-2xl mx-auto mb-12 border-purple-200">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <h3 className="text-xl font-semibold text-gray-800">Share Your Inspiring Story</h3>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <textarea
                  placeholder="What's your story? Share a moment that made you proud, a lesson learned, or inspiration for fellow professionals..."
                  className="w-full p-4 border border-gray-200 rounded-lg resize-none h-24 focus:border-purple-300 focus:outline-none"
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer text-purple-600 hover:text-purple-700">
                      <Camera className="h-5 w-5" />
                      <span>Add Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </label>
                    {selectedFile && (
                      <span className="text-sm text-green-600">Photo selected</span>
                    )}
                  </div>
                  
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    <Upload className="h-4 w-4 mr-2" />
                    Share Story
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow border-purple-100">
                <div className="relative">
                  <img
                    src={story.image}
                    alt="Community story"
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-2xl">{story.icon}</span>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {story.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{story.author}</h4>
                      <Badge variant="outline" className="text-xs bg-purple-50 text-purple-600 border-purple-200">
                        {story.level}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {story.story}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                        <Heart className="h-4 w-4" />
                        <span>{story.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span>{story.comments}</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-green-500 transition-colors">
                        <Share2 className="h-4 w-4" />
                        <span>{story.shares}</span>
                      </button>
                    </div>
                    <span>{story.timeAgo}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityStories;
