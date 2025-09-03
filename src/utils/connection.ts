// Secure WebSocket connection manager with fallbacks for PWA
import { supabase } from '@/integrations/supabase/client';

export type ConnectionType = 'websocket' | 'sse' | 'polling' | 'offline';
export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

export interface ConnectionConfig {
  wsUrl: string;
  sseUrl: string;
  pollingUrl: string;
  retryAttempts: number;
  retryDelay: number;
}

export interface ConnectionState {
  type: ConnectionType;
  status: ConnectionStatus;
  lastError?: string;
  lastConnected?: Date;
}

export class SecureConnectionManager {
  private ws: WebSocket | null = null;
  private eventSource: EventSource | null = null;
  private pollingTimer: NodeJS.Timeout | null = null;
  private reconnectTimer: NodeJS.Timeout | null = null;
  
  private config: ConnectionConfig;
  private state: ConnectionState;
  private listeners: Map<string, Set<Function>> = new Map();
  private retryCount = 0;

  constructor(config: ConnectionConfig) {
    this.config = config;
    this.state = {
      type: 'offline',
      status: 'disconnected'
    };
  }

  // Public API
  async connect(): Promise<boolean> {
    if (!window.isSecureContext) {
      console.warn('PWA: Insecure context, using polling fallback');
      return this.connectPolling();
    }

    // Try WebSocket first
    if (await this.connectWebSocket()) {
      return true;
    }

    // Fallback to SSE
    if (await this.connectSSE()) {
      return true;
    }

    // Final fallback to polling
    return this.connectPolling();
  }

  disconnect(): void {
    this.cleanup();
    this.state.status = 'disconnected';
    this.emit('statuschange', this.state);
  }

  send(data: any): boolean {
    switch (this.state.type) {
      case 'websocket':
        if (this.ws?.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify(data));
          return true;
        }
        break;
      
      case 'sse':
      case 'polling':
        // Send via HTTP POST for SSE/polling
        this.sendViaHTTP(data);
        return true;
    }
    return false;
  }

  // Event handling
  on(event: string, listener: Function): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(listener);
  }

  off(event: string, listener: Function): void {
    this.listeners.get(event)?.delete(listener);
  }

  getState(): ConnectionState {
    return { ...this.state };
  }

  // WebSocket connection
  private async connectWebSocket(): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        const wsUrl = this.config.wsUrl.replace('http://', 'wss://').replace('https://', 'wss://');
        this.ws = new WebSocket(wsUrl);
        
        const timeout = setTimeout(() => {
          this.ws?.close();
          resolve(false);
        }, 5000);

        this.ws.onopen = () => {
          clearTimeout(timeout);
          this.state = { type: 'websocket', status: 'connected', lastConnected: new Date() };
          this.retryCount = 0;
          this.emit('statuschange', this.state);
          resolve(true);
        };

        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            this.emit('message', data);
          } catch (e) {
            console.warn('PWA: Invalid WebSocket message:', e);
          }
        };

        this.ws.onclose = () => {
          clearTimeout(timeout);
          this.state.status = 'disconnected';
          this.emit('statuschange', this.state);
          this.scheduleReconnect();
        };

        this.ws.onerror = (error) => {
          clearTimeout(timeout);
          console.warn('PWA: WebSocket error:', error);
          this.state.lastError = 'WebSocket connection failed';
          resolve(false);
        };

      } catch (error) {
        console.warn('PWA: WebSocket not supported or failed:', error);
        resolve(false);
      }
    });
  }

  // Server-Sent Events fallback
  private async connectSSE(): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        this.eventSource = new EventSource(this.config.sseUrl);
        
        const timeout = setTimeout(() => {
          this.eventSource?.close();
          resolve(false);
        }, 5000);

        this.eventSource.onopen = () => {
          clearTimeout(timeout);
          this.state = { type: 'sse', status: 'connected', lastConnected: new Date() };
          this.retryCount = 0;
          this.emit('statuschange', this.state);
          resolve(true);
        };

        this.eventSource.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            this.emit('message', data);
          } catch (e) {
            console.warn('PWA: Invalid SSE message:', e);
          }
        };

        this.eventSource.onerror = () => {
          clearTimeout(timeout);
          this.state.status = 'disconnected';
          this.state.lastError = 'SSE connection failed';
          this.emit('statuschange', this.state);
          resolve(false);
        };

      } catch (error) {
        console.warn('PWA: SSE not supported:', error);
        resolve(false);
      }
    });
  }

  // Polling fallback
  private connectPolling(): boolean {
    this.state = { type: 'polling', status: 'connected', lastConnected: new Date() };
    this.retryCount = 0;
    this.emit('statuschange', this.state);
    
    this.startPolling();
    return true;
  }

  private startPolling(): void {
    this.pollingTimer = setInterval(async () => {
      try {
        const response = await fetch(this.config.pollingUrl);
        if (response.ok) {
          const data = await response.json();
          if (data.messages?.length > 0) {
            data.messages.forEach((msg: any) => this.emit('message', msg));
          }
        }
      } catch (error) {
        console.warn('PWA: Polling failed:', error);
        this.state.lastError = 'Polling failed';
        this.emit('statuschange', this.state);
      }
    }, 2000);
  }

  // Send data via HTTP for SSE/polling
  private async sendViaHTTP(data: any): Promise<void> {
    try {
      await fetch(this.config.pollingUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.warn('PWA: HTTP send failed:', error);
    }
  }

  // Reconnection logic
  private scheduleReconnect(): void {
    if (this.retryCount >= this.config.retryAttempts) {
      console.warn('PWA: Max retry attempts reached');
      return;
    }

    const delay = this.config.retryDelay * Math.pow(2, this.retryCount);
    this.retryCount++;

    this.reconnectTimer = setTimeout(() => {
      console.log(`PWA: Reconnecting attempt ${this.retryCount}`);
      this.connect();
    }, delay);
  }

  // Cleanup
  private cleanup(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
    
    if (this.pollingTimer) {
      clearInterval(this.pollingTimer);
      this.pollingTimer = null;
    }
    
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  // Event emitter
  private emit(event: string, data: any): void {
    this.listeners.get(event)?.forEach(listener => {
      try {
        listener(data);
      } catch (error) {
        console.warn('PWA: Event listener error:', error);
      }
    });
  }
}

// Default connection instance
export const createSecureConnection = () => {
  const config: ConnectionConfig = {
    wsUrl: import.meta.env.NEXT_PUBLIC_WS_URL || 'wss://wwhqbjrhbajpabfdwnip.functions.supabase.co/functions/v1/realtime-chat',
    sseUrl: import.meta.env.NEXT_PUBLIC_SSE_URL || 'https://wwhqbjrhbajpabfdwnip.functions.supabase.co/functions/v1/events',
    pollingUrl: import.meta.env.NEXT_PUBLIC_POLLING_URL || 'https://wwhqbjrhbajpabfdwnip.functions.supabase.co/functions/v1/poll',
    retryAttempts: 5,
    retryDelay: 1000
  };

  return new SecureConnectionManager(config);
};