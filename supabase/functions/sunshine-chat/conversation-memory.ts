// Conversation Memory System for Sunshine Chatbot
// This helps maintain context and build relationships over time

export interface ConversationMemory {
  userId: string;
  userName?: string;
  language: 'en' | 'vi';
  businessType?: 'artist' | 'salon' | 'customer' | 'supplier';
  interests: string[];
  previousQuestions: string[];
  goals: string[];
  challenges: string[];
  conversationHistory: {
    timestamp: string;
    topic: string;
    userMessage: string;
    assistantResponse: string;
  }[];
  lastInteraction: string;
}

export class ConversationMemoryManager {
  private supabase: any;

  constructor(supabaseClient: any) {
    this.supabase = supabaseClient;
  }

  async getMemory(userId: string): Promise<ConversationMemory | null> {
    try {
      const { data, error } = await this.supabase
        .from('conversation_memory')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) return null;
      return data;
    } catch (error) {
      console.log('Memory retrieval warning:', error);
      return null;
    }
  }

  async updateMemory(userId: string, updates: Partial<ConversationMemory>): Promise<void> {
    try {
      const existing = await this.getMemory(userId);
      
      if (existing) {
        await this.supabase
          .from('conversation_memory')
          .update({
            ...updates,
            last_interaction: new Date().toISOString()
          })
          .eq('user_id', userId);
      } else {
        await this.supabase
          .from('conversation_memory')
          .insert({
            user_id: userId,
            ...updates,
            last_interaction: new Date().toISOString()
          });
      }
    } catch (error) {
      console.log('Memory update warning:', error);
    }
  }

  async addConversationEntry(
    userId: string, 
    userMessage: string, 
    assistantResponse: string,
    topic: string
  ): Promise<void> {
    try {
      const memory = await this.getMemory(userId);
      const newEntry = {
        timestamp: new Date().toISOString(),
        topic,
        userMessage,
        assistantResponse
      };

      if (memory) {
        const updatedHistory = [...(memory.conversationHistory || []), newEntry];
        // Keep only last 10 conversations to prevent bloat
        if (updatedHistory.length > 10) {
          updatedHistory.splice(0, updatedHistory.length - 10);
        }

        await this.updateMemory(userId, {
          conversationHistory: updatedHistory,
          previousQuestions: [
            ...(memory.previousQuestions || []),
            userMessage
          ].slice(-5), // Keep last 5 questions
        });
      }
    } catch (error) {
      console.log('Conversation entry warning:', error);
    }
  }

  generateContextPrompt(memory: ConversationMemory | null): string {
    if (!memory) return '';

    const contextParts = [];

    if (memory.userName) {
      contextParts.push(`User's name: ${memory.userName} (NEVER use their name in responses)`);
    }

    if (memory.businessType) {
      contextParts.push(`Business type: ${memory.businessType}`);
    }

    if (memory.interests?.length > 0) {
      contextParts.push(`Interests: ${memory.interests.join(', ')}`);
    }

    if (memory.goals?.length > 0) {
      contextParts.push(`Goals: ${memory.goals.join(', ')}`);
    }

    if (memory.challenges?.length > 0) {
      contextParts.push(`Challenges: ${memory.challenges.join(', ')}`);
    }

    if (memory.conversationHistory?.length > 0) {
      const recentConversations = memory.conversationHistory.slice(-3);
      contextParts.push(`Recent conversation topics: ${recentConversations.map(c => c.topic).join(', ')}`);
    }

    return contextParts.length > 0 
      ? `\n🧠 CONVERSATION MEMORY:\n${contextParts.join('\n')}\n`
      : '';
  }
}
