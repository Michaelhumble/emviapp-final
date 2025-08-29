import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { RefreshCw, CheckCircle, XCircle, Clock, Database, FileText, Users } from 'lucide-react';
import { hubspotCRM } from '@/lib/analytics/hubspot';

interface SyncAttempt {
  id: string;
  timestamp: string;
  objectType: 'contact' | 'deal' | 'form';
  objectId?: string;
  status: 'success' | 'error';
  errorMessage?: string;
}

export const HubSpotSync = () => {
  const [syncAttempts, setSyncAttempts] = useState<SyncAttempt[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hubspotStatus, setHubspotStatus] = useState({
    isEnabled: false,
    portalId: null as string | null,
    hasAttribution: false
  });

  useEffect(() => {
    loadSyncAttempts();
    checkHubSpotStatus();
  }, []);

  const loadSyncAttempts = () => {
    const attempts = hubspotCRM.getSyncAttempts();
    setSyncAttempts(attempts);
  };

  const checkHubSpotStatus = () => {
    const portalId = hubspotCRM.getPortalIdInUse();
    const attribution = hubspotCRM.getAttribution();
    
    setHubspotStatus({
      isEnabled: !!portalId && import.meta.env.PROD,
      portalId,
      hasAttribution: Object.keys(attribution).length > 0
    });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    loadSyncAttempts();
    checkHubSpotStatus();
    setIsRefreshing(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getObjectTypeIcon = (type: string) => {
    switch (type) {
      case 'contact':
        return <Users className="h-4 w-4" />;
      case 'deal':
        return <Database className="h-4 w-4" />;
      case 'form':
        return <FileText className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getStatusStats = () => {
    const total = syncAttempts.length;
    const successful = syncAttempts.filter(a => a.status === 'success').length;
    const failed = syncAttempts.filter(a => a.status === 'error').length;
    
    return { total, successful, failed };
  };

  const stats = getStatusStats();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">HubSpot Sync Monitor</h1>
          <p className="text-muted-foreground">Monitor HubSpot CRM integration and sync attempts</p>
        </div>
        <Button 
          onClick={handleRefresh} 
          disabled={isRefreshing}
          variant="outline"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">HubSpot Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant={hubspotStatus.isEnabled ? "default" : "secondary"}>
              {hubspotStatus.isEnabled ? 'Enabled' : 'Disabled'}
            </Badge>
            {hubspotStatus.portalId && (
              <p className="text-xs text-muted-foreground mt-1">
                Portal: {hubspotStatus.portalId}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Syncs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Successful</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.successful}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
          </CardContent>
        </Card>
      </div>

      {/* Attribution Status */}
      <Card>
        <CardHeader>
          <CardTitle>Attribution Tracking</CardTitle>
          <CardDescription>Current session attribution data</CardDescription>
        </CardHeader>
        <CardContent>
          {hubspotStatus.hasAttribution ? (
            <div className="space-y-2">
              <Badge variant="default" className="mb-2">Active</Badge>
              <pre className="text-sm bg-muted p-3 rounded-md overflow-x-auto">
                {JSON.stringify(hubspotCRM.getAttribution(), null, 2)}
              </pre>
            </div>
          ) : (
            <div className="text-muted-foreground">
              <Badge variant="secondary" className="mb-2">No Attribution Data</Badge>
              <p className="text-sm">No UTM parameters or attribution data captured yet.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Sync Attempts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Sync Attempts</CardTitle>
          <CardDescription>Last 20 synchronization attempts with HubSpot CRM</CardDescription>
        </CardHeader>
        <CardContent>
          {syncAttempts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No sync attempts recorded yet.</p>
              <p className="text-sm">Sync attempts will appear here when users interact with the app.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {syncAttempts.map((attempt) => (
                <div key={attempt.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(attempt.status)}
                    {getObjectTypeIcon(attempt.objectType)}
                    <div>
                      <div className="font-medium text-sm">
                        {attempt.objectType.charAt(0).toUpperCase() + attempt.objectType.slice(1)} Sync
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatTimestamp(attempt.timestamp)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    {attempt.objectId && (
                      <div className="text-xs text-muted-foreground font-mono">
                        ID: {attempt.objectId}
                      </div>
                    )}
                    {attempt.errorMessage && (
                      <div className="text-xs text-red-600 max-w-xs truncate">
                        {attempt.errorMessage}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Debug Information */}
      {import.meta.env.DEV && (
        <Card>
          <CardHeader>
            <CardTitle>Debug Information</CardTitle>
            <CardDescription>Development-only debug data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Environment</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>Mode: {import.meta.env.DEV ? 'Development' : 'Production'}</li>
                  <li>Portal ID: {hubspotStatus.portalId || 'Not configured'}</li>
                  <li>DNT: {navigator.doNotTrack === '1' ? 'Enabled' : 'Disabled'}</li>
                  <li>Consent: {localStorage.getItem('emvi_cookie_consent') || 'Not set'}</li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-2">Local Storage Keys</h4>
                <ul className="text-sm space-y-1 text-muted-foreground font-mono">
                  <li>emvi.attribution.v1</li>
                  <li>hubspot_sync_attempts</li>
                  <li>emvi_cookie_consent</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HubSpotSync;