
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ArrowRight } from 'lucide-react';

const ArtistTestimonialCarousel = () => {
  const [showModal, setShowModal] = useState(false);

  const testimonials = [
    {
      name: "Client Review A",
      rating: 5,
      text: "Excellent service! Professional work and great attention to detail.",
      service: "Nail Art"
    },
    {
      name: "Client Review B", 
      rating: 5,
      text: "Amazing experience! Will definitely book again.",
      service: "Manicure"
    }
  ];

  const handleViewMore = () => {
    setShowModal(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Quote className="h-6 w-6 text-purple-500" />
            Client Reviews
          </h2>
          <p className="text-gray-600 font-inter">See what clients say about your work</p>
        </div>

        <div className="space-y-4 mb-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-medium text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.service}</div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.text}"</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-100 mb-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-yellow-600">4.9</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">247</div>
              <div className="text-sm text-gray-600">Total Reviews</div>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleViewMore}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-2xl font-inter font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          View More Reviews
          <ArrowRight className="h-4 w-4" />
        </motion.button>
      </motion.div>

      {/* Testimonials Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Quote className="h-5 w-5 text-purple-500" />
                All Client Reviews
              </h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.service}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ArtistTestimonialCarousel;
