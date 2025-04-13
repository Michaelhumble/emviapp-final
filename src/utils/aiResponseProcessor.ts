
import { ActionSuggestion } from "@/components/chat/ChatSystem";

// Process AI response to extract action suggestions based on content
export const processAiResponse = (
  response: string
): { message: string; suggestedActions: ActionSuggestion[] } => {
  const suggestedActions: ActionSuggestion[] = [];
  
  // Check for action indicators in the response
  if (response.includes('Post a Job') || response.includes('job posting')) {
    suggestedActions.push({
      id: 'post-job',
      label: 'Post a Job',
      icon: 'briefcase',
      href: '/jobs'
    });
  }
  
  if (response.includes('Book an Artist') || response.includes('booking')) {
    suggestedActions.push({
      id: 'book-artist',
      label: 'Book an Artist',
      icon: 'calendar',
      href: '/artists'
    });
  }
  
  if (response.includes('Sell My Salon') || response.includes('list your salon')) {
    suggestedActions.push({
      id: 'sell-salon',
      label: 'Sell My Salon',
      icon: 'store',
      href: '/salon-sales'
    });
  }
  
  if (response.includes('Explore Artists') || response.includes('find stylists')) {
    suggestedActions.push({
      id: 'explore-artists',
      label: 'Explore Artists',
      icon: 'users',
      href: '/artists'
    });
  }
  
  if (response.includes('pricing page') || response.includes('pricing plans')) {
    suggestedActions.push({
      id: 'pricing',
      label: 'View Pricing',
      icon: 'credit-card',
      href: '/pricing'
    });
  }
  
  // If we couldn't extract any specific actions but the response is substantial,
  // provide some default actions based on the context
  if (suggestedActions.length === 0 && response.length > 50) {
    // Get default actions
    const defaultActions = getDefaultActions();
    
    // Add up to 2 default actions
    suggestedActions.push(...defaultActions.slice(0, 2));
  }
  
  return {
    message: response,
    suggestedActions
  };
};

export const getDefaultActions = (): ActionSuggestion[] => {
  return [
    {
      id: 'explore',
      label: 'Explore Artists',
      icon: 'users',
      href: '/artists'
    },
    {
      id: 'jobs',
      label: 'Browse Jobs',
      icon: 'briefcase',
      href: '/jobs'
    },
    {
      id: 'sell-salon',
      label: 'Sell My Salon',
      icon: 'store',
      href: '/salon-sales'
    }
  ];
};
