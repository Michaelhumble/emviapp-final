import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { scaleManager } from '@/utils/scalePreparation';
import { AlertTriangle, Activity, Database, Globe, Zap } from 'lucide-react';

interface SystemMetrics {
  concurrentUsers: number;
  requestsPerSecond: number;
  databaseLoad: number;
  cacheHitRate: number;
  errorRate: number;
  responseTime: number;
  circuitBreakerStatus: { [key: string]: 'OPEN' | 'CLOSED' | 'HALF_OPEN' };
}

export const InfrastructureMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    concurrentUsers: 0,
    requestsPerSecond: 0,
    databaseLoad: 0,
    cacheHitRate: 0,
    errorRate: 0,
    responseTime: 0,
    circuitBreakerStatus: {}
  });
  const [emergencyMode, setEmergencyMode] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time metrics (in production, these would come from your monitoring service)
      const simulatedMetrics: SystemMetrics = {
        concurrentUsers: Math.floor(Math.random() * 100000000), // Up to 100M
        requestsPerSecond: Math.floor(Math.random() * 500000), // Up to 500K RPS
        databaseLoad: Math.random() * 100,
        cacheHitRate: 85 + Math.random() * 10, // 85-95%
        errorRate: Math.random() * 5, // 0-5%
        responseTime: 50 + Math.random() * 200, // 50-250ms
        circuitBreakerStatus: {
          'database_query': Math.random() > 0.9 ? 'OPEN' : 'CLOSED',
          'file_upload': Math.random() > 0.95 ? 'OPEN' : 'CLOSED',
          'email_service': Math.random() > 0.8 ? 'OPEN' : 'CLOSED'
        }
      };

      setMetrics(simulatedMetrics);
      setEmergencyMode(scaleManager.isEmergencyMode());

      // Auto-enable emergency mode if needed
      if (simulatedMetrics.concurrentUsers > 50000000 || 
          simulatedMetrics.errorRate > 3 || 
          simulatedMetrics.responseTime > 2000) {
        scaleManager.enableEmergencyMode();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value: number, thresholds: [number, number]) => {
    if (value < thresholds[0]) return 'hsl(var(--success))';
    if (value < thresholds[1]) return 'hsl(var(--warning))';
    return 'hsl(var(--destructive))';
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {emergencyMode && (
        <Card className="border-destructive">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <CardTitle className="text-destructive">Emergency Mode Active</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              System is operating in emergency mode with reduced functionality to handle extreme load.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concurrent Users</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(metrics.concurrentUsers)}</div>
            <Progress 
              value={(metrics.concurrentUsers / 100000000) * 100} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              of 100M capacity
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Requests/Second</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(metrics.requestsPerSecond)}</div>
            <Progress 
              value={(metrics.requestsPerSecond / 500000) * 100} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              of 500K RPS capacity
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Database Load</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.databaseLoad.toFixed(1)}%</div>
            <Progress 
              value={metrics.databaseLoad} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              CPU utilization
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cache Hit Rate</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.cacheHitRate.toFixed(1)}%</div>
            <Progress 
              value={metrics.cacheHitRate} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Cache efficiency
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: getStatusColor(metrics.errorRate, [1, 3]) }}>
              {metrics.errorRate.toFixed(2)}%
            </div>
            <Progress 
              value={metrics.errorRate} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Error percentage
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: getStatusColor(metrics.responseTime, [500, 1000]) }}>
              {metrics.responseTime.toFixed(0)}ms
            </div>
            <Progress 
              value={(metrics.responseTime / 2000) * 100} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Average response time
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Circuit Breaker Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {Object.entries(metrics.circuitBreakerStatus).map(([service, status]) => (
              <Badge 
                key={service}
                variant={status === 'CLOSED' ? 'default' : status === 'OPEN' ? 'destructive' : 'secondary'}
              >
                {service}: {status}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};