
import React from 'react';
import { UserProfile } from '@/types/profile';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import { MapPin, Sparkles } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { getInitials } from '@/utils/userUtils';
import { motion } from 'framer-motion';
import ProAccessGate from '@/components/pro-access/ProAccessGate';
import { useAuth } from '@/context/auth';

interface ArtistGridProps {
  artists: UserProfile[];
  isLoading: boolean;
  error: Error | null;
}

const ArtistGrid: React.FC<ArtistGridProps> = ({ artists, isLoading, error }) => {
  const { userRole } = useAuth();
  const isSalonOwner = userRole === 'salon' || userRole === 'owner';

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">Error loading artists</h3>
        <p className="text-muted-foreground">{error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
            <div className="px-6 pb-6">
              <Skeleton className="h-10 w-full rounded" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (artists.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No artists found</h3>
        <p className="text-muted-foreground mb-6">Try adjusting your filters</p>
      </div>
    );
  }

  // Check if profile is boosted
  const isBoosted = (artist: UserProfile): boolean => {
    if (!artist.boosted_until) return false;
    return new Date(artist.boosted_until) > new Date();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {artists.map((artist) => (
        <motion.div key={artist.id} variants={cardVariants}>
          <Card className="overflow-hidden h-full flex flex-col border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-md group">
            <CardContent className="p-6 pb-0 flex-grow">
              <div className="flex items-start mb-4">
                <Avatar className="h-16 w-16 mr-4 rounded-full border-2 border-border/50 group-hover:border-primary/50 transition-colors">
                  <AvatarImage src={artist.avatar_url || ''} alt={artist.full_name || 'Artist'} />
                  <AvatarFallback>{getInitials(artist.full_name || '')}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-lg leading-tight">{artist.full_name}</h3>
                    {isBoosted(artist) && (
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 flex items-center">
                        <Sparkles className="h-3 w-3 mr-1" /> Boosted
                      </Badge>
                    )}
                  </div>
                  
                  {artist.specialty && (
                    <p className="text-sm text-muted-foreground">{artist.specialty}</p>
                  )}
                  
                  {artist.location && (
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      {isSalonOwner ? (
                        <ProAccessGate>
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" /> {artist.location}
                          </div>
                        </ProAccessGate>
                      ) : (
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" /> {artist.location}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              {artist.bio && (
                <p className="text-sm line-clamp-3 text-muted-foreground">{artist.bio}</p>
              )}
            </CardContent>
            
            <CardFooter className="p-6 pt-4">
              <Button asChild className="w-full">
                <Link to={`/u/${artist.id}`}>View Profile</Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ArtistGrid;
