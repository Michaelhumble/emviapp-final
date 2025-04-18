import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Search, ChevronRight, ArrowRight, CheckCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { format } from "date-fns";
import { useSupport } from '@/hooks/chat/useSupport';

const mockMessages = [
  {
    id: "1",
    sender: {
      id: "u1",
      name: "Jessica Lee",
      avatar: null,
      type: "customer"
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
      type: "staff"
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
      type: "customer"
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
      type: "customer"
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
      type: "staff"
    },
    content: "Just to let you know I'm fully booked for Friday already. Can you update the schedule?",
    timestamp: new Date(2025, 3, 10, 10, 30), // April 10, 2025, 10:30 AM
    isRead: true,
    isReplied: true
  }
];

const SalonMessagingCenter = () => {
  useSupport();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<typeof mockMessages[0] | null>(null);
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [replyText, setReplyText] = useState("");

  const filteredMessages = mockMessages.filter(message => 
    message.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = mockMessages.filter(message => !message.isRead).length;

  const formatMessageTime = (date: Date) => {
    const today = new Date();
    const isToday = date.getDate() === today.getDate() && 
                    date.getMonth() === today.getMonth() && 
                    date.getFullYear() === today.getFullYear();
    
    if (isToday) {
      return format(date, "h:mm a"); // e.g., "3:21 PM"
    }
    
    return format(date, "MMM d, h:mm a"); // e.g., "Apr 9, 3:21 PM"
  };

  const handleMarkAsRead = (messageId: string) => {
    toast.success("Message marked as read");
    // In a real implementation, this would update the message status in Supabase
  };

  const handleOpenReplyDialog = (message: typeof mockMessages[0]) => {
    setSelectedMessage(message);
    setIsReplyDialogOpen(true);
  };

  const handleSendReply = () => {
    if (!replyText.trim()) {
      toast.error("Please enter a message");
      return;
    }
    
    toast.success(`Reply sent to ${selectedMessage?.sender.name}`);
    setIsReplyDialogOpen(false);
    setReplyText("");
    // In a real implementation, this would send the reply to Supabase
  };

  return (
    <Card className="border-blue-100">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center">
          <MessageSquare className="h-5 w-5 text-blue-500 mr-2" />
          Messaging Center
          {unreadCount > 0 && (
            <Badge className="ml-2 bg-red-500">{unreadCount} unread</Badge>
          )}
        </CardTitle>
        <Button size="sm" variant="outline">
          Inbox Settings
        </Button>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search messages..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Messages list */}
          <div className="space-y-2">
            {filteredMessages.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <MessageSquare className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                <p>No messages found</p>
              </div>
            ) : (
              filteredMessages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex items-start p-3 rounded-lg border ${
                    message.isRead ? 'bg-white' : 'bg-blue-50'
                  } hover:bg-gray-50 cursor-pointer`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={message.sender.avatar || ''} alt={message.sender.name} />
                    <AvatarFallback className={
                      message.sender.type === 'staff' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                    }>
                      {message.sender.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <p className={`font-medium ${!message.isRead ? 'text-blue-700' : ''}`}>
                          {message.sender.name}
                        </p>
                        {message.sender.type === 'staff' && (
                          <Badge variant="outline" className="ml-2 bg-purple-50 text-purple-700 border-purple-200">
                            Staff
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">{formatMessageTime(message.timestamp)}</span>
                    </div>
                    
                    <p className={`text-sm mt-1 truncate ${!message.isRead ? 'font-medium' : 'text-gray-600'}`}>
                      {message.content}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        {message.isReplied && (
                          <Badge variant="outline" className="text-xs text-green-600 bg-green-50 border-green-200">
                            Replied
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex gap-1">
                        {!message.isRead && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 px-2 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMarkAsRead(message.id);
                            }}
                          >
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Mark Read
                          </Button>
                        )}
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenReplyDialog(message);
                          }}
                        >
                          <ArrowRight className="h-3 w-3 mr-1" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
      
      {/* Reply Dialog */}
      <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reply to {selectedMessage?.sender.name}</DialogTitle>
          </DialogHeader>
          
          {selectedMessage && (
            <div className="mb-4 p-3 bg-gray-50 rounded-md text-sm border border-gray-200">
              <div className="flex items-center mb-1">
                <span className="font-medium mr-2">{selectedMessage.sender.name}</span>
                <span className="text-xs text-gray-500">{formatMessageTime(selectedMessage.timestamp)}</span>
              </div>
              <p className="text-gray-700">{selectedMessage.content}</p>
            </div>
          )}
          
          <Textarea
            placeholder="Type your reply here..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="min-h-[120px]"
          />
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSendReply}>
              Send Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default SalonMessagingCenter;
