
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Users, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const SponsoredSpotlight = () => {
  const sponsoredContent = [
    {
      id: 1,
      title: "Professional Gel Kit Masterclass",
      brand: "ProNails Academy",
      image: "/lovable-uploads/323c0530-2a0b-45ee-9065-646dee476f89.png",
      description: "Transform your nail game with our exclusive professional gel kit. Used by 500+ certified nail artists worldwide.",
      originalPrice: "$149",
      salePrice: "$89",
      discount: "40% OFF",
      testimonial: "This kit completely changed my business! I've increased my bookings by 60%.",
      author: "Maria S., Certified Nail Artist",
      rating: 4.9,
      reviews: 127,
      timeLeft: "23h 45m",
      featured: true
    },
    {
      id: 2,
      title: "Hair Color Chemistry Course",
      brand: "ColorCraft Institute",
      image: "/lovable-uploads/4bc7eaab-8b8b-4b00-a4bb-6ea3b6deb483.png",
      description: "Master advanced color theory and techniques with our comprehensive course. Perfect for stylists ready to level up.",
      originalPrice: "$299",
      salePrice: "$199",
      discount: "33% OFF",
      testimonial: "The knowledge I gained helped me charge premium prices. Worth every penny!",
      author: "Jake M., Master Colorist",
      rating: 4.8,
      reviews: 89,
      timeLeft: "5d 12h",
      featured: false
    }
  ];

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            <Sparkles className="inline-block h-8 w-8 text-amber-500 mr-2" />
            Sponsored Spotlight
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Exclusive deals and premium resources from our trusted industry partners
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {sponsoredContent.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`relative bg-white rounded-3xl shadow-xl overflow-hidden ${
                item.featured ? 'ring-2 ring-amber-400 ring-opacity-50' : ''
              }`}
            >
              {/* Featured Badge */}
              {item.featured && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                    ⭐ Featured Deal
                  </Badge>
                </div>
              )}

              {/* Sponsored Label */}
              <div className="absolute top-4 right-4 z-10">
                <Badge variant="outline" className="bg-white/90 text-gray-700 border-gray-300">
                  Sponsored
                </Badge>
              </div>

              {/* Time Left Badge */}
              <div className="absolute bottom-4 left-4 z-10">
                <Badge className="bg-red-500 text-white animate-pulse">
                  <Clock className="h-3 w-3 mr-1" />
                  {item.timeLeft} left
                </Badge>
              </div>

              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              <div className="p-6">
                <div className="mb-3">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-amber-600 font-medium">{item.brand}</p>
                </div>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Pricing */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-green-600">{item.salePrice}</span>
                  <span className="text-lg text-gray-400 line-through">{item.originalPrice}</span>
                  <Badge className="bg-red-100 text-red-700 font-bold">
                    {item.discount}
                  </Badge>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium ml-1">{item.rating}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    {item.reviews} reviews
                  </div>
                </div>

                {/* Testimonial */}
                <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                  <p className="text-sm text-gray-700 italic mb-2">"{item.testimonial}"</p>
                  <p className="text-xs text-gray-500 font-medium">- {item.author}</p>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-lg">
                  Claim This Deal Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Verified Partners Only</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>30-Day Money Back Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Used by 10,000+ Professionals</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SponsoredSpotlight;
