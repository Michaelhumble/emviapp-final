
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ArrowRight } from 'lucide-react';
import TestimonialsModal from '../modals/TestimonialsModal';

const ArtistTestimonialCarousel = () => {
  const [showModal, setShowModal] = useState(false);

  const testimonials = [
    {
      name: "Alex Parker",
      rating: 5,
      text: "Absolutely incredible work! The attention to detail is unmatched. Highly recommend!",
      service: "Nail Art"
    },
    {
      name: "Jordan Kim", 
      rating: 5,
      text: "Professional service and amazing results. Will definitely be coming back!",
      service: "Manicure"
    }
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/20"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-playfair font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Quote className="h-6 w-6 text-rose-600" />
            Client Reviews
          </h2>
          <p className="text-slate-600 font-inter">See what clients say about your work</p>
        </div>

        <div className="space-y-4 mb-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gradient-to-r from-slate-50 to-white rounded-2xl p-6 border border-slate-100 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-medium text-slate-900">{testimonial.name}</div>
                  <div className="text-sm text-slate-600">{testimonial.service}</div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-slate-700 italic">"{testimonial.text}"</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-4 border border-rose-100 mb-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-rose-600">4.9</div>
              <div className="text-sm text-slate-600">Average Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-600">247</div>
              <div className="text-sm text-slate-600">Total Reviews</div>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowModal(true)}
          className="w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white py-3 rounded-xl font-inter font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          View More Reviews
          <ArrowRight className="h-4 w-4" />
        </motion.button>
      </motion.div>

      <TestimonialsModal 
        open={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </>
  );
};

export default ArtistTestimonialCarousel;
