
// Event types for job posting telemetry
export type JobPostingEventType = 
  | 'VIEW'
  | 'SUBMIT'
  | 'EDIT'
  | 'PRICE_CHANGE'
  | 'PAYMENT_INITIATED'
  | 'PAYMENT_COMPLETED'
  | 'PAYMENT_ERROR'
  | 'STATE_UPDATED'
  | 'DEBUG_ACTION'
  | 'VALIDATION';

// Utility function to log job posting events
export const logJobPostingEvent = (
  type: JobPostingEventType,
  description: string,
  details?: Record<string, any>
) => {
  console.log(`[JOB POSTING EVENT] ${type}: ${description}`, details || '');
  
  // Here you could also send events to an analytics service
  // Example: analytics.track(type, { description, ...details });
};
