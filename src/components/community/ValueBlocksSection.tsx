
import React from "react";
import { motion } from "framer-motion";
import { Brain, Download, HelpCircle, Sparkles, BookOpen, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const ValueBlocksSection = () => {
  const aiTips = [
    {
      title: "Double Your Bookings This Month",
      description: "AI-analyzed strategies from top performers",
      category: "Growth",
      readTime: "3 min"
    },
    {
      title: "Perfect Instagram Captions",
      description: "Templates that convert followers to clients",
      category: "Marketing",
      readTime: "2 min"
    },
    {
      title: "Pricing Psychology Secrets",
      description: "Science-backed pricing strategies",
      category: "Business",
      readTime: "4 min"
    }
  ];

  const freeResources = [
    {
      title: "Salon Marketing Kit",
      description: "Complete guide + templates",
      downloads: "2.3K",
      icon: <BookOpen className="h-6 w-6" />
    },
    {
      title: "Client Consultation Scripts",
      description: "Proven conversation starters",
      downloads: "1.8K",
      icon: <MessageSquare className="h-6 w-6" />
    },
    {
      title: "Negotiation Templates",
      description: "Get paid what you're worth",
      downloads: "3.1K",
      icon: <Sparkles className="h-6 w-6" />
    }
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
            Get Smarter, Faster—AI Curates the Best for You
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Exclusive insights, tools, and resources that help you succeed—all powered by AI and community wisdom
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* AI-Powered Tips Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">AI-Powered Tips</h3>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                Updated Daily
              </span>
            </div>

            <div className="space-y-4">
              {aiTips.map((tip, index) => (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border border-purple-100"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {tip.category}
                    </span>
                    <span className="text-sm text-gray-500">{tip.readTime}</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{tip.title}</h4>
                  <p className="text-gray-600 mb-4">{tip.description}</p>
                  <Button variant="outline" size="sm" className="text-purple-600 border-purple-600 hover:bg-purple-50">
                    Read Now
                  </Button>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700">
                <Brain className="mr-2 h-5 w-5" />
                Get My Personal AI Tips
              </Button>
            </div>
          </motion.div>

          {/* Free Resources */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-3 rounded-full">
                <Download className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Free Resources</h3>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                For All Members
              </span>
            </div>

            <div className="space-y-4">
              {freeResources.map((resource, index) => (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border border-blue-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      {resource.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{resource.title}</h4>
                      <p className="text-gray-600 mb-3">{resource.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {resource.downloads} downloads
                        </span>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          <Download className="mr-2 h-4 w-4" />
                          Download Free
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Ask Anything Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200"
            >
              <div className="text-center">
                <div className="bg-white p-3 rounded-full w-fit mx-auto mb-4">
                  <HelpCircle className="h-8 w-8 text-orange-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Community "Ask Anything"</h4>
                <p className="text-gray-600 mb-4">
                  Real experts, pros, and supportive members respond in minutes
                </p>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mb-4">
                  <span>• Avg. response: 4 minutes</span>
                  <span>• 98% helpful answers</span>
                </div>
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                  Ask Your Question
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ValueBlocksSection;
