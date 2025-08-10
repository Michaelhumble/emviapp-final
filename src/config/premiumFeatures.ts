// Premium Features Configuration
// Toggle these to enable/disable features easily

export const PREMIUM_FEATURES = {
  // Core Premium Features
  VOICE_CHAT: false,           // Real-time voice conversation
  PHOTO_UPLOAD: false,         // Photo upload for beauty analysis
  AI_IMAGE_GEN: false,         // AI image generation
  TEXT_TO_SPEECH: false,       // Little Sunshine speaks responses
  
  // Advanced Features
  ADVANCED_ANALYSIS: false,    // Advanced beauty analysis
  PREMIUM_VOICES: false,       // Multiple voice options
  UNLIMITED_MESSAGES: false,   // Remove message limits
  PRIORITY_SUPPORT: false,     // Priority customer support
  
  // Coming Soon Features
  VIRTUAL_TRY_ON: false,       // Virtual makeup/nail try-on
  APPOINTMENT_BOOKING: false,  // Direct salon booking
  BEAUTY_COACHING: false,      // Personalized beauty coaching
  STYLE_RECOMMENDATIONS: false, // AI-powered style recommendations

  // UI Flags
  SHOW_HOME_METRICS: false      // Render big metrics block on Home (off by default)
} as const;

export type PremiumFeature = keyof typeof PREMIUM_FEATURES;

export const isFeatureEnabled = (feature: PremiumFeature): boolean => {
  return PREMIUM_FEATURES[feature];
};

// Feature descriptions for UI
export const FEATURE_DESCRIPTIONS = {
  VOICE_CHAT: {
    title: "Voice Chat",
    description: "Have natural voice conversations with Little Sunshine",
    icon: "🎤",
    comingSoonDate: "Q2 2025"
  },
  PHOTO_UPLOAD: {
    title: "Photo Analysis",
    description: "Upload photos for personalized beauty advice",
    icon: "📸",
    comingSoonDate: "Q1 2025"
  },
  AI_IMAGE_GEN: {
    title: "AI Image Generation",
    description: "Generate custom nail art, hairstyles, and beauty looks",
    icon: "🎨",
    comingSoonDate: "Q2 2025"
  },
  TEXT_TO_SPEECH: {
    title: "Voice Responses",
    description: "Hear Little Sunshine's voice in multiple languages",
    icon: "🔊",
    comingSoonDate: "Q1 2025"
  },
  ADVANCED_ANALYSIS: {
    title: "Advanced Analysis",
    description: "Deep beauty analysis with professional recommendations",
    icon: "🔬",
    comingSoonDate: "Q2 2025"
  },
  PREMIUM_VOICES: {
    title: "Premium Voices",
    description: "Choose from multiple voice personalities",
    icon: "👄",
    comingSoonDate: "Q2 2025"
  },
  UNLIMITED_MESSAGES: {
    title: "Unlimited Chat",
    description: "No limits on conversations with Little Sunshine",
    icon: "💬",
    comingSoonDate: "Available Now"
  },
  PRIORITY_SUPPORT: {
    title: "Priority Support",
    description: "Get help faster with priority customer support",
    icon: "⚡",
    comingSoonDate: "Q1 2025"
  },
  VIRTUAL_TRY_ON: {
    title: "Virtual Try-On",
    description: "See how makeup and nail designs look on you",
    icon: "💄",
    comingSoonDate: "Q3 2025"
  },
  APPOINTMENT_BOOKING: {
    title: "Smart Booking",
    description: "Book salon appointments directly through chat",
    icon: "📅",
    comingSoonDate: "Q2 2025"
  },
  BEAUTY_COACHING: {
    title: "Beauty Coaching",
    description: "Personalized beauty routines and tips",
    icon: "🌟",
    comingSoonDate: "Q3 2025"
  },
  STYLE_RECOMMENDATIONS: {
    title: "Style AI",
    description: "AI-powered style recommendations based on your preferences",
    icon: "✨",
    comingSoonDate: "Q3 2025"
  },
  SHOW_HOME_METRICS: {
    title: "Home Metrics Block",
    description: "Toggle visibility of large metrics section on Home",
    icon: "📊",
    comingSoonDate: "Available"
  }
};