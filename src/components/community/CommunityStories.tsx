
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, Heart, MessageCircle, Share2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CommunityStories = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const stories = [
    {
      id: 1,
      author: "Maria S.",
      location: "Miami, FL",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1926&auto=format&fit=crop",
      title: "Transformation Tuesday",
      description: "From damaged to gorgeous! This color correction took 6 hours but seeing my client's smile made it all worth it.",
      likes: 234,
      comments: 45,
      shares: 12,
      timeAgo: "2 hours ago"
    },
    {
      id: 2,
      author: "David K.",
      location: "Los Angeles, CA",
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1926&auto=format&fit=crop",
      title: "Bridal Beauty Magic",
      description: "Today's bride wanted something timeless yet modern. The happiness in her eyes when she saw herself... priceless! ✨",
      likes: 189,
      comments: 32,
      shares: 8,
      timeAgo: "4 hours ago"
    },
    {
      id: 3,
      author: "Jessica L.",
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?q=80&w=1926&auto=format&fit=crop",
      title: "Bold & Beautiful",
      description: "Sometimes clients surprise you with their courage! This vibrant look perfectly matches her personality.",
      likes: 156,
      comments: 28,
      shares: 15,
      timeAgo: "6 hours ago"
    }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Community Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share your inspiring transformations and celebrate the artistry that brings joy to clients every day.
          </p>
        </div>

        {/* Upload Section */}
        <div className="max-w-md mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Share Your Story</h3>
            
            <div className="space-y-4">
              {selectedImage && (
                <div className="relative">
                  <img 
                    src={selectedImage} 
                    alt="Selected upload" 
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <button 
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              )}
              
              <div className="border-2 border-dashed border-purple-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <Camera className="mx-auto h-12 w-12 text-purple-400 mb-3" />
                  <p className="text-sm text-gray-600 mb-2">Upload your transformation photo</p>
                  <p className="text-xs text-gray-500">Photo uploads only • Max 5MB</p>
                </label>
              </div>
              
              <textarea
                placeholder="Tell us about this transformation..."
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows={3}
              />
              
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                <Upload className="h-4 w-4 mr-2" />
                Share Your Story
              </Button>
            </div>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Sparkles className="h-5 w-5 text-yellow-400" />
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {story.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{story.author}</p>
                    <p className="text-xs text-gray-500">{story.location}</p>
                  </div>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2">{story.title}</h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{story.description}</p>
                
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
                  <span className="text-xs">{story.timeAgo}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityStories;
