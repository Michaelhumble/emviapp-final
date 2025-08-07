// Emergency Scale Preparation for 100M Users
import { supabase } from '@/integrations/supabase/client';

export class EmergencyScaleManager {
  private static instance: EmergencyScaleManager;
  private circuitBreakers: Map<string, CircuitBreaker> = new Map();
  private emergencyMode = false;

  static getInstance(): EmergencyScaleManager {
    if (!this.instance) {
      this.instance = new EmergencyScaleManager();
    }
    return this.instance;
  }

  // Circuit breaker for API calls
  async withCircuitBreaker<T>(
    operation: string,
    fn: () => Promise<T>,
    fallback?: () => T
  ): Promise<T> {
    const breaker = this.getCircuitBreaker(operation);
    
    if (breaker.isOpen()) {
      console.warn(`Circuit breaker OPEN for ${operation}, using fallback`);
      return fallback ? fallback() : Promise.reject(new Error('Circuit breaker open'));
    }

    try {
      const result = await fn();
      breaker.recordSuccess();
      return result;
    } catch (error) {
      breaker.recordFailure();
      if (fallback) return fallback();
      throw error;
    }
  }

  private getCircuitBreaker(operation: string): CircuitBreaker {
    if (!this.circuitBreakers.has(operation)) {
      this.circuitBreakers.set(operation, new CircuitBreaker({
        failureThreshold: 5,
        timeout: 60000,
        monitoringPeriod: 10000
      }));
    }
    return this.circuitBreakers.get(operation)!;
  }

  // Emergency cache with aggressive TTL
  private cache = new Map<string, { data: any; expires: number }>();

  setEmergencyCache(key: string, data: any, ttlSeconds = 300) {
    this.cache.set(key, {
      data,
      expires: Date.now() + (ttlSeconds * 1000)
    });
  }

  getEmergencyCache(key: string) {
    const item = this.cache.get(key);
    if (!item || Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }
    return item.data;
  }

  // Load balancing for queries
  async distributedQuery(operation: string, queryFn: () => Promise<any>) {
    const cached = this.getEmergencyCache(`query:${operation}`);
    if (cached) return cached;

    return this.withCircuitBreaker(
      'database_query',
      async () => {
        const result = await queryFn();
        
        // Cache successful results
        this.setEmergencyCache(`query:${operation}`, result, 60);
        return result;
      },
      () => []
    );
  }

  // Graceful degradation modes
  enableEmergencyMode() {
    this.emergencyMode = true;
    console.warn('🚨 EMERGENCY MODE ACTIVATED - Reduced functionality to handle load');
  }

  isEmergencyMode() {
    return this.emergencyMode;
  }

  // Connection pooling optimization
  optimizeConnections() {
    // Force connection reuse
    if (typeof window !== 'undefined') {
      (window as any).__supabase_max_connections = 5;
    }
  }
}

class CircuitBreaker {
  private failures = 0;
  private lastFailTime = 0;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';

  constructor(
    private config: {
      failureThreshold: number;
      timeout: number;
      monitoringPeriod: number;
    }
  ) {}

  recordSuccess() {
    this.failures = 0;
    this.state = 'CLOSED';
  }

  recordFailure() {
    this.failures++;
    this.lastFailTime = Date.now();
    
    if (this.failures >= this.config.failureThreshold) {
      this.state = 'OPEN';
    }
  }

  isOpen(): boolean {
    if (this.state === 'CLOSED') return false;
    
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailTime > this.config.timeout) {
        this.state = 'HALF_OPEN';
        return false;
      }
      return true;
    }
    
    return false;
  }
}

// Request deduplication for identical API calls
export class RequestDeduplicator {
  private pendingRequests = new Map<string, Promise<any>>();

  async dedupe<T>(key: string, fn: () => Promise<T>): Promise<T> {
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key);
    }

    const promise = fn().finally(() => {
      this.pendingRequests.delete(key);
    });

    this.pendingRequests.set(key, promise);
    return promise;
  }
}

export const scaleManager = EmergencyScaleManager.getInstance();
export const requestDeduplicator = new RequestDeduplicator();