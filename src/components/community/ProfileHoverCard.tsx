import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, MessageCircle, Calendar, Star, MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

interface ProfileHoverCardProps {
  profile: {
    id: string;
    full_name: string;
    avatar_url?: string;
    role?: string;
    specialties?: string[];
    location?: string;
    rating?: number;
    followers_count?: number;
    posts_count?: number;
    bio?: string;
  };
  isVisible: boolean;
  position: { x: number; y: number };
  onBook: () => void;
  onMessage: () => void;
  onFollow: () => void;
  onInvite: () => void;
}

const ProfileHoverCard: React.FC<ProfileHoverCardProps> = ({
  profile,
  isVisible,
  position,
  onBook,
  onMessage,
  onFollow,
  onInvite
}) => {
  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed z-50 pointer-events-auto"
      style={{ 
        left: position.x, 
        top: position.y,
        transform: 'translate(-50%, -100%)'
      }}
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <Card className="w-80 shadow-xl border-2 border-primary/20 bg-card/95 backdrop-blur-sm">
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-start gap-3 mb-4">
            <Avatar className="h-16 w-16 ring-2 ring-primary/30">
              <AvatarImage src={profile.avatar_url} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-primary-foreground">
                {profile.full_name[0]}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg truncate">{profile.full_name}</h3>
              <p className="text-sm text-muted-foreground capitalize">{profile.role}</p>
              
              {profile.location && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <MapPin className="h-3 w-3" />
                  <span>{profile.location}</span>
                </div>
              )}
            </div>

            {profile.rating && (
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{profile.rating}</span>
              </div>
            )}
          </div>

          {/* Bio */}
          {profile.bio && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {profile.bio}
            </p>
          )}

          {/* Specialties */}
          {profile.specialties && profile.specialties.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {profile.specialties.slice(0, 3).map((specialty, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {specialty}
                </span>
              ))}
              {profile.specialties.length > 3 && (
                <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                  +{profile.specialties.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="flex justify-between text-center mb-4 py-2 border-y border-border/50">
            <div>
              <p className="font-semibold text-sm">{profile.followers_count || 0}</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
            <div>
              <p className="font-semibold text-sm">{profile.posts_count || 0}</p>
              <p className="text-xs text-muted-foreground">Posts</p>
            </div>
            <div>
              <p className="font-semibold text-sm">4.8</p>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <div className="flex gap-2">
              {profile.role === 'artist' && (
                <Button onClick={onBook} className="flex-1" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book
                </Button>
              )}
              <Button onClick={onMessage} variant="outline" className="flex-1" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={onFollow} variant="secondary" className="flex-1" size="sm">
                <Sparkles className="h-4 w-4 mr-2" />
                Follow
              </Button>
              <Button onClick={onInvite} variant="outline" className="flex-1" size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Invite
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-3 pt-3 border-t border-border/50">
            <p className="text-xs text-muted-foreground text-center">
              {profile.role === 'artist' 
                ? "Available for bookings • Quick response"
                : "Active community member • Loves to connect"
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfileHoverCard;