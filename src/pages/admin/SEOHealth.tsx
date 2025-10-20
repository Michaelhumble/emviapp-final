import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw, CheckCircle, XCircle, Clock, ExternalLink, Calendar, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

interface TodayStats {
  attempts: number;
  successes: number;
  failures: number;
}

interface ChartDataPoint {
  date: string;
  queued: number;
  sent: number;
  error: number;
}

export default function SEOHealth() {
  const [queueStats, setQueueStats] = useState<QueueStats | null>(null);
  const [lastRuns, setLastRuns] = useState<LastRun[]>([]);
  const [todayStats, setTodayStats] = useState<TodayStats | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [lastCronRun, setLastCronRun] = useState<Date | null>(null);
  const [nextCronETA, setNextCronETA] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    loadStats();
  }, []);
  
  const loadStats = async () => {
    setLoading(true);
    
    try {
      // Get today's stats from indexing logs
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      
      const { data: todayLogsData } = await supabase
        .from('seo_indexing_logs')
        .select('*')
        .gte('run_date', todayStart.toISOString())
        .order('run_date', { ascending: false });
      
      if (todayLogsData && todayLogsData.length > 0) {
        const attempts = todayLogsData.reduce((sum: number, log: any) => sum + (log.cities_processed || 0), 0);
        const successes = todayLogsData.reduce((sum: number, log: any) => sum + (log.cities_succeeded || 0), 0);
        const failures = todayLogsData.reduce((sum: number, log: any) => sum + (log.cities_failed || 0), 0);
        
        setTodayStats({ attempts, successes, failures });
      } else {
        setTodayStats({ attempts: 0, successes: 0, failures: 0 });
      }
      
      // Get last 7 days for chart
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const { data: queueDataForChart } = await supabase
        .from('seo_reindex_queue')
        .select('status, updated_at')
        .gte('updated_at', sevenDaysAgo.toISOString());
      
      if (queueDataForChart) {
        const dailyStats: Record<string, { queued: number; sent: number; error: number }> = {};
        
        queueDataForChart.forEach((item: any) => {
          const date = new Date(item.updated_at).toISOString().split('T')[0];
          if (!dailyStats[date]) {
            dailyStats[date] = { queued: 0, sent: 0, error: 0 };
          }
          
          if (item.status === 'queued') dailyStats[date].queued++;
          else if (item.status === 'sent') dailyStats[date].sent++;
          else if (item.status === 'error') dailyStats[date].error++;
        });
        
        const chartDataArray: ChartDataPoint[] = [];
        for (let i = 6; i >= 0; i--) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          const dateKey = d.toISOString().split('T')[0];
          chartDataArray.push({
            date: dateKey,
            queued: dailyStats[dateKey]?.queued || 0,
            sent: dailyStats[dateKey]?.sent || 0,
            error: dailyStats[dateKey]?.error || 0
          });
        }
        
        setChartData(chartDataArray);
      }
      
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
      
      // Get last 5 runs for cron timing
      const { data: runData } = await supabase
        .from('seo_indexing_logs')
        .select('*')
        .order('completed_at', { ascending: false })
        .limit(5);
      
      if (runData && runData.length > 0) {
        setLastRuns(runData.slice(0, 3));
        
        // Calculate last cron run and next ETA
        const lastRun = runData[0];
        if (lastRun.completed_at) {
          const lastRunDate = new Date(lastRun.completed_at);
          setLastCronRun(lastRunDate);
          
          // Cron runs every 2 hours - calculate next run
          const nextRun = new Date(lastRunDate);
          nextRun.setHours(nextRun.getHours() + 2);
          setNextCronETA(nextRun);
        }
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
  
  const formatToPacificTime = (date: Date | null): string => {
    if (!date) return 'N/A';
    
    return new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Los_Angeles',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    }).format(date);
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
            Monitor search engine indexing and sitemap status (Read-Only)
          </p>
        </div>
        <button
          onClick={loadStats}
          className="flex items-center gap-2 px-4 py-2 text-sm border rounded-md hover:bg-accent"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh Data
        </button>
      </div>
      
      {/* Today's Indexing API Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Today's Indexing API Activity
          </CardTitle>
          <CardDescription>
            Google Indexing API attempts for {new Date().toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Attempts</div>
              <div className="text-3xl font-bold">{todayStats?.attempts || 0}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Successes</div>
              <div className="text-3xl font-bold text-green-600">{todayStats?.successes || 0}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Failures</div>
              <div className="text-3xl font-bold text-destructive">{todayStats?.failures || 0}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Cron Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Cron Schedule (Pacific Time)
          </CardTitle>
          <CardDescription>
            Automated reindexing runs every 2 hours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Last Run</div>
              <div className="text-lg font-semibold">{formatToPacificTime(lastCronRun)}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Next Run ETA</div>
              <div className="text-lg font-semibold">{formatToPacificTime(nextCronETA)}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* 7-Day Rolling Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            7-Day Indexing Activity
          </CardTitle>
          <CardDescription>
            Daily breakdown of queue status changes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getMonth() + 1}/${date.getDate()}`;
                  }}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString();
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="queued" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  name="Queued"
                />
                <Line 
                  type="monotone" 
                  dataKey="sent" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Sent"
                />
                <Line 
                  type="monotone" 
                  dataKey="error" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Errors"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
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
