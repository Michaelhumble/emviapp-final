import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Star, DollarSign, Heart, Share2, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SocialCommercePostProps {
  post: {
    id: string;
    user: {
      name: string;
      avatar: string;
      isVerified: boolean;
      specialties: string[];
    };
    content: string;
    images: string[];
    serviceOffering?: {
      name: string;
      price: number;
      duration: string;
      available: boolean;
    };
    tipJar?: {
      enabled: boolean;
      goal?: number;
      current: number;
    };
    affiliateProducts?: Array<{
      id: string;
      name: string;
      price: number;
      commission: number;
      image: string;
    }>;
    engagement: {
      likes: number;
      comments: number;
      shares: number;
      bookings: number;
    };
  };
  onBook?: (postId: string) => void;
  onTip?: (postId: string, amount: number) => void;
  onShare?: (postId: string) => void;
  onLike?: (postId: string) => void;
}

const SocialCommercePost: React.FC<SocialCommercePostProps> = ({
  post,
  onBook,
  onTip,
  onShare,
  onLike
}) => {
  const [showTipModal, setShowTipModal] = useState(false);
  const [selectedTipAmount, setSelectedTipAmount] = useState(5);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const tipAmounts = [5, 10, 25, 50, 100];

  return (
    <Card className="bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 border-purple-200 overflow-hidden">
      <CardContent className="p-0">
        {/* Header */}
        <div className="p-4 border-b border-purple-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src={post.user.avatar} 
                  alt={post.user.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-200"
                />
                {post.user.isVerified && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Star className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{post.user.name}</h4>
                <div className="flex gap-1">
                  {post.user.specialties.slice(0, 2).map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-purple-600">
              Follow
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-gray-700 mb-3">{post.content}</p>
          
          {/* Images */}
          {post.images.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mb-4 rounded-xl overflow-hidden">
              {post.images.slice(0, 4).map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <img 
                    src={image} 
                    alt={`Post ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                  />
                  {index === 3 && post.images.length > 4 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-semibold">+{post.images.length - 4}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Service Offering */}
        {post.serviceOffering && (
          <div className="mx-4 mb-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-semibold text-purple-900">✨ Book This Service</h5>
              <Badge variant={post.serviceOffering.available ? "default" : "secondary"}>
                {post.serviceOffering.available ? "Available" : "Booked"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{post.serviceOffering.name}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    ${post.serviceOffering.price}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.serviceOffering.duration}
                  </span>
                </div>
              </div>
              <Button 
                onClick={() => onBook?.(post.id)}
                disabled={!post.serviceOffering.available}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Book Now
              </Button>
            </div>
          </div>
        )}

        {/* Tip Jar */}
        {post.tipJar?.enabled && (
          <div className="mx-4 mb-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-semibold text-orange-900 flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-500" />
                Support This Creator
              </h5>
              {post.tipJar.goal && (
                <span className="text-sm text-orange-600">
                  ${post.tipJar.current}/${post.tipJar.goal}
                </span>
              )}
            </div>
            
            {post.tipJar.goal && (
              <div className="mb-3">
                <div className="bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (post.tipJar.current / post.tipJar.goal) * 100)}%` }}
                  />
                </div>
              </div>
            )}
            
            <div className="flex gap-2">
              {tipAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedTipAmount(amount);
                    onTip?.(post.id, amount);
                  }}
                  className="flex-1 border-orange-200 text-orange-600 hover:bg-orange-50"
                >
                  ${amount}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Affiliate Products */}
        {post.affiliateProducts && post.affiliateProducts.length > 0 && (
          <div className="mx-4 mb-4">
            <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-blue-500" />
              Featured Products
            </h5>
            <div className="grid grid-cols-2 gap-3">
              {post.affiliateProducts.slice(0, 2).map((product) => (
                <div key={product.id} className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow cursor-pointer">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-20 object-cover rounded mb-2"
                  />
                  <p className="font-medium text-sm text-gray-900 truncate">{product.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm font-semibold text-green-600">${product.price}</span>
                    <Badge variant="secondary" className="text-xs">
                      {product.commission}% back
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Engagement Bar */}
        <div className="border-t border-purple-100 p-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
            <span>{post.engagement.likes} likes</span>
            <span>{post.engagement.comments} comments</span>
            <span>{post.engagement.bookings} bookings</span>
          </div>
          
          <div className="flex items-center justify-around">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLike?.(post.id)}
              className="flex-1 text-gray-600 hover:text-red-500"
            >
              <Heart className="mr-1 h-4 w-4" />
              Like
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 text-gray-600"
            >
              💬 Comment
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onShare?.(post.id)}
              className="flex-1 text-gray-600 hover:text-blue-500"
            >
              <Share2 className="mr-1 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialCommercePost;