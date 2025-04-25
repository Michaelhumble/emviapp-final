
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquareReply } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function MessagesPreview() {
  const { userProfile } = useAuth();
  const { toast } = useToast();
  const isNewArtist = !userProfile?.profile_completion || userProfile.profile_completion < 60;

  const welcomeMessages = [
    {
      id: 1,
      name: "EmviApp Team",
      avatar: "/lovable-uploads/emvi-team-avatar.png",
      message: "Welcome to EmviApp! We're excited to have you join our community of talented artists.",
      time: "just now",
      unread: true
    },
    {
      id: 2,
      name: "EmviApp Support",
      avatar: "/lovable-uploads/emvi-support-avatar.png",
      message: "Need help getting started? Reach out anytime - we're here to help you succeed!",
      time: "just now",
      unread: false
    },
    {
      id: 3,
      name: "Client Services",
      avatar: "/lovable-uploads/emvi-client-avatar.png",
      message: "Complete your profile to appear in client searches! Profiles with photos receive 5x more bookings.",
      time: "5 min ago",
      unread: true
    }
  ];

  const messages = isNewArtist ? welcomeMessages : [];

  return (
    <Card className="bg-gradient-to-br from-white via-purple-50 to-pink-50 border-0 shadow-sm rounded-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Recent Messages</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {messages.length > 0 ? (
            messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className={`p-3 rounded-lg flex items-start space-x-3 cursor-pointer hover:opacity-90 transition-opacity ${
                  message.unread ? "bg-purple-50 border border-purple-100" : "bg-gray-50 border border-gray-100"
                }`}
                onClick={() => {
                  toast({
                    title: "Message feature coming soon",
                    description: "Full messaging functionality is under development.",
                    duration: 3000
                  });
                }}
              >
                <img
                  src={message.avatar}
                  alt={message.name}
                  className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium truncate text-sm">{message.name}</h3>
                    <span className="text-xs text-gray-500 flex-shrink-0">{message.time}</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">{message.message}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-gray-500"
            >
              <p>No messages yet. Your client communications will appear here.</p>
            </motion.div>
          )}
          
          <Button 
            variant="outline" 
            className="w-full mt-4" 
            onClick={() => {
              toast({
                title: "Messages feature coming soon",
                description: "Complete messaging system is in development.",
                duration: 3000
              });
            }}
          >
            <MessageSquareReply className="h-4 w-4 mr-2" />
            View All Messages
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
}
