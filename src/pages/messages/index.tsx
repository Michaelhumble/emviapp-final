
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { MessageSquare, Home, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTestRecipient } from '@/hooks/chat/useTestRecipient';
import { MessageCenter } from '@/components/chat/MessageCenter';

const Messages = () => {
  const navigate = useNavigate();
  const { testRecipient, loading } = useTestRecipient();
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div>Loading chat...</div>
        </div>
      </Layout>
    );
  }

  // If no test recipient is found, show the coming soon message
  if (!testRecipient) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-blue-50 p-6 rounded-full inline-flex mb-6">
              <MessageSquare className="h-12 w-12 text-blue-500" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4">
              Messages Coming Soon
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              We're working on bringing you a great messaging experience to connect with salons and artists.
              This feature will be available soon!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="flex items-center"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
              
              <Link to="/dashboard">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="flex items-center"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Return to Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  // If we have a test recipient, show the MessageCenter
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MessageCenter recipientId={testRecipient.id} />
        </motion.div>
      </div>
    </Layout>
  );
};

export default Messages;
