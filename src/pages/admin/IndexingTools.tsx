import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Search, 
  Send, 
  Trash2, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  Clock,
  ExternalLink,
  Globe
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  notifyJobUpsert, 
  notifyJobRemove, 
  pingSitemaps, 
  getIndexingLogs,
  generateJobUrl,
  type IndexingResponse 
} from '@/lib/indexing/google';
import { toast } from 'sonner';

interface IndexingLog {
  id: string;
  action: string;
  url?: string;
  success: boolean;
  response?: string;
  error?: string;
  created_at: string;
}

const IndexingTools = () => {
  const [testUrl, setTestUrl] = useState('');
  const [jobId, setJobId] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<IndexingLog[]>([]);
  const [lastResults, setLastResults] = useState<{
    upsert?: IndexingResponse;
    remove?: IndexingResponse;
    sitemaps?: IndexingResponse;
  }>({});

  // Load recent indexing logs
  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      const recentLogs = await getIndexingLogs(100);
      setLogs(recentLogs);
    } catch (error) {
      console.error('Failed to load indexing logs:', error);
      toast.error('Failed to load indexing logs');
    }
  };

  const handleNotifyUpsert = async () => {
    if (!testUrl.trim()) {
      toast.error('Please enter a URL to notify Google');
      return;
    }

    setLoading(true);
    try {
      const result = await notifyJobUpsert(testUrl.trim());
      setLastResults(prev => ({ ...prev, upsert: result }));
      
      if (result.success) {
        toast.success('Successfully notified Google about URL update');
      } else {
        toast.error(`Failed to notify Google: ${result.error}`);
      }
      
      await loadLogs(); // Refresh logs
    } catch (error) {
      toast.error('Failed to notify Google');
      console.error('Notification error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNotifyRemove = async () => {
    if (!testUrl.trim()) {
      toast.error('Please enter a URL to remove from Google');
      return;
    }

    setLoading(true);
    try {
      const result = await notifyJobRemove(testUrl.trim());
      setLastResults(prev => ({ ...prev, remove: result }));
      
      if (result.success) {
        toast.success('Successfully notified Google about URL removal');
      } else {
        toast.error(`Failed to notify Google: ${result.error}`);
      }
      
      await loadLogs(); // Refresh logs
    } catch (error) {
      toast.error('Failed to notify Google');
      console.error('Notification error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePingSitemaps = async () => {
    setLoading(true);
    try {
      const result = await pingSitemaps();
      setLastResults(prev => ({ ...prev, sitemaps: result }));
      
      if (result.success) {
        toast.success('Successfully pinged sitemaps to Google');
      } else {
        toast.error(`Failed to ping sitemaps: ${result.error}`);
      }
      
      await loadLogs(); // Refresh logs
    } catch (error) {
      toast.error('Failed to ping sitemaps');
      console.error('Sitemap ping error:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateJobUrlForTesting = () => {
    if (!jobId.trim()) {
      toast.error('Please enter a Job ID');
      return;
    }
    
    const url = generateJobUrl(jobId.trim(), jobTitle.trim() || undefined, jobLocation.trim() || undefined);
    setTestUrl(url);
    toast.success('Generated job URL');
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getStatusIcon = (success: boolean) => {
    return success ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <XCircle className="h-4 w-4 text-red-500" />
    );
  };

  const getActionBadge = (action: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      'job_upsert': 'default',
      'job_remove': 'destructive',
      'sitemap_ping': 'secondary'
    };
    
    return (
      <Badge variant={variants[action] || 'default'}>
        {action.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  return (
    <Layout>
      <Helmet>
        <title>Google Indexing Tools | Admin | EmviApp</title>
        <meta name="description" content="Google Indexing API management tools for EmviApp administrators" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Google Indexing Tools
          </h1>
          <p className="text-gray-600">
            Manage Google Indexing API notifications and sitemap pings for JobPosting content.
          </p>
        </div>

        <Tabs defaultValue="manual" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="manual">Manual Controls</TabsTrigger>
            <TabsTrigger value="logs">Indexing Logs</TabsTrigger>
            <TabsTrigger value="results">Last Results</TabsTrigger>
          </TabsList>

          <TabsContent value="manual" className="space-y-6">
            {/* Job URL Generator */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Job URL Generator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Job ID *</label>
                    <Input
                      placeholder="e.g., 123e4567-e89b-12d3-a456-426614174000"
                      value={jobId}
                      onChange={(e) => setJobId(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Job Title</label>
                    <Input
                      placeholder="e.g., Senior Nail Technician"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <Input
                      placeholder="e.g., New York, NY"
                      value={jobLocation}
                      onChange={(e) => setJobLocation(e.target.value)}
                    />
                  </div>
                </div>
                <Button onClick={generateJobUrlForTesting} variant="outline">
                  Generate Job URL
                </Button>
              </CardContent>
            </Card>

            {/* Manual Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Manual Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">URL to Notify</label>
                  <Input
                    placeholder="https://www.emvi.app/jobs/..."
                    value={testUrl}
                    onChange={(e) => setTestUrl(e.target.value)}
                  />
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={handleNotifyUpsert}
                    disabled={loading || !testUrl.trim()}
                    className="flex items-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Notify Upsert (Create/Update)
                  </Button>
                  
                  <Button 
                    onClick={handleNotifyRemove}
                    disabled={loading || !testUrl.trim()}
                    variant="destructive"
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Notify Remove (Delete)
                  </Button>
                  
                  <Button 
                    onClick={handlePingSitemaps}
                    disabled={loading}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Globe className="h-4 w-4" />
                    Ping Sitemaps
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Recent Indexing Activity</h2>
              <Button onClick={loadLogs} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
            
            <div className="space-y-2">
              {logs.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8 text-gray-500">
                    No indexing logs found
                  </CardContent>
                </Card>
              ) : (
                logs.map((log) => (
                  <Card key={log.id}>
                    <CardContent className="py-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          {getStatusIcon(log.success)}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              {getActionBadge(log.action)}
                              <span className="text-sm text-gray-500">
                                {formatTimestamp(log.created_at)}
                              </span>
                            </div>
                            
                            {log.url && (
                              <div className="flex items-center gap-2 mb-2">
                                <ExternalLink className="h-3 w-3 text-gray-400" />
                                <a 
                                  href={log.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-sm text-blue-600 hover:underline truncate"
                                >
                                  {log.url}
                                </a>
                              </div>
                            )}
                            
                            {log.error && (
                              <div className="text-sm text-red-600 mt-1">
                                Error: {log.error}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="results" className="space-y-4">
            <h2 className="text-xl font-semibold">Last Operation Results</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Upsert Result */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Job Upsert</CardTitle>
                </CardHeader>
                <CardContent>
                  {lastResults.upsert ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(lastResults.upsert.success)}
                        <span className={lastResults.upsert.success ? 'text-green-600' : 'text-red-600'}>
                          {lastResults.upsert.success ? 'Success' : 'Failed'}
                        </span>
                      </div>
                      {lastResults.upsert.error && (
                        <p className="text-sm text-red-600">{lastResults.upsert.error}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No recent upsert operations</p>
                  )}
                </CardContent>
              </Card>

              {/* Remove Result */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Job Remove</CardTitle>
                </CardHeader>
                <CardContent>
                  {lastResults.remove ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(lastResults.remove.success)}
                        <span className={lastResults.remove.success ? 'text-green-600' : 'text-red-600'}>
                          {lastResults.remove.success ? 'Success' : 'Failed'}
                        </span>
                      </div>
                      {lastResults.remove.error && (
                        <p className="text-sm text-red-600">{lastResults.remove.error}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No recent remove operations</p>
                  )}
                </CardContent>
              </Card>

              {/* Sitemaps Result */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sitemap Ping</CardTitle>
                </CardHeader>
                <CardContent>
                  {lastResults.sitemaps ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(lastResults.sitemaps.success)}
                        <span className={lastResults.sitemaps.success ? 'text-green-600' : 'text-red-600'}>
                          {lastResults.sitemaps.success ? 'Success' : 'Failed'}
                        </span>
                      </div>
                      {lastResults.sitemaps.error && (
                        <p className="text-sm text-red-600">{lastResults.sitemaps.error}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No recent sitemap pings</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default IndexingTools;