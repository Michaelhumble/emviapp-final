import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface MessageCenterProps {
  recipientId: string;
}

export const MessageCenter = ({ recipientId }: MessageCenterProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-8 text-center border border-indigo-100">
        <motion.div
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
        >
          <MessageSquare className="w-10 h-10 text-white" />
        </motion.div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Enhanced Messaging Coming Soon
        </h2>
        
        <p className="text-gray-600 mb-8 text-lg">
          We're building an incredible messaging experience to connect with salons and artists.
          For now, try our Little Sunshine AI assistant in the bottom right corner!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Button 
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
          
          <Button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600"
          >
            <Home className="w-4 h-4" />
            Return to Dashboard
          </Button>
        </div>
        
        <div className="text-sm text-gray-500 bg-gray-100 rounded-lg p-3">
          <strong>Recipient ID:</strong> {recipientId}
        </div>
      </div>
    </motion.div>
  );
};