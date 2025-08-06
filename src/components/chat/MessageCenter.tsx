import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

interface MessageCenterProps {
  recipientId: string;
}

export const MessageCenter = ({ recipientId }: MessageCenterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <MessageSquare className="w-8 h-8 text-white" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Messages Coming Soon
        </h2>
        
        <p className="text-gray-600 mb-6">
          We're building an amazing messaging experience to connect with salons and artists.
          In the meantime, try our Little Sunshine AI assistant!
        </p>
        
        <div className="text-sm text-gray-500">
          Recipient ID: {recipientId}
        </div>
      </div>
    </motion.div>
  );
};