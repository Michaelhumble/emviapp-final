import React from 'react';
import { UserPlus, Star, MapPin, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const suggestedProfiles = [
  {
    id: '1',
    name: 'Maya Chen',
    role: 'Nail Artist',
    location: 'Los Angeles, CA',
    followers: '12.4k',
    posts: 89,
    specialty: 'Gel Extensions',
    avatar: 'MC',
    isVerified: true,
    recentWork: 'French Ombré Set',
    timeAgo: '2h ago'
  },
  {
    id: '2',
    name: 'Sophia Rodriguez',
    role: 'Lash Technician',
    location: 'Miami, FL',
    followers: '8.9k',
    posts: 156,
    specialty: 'Volume Lashes',
    avatar: 'SR',
    isVerified: true,
    recentWork: 'Mega Volume Set',
    timeAgo: '4h ago'
  },
  {
    id: '3',
    name: 'James Kim',
    role: 'Hair Colorist',
    location: 'New York, NY',
    followers: '15.2k',
    posts: 203,
    specialty: 'Balayage',
    avatar: 'JK',
    isVerified: false,
    recentWork: 'Sunset Balayage',
    timeAgo: '6h ago'
  }
];

const SuggestedForYou = () => {
  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <UserPlus className="h-5 w-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">Suggested For You</h3>
        <Badge variant="secondary" className="text-xs">
          New
        </Badge>
      </div>
      
      {/* Mobile Horizontal Scroll */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide lg:hidden">
        {suggestedProfiles.map((profile) => (
          <div
            key={profile.id}
            className="flex-shrink-0 w-64 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                {profile.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <h4 className="font-semibold text-gray-900 truncate">{profile.name}</h4>
                  {profile.isVerified && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                </div>
                <p className="text-sm text-gray-600">{profile.role}</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <MapPin className="h-3 w-3" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">{profile.followers} followers</span>
                <span className="text-gray-600">{profile.posts} posts</span>
              </div>
              <div className="text-xs text-gray-600">
                <span className="font-medium">Latest: </span>
                <span>{profile.recentWork}</span>
                <Clock className="h-3 w-3 inline ml-1" />
                <span className="ml-1">{profile.timeAgo}</span>
              </div>
            </div>
            
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xs"
            >
              Follow
            </Button>
          </div>
        ))}
      </div>

      {/* Desktop Vertical List */}
      <div className="hidden lg:block space-y-4">
        {suggestedProfiles.map((profile) => (
          <div
            key={profile.id}
            className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                {profile.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <h4 className="font-semibold text-gray-900">{profile.name}</h4>
                  {profile.isVerified && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                </div>
                <p className="text-sm text-gray-600">{profile.role}</p>
                <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                  <MapPin className="h-3 w-3" />
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
              <span>{profile.followers} followers</span>
              <span>{profile.posts} posts</span>
              <Badge variant="outline" className="text-xs">
                {profile.specialty}
              </Badge>
            </div>
            
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              Follow
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SuggestedForYou;