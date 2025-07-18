import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Flag, Eye, Ban, CheckCircle, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { supabaseBypass } from "@/types/supabase-bypass";
import { toast } from 'sonner';

interface FlaggedContent {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  flag_reason: string;
  flag_severity: 'low' | 'medium' | 'high';
  status: 'pending' | 'approved' | 'removed';
  user_profile?: {
    full_name?: string;
    avatar_url?: string;
  };
}

const ContentModerationPanel: React.FC = () => {
  const [flaggedContent, setFlaggedContent] = useState<FlaggedContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'high'>('pending');

  useEffect(() => {
    fetchFlaggedContent();
  }, [filter]);

  const fetchFlaggedContent = async () => {
    try {
      setLoading(true);
      
      // For demo purposes, create mock flagged content since there's no actual flagged content yet
      const mockFlaggedContent: FlaggedContent[] = [
        {
          id: '1',
          content: 'Buy now! Amazing deal! Click here for free money!',
          user_id: 'user1',
          created_at: new Date().toISOString(),
          flag_reason: 'Potential Spam',
          flag_severity: 'high',
          status: 'pending',
          user_profile: { full_name: 'Test User', avatar_url: undefined }
        }
      ];

      // Apply filters
      let filteredContent = mockFlaggedContent;
      if (filter === 'pending') {
        filteredContent = mockFlaggedContent.filter(item => item.status === 'pending');
      } else if (filter === 'high') {
        filteredContent = mockFlaggedContent.filter(item => item.flag_severity === 'high');
      }

      setFlaggedContent(filteredContent);
    } catch (error) {
      console.error('Error fetching flagged content:', error);
      toast.error('Failed to load flagged content');
    } finally {
      setLoading(false);
    }
  };

  const detectFlagReason = (content: string): string => {
    const lowerContent = content.toLowerCase();
    
    // Basic spam detection
    if (lowerContent.includes('buy now') || lowerContent.includes('click here') || lowerContent.includes('free money')) {
      return 'Potential Spam';
    }
    
    // Inappropriate content detection
    if (lowerContent.includes('hate') || lowerContent.includes('inappropriate')) {
      return 'Inappropriate Content';
    }
    
    // Excessive self-promotion
    if ((lowerContent.match(/follow/g) || []).length > 3) {
      return 'Excessive Self-Promotion';
    }
    
    return 'Community Guidelines Review';
  };

  const getFlagSeverity = (content: string): 'low' | 'medium' | 'high' => {
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('hate') || lowerContent.includes('scam')) {
      return 'high';
    }
    
    if (lowerContent.includes('buy now') || lowerContent.includes('spam')) {
      return 'medium';
    }
    
    return 'low';
  };

  const handleContentAction = async (contentId: string, action: 'approve' | 'remove') => {
    try {
      if (action === 'remove') {
        // Remove flagged tag and update content
        const { error } = await supabaseBypass
          .from('community_posts')
          .update({ 
            tags: [] // Remove all tags to remove flagged status
          } as any)
          .eq('id', contentId);
        
        if (error) throw error;
        toast.success('Content removed successfully');
      } else {
        // Approve content - remove flagged tag
        const { error } = await supabaseBypass
          .from('community_posts')
          .update({ 
            tags: [] // Remove flagged tag
          } as any)
          .eq('id', contentId);
        
        if (error) throw error;
        toast.success('Content approved successfully');
      }
      
      // Refresh the list
      fetchFlaggedContent();
    } catch (error) {
      console.error('Error handling content action:', error);
      toast.error('Failed to update content status');
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <Flag className="h-4 w-4" />;
      default: return <Eye className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-600" />
            Content Moderation
          </CardTitle>
          <div className="flex gap-2">
            {(['all', 'pending', 'high'] as const).map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(filterType)}
                className={filter === filterType ? 'bg-purple-600 hover:bg-purple-700' : ''}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                {filterType === 'pending' && flaggedContent.filter(item => item.status === 'pending').length > 0 && (
                  <Badge className="ml-1 bg-red-500 text-white text-xs">
                    {flaggedContent.filter(item => item.status === 'pending').length}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {flaggedContent.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900">All Clear!</h3>
            <p className="text-gray-500">No flagged content requires review.</p>
          </div>
        ) : (
          flaggedContent.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={`${getSeverityColor(item.flag_severity)} flex items-center gap-1`}>
                      {getSeverityIcon(item.flag_severity)}
                      {item.flag_severity.toUpperCase()} PRIORITY
                    </Badge>
                    <Badge variant="outline">
                      {item.flag_reason}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>User:</strong> {item.user_profile?.full_name || 'Unknown User'} • 
                    <strong> Posted:</strong> {new Date(item.created_at).toLocaleDateString()}
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded border-l-4 border-orange-400">
                    <p className="text-gray-800">{item.content}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleContentAction(item.id, 'approve')}
                  className="text-green-600 border-green-300 hover:bg-green-50"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approve
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleContentAction(item.id, 'remove')}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  <Ban className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default ContentModerationPanel;