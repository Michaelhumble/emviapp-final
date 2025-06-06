
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, User, Sparkles } from "lucide-react";

const CommunityWallOfThanks = () => {
  const thanksPosts = [
    {
      id: 1,
      from: "Sarah M.",
      to: "Jessica K.",
      message: "Thank you for the amazing nail art tutorial! My clients love the new designs 💕",
      likes: 24,
      avatar: "SM"
    },
    {
      id: 2,
      from: "Mike D.",
      to: "Community",
      message: "This community helped me double my bookings in 2 months. Forever grateful!",
      likes: 67,
      avatar: "MD"
    },
    {
      id: 3,
      from: "Luna P.",
      to: "Alex R.",
      message: "Your color theory class changed my whole approach. Thank you for sharing!",
      likes: 43,
      avatar: "LP"
    },
    {
      id: 4,
      from: "Carlos V.",
      to: "EmviApp Team",
      message: "Best platform for beauty pros. The AI features are game-changing!",
      likes: 89,
      avatar: "CV"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">
            Wall of Thanks
            <span className="text-purple-600"> ✨</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real appreciation from our amazing community members
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {thanksPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-white/80 backdrop-blur-md border-purple-100 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm">
                      {post.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold text-gray-900">{post.from}</span>
                        <span className="text-gray-500">→</span>
                        <span className="text-purple-600 font-medium">{post.to}</span>
                      </div>
                      <p className="text-gray-700 mb-3">{post.message}</p>
                      <div className="flex items-center space-x-2">
                        <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                        <span className="text-sm text-gray-500">{post.likes} loves</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-8 border border-purple-100">
            <Sparkles className="h-8 w-8 text-purple-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Share Your Thanks</h3>
            <p className="text-gray-600 mb-6">Spread the love and appreciation in our community</p>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300">
              Post a Thank You
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityWallOfThanks;
