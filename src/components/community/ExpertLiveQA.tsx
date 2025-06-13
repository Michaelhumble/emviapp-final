
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, Video, Bell, Star, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface LiveSession {
  id: string;
  title: string;
  expert: {
    name: string;
    avatar: string;
    specialty: string;
    rating: number;
  };
  date: string;
  time: string;
  duration: string;
  attendees: number;
  maxAttendees: number;
  description: string;
  topics: string[];
  status: 'upcoming' | 'live' | 'ended';
  isRegistered: boolean;
}

const ExpertLiveQA = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'upcoming' | 'live'>('all');
  
  const liveSessions: LiveSession[] = [
    {
      id: '1',
      title: 'Advanced Nail Art Techniques Q&A',
      expert: {
        name: 'Sarah Kim',
        avatar: '/api/placeholder/50/50',
        specialty: 'Nail Art Expert',
        rating: 4.9
      },
      date: 'Dec 15, 2024',
      time: '2:00 PM EST',
      duration: '60 min',
      attendees: 47,
      maxAttendees: 100,
      description: 'Join our nail art expert for an interactive session covering advanced techniques, troubleshooting common issues, and Q&A.',
      topics: ['3D Nail Art', 'Color Blending', 'Tool Selection', 'Client Consultation'],
      status: 'upcoming',
      isRegistered: true
    },
    {
      id: '2',
      title: 'Hair Color Correction Masterclass',
      expert: {
        name: 'Maria Rodriguez',
        avatar: '/api/placeholder/50/50',
        specialty: 'Color Specialist',
        rating: 4.8
      },
      date: 'Dec 12, 2024',
      time: '7:00 PM EST',
      duration: '90 min',
      attendees: 89,
      maxAttendees: 150,
      description: 'Learn professional color correction techniques and get your questions answered by an industry expert.',
      topics: ['Color Theory', 'Correction Techniques', 'Client Communication', 'Product Knowledge'],
      status: 'live',
      isRegistered: false
    },
    {
      id: '3',
      title: 'Building Your Beauty Business',
      expert: {
        name: 'David Chen',
        avatar: '/api/placeholder/50/50',
        specialty: 'Business Coach',
        rating: 4.7
      },
      date: 'Dec 18, 2024',
      time: '6:00 PM EST',
      duration: '75 min',
      attendees: 23,
      maxAttendees: 75,
      description: 'Get expert advice on growing your beauty business, from marketing to client retention strategies.',
      topics: ['Marketing Strategy', 'Social Media', 'Client Retention', 'Pricing Strategy'],
      status: 'upcoming',
      isRegistered: false
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return (
          <div className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            LIVE
          </div>
        );
      case 'upcoming':
        return (
          <div className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
            UPCOMING
          </div>
        );
      case 'ended':
        return (
          <div className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
            ENDED
          </div>
        );
      default:
        return null;
    }
  };

  const filteredSessions = liveSessions.filter(session => 
    selectedFilter === 'all' || session.status === selectedFilter
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Expert Live Q&A</h2>
          <p className="text-gray-600">Learn directly from industry professionals</p>
        </div>
        
        <div className="flex gap-2">
          {(['all', 'upcoming', 'live'] as const).map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter(filter)}
              className="capitalize"
            >
              {filter === 'all' ? 'All Sessions' : filter}
            </Button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Video className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">24</p>
            <p className="text-sm text-gray-600">Sessions This Month</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">1,247</p>
            <p className="text-sm text-gray-600">Total Attendees</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">4.8</p>
            <p className="text-sm text-gray-600">Average Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {filteredSessions.map((session, index) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`overflow-hidden hover:shadow-lg transition-shadow ${
              session.status === 'live' ? 'ring-2 ring-red-200 bg-red-50' : ''
            }`}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Expert Info */}
                  <div className="flex items-center gap-3">
                    <img 
                      src={session.expert.avatar} 
                      alt={session.expert.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{session.expert.name}</h4>
                      <p className="text-sm text-gray-600">{session.expert.specialty}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-gray-500">{session.expert.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Session Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{session.title}</h3>
                      {getStatusBadge(session.status)}
                    </div>
                    
                    <p className="text-gray-600 mb-3">{session.description}</p>
                    
                    {/* Topics */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {session.topics.map(topic => (
                        <span key={topic} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                          {topic}
                        </span>
                      ))}
                    </div>

                    {/* Session Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {session.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {session.time} ({session.duration})
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {session.attendees}/{session.maxAttendees} registered
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      {session.status === 'live' && (
                        <Button className="bg-red-600 hover:bg-red-700">
                          <Video className="h-4 w-4 mr-2" />
                          Join Live Session
                        </Button>
                      )}
                      
                      {session.status === 'upcoming' && (
                        <>
                          {session.isRegistered ? (
                            <Button variant="outline" className="text-green-600 border-green-600">
                              <Bell className="h-4 w-4 mr-2" />
                              Registered
                            </Button>
                          ) : (
                            <Button className="bg-purple-600 hover:bg-purple-700">
                              Register for Session
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <Calendar className="h-4 w-4 mr-2" />
                            Add to Calendar
                          </Button>
                        </>
                      )}
                      
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Ask Question
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Request Session */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Have a specific topic in mind?</h3>
          <p className="text-gray-600 mb-4">Request a session with our experts on topics that matter to you</p>
          <Button className="bg-purple-600 hover:bg-purple-700">
            Request Expert Session
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpertLiveQA;
