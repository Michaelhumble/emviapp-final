import { supabase } from '@/integrations/supabase/client';

// Rate limiting utilities for production API security
export class RateLimiter {
  private static getClientIdentifier(): string {
    // Try to get user ID first, fallback to session ID
    const userId = supabase.auth.getUser().then(({ data }) => data.user?.id);
    return userId ? `user:${userId}` : `session:${sessionStorage.getItem('session_id') || 'anonymous'}`;
  }

  static async checkLimit(endpoint: string, maxRequests: number = 100, windowMinutes: number = 60): Promise<boolean> {
    try {
      const identifier = await this.getClientIdentifier();
      
      const { data, error } = await supabase
        .rpc('check_api_rate_limit', {
          p_identifier: identifier,
          p_endpoint: endpoint,
          p_max_requests: maxRequests,
          p_window_minutes: windowMinutes
        });

      if (error) {
        console.error('Rate limit check failed:', error);
        return true; // Allow request if rate limit check fails
      }

      return data;
    } catch (error) {
      console.error('Rate limit error:', error);
      return true; // Allow request if rate limit check fails
    }
  }

  static async withRateLimit<T>(
    endpoint: string,
    operation: () => Promise<T>,
    maxRequests: number = 100,
    windowMinutes: number = 60
  ): Promise<T> {
    const allowed = await this.checkLimit(endpoint, maxRequests, windowMinutes);
    
    if (!allowed) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    return operation();
  }
}

// Production search utilities
export class SearchOptimizer {
  private static readonly SEARCH_DEBOUNCE_MS = 300;
  private static readonly MAX_RESULTS_PER_PAGE = 20;

  static debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number = this.SEARCH_DEBOUNCE_MS
  ): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }

  static async searchSalons(params: {
    query?: string;
    location?: string;
    priceMin?: number;
    priceMax?: number;
    businessType?: string;
    page?: number;
  }) {
    const { query = '', location = '', priceMin = 0, priceMax = 10000000, businessType = '', page = 1 } = params;

    return RateLimiter.withRateLimit(
      'search_salons',
      async () => {
        const { data, error } = await supabase
          .rpc('search_salon_sales_optimized', {
            search_text: query,
            location_filter: location,
            price_min: priceMin,
            price_max: priceMax,
            business_type_filter: businessType,
            page_limit: this.MAX_RESULTS_PER_PAGE,
            page_offset: (page - 1) * this.MAX_RESULTS_PER_PAGE
          });

        if (error) throw error;
        return data;
      },
      50, // 50 searches per hour
      60
    );
  }
}

// Production error handling
export class ErrorHandler {
  static logError(error: any, context: string = 'Unknown') {
    console.error(`[${context}] Production Error:`, error);
    
    // In production, you might want to send to an error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { tags: { context } });
    }
  }

  static handleApiError(error: any): string {
    if (error?.message?.includes('Rate limit')) {
      return 'Too many requests. Please slow down and try again.';
    }
    
    if (error?.code === 'PGRST301') {
      return 'No results found. Try adjusting your search criteria.';
    }

    if (error?.code === 'PGRST204') {
      return 'Authentication required. Please sign in to continue.';
    }

    return 'Something went wrong. Please try again later.';
  }
}

// Performance monitoring
export class PerformanceMonitor {
  private static metrics: Map<string, number[]> = new Map();

  static startTimer(operation: string): () => void {
    const start = performance.now();
    
    return () => {
      const duration = performance.now() - start;
      
      if (!this.metrics.has(operation)) {
        this.metrics.set(operation, []);
      }
      
      const times = this.metrics.get(operation)!;
      times.push(duration);
      
      // Keep only last 100 measurements
      if (times.length > 100) {
        times.shift();
      }
      
      // Log slow operations
      if (duration > 1000) {
        console.warn(`Slow operation detected: ${operation} took ${duration.toFixed(2)}ms`);
      }
    };
  }

  static getAverageTime(operation: string): number {
    const times = this.metrics.get(operation);
    if (!times || times.length === 0) return 0;
    
    return times.reduce((sum, time) => sum + time, 0) / times.length;
  }

  static getAllMetrics(): Record<string, { avg: number; count: number }> {
    const result: Record<string, { avg: number; count: number }> = {};
    
    for (const [operation, times] of this.metrics.entries()) {
      result[operation] = {
        avg: this.getAverageTime(operation),
        count: times.length
      };
    }
    
    return result;
  }
}
