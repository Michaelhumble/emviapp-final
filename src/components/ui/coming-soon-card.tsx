import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Vote, Star, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ComingSoonCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  className?: string;
  estimatedDate?: string;
  priority?: 'high' | 'medium' | 'low';
}

const ComingSoonCard: React.FC<ComingSoonCardProps> = ({
  title,
  description,
  icon: Icon,
  className = '',
  estimatedDate = 'Q2 2024',
  priority = 'medium'
}) => {
  const navigate = useNavigate();

  const priorityConfig = {
    high: {
      badge: { bg: 'bg-red-100', text: 'text-red-700', label: 'High Priority' },
      gradient: 'from-red-500 to-pink-500'
    },
    medium: {
      badge: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Medium Priority' },
      gradient: 'from-yellow-500 to-orange-500'
    },
    low: {
      badge: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Low Priority' },
      gradient: 'from-blue-500 to-purple-500'
    }
  };

  const config = priorityConfig[priority];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className="border-purple-100/50 bg-gradient-to-br from-purple-50/50 to-pink-50/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Icon className="h-5 w-5 text-purple-600" />
              {title}
            </CardTitle>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${config.badge.bg} ${config.badge.text}`}>
              {config.badge.label}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">{description}</p>
          
          <div className="bg-white/70 rounded-lg p-4 border border-purple-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Estimated Release</span>
              </div>
              <span className="text-sm font-medium text-purple-600">{estimatedDate}</span>
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm text-gray-600">Community Priority Score</span>
              <span className="text-sm font-bold text-yellow-600">
                {priority === 'high' ? '95%' : priority === 'medium' ? '73%' : '52%'}
              </span>
            </div>
            
            <Button
              onClick={() => navigate('/dashboard/artist?tab=voting')}
              className={`w-full bg-gradient-to-r ${config.gradient} text-white hover:opacity-90 transition-opacity`}
              size="sm"
            >
              <Vote className="h-4 w-4 mr-2" />
              Vote for This Feature
            </Button>
          </div>
          
          <div className="text-xs text-gray-500 text-center">
            💡 Your vote helps us prioritize development
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ComingSoonCard;