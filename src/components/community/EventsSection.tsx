import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, Video, Star } from 'lucide-react';

const upcomingEvents = [
  {
    id: '1',
    title: 'Nail Art Masterclass: Galaxy Designs',
    host: 'Isabella Rodriguez',
    type: 'workshop',
    date: '2024-07-15',
    time: '2:00 PM EST',
    duration: '2 hours',
    participants: 156,
    maxParticipants: 200,
    isFree: true,
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=200&fit=crop',
    tags: ['nails', 'art', 'techniques']
  },
  {
    id: '2',
    title: 'Hair Color Theory: Spring 2024 Trends',
    host: 'Marcus Chen',
    type: 'livestream',
    date: '2024-07-16',
    time: '7:00 PM EST',
    duration: '1.5 hours',
    participants: 89,
    maxParticipants: 150,
    isFree: true,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=200&fit=crop',
    tags: ['hair', 'color', 'trends']
  },
  {
    id: '3',
    title: 'Weekly Challenge: Bold Makeup Looks',
    host: 'Community Team',
    type: 'challenge',
    date: '2024-07-17',
    time: 'All day',
    duration: '7 days',
    participants: 234,
    maxParticipants: null,
    isFree: true,
    image: 'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?w=400&h=200&fit=crop',
    tags: ['makeup', 'challenge', 'bold']
  }
];

const EventsSection = () => {
  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'livestream': return <Video className="h-4 w-4" />;
      case 'workshop': return <Star className="h-4 w-4" />;
      case 'challenge': return <Star className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getEventTypeColor = (type: string) => {
    const colors = {
      livestream: 'bg-red-100 text-red-700',
      workshop: 'bg-blue-100 text-blue-700',
      challenge: 'bg-green-100 text-green-700',
      competition: 'bg-purple-100 text-purple-700'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
          <Calendar className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-900">Upcoming Events</h3>
          <p className="text-sm text-gray-600">Join live sessions & challenges</p>
        </div>
      </div>

      <div className="space-y-4">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="border border-purple-100 rounded-lg p-4 hover:shadow-md transition-shadow">
            {/* Event Image */}
            <div className="w-full h-24 bg-gray-200 rounded-lg mb-3 overflow-hidden">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Event Info */}
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-semibold text-gray-900 text-sm leading-tight">
                  {event.title}
                </h4>
                <Badge className={getEventTypeColor(event.type)}>
                  {getEventTypeIcon(event.type)}
                  <span className="ml-1 capitalize">{event.type}</span>
                </Badge>
              </div>

              <p className="text-xs text-gray-600">
                by {event.host}
              </p>

              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(event.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {event.time}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {event.participants} joined
                  {event.maxParticipants && ` / ${event.maxParticipants}`}
                </span>
                {event.isFree && (
                  <Badge variant="secondary" className="text-xs">
                    FREE
                  </Badge>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {event.tags.slice(0, 3).map((tag) => (
                  <span 
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <Button 
                size="sm" 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white mt-3"
              >
                {event.type === 'challenge' ? 'Join Challenge' : 'Register Now'}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-purple-100">
        <Button 
          variant="outline" 
          className="w-full border-purple-200 hover:bg-purple-50 text-purple-600"
        >
          View All Events
        </Button>
      </div>
    </Card>
  );
};

export default EventsSection;