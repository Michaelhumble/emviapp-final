
import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Users, Lightbulb, MessageSquare } from 'lucide-react';
import CTAButton from './CTAButton';
import QuestionModal from './QuestionModal';
import QABrowserModal from './QABrowserModal';

const CommunityQA = () => {
  const qaItems = [
    {
      question: "How can I increase my client bookings?",
      answer: "Focus on showcasing your work on social media, ask satisfied clients for referrals, and consider offering package deals for regular services.",
      author: "Sarah M.",
      likes: 24,
      replies: 8
    },
    {
      question: "What's the best way to handle difficult clients?",
      answer: "Stay professional, listen actively to their concerns, set clear boundaries, and always document interactions for your protection.",
      author: "Maria K.",
      likes: 31,
      replies: 12
    },
    {
      question: "Should I invest in expensive equipment early on?",
      answer: "Start with quality basics and upgrade gradually. Your skill and service quality matter more than having the most expensive tools initially.",
      author: "Alex R.",
      likes: 18,
      replies: 5
    }
  ];

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <HelpCircle className="h-8 w-8 text-blue-500" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Community Q&A
            </h2>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Get answers from experienced professionals in our community
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {qaItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Question */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Lightbulb className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {item.answer}
                  </p>
                  
                  {/* Author and Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>💡 {item.author}</span>
                      <span>👍 {item.likes} likes</span>
                      <span>💬 {item.replies} replies</span>
                    </div>
                    
                    <CTAButton
                      type="join_waitlist"
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      metadata={{ waitlistType: 'qa_discussion', questionId: index.toString() }}
                    >
                      Join Discussion
                    </CTAButton>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8"
        >
          <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Have a Question?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join our community to ask questions, share experiences, and learn from thousands of beauty professionals
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <QuestionModal>
              <CTAButton
                type="apply_now"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold"
                metadata={{ applicationType: 'community_question' }}
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Ask a Question
              </CTAButton>
            </QuestionModal>
            
            <QABrowserModal>
              <CTAButton
                type="apply_now"
                variant="outline"
                className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full font-semibold"
                metadata={{ applicationType: 'browse_qa' }}
              >
                Browse All Q&As
              </CTAButton>
            </QABrowserModal>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityQA;
