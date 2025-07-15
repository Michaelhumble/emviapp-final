import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Eye, Shield, Flag, Check, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';

interface FlaggedContent {
  id: string;
  content_id: string;
  content_type: 'post' | 'comment';
  reason: string;
  flagged_at: string;
  status: 'pending' | 'reviewed' | 'approved' | 'removed';
  content?: {
    content: string;
    user_id: string;
    profiles?: {
      full_name?: string;
    };
  };
}

// Content moderation keywords and patterns
const SPAM_KEYWORDS = [
  'buy now', 'click here', 'free money', 'get rich quick', 'make money fast',
  'guaranteed', 'limited time', 'act now', 'special offer', 'discount'
];

const INAPPROPRIATE_KEYWORDS = [
  'hate', 'violence', 'harassment', 'discrimination', 'offensive'
];

export const checkContentForViolations = (content: string): string[] => {
  const violations: string[] = [];
  const lowerContent = content.toLowerCase();
  
  // Check for spam
  const spamCount = SPAM_KEYWORDS.filter(keyword => 
    lowerContent.includes(keyword)
  ).length;
  
  if (spamCount >= 2) {
    violations.push('potential_spam');
  }
  
  // Check for inappropriate content
  const inappropriateCount = INAPPROPRIATE_KEYWORDS.filter(keyword =>
    lowerContent.includes(keyword)
  ).length;
  
  if (inappropriateCount >= 1) {
    violations.push('inappropriate_content');
  }
  
  // Check for excessive caps
  const capsRatio = (content.match(/[A-Z]/g) || []).length / content.length;
  if (capsRatio > 0.6 && content.length > 20) {
    violations.push('excessive_caps');
  }
  
  // Check for repetitive content
  const words = content.split(/\s+/);
  const uniqueWords = new Set(words);
  if (words.length > 10 && uniqueWords.size / words.length < 0.3) {
    violations.push('repetitive_content');
  }
  
  return violations;
};

const ContentModerationSystem: React.FC = () => {
  const [flaggedContent, setFlaggedContent] = useState<FlaggedContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const { user } = useAuth();

  useEffect(() => {
    fetchFlaggedContent();
  }, []);

  const fetchFlaggedContent = async () => {
    try {
      setIsLoading(true);
      
      // For demo purposes, we'll create some sample flagged content
      // In production, this would fetch from a content_reports table
      const sampleFlaggedContent: FlaggedContent[] = [
        {
          id: '1',
          content_id: 'post-1',
          content_type: 'post',
          reason: 'potential_spam',
          flagged_at: new Date().toISOString(),
          status: 'pending',
          content: {
            content: 'BUY NOW! Amazing discount! Limited time offer! Get rich quick with this special deal!',
            user_id: 'user-1',
            profiles: { full_name: 'Suspicious User' }
          }
        },
        {
          id: '2',
          content_id: 'post-2',
          content_type: 'post',
          reason: 'inappropriate_content',
          flagged_at: new Date(Date.now() - 86400000).toISOString(),
          status: 'pending',
          content: {
            content: 'This content contains inappropriate language and harassment towards other users.',
            user_id: 'user-2',
            profiles: { full_name: 'Problem User' }
          }
        },
        {
          id: '3',
          content_id: 'post-3',
          content_type: 'post',
          reason: 'excessive_caps',
          flagged_at: new Date(Date.now() - 172800000).toISOString(),
          status: 'reviewed',
          content: {
            content: 'HELLO EVERYONE!!! THIS IS MY AMAZING NAIL ART!!! LOOK AT THIS!!!',
            user_id: 'user-3',
            profiles: { full_name: 'Excited User' }
          }
        }
      ];
      
      setFlaggedContent(sampleFlaggedContent);
    } catch (error) {
      console.error('Error fetching flagged content:', error);
      toast.error('Failed to load flagged content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContentReview = async (contentId: string, action: 'approve' | 'remove') => {
    try {
      // Update local state
      setFlaggedContent(prev => 
        prev.map(item => 
          item.id === contentId 
            ? { ...item, status: action === 'approve' ? 'approved' : 'removed' }
            : item
        )
      );
      
      toast.success(`Content ${action === 'approve' ? 'approved' : 'removed'} successfully`);
    } catch (error) {
      console.error('Error updating content status:', error);
      toast.error('Failed to update content status');
    }
  };

  const getReasonBadgeColor = (reason: string) => {
    switch (reason) {
      case 'potential_spam':
        return 'bg-yellow-100 text-yellow-800';
      case 'inappropriate_content':
        return 'bg-red-100 text-red-800';
      case 'excessive_caps':
        return 'bg-blue-100 text-blue-800';
      case 'repetitive_content':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getReasonLabel = (reason: string) => {
    switch (reason) {
      case 'potential_spam':
        return 'Potential Spam';
      case 'inappropriate_content':
        return 'Inappropriate Content';
      case 'excessive_caps':
        return 'Excessive Caps';
      case 'repetitive_content':
        return 'Repetitive Content';
      default:
        return 'Unknown';
    }
  };

  const filteredContent = flaggedContent.filter(item => {
    if (activeTab === 'all') return true;
    return item.status === activeTab;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="h-6 w-6 text-purple-600" />
        <h2 className="text-2xl font-bold text-gray-900">Content Moderation</h2>
        <Badge variant="outline" className="ml-auto">
          {flaggedContent.filter(item => item.status === 'pending').length} Pending
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="removed">Removed</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
          ) : filteredContent.length === 0 ? (
            <Card>
              <CardContent className="py-8">
                <div className="text-center">
                  <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No content to review</h3>
                  <p className="text-gray-600">
                    {activeTab === 'pending' 
                      ? 'All caught up! No pending content to moderate.'
                      : `No ${activeTab} content found.`
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredContent.map((item) => (
                <Card key={item.id} className="border-0 shadow-lg">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Flag className="h-5 w-5 text-red-500" />
                        <div>
                          <CardTitle className="text-base">
                            Flagged {item.content_type}
                          </CardTitle>
                          <p className="text-sm text-gray-600">
                            By {item.content?.profiles?.full_name || 'Unknown User'} • 
                            {new Date(item.flagged_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getReasonBadgeColor(item.reason)}>
                          {getReasonLabel(item.reason)}
                        </Badge>
                        <Badge variant={
                          item.status === 'pending' ? 'destructive' :
                          item.status === 'approved' ? 'default' : 'secondary'
                        }>
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <p className="text-gray-800 whitespace-pre-wrap">
                        {item.content?.content}
                      </p>
                    </div>
                    
                    {item.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleContentReview(item.id, 'approve')}
                          className="flex items-center gap-2"
                        >
                          <Check className="h-4 w-4" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleContentReview(item.id, 'remove')}
                          className="flex items-center gap-2"
                        >
                          <X className="h-4 w-4" />
                          Remove
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentModerationSystem;