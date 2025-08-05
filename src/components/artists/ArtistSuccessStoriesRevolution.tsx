import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Users, Star, Calendar, Crown } from "lucide-react";

const ArtistSuccessStoriesRevolution = () => {
  const artistStories = [
    {
      name: "Sofia Chen",
      specialty: "AI-Powered Nail Artist",
      location: "San Francisco, CA",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      story: "I went from struggling to find clients to having a 3-month waitlist. The AI discovery engine connects me with premium clients who truly value artistry.",
      results: {
        before: "$2,800/month",
        after: "$47,000/month",
        timeframe: "8 months",
        growth: "+1,578%"
      },
      badge: "AI PIONEER",
      category: "artist"
    },
    {
      name: "David Kim", 
      specialty: "Hair Revolution Expert",
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      story: "The platform's AI matching system eliminated time-wasters. Now I only work with clients who appreciate premium services and pay accordingly.",
      results: {
        before: "$4,200/month",
        after: "$38,500/month", 
        timeframe: "6 months",
        growth: "+817%"
      },
      badge: "TOP PERFORMER",
      category: "artist"
    }
  ];

  const customerStories = [
    {
      name: "Jennifer Martinez",
      type: "Premium Client",
      location: "Los Angeles, CA", 
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      story: "EmviApp's AI found me artists I never would have discovered. Every booking has been absolutely perfect - worth every penny.",
      experience: "Booked 47 premium services",
      satisfaction: "100% satisfaction rate",
      badge: "VIP CLIENT",
      category: "customer"
    },
    {
      name: "Sarah Thompson",
      type: "Regular Customer", 
      location: "Miami, FL",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      story: "The AI matching is incredible. It learns my preferences and consistently connects me with artists who exceed my expectations.",
      experience: "32 successful bookings",
      satisfaction: "4.9/5 average experience",
      badge: "TRUSTED CLIENT",
      category: "customer"
    }
  ];

  const vietnameseStory = {
    name: "Minh Anh Nguyen",
    salon: "Minh Anh Nail Spa",
    location: "Westminster, CA (Little Saigon)",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&crop=face",
    story: "Từ khi dùng AI của EmviApp, tiệm tôi đã thay đổi hoàn toàn. Khách booking tự động, doanh thu tăng gấp 4 lần, và quan trọng nhất là có thời gian nghỉ ngơi.",
    results: {
      before: "$6,500/month",
      after: "$31,000/month", 
      timeframe: "10 tháng",
      growth: "+377%"
    },
    metrics: {
      clients: "450+ khách quen",
      rating: "4.97/5 đánh giá",
      bookings: "98% tự động"
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-purple-900">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Real Artists, Real Results
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              AI Success Stories
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            These aren't just testimonials—they're verified transformations from our AI-powered platform
          </p>
        </motion.div>

        {/* Artist Success Stories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">
              🎨 What Artists Say
            </h3>
            {artistStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-sm border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <img
                        src={story.image}
                        alt={story.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-purple-400/50"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-bold text-white text-lg">{story.name}</h4>
                          <Badge className="bg-gradient-to-r from-purple-400 to-pink-500 text-white border-0 text-xs font-bold">
                            {story.badge}
                          </Badge>
                        </div>
                        <p className="text-purple-200 text-sm">{story.specialty}</p>
                        <p className="text-purple-300 text-xs">{story.location}</p>
                      </div>
                    </div>
                    
                    <p className="text-purple-100 italic mb-6 leading-relaxed">
                      "{story.story}"
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                        <p className="text-red-400 text-sm font-semibold">Before:</p>
                        <p className="text-white font-bold">{story.results.before}</p>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                        <p className="text-green-400 text-sm font-semibold">After ({story.results.timeframe}):</p>
                        <p className="text-white font-bold">{story.results.after}</p>
                      </div>
                    </div>
                    
                    <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mt-4 text-center">
                      <p className="text-green-400 font-bold text-lg">
                        🚀 {story.results.growth} Growth
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Customer Success Stories */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">
              💎 What Customers Say
            </h3>
            {customerStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 backdrop-blur-sm border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <img
                        src={story.image}
                        alt={story.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-blue-400/50"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-bold text-white text-lg">{story.name}</h4>
                          <Badge className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white border-0 text-xs font-bold">
                            {story.badge}
                          </Badge>
                        </div>
                        <p className="text-blue-200 text-sm">{story.type}</p>
                        <p className="text-blue-300 text-xs">{story.location}</p>
                      </div>
                    </div>
                    
                    <p className="text-blue-100 italic mb-6 leading-relaxed">
                      "{story.story}"
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center bg-white/10 rounded-lg p-3 border border-white/20">
                        <span className="text-blue-200">Experience:</span>
                        <span className="text-blue-400 font-semibold">{story.experience}</span>
                      </div>
                      <div className="flex justify-between items-center bg-white/10 rounded-lg p-3 border border-white/20">
                        <span className="text-blue-200">Satisfaction:</span>
                        <span className="text-yellow-400 font-semibold">{story.satisfaction}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vietnamese Success Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-pink-900/40 to-red-900/40 backdrop-blur-sm border border-pink-500/30 rounded-3xl p-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-4xl font-black text-white mb-4">
              🇻🇳 Câu Chuyện Từ Cộng Đồng Nail Việt Nam
            </h3>
            <Badge className="bg-gradient-to-r from-red-400 to-pink-500 text-white border-0 font-bold px-6 py-3 text-lg">
              VERIFIED SUCCESS STORY
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-4 mb-6">
                <img
                  src={vietnameseStory.image}
                  alt={vietnameseStory.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-pink-400/50"
                />
                <div>
                  <h4 className="font-bold text-white text-2xl">{vietnameseStory.name}</h4>
                  <p className="text-pink-200">{vietnameseStory.salon}</p>
                  <p className="text-pink-300 text-sm">{vietnameseStory.location}</p>
                </div>
              </div>
              
              <p className="text-pink-100 italic text-lg mb-6 leading-relaxed">
                "{vietnameseStory.story}"
              </p>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                  <p className="text-pink-300 text-sm">Khách hàng</p>
                  <p className="text-white font-bold">{vietnameseStory.metrics.clients}</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                  <p className="text-pink-300 text-sm">Đánh giá</p>
                  <p className="text-yellow-400 font-bold">{vietnameseStory.metrics.rating}</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                  <p className="text-pink-300 text-sm">Tự động hóa</p>
                  <p className="text-green-400 font-bold">{vietnameseStory.metrics.bookings}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-900/50 border border-red-500/30 rounded-xl p-6 text-center">
                  <p className="text-red-300 text-sm font-semibold mb-2">Trước đây:</p>
                  <p className="text-white font-bold text-2xl">{vietnameseStory.results.before}</p>
                </div>
                <div className="bg-green-900/50 border border-green-500/30 rounded-xl p-6 text-center">
                  <p className="text-green-300 text-sm font-semibold mb-2">Hiện tại ({vietnameseStory.results.timeframe}):</p>
                  <p className="text-white font-bold text-2xl">{vietnameseStory.results.after}</p>
                </div>
              </div>
              
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-6 text-center">
                <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-yellow-400 font-bold text-2xl">
                  {vietnameseStory.results.growth} Tăng Trưởng
                </p>
                <p className="text-yellow-200 text-sm mt-2">
                  Chỉ trong {vietnameseStory.results.timeframe} với AI của EmviApp
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default ArtistSuccessStoriesRevolution;