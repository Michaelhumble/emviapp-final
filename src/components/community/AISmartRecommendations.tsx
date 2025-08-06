import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Sparkles, Target, TrendingUp, Users, Eye, Clock, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AIInsight {
  id: string;
  type: 'content' | 'timing' | 'engagement' | 'monetization' | 'growth';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  actionText: string;
  data?: {
    current: number;
    predicted: number;
    timeframe: string;
  };
}

interface PersonalizedRecommendation {
  id: string;
  category: string;
  title: string;
  description: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  estimatedGain: string;
  timeToImplement: string;
}

const AISmartRecommendations = () => {
  const [activeTab, setActiveTab] = useState<'insights' | 'recommendations' | 'predictions'>('insights');
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [recommendations, setRecommendations] = useState<PersonalizedRecommendation[]>([]);

  // Simulate AI insights
  useEffect(() => {
    const aiInsights: AIInsight[] = [
      {
        id: '1',
        type: 'content',
        title: '🎨 Your nail art posts get 340% more engagement',
        description: 'AI detected that your autumn nail designs receive significantly higher engagement than other content types.',
        confidence: 94,
        impact: 'high',
        actionText: 'Create More Nail Art',
        data: { current: 45, predicted: 153, timeframe: 'next week' }
      },
      {
        id: '2',
        type: 'timing',
        title: '⏰ Best posting time: Tuesday 7-9 PM',
        description: 'Your audience is 280% more active during this window. Posts receive higher engagement and booking conversions.',
        confidence: 87,
        impact: 'high',
        actionText: 'Schedule Posts',
        data: { current: 12, predicted: 34, timeframe: 'per post' }
      },
      {
        id: '3',
        type: 'monetization',
        title: '💰 Add tip jar to increase earnings by $50/week',
        description: 'Similar creators with tip jars earn 45% more. Your audience shows high willingness to support creators.',
        confidence: 91,
        impact: 'medium',
        actionText: 'Enable Tip Jar',
        data: { current: 110, predicted: 160, timeframe: 'weekly' }
      },
      {
        id: '4',
        type: 'growth',
        title: '📈 Collaborate with @SarahNails for +2K followers',
        description: 'AI identified high compatibility. Joint content could increase both accounts\' reach significantly.',
        confidence: 78,
        impact: 'high',
        actionText: 'Send Collab Request'
      },
      {
        id: '5',
        type: 'engagement',
        title: '💬 Ask more questions to boost comments by 165%',
        description: 'Posts with questions get significantly more engagement. Your audience loves to share their thoughts.',
        confidence: 85,
        impact: 'medium',
        actionText: 'Add Questions'
      }
    ];

    const personalizedRecs: PersonalizedRecommendation[] = [
      {
        id: '1',
        category: 'Content Strategy',
        title: 'Post autumn nail tutorial series',
        description: 'Create a 5-part series showing step-by-step autumn nail designs. High demand detected.',
        priority: 'urgent',
        estimatedGain: '+180 followers',
        timeToImplement: '2 hours'
      },
      {
        id: '2',
        category: 'Monetization',
        title: 'Launch "Quick Nail Fix" service',
        description: 'Offer 30-minute express services. High demand in your area for quick touch-ups.',
        priority: 'high',
        estimatedGain: '+$300/week',
        timeToImplement: '1 day'
      },
      {
        id: '3',
        category: 'Engagement',
        title: 'Host live Q&A sessions',
        description: 'Weekly live sessions answering nail care questions. Your expertise is highly valued.',
        priority: 'medium',
        estimatedGain: '+50% engagement',
        timeToImplement: '30 minutes'
      },
      {
        id: '4',
        category: 'Growth',
        title: 'Partner with local salons',
        description: 'Cross-promote with 3 nearby salons. Mutual benefit opportunity identified.',
        priority: 'high',
        estimatedGain: '+500 followers',
        timeToImplement: '3 hours'
      }
    ];

    setInsights(aiInsights);
    setRecommendations(personalizedRecs);
  }, []);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'content': return <Sparkles className="h-5 w-5 text-purple-500" />;
      case 'timing': return <Clock className="h-5 w-5 text-blue-500" />;
      case 'engagement': return <Users className="h-5 w-5 text-green-500" />;
      case 'monetization': return <TrendingUp className="h-5 w-5 text-yellow-500" />;
      case 'growth': return <Target className="h-5 w-5 text-pink-500" />;
      default: return <Brain className="h-5 w-5 text-gray-500" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'from-green-500 to-emerald-500';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'low': return 'from-gray-500 to-gray-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'from-red-500 to-pink-500';
      case 'high': return 'from-orange-500 to-yellow-500';
      case 'medium': return 'from-blue-500 to-indigo-500';
      case 'low': return 'from-gray-500 to-gray-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      urgent: 'bg-red-100 text-red-700',
      high: 'bg-orange-100 text-orange-700',
      medium: 'bg-blue-100 text-blue-700',
      low: 'bg-gray-100 text-gray-700'
    };
    return colors[priority as keyof typeof colors] || colors.low;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white border-none">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Brain className="h-8 w-8 text-yellow-400" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold">AI Smart Recommendations</h2>
              <p className="text-purple-200">Powered by advanced beauty industry analytics</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-400">94%</p>
              <p className="text-sm text-purple-200">Accuracy Rate</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-400">+185%</p>
              <p className="text-sm text-purple-200">Avg Growth</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-400">12K+</p>
              <p className="text-sm text-purple-200">Data Points</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
        {[
          { id: 'insights', label: 'AI Insights', icon: Eye },
          { id: 'recommendations', label: 'Actions', icon: Zap },
          { id: 'predictions', label: 'Predictions', icon: TrendingUp }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 ${activeTab === tab.id 
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                : 'text-gray-600'
              }`}
            >
              <Icon className="mr-2 h-4 w-4" />
              {tab.label}
            </Button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {/* AI Insights Tab */}
        {activeTab === 'insights' && (
          <motion.div
            key="insights"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {insights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-2 border-gray-200 hover:border-purple-300 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        {getInsightIcon(insight.type)}
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">{insight.title}</h4>
                          <p className="text-gray-600 text-sm mb-3">{insight.description}</p>
                          
                          {insight.data && (
                            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-3 mb-3">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Current</span>
                                <span className="font-semibold text-gray-900">{insight.data.current}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Predicted</span>
                                <span className="font-semibold text-green-600">+{insight.data.predicted}</span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                Within {insight.data.timeframe}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <Badge className={`bg-gradient-to-r ${getImpactColor(insight.impact)} text-white mb-2`}>
                          {insight.confidence}% confidence
                        </Badge>
                        <p className="text-xs text-gray-500 capitalize">{insight.impact} impact</p>
                      </div>
                    </div>
                    
                    <Button 
                      className={`bg-gradient-to-r ${getImpactColor(insight.impact)} hover:opacity-90 text-white`}
                    >
                      {insight.actionText}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Recommendations Tab */}
        {activeTab === 'recommendations' && (
          <motion.div
            key="recommendations"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {recommendations.map((rec, index) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`border-2 overflow-hidden ${
                  rec.priority === 'urgent' 
                    ? 'border-red-300 bg-gradient-to-r from-red-50 to-pink-50' 
                    : 'border-gray-200 bg-white'
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {rec.category}
                          </Badge>
                          <Badge className={getPriorityBadge(rec.priority)}>
                            {rec.priority}
                          </Badge>
                        </div>
                        
                        <h4 className="font-semibold text-gray-900 mb-2">{rec.title}</h4>
                        <p className="text-gray-600 text-sm mb-3">{rec.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4" />
                            {rec.estimatedGain}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {rec.timeToImplement}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        className={`bg-gradient-to-r ${getPriorityColor(rec.priority)} hover:opacity-90 text-white flex-1`}
                      >
                        Implement Now
                      </Button>
                      <Button variant="outline" size="sm">
                        Schedule
                      </Button>
                      <Button variant="ghost" size="sm">
                        Skip
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Predictions Tab */}
        {activeTab === 'predictions' && (
          <motion.div
            key="predictions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="bg-gradient-to-br from-blue-50 via-white to-purple-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                  Growth Predictions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { metric: 'Followers', current: '2.3K', predicted: '4.8K', timeframe: '30 days', confidence: 87 },
                  { metric: 'Monthly Earnings', current: '$450', predicted: '$780', timeframe: '30 days', confidence: 92 },
                  { metric: 'Engagement Rate', current: '3.2%', predicted: '5.8%', timeframe: '14 days', confidence: 89 },
                  { metric: 'Booking Conversion', current: '12%', predicted: '18%', timeframe: '21 days', confidence: 84 }
                ].map((prediction, index) => (
                  <motion.div
                    key={prediction.metric}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-4 border border-blue-100"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{prediction.metric}</h4>
                      <Badge className="bg-blue-100 text-blue-700">
                        {prediction.confidence}% confidence
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Current: {prediction.current}</span>
                      <span className="font-semibold text-green-600">Predicted: {prediction.predicted}</span>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      Expected within {prediction.timeframe}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AISmartRecommendations;