import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Wifi, WifiOff, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { pwaManager, PWAInfo, TestResult } from '@/utils/pwa';
import { createSecureConnection, ConnectionState } from '@/utils/connection';

const PWADiagnostics = () => {
  const [pwaInfo, setPwaInfo] = useState<PWAInfo | null>(null);
  const [wsTest, setWsTest] = useState<TestResult | null>(null);
  const [sseTest, setSseTest] = useState<TestResult | null>(null);
  const [pollingTest, setPollingTest] = useState<TestResult | null>(null);
  const [connectionState, setConnectionState] = useState<ConnectionState | null>(null);
  const [lastError, setLastError] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDiagnostics();
    
    // Test connection
    const connection = createSecureConnection();
    connection.on('statuschange', setConnectionState);
    connection.connect();
    
    return () => {
      connection.disconnect();
    };
  }, []);

  const loadDiagnostics = async () => {
    try {
      const info = await pwaManager.getPWAInfo();
      setPwaInfo(info);
    } catch (error) {
      setLastError(String(error));
    }
  };

  const runConnectionTests = async () => {
    setTesting(true);
    setLastError(null);
    
    try {
      // Test WebSocket
      const wsResult = await pwaManager.testWebSocket(
        import.meta.env.NEXT_PUBLIC_WS_URL || 'wss://wwhqbjrhbajpabfdwnip.functions.supabase.co/functions/v1/realtime-chat'
      );
      setWsTest(wsResult);

      // Test SSE
      const sseResult = await pwaManager.testSSE(
        import.meta.env.NEXT_PUBLIC_SSE_URL || 'https://wwhqbjrhbajpabfdwnip.functions.supabase.co/functions/v1/events'
      );
      setSseTest(sseResult);

      // Test Polling
      const pollingResult = await pwaManager.testPolling(
        import.meta.env.NEXT_PUBLIC_POLLING_URL || 'https://wwhqbjrhbajpabfdwnip.functions.supabase.co/functions/v1/poll'
      );
      setPollingTest(pollingResult);
      
    } catch (error) {
      setLastError(String(error));
    } finally {
      setTesting(false);
    }
  };

  const handleForceRefresh = async () => {
    setRefreshing(true);
    try {
      await pwaManager.forceUpdate();
    } catch (error) {
      setLastError(String(error));
    } finally {
      setRefreshing(false);
    }
  };

  const StatusIcon = ({ success }: { success?: boolean }) => {
    if (success === undefined) return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    return success ? 
      <CheckCircle className="h-4 w-4 text-green-600" /> : 
      <XCircle className="h-4 w-4 text-red-600" />;
  };

  const StatusBadge = ({ success, label }: { success?: boolean; label: string }) => {
    const variant = success === undefined ? 'secondary' : (success ? 'default' : 'destructive');
    return <Badge variant={variant}>{label}</Badge>;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">PWA Diagnostics</h1>
          <p className="text-muted-foreground mt-2">
            Check PWA functionality and connection status for iOS compatibility
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={runConnectionTests}
            disabled={testing}
            variant="outline"
          >
            {testing ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Wifi className="h-4 w-4 mr-2" />}
            Test Connections
          </Button>
          
          <Button 
            onClick={handleForceRefresh}
            disabled={refreshing}
            variant="outline"
          >
            {refreshing ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <RefreshCw className="h-4 w-4 mr-2" />}
            Hard Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {/* PWA Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <StatusIcon success={pwaInfo?.isSecureContext} />
              PWA Status
            </CardTitle>
            <CardDescription>
              Progressive Web App configuration and security context
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-between">
                <span>Secure Context:</span>
                <StatusBadge 
                  success={pwaInfo?.isSecureContext} 
                  label={pwaInfo?.isSecureContext ? 'Yes' : 'No'} 
                />
              </div>
              
              <div className="flex justify-between">
                <span>Standalone Mode:</span>
                <StatusBadge 
                  success={pwaInfo?.isStandalone} 
                  label={pwaInfo?.isStandalone ? 'Yes' : 'No'} 
                />
              </div>
              
              <div className="flex justify-between">
                <span>Service Worker:</span>
                <StatusBadge 
                  success={pwaInfo?.serviceWorkerSupported} 
                  label={pwaInfo?.serviceWorkerSupported ? 'Supported' : 'Not Supported'} 
                />
              </div>
              
              <div className="flex justify-between">
                <span>SW Registered:</span>
                <StatusBadge 
                  success={pwaInfo?.serviceWorkerRegistered} 
                  label={pwaInfo?.serviceWorkerRegistered ? 'Yes' : 'No'} 
                />
              </div>
              
              <div className="flex justify-between">
                <span>Manifest Loaded:</span>
                <StatusBadge 
                  success={pwaInfo?.manifestLoaded} 
                  label={pwaInfo?.manifestLoaded ? 'Yes' : 'No'} 
                />
              </div>
              
              <div className="flex justify-between">
                <span>Cache Version:</span>
                <Badge variant="outline">{pwaInfo?.cacheVersion || 'Unknown'}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Connection Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {connectionState?.status === 'connected' ? 
                <Wifi className="h-4 w-4 text-green-600" /> : 
                <WifiOff className="h-4 w-4 text-red-600" />
              }
              Connection Status
            </CardTitle>
            <CardDescription>
              Current realtime connection status and type
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-between">
                <span>Connection Type:</span>
                <Badge variant={connectionState?.type === 'websocket' ? 'default' : 'secondary'}>
                  {connectionState?.type || 'None'}
                </Badge>
              </div>
              
              <div className="flex justify-between">
                <span>Status:</span>
                <StatusBadge 
                  success={connectionState?.status === 'connected'} 
                  label={connectionState?.status || 'Unknown'} 
                />
              </div>
              
              <div className="flex justify-between">
                <span>Last Connected:</span>
                <Badge variant="outline">
                  {connectionState?.lastConnected ? 
                    connectionState.lastConnected.toLocaleTimeString() : 
                    'Never'
                  }
                </Badge>
              </div>
              
              {connectionState?.lastError && (
                <div className="flex justify-between col-span-2">
                  <span>Last Error:</span>
                  <Badge variant="destructive">{connectionState.lastError}</Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Connection Tests */}
        <Card>
          <CardHeader>
            <CardTitle>Connection Tests</CardTitle>
            <CardDescription>
              Test different connection methods for fallback compatibility
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center gap-2">
                  <StatusIcon success={wsTest?.success} />
                  <span className="font-medium">WebSocket (wss://)</span>
                </div>
                <div className="flex items-center gap-2">
                  {wsTest?.latency && <Badge variant="outline">{wsTest.latency}ms</Badge>}
                  <StatusBadge 
                    success={wsTest?.success} 
                    label={wsTest?.success ? 'Connected' : (wsTest?.error || 'Not Tested')} 
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center gap-2">
                  <StatusIcon success={sseTest?.success} />
                  <span className="font-medium">Server-Sent Events</span>
                </div>
                <div className="flex items-center gap-2">
                  {sseTest?.latency && <Badge variant="outline">{sseTest.latency}ms</Badge>}
                  <StatusBadge 
                    success={sseTest?.success} 
                    label={sseTest?.success ? 'Connected' : (sseTest?.error || 'Not Tested')} 
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center gap-2">
                  <StatusIcon success={pollingTest?.success} />
                  <span className="font-medium">HTTP Polling</span>
                </div>
                <div className="flex items-center gap-2">
                  {pollingTest?.latency && <Badge variant="outline">{pollingTest.latency}ms</Badge>}
                  <StatusBadge 
                    success={pollingTest?.success} 
                    label={pollingTest?.success ? 'Connected' : (pollingTest?.error || 'Not Tested')} 
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Last Error */}
        {lastError && (
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Last Error</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-sm bg-muted p-3 rounded overflow-auto">
                {lastError}
              </pre>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>iOS PWA Checklist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm space-y-2">
              <p>✅ Visit site on HTTPS domain</p>
              <p>✅ Tap Share → Add to Home Screen</p>
              <p>✅ Open app from home screen (standalone mode)</p>
              <p>✅ Verify secure context: {pwaInfo?.isSecureContext ? '✓' : '✗'}</p>
              <p>✅ Test realtime features (should auto-fallback)</p>
              <p>✅ Test offline → online reconnection</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PWADiagnostics;