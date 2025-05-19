
/**
 * Event logging utility for job posting flow
 * Helps with debugging and understanding user journey
 */

// Event types
export enum JobPostingEventType {
  PAGE_VIEW = 'page_view',
  STATE_CHANGE = 'state_change',
  USER_ACTION = 'user_action',
  FORM_SUBMISSION = 'form_submission',
  ERROR = 'error',
  PRICE_CALCULATION = 'price_calculation',
  PAYMENT_ATTEMPT = 'payment_attempt',
}

// Event data interface
interface JobPostingEventData {
  eventType: JobPostingEventType;
  timestamp: number;
  eventName: string;
  data?: any;
  error?: Error | string;
}

// Storage key for events
const EVENT_LOG_KEY = 'emviapp_job_posting_events';

// Maximum number of events to store
const MAX_EVENTS = 100;

/**
 * Log a job posting event
 */
export function logJobPostingEvent(
  eventType: JobPostingEventType, 
  eventName: string, 
  data?: any,
  error?: Error | string
): void {
  // Create event object
  const event: JobPostingEventData = {
    eventType,
    timestamp: Date.now(),
    eventName,
    data,
    error: error instanceof Error ? error.message : error
  };
  
  // Get existing events
  let events: JobPostingEventData[] = [];
  try {
    const storedEvents = localStorage.getItem(EVENT_LOG_KEY);
    if (storedEvents) {
      events = JSON.parse(storedEvents);
    }
  } catch (e) {
    console.error('Failed to parse stored events:', e);
  }
  
  // Add new event and limit size
  events.push(event);
  if (events.length > MAX_EVENTS) {
    events = events.slice(-MAX_EVENTS);
  }
  
  // Store updated events
  try {
    localStorage.setItem(EVENT_LOG_KEY, JSON.stringify(events));
  } catch (e) {
    console.error('Failed to store event:', e);
  }
  
  // Also log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`Job Posting Event [${eventType}]`, eventName, data, error);
  }
}

/**
 * Get all logged job posting events
 */
export function getJobPostingEvents(): JobPostingEventData[] {
  try {
    const storedEvents = localStorage.getItem(EVENT_LOG_KEY);
    if (storedEvents) {
      return JSON.parse(storedEvents);
    }
  } catch (e) {
    console.error('Failed to parse stored events:', e);
  }
  return [];
}

/**
 * Clear all logged job posting events
 */
export function clearJobPostingEvents(): void {
  localStorage.removeItem(EVENT_LOG_KEY);
}

/**
 * Export logged events as JSON
 */
export function exportJobPostingEvents(): string {
  const events = getJobPostingEvents();
  return JSON.stringify(events, null, 2);
}

// Utility functions for common events

/**
 * Log a state change event
 */
export function logStateChange(stateName: string, oldValue: any, newValue: any): void {
  logJobPostingEvent(JobPostingEventType.STATE_CHANGE, `${stateName} changed`, {
    oldValue,
    newValue
  });
}

/**
 * Log a price calculation event
 */
export function logPriceCalculation(options: any, result: any): void {
  logJobPostingEvent(JobPostingEventType.PRICE_CALCULATION, 'Price calculated', {
    options,
    result
  });
}

/**
 * Log a payment attempt event
 */
export function logPaymentAttempt(postType: string, pricingOptions: any, priceData: any): void {
  logJobPostingEvent(JobPostingEventType.PAYMENT_ATTEMPT, 'Payment initiated', {
    postType,
    pricingOptions,
    priceData
  });
}

/**
 * Log an error event
 */
export function logError(errorName: string, error: Error | string, context?: any): void {
  logJobPostingEvent(JobPostingEventType.ERROR, errorName, context, error);
}
