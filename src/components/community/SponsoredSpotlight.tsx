
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ExternalLink, Heart, MessageCircle, Sparkles } from 'lucide-react';

const SponsoredSpotlight = () => {
  const sponsoredContent = [
    {
      id: 1,
      brand: "Luxury Beauty Co.",
      product: "Professional Hair Color System",
      image: "/lovable-uploads/4bc7eaab-8b8b-4b00-a4bb-6ea3b6deb483.png",
      description: "Transform your salon with our premium color collection trusted by celebrity stylists worldwide.",
      testimonial: {
        author: "Sarah Johnson",
        role: "Master Colorist",
        avatar: "/lovable-uploads/2951176b-68c9-45d6-8bc5-20513e72d0a3.png",
        text: "This system has revolutionized my color work. My clients love the results!",
        rating: 5
      },
      offer: "20% OFF for Community Members",
      originalPrice: "$299",
      discountPrice: "$239",
      likes: 234,
      comments: 67
    },
    {
      id: 2,
      brand: "Elite Nail Studio",
      product: "Professional Gel Kit Bundle",
      image: "/lovable-uploads/3016e425-432a-49f0-b106-be927292873e.png",
      description: "Everything you need for salon-quality gel manicures. Loved by professionals worldwide.",
      testimonial: {
        author: "Maria Rodriguez",
        role: "Nail Artist",
        avatar: "/lovable-uploads/323c0530-2a0b-45ee-9065-646dee476f89.png",
        text: "The best investment I've made for my nail business. Quality is unmatched!",
        rating: 5
      },
      offer: "FREE Shipping + Bonus Tools",
      originalPrice: "$199",
      discountPrice: "$149",
      likes: 189,
      comments: 43
    }
  ];

  return (
    <div className="py-12 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Sponsored Spotlight
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover premium products and exclusive offers from our trusted beauty partners
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {sponsoredContent.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="overflow-hidden bg-white shadow-xl border-4 border-gradient-to-r from-purple-200 to-pink-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Sponsored Badge */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 animate-pulse"></div>
                  <Badge className="bg-white text-purple-600 font-bold relative z-10">
                    <Sparkles className="h-3 w-3 mr-1" />
                    SPONSORED SPOTLIGHT
                  </Badge>
                </div>

                <CardContent className="p-0">
                  {/* Product Image */}
                  <div className="relative overflow-hidden h-64">
                    <img 
                      src={item.image} 
                      alt={item.product}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-red-500 text-white font-bold animate-pulse">
                        {item.offer}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{item.product}</h3>
                      <p className="text-purple-600 font-semibold">{item.brand}</p>
                    </div>

                    <p className="text-gray-600 mb-4">{item.description}</p>

                    {/* Testimonial */}
                    <div className="bg-purple-50 rounded-2xl p-4 mb-4 border-l-4 border-l-purple-400">
                      <div className="flex items-start gap-3">
                        <img 
                          src={item.testimonial.avatar} 
                          alt={item.testimonial.author}
                          className="w-12 h-12 rounded-full object-cover border-2 border-purple-200"
                        />
                        <div className="flex-1">
                          <p className="text-gray-800 italic mb-2">"{item.testimonial.text}"</p>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-gray-900">{item.testimonial.author}</p>
                              <p className="text-sm text-purple-600">{item.testimonial.role}</p>
                            </div>
                            <div className="flex">
                              {[...Array(item.testimonial.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-green-600">{item.discountPrice}</span>
                        <span className="text-lg text-gray-500 line-through ml-2">{item.originalPrice}</span>
                      </div>
                      <div className="flex items-center gap-4 text-gray-500">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span className="text-sm">{item.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm">{item.comments}</span>
                        </div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all">
                      <ExternalLink className="h-5 w-5 mr-2" />
                      Get Exclusive Deal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SponsoredSpotlight;
