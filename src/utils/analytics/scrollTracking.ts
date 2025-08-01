// Google Analytics Scroll Tracking and Sign-up Funnel Analytics

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

interface ScrollDepthEvent {
  depth: number;
  element?: string;
  timestamp: number;
}

interface FunnelStep {
  step: string;
  action: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

class ScrollTracker {
  private scrollDepths: Set<number> = new Set();
  private funnelSteps: FunnelStep[] = [];
  private maxScroll: number = 0;
  private startTime: number = Date.now();
  private isInitialized: boolean = false;

  initialize() {
    if (this.isInitialized) return;
    
    this.setupScrollTracking();
    this.setupFunnelTracking();
    this.setupExitIntentTracking();
    this.isInitialized = true;
    
    console.log('📊 Scroll and Funnel Analytics initialized');
  }

  private setupScrollTracking() {
    let ticking = false;
    
    const trackScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      this.maxScroll = Math.max(this.maxScroll, scrollPercent);
      
      // Track scroll depth milestones
      const milestones = [10, 25, 50, 75, 90, 100];
      milestones.forEach(depth => {
        if (scrollPercent >= depth && !this.scrollDepths.has(depth)) {
          this.scrollDepths.add(depth);
          this.trackScrollDepth(depth);
        }
      });
      
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(trackScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
  }

  private trackScrollDepth(depth: number) {
    const timeOnPage = Date.now() - this.startTime;
    
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'scroll_depth', {
        event_category: 'engagement',
        event_label: `${depth}%`,
        value: depth,
        custom_map: {
          time_on_page: Math.round(timeOnPage / 1000),
          max_scroll: this.maxScroll
        }
      });
    }
    
    console.log(`📈 Scroll depth: ${depth}% (Time: ${Math.round(timeOnPage/1000)}s)`);
  }

  private setupFunnelTracking() {
    // Track CTA clicks
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const clickedElement = target.closest('a, button');
      
      if (!clickedElement) return;
      
      const text = clickedElement.textContent?.trim().toLowerCase() || '';
      const href = (clickedElement as HTMLAnchorElement).href || '';
      
      // Sign-up funnel tracking
      if (text.includes('start your journey') || text.includes('join emviapp') || text.includes('sign up')) {
        this.trackFunnelStep('cta_click', 'primary_signup_cta', {
          element_text: text,
          element_position: this.getElementPosition(clickedElement),
          scroll_depth: this.maxScroll
        });
      }
      
      // Secondary CTAs
      if (text.includes('browse jobs') || text.includes('explore opportunities')) {
        this.trackFunnelStep('cta_click', 'secondary_browse_cta', {
          element_text: text,
          element_position: this.getElementPosition(clickedElement)
        });
      }
      
      // Micro-conversion tracking
      if (text.includes('preview jobs') || text.includes('get preview')) {
        this.trackFunnelStep('micro_conversion', 'email_preview_attempt', {
          element_text: text
        });
      }
    });
    
    // Track form submissions
    document.addEventListener('submit', (e) => {
      const form = e.target as HTMLFormElement;
      const action = form.action || window.location.href;
      
      if (action.includes('signup') || action.includes('register')) {
        this.trackFunnelStep('form_submit', 'signup_form_submission', {
          form_action: action,
          time_to_submit: Date.now() - this.startTime
        });
      }
    });
  }

  private setupExitIntentTracking() {
    document.addEventListener('mouseleave', (e) => {
      if (e.clientY <= 0) {
        this.trackFunnelStep('exit_intent', 'mouse_leave_top', {
          scroll_depth: this.maxScroll,
          time_on_page: Date.now() - this.startTime
        });
      }
    });
    
    window.addEventListener('beforeunload', () => {
      this.trackFunnelStep('page_exit', 'beforeunload', {
        max_scroll_reached: this.maxScroll,
        total_time_on_page: Date.now() - this.startTime,
        funnel_steps_completed: this.funnelSteps.length
      });
    });
  }

  private trackFunnelStep(step: string, action: string, metadata?: Record<string, any>) {
    const funnelStep: FunnelStep = {
      step,
      action,
      timestamp: Date.now(),
      metadata
    };
    
    this.funnelSteps.push(funnelStep);
    
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'funnel_step', {
        event_category: 'conversion_funnel',
        event_label: `${step}_${action}`,
        value: this.funnelSteps.length,
        custom_map: {
          step_number: this.funnelSteps.length,
          time_since_start: Date.now() - this.startTime,
          ...metadata
        }
      });
    }
    
    console.log(`🎯 Funnel step: ${step} -> ${action}`, metadata);
  }

  private getElementPosition(element: Element): string {
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    if (rect.top < viewportHeight * 0.33) return 'above_fold';
    if (rect.top < viewportHeight * 0.66) return 'middle_fold';
    return 'below_fold';
  }

  // Public methods for manual tracking
  trackCustomEvent(eventName: string, properties?: Record<string, any>) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, {
        event_category: 'custom',
        ...properties
      });
    }
  }

  trackSignUpStart() {
    this.trackFunnelStep('signup_start', 'signup_page_viewed', {
      referrer: document.referrer,
      source: this.getTrafficSource()
    });
  }

  trackSignUpComplete() {
    this.trackFunnelStep('signup_complete', 'account_created', {
      conversion_time: Date.now() - this.startTime,
      total_funnel_steps: this.funnelSteps.length
    });
  }

  trackEmailCapture(email: string) {
    this.trackFunnelStep('email_capture', 'email_submitted', {
      email_domain: email.split('@')[1],
      conversion_time: Date.now() - this.startTime
    });
  }

  private getTrafficSource(): string {
    const referrer = document.referrer.toLowerCase();
    if (referrer.includes('facebook.com')) return 'facebook';
    if (referrer.includes('google.com')) return 'google';
    if (referrer.includes('instagram.com')) return 'instagram';
    if (referrer.includes('linkedin.com')) return 'linkedin';
    if (!referrer) return 'direct';
    return 'other';
  }

  // Get analytics summary for debugging
  getAnalyticsSummary() {
    return {
      maxScrollDepth: this.maxScroll,
      timeOnPage: Date.now() - this.startTime,
      funnelStepsCompleted: this.funnelSteps.length,
      scrollMilestones: Array.from(this.scrollDepths),
      trafficSource: this.getTrafficSource(),
      funnelSteps: this.funnelSteps
    };
  }
}

// Export singleton instance
export const scrollTracker = new ScrollTracker();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => scrollTracker.initialize(), 1000);
  });
} else {
  setTimeout(() => scrollTracker.initialize(), 1000);
}

// Export utility functions
export const trackScrollDepth = (depth: number) => scrollTracker.trackCustomEvent('manual_scroll_depth', { depth });
export const trackCTAClick = (ctaName: string, position: string) => scrollTracker.trackCustomEvent('cta_click', { cta_name: ctaName, position });
export const trackSignUpStart = () => scrollTracker.trackSignUpStart();
export const trackSignUpComplete = () => scrollTracker.trackSignUpComplete();
export const trackEmailCapture = (email: string) => scrollTracker.trackEmailCapture(email);