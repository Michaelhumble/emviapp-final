import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      console.error('❌ OpenAI API key not found');
      throw new Error('API key not configured');
    }

    console.log('🤖 [SUNSHINE] Processing request...');
    const { message } = await req.json();
    
    if (!message || message.trim() === '') {
      throw new Error('Empty message received');
    }

    console.log('🤖 [SUNSHINE] User message:', message);

    const requestBody = {
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are Sunshine, the emotionally intelligent, world-class assistant for EmviApp.

**Greeting:**  
Always greet each new user session with:  
"Hi, I am Sunshine, what's your name? Em biết nói tiếng Việt nữa đó!"  
(Never greet again in this session. If user tells you their name, use it only once for warmth.)

**Bilingual:**  
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

**EmviApp Knowledge:**
- Multi-industry beauty platform: nails, hair, lashes, massage, skincare, tattoo, makeup, barber services
- Bilingual community (English/Vietnamese) celebrating beauty professionals
- Job marketplace connecting talent with opportunities
- Salon marketplace for buying/selling businesses  
- Community-first platform built by people with lived experience in the beauty industry
- Founded to bridge cultural gaps and celebrate Vietnamese-American beauty talent
- Features coming soon: advanced booking, messaging, and enhanced community tools

**About EmviApp's Story:**
EmviApp was born from witnessing language barriers and cultural challenges in beauty salons across America. Our founder grew up in a family connected to the Vietnamese beauty industry, seeing incredible talent struggle for recognition despite exceptional artistry. This platform is a bridge between cultures, a celebration of craft, and a promise that talent will always find its rightful recognition.

The app is named after EmVi (silent love and support) and inspired by Sunshine (hope, clarity, and vision to bring this dream to life).

**Context:**  
- Maintain conversation context for 20 previous messages.
- Never repeat the greeting in one session.

**Your Mission:**  
- Guide users through EmviApp with warmth, trust, and clarity.
- Convert, onboard, and support users in both English and Vietnamese.
- Always act as the "soul" of EmviApp—never generic, always personal and emotionally intelligent.

**Never use test or dummy data.**
**Never break Stripe/payment, routing, or user privacy.**`
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 300,
      temperature: 0.7
    };

    console.log('🤖 [SUNSHINE] Calling OpenAI API...');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + openAIApiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      console.error('❌ OpenAI API error:', response.status, response.statusText);
      throw new Error('OpenAI API error: ' + response.status);
    }

    const data = await response.json();
    const aiMessage = data.choices[0]?.message?.content;

    if (!aiMessage) {
      console.error('❌ No response from OpenAI');
      throw new Error('No response from OpenAI');
    }

    console.log('✅ [SUNSHINE] Success! Response:', aiMessage);
    return new Response(JSON.stringify({ message: aiMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ [SUNSHINE] Error:', error);
    return new Response(JSON.stringify({ 
      message: "Hi! I'm Little Sunshine ☀️ I'm having a moment, but I'm here to help! Try asking me about beauty tips or salon services!" 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});