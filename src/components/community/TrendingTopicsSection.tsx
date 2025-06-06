
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, MessageSquare, Vote, Eye, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const TrendingTopicsSection = () => {
  const [currentPoll, setCurrentPoll] = useState({
    question: "What feature should we build next?",
    options: [
      { text: "AI Portfolio Optimizer", votes: 342, percentage: 45 },
      { text: "Virtual Try-On Tool", votes: 267, percentage: 35 },
      { text: "Group Video Consultations", votes: 152, percentage: 20 }
    ],
    totalVotes: 761
  });

  const trendingTopics = [
    { title: "AI Marketing Tips", posts: 89, icon: "🤖", trend: "+15%" },
    { title: "Hot Industry News", posts: 156, icon: "🔥", trend: "+23%" },
    { title: "Nail Art Battles", posts: 234, icon: "💅", trend: "+67%" },
    { title: "Success Stories", posts: 78, icon: "⭐", trend: "+12%" },
    { title: "Salon Management", posts: 145, icon: "🏢", trend: "+8%" },
    { title: "Customer Care Tips", posts: 92, icon: "💝", trend: "+19%" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">
            What's Trending Right Now
          </h2>
          <div className="flex items-center justify-center gap-8 text-lg text-gray-600">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-purple-600" />
              <span>4,900+ posts today</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>1,200 new replies</span>
            </div>
            <div className="flex items-center gap-2">
              <Vote className="h-5 w-5 text-blue-600" />
              <span>300 features suggested</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Trending Topics Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">🔥 Trending Topics</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {trendingTopics.map((topic, index) => (
                <motion.div
                  key={topic.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border border-purple-100"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{topic.icon}</span>
                    <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                      <TrendingUp className="h-4 w-4" />
                      {topic.trend}
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{topic.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Eye className="h-4 w-4" />
                    <span>{topic.posts} posts</span>
                    <Clock className="h-4 w-4 ml-2" />
                    <span>Active now</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Live Poll Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                🗳️ Vote for Next Feature
              </h3>
              <p className="text-gray-600">Your voice shapes our roadmap</p>
            </div>

            <div className="space-y-4 mb-6">
              <h4 className="text-lg font-semibold text-gray-900">{currentPoll.question}</h4>
              
              {currentPoll.options.map((option, index) => (
                <motion.div
                  key={option.text}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg p-4 cursor-pointer hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{option.text}</span>
                    <span className="text-sm font-bold text-purple-600">{option.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${option.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                    ></motion.div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{option.votes} votes</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                {currentPoll.totalVotes.toLocaleString()} total votes • Poll ends in 2 days
              </p>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700">
                Cast Your Vote
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrendingTopicsSection;
