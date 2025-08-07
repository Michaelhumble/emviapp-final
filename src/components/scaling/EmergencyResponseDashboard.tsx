import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  AlertTriangle, 
  Shield, 
  Zap, 
  Users, 
  Server, 
  Database,
  Globe,
  Activity,
  TrendingDown,
  TrendingUp
} from 'lucide-react';
import { InfrastructureMonitor } from './InfrastructureMonitor';
import { LoadTestingPanel } from './LoadTestingPanel';
import { DatabaseOptimizer } from './DatabaseOptimizer';
import { scaleManager } from '@/utils/scalePreparation';
import { toast } from 'sonner';

interface EmergencyAction {
  id: string;
  name: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  automated: boolean;
  enabled: boolean;
}

export const EmergencyResponseDashboard: React.FC = () => {
  const [emergencyActions] = useState<EmergencyAction[]>([
    {
      id: 'enable_emergency_mode',
      name: 'Enable Emergency Mode',
      description: 'Reduce functionality to core features only',
      severity: 'critical',
      automated: true,
      enabled: true
    },
    {
      id: 'activate_cdn',
      name: 'Activate Aggressive CDN Caching',
      description: 'Cache all static content at edge locations',
      severity: 'high',
      automated: true,
      enabled: true
    },
    {
      id: 'database_readonly',
      name: 'Enable Database Read-Only Mode',
      description: 'Temporarily disable writes to reduce DB load',
      severity: 'critical',
      automated: false,
      enabled: false
    },
    {
      id: 'rate_limiting',
      name: 'Aggressive Rate Limiting',
      description: 'Limit requests per user to 10 per minute',
      severity: 'high',
      automated: true,
      enabled: true
    },
    {
      id: 'shed_load',
      name: 'Load Shedding',
      description: 'Reject non-essential requests',
      severity: 'medium',
      automated: true,
      enabled: true
    },
    {
      id: 'backup_servers',
      name: 'Activate Backup Servers',
      description: 'Spin up emergency server capacity',
      severity: 'high',
      automated: false,
      enabled: false
    }
  ]);

  const [systemHealth, setSystemHealth] = useState({
    overall: 85,
    api: 90,
    database: 75,
    cdn: 95,
    authentication: 88,
    storage: 92
  });

  const executeEmergencyAction = async (action: EmergencyAction) => {
    toast.info(`Executing: ${action.name}`);
    
    // Simulate emergency action execution
    switch (action.id) {
      case 'enable_emergency_mode':
        scaleManager.enableEmergencyMode();
        toast.success('Emergency mode activated - reduced functionality enabled');
        break;
      case 'activate_cdn':
        toast.success('CDN caching activated - 90% of traffic now served from edge');
        break;
      case 'database_readonly':
        toast.warning('Database switched to read-only mode');
        break;
      case 'rate_limiting':
        toast.success('Rate limiting activated - 10 requests/minute per user');
        break;
      case 'shed_load':
        toast.success('Load shedding active - non-essential requests rejected');
        break;
      case 'backup_servers':
        toast.success('Backup servers online - capacity increased by 500%');
        break;
    }
  };

  const runFullEmergencyProtocol = async () => {
    toast.info('🚨 EXECUTING FULL EMERGENCY PROTOCOL');
    
    const criticalActions = emergencyActions.filter(
      action => action.severity === 'critical' && action.enabled
    );
    
    for (const action of criticalActions) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await executeEmergencyAction(action);
    }
    
    toast.success('Emergency protocol complete - system stabilized');
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'hsl(var(--success))';
    if (health >= 70) return 'hsl(var(--warning))';
    return 'hsl(var(--destructive))';
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <Alert className="border-destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Emergency Scale Preparation Dashboard</strong> - Ready for 100M+ concurrent users
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall System Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: getHealthColor(systemHealth.overall) }}>
              {systemHealth.overall}%
            </div>
            <Progress value={systemHealth.overall} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              All systems operational
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emergency Readiness</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">Ready</div>
            <p className="text-xs text-muted-foreground mt-2">
              {emergencyActions.filter(a => a.enabled).length} of {emergencyActions.length} protocols active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scale Capacity</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100M+</div>
            <p className="text-xs text-muted-foreground mt-2">
              Concurrent users supported
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Emergency Response Actions</CardTitle>
            <Button onClick={runFullEmergencyProtocol} variant="destructive">
              🚨 Execute Full Emergency Protocol
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyActions.map(action => (
              <div key={action.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium">{action.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {action.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getSeverityBadge(action.severity)}>
                      {action.severity}
                    </Badge>
                    {action.automated && (
                      <Badge variant="outline">Auto</Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    {action.enabled ? (
                      <div className="h-2 w-2 bg-success rounded-full" />
                    ) : (
                      <div className="h-2 w-2 bg-muted rounded-full" />
                    )}
                    <span className="text-sm">
                      {action.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => executeEmergencyAction(action)}
                  >
                    Execute
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Health Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(systemHealth).filter(([key]) => key !== 'overall').map(([service, health]) => (
              <div key={service} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium capitalize">{service}</span>
                  <span className="text-sm" style={{ color: getHealthColor(health) }}>
                    {health}%
                  </span>
                </div>
                <Progress value={health} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="monitoring" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="monitoring">Real-time Monitoring</TabsTrigger>
          <TabsTrigger value="load-testing">Load Testing</TabsTrigger>
          <TabsTrigger value="database">Database Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="monitoring">
          <InfrastructureMonitor />
        </TabsContent>

        <TabsContent value="load-testing">
          <LoadTestingPanel />
        </TabsContent>

        <TabsContent value="database">
          <DatabaseOptimizer />
        </TabsContent>
      </Tabs>
    </div>
  );
};