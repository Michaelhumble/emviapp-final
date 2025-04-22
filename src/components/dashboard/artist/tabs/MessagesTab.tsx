
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PaperPlaneIcon, Search, SmilePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

// Mock conversations data
const conversations = [
  {
    id: 1,
    name: "Jessica Miller",
    avatar: "https://i.pravatar.cc/150?img=5",
    lastMessage: "Hi, I'd like to book an appointment for next Tuesday if you're available.",
    timestamp: "2h ago",
    unread: true,
    online: true
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://i.pravatar.cc/150?img=3",
    lastMessage: "Thanks for the amazing service yesterday! I've already received so many compliments.",
    timestamp: "1d ago",
    unread: false,
    online: false
  },
  {
    id: 3,
    name: "Emma Davis",
    avatar: "https://i.pravatar.cc/150?img=9",
    lastMessage: "Quick question - do you have any availability this weekend?",
    timestamp: "2d ago",
    unread: false,
    online: true
  },
  {
    id: 4,
    name: "James Wilson",
    avatar: "https://i.pravatar.cc/150?img=4",
    lastMessage: "Perfect, I'll see you tomorrow at 2pm then. Thank you!",
    timestamp: "3d ago",
    unread: false,
    online: false
  },
  {
    id: 5,
    name: "Olivia Taylor",
    avatar: "https://i.pravatar.cc/150?img=8",
    lastMessage: "Do you have any examples of the marble design we discussed?",
    timestamp: "4d ago",
    unread: false,
    online: false
  }
];

// Mock messages for a selected conversation
const mockMessages = [
  {
    id: 1,
    sender: "client",
    content: "Hi, I'd like to book an appointment for next Tuesday if you're available.",
    timestamp: "2:30 PM"
  },
  {
    id: 2,
    sender: "artist",
    content: "Hello Jessica! I'd be happy to fit you in on Tuesday. I have openings at 10am, 1pm, and 3pm. Would any of those work for you?",
    timestamp: "2:35 PM"
  },
  {
    id: 3,
    sender: "client",
    content: "1pm would be perfect!",
    timestamp: "2:40 PM"
  },
  {
    id: 4,
    sender: "artist",
    content: "Great! I've reserved 1pm on Tuesday for you. Would you like the same design as last time or something different?",
    timestamp: "2:42 PM"
  },
  {
    id: 5,
    sender: "client",
    content: "I was thinking of trying something new. Do you have any designs with floral patterns?",
    timestamp: "2:45 PM"
  },
  {
    id: 6,
    sender: "artist",
    content: "Absolutely! I have several floral designs that would look beautiful. I'll send you some examples shortly.",
    timestamp: "2:47 PM"
  },
  {
    id: 7,
    sender: "artist",
    content: "Here are some of my recent floral designs. Let me know if any of these catch your eye!",
    timestamp: "2:50 PM",
    images: [
      "/lovable-uploads/67947adb-5754-4569-aa1c-228d8f9db461.png",
      "/lovable-uploads/70c8662a-4525-4854-a529-62616b5b6c81.png"
    ]
  },
  {
    id: 8,
    sender: "client",
    content: "Oh, I love the second one! That's exactly what I had in mind.",
    timestamp: "2:55 PM"
  }
];

const MessagesTab = () => {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // In a real app, we'd send the message to an API
      console.log("Sending message:", messageInput);
      setMessageInput("");
    }
  };
  
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-0">
        <div className="flex h-[600px]">
          {/* Conversations sidebar */}
          <div className="w-full sm:w-80 border-r">
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search messages..."
                  className="pl-9 h-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="overflow-y-auto h-[548px]">
              <AnimatePresence>
                {filteredConversations.map((conv) => (
                  <motion.div
                    key={conv.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`flex items-start p-3 cursor-pointer ${
                      selectedConversation.id === conv.id ? "bg-purple-50" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedConversation(conv)}
                  >
                    <div className="relative">
                      <img
                        src={conv.avatar}
                        alt={conv.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      {conv.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                      )}
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-sm">{conv.name}</h3>
                        <span className="text-xs text-gray-500">{conv.timestamp}</span>
                      </div>
                      <p className={`text-sm truncate ${conv.unread ? "font-medium text-gray-900" : "text-gray-500"}`}>
                        {conv.lastMessage}
                      </p>
                    </div>
                    {conv.unread && (
                      <span className="w-2 h-2 rounded-full bg-purple-500 ml-2 mt-2"></span>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Messages panel */}
          <div className="hidden sm:flex flex-col flex-1">
            {/* Conversation header */}
            <div className="p-3 border-b flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={selectedConversation.avatar}
                  alt={selectedConversation.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div className="ml-3">
                  <h3 className="font-medium">{selectedConversation.name}</h3>
                  <p className="text-xs text-gray-500">
                    {selectedConversation.online ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                View Profile
              </Button>
            </div>
            
            {/* Messages container */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "artist" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === "artist"
                        ? "bg-purple-100 text-purple-900"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    {message.images && (
                      <div className="mt-2 flex space-x-2">
                        {message.images.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`Shared image ${index + 1}`}
                            className="h-20 w-20 object-cover rounded-lg border border-white"
                          />
                        ))}
                      </div>
                    )}
                    <span className="text-xs text-gray-500 mt-1 block text-right">
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Message input */}
            <div className="p-3 border-t flex items-center">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <SmilePlus className="h-5 w-5 text-gray-500" />
              </Button>
              <Input
                placeholder="Type your message..."
                className="mx-2"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button
                size="icon"
                className="h-9 w-9"
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
              >
                <PaperPlaneIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Mobile message placeholder */}
          <div className="flex-1 sm:hidden flex flex-col items-center justify-center text-center p-6">
            <MessageSquareIcon className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">Select a conversation</h3>
            <p className="text-gray-500 mb-4 max-w-xs">
              Choose a conversation from the sidebar to view and respond to messages
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const MessageSquareIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

export default MessagesTab;
