
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "sonner";

// Mock messages data
const messages = [
  {
    id: 1,
    name: "Jessica Miller",
    avatar: "https://i.pravatar.cc/100?img=5",
    message: "Hi, I'd like to book an appointment for next Tuesday if you're available.",
    time: "2h ago",
    unread: true
  },
  {
    id: 2,
    name: "David Thompson",
    avatar: "https://i.pravatar.cc/100?img=3",
    message: "Thanks for the amazing service yesterday! I've already received so many compliments.",
    time: "1d ago",
    unread: false
  },
  {
    id: 3,
    name: "Emma Davis",
    avatar: "https://i.pravatar.cc/100?img=9",
    message: "Quick question - do you have any availability this weekend?",
    time: "2d ago",
    unread: false
  }
];

const MessagesPreview = () => {
  const handleMessageClick = (messageId) => {
    toast.info("Message feature coming soon", { 
      description: "Full messaging functionality is under development.",
      duration: 3000
    });
  };

  return (
    <Card className="border-0 shadow-sm">
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
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className={`p-3 rounded-lg flex items-start space-x-3 cursor-pointer hover:opacity-90 transition-opacity ${
                message.unread ? "bg-purple-50 border border-purple-100" : "bg-gray-50 border border-gray-100"
              }`}
              onClick={() => handleMessageClick(message.id)}
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
          ))}
          
          <Button 
            variant="outline" 
            className="w-full mt-4" 
            onClick={() => {
              toast.info("Messages feature coming soon", {
                description: "Complete messaging system is in development.",
                duration: 3000
              });
            }}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            View All Messages
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default MessagesPreview;
