
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MessageCircle, 
  Send, 
  Search, 
  Clock, 
  CheckCircle, 
  User,
  Loader2
} from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: string;
  sender_id: string;
  sender_name: string;
  sender_avatar?: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

interface Conversation {
  id: string;
  participant_id: string;
  participant_name: string;
  participant_avatar?: string;
  last_message?: string;
  last_message_time?: Date;
  unread_count: number;
}

const ArtistMessageCenter = () => {
  const { userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data - would be fetched from API
  const conversations: Conversation[] = [
    {
      id: "1",
      participant_id: "user1",
      participant_name: "Sarah Johnson",
      participant_avatar: "",
      last_message: "When can I book an appointment?",
      last_message_time: new Date(Date.now() - 25 * 60000),
      unread_count: 2
    },
    {
      id: "2",
      participant_id: "user2",
      participant_name: "Mike Davis",
      participant_avatar: "",
      last_message: "Thanks for the beautiful nails!",
      last_message_time: new Date(Date.now() - 2 * 3600000),
      unread_count: 0
    },
    {
      id: "3",
      participant_id: "user3",
      participant_name: "Jessica Wong",
      participant_avatar: "",
      last_message: "Just sent a request for next Friday",
      last_message_time: new Date(Date.now() - 24 * 3600000),
      unread_count: 1
    }
  ];
  
  const mockMessages: Record<string, Message[]> = {
    "1": [
      {
        id: "msg1",
        sender_id: "user1",
        sender_name: "Sarah Johnson",
        content: "Hi! I love your work on Instagram.",
        timestamp: new Date(Date.now() - 60 * 60000),
        read: true
      },
      {
        id: "msg2",
        sender_id: userProfile?.id || "me",
        sender_name: userProfile?.full_name || "Me",
        content: "Thank you! That's very kind of you.",
        timestamp: new Date(Date.now() - 59 * 60000),
        read: true
      },
      {
        id: "msg3",
        sender_id: "user1",
        sender_name: "Sarah Johnson",
        content: "I'd like to get a nail design like the one you posted last week.",
        timestamp: new Date(Date.now() - 30 * 60000),
        read: true
      },
      {
        id: "msg4",
        sender_id: "user1",
        sender_name: "Sarah Johnson",
        content: "When can I book an appointment?",
        timestamp: new Date(Date.now() - 25 * 60000),
        read: false
      }
    ],
    "2": [
      {
        id: "msg5",
        sender_id: "user2",
        sender_name: "Mike Davis",
        content: "Just had my appointment today. Great job!",
        timestamp: new Date(Date.now() - 3 * 3600000),
        read: true
      },
      {
        id: "msg6",
        sender_id: userProfile?.id || "me",
        sender_name: userProfile?.full_name || "Me",
        content: "I'm glad you liked it! Thank you for coming in.",
        timestamp: new Date(Date.now() - 2.5 * 3600000),
        read: true
      },
      {
        id: "msg7",
        sender_id: "user2",
        sender_name: "Mike Davis",
        content: "Thanks for the beautiful nails!",
        timestamp: new Date(Date.now() - 2 * 3600000),
        read: true
      }
    ],
    "3": [
      {
        id: "msg8",
        sender_id: "user3",
        sender_name: "Jessica Wong",
        content: "Hello, I'm interested in your nail art services",
        timestamp: new Date(Date.now() - 48 * 3600000),
        read: true
      },
      {
        id: "msg9",
        sender_id: userProfile?.id || "me",
        sender_name: userProfile?.full_name || "Me",
        content: "Hi Jessica! I'd be happy to help. What kind of design are you looking for?",
        timestamp: new Date(Date.now() - 36 * 3600000),
        read: true
      },
      {
        id: "msg10",
        sender_id: "user3",
        sender_name: "Jessica Wong",
        content: "Just sent a request for next Friday",
        timestamp: new Date(Date.now() - 24 * 3600000),
        read: false
      }
    ]
  };
  
  // Load messages when conversation is selected
  useEffect(() => {
    if (selectedConversation) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setMessages(mockMessages[selectedConversation.id] || []);
        setLoading(false);
      }, 500);
    }
  }, [selectedConversation]);
  
  const sendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return;
    
    // Create new message
    const newMessage: Message = {
      id: `new-${Date.now()}`,
      sender_id: userProfile?.id || "me",
      sender_name: userProfile?.full_name || "Me",
      sender_avatar: userProfile?.avatar_url,
      content: messageText,
      timestamp: new Date(),
      read: true
    };
    
    // Add to messages
    setMessages(prev => [...prev, newMessage]);
    setMessageText("");
    
    // In a real app, would send to API
  };
  
  // Filter conversations by search query
  const filteredConversations = conversations.filter(conv => 
    conv.participant_name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Format timestamp for display
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = (now.getTime() - date.getTime()) / 1000 / 60; // minutes
    
    if (diff < 1) return "Just now";
    if (diff < 60) return `${Math.floor(diff)}m ago`;
    if (diff < 24 * 60) return `${Math.floor(diff / 60)}h ago`;
    
    return format(date, "MM/dd/yyyy");
  };
  
  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <MessageCircle className="mr-2 h-5 w-5 text-primary" />
          Messages
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row h-[600px]">
          {/* Conversations List */}
          <div className="w-full md:w-1/3 border-r">
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="overflow-y-auto h-[calc(600px-57px)]">
              {filteredConversations.length > 0 ? (
                filteredConversations.map(conv => (
                  <div 
                    key={conv.id} 
                    className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                      selectedConversation?.id === conv.id ? "bg-gray-50" : ""
                    }`}
                    onClick={() => setSelectedConversation(conv)}
                  >
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={conv.participant_avatar || ""} />
                        <AvatarFallback>{getInitials(conv.participant_name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium truncate">{conv.participant_name}</h4>
                          {conv.last_message_time && (
                            <span className="text-xs text-gray-500">
                              {formatTime(conv.last_message_time)}
                            </span>
                          )}
                        </div>
                        {conv.last_message && (
                          <p className="text-sm text-gray-500 truncate">{conv.last_message}</p>
                        )}
                      </div>
                      {conv.unread_count > 0 && (
                        <div className="ml-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {conv.unread_count}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No conversations found
                </div>
              )}
            </div>
          </div>
          
          {/* Messages Area */}
          <div className="flex-1 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Conversation Header */}
                <div className="p-3 border-b flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={selectedConversation.participant_avatar || ""} />
                    <AvatarFallback>{getInitials(selectedConversation.participant_name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedConversation.participant_name}</h3>
                    <div className="flex items-center">
                      <span className="flex h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                      <span className="text-xs text-gray-500">Online</span>
                    </div>
                  </div>
                </div>
                
                {/* Messages */}
                {loading ? (
                  <div className="flex-1 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                  </div>
                ) : (
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map(message => {
                      const isMe = message.sender_id === userProfile?.id || message.sender_id === "me";
                      
                      return (
                        <div 
                          key={message.id}
                          className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                        >
                          <div 
                            className={`max-w-[80%] rounded-lg px-3 py-2 ${
                              isMe 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-gray-100"
                            }`}
                          >
                            <div className="text-sm">{message.content}</div>
                            <div className="flex items-center justify-end mt-1">
                              <span className="text-xs text-gray-400">
                                {formatTime(message.timestamp)}
                              </span>
                              {isMe && (
                                <CheckCircle className={`h-3 w-3 ml-1 ${
                                  message.read ? "text-green-500" : "text-gray-400"
                                }`} />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                {/* Message Input */}
                <div className="p-3 border-t">
                  <div className="flex items-center">
                    <Input
                      placeholder="Type a message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                      className="rounded-r-none"
                    />
                    <Button 
                      className="rounded-l-none" 
                      onClick={sendMessage}
                      disabled={!messageText.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <MessageCircle className="h-12 w-12 text-gray-300 mb-3" />
                <h3 className="text-lg font-medium mb-1">Your Messages</h3>
                <p className="text-gray-500 mb-4 max-w-md">
                  Select a conversation to start messaging. Your clients can contact you directly through the app.
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistMessageCenter;
