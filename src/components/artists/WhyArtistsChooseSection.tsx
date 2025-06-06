
import React from "react";
import { motion } from "framer-motion";
import { Users, Award, MessageCircle, Shield } from "lucide-react";

const WhyArtistsChooseSection = () => {
  const artistTestimonials = [
    {
      quote: "I finally get booked by real clients. I love how EmviApp promotes my work!",
      author: "Maria Santos",
      specialty: "Nail Artist",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      quote: "The platform helps me stand out and rewards my success.",
      author: "David Kim",
      specialty: "Hair Stylist", 
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const customerTestimonials = [
    {
      quote: "I've never booked with such amazing talent. Easy, safe, and premium every time.",
      author: "Jennifer L.",
      type: "Regular Customer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      quote: "EmviApp artists are on another level. Worth every penny.",
      author: "Sarah M.",
      type: "VIP Customer",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const perks = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Exclusive Artist Events",
      description: "Network with top talent and industry leaders"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "VIP Badges & Recognition",
      description: "Stand out with premium status indicators"
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Instant Messaging & Bookings",
      description: "Connect directly with your ideal clients"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Verified Reviews",
      description: "Build trust with authentic client feedback"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">
            Why Artists Choose EmviApp
            <span className="text-purple-600"> (and Why Customers Love It)</span>
          </h2>
        </motion.div>

        {/* Split testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Artist testimonials */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              What Artists Say
            </h3>
            {artistTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl shadow-lg border border-purple-100"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                    <p className="text-sm text-purple-600">{testimonial.specialty}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </motion.div>

          {/* Customer testimonials */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              What Customers Say
            </h3>
            {customerTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-lg border border-blue-100"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                    <p className="text-sm text-blue-600">{testimonial.type}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Perks grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-playfair font-bold text-center text-gray-900 mb-12">
            Universal Perks Everyone Loves
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {perks.map((perk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg">
                  {perk.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{perk.title}</h4>
                <p className="text-gray-600">{perk.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyArtistsChooseSection;
