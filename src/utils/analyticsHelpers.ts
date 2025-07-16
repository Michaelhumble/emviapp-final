import React from 'react';

// Analytics and interaction tracking utilities for AI recommendations

export interface InteractionEvent {
  type: 'view' | 'click' | 'like' | 'share' | 'bookmark' | 'apply' | 'contact';
  entityType: 'job' | 'salon' | 'artist' | 'post';
  entityId: string;
  userId?: string;
  sessionId: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

export class InteractionTracker {
  private events: InteractionEvent[] = [];
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  track(event: Omit<InteractionEvent, 'sessionId' | 'timestamp'>) {
    const trackingEvent: InteractionEvent = {
      ...event,
      sessionId: this.sessionId,
      timestamp: Date.now()
    };

    this.events.push(trackingEvent);
    this.sendToServer(trackingEvent);
  }

  private async sendToServer(event: InteractionEvent) {
    try {
      // Store in localStorage for now (can be enhanced with API later)
      const existingEvents = JSON.parse(localStorage.getItem('emvi_interactions') || '[]');
      existingEvents.push(event);
      
      // Keep only last 1000 events
      if (existingEvents.length > 1000) {
        existingEvents.splice(0, existingEvents.length - 1000);
      }
      
      localStorage.setItem('emvi_interactions', JSON.stringify(existingEvents));
    } catch (error) {
      console.warn('Failed to track interaction:', error);
    }
  }

  getSessionEvents(): InteractionEvent[] {
    return this.events.filter(event => event.sessionId === this.sessionId);
  }

  getUserInteractionHistory(userId: string): InteractionEvent[] {
    try {
      const allEvents = JSON.parse(localStorage.getItem('emvi_interactions') || '[]');
      return allEvents.filter((event: InteractionEvent) => event.userId === userId);
    } catch {
      return [];
    }
  }
}

// Singleton instance
export const interactionTracker = new InteractionTracker();

// Hook for tracking page views
export function usePageViewTracking(entityType: string, entityId: string, userId?: string) {
  React.useEffect(() => {
    interactionTracker.track({
      type: 'view',
      entityType: entityType as any,
      entityId,
      userId
    });
  }, [entityType, entityId, userId]);
}

// Utility functions for different interaction types
export const trackJobView = (jobId: string, userId?: string) => {
  interactionTracker.track({
    type: 'view',
    entityType: 'job',
    entityId: jobId,
    userId
  });
};

export const trackJobApplication = (jobId: string, userId?: string) => {
  interactionTracker.track({
    type: 'apply',
    entityType: 'job',
    entityId: jobId,
    userId
  });
};

export const trackSalonView = (salonId: string, userId?: string) => {
  interactionTracker.track({
    type: 'view',
    entityType: 'salon',
    entityId: salonId,
    userId
  });
};

export const trackArtistView = (artistId: string, userId?: string) => {
  interactionTracker.track({
    type: 'view',
    entityType: 'artist',
    entityId: artistId,
    userId
  });
};

export const trackContact = (entityType: 'job' | 'salon' | 'artist', entityId: string, userId?: string) => {
  interactionTracker.track({
    type: 'contact',
    entityType,
    entityId,
    userId
  });
};

// Performance tracking
export const trackPerformance = (metric: string, value: number, context?: Record<string, any>) => {
  try {
    // Track Core Web Vitals and custom metrics
    const performanceData = {
      metric,
      value,
      context,
      timestamp: Date.now(),
      url: window.location.pathname
    };

    const existingMetrics = JSON.parse(localStorage.getItem('emvi_performance') || '[]');
    existingMetrics.push(performanceData);
    
    // Keep only last 100 metrics
    if (existingMetrics.length > 100) {
      existingMetrics.splice(0, existingMetrics.length - 100);
    }
    
    localStorage.setItem('emvi_performance', JSON.stringify(existingMetrics));
  } catch (error) {
    console.warn('Failed to track performance:', error);
  }
};

// A11y event tracking
export const trackA11yEvent = (eventType: string, element: string, success: boolean) => {
  try {
    const a11yData = {
      eventType,
      element,
      success,
      timestamp: Date.now(),
      url: window.location.pathname
    };

    const existingA11y = JSON.parse(localStorage.getItem('emvi_a11y') || '[]');
    existingA11y.push(a11yData);
    
    if (existingA11y.length > 50) {
      existingA11y.splice(0, existingA11y.length - 50);
    }
    
    localStorage.setItem('emvi_a11y', JSON.stringify(existingA11y));
  } catch (error) {
    console.warn('Failed to track a11y event:', error);
  }
};
