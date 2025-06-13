
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, MessageSquare, CreditCard, Calendar, TrendingUp, Vote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  benefits: string[];
  votes: number;
}

const SponsorTeasers = () => {
  const [showVotingModal, setShowVotingModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState('');
  const [hasVoted, setHasVoted] = useState(false);
  const [features, setFeatures] = useState<Feature[]>([
    {
      id: 'pos-integration',
      title: 'POS Integration',
      description: 'Seamless integration with popular point-of-sale systems for salons',
      icon: CreditCard,
      benefits: [
        'Automatic payment processing',
        'Real-time inventory tracking',
        'Streamlined checkout experience',
        'Detailed sales analytics'
      ],
      votes: 127
    },
    {
      id: 'sms-marketing',
      title: 'SMS Marketing Suite',
      description: 'Automated SMS campaigns and customer engagement tools',
      icon: MessageSquare,
      benefits: [
        'Automated appointment reminders',
        'Promotional campaign management',
        'Customer retention tools',
        'Personalized messaging'
      ],
      votes: 89
    },
    {
      id: 'advanced-scheduling',
      title: 'Advanced Scheduling',
      description: 'AI-powered scheduling optimization and resource management',
      icon: Calendar,
      benefits: [
        'Smart appointment scheduling',
        'Resource optimization',
        'Wait-list management',
        'Multi-location coordination'
      ],
      votes: 156
    },
    {
      id: 'analytics-dashboard',
      title: 'Business Analytics',
      description: 'Comprehensive business intelligence and reporting dashboard',
      icon: TrendingUp,
      benefits: [
        'Revenue tracking and forecasting',
        'Customer behavior insights',
        'Performance benchmarking',
        'Custom report generation'
      ],
      votes: 203
    }
  ]);

  const handleVoteNow = () => {
    setShowVotingModal(true);
  };

  const handleSubmitVote = () => {
    if (!selectedFeature) {
      alert('Please select a feature to vote for');
      return;
    }

    // Update vote count
    setFeatures(prev => prev.map(feature => 
      feature.id === selectedFeature 
        ? { ...feature, votes: feature.votes + 1 }
        : feature
    ));

    setHasVoted(true);
    alert('Thank you for voting! Your voice helps shape EmviApp\'s future.');
    setShowVotingModal(false);
    setSelectedFeature('');
  };

  return (
    <section className="bg-gradient-to-br from-indigo-50 to-purple-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Future Features Preview
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Help us prioritize what matters most to you
            </p>
            <div className="inline-block bg-yellow-100 border border-yellow-300 rounded-full px-4 py-2 mb-6">
              <span className="text-yellow-800 font-semibold text-sm">🚀 Coming Soon</span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Vote className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{feature.votes} votes</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{feature.description}</p>

              <div className="space-y-2 mb-6">
                <h4 className="font-semibold text-gray-900 text-sm">Key Benefits:</h4>
                <ul className="space-y-1">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                      <Zap className="h-3 w-3 text-green-500" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-indigo-700">
                    Business Impact: High ROI Expected
                  </span>
                  <div className="w-16 h-2 bg-indigo-200 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Button
              onClick={handleVoteNow}
              disabled={hasVoted}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-300"
            >
              {hasVoted ? 'Thank You for Voting!' : 'Vote Now'}
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              Your vote helps us prioritize development
            </p>
          </motion.div>
        </div>
      </div>

      {/* Voting Modal */}
      <Dialog open={showVotingModal} onOpenChange={setShowVotingModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Vote for Your Priority Feature</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              Which feature would benefit your business the most?
            </p>
            <RadioGroup value={selectedFeature} onValueChange={setSelectedFeature}>
              {features.map((feature) => (
                <div key={feature.id} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value={feature.id} id={feature.id} />
                  <Label htmlFor={feature.id} className="flex-1 cursor-pointer">
                    <div className="font-medium">{feature.title}</div>
                    <div className="text-sm text-gray-500">{feature.votes} votes</div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <div className="flex gap-2">
              <Button
                onClick={handleSubmitVote}
                disabled={!selectedFeature}
                className="flex-1"
              >
                Submit Vote
              </Button>
              <Button
                variant="outline"
                onClick={() =>

setShowVotingModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default SponsorTeasers;
