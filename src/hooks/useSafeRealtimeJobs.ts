/**
 * iOS PWA Crash Prevention: Safe Realtime Jobs Hook
 * 
 * Replaces direct WebSocket usage with safe fallback system
 * to prevent crashes on iOS Safari, PWAs, and in-app webviews.
 */

import { useState, useEffect, useCallback } from 'react';
import { supabaseBypass } from '@/types/supabase-bypass';
import { Job } from '@/types/job';
import { connectRealtime, RealtimeHandle } from '@/lib/realtime/connect';
import { isDevelopment, getDiagnosticInfo } from '@/lib/realtime/capabilities';

interface UseSafeRealtimeJobsOptions {
  effectiveSignedIn: boolean;
  onJobsUpdate?: (jobs: Job[]) => void;
}

export const useSafeRealtimeJobs = ({ 
  effectiveSignedIn, 
  onJobsUpdate 
}: UseSafeRealtimeJobsOptions) => {
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');
  const [connectionMethod, setConnectionMethod] = useState<string>('none');
  
  // Fetch jobs function
  const fetchJobs = useCallback(async () => {
    if (!effectiveSignedIn) return;
    
    try {
      console.log('📊 [SAFE-REALTIME] Fetching latest jobs');
      
      const { data: jobs, error } = await supabaseBypass
        .from('jobs')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) {
        console.error('❌ [SAFE-REALTIME] Jobs fetch error:', error);
        return;
      }

      if (jobs && onJobsUpdate) {
        onJobsUpdate(jobs);
      }
      
      console.log(`✅ [SAFE-REALTIME] Fetched ${jobs?.length || 0} jobs`);
    } catch (error) {
      console.error('❌ [SAFE-REALTIME] Jobs fetch exception:', error);
    }
  }, [effectiveSignedIn, onJobsUpdate]);

  // Set up safe realtime connection with fallbacks
  useEffect(() => {
    if (!effectiveSignedIn) return;

    console.log('🔌 [SAFE-REALTIME] Setting up connection');
    setConnectionStatus('connecting');

    // Development diagnostic info
    if (isDevelopment()) {
      console.log('🔍 [SAFE-REALTIME] Environment diagnostic:', getDiagnosticInfo());
    }

    let realtimeHandle: RealtimeHandle | null = null;

    const setupRealtime = async () => {
      try {
        realtimeHandle = await connectRealtime({
          wssUrl: `wss://wwhqbjrhbajpabfdwnip.supabase.co/realtime/v1/websocket?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3aHFianJoYmFqcGFiZmR3bmlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5OTk2OTMsImV4cCI6MjA1NzU3NTY5M30.1YGaLgfnwqmzn3f28IzmTxDKKX5NoJ1V8IbI3V4-WmM&vsn=1.0.0`,
          sseUrl: `https://wwhqbjrhbajpabfdwnip.supabase.co/functions/v1/realtime-sse`,
          pollUrl: `https://wwhqbjrhbajpabfdwnip.supabase.co/functions/v1/realtime-poll`,
          onMessage: (data) => {
            if (data.type === 'postgres_changes' && data.table === 'jobs') {
              console.log('🚀 [SAFE-REALTIME] Job update received:', data);
              fetchJobs(); // Refresh jobs when any change occurs
            } else if (data.type === 'heartbeat') {
              console.log('💓 [SAFE-REALTIME] Heartbeat received');
            }
          },
          onError: (error) => {
            console.warn('⚠️ [SAFE-REALTIME] Connection error:', error);
            setConnectionStatus('error');
          },
          onConnect: (method) => {
            console.log(`✅ [SAFE-REALTIME] Connected via ${method}`);
            setConnectionStatus('connected');
            setConnectionMethod(method);
          },
          pollInterval: 30000 // 30 second polling for jobs
        });

        if (!realtimeHandle) {
          console.warn('🚫 [SAFE-REALTIME] No connection available, HTTP-only mode');
          setConnectionStatus('error');
          setConnectionMethod('http-only');
        }

      } catch (error) {
        console.warn('⚠️ [SAFE-REALTIME] Connection setup failed:', error);
        setConnectionStatus('error');
        setConnectionMethod('http-only');
      }
    };

    setupRealtime();

    // Regular refresh interval regardless of realtime status
    const refreshInterval = setInterval(() => {
      console.log('🔄 [SAFE-REALTIME] Regular refresh');
      fetchJobs();
    }, 60 * 1000); // Refresh every 60 seconds

    return () => {
      console.log('🧹 [SAFE-REALTIME] Cleaning up');
      setConnectionStatus('disconnected');
      setConnectionMethod('none');
      
      clearInterval(refreshInterval);
      
      if (realtimeHandle) {
        try {
          realtimeHandle.close();
        } catch (error) {
          console.warn('⚠️ [SAFE-REALTIME] Cleanup error:', error);
        }
      }
    };
  }, [effectiveSignedIn, fetchJobs]);

  return {
    connectionStatus,
    connectionMethod,
    fetchJobs
  };
};