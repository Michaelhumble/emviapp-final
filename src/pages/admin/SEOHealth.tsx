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
  byType: Record<string, number>;
}

interface LastRun {
  run_date: string;
  cities_processed: number | null;
  cities_succeeded: number | null;
  cities_failed: number | null;
  completed_at: string | null;
}

export default function SEOHealth() {
  const [queueStats, setQueueStats] = useState<QueueStats | null>(null);
  const [lastRun, setLastRun] = useState<LastRun | null>(null);
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
          
          stats.byType[item.type] = (stats.byType[item.type] || 0) + 1;
        });
        
        setQueueStats(stats);
      }
      
      // Get last run
      const { data: runData } = await supabase
        .from('seo_indexing_logs')
        .select('*')
        .order('completed_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (runData) {
        setLastRun(runData);
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
            <CardDescription>Distribution of URLs in the indexing queue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Object.entries(queueStats.byType).map(([type, count]) => (
                <Badge key={type} variant="secondary" className="text-sm">
                  {type}: {count}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Last Run Stats */}
      {lastRun && (
        <Card>
          <CardHeader>
            <CardTitle>Last Cron Run</CardTitle>
            <CardDescription>
              {lastRun.completed_at 
                ? new Date(lastRun.completed_at).toLocaleString() 
                : 'Never'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-medium">Processed</div>
                <div className="text-2xl font-bold">
                  {lastRun.cities_processed || 0}
                </div>
              </div>
              <div>
                <div className="font-medium">Succeeded</div>
                <div className="text-2xl font-bold text-green-600">
                  {lastRun.cities_succeeded || 0}
                </div>
              </div>
              <div>
                <div className="font-medium">Failed</div>
                <div className="text-2xl font-bold text-destructive">
                  {lastRun.cities_failed || 0}
                </div>
              </div>
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
