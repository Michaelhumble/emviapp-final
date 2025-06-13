
import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, Percent, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const SponsoredSpotlight = () => {
  const sponsoredDeals = [
    {
      id: '1',
      brand: 'Pro Nail Systems',
      title: 'Professional Gel Kit Collection',
      description: 'Complete starter kit with 24 premium gel colors, LED lamp, and professional tools.',
      originalPrice: 199,
      salePrice: 149,
      discount: 25,
      image: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/generated(33).png',
      rating: 4.8,
      reviews: 342,
      timeLeft: '2 days',
      category: 'Nail Products'
    },
    {
      id: '2',
      brand: 'Beauty Pro Education',
      title: 'Advanced Techniques Masterclass',
      description: 'Online certification course covering advanced nail art and business management.',
      originalPrice: 299,
      salePrice: 199,
      discount: 33,
      image: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/_A%20long,%20luxurious%20nail%20salon-10.png',
      rating: 4.9,
      reviews: 156,
      timeLeft: '5 days',
      category: 'Education'
    },
    {
      id: '3',
      brand: 'Salon Essential Co.',
      title: 'Premium Salon Furniture Set',
      description: 'Luxury salon chairs, manicure tables, and storage solutions for modern salons.',
      originalPrice: 1299,
      salePrice: 999,
      discount: 23,
      image: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/_A%20long,%20luxurious%20nail%20salon-11.png',
      rating: 4.7,
      reviews: 89,
      timeLeft: '1 week',
      category: 'Equipment'
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Exclusive Partner Deals
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Special offers and discounts from our trusted brand partners, exclusively for EmviApp community members.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sponsoredDeals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden relative">
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                    <Percent className="h-3 w-3 mr-1" />
                    {deal.discount}% OFF
                  </Badge>
                </div>
                
                <div className="absolute top-4 right-4 z-10">
                  <Badge variant="secondary" className="bg-red-500 text-white">
                    <Clock className="h-3 w-3 mr-1" />
                    {deal.timeLeft}
                  </Badge>
                </div>
                
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={deal.image} 
                    alt={deal.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                
                <CardContent className="p-6">
                  <div className="mb-2">
                    <Badge variant="outline" className="text-xs mb-2">
                      {deal.category}
                    </Badge>
                    <p className="text-sm text-gray-500 font-medium">{deal.brand}</p>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{deal.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{deal.description}</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{deal.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">({deal.reviews} reviews)</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-green-600">${deal.salePrice}</span>
                      <span className="text-sm text-gray-500 line-through">${deal.originalPrice}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Get Deal Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            🤝 Sponsored content from verified partners • Exclusive deals for community members
          </p>
        </div>
      </div>
    </section>
  );
};

export default SponsoredSpotlight;
