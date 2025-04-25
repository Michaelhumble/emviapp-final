
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, ExternalLink, Reply, Star, Quote, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNewArtistStatus } from "@/hooks/useNewArtistStatus";

const ArtistActivityFeed = () => {
  const isNewArtist = useNewArtistStatus();
  
  // Mock activity data combining messages and reviews - always show for new artists
  const activities = [
    {
      id: 1,
      type: 'message',
      sender: "Emma Thompson",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      content: "Hi! I'd love to book you for a nail appointment next week. Do you have any availability on Tuesday?",
      time: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      type: 'review',
      sender: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      content: "Amazing work! My nails have never looked better. The attention to detail is incredible!",
      rating: 5,
      time: "3 days ago"
    },
    {
      id: 3,
      type: 'message',
      sender: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/91.jpg",
      content: "Thanks for the amazing service yesterday! I've already recommended you to my friends.",
      time: "1 day ago",
      unread: false
    }
  ];

  return (
    <Card className="border-0 shadow-sm h-full">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium text-gray-900 flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-purple-500" />
          Client Activity
        </CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/messages" className="flex items-center">
            All Messages <ExternalLink className="ml-1 h-3.5 w-3.5" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        {isNewArtist ? (
          <div className="space-y-4">
            {activities.map((activity) => (
              <motion.div
                key={activity.id}
                className={`p-4 rounded-lg border ${
                  activity.type === 'message'
                    ? activity.unread
                      ? 'bg-purple-50 border-purple-100'
                      : 'bg-gray-50 border-gray-100'
                    : 'bg-amber-50 border-amber-100'
                }`}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                <div className="flex items-start">
                  <img 
                    src={activity.avatar} 
                    alt={activity.sender} 
                    className="w-8 h-8 rounded-full mr-3 object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-gray-900">{activity.sender}</h4>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                    
                    {activity.type === 'review' && (
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3 w-3 ${i < activity.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    )}
                    
                    <div className="relative mt-2">
                      {activity.type === 'review' && (
                        <Quote className="absolute -top-1 -left-1 h-4 w-4 text-amber-200 rotate-180" />
                      )}
                      <p className={`text-gray-700 text-sm ${activity.type === 'review' ? 'pl-3' : ''} line-clamp-2`}>
                        {activity.content}
                      </p>
                    </div>
                    
                    {activity.type === 'message' && (
                      <div className="mt-2 flex justify-end">
                        <Button variant="ghost" size="sm" className="h-8 px-2 text-xs text-purple-600 hover:text-purple-700">
                          <Reply className="h-3.5 w-3.5 mr-1" />
                          Reply
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            <p className="text-xs text-center mt-4 text-muted-foreground italic">
              Example data shown
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground/50 mb-2" />
            <p className="text-muted-foreground mb-1">No client activity yet</p>
            <p className="text-sm text-muted-foreground/70 max-w-xs mx-auto">
              Complete your profile to start connecting with clients. Activity will appear here once you begin interacting.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ArtistActivityFeed;
