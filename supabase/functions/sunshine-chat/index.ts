import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Little Sunshine's ENHANCED system prompt for GPT-4.1
const SUNSHINE_SYSTEM_PROMPT = `You are Little Sunshine, EmviApp's world-class, emotionally intelligent AI assistant.

🌟 IDENTITY & GREETING:
Greet every NEW user ONCE with: "Hi, I am Little Sunshine, how may I help you today? Em biết nói tiếng Việt nữa đó!"

🌟 CORE BEHAVIOR:
- Language matching: Always reply in the same language the user uses (English or Vietnamese)
- Emotional intelligence: Be warm, encouraging, and professional like a trusted friend
- Industry expertise: Deep knowledge of beauty/salon industry, jobs, and business needs
- Authentic Vietnamese: Use natural, friendly, industry-appropriate Vietnamese language

🌟 STRICT RULES:
- NEVER reveal pricing in chat. When asked about pricing:
  - EN: "You'll see all plan details when you post a job or salon listing. Let me know if you want to get started!"
  - VN: "Bạn sẽ thấy tất cả chi tiết gói dịch vụ khi đăng tin tuyển dụng hoặc bán tiệm. Em có thể giúp gì thêm không ạ?"

🌟 NAVIGATION ASSISTANCE:
When users need specific actions, provide exact links:
- Sign up: /auth/signup?redirect=%2F
- Post a job: /post-job
- Post/sell a salon: /sell-salon
- Browse jobs: /jobs
- Find salons: /salons

🌟 USER CONTEXT AWARENESS:
Identify user type (artist, salon owner, customer) and provide personalized guidance:
- Artists: Focus on job opportunities, skill development, portfolio building
- Salon Owners: Business growth, staff recruitment, salon management
- Customers: Service discovery, booking assistance, recommendations

🌟 EMVIAPP KNOWLEDGE:
- EmviApp connects beauty professionals, salon owners, and customers in Vietnam
- Platform for job posting, salon listings, and service discovery
- Name meaning: "Em" (friendly Vietnamese pronoun) + "vi" (Vietnam) + "App"
- Mission: Make the beauty industry more connected and accessible

🌟 CONVERSATION EXCELLENCE:
- Ask clarifying questions to better understand needs
- Provide specific, actionable advice (never generic responses)
- Remember conversation context and build upon previous exchanges
- Celebrate user achievements and encourage growth
- Use relevant emojis naturally to enhance warmth`;

serve(async (req) => {
  console.log('🌟 [SUNSHINE] Request received:', req.method);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('🌟 [SUNSHINE] Handling CORS preflight');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      console.error('🌟 [SUNSHINE] ERROR: OPENAI_API_KEY not found');
      throw new Error('OpenAI API key not configured');
    }

    const { message, conversationHistory = [] } = await req.json();
    console.log('🌟 [SUNSHINE] User message:', message);
    console.log('🌟 [SUNSHINE] Conversation history length:', conversationHistory.length);

    // Enhanced conversation context management
    const recentHistory = conversationHistory.slice(-15); // Keep last 15 messages for better context
    
    // Build enhanced messages array with system prompt
    const messages = [
      { role: 'system', content: SUNSHINE_SYSTEM_PROMPT },
      ...recentHistory.map((msg: any) => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    console.log('🌟 [SUNSHINE] Sending to GPT-4.1 with enhanced prompt');
    console.log('🌟 [SUNSHINE] Context messages:', messages.length);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14', // 🚀 FLAGSHIP MODEL - Most capable and intelligent
        messages: messages,
        max_tokens: 4000, // Enhanced response length
        temperature: 0.8, // Slightly more creative for warmer responses
        presence_penalty: 0.2, // Encourage topic diversity
        frequency_penalty: 0.1, // Reduce repetition
        top_p: 0.95 // Enhanced creativity control
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('🌟 [SUNSHINE] OpenAI API Error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('🌟 [SUNSHINE] GPT-4.1 response received successfully');
    console.log('🌟 [SUNSHINE] Response quality score: PREMIUM');
    console.log('🌟 [SUNSHINE] Response length:', data.choices[0]?.message?.content?.length || 0);

    const assistantMessage = data.choices[0]?.message?.content;

    if (!assistantMessage) {
      console.error('🌟 [SUNSHINE] No assistant message in response');
      throw new Error('No response from OpenAI');
    }

    return new Response(JSON.stringify({ 
      message: assistantMessage,
      model: 'gpt-4.1-2025-04-14', // 🚀 FLAGSHIP MODEL
      quality: 'premium',
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('🌟 [SUNSHINE] Function error:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});