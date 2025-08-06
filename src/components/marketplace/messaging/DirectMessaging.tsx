import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Send, 
  Phone, 
  Video, 
  MoreHorizontal, 
  Paperclip, 
  Calendar,
  MapPin,
  Clock,
  Check,
  CheckCheck,
  Image as ImageIcon
} from 'lucide-react';
import { format } from 'date-fns';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'booking' | 'system';
  status: 'sent' | 'delivered' | 'read';
  attachments?: Array<{
    type: 'image' | 'file';
    url: string;
    name: string;
  }>;
  bookingData?: {
    serviceId: string;
    serviceName: string;
    date: string;
    time: string;
    price: number;
    status: 'pending' | 'confirmed' | 'cancelled';
  };
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  participantRole: 'artist' | 'customer' | 'salon';
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
  isTyping: boolean;
}

interface DirectMessagingProps {
  currentUserId: string;
  selectedConversationId?: string;
  onConversationSelect: (conversationId: string) => void;
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    participantId: 'artist-1',
    participantName: 'Sofia Chen',
    participantAvatar: '/api/placeholder/40/40',
    participantRole: 'artist',
    lastMessage: 'Thank you! Looking forward to your appointment on Friday.',
    lastMessageTime: new Date(Date.now() - 300000), // 5 minutes ago
    unreadCount: 0,
    isOnline: true,
    isTyping: false
  },
  {
    id: '2',
    participantId: 'customer-1',
    participantName: 'Emma Johnson',
    participantAvatar: '/api/placeholder/40/40',
    participantRole: 'customer',
    lastMessage: 'Hi! I would like to book a manicure appointment.',
    lastMessageTime: new Date(Date.now() - 1800000), // 30 minutes ago
    unreadCount: 2,
    isOnline: false,
    isTyping: false
  },
  {
    id: '3',
    participantId: 'salon-1',
    participantName: 'Luxe Beauty Salon',
    participantAvatar: '/api/placeholder/40/40',
    participantRole: 'salon',
    lastMessage: 'Your booking has been confirmed for tomorrow at 2 PM.',
    lastMessageTime: new Date(Date.now() - 3600000), // 1 hour ago
    unreadCount: 1,
    isOnline: true,
    isTyping: false
  }
];

const mockMessages: { [key: string]: Message[] } = {
  '1': [
    {
      id: '1',
      senderId: 'artist-1',
      content: 'Hi! Thank you for booking with me. I\'m excited to work with you.',
      timestamp: new Date(Date.now() - 3600000),
      type: 'text',
      status: 'read'
    },
    {
      id: '2',
      senderId: 'current-user',
      content: 'Thank you! I\'m looking forward to it too. What should I expect for the appointment?',
      timestamp: new Date(Date.now() - 3300000),
      type: 'text',
      status: 'read'
    },
    {
      id: '3',
      senderId: 'artist-1',
      content: 'I\'ll prepare everything we discussed. Please arrive 5 minutes early so we can start on time.',
      timestamp: new Date(Date.now() - 1800000),
      type: 'text',
      status: 'read'
    },
    {
      id: '4',
      senderId: 'current-user',
      content: 'Perfect! See you on Friday.',
      timestamp: new Date(Date.now() - 600000),
      type: 'text',
      status: 'read'
    },
    {
      id: '5',
      senderId: 'artist-1',
      content: 'Thank you! Looking forward to your appointment on Friday.',
      timestamp: new Date(Date.now() - 300000),
      type: 'text',
      status: 'delivered'
    }
  ]
};

const DirectMessaging: React.FC<DirectMessagingProps> = ({
  currentUserId,
  selectedConversationId,
  onConversationSelect
}) => {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [messages, setMessages] = useState<Message[]>(
    selectedConversationId ? mockMessages[selectedConversationId] || [] : []
  );
  const [newMessage, setNewMessage] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(
    selectedConversationId ? conversations.find(c => c.id === selectedConversationId) || null : null
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedConversationId) {
      const conversation = conversations.find(c => c.id === selectedConversationId);
      setSelectedConversation(conversation || null);
      setMessages(mockMessages[selectedConversationId] || []);
    }
  }, [selectedConversationId, conversations]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      content: newMessage.trim(),
      timestamp: new Date(),
      type: 'text',
      status: 'sent'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Update conversation last message
    setConversations(prev => prev.map(conv =>
      conv.id === selectedConversation.id
        ? { ...conv, lastMessage: message.content, lastMessageTime: message.timestamp }
        : conv
    ));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - timestamp.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return format(timestamp, 'HH:mm');
    } else if (diffInHours < 24) {
      return format(timestamp, 'HH:mm');
    } else {
      return format(timestamp, 'MMM d, HH:mm');
    }
  };

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Check className="h-3 w-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="h-3 w-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="h-3 w-3 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-[600px] bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <motion.div
              key={conversation.id}
              whileHover={{ backgroundColor: '#f9fafb' }}
              className={`p-4 cursor-pointer border-b border-gray-100 ${
                selectedConversation?.id === conversation.id ? 'bg-purple-50' : ''
              }`}
              onClick={() => onConversationSelect(conversation.id)}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={conversation.participantAvatar} />
                    <AvatarFallback>{conversation.participantName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {conversation.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 truncate">
                      {conversation.participantName}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {formatTime(conversation.lastMessageTime)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate flex-1">
                      {conversation.isTyping ? (
                        <span className="text-purple-600 italic">typing...</span>
                      ) : (
                        conversation.lastMessage
                      )}
                    </p>
                    {conversation.unreadCount > 0 && (
                      <Badge className="bg-purple-600 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>
                  
                  <Badge variant="outline" className="text-xs mt-1">
                    {conversation.participantRole}
                  </Badge>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedConversation.participantAvatar} />
                      <AvatarFallback>{selectedConversation.participantName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {selectedConversation.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {selectedConversation.participantName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedConversation.isOnline ? 'Active now' : 'Last seen recently'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${
                      message.senderId === currentUserId ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.senderId === currentUserId
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <div className={`flex items-center justify-between mt-1 ${
                        message.senderId === currentUserId ? 'text-purple-200' : 'text-gray-500'
                      }`}>
                        <span className="text-xs">{formatTime(message.timestamp)}</span>
                        {message.senderId === currentUserId && (
                          <div className="ml-2">
                            {getMessageStatusIcon(message.status)}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Calendar className="h-4 w-4" />
                </Button>
                
                <div className="flex-1">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="border-0 bg-gray-100 focus:bg-white transition-colors"
                  />
                </div>
                
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-600">
                Choose a conversation from the list to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DirectMessaging;