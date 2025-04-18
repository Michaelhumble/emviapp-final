
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MessageSquare, Check } from "lucide-react";
import MessagesList from "./MessagesList";
import MessageView from "./MessageView";

// Mock data for preview - this would come from your backend in production
const mockMessages = [
  {
    id: "1",
    sender: {
      id: "u1",
      name: "Jessica Lee",
      avatar: null,
      type: "customer" as const
    },
    content: "Hi, I would like to know if you have any appointments available for next Friday?",
    timestamp: new Date(2025, 3, 8, 15, 21), // April 8, 2025, 3:21 PM
    isRead: true,
    isReplied: true
  },
  {
    id: "2",
    sender: {
      id: "u2",
      name: "Tina Stylist",
      avatar: null,
      type: "artist" as const
    },
    content: "I won't be available tomorrow for my appointments, can you reschedule my clients?",
    timestamp: new Date(2025, 3, 9, 9, 15), // April 9, 2025, 9:15 AM
    isRead: true,
    isReplied: false
  },
  {
    id: "3",
    sender: {
      id: "u3",
      name: "Michael Brown",
      avatar: null,
      type: "customer" as const
    },
    content: "I need to cancel my appointment for today at 2:30 PM. Sorry for the late notice.",
    timestamp: new Date(2025, 3, 10, 8, 42), // April 10, 2025, 8:42 AM
    isRead: false,
    isReplied: false
  },
  {
    id: "4",
    sender: {
      id: "u4",
      name: "Sarah Wilson",
      avatar: null,
      type: "customer" as const
    },
    content: "Do you carry any vegan nail polish options? I'm looking for something eco-friendly.",
    timestamp: new Date(2025, 3, 9, 14, 10), // April 9, 2025, 2:10 PM
    isRead: false,
    isReplied: false
  },
  {
    id: "5",
    sender: {
      id: "u5",
      name: "Laura Nail Tech",
      avatar: null,
      type: "staff" as const
    },
    content: "Just to let you know I'm fully booked for Friday already. Can you update the schedule?",
    timestamp: new Date(2025, 3, 10, 10, 30), // April 10, 2025, 10:30 AM
    isRead: true,
    isReplied: true
  }
];

const MessagesTab = () => {
  const [selectedMessageId, setSelectedMessageId] = React.useState<string | null>(null);
  const [filter, setFilter] = React.useState<"all" | "unread" | "clients" | "artists">("all");
  const [messages, setMessages] = React.useState(mockMessages);

  const selectedMessage = messages.find(m => m.id === selectedMessageId);

  const handleMarkAsRead = (messageId: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, isRead: true } : msg
    ));
  };

  const handleSendReply = (messageId: string, content: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, isReplied: true } : msg
    ));
    // Here you would also send the reply to your backend
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-blue-500" />
            <CardTitle>Messages</CardTitle>
          </div>
          <Button variant="outline" size="sm" onClick={() => handleMarkAsRead(selectedMessageId!)}>
            <Check className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Tabs value={filter} onValueChange={(value: any) => setFilter(value)} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">Unread</TabsTrigger>
                  <TabsTrigger value="clients">Clients</TabsTrigger>
                  <TabsTrigger value="artists">Artists</TabsTrigger>
                </TabsList>
              </Tabs>

              <MessagesList
                messages={messages}
                selectedMessageId={selectedMessageId}
                onMessageSelect={(message) => setSelectedMessageId(message.id)}
                filter={filter}
              />
            </div>

            <div className="h-[600px]">
              <MessageView
                message={selectedMessage}
                onMarkAsRead={handleMarkAsRead}
                onSendReply={handleSendReply}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagesTab;
