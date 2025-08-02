// Smart tracking utilities for sign-up funnel
export interface UserTrackingData {
  hasSeenBanner: boolean;
  bannerDismissedAt: number | null;
  exitIntentShown: number;
  returnVisitorShown: number;
  lastVisit: number;
  isSignedUp: boolean;
  sessionId: string;
}

const STORAGE_KEY = 'emvi_user_tracking';
const BANNER_REAPPEAR_HOURS = 24;
const MAX_EXIT_INTENT_SHOWS = 2;
const RETURN_VISITOR_DELAY = 5000; // 5 seconds

// Generate unique session ID
const generateSessionId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Get current session ID or create new one
const getCurrentSessionId = (): string => {
  const sessionKey = 'emvi_session_id';
  let sessionId = sessionStorage.getItem(sessionKey);
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem(sessionKey, sessionId);
  }
  return sessionId;
};

// Get tracking data with defaults
export const getTrackingData = (): UserTrackingData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const defaults: UserTrackingData = {
      hasSeenBanner: false,
      bannerDismissedAt: null,
      exitIntentShown: 0,
      returnVisitorShown: 0,
      lastVisit: Date.now(),
      isSignedUp: false,
      sessionId: getCurrentSessionId()
    };

    if (!stored) {
      saveTrackingData(defaults);
      return defaults;
    }

    const parsed = JSON.parse(stored);
    return { ...defaults, ...parsed, sessionId: getCurrentSessionId() };
  } catch (error) {
    console.warn('Error reading tracking data:', error);
    const defaults: UserTrackingData = {
      hasSeenBanner: false,
      bannerDismissedAt: null,
      exitIntentShown: 0,
      returnVisitorShown: 0,
      lastVisit: Date.now(),
      isSignedUp: false,
      sessionId: getCurrentSessionId()
    };
    saveTrackingData(defaults);
    return defaults;
  }
};

// Save tracking data
export const saveTrackingData = (data: Partial<UserTrackingData>): void => {
  try {
    const current = getTrackingData();
    const updated = { ...current, ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.warn('Error saving tracking data:', error);
  }
};

// Check if banner should be shown
export const shouldShowBanner = (): boolean => {
  const data = getTrackingData();
  
  // Never show if user is signed up
  if (data.isSignedUp) return false;
  
  // If never dismissed, show it
  if (!data.bannerDismissedAt) return true;
  
  // Check if enough time has passed since dismissal
  const hoursSinceDismissal = (Date.now() - data.bannerDismissedAt) / (1000 * 60 * 60);
  return hoursSinceDismissal >= BANNER_REAPPEAR_HOURS;
};

// Check if exit intent modal should be shown
export const shouldShowExitIntent = (): boolean => {
  const data = getTrackingData();
  
  // Never show if user is signed up
  if (data.isSignedUp) return false;
  
  // Check frequency cap
  return data.exitIntentShown < MAX_EXIT_INTENT_SHOWS;
};

// Check if return visitor modal should be shown
export const shouldShowReturnVisitor = (): boolean => {
  const data = getTrackingData();
  
  // Never show if user is signed up
  if (data.isSignedUp) return false;
  
  // Check if this is a return visit (not first time)
  const hoursSinceLastVisit = (Date.now() - data.lastVisit) / (1000 * 60 * 60);
  const isReturnVisitor = hoursSinceLastVisit > 1; // Consider return visitor if more than 1 hour
  
  // Check if already shown in this session
  const currentSessionId = getCurrentSessionId();
  const hasShownInSession = sessionStorage.getItem(`return_visitor_shown_${currentSessionId}`);
  
  return isReturnVisitor && !hasShownInSession && data.returnVisitorShown < 1;
};

// Mark exit intent as shown
export const markExitIntentShown = (): void => {
  const data = getTrackingData();
  saveTrackingData({ exitIntentShown: data.exitIntentShown + 1 });
};

// Mark return visitor modal as shown
export const markReturnVisitorShown = (): void => {
  const data = getTrackingData();
  const currentSessionId = getCurrentSessionId();
  
  // Mark as shown in this session
  sessionStorage.setItem(`return_visitor_shown_${currentSessionId}`, 'true');
  
  // Update persistent storage
  saveTrackingData({ returnVisitorShown: data.returnVisitorShown + 1 });
};

// Mark banner as dismissed
export const markBannerDismissed = (): void => {
  saveTrackingData({ 
    bannerDismissedAt: Date.now(),
    hasSeenBanner: true 
  });
};

// Mark user as signed up (hides all prompts)
export const markUserSignedUp = (): void => {
  saveTrackingData({ isSignedUp: true });
};

// Update last visit time
export const updateLastVisit = (): void => {
  saveTrackingData({ lastVisit: Date.now() });
};

// Reset tracking data (for testing)
export const resetTrackingData = (): void => {
  localStorage.removeItem(STORAGE_KEY);
  // Clear all session storage items related to tracking
  Object.keys(sessionStorage).forEach(key => {
    if (key.startsWith('return_visitor_shown_') || key === 'emvi_session_id') {
      sessionStorage.removeItem(key);
    }
  });
};

// Check if user is on mobile device
export const isMobileDevice = (): boolean => {
  return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Utility for smooth animations
export const smoothScrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};