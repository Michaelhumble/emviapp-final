
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ExclusiveLiveEvents = () => {
  const upcomingEvents = [
    {
      id: '1',
      title: 'Advanced Nail Art Masterclass',
      host: 'Master Artist Maria Chen',
      hostIcon: '💎',
      date: 'Dec 18, 2024',
      time: '7:00 PM EST',
      participants: 127,
      maxParticipants: 150,
      price: 'Free for Premium',
      image: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/generated(04).png',
      category: 'Nail Art',
      exclusive: true
    },
    {
      id: '2',
      title: 'Color Theory for Beauty Professionals',
      host: 'Expert Colorist Sarah Williams',
      hostIcon: '🌟',
      date: 'Dec 20, 2024',
      time: '6:30 PM EST',
      participants: 89,
      maxParticipants: 120,
      price: '$25',
      image: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/generated(08).png',
      category: 'Education',
      exclusive: false
    },
    {
      id: '3',
      title: 'Business Growth Strategies for Salons',
      host: 'CEO Jennifer Martinez',
      hostIcon: '🔥',
      date: 'Dec 22, 2024',
      time: '8:00 PM EST',
      participants: 203,
      maxParticipants: 250,
      price: 'Free for All',
      image: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/generated(12).png',
      category: 'Business',
      exclusive: false
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Exclusive Live Events
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join industry experts for live sessions, masterclasses, and networking events designed for beauty professionals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden">
                {event.exclusive && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Exclusive
                    </Badge>
                  </div>
                )}
                
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <Badge variant="secondary" className="mb-2">
                      {event.category}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{event.title}</h3>
                  
                  {/* Host info with icon instead of photo */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{event.hostIcon}</span>
                    <span className="text-sm text-gray-600">by {event.host}</span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{event.participants}/{event.maxParticipants} registered</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-purple-600">{event.price}</span>
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      Register Now
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

export default ExclusiveLiveEvents;
