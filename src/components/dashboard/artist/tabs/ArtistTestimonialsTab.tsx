import React from 'react';
import { motion } from 'framer-motion';
import ArtistTestimonialCarousel from '../sections/ArtistTestimonialCarousel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, MessageSquare, Heart, TrendingUp } from 'lucide-react';

const ArtistTestimonialsTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Review Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold">4.9</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <MessageSquare className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">127</div>
            <div className="text-sm text-muted-foreground">Reviews</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <Heart className="h-8 w-8 mx-auto mb-2 text-pink-500" />
            <div className="text-2xl font-bold">94%</div>
            <div className="text-sm text-muted-foreground">Positive</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">+18</div>
            <div className="text-sm text-muted-foreground">This Month</div>
          </CardContent>
        </Card>
      </div>

      {/* Testimonials */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Client Testimonials
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ArtistTestimonialCarousel />
        </CardContent>
      </Card>

      {/* Coming Soon Features */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
        <CardContent className="p-6 text-center">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 text-purple-500" />
          <h3 className="text-lg font-semibold mb-2">Advanced Review Management</h3>
          <p className="text-muted-foreground mb-4">
            Coming Soon: Detailed review analytics, response templates, and sentiment analysis
          </p>
          <div className="text-sm text-purple-600 font-medium">
            🚀 Part of our upcoming Pro features
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ArtistTestimonialsTab;