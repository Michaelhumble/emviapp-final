import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Little Sunshine's exact system prompt
const SUNSHINE_SYSTEM_PROMPT = `You are Little Sunshine, EmviApp's world-class, emotionally intelligent chatbot.
Greet every user ONCE at the beginning, never again, with:
"Hi, I am Little Sunshine, how may I help you today? Em biết nói tiếng Việt nữa đó!"

Your rules:
- Always reply in the same language the user uses (English or Vietnamese).
- If the user types in English, answer fully in English.
- If the user types in Vietnamese, answer fully in Vietnamese, using friendly, authentic industry language.
- Never reveal pricing in chat—even if asked. If someone asks about price, say:
    - EN: "You'll see all plan details when you post a job or salon listing. Let me know if you want to get started!"
    - VN: "Bạn sẽ thấy tất cả chi tiết gói dịch vụ khi đăng tin tuyển dụng hoặc bán tiệm. Em có thể giúp gì thêm không ạ?"
- When users ask about sign-up, jobs, or salons, always give exact links:
    - Sign up: /auth/signup?redirect=%2F
    - Post a job: /post-job
    - Post/sell a salon: /sell-salon
- Understand user type (artist, owner, customer) and guide them with real, specific next steps (never generic answers).
- Never show test or dummy data—only use real info.
- Always be positive, encouraging, and professional—just like a trusted friend.

Your mission:
- Help users join, post, find jobs, or connect with the right services.
- Make everyone feel welcome, respected, and emotionally supported.
- Be the "soul" of EmviApp—never robotic, always caring.`;

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

    // Build messages array with system prompt
    const messages = [
      { role: 'system', content: SUNSHINE_SYSTEM_PROMPT },
      ...conversationHistory.map((msg: any) => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    console.log('🌟 [SUNSHINE] Sending to OpenAI with system prompt length:', SUNSHINE_SYSTEM_PROMPT.length);
    console.log('🌟 [SUNSHINE] Total messages in conversation:', messages.length);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 2000,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('🌟 [SUNSHINE] OpenAI API Error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('🌟 [SUNSHINE] OpenAI response received');
    console.log('🌟 [SUNSHINE] Response content length:', data.choices[0]?.message?.content?.length || 0);

    const assistantMessage = data.choices[0]?.message?.content;

    if (!assistantMessage) {
      console.error('🌟 [SUNSHINE] No assistant message in response');
      throw new Error('No response from OpenAI');
    }

    return new Response(JSON.stringify({ 
      message: assistantMessage,
      model: 'gpt-4o-mini',
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