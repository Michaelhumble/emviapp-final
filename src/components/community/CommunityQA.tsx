
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Search, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QuestionModal from './QuestionModal';
import QABrowserModal from './QABrowserModal';
import CommunityFAQ from './CommunityFAQ';

const CommunityQA = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Have a Question?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Get expert answers from industry professionals and connect with the community
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <QuestionModal>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3">
                <MessageSquare className="h-5 w-5 mr-2" />
                Ask a Question
              </Button>
            </QuestionModal>
            
            <QABrowserModal>
              <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 px-6 py-3">
                <Search className="h-5 w-5 mr-2" />
                Browse All Q&As
              </Button>
            </QABrowserModal>
          </div>
        </motion.div>

        {/* Comprehensive FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <CommunityFAQ />
        </motion.div>

        {/* Quick Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
            <HelpCircle className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Still Need Help?
            </h3>
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? Our community experts are here to help with personalized answers.
            </p>
            <QuestionModal>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                Ask Your Question
              </Button>
            </QuestionModal>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityQA;
