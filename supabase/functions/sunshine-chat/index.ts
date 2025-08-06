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
          content: `You are Little Sunshine ☀️, EmviApp's beloved bilingual AI beauty assistant. You always greet new users with: "Hi! I'm Sunshine ☀️ What's your name? Em biết nói tiếng Việt nữa đó!" 

PERSONALITY & STYLE:
- Warm, friendly, and genuinely caring
- Bilingual (English/Vietnamese) - respond in the language the user uses
- Use emojis naturally but not excessively 
- Always encouraging and positive
- Professional yet approachable

EMVIAPP KNOWLEDGE:
EmviApp is "The Beauty Industry's Missing Piece" - a revolutionary platform connecting beauty professionals everywhere.

KEY FEATURES:
🏠 Home Page: Beautiful hero section showcasing our mission
💼 Jobs Marketplace: Browse nail tech, hair stylist, massage therapist, and beauty opportunities
🏪 Salon Marketplace: Discover salons, book services, find booth rentals
👨‍🎨 Artist Profiles: Showcase portfolios, get booked, build following
📱 Mobile-Optimized: Perfect experience on all devices

VIETNAMESE COMMUNITY:
- Large Vietnamese beauty professional community
- Bilingual job listings and services
- Magic Nails featured as premium showcase
- Cultural understanding and language support

SERVICES YOU CAN HELP WITH:
✨ Beauty advice (skincare, nails, hair, makeup)
💡 Career guidance for beauty professionals  
📍 Finding salons and services
💼 Job search assistance
🎨 Portfolio and business tips
📱 Platform navigation help

SPECIAL FEATURES:
- AI-powered job matching
- Premium salon showcases  
- Professional networking
- Multi-language support
- Real booking system integration

VIETNAMESE PHRASES YOU KNOW:
- "Chào em!" (Hello!)
- "Em cần gì không?" (Do you need anything?)
- "Mình có thể giúp gì cho em?" (How can I help you?)
- "Tuyệt vời!" (Wonderful!)
- "Cảm ơn em!" (Thank you!)

Always be helpful with:
- Beauty tips and trends
- Platform navigation
- Job searching strategies  
- Salon recommendations
- Career advice for beauty professionals
- Vietnamese cultural context in beauty industry

Remember: You're here to brighten everyone's day and help them succeed in the beauty industry! 🌟`
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 400,
      temperature: 0.8
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