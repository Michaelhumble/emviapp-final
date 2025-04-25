
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const marketPosts = [
  {
    id: 1,
    content: "Looking for a nail tech ASAP! DM me.",
    location: "Los Angeles, CA",
    timeAgo: "2 days ago"
  },
  {
    id: 2,
    content: "Booth rental available — serious inquiries only.",
    location: "Miami, FL",
    timeAgo: "5 days ago"
  },
  {
    id: 3,
    content: "Need a stylist this weekend! No-shows again...",
    location: "New York, NY",
    timeAgo: "1 day ago"
  },
  {
    id: 4,
    content: "Hiring lash tech. Clients waiting!",
    location: "Chicago, IL",
    timeAgo: "3 days ago"
  },
  {
    id: 5,
    content: "Open chair at Salon Luxe. Where's the talent?",
    location: "San Francisco, CA",
    timeAgo: "4 days ago"
  },
  {
    id: 6,
    content: "Client canceled last minute. Fill this spot?",
    location: "Houston, TX",
    timeAgo: "6 hours ago"
  }
];

const MarketProofSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#F8F7FF]">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-emvi-dark">
            Why EmviApp Exists
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Real posts. Real problems. One solution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {marketPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: post.id * 0.1 }}
              className="relative bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="absolute top-3 right-3">
                <span className="inline-block px-2 py-1 text-xs font-medium text-gray-400 bg-gray-50 rounded-full border border-gray-100">
                  Expired
                </span>
              </div>
              <p className="text-lg font-medium text-emvi-dark mb-4 font-playfair">
                {post.content}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{post.location}</span>
                <span>{post.timeAgo}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-center"
        >
          <h3 className="text-xl md:text-2xl font-playfair text-emvi-dark mb-6">
            Tired of missing opportunities like these?
            <span className="block mt-2 text-lg text-gray-600">
              Join EmviApp — where jobs and clients find you.
            </span>
          </h3>
          <Link to="/early-access">
            <Button 
              size="lg"
              className="bg-emvi-accent hover:bg-emvi-accent/90 text-white font-medium px-8 py-6 text-base rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              Get Early Access
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketProofSection;
