
import { ActionSuggestion } from "@/components/chat/ChatSystem";
import { BookingMatch } from "@/services/assistantService";

// Types for the action tiles that can be displayed in chat
export interface ActionTile {
  id: string;
  type: 'artist' | 'booth' | 'salon' | 'job';
  title: string;
  subtitle?: string;
  rating?: number;
  location?: string;
  price?: string;
  features?: string[];
  image?: string;
  href: string;
  actionLabel: string;
}

// Process AI response to extract action suggestions based on content
export const processAiResponse = (
  response: string
): { 
  message: string; 
  suggestedActions: ActionSuggestion[];
  actionTiles?: ActionTile[];
} => {
  const suggestedActions: ActionSuggestion[] = [];
  const actionTiles: ActionTile[] = [];
  
  // Check for job posting intent
  if (response.toLowerCase().includes('job') || 
      response.toLowerCase().includes('hire') || 
      response.toLowerCase().includes('position') ||
      response.toLowerCase().includes('employment')) {
    suggestedActions.push({
      id: 'post-job',
      label: 'Post a Job',
      icon: 'briefcase',
      href: '/jobs'
    });
    
    // Add relevant job tiles if the response is suggesting jobs
    if (response.toLowerCase().includes('here are some jobs') || 
        response.toLowerCase().includes('found these positions')) {
      actionTiles.push(
        {
          id: 'job-1',
          type: 'job',
          title: 'Senior Stylist',
          subtitle: 'Luxe Salon & Spa',
          location: 'Los Angeles, CA',
          price: '$25-35/hr',
          features: ['Full-time', 'Benefits'],
          href: '/jobs/senior-stylist',
          actionLabel: 'View Job'
        },
        {
          id: 'job-2',
          type: 'job',
          title: 'Nail Technician',
          subtitle: 'Beauty Bar',
          location: 'Denver, CO',
          price: '$22-30/hr',
          features: ['Part-time', 'Commission'],
          href: '/jobs/nail-tech',
          actionLabel: 'Apply Now'
        }
      );
    }
  }
  
  // Check for booking intent
  if (response.toLowerCase().includes('book') || 
      response.toLowerCase().includes('appointment') || 
      response.toLowerCase().includes('service') ||
      response.toLowerCase().includes('schedule')) {
    suggestedActions.push({
      id: 'book-artist',
      label: 'Book an Artist',
      icon: 'calendar',
      href: '/artists'
    });
    
    // Add artist tiles if the response is suggesting artists
    if (response.toLowerCase().includes('here are some artists') || 
        response.toLowerCase().includes('found these stylists')) {
      actionTiles.push(
        {
          id: 'artist-1',
          type: 'artist',
          title: 'Amy Nguyen',
          subtitle: 'Classic Gel Expert',
          rating: 4.9,
          location: 'Westminster, CA',
          image: '/lovable-uploads/733d57a9-1f52-4ef1-afa2-59d9507d7f92.png',
          href: '/artists/amy-nguyen',
          actionLabel: 'Book Now'
        },
        {
          id: 'artist-2',
          type: 'artist',
          title: 'Michael Torres',
          subtitle: 'Color Specialist',
          rating: 4.8,
          location: 'San Diego, CA',
          image: '/lovable-uploads/f7ba1d82-2928-4e73-a61b-112e5aaf5b7e.png',
          href: '/artists/michael-torres',
          actionLabel: 'Book Now'
        }
      );
    }
  }
  
  // Check for salon sales intent
  if (response.toLowerCase().includes('sell my salon') || 
      response.toLowerCase().includes('list your salon') ||
      response.toLowerCase().includes('salon for sale') ||
      response.toLowerCase().includes('buy a salon')) {
    suggestedActions.push({
      id: 'sell-salon',
      label: 'Sell My Salon',
      icon: 'store',
      href: '/salon-sales'
    });
    
    // Add salon tiles if the response is suggesting salons for sale
    if (response.toLowerCase().includes('here are some salons') || 
        response.toLowerCase().includes('found these salons') ||
        response.toLowerCase().includes('salon listings')) {
      actionTiles.push(
        {
          id: 'salon-1',
          type: 'salon',
          title: 'Upscale Salon',
          subtitle: 'Established 10 years',
          location: 'Miami, FL',
          price: '$175,000',
          features: ['4 chairs', 'Turnkey ready'],
          href: '/salon-sales/upscale-salon',
          actionLabel: 'View Details'
        },
        {
          id: 'salon-2',
          type: 'salon',
          title: 'Nail & Beauty Studio',
          subtitle: 'Great location',
          location: 'Chicago, IL',
          price: '$120,000',
          features: ['6 stations', 'Loyal clientele'],
          href: '/salon-sales/nail-beauty-studio',
          actionLabel: 'Contact Owner'
        }
      );
    }
  }
  
  // Check for booth rental intent
  if (response.toLowerCase().includes('booth') || 
      response.toLowerCase().includes('rent a space') ||
      response.toLowerCase().includes('chair rental')) {
    suggestedActions.push({
      id: 'find-booth',
      label: 'Find a Booth',
      icon: 'store',
      href: '/booths'
    });
    
    // Add booth tiles if the response is suggesting booths
    if (response.toLowerCase().includes('here are some booths') || 
        response.toLowerCase().includes('found these booths') ||
        response.toLowerCase().includes('available spaces')) {
      actionTiles.push(
        {
          id: 'booth-1',
          type: 'booth',
          title: 'Booth Available',
          subtitle: 'Prime location',
          location: 'Dallas, TX',
          price: '$250/week',
          features: ['Walk-ins welcome', 'Storage included'],
          href: '/booths/dallas-prime',
          actionLabel: 'See Details'
        },
        {
          id: 'booth-2',
          type: 'booth',
          title: 'Chair Rental',
          subtitle: 'Luxury salon',
          location: 'Seattle, WA',
          price: '$300/week',
          features: ['Product provided', 'High foot traffic'],
          href: '/booths/seattle-luxury',
          actionLabel: 'Apply Now'
        }
      );
    }
  }
  
  // Check for artist discovery intent
  if (response.toLowerCase().includes('find stylists') || 
      response.toLowerCase().includes('explore artists') ||
      response.toLowerCase().includes('discover talent')) {
    suggestedActions.push({
      id: 'explore-artists',
      label: 'Explore Artists',
      icon: 'users',
      href: '/artists'
    });
  }
  
  // Check for pricing intent
  if (response.toLowerCase().includes('pricing') || 
      response.toLowerCase().includes('cost') ||
      response.toLowerCase().includes('subscription')) {
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
    suggestedActions,
    actionTiles: actionTiles.length > 0 ? actionTiles : undefined
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
      id: 'book',
      label: 'Book Service',
      icon: 'calendar',
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
