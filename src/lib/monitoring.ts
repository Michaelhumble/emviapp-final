/**
 * EmviApp Production Monitoring & Alerting System
 * 
 * Tracks critical metrics and triggers alerts for system health issues
 * Designed for 1M+ daily visitors scale
 */

import { supabase } from '@/integrations/supabase/client';

// ============================================================================
// METRIC TYPES
// ============================================================================

export interface PerformanceMetric {
  name: string;
  value: number;
  threshold: number;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface Alert {
  severity: 'critical' | 'warning' | 'info';
  message: string;
  metric: string;
  value: number;
  threshold: number;
  timestamp: Date;
}

// ============================================================================
// PERFORMANCE THRESHOLDS
// ============================================================================

const THRESHOLDS = {
  // Response time thresholds (ms)
  RESPONSE_TIME_P95: 500,
  RESPONSE_TIME_P99: 1000,
  DATABASE_LATENCY: 200,
  
  // Error rate thresholds (%)
  ERROR_RATE: 1,
  TIMEOUT_RATE: 5,
  
  // Resource usage thresholds (%)
  DATABASE_CONNECTIONS: 80,
  MEMORY_USAGE: 85,
  
  // Rate limiting thresholds
  RATE_LIMIT_HITS_PER_MINUTE: 10,
  
  // API-specific thresholds (ms)
  GOOGLE_INDEXING_API_TIMEOUT: 5000,
  STRIPE_WEBHOOK_TIMEOUT: 3000,
};

// ============================================================================
// MONITORING CLASS
// ============================================================================

export class ProductionMonitor {
  private static instance: ProductionMonitor;
  private metrics: Map<string, PerformanceMetric[]> = new Map();
  private alertBuffer: Alert[] = [];
  
  static getInstance(): ProductionMonitor {
    if (!this.instance) {
      this.instance = new ProductionMonitor();
    }
    return this.instance;
  }
  
  /**
   * Track a performance metric
   */
  trackMetric(name: string, value: number, metadata?: Record<string, any>) {
    const metric: PerformanceMetric = {
      name,
      value,
      threshold: this.getThreshold(name),
      timestamp: new Date(),
      metadata,
    };
    
    // Store metric in memory
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    this.metrics.get(name)!.push(metric);
    
    // Keep only last 100 metrics per type
    const metricList = this.metrics.get(name)!;
    if (metricList.length > 100) {
      metricList.shift();
    }
    
    // Check if alert should be triggered
    this.checkThreshold(metric);
  }
  
  /**
   * Track database query performance
   */
  async trackDatabaseQuery(
    query: string,
    startTime: number,
    success: boolean,
    metadata?: Record<string, any>
  ) {
    const duration = Date.now() - startTime;
    
    this.trackMetric('database_query_duration', duration, {
      query: query.substring(0, 100), // Store first 100 chars
      success,
      ...metadata,
    });
    
    // Log slow queries
    if (duration > THRESHOLDS.DATABASE_LATENCY) {
      await this.logSlowQuery(query, duration, metadata);
    }
  }
  
  /**
   * Track API call performance
   */
  trackApiCall(
    endpoint: string,
    startTime: number,
    statusCode: number,
    metadata?: Record<string, any>
  ) {
    const duration = Date.now() - startTime;
    const success = statusCode >= 200 && statusCode < 300;
    
    this.trackMetric('api_call_duration', duration, {
      endpoint,
      statusCode,
      success,
      ...metadata,
    });
    
    if (!success) {
      this.trackMetric('api_call_error', 1, { endpoint, statusCode });
    }
  }
  
  /**
   * Track rate limit hits
   */
  trackRateLimitHit(endpoint: string, clientIP: string) {
    this.trackMetric('rate_limit_hit', 1, { endpoint, clientIP });
    
    // Check if we're getting too many rate limit hits
    const recentHits = this.getRecentMetrics('rate_limit_hit', 60000); // Last minute
    if (recentHits.length > THRESHOLDS.RATE_LIMIT_HITS_PER_MINUTE) {
      this.createAlert('warning', 'High rate limit hits detected', 'rate_limit_hit', recentHits.length, THRESHOLDS.RATE_LIMIT_HITS_PER_MINUTE);
    }
  }
  
