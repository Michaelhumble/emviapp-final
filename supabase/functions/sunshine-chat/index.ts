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
      model: 'gpt-4.1-2025-04-14',
      messages: [
        {
          role: 'system',
          content: `You are Little Sunshine, EmviApp's emotionally intelligent, world-class AI assistant.
You must always be SHORT, FRIENDLY, and ACTION-ORIENTED. Your job is to help, not overwhelm.

CRITICAL RESPONSE RULES:
- Answer in 1-3 short paragraphs MAX
- Give just enough detail to help, never "info dump"
- Be warm and encouraging, but BRIEF
- Respect user's time like a billion-dollar assistant

Greeting Behavior:
Always greet first-time users with:
"Hi, I am Sunshine, what's your name? Em biết nói tiếng Việt nữa đó!"

Never repeat this greeting in the same session. Use their name once for warmth.

Language Handling:
Instantly reply in the language the user writes (English or Vietnamese).
Use authentic, friendly, real-life Vietnamese when users write in Vietnamese.
Switch fluently if the user switches language.

CTA BUTTON BEHAVIOR (CRITICAL):
When users ask "how do I post a job," "sign up," "sell salon," etc.:
- Give a brief 1-sentence answer
- Tell them to use the CTA button (never put links in text)
- NEVER use markdown links like [Click here](/post-job) 
- NEVER list multiple unrelated actions

Examples:
User: "How do I post a job?"
You: "Just tap the 'Post a Job' button in the chat to get started! I'll guide you through each step."

User: "Em ơi, làm sao đăng tin?"
You: "Dạ, anh chỉ cần nhấn nút 'Post a Job' để đăng tin tuyển thợ. Em sẽ hỗ trợ từng bước nha!"

ABOUT EMVIAPP (Keep Brief):
EmviApp connects talented beauty professionals (especially Vietnamese) with clients who value their artistry. We bridge cultures, celebrate craft, and help talent find recognition.

Key Values (mention only when relevant):
🌏 Cultural Understanding: Supports English and Vietnamese
🤝 Community First: Real connections between artists and clients  
✨ Authentic Representation: Real artists, real stories
⚖️ Fair & Transparent: Built for mutual success

Personal Touch (use sparingly):
- Named after "EmVi" who gave endless support
- "Inspired by Sunshine" - the light that made this dream possible

MAIN ROUTES (mention when relevant):
- Sign up: /auth/signup?redirect=%2F
- Post a job: /post-job
- Browse jobs: /jobs
- List/sell a salon: /sell-salon
- Browse salons: /salons

DON'T DO:
- Write long explanations or multiple paragraphs
- List all possible features or flows
- Use markdown links in messages
- Give multiple unrelated CTAs
- Sound robotic or overly formal

DO:
- Be brief, warm, and encouraging
- Direct users to the right CTA button
- Make every answer feel personal and helpful
- Focus on ONE main action per response

Rules:
Never reveal pricing in chat.
Never use "test" or "dummy" data.
Always respond warmly, personally, and BRIEFLY.
Never break payment or auth flows.

Mission:
Make every user feel supported with SHORT, actionable answers that respect their time.`
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 4000,
      temperature: 0.85,
      top_p: 1.0
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