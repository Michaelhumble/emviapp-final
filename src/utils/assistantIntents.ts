
type IntentType = 'BOOKING' | 'SUPPORT' | 'INFO' | 'REFERRAL' | 'ERROR' | 'GREETING' | 'UNKNOWN';

interface DetectedIntent {
  type: IntentType;
  confidence: number;
  entities: {
    date?: string;
    time?: string;
    service?: string;
    location?: string;
    artistName?: string;
    dayOfWeek?: number;
    [key: string]: any;
  };
  originalText: string;
}

/**
 * Analyzes user input to determine their intent
 */
export const detectIntent = (input: string): DetectedIntent => {
  const lowerInput = input.toLowerCase();
  
  // Default intent structure
  const intent: DetectedIntent = {
    type: 'UNKNOWN',
    confidence: 0,
    entities: {},
    originalText: input
  };

  // GREETING intent detection
  if (/^(hi|hello|hey|howdy|greetings|good morning|good afternoon|good evening)\b/i.test(lowerInput)) {
    intent.type = 'GREETING';
    intent.confidence = 0.9;
    return intent;
  }
  
  // BOOKING intent detection
  if (lowerInput.includes('book') || 
      lowerInput.includes('schedule') || 
      lowerInput.includes('appointment') || 
      lowerInput.includes('reserve') ||
      (lowerInput.includes('time') && (lowerInput.includes('available') || lowerInput.includes('open')))) {
    
    intent.type = 'BOOKING';
    intent.confidence = 0.8;
    
    // Extract date entities
    if (lowerInput.includes('today')) {
      intent.entities.date = new Date().toISOString().split('T')[0];
      intent.entities.dayOfWeek = new Date().getDay();
    } else if (lowerInput.includes('tomorrow')) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      intent.entities.date = tomorrow.toISOString().split('T')[0];
      intent.entities.dayOfWeek = tomorrow.getDay();
    } else {
      // Extract specific day of week
      const dayMapping: Record<string, number> = {
        'monday': 1, 'tuesday': 2, 'wednesday': 3, 'thursday': 4,
        'friday': 5, 'saturday': 6, 'sunday': 0
      };
      
      for (const [day, value] of Object.entries(dayMapping)) {
        if (lowerInput.includes(day)) {
          intent.entities.dayOfWeek = value;
          const nextDate = findNextDayOfWeek(value);
          intent.entities.date = nextDate.toISOString().split('T')[0];
          break;
        }
      }
    }
    
    // Extract time entities
    const timePattern = /(\d{1,2})(:\d{2})?\s*(am|pm)/i;
    const timeMatch = lowerInput.match(timePattern);
    if (timeMatch) {
      const hour = parseInt(timeMatch[1]);
      const minutes = timeMatch[2] ? timeMatch[2].substring(1) : '00';
      const period = timeMatch[3].toLowerCase();
      
      let hour24 = hour;
      if (period === 'pm' && hour < 12) hour24 += 12;
      if (period === 'am' && hour === 12) hour24 = 0;
      
      intent.entities.time = `${hour24.toString().padStart(2, '0')}:${minutes}`;
    }
    
    // Extract service entities
    const serviceTypes = ['nails', 'manicure', 'pedicure', 'haircut', 'hair', 'lashes', 'sns', 
                          'facial', 'massage', 'eyelash', 'waxing', 'braids', 'gel', 'set', 'color'];
    for (const service of serviceTypes) {
      if (lowerInput.includes(service)) {
        intent.entities.service = service;
        break;
      }
    }
    
    // Extract location entities
    const locationPattern = /\b(?:in|at|near)\s+([a-z\s]+)/i;
    const locationMatch = lowerInput.match(locationPattern);
    if (locationMatch) {
      intent.entities.location = locationMatch[1].trim();
    }
    
    // Extract artist name entities
    const artistPattern = /\b(?:with|from|by)\s+([a-z]+)/i;
    const artistMatch = lowerInput.match(artistPattern);
    if (artistMatch) {
      intent.entities.artistName = artistMatch[1].trim();
    }
    
    return intent;
  }
  
  // SUPPORT intent detection
  if (lowerInput.includes('help') || 
      lowerInput.includes('support') || 
      lowerInput.includes('issue') || 
      lowerInput.includes('problem') ||
      lowerInput.includes('not working') ||
      lowerInput.includes('confused') ||
      lowerInput.includes('stuck')) {
    
    intent.type = 'SUPPORT';
    intent.confidence = 0.75;
    return intent;
  }
  
  // INFO intent detection
  if (lowerInput.includes('how does') || 
      lowerInput.includes('what is') || 
      lowerInput.includes('tell me about') ||
      lowerInput.includes('explain') ||
      lowerInput.includes('information') ||
      lowerInput.includes('learn more') ||
      lowerInput.includes('details')) {
    
    intent.type = 'INFO';
    intent.confidence = 0.7;
    
    // Extract specific info topics
    const topics = {
      pricing: ['price', 'cost', 'fee', 'how much', 'expensive', 'affordable'],
      features: ['feature', 'offer', 'provide', 'capability', 'can do', 'function'],
      referrals: ['referral', 'refer', 'invite', 'friend', 'credit', 'points', 'reward']
    };
    
    for (const [topic, keywords] of Object.entries(topics)) {
      for (const keyword of keywords) {
        if (lowerInput.includes(keyword)) {
          intent.entities.topic = topic;
          intent.confidence = 0.85; // Higher confidence with specific topic
          break;
        }
      }
      if (intent.entities.topic) break;
    }
    
    return intent;
  }
  
  // REFERRAL intent detection
  if (lowerInput.includes('referral') || 
      lowerInput.includes('refer') || 
      lowerInput.includes('invite') ||
      lowerInput.includes('recommend') ||
      lowerInput.includes('share') ||
      lowerInput.includes('friend')) {
    
    intent.type = 'REFERRAL';
    intent.confidence = 0.8;
    return intent;
  }
  
  // If we can't determine intent, return UNKNOWN
  return intent;
};

/**
 * Finds the next date for a given day of week
 */
function findNextDayOfWeek(targetDay: number): Date {
  const today = new Date();
  const currentDay = today.getDay();
  const daysToAdd = (targetDay - currentDay + 7) % 7;
  const nextDate = new Date();
  nextDate.setDate(today.getDate() + (daysToAdd === 0 ? 7 : daysToAdd));
  return nextDate;
}

/**
 * Formats a date string to a friendly format
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  } catch (e) {
    return dateString;
  }
};

/**
 * Formats a time string to 12-hour format
 */
export const formatTime = (timeString: string): string => {
  try {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${period}`;
  } catch (e) {
    return timeString;
  }
};