  /**
   * Track page load performance
   */
  trackPageLoad(pageName: string, metrics: {
    fcp: number;
    lcp: number;
    cls: number;
    fid: number;
    ttfb: number;
  }) {
    // Track each Core Web Vital
    this.trackMetric('fcp', metrics.fcp, { page: pageName });
    this.trackMetric('lcp', metrics.lcp, { page: pageName });
    this.trackMetric('cls', metrics.cls, { page: pageName });
    this.trackMetric('fid', metrics.fid, { page: pageName });
    this.trackMetric('ttfb', metrics.ttfb, { page: pageName });
    
    // Alert if LCP is too high
    if (metrics.lcp > 2500) {
      this.createAlert('warning', `High LCP on ${pageName}`, 'lcp', metrics.lcp, 2500);
    }
    
    // Alert if CLS is too high
    if (metrics.cls > 0.05) {
      this.createAlert('warning', `High CLS on ${pageName}`, 'cls', metrics.cls, 0.05);
    }
  }
  
  /**
   * Calculate p95 and p99 percentiles
   */
  getPercentile(metricName: string, percentile: number, windowMs: number = 300000): number {
    const metrics = this.getRecentMetrics(metricName, windowMs);
    if (metrics.length === 0) return 0;
    
    const sorted = metrics.map(m => m.value).sort((a, b) => a - b);
    const index = Math.ceil((percentile / 100) * sorted.length) - 1;
    return sorted[index] || 0;
  }
  
  /**
   * Get metrics within time window
   */
  private getRecentMetrics(name: string, windowMs: number): PerformanceMetric[] {
    const metricList = this.metrics.get(name);
    if (!metricList) return [];
    
    const cutoff = Date.now() - windowMs;
    return metricList.filter(m => m.timestamp.getTime() > cutoff);
  }
  
  /**
   * Get threshold for metric
   */
  private getThreshold(metricName: string): number {
    const thresholdMap: Record<string, number> = {
      'api_call_duration': THRESHOLDS.RESPONSE_TIME_P95,
      'database_query_duration': THRESHOLDS.DATABASE_LATENCY,
      'lcp': 2500,
      'fcp': 1800,
      'cls': 0.05,
      'fid': 100,
    };
    return thresholdMap[metricName] || 0;
  }
  
  /**
   * Check if metric exceeds threshold
   */
  private checkThreshold(metric: PerformanceMetric) {
    if (metric.threshold === 0) return;
    
    if (metric.value > metric.threshold) {
      // Check if we've already alerted recently (avoid spam)
      const recentAlerts = this.alertBuffer.filter(
        a => a.metric === metric.name && 
        Date.now() - a.timestamp.getTime() < 300000 // 5 minutes
      );
      
      if (recentAlerts.length === 0) {
        this.createAlert(
          'warning',
          `${metric.name} exceeded threshold`,
          metric.name,
          metric.value,
          metric.threshold
        );
      }
    }
  }
  
