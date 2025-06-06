
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const successStories = [
  {
    id: 1,
    name: "Isabella Rodriguez",
    specialty: "Nail Artist",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    quote: "I tripled my income and finally feel respected for my art.",
    achievement: "VIP Artist",
    earnings: "$4,200/month",
    rating: 4.9,
    portfolio: ["https://images.unsplash.com/photo-1604654894610-df63bc536371?w=150&h=150&fit=crop", "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=150&h=150&fit=crop"]
  },
  {
    id: 2,
    name: "Marcus Johnson",
    specialty: "Hair Stylist",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    quote: "EmviApp connected me with clients who truly value my expertise.",
    achievement: "Top Performer",
    earnings: "$5,800/month",
    rating: 5.0,
    portfolio: ["https://images.unsplash.com/photo-1560869713-7d0b29837157?w=150&h=150&fit=crop", "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=150&h=150&fit=crop"]
  }
];

const customerStories = [
  {
    id: 1,
    name: "Sarah Chen",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    quote: "I booked the best hair artist of my life—so easy.",
    service: "Hair Transformation",
    artist: "Marcus Johnson"
  },
  {
    id: 2,
    name: "Emily Davis",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face", 
    quote: "The nail art was beyond my expectations. Pure artistry!",
    service: "Custom Nail Art",
    artist: "Isabella Rodriguez"
  }
];

const FeaturedSuccessStories = () => {
  const [currentArtist, setCurrentArtist] = useState(0);
  const [currentCustomer, setCurrentCustomer] = useState(0);

  const nextArtist = () => {
    setCurrentArtist((prev) => (prev + 1) % successStories.length);
  };

  const prevArtist = () => {
    setCurrentArtist((prev) => (prev - 1 + successStories.length) % successStories.length);
  };

  const nextCustomer = () => {
    setCurrentCustomer((prev) => (prev + 1) % customerStories.length);
  };

  const prevCustomer = () => {
    setCurrentCustomer((prev) => (prev - 1 + customerStories.length) % customerStories.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">
            Featured Success Stories
            <span className="text-purple-600"> (Artists & Customers)</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real transformations, real success, real community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Artist Success Stories */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
              🏆 Artist Success Stories
            </h3>
            
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={prevArtist}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                <div className="flex space-x-2">
                  {successStories.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentArtist(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentArtist ? 'bg-purple-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextArtist}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <div className="text-center space-y-6">
                <img
                  src={successStories[currentArtist].image}
                  alt={successStories[currentArtist].name}
                  className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-purple-200 shadow-lg"
                />
                
                <div>
                  <h4 className="text-2xl font-bold text-gray-900">{successStories[currentArtist].name}</h4>
                  <p className="text-purple-600 font-semibold">{successStories[currentArtist].specialty}</p>
                  <div className="flex items-center justify-center space-x-2 mt-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(successStories[currentArtist].rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({successStories[currentArtist].rating})</span>
                  </div>
                </div>
                
                <blockquote className="text-xl text-gray-700 italic font-medium">
                  "{successStories[currentArtist].quote}"
                </blockquote>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                    <div className="text-2xl font-bold text-green-600">{successStories[currentArtist].earnings}</div>
                    <div className="text-sm text-green-700">Monthly Earnings</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                    <div className="text-lg font-bold text-purple-600">{successStories[currentArtist].achievement}</div>
                    <div className="text-sm text-purple-700">Status</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-gray-600 font-semibold">Recent Work:</p>
                  <div className="flex justify-center space-x-4">
                    {successStories[currentArtist].portfolio.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt="Portfolio work"
                        className="w-20 h-20 rounded-lg object-cover shadow-md"
                      />
                    ))}
                  </div>
                </div>
                
                <Link to={`/artist/${successStories[currentArtist].id}`}>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Full Profile
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Customer Success Stories */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
              ✨ Customer Success Stories
            </h3>
            
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={prevCustomer}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                <div className="flex space-x-2">
                  {customerStories.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCustomer(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentCustomer ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextCustomer}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <div className="text-center space-y-6">
                <img
                  src={customerStories[currentCustomer].image}
                  alt={customerStories[currentCustomer].name}
                  className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-blue-200 shadow-lg"
                />
                
                <div>
                  <h4 className="text-2xl font-bold text-gray-900">{customerStories[currentCustomer].name}</h4>
                  <p className="text-blue-600 font-semibold">Happy Customer</p>
                </div>
                
                <blockquote className="text-xl text-gray-700 italic font-medium">
                  "{customerStories[currentCustomer].quote}"
                </blockquote>
                
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <p className="text-sm text-blue-700 mb-2">Service Booked:</p>
                  <p className="font-semibold text-blue-900">{customerStories[currentCustomer].service}</p>
                  <p className="text-sm text-blue-600 mt-2">
                    with <span className="font-semibold">{customerStories[currentCustomer].artist}</span>
                  </p>
                </div>
                
                <Link to="/explore/artists">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Star className="mr-2 h-4 w-4" />
                    Book Similar Service
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Meet Featured Artists CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <Link to="/explore/artists">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Meet Our Featured Artists
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedSuccessStories;
