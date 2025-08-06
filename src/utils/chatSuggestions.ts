import { CTAButton } from './chatIntentDetection';

// Smart suggestions based on conversation context and user behavior
export interface ChatSuggestion {
  id: string;
  message: string;
  timing: 'immediate' | 'after_greeting' | 'after_question' | 'periodic';
  ctaButtons?: CTAButton[];
  conditions?: {
    messageCount?: number;
    hasAskedAbout?: string[];
    timeOnSite?: number;
  };
}

export const chatSuggestions: ChatSuggestion[] = [
  // Welcome suggestions
  {
    id: 'welcome_explore',
    message: "💡 Psst! Want to see what EmviApp can do? I can show you around or help you get started with something specific!",
    timing: 'after_greeting',
    ctaButtons: [
      { label: '✨ Explore Features', route: '/jobs', intent: 'explore' },
      { label: '💼 Post a Job', route: '/post-job', intent: 'post-job' }
    ],
    conditions: { messageCount: 2 }
  },
  
  // Job posting encouragement
  {
    id: 'encourage_job_posting',
    message: "🌟 I noticed you're interested in finding talent! Posting a job on EmviApp is super easy and connects you with amazing artists. Want me to help you get started?",
    timing: 'after_question',
    ctaButtons: [
      { label: '🚀 Post Job Now', route: '/post-job', intent: 'post-job' },
      { label: '📋 See Job Examples', route: '/jobs', intent: 'browse' }
    ],
    conditions: { hasAskedAbout: ['hire', 'job', 'staff', 'employee', 'worker'] }
  },
  
  // Business growth suggestions
  {
    id: 'business_growth',
    message: "💪 Ready to grow your beauty business? EmviApp helps salons connect with clients and find the best talent. Let's explore what's possible!",
    timing: 'after_question',
    ctaButtons: [
      { label: '🏪 List Your Salon', route: '/salon-listing', intent: 'list-salon' },
      { label: '📖 Our Story', route: '/about', intent: 'learn-more' }
    ],
    conditions: { hasAskedAbout: ['business', 'salon', 'shop', 'grow', 'expand'] }
  },
  
  // Community connection
  {
    id: 'community_connection',
    message: "🤝 Did you know EmviApp was built specifically for the Vietnamese beauty community? We understand the unique challenges and celebrate the incredible talent. Want to learn more about our mission?",
    timing: 'after_question',
    ctaButtons: [
      { label: '💛 Our Story', route: '/about', intent: 'learn-more' },
      { label: '🌟 Join Community', route: '/auth/signup', intent: 'signup' }
    ],
    conditions: { hasAskedAbout: ['vietnamese', 'community', 'culture', 'emviapp', 'story'] }
  },
  
  // Periodic engagement
  {
    id: 'periodic_help',
    message: "😊 Still browsing? I'm here whenever you need help! Whether it's posting a job, finding talent, or just learning about EmviApp - just ask!",
    timing: 'periodic',
    ctaButtons: [
      { label: '💼 Post a Job', route: '/post-job', intent: 'post-job' },
      { label: '🎯 Find Talent', route: '/jobs', intent: 'browse' }
    ],
    conditions: { messageCount: 8, timeOnSite: 300 } // After 5 minutes
  }
];

// Function to determine which suggestions to show
export const getSuggestionsForContext = (
  messageCount: number,
  conversationHistory: string[],
  timeOnSite?: number
): ChatSuggestion[] => {
  const suggestions: ChatSuggestion[] = [];
  
  // Check conversation context
  const conversationText = conversationHistory.join(' ').toLowerCase();
  
  chatSuggestions.forEach(suggestion => {
    let shouldShow = false;
    
    // Check timing conditions
    switch (suggestion.timing) {
      case 'after_greeting':
        shouldShow = messageCount >= (suggestion.conditions?.messageCount || 2) && messageCount <= 4;
        break;
        
      case 'after_question':
        if (suggestion.conditions?.hasAskedAbout) {
          shouldShow = suggestion.conditions.hasAskedAbout.some(keyword => 
            conversationText.includes(keyword)
          );
        }
        break;
        
      case 'periodic':
        shouldShow = messageCount >= (suggestion.conditions?.messageCount || 5) &&
                   messageCount % 6 === 0 && // Show every 6 messages
                   (!suggestion.conditions?.timeOnSite || (timeOnSite && timeOnSite >= suggestion.conditions.timeOnSite));
        break;
        
      default:
        shouldShow = true;
    }
    
    if (shouldShow) {
      suggestions.push(suggestion);
    }
  });
  
  // Return max 1 suggestion to avoid overwhelming
  return suggestions.slice(0, 1);
};

// Cute encouraging messages for different actions
export const encouragementMessages = {
  signup: [
    "🌟 You're about to join an amazing community!",
    "✨ Welcome to the EmviApp family!",
    "💫 Great choice! Let's get you started!"
  ],
  
  jobPost: [
    "🚀 Awesome! Let's find you some incredible talent!",
    "💼 Perfect! You're about to discover amazing artists!",
    "🎯 Smart move! Quality talent is waiting for you!"
  ],
  
  browse: [
    "👀 Get ready to be amazed by our talented community!",
    "🔍 So many incredible artists to discover!",
    "✨ You're going to love what you see!"
  ]
};

export const getRandomEncouragement = (type: keyof typeof encouragementMessages): string => {
  const messages = encouragementMessages[type];
  return messages[Math.floor(Math.random() * messages.length)];
};