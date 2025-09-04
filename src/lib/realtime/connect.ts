/**
 * iOS PWA Crash Prevention: Safe Realtime Connection with Fallbacks
 * 
 * Implements WSS WebSocket → SSE (EventSource) → HTTP polling fallbacks
 * to prevent crashes on iOS Safari, PWAs, and in-app webviews.
 */

import { isWebSocketSafe, isDevelopment, getDiagnosticInfo } from './capabilities';

export type RealtimeHandle =
  | { kind: 'websocket'; close: () => void }
  | { kind: 'sse'; close: () => void }
  | { kind: 'polling'; close: () => void };

export interface RealtimeConnectionOptions {
  wssUrl?: string;        // WebSocket URL (wss://)
  sseUrl?: string;        // Server-Sent Events URL
  pollUrl?: string;       // HTTP polling URL
  onMessage: (data: any) => void;
  onError?: (error: Error) => void;
  onConnect?: (method: string) => void;
  pollInterval?: number;  // Polling interval in ms (default: 3000)
}

/**
 * Attempts to connect using the best available realtime method
 * Priority: WSS WebSocket → SSE → HTTP Polling
 * Never throws - always returns null on failure
 */
export async function connectRealtime(
  options: RealtimeConnectionOptions
): Promise<RealtimeHandle | null> {
  const {
    wssUrl,
    sseUrl,
    pollUrl,
    onMessage,
    onError,
    onConnect,
    pollInterval = 3000
  } = options;

  // Development diagnostic logging
  if (isDevelopment()) {
    console.log('🔌 [REALTIME] Connection attempt starting', {
      diagnostic: getDiagnosticInfo(),
      urls: { wssUrl, sseUrl, pollUrl }
    });
  }

  // Attempt 1: Secure WebSocket (WSS)
  if (wssUrl && isWebSocketSafe()) {
    try {
      console.log('🔌 [REALTIME] Attempting WebSocket connection...');
      
      const handle = await connectWebSocket(wssUrl, onMessage, onError);
      if (handle) {
        console.log('✅ [REALTIME] WebSocket connected successfully');
        onConnect?.('websocket');
        return handle;
      }
    } catch (error) {
      console.warn('⚠️ [REALTIME] WebSocket failed:', error);
      onError?.(error instanceof Error ? error : new Error('WebSocket failed'));
    }
  } else if (wssUrl) {
    console.log('🚫 [REALTIME] Skipping WebSocket (unsafe environment)');
  }

  // Attempt 2: Server-Sent Events (SSE)
  if (sseUrl) {
    try {
      console.log('🔌 [REALTIME] Attempting SSE connection...');
      
      const handle = await connectSSE(sseUrl, onMessage, onError);
      if (handle) {
        console.log('✅ [REALTIME] SSE connected successfully');
        onConnect?.('sse');
        return handle;
      }
    } catch (error) {
      console.warn('⚠️ [REALTIME] SSE failed:', error);
      onError?.(error instanceof Error ? error : new Error('SSE failed'));
    }
  }

  // Attempt 3: HTTP Polling (always works)
  if (pollUrl) {
    try {
      console.log('🔌 [REALTIME] Falling back to HTTP polling...');
      
      const handle = connectPolling(pollUrl, onMessage, onError, pollInterval);
      console.log('✅ [REALTIME] HTTP polling started successfully');
      onConnect?.('polling');
      return handle;
    } catch (error) {
      console.warn('⚠️ [REALTIME] HTTP polling failed:', error);
      onError?.(error instanceof Error ? error : new Error('Polling failed'));
    }
  }

  console.error('❌ [REALTIME] All connection methods failed');
  return null;
}

/**
 * WebSocket connection with timeout and error handling
 */
async function connectWebSocket(
  url: string,
  onMessage: (data: any) => void,
  onError?: (error: Error) => void
): Promise<RealtimeHandle | null> {
  return new Promise((resolve) => {
    try {
      const socket = new WebSocket(url);
      let resolved = false;

      // Timeout for connection
      const timeout = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          try { socket.close(); } catch {}
          resolve(null);
        }
      }, 5000);

      socket.onopen = () => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timeout);
          resolve({
            kind: 'websocket',
            close: () => {
              try {
                socket.close();
              } catch (error) {
                console.warn('Error closing WebSocket:', error);
              }
            }
          });
        }
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          onMessage(data);
        } catch (error) {
          console.warn('Failed to parse WebSocket message:', error);
        }
      };

      socket.onerror = (error) => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timeout);
          resolve(null);
        }
        onError?.(new Error('WebSocket error'));
      };

      socket.onclose = () => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timeout);
          resolve(null);
        }
      };

    } catch (error) {
      resolve(null);
    }
  });
}

/**
 * Server-Sent Events connection
 */
async function connectSSE(
  url: string,
  onMessage: (data: any) => void,
  onError?: (error: Error) => void
): Promise<RealtimeHandle | null> {
  return new Promise((resolve) => {
    try {
      const eventSource = new EventSource(url, { withCredentials: false });
      let resolved = false;

      // Timeout for connection
      const timeout = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          try { eventSource.close(); } catch {}
          resolve(null);
        }
      }, 5000);

      eventSource.onopen = () => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timeout);
          resolve({
            kind: 'sse',
            close: () => {
              try {
                eventSource.close();
              } catch (error) {
                console.warn('Error closing SSE:', error);
              }
            }
          });
        }
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          onMessage(data);
        } catch (error) {
          console.warn('Failed to parse SSE message:', error);
        }
      };

      eventSource.onerror = () => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timeout);
          resolve(null);
        }
        onError?.(new Error('SSE connection failed'));
      };

    } catch (error) {
      resolve(null);
    }
  });
}

/**
 * HTTP Polling connection
 */
function connectPolling(
  url: string,
  onMessage: (data: any) => void,
  onError?: (error: Error) => void,
  interval: number = 3000
): RealtimeHandle {
  let isActive = true;
  let lastTimestamp = Date.now();

  const poll = async () => {
    if (!isActive) return;

    try {
      const response = await fetch(`${url}?since=${lastTimestamp}`, {
        cache: 'no-store',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        
        // Handle the correct response format from edge function
        if (data && data.events && Array.isArray(data.events)) {
          for (const event of data.events) {
            if (isActive) {
              onMessage(event);
              if (event.timestamp) {
                lastTimestamp = Math.max(lastTimestamp, event.timestamp);
              }
            }
          }
          
          // Update timestamp from server response
          if (data.timestamp) {
            lastTimestamp = Math.max(lastTimestamp, data.timestamp);
          }
        }
      } else {
        console.warn('Polling request failed:', response.status);
      }
    } catch (error) {
      console.warn('Polling error:', error);
      onError?.(error instanceof Error ? error : new Error('Polling failed'));
    }

    // Schedule next poll
    if (isActive) {
      setTimeout(poll, interval);
    }
  };

  // Start polling
  setTimeout(poll, 100); // Initial delay

  return {
    kind: 'polling',
    close: () => {
      isActive = false;
    }
  };
}