  /**
   * Create alert
   */
  private createAlert(
    severity: 'critical' | 'warning' | 'info',
    message: string,
    metric: string,
    value: number,
    threshold: number
  ) {
    const alert: Alert = {
      severity,
      message,
      metric,
      value,
      threshold,
      timestamp: new Date(),
    };
    
    this.alertBuffer.push(alert);
    
    // Keep only last 50 alerts
    if (this.alertBuffer.length > 50) {
      this.alertBuffer.shift();
    }
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[ALERT] ${severity.toUpperCase()}: ${message} (${value} > ${threshold})`);
    }
    
    // Send to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      this.sendAlert(alert);
    }
  }
  
  /**
   * Send alert to external monitoring service
   */
  private async sendAlert(alert: Alert) {
    try {
      // Log to console for now (monitoring_alerts table needs to be created)
      console.log('[MONITORING ALERT]', alert);
      
      // Send critical alerts to Slack/PagerDuty
      if (alert.severity === 'critical') {
        await this.sendCriticalAlert(alert);
      }
    } catch (error) {
      console.error('Failed to send alert:', error);
    }
  }
  
  /**
   * Send critical alert to external services
   */
  private async sendCriticalAlert(alert: Alert) {
    const slackWebhook = process.env.SLACK_WEBHOOK_URL;
    if (!slackWebhook) return;
    
    try {
      await fetch(slackWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `🚨 CRITICAL ALERT: ${alert.message}`,
          attachments: [{
            color: 'danger',
            fields: [
              { title: 'Metric', value: alert.metric, short: true },
              { title: 'Value', value: alert.value.toFixed(2), short: true },
              { title: 'Threshold', value: alert.threshold.toFixed(2), short: true },
              { title: 'Time', value: alert.timestamp.toISOString(), short: false },
            ],
          }],
        }),
      });
    } catch (error) {
      console.error('Failed to send Slack alert:', error);
    }
  }
  
  /**
   * Log slow query to database
   */
  private async logSlowQuery(query: string, duration: number, metadata?: Record<string, any>) {
    try {
      // Log to console for now (slow_queries table needs to be created)
      console.warn('[SLOW QUERY]', {
        query: query.substring(0, 500),
        duration_ms: duration,
        metadata,
      });
    } catch (error) {
      console.error('Failed to log slow query:', error);
    }
  }
  
  /**
   * Get current system health
   */
  getSystemHealth(): {
    status: 'healthy' | 'degraded' | 'critical';
    metrics: {
      p95ResponseTime: number;
      p99ResponseTime: number;
      errorRate: number;
      recentAlerts: Alert[];
    };
  } {
    const p95 = this.getPercentile('api_call_duration', 95, 300000); // 5 min window
    const p99 = this.getPercentile('api_call_duration', 99, 300000);
    
    // Calculate error rate
    const recentCalls = this.getRecentMetrics('api_call_duration', 300000);
    const recentErrors = this.getRecentMetrics('api_call_error', 300000);
    const errorRate = recentCalls.length > 0 
      ? (recentErrors.length / recentCalls.length) * 100 
      : 0;
    
    // Determine status
    let status: 'healthy' | 'degraded' | 'critical' = 'healthy';
    
    if (p95 > THRESHOLDS.RESPONSE_TIME_P95 || errorRate > THRESHOLDS.ERROR_RATE) {
      status = 'degraded';
    }
    
    if (p99 > THRESHOLDS.RESPONSE_TIME_P99 || errorRate > THRESHOLDS.ERROR_RATE * 2) {
      status = 'critical';
    }
    
    return {
      status,
      metrics: {
        p95ResponseTime: p95,
        p99ResponseTime: p99,
        errorRate,
        recentAlerts: this.alertBuffer.slice(-10), // Last 10 alerts
      },
    };
  }
}

// ============================================================================
// GLOBAL INSTANCE
// ============================================================================

export const monitor = ProductionMonitor.getInstance();

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Wrap an async function with performance tracking
 */
export function withMonitoring<T>(
  name: string,
  fn: () => Promise<T>,
  metadata?: Record<string, any>
): Promise<T> {
  const startTime = Date.now();
  
  return fn()
    .then(result => {
      const duration = Date.now() - startTime;
      monitor.trackMetric(`${name}_duration`, duration, { success: true, ...metadata });
      return result;
    })
    .catch(error => {
      const duration = Date.now() - startTime;
      monitor.trackMetric(`${name}_duration`, duration, { success: false, error: error.message, ...metadata });
      monitor.trackMetric(`${name}_error`, 1, { error: error.message, ...metadata });
      throw error;
    });
}

/**
 * Track a database query with automatic monitoring
 */
export async function monitoredQuery<T>(
  query: () => Promise<T>,
  queryName: string,
  metadata?: Record<string, any>
): Promise<T> {
  const startTime = Date.now();
  
  try {
    const result = await query();
    await monitor.trackDatabaseQuery(queryName, startTime, true, metadata);
    return result;
  } catch (error) {
    await monitor.trackDatabaseQuery(queryName, startTime, false, { error: (error as Error).message, ...metadata });
    throw error;
  }
}
