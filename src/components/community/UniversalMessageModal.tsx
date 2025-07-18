import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, User, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { supabaseBypass } from "@/types/supabase-bypass";
import { toast } from 'sonner';

interface UniversalMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientId: string;
  recipientName: string;
  recipientAvatar?: string;
  recipientRole?: string;
}

export const UniversalMessageModal: React.FC<UniversalMessageModalProps> = ({
  isOpen,
  onClose,
  recipientId,
  recipientName,
  recipientAvatar,
  recipientRole
}) => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!user) {
      toast.error('Please sign in to send messages');
      return;
    }

    if (!message.trim()) {
      toast.error('Please write a message');
      return;
    }

    setIsLoading(true);

    try {
      // Use the real messaging hook to send message
      const { error } = await supabaseBypass.from('messages').insert({
        sender_id: user.id,
        recipient_id: recipientId,
        message_body: message.trim(),
        message_type: 'chat',
        salon_id: user.id // Using user.id as temporary placeholder
      });

      if (error) throw error;

      toast.success('Message sent! 💌', {
        description: `Your message was delivered to ${recipientName}`
      });
      
      setMessage('');
      onClose();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const predefinedMessages = [
    "Hi! I love your work and would like to connect.",
    "I'm interested in collaborating with you.",
    "Could we discuss working together?",
    "Your style is amazing! Let's chat.",
    "I'd love to learn more about your services."
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-0 gap-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b border-border/50 bg-background">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-primary" />
              <DialogTitle className="text-lg font-semibold font-playfair">
                Send Message
              </DialogTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full hover:bg-accent"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Recipient Info */}
          <div className="flex items-center gap-4 p-4 bg-accent/30 rounded-xl">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg">
              {recipientAvatar ? (
                <img
                  src={recipientAvatar}
                  alt={recipientName}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="h-6 w-6 text-white" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground font-playfair">{recipientName}</h3>
              {recipientRole && (
                <p className="text-sm text-muted-foreground font-inter capitalize">{recipientRole}</p>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4 text-red-500" />
              <span className="text-sm text-muted-foreground">Connect</span>
            </div>
          </div>

          {/* Quick Message Templates */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground font-inter">Quick messages:</p>
            <div className="space-y-2">
              {predefinedMessages.slice(0, 3).map((template, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setMessage(template)}
                  className="w-full text-left p-3 bg-accent/20 hover:bg-accent/40 rounded-lg transition-all duration-300 border border-border/30 hover:border-primary/30"
                >
                  <p className="text-sm text-foreground font-inter">{template}</p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Custom Message */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground font-inter">Or write your own:</p>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here... Be genuine and kind! ✨"
              className="min-h-[100px] resize-none border-border/50 focus:border-primary/50 rounded-xl font-inter"
              maxLength={500}
            />
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">
                {message.length}/500 characters
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Sparkles className="h-3 w-3" />
                <span>Be inspiring!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border/50 bg-background">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim() || isLoading}
              className="flex-1 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white"
            >
              {isLoading ? (
                <>
                  <motion.div
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};