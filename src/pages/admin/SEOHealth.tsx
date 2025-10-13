import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw, CheckCircle, XCircle, Clock, ExternalLink } from 'lucide-react';

interface QueueStats {
  queued: number;
  sent: number;
  error: number;
  byType: Record<string, { queued: number; sent: number; error: number }>;
}

interface LastRun {
  id: string;
  run_date: string;
  cities_processed: number;
  cities_succeeded: number;
  cities_failed: number;
  completed_at: string;
  status: string;
  errors: any;
  metadata?: any;
}

export default function SEOHealth() {
  const [queueStats, setQueueStats] = useState<QueueStats | null>(null);
  const [lastRuns, setLastRuns] = useState<LastRun[]>([]);
  const [loading, setLoading] = useState(true);
  const [rebuilding, setRebuilding] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    loadStats();
  }, []);
  
  const loadStats = async () => {
    setLoading(true);
    
    try {
      // Get queue stats
      const { data: queueData } = await supabase
        .from('seo_reindex_queue')
        .select('status, type')
        .limit(10000);
      
      if (queueData) {
        const stats: QueueStats = {
          queued: 0,
          sent: 0,
          error: 0,
          byType: {}
        };
        
        queueData.forEach((item: any) => {
          if (item.status === 'queued') stats.queued++;
          else if (item.status === 'sent') stats.sent++;
          else if (item.status === 'error') stats.error++;
          
          if (!stats.byType[item.type]) {
            stats.byType[item.type] = { queued: 0, sent: 0, error: 0 };
          }
          
          if (item.status === 'queued') stats.byType[item.type].queued++;
          else if (item.status === 'sent') stats.byType[item.type].sent++;
          else if (item.status === 'error') stats.byType[item.type].error++;
        });
        
        setQueueStats(stats);
      }
      
      // Get last 3 runs
      const { data: runData } = await supabase
        .from('seo_indexing_logs')
        .select('*')
        .order('completed_at', { ascending: false })
        .limit(3);
      
      if (runData) {
        setLastRuns(runData);
      }
    } catch (error) {
      console.error('Error loading SEO stats:', error);
      toast({
        title: 'Error',
        description: 'Failed to load SEO statistics',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  
  const triggerReindex = async () => {
    setRebuilding(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('seo-reindex-cron');
      
      if (error) throw error;
      
      toast({
        title: 'Reindex triggered',
        description: `Processed ${data?.processed || 0} URLs`,
      });
      
      // Reload stats after a delay
      setTimeout(() => {
        loadStats();
      }, 2000);
    } catch (error: any) {
      console.error('Error triggering reindex:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to trigger reindex',
        variant: 'destructive'
      });
    } finally {
      setRebuilding(false);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">SEO Health Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Monitor search engine indexing and sitemap status
          </p>
        </div>
        <Button 
          onClick={triggerReindex} 
          disabled={rebuilding}
          className="gap-2"
        >
          <RefreshCw className={rebuilding ? 'animate-spin' : ''} />
          {rebuilding ? 'Rebuilding...' : 'Rebuild Now'}
        </Button>
      </div>
      
      {/* Queue Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Queued</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{queueStats?.queued || 0}</div>
            <p className="text-xs text-muted-foreground">Awaiting reindex</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sent</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{queueStats?.sent || 0}</div>
            <p className="text-xs text-muted-foreground">Successfully indexed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Errors</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{queueStats?.error || 0}</div>
            <p className="text-xs text-muted-foreground">Failed after max retries</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Queue by Type */}
      {queueStats && Object.keys(queueStats.byType).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Queue by Content Type</CardTitle>
            <CardDescription>Status breakdown per content type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(queueStats.byType).map(([type, counts]) => (
                <div key={type} className="border-b pb-3 last:border-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="capitalize font-semibold">{type}</span>
                    <span className="text-sm text-muted-foreground">
                      Total: {counts.queued + counts.sent + counts.error}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Queued:</span>
                      <span className="font-mono">{counts.queued}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sent:</span>
                      <span className="font-mono text-green-600">{counts.sent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Errors:</span>
                      <span className="font-mono text-destructive">{counts.error}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Last 3 Cron Runs */}
      {lastRuns && lastRuns.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Cron Runs</CardTitle>
            <CardDescription>Last 3 automated reindex executions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lastRuns.map((run) => (
                <div key={run.id} className="border-b pb-3 last:border-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-sm font-medium">
                        {run.completed_at ? new Date(run.completed_at).toLocaleString() : 'In progress'}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {run.run_date}
                      </div>
                    </div>
                    <Badge variant={run.status === 'completed' || run.status === 'success' ? 'default' : 'destructive'}>
                      {run.status}
                    </Badge>
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span>URLs processed:</span>
                      <span className="font-mono">{run.cities_processed || 0}</span>
                    </div>
                    {run.metadata?.google_indexing && (
                      <div className="flex justify-between">
                        <span>Google Jobs API:</span>
                        <span className="font-mono text-green-600">
                          {run.metadata.google_indexing.success}/{run.metadata.google_indexing.total}
                        </span>
                      </div>
                    )}
                    {run.metadata?.indexnow && (
                      <div className="flex justify-between">
                        <span>IndexNow:</span>
                        <span className="font-mono">
                          {run.metadata.indexnow.success 
                            ? `✓ ${run.metadata.indexnow.urls} URLs (${run.metadata.indexnow.status_code})` 
                            : '✗ Failed'}
                        </span>
                      </div>
                    )}
                    {run.metadata?.sitemaps_pinged !== undefined && (
                      <div className="flex justify-between">
                        <span>Sitemaps pinged:</span>
                        <span className="font-mono">{run.metadata.sitemaps_pinged}/7</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Sitemaps */}
      <Card>
        <CardHeader>
          <CardTitle>Sitemaps</CardTitle>
          <CardDescription>Active sitemaps submitted to search engines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              'sitemap.xml',
              'sitemap-static.xml',
              'jobs-sitemap.xml',
              'salons-sitemap.xml',
              'artists-sitemap.xml',
              'city-sitemap.xml',
              'blog-sitemap.xml'
            ].map(sitemap => (
              <a
                key={sitemap}
                href={`https://www.emvi.app/${sitemap}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:underline text-primary"
              >
                <ExternalLink className="h-3 w-3" />
                {sitemap}
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>✅ Cron runs every 2 hours automatically</p>
          <p>✅ Queue is processed in batches of 200 URLs</p>
          <p>✅ Failed URLs retry up to 5 times with exponential backoff</p>
          <p className="text-muted-foreground mt-4">
            <strong>Note:</strong> Google can take 24-72 hours to reflect indexing changes. 
            IndexNow typically processes within hours.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
