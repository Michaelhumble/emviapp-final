import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  AlertTriangle, 
  Shield, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Flag,
  Eye,
  MessageSquare,
  Bot,
  Award
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import PressAnalyticsDashboard from '@/components/admin/PressAnalyticsDashboard';

interface AIUsageLog {
  id: string;
  user_id: string;
  prompt: string;
  response: string;
  flagged_reason: string;
  admin_reviewed: boolean;
  admin_action: string;
  created_at: string;
  users?: {
    email: string;
    user_metadata: any;
  } | null;
}

interface ContentReport {
  id: string;
  reporter_id: string;
  reported_content_type: string;
  reported_content_id: string;
  report_reason: string;
  report_details: string;
  status: string;
  created_at: string;
  profiles?: {
    full_name: string;
  } | null;
}

const AdminDashboard = () => {
  const [flaggedAI, setFlaggedAI] = useState<AIUsageLog[]>([]);
  const [contentReports, setContentReports] = useState<ContentReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    flaggedAI: 0,
    pendingReports: 0,
    rateLimitedUsers: 0,
    totalAIUsage: 0
  });
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadAdminData();
    }
  }, [user]);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      // Load flagged AI usage
      const { data: aiData, error: aiError } = await (supabase as any)
        .from('ai_usage_logs')
        .select(`
          *,
          users:user_id(email, user_metadata)
        `)
        .not('flagged_reason', 'is', null)
        .eq('admin_reviewed', false)
        .order('created_at', { ascending: false })
        .limit(50);

      if (aiError) throw aiError;
      setFlaggedAI((aiData || []) as unknown as AIUsageLog[]);

      // Load content reports
      const { data: reportData, error: reportError } = await (supabase as any)
        .from('content_reports')
        .select(`
          *,
          profiles:reporter_id(full_name)
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
        .limit(50);

      if (reportError) throw reportError;
      setContentReports((reportData || []) as unknown as ContentReport[]);

      // Load stats
      const [flaggedCount, reportCount, totalUsage] = await Promise.all([
        (supabase as any)
          .from('ai_usage_logs')
          .select('id', { count: 'exact' })
          .not('flagged_reason', 'is', null)
          .eq('admin_reviewed', false),
        (supabase as any)
          .from('content_reports')
          .select('id', { count: 'exact' })
          .eq('status', 'pending'),
        supabase
          .from('ai_usage_logs')
          .select('id', { count: 'exact' })
          .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      ]);

      setStats({
        flaggedAI: flaggedCount.count || 0,
        pendingReports: reportCount.count || 0,
        rateLimitedUsers: 0, // Could calculate from rate limit logs
        totalAIUsage: totalUsage.count || 0
      });

    } catch (error) {
      console.error('Error loading admin data:', error);
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleAIReview = async (logId: string, action: 'approved' | 'rejected' | 'warning') => {
    try {
      const { error } = await (supabase as any)
        .from('ai_usage_logs')
        .update({
          admin_reviewed: true,
          admin_action: action,
          reviewed_by: user?.id,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', logId);

      if (error) throw error;
      
      toast.success(`AI usage ${action}`);
      loadAdminData(); // Refresh data
    } catch (error) {
      console.error('Error reviewing AI usage:', error);
      toast.error('Failed to review AI usage');
    }
  };

  const handleReportReview = async (reportId: string, action: 'reviewed' | 'dismissed' | 'action_taken') => {
    try {
      const { error } = await (supabase as any)
        .from('content_reports')
        .update({
          status: action,
          reviewed_by: user?.id,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', reportId);

      if (error) throw error;
      
      toast.success(`Report ${action}`);
      loadAdminData(); // Refresh data
    } catch (error) {
      console.error('Error reviewing report:', error);
      toast.error('Failed to review report');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getFlaggedReasonColor = (reason: string) => {
    switch (reason) {
      case 'identical_repetitive': return 'bg-orange-100 text-orange-800';
      case 'similar_repetitive': return 'bg-yellow-100 text-yellow-800';
      case 'spam_pattern': return 'bg-red-100 text-red-800';
      case 'too_short': return 'bg-gray-100 text-gray-800';
      case 'multiple_reports': return 'bg-purple-100 text-purple-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getReportReasonColor = (reason: string) => {
    switch (reason) {
      case 'spam': return 'bg-red-100 text-red-800';
      case 'inappropriate': return 'bg-orange-100 text-orange-800';
      case 'abuse': return 'bg-red-100 text-red-800';
      case 'off_topic': return 'bg-yellow-100 text-yellow-800';
      case 'fake': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="h-8 w-8 text-purple-600" />
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Flag className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Flagged AI</p>
                <p className="text-2xl font-bold">{stats.flaggedAI}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-sm text-gray-600">Pending Reports</p>
                <p className="text-2xl font-bold">{stats.pendingReports}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Bot className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">AI Usage (24h)</p>
                <p className="text-2xl font-bold">{stats.totalAIUsage}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">System Status</p>
                <p className="text-lg font-bold text-green-600">Healthy</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="flagged-ai" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="flagged-ai" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            Flagged AI Usage ({stats.flaggedAI})
          </TabsTrigger>
          <TabsTrigger value="content-reports" className="flex items-center gap-2">
            <Flag className="h-4 w-4" />
            Content Reports ({stats.pendingReports})
          </TabsTrigger>
          <TabsTrigger value="press-analytics" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Press Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="flagged-ai" className="space-y-4">
          {flaggedAI.length === 0 ? (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                No flagged AI usage requiring review.
              </AlertDescription>
            </Alert>
          ) : (
            flaggedAI.map((log) => (
              <Card key={log.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge className={getFlaggedReasonColor(log.flagged_reason)}>
                        {log.flagged_reason.replace('_', ' ')}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {formatDate(log.created_at)}
                      </span>
                      <span className="text-sm text-gray-500">
                        User: {log.users?.email || 'Unknown'}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Prompt:</p>
                      <p className="bg-gray-50 p-3 rounded text-sm">{log.prompt}</p>
                    </div>
                    
                    {log.response && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Response:</p>
                        <p className="bg-blue-50 p-3 rounded text-sm">{log.response}</p>
                      </div>
                    )}
                    
                    <div className="flex gap-2 pt-3">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-green-600 border-green-600 hover:bg-green-50"
                        onClick={() => handleAIReview(log.id, 'approved')}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
                        onClick={() => handleAIReview(log.id, 'warning')}
                      >
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Warning
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-red-600 border-red-600 hover:bg-red-50"
                        onClick={() => handleAIReview(log.id, 'rejected')}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="content-reports" className="space-y-4">
          {contentReports.length === 0 ? (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                No pending content reports.
              </AlertDescription>
            </Alert>
          ) : (
            contentReports.map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge className={getReportReasonColor(report.report_reason)}>
                        {report.report_reason}
                      </Badge>
                      <Badge variant="outline">
                        {report.reported_content_type}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {formatDate(report.created_at)}
                      </span>
                      <span className="text-sm text-gray-500">
                        Reporter: {report.profiles?.full_name || 'Unknown'}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Content ID:</p>
                      <p className="text-sm font-mono bg-gray-50 p-2 rounded">{report.reported_content_id}</p>
                    </div>
                    
                    {report.report_details && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Details:</p>
                        <p className="bg-gray-50 p-3 rounded text-sm">{report.report_details}</p>
                      </div>
                    )}
                    
                    <div className="flex gap-2 pt-3">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-blue-600 border-blue-600 hover:bg-blue-50"
                        onClick={() => handleReportReview(report.id, 'reviewed')}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Mark Reviewed
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-red-600 border-red-600 hover:bg-red-50"
                        onClick={() => handleReportReview(report.id, 'action_taken')}
                      >
                        <Flag className="h-4 w-4 mr-1" />
                        Action Taken
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-gray-600 border-gray-600 hover:bg-gray-50"
                        onClick={() => handleReportReview(report.id, 'dismissed')}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="press-analytics" className="space-y-4">
          <PressAnalyticsDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;