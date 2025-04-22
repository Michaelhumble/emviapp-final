
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, ExternalLink, Reply } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ArtistMessagesPreview = () => {
  // Mock messages data
  const messages = [
    {
      id: 1,
      sender: "Emma Thompson",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      message: "Hi! I'd love to book you for a nail appointment next week. Do you have any availability on Tuesday?",
      time: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      sender: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/91.jpg",
      message: "Thanks for the amazing service yesterday! I've already recommended you to my friends.",
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
              <div className="flex items-start mb-2">
                <img 
                  src={message.avatar} 
                  alt={message.sender} 
                  className="w-8 h-8 rounded-full mr-3 object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-900">{message.sender}</h4>
                    <span className="text-xs text-gray-500">{message.time}</span>
                  </div>
                  <p className="text-gray-700 text-sm mt-1 line-clamp-2">{message.message}</p>
                  
                  <div className="mt-2 flex justify-end">
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs text-purple-600 hover:text-purple-700">
                      <Reply className="h-3.5 w-3.5 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistMessagesPreview;
