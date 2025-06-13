
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, Star, Crown, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ExclusiveLiveEvents = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const upcomingEvents = [
    {
      id: 1,
      title: "Master Class: Advanced Color Theory",
      speaker: "Sarah Martinez",
      speakerTitle: "Celebrity Colorist",
      avatar: "/lovable-uploads/2951176b-68c9-45d6-8bc5-20513e72d0a3.png",
      date: "Dec 15, 2024",
      time: "7:00 PM EST",
      attendees: 347,
      maxAttendees: 500,
      isExclusive: true,
      price: "FREE for Premium Members"
    },
    {
      id: 2,
      title: "Building Your Beauty Empire",
      speaker: "Jennifer Kim",
      speakerTitle: "7-Figure Salon Owner",
      avatar: "/lovable-uploads/3016e425-432a-49f0-b106-be927292873e.png",
      date: "Dec 18, 2024",
      time: "8:00 PM EST",
      attendees: 892,
      maxAttendees: 1000,
      isExclusive: false,
      price: "$49"
    }
  ];

  return (
    <div className="py-12 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Exclusive Live Events & Expert Panels
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join industry leaders and transform your career with exclusive access to premium content
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl p-8 mb-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
            <Crown className="h-6 w-6 text-yellow-300" />
            Next Exclusive Event Starts In
          </h3>
          
          <div className="flex justify-center gap-4">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="bg-white/20 backdrop-blur-md rounded-2xl p-4 min-w-[80px]">
                <div className="text-3xl font-bold">{value}</div>
                <div className="text-sm capitalize">{unit}</div>
              </div>
            ))}
          </div>
          
          <p className="mt-4 text-lg opacity-90">⚡ Limited spots available - Don't miss out!</p>
        </motion.div>

        {/* Event Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="overflow-hidden bg-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {event.isExclusive && (
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 text-center">
                    <Badge className="bg-white text-orange-600 hover:bg-white">
                      <Crown className="h-3 w-3 mr-1" />
                      EXCLUSIVE EVENT
                    </Badge>
                  </div>
                )}
                
                <CardContent className="p-6">
                  {/* Speaker Info */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <img 
                        src={event.avatar} 
                        alt={event.speaker}
                        className="w-16 h-16 rounded-full object-cover border-4 border-purple-200"
                      />
                      <Star className="absolute -top-1 -right-1 h-5 w-5 text-yellow-500 fill-current" />
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{event.speaker}</h3>
                      <p className="text-purple-600 font-medium">{event.speakerTitle}</p>
                    </div>
                  </div>

                  {/* Event Details */}
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h4>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date} at {event.time}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{event.attendees}/{event.maxAttendees} registered</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {Math.round(((event.maxAttendees - event.attendees) / event.maxAttendees) * 100)}% spots remaining
                    </p>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-purple-600">{event.price}</p>
                    </div>
                    
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full font-semibold shadow-lg">
                      Reserve Spot
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

export default ExclusiveLiveEvents;
