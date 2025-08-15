/**
 * Scroll Stabilization Utilities
 * Prevents scroll jumping and layout shifts across the app
 */

// Track scroll position restoration
let shouldRestoreScroll = false;
let savedScrollPosition = 0;

/**
 * Saves current scroll position before navigation
 */
export const saveScrollPosition = () => {
  savedScrollPosition = window.scrollY;
  shouldRestoreScroll = true;
};

/**
 * Restores scroll position after navigation (if saved)
 */
export const restoreScrollPosition = () => {
  if (shouldRestoreScroll && savedScrollPosition > 0) {
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      window.scrollTo(0, savedScrollPosition);
      shouldRestoreScroll = false;
      savedScrollPosition = 0;
    });
  }
};

/**
 * Prevents unwanted scroll resets during data updates
 */
export const preserveScrollOnUpdate = (callback: () => void) => {
  const currentScroll = window.scrollY;
  callback();
  
  // Restore scroll if it changed unexpectedly
  requestAnimationFrame(() => {
    const newScroll = window.scrollY;
    if (Math.abs(newScroll - currentScroll) > 50) {
      window.scrollTo(0, currentScroll);
    }
  });
};

/**
 * Generate stable keys for lists
 */
export const generateStableKey = (item: any, index: number): string => {
  // Try various ID fields
  if (item?.id) return String(item.id);
  if (item?.user_id) return String(item.user_id);
  if (item?.slug) return String(item.slug);
  if (item?.title && item?.created_at) {
    return `${item.title.slice(0, 10)}-${item.created_at}`;
  }
  
  // Last resort: use index but warn
  console.warn('Using index as key - consider adding stable ID', item);
  return `item-${index}`;
};

/**
 * Debounced scroll handler
 */
export const createDebouncedScrollHandler = (
  handler: (scrollY: number) => void,
  delay: number = 16
) => {
  let timeoutId: number;
  
  return () => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      handler(window.scrollY);
    }, delay);
  };
};

/**
 * Optimized intersection observer for scroll effects
 */
export const createOptimizedObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
) => {
  const defaultOptions = {
    rootMargin: '50px 0px',
    threshold: 0.1,
    ...options
  };
  
  return new IntersectionObserver(callback, defaultOptions);
};