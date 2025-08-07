import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Star, MessageSquare, TrendingUp, AlertTriangle, ThumbsUp, ThumbsDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeedbackItem {
  id: string;
  user: string;
  role: 'customer' | 'artist' | 'salon';
  rating: number;
  category: 'ui' | 'performance' | 'feature' | 'bug' | 'suggestion';
  priority: 'low' | 'medium' | 'high' | 'critical';
  content: string;
  timestamp: Date;
  status: 'new' | 'reviewing' | 'in-progress' | 'resolved' | 'wont-fix';
}

const FeedbackCollectionSystem = () => {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([
    {
      id: '1',
      user: 'Sarah M.',
      role: 'customer',
      rating: 5,
      category: 'ui',
      priority: 'medium',
      content: 'Love the new map-based booking! So much easier to find nearby salons.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'new'
    },
    {
      id: '2',
      user: 'Mike R.',
      role: 'artist',
      rating: 4,
      category: 'feature',
      priority: 'high',
      content: 'The new analytics dashboard is amazing! Could we get export features?',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      status: 'reviewing'
    },
    {
      id: '3',
      user: 'Luxury Nails',
      role: 'salon',
      rating: 5,
      category: 'performance',
      priority: 'medium',
      content: 'Platform is much faster now. Our team loves the real-time updates.',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      status: 'resolved'
    },
    {
      id: '4',
      user: 'Emma L.',
      role: 'customer',
      rating: 2,
      category: 'bug',
      priority: 'critical',
      content: 'Push notifications not working on iOS Safari. Missing important booking updates.',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      status: 'in-progress'
    }
  ]);

  const [newFeedback, setNewFeedback] = useState({
    rating: 5,
    category: 'suggestion' as FeedbackItem['category'],
    content: ''
  });

  const submitFeedback = () => {
    const feedback: FeedbackItem = {
      id: Date.now().toString(),
      user: 'Test User',
      role: 'customer',
      rating: newFeedback.rating,
      category: newFeedback.category,
      priority: newFeedback.category === 'bug' ? 'high' : 'medium',
      content: newFeedback.content,
      timestamp: new Date(),
      status: 'new'
    };

    setFeedback(prev => [feedback, ...prev]);
    setNewFeedback({ rating: 5, category: 'suggestion', content: '' });
  };

  const updateStatus = (id: string, status: FeedbackItem['status']) => {
    setFeedback(prev => prev.map(f => 
      f.id === id ? { ...f, status } : f
    ));
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  const getCategoryIcon = (category: FeedbackItem['category']) => {
    switch (category) {
      case 'ui': return <MessageSquare className="h-4 w-4" />;
      case 'performance': return <TrendingUp className="h-4 w-4" />;
      case 'feature': return <ThumbsUp className="h-4 w-4" />;
      case 'bug': return <AlertTriangle className="h-4 w-4" />;
      case 'suggestion': return <ThumbsDown className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: FeedbackItem['priority']) => {
    switch (priority) {
      case 'critical': return 'bg-red-500/10 text-red-700 border-red-200';
      case 'high': return 'bg-orange-500/10 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-500/10 text-green-700 border-green-200';
    }
  };

  const getStatusColor = (status: FeedbackItem['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-500/10 text-blue-700';
      case 'reviewing': return 'bg-purple-500/10 text-purple-700';
      case 'in-progress': return 'bg-orange-500/10 text-orange-700';
      case 'resolved': return 'bg-green-500/10 text-green-700';
      case 'wont-fix': return 'bg-gray-500/10 text-gray-700';
    }
  };

  const getRoleColor = (role: FeedbackItem['role']) => {
    switch (role) {
      case 'customer': return 'bg-purple-500/10 text-purple-700';
      case 'artist': return 'bg-blue-500/10 text-blue-700';
      case 'salon': return 'bg-orange-500/10 text-orange-700';
    }
  };

  const stats = {
    total: feedback.length,
    avgRating: (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1),
    critical: feedback.filter(f => f.priority === 'critical').length,
    unresolved: feedback.filter(f => !['resolved', 'wont-fix'].includes(f.status)).length
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Feedback Collection System</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="text-2xl font-bold text-center">{stats.total}</div>
              <div className="text-sm text-gray-600 text-center">Total Feedback</div>
            </Card>
            <Card className="p-4 border-yellow-200 bg-yellow-50">
              <div className="text-2xl font-bold text-center text-yellow-600">{stats.avgRating}⭐</div>
              <div className="text-sm text-yellow-600 text-center">Avg Rating</div>
            </Card>
            <Card className="p-4 border-red-200 bg-red-50">
              <div className="text-2xl font-bold text-center text-red-600">{stats.critical}</div>
              <div className="text-sm text-red-600 text-center">Critical</div>
            </Card>
            <Card className="p-4 border-orange-200 bg-orange-50">
              <div className="text-2xl font-bold text-center text-orange-600">{stats.unresolved}</div>
              <div className="text-sm text-orange-600 text-center">Unresolved</div>
            </Card>
          </div>

          {/* Submit New Feedback */}
          <Card className="p-4 border-dashed border-2 border-gray-300">
            <div className="space-y-4">
              <h3 className="font-semibold">Submit New Feedback</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm">Rating:</span>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star 
                      key={i}
                      className={`h-5 w-5 cursor-pointer transition-colors ${
                        i < newFeedback.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                      onClick={() => setNewFeedback(prev => ({ ...prev, rating: i + 1 }))}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <select 
                  value={newFeedback.category}
                  onChange={(e) => setNewFeedback(prev => ({ ...prev, category: e.target.value as FeedbackItem['category'] }))}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="suggestion">Suggestion</option>
                  <option value="ui">UI/UX</option>
                  <option value="performance">Performance</option>
                  <option value="feature">Feature Request</option>
                  <option value="bug">Bug Report</option>
                </select>
              </div>
              <Textarea
                placeholder="Share your feedback..."
                value={newFeedback.content}
                onChange={(e) => setNewFeedback(prev => ({ ...prev, content: e.target.value }))}
                rows={3}
              />
              <Button 
                onClick={submitFeedback}
                disabled={!newFeedback.content.trim()}
                className="w-full"
              >
                Submit Feedback
              </Button>
            </div>
          </Card>

          {/* Feedback List */}
          <div className="space-y-3">
            {feedback.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border rounded-lg bg-white shadow-sm"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="font-medium">{item.user}</div>
                    <Badge className={getRoleColor(item.role)} variant="secondary">
                      {item.role}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {getCategoryIcon(item.category)}
                      <span className="text-sm capitalize">{item.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {getRatingStars(item.rating)}
                    </div>
                    <Badge className={getPriorityColor(item.priority)} variant="outline">
                      {item.priority}
                    </Badge>
                  </div>
                </div>
                
                <div className="text-gray-700 mb-3">{item.content}</div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {item.timestamp.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(item.status)} variant="secondary">
                      {item.status.replace('-', ' ')}
                    </Badge>
                    <select
                      value={item.status}
                      onChange={(e) => updateStatus(item.id, e.target.value as FeedbackItem['status'])}
                      className="text-sm px-2 py-1 border rounded"
                    >
                      <option value="new">New</option>
                      <option value="reviewing">Reviewing</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="wont-fix">Won't Fix</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackCollectionSystem;