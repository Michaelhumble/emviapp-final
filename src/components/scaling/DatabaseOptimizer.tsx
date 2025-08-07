import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Database, Zap, AlertTriangle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

interface QueryStats {
  query: string;
  avgExecutionTime: number;
  executionCount: number;
  totalTime: number;
  indexUsage: 'full' | 'partial' | 'none';
  optimizationPotential: 'high' | 'medium' | 'low';
}

interface IndexRecommendation {
  table: string;
  columns: string[];
  reason: string;
  expectedImprovement: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
}

export const DatabaseOptimizer: React.FC = () => {
  const [slowQueries, setSlowQueries] = useState<QueryStats[]>([]);
  const [indexRecommendations, setIndexRecommendations] = useState<IndexRecommendation[]>([]);
  const [connectionStats, setConnectionStats] = useState({
    activeConnections: 0,
    maxConnections: 1000,
    connectionPoolUsage: 0,
    queryQueueLength: 0
  });
  const [optimizing, setOptimizing] = useState(false);

  useEffect(() => {
    // Simulate database monitoring data
    const mockSlowQueries: QueryStats[] = [
      {
        query: 'SELECT * FROM jobs WHERE location ILIKE %$1% ORDER BY created_at DESC',
        avgExecutionTime: 2.5,
        executionCount: 15420,
        totalTime: 38550,
        indexUsage: 'none',
        optimizationPotential: 'high'
      },
      {
        query: 'SELECT * FROM profiles WHERE role = $1 AND location = $2',
        avgExecutionTime: 1.8,
        executionCount: 8900,
        totalTime: 16020,
        indexUsage: 'partial',
        optimizationPotential: 'medium'
      },
      {
        query: 'SELECT COUNT(*) FROM bookings WHERE status = $1 AND created_at >= $2',
        avgExecutionTime: 3.2,
        executionCount: 4200,
        totalTime: 13440,
        indexUsage: 'none',
        optimizationPotential: 'high'
      }
    ];

    const mockIndexRecommendations: IndexRecommendation[] = [
      {
        table: 'jobs',
        columns: ['location', 'status', 'created_at'],
        reason: 'Frequently filtered and sorted by these columns',
        expectedImprovement: '80% faster queries',
        priority: 'critical'
      },
      {
        table: 'profiles',
        columns: ['role', 'location'],
        reason: 'Common filter combination in search queries',
        expectedImprovement: '60% faster lookups',
        priority: 'high'
      },
      {
        table: 'bookings',
        columns: ['status', 'created_at'],
        reason: 'Status filtering with date range queries',
        expectedImprovement: '70% faster aggregations',
        priority: 'high'
      },
      {
        table: 'salon_sales',
        columns: ['is_featured', 'is_urgent', 'created_at'],
        reason: 'Homepage sorting and filtering',
        expectedImprovement: '90% faster homepage loads',
        priority: 'critical'
      }
    ];

    setSlowQueries(mockSlowQueries);
    setIndexRecommendations(mockIndexRecommendations);

    // Simulate real-time connection stats
    const interval = setInterval(() => {
      setConnectionStats({
        activeConnections: Math.floor(Math.random() * 800) + 100,
        maxConnections: 1000,
        connectionPoolUsage: Math.random() * 100,
        queryQueueLength: Math.floor(Math.random() * 50)
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const optimizeDatabase = async () => {
    setOptimizing(true);
    toast.info('Starting database optimization...');

    // Simulate optimization process
    const steps = [
      'Analyzing query patterns...',
      'Creating performance indexes...',
      'Optimizing connection pool...',
      'Updating query cache settings...',
      'Running VACUUM and ANALYZE...',
      'Optimization complete!'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.info(steps[i]);
    }

    // Simulate improved metrics
    setSlowQueries(prev => prev.map(query => ({
      ...query,
      avgExecutionTime: query.avgExecutionTime * 0.3, // 70% improvement
      indexUsage: 'full' as const,
      optimizationPotential: 'low' as const
    })));

    setOptimizing(false);
    toast.success('Database optimization completed! 70% performance improvement achieved.');
  };

  const createIndex = async (recommendation: IndexRecommendation) => {
    toast.info(`Creating index on ${recommendation.table}(${recommendation.columns.join(', ')})...`);
    
    // Simulate index creation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIndexRecommendations(prev => 
      prev.filter(rec => rec !== recommendation)
    );
    
    toast.success(`Index created successfully! Expected improvement: ${recommendation.expectedImprovement}`);
  };

  const getQueryOptimizationColor = (potential: string) => {
    switch (potential) {
      case 'high': return 'hsl(var(--destructive))';
      case 'medium': return 'hsl(var(--warning))';
      case 'low': return 'hsl(var(--success))';
      default: return 'hsl(var(--muted-foreground))';
    }
  };

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Connections</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{connectionStats.activeConnections}</div>
            <Progress 
              value={(connectionStats.activeConnections / connectionStats.maxConnections) * 100} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              of {connectionStats.maxConnections} max
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pool Usage</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{connectionStats.connectionPoolUsage.toFixed(1)}%</div>
            <Progress 
              value={connectionStats.connectionPoolUsage} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Connection pool utilization
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Query Queue</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{connectionStats.queryQueueLength}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Queries waiting in queue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Optimization Status</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Button 
              onClick={optimizeDatabase} 
              disabled={optimizing}
              className="w-full"
              size="sm"
            >
              {optimizing ? 'Optimizing...' : 'Optimize Now'}
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Auto-optimize database performance
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="slow-queries" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="slow-queries">Slow Queries</TabsTrigger>
          <TabsTrigger value="index-recommendations">Index Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="slow-queries">
          <Card>
            <CardHeader>
              <CardTitle>Slow Query Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {slowQueries.map((query, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <code className="text-sm bg-muted p-2 rounded flex-1 mr-4 break-all">
                          {query.query}
                        </code>
                        <Badge 
                          variant="outline"
                          style={{ color: getQueryOptimizationColor(query.optimizationPotential) }}
                        >
                          {query.optimizationPotential} priority
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Avg Time:</span>
                          <div className="font-medium">{query.avgExecutionTime.toFixed(2)}s</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Executions:</span>
                          <div className="font-medium">{query.executionCount.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total Time:</span>
                          <div className="font-medium">{(query.totalTime / 1000).toFixed(1)}s</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Index Usage:</span>
                          <div className="flex items-center gap-1">
                            {query.indexUsage === 'full' ? (
                              <CheckCircle className="h-3 w-3 text-success" />
                            ) : query.indexUsage === 'partial' ? (
                              <AlertTriangle className="h-3 w-3 text-warning" />
                            ) : (
                              <AlertTriangle className="h-3 w-3 text-destructive" />
                            )}
                            <span className="font-medium">{query.indexUsage}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="index-recommendations">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Indexes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {indexRecommendations.map((rec, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium">
                          {rec.table}({rec.columns.join(', ')})
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {rec.reason}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getPriorityBadgeVariant(rec.priority)}>
                          {rec.priority}
                        </Badge>
                        <Button size="sm" onClick={() => createIndex(rec)}>
                          Create Index
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <span className="text-muted-foreground">Expected improvement: </span>
                      <span className="font-medium text-success">{rec.expectedImprovement}</span>
                    </div>
                  </div>
                ))}
                
                {indexRecommendations.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 text-success" />
                    <p>All recommended indexes have been created!</p>
                    <p className="text-sm">Your database is fully optimized.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};