
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ArtistMessagesPreview = () => {
  // Mock messages data
  const messages = [
    {
      id: 1,
      sender: {
        name: "Emma Wilson",
        avatar: "https://randomuser.me/api/portraits/women/33.jpg"
      },
      message: "Hi, I'd like to book an appointment for gel nails next Tuesday if possible?",
      time: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      sender: {
        name: "Michael Chen",
        avatar: "https://randomuser.me/api/portraits/men/54.jpg"
      },
      message: "Thanks for the amazing work yesterday! My wife absolutely loves her nails.",
      time: "1 day ago",
      unread: false
    }
  ];

  return (
    <Card className="border-gray-100 shadow-sm h-full">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium text-gray-900 flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-purple-500" />
          Recent Messages
        </CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/messages" className="flex items-center">
            All Messages <ExternalLink className="ml-1 h-3.5 w-3.5" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`p-4 rounded-lg border ${message.unread ? 'bg-purple-50 border-purple-100' : 'bg-gray-50 border-gray-100'}`}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage 
                    src={message.sender.avatar} 
                    alt={message.sender.name} 
                  />
                  <AvatarFallback>
                    {message.sender.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900 truncate">{message.sender.name}</h4>
                    <span className="text-xs text-gray-500">{message.time}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-1 truncate">{message.message}</p>
                </div>
              </div>
              
              {message.unread && (
                <div className="flex justify-end mt-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <Button variant="outline" size="sm" asChild>
            <Link to="/messages">
              Reply to Messages
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistMessagesPreview;
