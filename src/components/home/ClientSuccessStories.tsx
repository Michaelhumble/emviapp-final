
import React from 'react';
import { Star, Users, TrendingUp } from 'lucide-react';

const ClientSuccessStories = () => {
  const stories = [
    {
      id: 1,
      name: "Maria's Nail Studio",
      type: "Salon Owner",
      story: "EmviApp helped me find 3 amazing nail technicians in just 2 weeks. My booking rate increased by 40%!",
      rating: 5,
      growth: "+40% bookings"
    },
    {
      id: 2,
      name: "David Chen",
      type: "Nail Artist",
      story: "I found my dream salon job through EmviApp. The AI matching was perfect - they knew exactly what I was looking for.",
      rating: 5,
      growth: "Dream job found"
    },
    {
      id: 3,
      name: "Beauty Lounge LA",
      type: "Salon Chain",
      story: "We've hired 12 artists through EmviApp this year. The quality of candidates is exceptional.",
      rating: 5,
      growth: "+12 hires"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            Real Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how EmviApp is transforming careers and businesses in the beauty industry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {stories.map((story) => (
            <div key={story.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(story.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">{story.type}</span>
              </div>
              
              <blockquote className="text-gray-700 mb-4 italic">
                "{story.story}"
              </blockquote>
              
              <div className="flex items-center justify-between">
                <div className="font-semibold text-gray-900">{story.name}</div>
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {story.growth}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-purple-100 rounded-full px-6 py-3">
            <Users className="w-5 h-5 text-purple-600 mr-2" />
            <span className="text-purple-800 font-medium">Join 10,000+ beauty professionals already using EmviApp</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientSuccessStories;
