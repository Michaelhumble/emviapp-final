
import { useState } from "react";
import { useAuth } from "@/context/auth";
import { Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, User } from "lucide-react";
import PremiumFeatureGate from "@/components/upgrade/PremiumFeatureGate";
import { useSubscription } from "@/context/subscription";

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

const Messaging = () => {
  const { user } = useAuth();
  const { hasActiveSubscription } = useSubscription();
  const [message, setMessage] = useState("");
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Amy Johnson",
      content: "Hi there! I saw your profile and I'm interested in booking you for a haircut next week.",
      timestamp: new Date(Date.now() - 1000 * 60 * 24),
      isCurrentUser: false,
    },
    {
      id: 2,
      sender: "You",
      content: "Hi Amy! I'd be happy to schedule you in. What day works best for you?",
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      isCurrentUser: true,
    },
    {
      id: 3,
      sender: "Amy Johnson",
      content: "Would Tuesday around 2pm work?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      isCurrentUser: false,
    },
  ]);

  if (!user) {
    return <Navigate to="/auth/signin" replace />;
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Free users can't send messages (handled by PremiumFeatureGate)
    if (!hasActiveSubscription) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: "You",
      content: message,
      timestamp: new Date(),
      isCurrentUser: true,
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const contacts = [
    { id: 1, name: "Amy Johnson", unread: true },
    { id: 2, name: "Michael Smith", unread: false },
    { id: 3, name: "Sophia Lee", unread: false },
    { id: 4, name: "Glamour Salon", unread: false },
    { id: 5, name: "Beauty Boutique", unread: false },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Messages</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contacts sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">Conversations</h2>
              <Input 
                placeholder="Search contacts..." 
                className="mb-4"
              />
              <div className="space-y-2">
                {contacts.map((contact) => (
                  <PremiumFeatureGate 
                    key={contact.id} 
                    feature="messaging"
                  >
                    <div 
                      className={`p-3 rounded-lg flex items-center cursor-pointer ${
                        contact.id === 1 ? 'bg-primary/10' : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className={`${contact.unread ? 'font-semibold' : ''}`}>{contact.name}</p>
                        </div>
                        {contact.unread && (
                          <span className="w-2 h-2 bg-primary rounded-full inline-block"></span>
                        )}
                      </div>
                    </div>
                  </PremiumFeatureGate>
                ))}
              </div>
            </div>
          </div>
          
          {/* Message area */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow flex flex-col h-[600px]">
              {/* Conversation header */}
              <div className="p-4 border-b flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Amy Johnson</h3>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
              </div>
              
              {/* Messages container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div 
                    key={msg.id}
                    className={`flex ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.isCurrentUser 
                          ? 'bg-primary text-white rounded-tr-none' 
                          : 'bg-gray-100 rounded-tl-none'
                      }`}
                    >
                      <p>{msg.content}</p>
                      <p className={`text-xs mt-1 ${msg.isCurrentUser ? 'text-white/70' : 'text-gray-500'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Message input */}
              <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input 
                    placeholder="Type a message..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                  />
                  <PremiumFeatureGate feature="messaging">
                    <Button type="submit" size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </PremiumFeatureGate>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Messaging;
