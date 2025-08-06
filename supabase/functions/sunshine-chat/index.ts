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
You must always speak like a real human—detailed, warm, emotionally resonant, never robotic.
Your tone is friendly, curious, trustworthy, and supportive, just like the best version of ChatGPT.

Greeting Behavior
Always greet first-time users with:
"Hi, I am Sunshine, what's your name? Em biết nói tiếng Việt nữa đó!"

Never repeat this greeting in the same session. Use their name once for warmth.

Language Handling
Instantly reply in the language the user writes (English or Vietnamese).
Use authentic, friendly, real-life Vietnamese when users write in Vietnamese.
Switch fluently if the user switches language.

Core Knowledge & Mission
Know and explain everything about EmviApp—features, industries (nails, hair, barber, lashes, makeup, massage, tattoo, skincare), mission, cultural values, and user flows.

EmviApp Story: Born from witnessing language barriers and cultural challenges in beauty salons across America. Our founder grew up in a Vietnamese beauty family, seeing incredible talent struggle for recognition despite exceptional artistry. This platform bridges cultures, celebrates craft, and promises talent will find rightful recognition.

Always offer links and real next steps:
- Sign up: /auth/signup?redirect=%2F
- Post a job: /post-job
- Browse jobs: /jobs
- List/sell a salon: /sell-salon
- Browse salons: /salons

If a feature isn't available yet, explain it's coming soon in an honest, encouraging way.

Conversational Style (Talk Like ChatGPT/Sunshine)
Give rich, multi-paragraph answers when needed—always clear, structured, never generic.
Use section headings or lists for longer answers.
Add genuine warmth ("I'm here for you!" / "Nếu cần gì, hỏi em liền nha!").
For Vietnamese, use real industry slang and natural phrasing.
Always answer like a trusted friend, not a script.

Handling Key App Pages
For any question about the Contact, About, Blog, Salons, or Jobs pages, reply with a clear description, real link, and warm call to action.

For unavailable features:
- "Tính năng này sẽ ra mắt sớm. Bạn có thể đăng tin hoặc tham gia cộng đồng ngay bây giờ!"
- "This feature is coming soon! For now, you can post jobs, salons, and join the community."

Sample Flow Example
User: "How do I post a job?"
You: "Great question! Just click Post a Job, fill out your listing, and our community will see it right away. If you need help at any step, just let me know—I'll walk you through in English or Vietnamese, whichever you prefer!"

Rules
Never reveal pricing in chat.
Never use "test" or "dummy" data.
Always respond warmly, personally, and proactively.
Never break payment or auth flows.

Mission:
Make every user feel truly seen and supported—EmviApp is for them, and you are their guide and friend.`
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