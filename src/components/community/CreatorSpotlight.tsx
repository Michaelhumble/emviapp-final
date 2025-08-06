import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, Star, TrendingUp, Award, Users, Heart, 
  MessageCircle, Share2, Calendar, DollarSign, Trophy,
  Sparkles, Flame, Eye, ChevronLeft, ChevronRight,
  Lock, Gift, Target, Zap
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

interface FeaturedCreator {
  id: string;
  name: string;
  avatar: string;
  role: 'artist' | 'salon';
  specialty: string;
  location: string;
  stats: {
    followers: number;
    likes: number;
    posts: number;
    bookings: number;
    earnings: number;
    rating: number;
  };
  achievements: string[];
  featuredWork: {
    image: string;
    title: string;
    likes: number;
    category: string;
  }[];
  story: string;
  weeklyGrowth: {
    followers: number;
    earnings: number;
    bookings: number;
  };
  isCurrentWeekWinner: boolean;
  nextSpotlightDate: string;
}

interface CreatorSpotlightProps {
  onApplyForSpotlight: () => void;
  onViewProfile: (creatorId: string) => void;
  onSignUp: () => void;
}

const CreatorSpotlight: React.FC<CreatorSpotlightProps> = ({
  onApplyForSpotlight,
  onViewProfile,
  onSignUp
}) => {
  const { user } = useAuth();
  const [currentSpotlight, setCurrentSpotlight] = useState(0);
  const [timeUntilNext, setTimeUntilNext] = useState({
    days: 4,
    hours: 12,
    minutes: 34
  });

  const featuredCreators: FeaturedCreator[] = [
    {
      id: 'sarah_spotlight',
      name: 'Sarah Nail Queen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332fb6c?w=300&h=300&fit=crop',
      role: 'artist',
      specialty: 'Nail Art Specialist',
      location: 'Los Angeles, CA',
      stats: {
        followers: 15420,
        likes: 89340,
        posts: 234,
        bookings: 156,
        earnings: 12450,
        rating: 4.9
      },
      achievements: ['Top Creator 2024', 'Viral Artist', 'Customer Favorite', 'Trendsetter'],
      featuredWork: [
        {
          image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&h=200&fit=crop',
          title: 'Holographic Sunset',
          likes: 2847,
          category: 'Nail Art'
        },
        {
          image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=200&h=200&fit=crop',
          title: 'Galaxy Gradient',
          likes: 1924,
          category: 'Nail Art'
        },
        {
          image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=200&h=200&fit=crop',
          title: 'Minimalist Gold',
          likes: 3156,
          category: 'Nail Art'
        }
      ],
      story: "From beauty school dropout to viral sensation! Sarah started with $100 and a dream. Now she's earning 6-figures and inspiring thousands daily. Her secret? Consistency, creativity, and never giving up! 💅✨",
      weeklyGrowth: {
        followers: 1247,
        earnings: 2340,
        bookings: 23
      },
      isCurrentWeekWinner: true,
      nextSpotlightDate: '2024-01-28'
    },
    {
      id: 'mike_spotlight',
      name: 'Mike Hair Master',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
      role: 'artist',
      specialty: 'Hair Transformation Expert',
      location: 'New York, NY',
      stats: {
        followers: 23100,
        likes: 145200,
        posts: 189,
        bookings: 203,
        earnings: 18900,
        rating: 5.0
      },
      achievements: ['Hair Wizard', 'Perfect 5★ Rating', 'Transformation King', 'Mentor'],
      featuredWork: [
        {
          image: 'https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?w=200&h=200&fit=crop',
          title: 'Color Transformation',
          likes: 4521,
          category: 'Hair Color'
        },
        {
          image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=200&h=200&fit=crop',
          title: 'Wedding Updo',
          likes: 2876,
          category: 'Styling'
        }
      ],
      story: "Mike went from cutting hair in his garage to owning 3 salons! His transformation videos have over 50M views. The key? Always learning and pushing boundaries! 💫",
      weeklyGrowth: {
        followers: 890,
        earnings: 3200,
        bookings: 31
      },
      isCurrentWeekWinner: false,
      nextSpotlightDate: '2024-02-04'
    }
  ];

  const currentCreator = featuredCreators[currentSpotlight];

  // Update countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const nextSpotlight = new Date('2024-01-28');
      const difference = nextSpotlight.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeUntilNext({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const nextCreator = () => {
    setCurrentSpotlight((prev) => (prev + 1) % featuredCreators.length);
  };

  const prevCreator = () => {
    setCurrentSpotlight((prev) => (prev - 1 + featuredCreators.length) % featuredCreators.length);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Spotlight Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center space-x-3"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Crown className="h-8 w-8 text-yellow-500" />
          </motion.div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Creator Spotlight
          </h2>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="h-6 w-6 text-yellow-500" />
          </motion.div>
        </motion.div>
        
        <p className="text-gray-600 max-w-2xl mx-auto">
          Meet this week's featured creator! Their journey from zero to hero will inspire your success 🌟
        </p>

        {/* Next Spotlight Countdown */}
        <div className="flex items-center justify-center space-x-4 text-sm">
          <Badge className="bg-orange-100 text-orange-700 px-3 py-1">
            <Calendar className="h-3 w-3 mr-1" />
            Next Spotlight in: {timeUntilNext.days}d {timeUntilNext.hours}h {timeUntilNext.minutes}m
          </Badge>
          <Button
            onClick={() => {
              if (!user) {
                toast.error('Sign up to apply for creator spotlight! 🌟');
                onSignUp();
                return;
              }
              onApplyForSpotlight();
            }}
            size="sm"
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
          >
            Apply for Spotlight ✨
          </Button>
        </div>
      </div>

      {/* Main Spotlight Card */}
      <motion.div
        key={currentSpotlight}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <Card className="overflow-hidden bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 border-2 border-yellow-200 shadow-2xl">
          
          {/* Winner Badge */}
          {currentCreator.isCurrentWeekWinner && (
            <div className="absolute top-4 left-4 z-10">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-2 text-sm font-bold">
                  <Trophy className="h-4 w-4 mr-1" />
                  This Week's Winner!
                </Badge>
              </motion.div>
            </div>
          )}

          {/* Navigation Arrows */}
          <button
            onClick={prevCreator}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>
          
          <button
            onClick={nextCreator}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Creator Profile */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="h-20 w-20 ring-4 ring-yellow-300 shadow-xl">
                      <AvatarImage src={currentCreator.avatar} />
                      <AvatarFallback>{currentCreator.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <motion.div
                      className="absolute -top-2 -right-2"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Crown className="h-8 w-8 text-yellow-500" />
                    </motion.div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{currentCreator.name}</h3>
                    <p className="text-lg text-gray-600">{currentCreator.specialty}</p>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {currentCreator.location}
                    </p>
                  </div>
                </div>

                {/* Success Story */}
                <div className="bg-white/60 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 mr-2" />
                    Success Story
                  </h4>
                  <p className="text-gray-700 leading-relaxed">{currentCreator.story}</p>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                    <Award className="h-5 w-5 text-purple-500 mr-2" />
                    Achievements
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentCreator.achievements.map((achievement, idx) => (
                      <Badge key={idx} className="bg-purple-100 text-purple-700">
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* This Week's Growth */}
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-bold text-green-800 mb-3 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    This Week's Growth
                  </h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-green-700">
                        +{currentCreator.weeklyGrowth.followers.toLocaleString()}
                      </div>
                      <div className="text-xs text-green-600">Followers</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-green-700">
                        ${currentCreator.weeklyGrowth.earnings.toLocaleString()}
                      </div>
                      <div className="text-xs text-green-600">Earnings</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-green-700">
                        +{currentCreator.weeklyGrowth.bookings}
                      </div>
                      <div className="text-xs text-green-600">Bookings</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats & Featured Work */}
              <div className="space-y-6">
                
                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/60 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {currentCreator.stats.followers.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Followers</div>
                  </div>
                  <div className="bg-white/60 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {currentCreator.stats.likes.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Total Likes</div>
                  </div>
                  <div className="bg-white/60 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      ${currentCreator.stats.earnings.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Monthly Earnings</div>
                  </div>
                  <div className="bg-white/60 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600 flex items-center justify-center">
                      {currentCreator.stats.rating}
                      <Star className="h-5 w-5 text-yellow-500 ml-1" />
                    </div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                </div>

                {/* Featured Work */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                    <Sparkles className="h-5 w-5 text-pink-500 mr-2" />
                    Featured Work
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {currentCreator.featuredWork.map((work, idx) => (
                      <motion.div
                        key={idx}
                        className="relative group cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        onClick={() => onViewProfile(currentCreator.id)}
                      >
                        <img
                          src={work.image}
                          alt={work.title}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <div className="text-white text-center">
                            <h5 className="font-bold text-sm">{work.title}</h5>
                            <div className="flex items-center justify-center mt-1">
                              <Heart className="h-3 w-3 mr-1" />
                              <span className="text-xs">{work.likes.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-3">
                  <Button
                    onClick={() => onViewProfile(currentCreator.id)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    View Full Profile & Portfolio
                    <Eye className="h-4 w-4 ml-2" />
                  </Button>
                  
                  <Button
                    onClick={() => {
                      if (!user) {
                        toast.error('Sign up to follow creators and get inspired! 🌟');
                        onSignUp();
                        return;
                      }
                      toast.success(`Following ${currentCreator.name}! You'll see their content first 💜`);
                    }}
                    variant="outline"
                    className="border-2 border-purple-300 hover:bg-purple-50"
                  >
                    Follow & Get Inspired
                    <Heart className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Apply for Spotlight CTA */}
      <motion.div
        className="text-center bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-2xl p-8 text-white"
        whileHover={{ scale: 1.02 }}
      >
        <h3 className="text-2xl font-bold mb-4">Want to be Featured Next Week?</h3>
        <p className="mb-6 opacity-90">
          Join thousands of creators earning serious money and building their dream careers! 
          Complete your profile, post consistently, and you could be our next spotlight winner! 🌟
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => {
              if (!user) {
                onSignUp();
                return;
              }
              onApplyForSpotlight();
            }}
            size="lg"
            className="bg-white text-orange-600 hover:bg-gray-50 font-bold px-8"
          >
            {user ? 'Apply for Spotlight ✨' : 'Sign Up & Apply 🚀'}
          </Button>
          
          <div className="text-sm opacity-75">
            Applications close in {timeUntilNext.days} days!
          </div>
        </div>
      </motion.div>

      {/* Spotlight Navigation Dots */}
      <div className="flex justify-center space-x-2">
        {featuredCreators.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSpotlight(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              idx === currentSpotlight 
                ? 'bg-yellow-500 scale-125' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CreatorSpotlight;