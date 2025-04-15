import { useState, useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { ChatHeader } from './ChatHeader';
import { useAssistant } from '@/hooks/useAssistant';
import { BookingMatch } from '@/services/assistantService';
import { processAiResponse } from '@/utils/aiResponseProcessor';
import { useAuth } from '@/context/auth';
import { MessageType } from './types';

interface ChatWindowProps {
  onClose: () => void;
}

const ChatWindow = ({ onClose }: ChatWindowProps) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { generateResponse, isLoading, matches, createBooking } = useAssistant();
  const { user } = useAuth();
  
  useEffect(() => {
    const initialMessage: MessageType = {
      id: 'welcome-1',
      content: "Hi there! I'm your EmviApp assistant. How can I help you today? I can find artists, book appointments, or answer questions about salon services.",
      sender: 'assistant',
      timestamp: new Date(),
      actionSuggestions: [
        { id: "find-artists", label: "Find Artists", icon: "users", href: "/artists" },
        { id: "book-now", label: "Book Now", icon: "calendar", href: "/artists" },
        { id: "salon-sales", label: "Salon Sales", icon: "store", href: "/salon-sales" }
      ]
    };
    
    setMessages([initialMessage]);
  }, []);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    const userMessage: MessageType = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    setIsTyping(true);
    const typingMessage: MessageType = {
      id: 'typing',
      content: '',
      sender: 'assistant',
      timestamp: new Date(),
      isTyping: true
    };
    
    setMessages(prevMessages => [...prevMessages, typingMessage]);
    
    try {
      const aiResponse = await generateResponse(content);
      const processedResponse = processAiResponse(aiResponse);
      
      setMessages(prevMessages => {
        const filteredMessages = prevMessages.filter(msg => msg.id !== 'typing');
        
        const assistantMessage: MessageType = {
          id: Date.now().toString(),
          content: processedResponse.message,
          sender: 'assistant',
          timestamp: new Date(),
          actionSuggestions: processedResponse.suggestedActions,
          bookingMatches: matches
        };
        
        return [...filteredMessages, assistantMessage];
      });
    } catch (error) {
      console.error('Error generating response:', error);
      
      setMessages(prevMessages => {
        const filteredMessages = prevMessages.filter(msg => msg.id !== 'typing');
        
        const errorMessage: MessageType = {
          id: Date.now().toString(),
          content: "Sorry, I'm having trouble processing your request right now. Please try again later.",
          sender: 'assistant',
          timestamp: new Date()
        };
        
        return [...filteredMessages, errorMessage];
      });
    } finally {
      setIsTyping(false);
    }
  };
  
  const handleBookingConfirm = (match: BookingMatch) => {
    createBooking(match);
    
    const confirmationMessage: MessageType = {
      id: Date.now().toString(),
      content: `Booking request sent to ${match.name} for ${match.service} on ${match.date} at ${match.time}. You'll receive a notification when they confirm.`,
      sender: 'assistant',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, confirmationMessage]);
  };
  
  return (
    <div className="flex flex-col h-full bg-background border rounded-lg shadow-lg overflow-hidden">
      <ChatHeader onClose={onClose} />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble 
            key={message.id} 
            message={message} 
            onBookingConfirm={handleBookingConfirm} 
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t p-4">
        <ChatInput onSendMessage={handleSendMessage} isProcessing={isLoading} />
      </div>
    </div>
  );
};

export default ChatWindow;
