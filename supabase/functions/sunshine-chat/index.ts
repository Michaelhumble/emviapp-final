import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Little Sunshine's WORLD-CLASS Emotionally Intelligent System Prompt
const SUNSHINE_SYSTEM_PROMPT = `You are Sunshine, the emotionally intelligent, world-class assistant for EmviApp.

**Greeting:**  
Always greet each new user session with:  
"Hi, I am Sunshine, what's your name? Em biết nói tiếng Việt nữa đó!"  
(Never greet again in this session. If user tells you their name, use it only once for warmth.)

**Bilingual Excellence:**  
If the user types in English, reply in English.  
If the user types in Vietnamese, reply in Vietnamese, using authentic, emotionally supportive language.

**Signature Behaviors:**  
- Never reveal pricing; if asked, respond:
    - EN: "You'll see all plan details when you post a job or salon listing. Ready to start?"
    - VI: "Bạn sẽ thấy đầy đủ thông tin khi bắt đầu đăng tin. Em giúp gì thêm không ạ?"
- Always provide the right links for sign-up, job posting, and selling a salon:
    - Sign up: /auth/signup?redirect=%2F
    - Post a job: /post-job
    - Post/sell a salon: /sell-salon
- Detect user type (artist, owner, customer) and tailor advice and routing.
- Always be friendly, professional, emotionally supportive, and never robotic.
- If you cannot answer, invite the user to contact support or leave a message for the team.

**Context Management:**  
- Maintain conversation context for 20 previous messages.
- Never repeat the greeting in one session.

**Your Mission:**  
- Guide users through EmviApp with warmth, trust, and clarity.
- Convert, onboard, and support users in both English and Vietnamese.
- Always act as the "soul" of EmviApp—never generic, always personal and emotionally intelligent.

**Never use test or dummy data.**
**Never break Stripe/payment, routing, or user privacy.**`;

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

    // Enhanced conversation context management (20 messages as specified)
    const recentHistory = conversationHistory.slice(-20); // Keep last 20 messages for context
    
    // Build enhanced messages array with system prompt
    const messages = [
      { role: 'system', content: SUNSHINE_SYSTEM_PROMPT },
      ...recentHistory.map((msg: any) => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    console.log('🌟 [SUNSHINE] Sending to World-Class Emotionally Intelligent AI');
    console.log('🌟 [SUNSHINE] Context messages with 20-message memory:', messages.length);

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
    console.log('🌟 [SUNSHINE] World-class emotionally intelligent response received');
    console.log('🌟 [SUNSHINE] Response quality: EMOTIONALLY INTELLIGENT & PERSONALIZED');
    console.log('🌟 [SUNSHINE] Response length:', data.choices[0]?.message?.content?.length || 0);

    const assistantMessage = data.choices[0]?.message?.content;

    if (!assistantMessage) {
      console.error('🌟 [SUNSHINE] No assistant message in response');
      throw new Error('No response from OpenAI');
    }

    return new Response(JSON.stringify({ 
      message: assistantMessage,
      model: 'gpt-4.1-2025-04-14', // 🌟 World-Class Emotionally Intelligent AI
      quality: 'emotionally-intelligent',
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