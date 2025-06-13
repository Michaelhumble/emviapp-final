
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Calendar, Gift } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const PremiumChallenges = () => {
  const featuredChallenges = [
    {
      id: '1',
      title: 'Holiday Nail Art Challenge',
      description: 'Create stunning holiday-themed nail designs and showcase your creativity to win amazing prizes.',
      prize: '$350 Professional Kit',
      participants: 284,
      maxParticipants: 500,
      daysLeft: 12,
      difficulty: 'Intermediate',
      image: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/generated(15).png',
      category: 'Nail Art',
      trending: true
    },
    {
      id: '2',
      title: 'Client Transformation Contest',
      description: 'Show before and after photos of your best client transformations this month.',
      prize: '$250 Gift Card',
      participants: 156,
      maxParticipants: 300,
      daysLeft: 8,
      difficulty: 'All Levels',
      image: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/generated(21).png',
      category: 'Transformation',
      trending: false
    },
    {
      id: '3',
      title: 'Sustainable Beauty Challenge',
      description: 'Showcase eco-friendly beauty practices and products in your salon or workspace.',
      prize: '$400 Eco Kit',
      participants: 92,
      maxParticipants: 200,
      daysLeft: 15,
      difficulty: 'Beginner',
      image: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/generated(27).png',
      category: 'Sustainability',
      trending: false
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
            Featured Challenges
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Participate in exciting challenges, showcase your skills, and win amazing prizes while connecting with the community.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredChallenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden relative">
                {challenge.trending && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse">
                      🔥 Trending
                    </Badge>
                  </div>
                )}
                
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={challenge.image} 
                    alt={challenge.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary" className="mb-2">
                      {challenge.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-white text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>{challenge.daysLeft} days left</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{challenge.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{challenge.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Gift className="h-4 w-4" />
                        <span className="font-semibold text-green-600">{challenge.prize}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{challenge.participants} participants</span>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Progress</span>
                        <span>{Math.round((challenge.participants / challenge.maxParticipants) * 100)}%</span>
                      </div>
                      <Progress 
                        value={(challenge.participants / challenge.maxParticipants) * 100} 
                        className="h-2"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {challenge.difficulty}
                    </Badge>
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    >
                      <Trophy className="h-4 w-4 mr-1" />
                      Join Challenge
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumChallenges;
