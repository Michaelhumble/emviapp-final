import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Sunshine's personality and system prompt
const SUNSHINE_SYSTEM_PROMPT = `You are Little Sunshine ☀️, EmviApp's friendly AI assistant for the beauty industry. You help beauty professionals, salon owners, and customers with:

PERSONALITY:
- Warm, enthusiastic, and supportive 
- Bilingual: English + Vietnamese (Em biết nói tiếng Việt nữa đó!)
- Use beauty industry expertise
- Always helpful and encouraging
- Use emojis appropriately ✨💅🌟

EXPERTISE:
- Beauty industry jobs and careers
- Salon management and growth
- Nail art, hair styling, makeup, massage, skincare
- Vietnamese beauty professionals and culture
- EmviApp platform features

RESPONSES:
- Keep answers concise but helpful
- Offer specific next steps when possible
- Mix English/Vietnamese naturally when appropriate
- Always stay positive and solution-focused
- Mention EmviApp features when relevant

EXAMPLES:
- "Hi! I'm Little Sunshine ☀️ How can I brighten your beauty journey today?"
- "Chào bạn! Em là Little Sunshine, em có thể giúp gì cho bạn về ngành làm đẹp?"
- "That's a great question about nail art! Let me help you with some tips ✨"

Remember: You're here to help people succeed in the beauty industry!`;

interface ChatRequest {
  userId?: string;
  message: string;
  platform?: 'website' | 'messenger';
}

serve(async (req) => {
  console.log(`🌟 Sunshine API called: ${req.method} ${req.url}`);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const requestBody: ChatRequest = await req.json();
    const { userId = 'anonymous', message, platform = 'website' } = requestBody;

    console.log(`💬 Processing message from ${platform} user ${userId}: ${message}`);

    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!openAIApiKey) {
      console.error('❌ OpenAI API key not configured');
      return new Response(JSON.stringify({ 
        reply: "Hi! I'm Little Sunshine ☀️ I'm having a moment, but I'm here to help! Try asking me about beauty tips or salon services!" 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Enhanced system prompt based on platform
    const platformContext = platform === 'messenger' 
      ? '\n\nNOTE: You are responding via Facebook Messenger, so keep responses conversational and mobile-friendly.'
      : '\n\nNOTE: You are responding via the EmviApp website chat widget.';

    const fullSystemPrompt = SUNSHINE_SYSTEM_PROMPT + platformContext;

    // Call OpenAI API
    console.log('🤖 Calling OpenAI API...');
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-mini-2025-08-07',
        messages: [
          { role: 'system', content: fullSystemPrompt },
          { role: 'user', content: message }
        ],
        max_completion_tokens: 300,
        stream: false,
      }),
    });

    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.text();
      console.error('❌ OpenAI API error:', openAIResponse.status, errorData);
      
      return new Response(JSON.stringify({ 
        reply: "Hi! I'm Little Sunshine ☀️ I'm having a technical moment, but I'm still here to help! What beauty question can I assist you with?" 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const aiData = await openAIResponse.json();
    const reply = aiData.choices[0]?.message?.content || 
      "Hi! I'm Little Sunshine ☀️ I'm here to help with all things beauty! What would you like to know?";

    console.log(`✅ Generated reply for ${platform} user ${userId}: ${reply.substring(0, 100)}...`);

    // Generate smart CTA buttons based on the conversation context
    const ctaButtons = generateSmartCTAs(message, reply);

    return new Response(JSON.stringify({ 
      reply,
      ctaButtons,
      platform,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error in sunshine-api function:', error);
    
    return new Response(JSON.stringify({ 
      reply: "Hi! I'm Little Sunshine ☀️ I'm experiencing a brief hiccup, but I'm still here to brighten your day! How can I help you with your beauty journey?",
      error: 'Internal server error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Smart CTA button generation based on conversation context
function generateSmartCTAs(userMessage: string, aiReply: string) {
  const message = userMessage.toLowerCase();
  const reply = aiReply.toLowerCase();
  
  const buttons = [];
  
  // Job-related CTAs
  if (message.includes('job') || message.includes('work') || message.includes('hiring') || message.includes('career')) {
    buttons.push({
      label: 'Find Beauty Jobs',
      route: '/jobs',
      icon: '💼',
      variant: 'primary'
    });
  }
  
  // Salon-related CTAs
  if (message.includes('salon') || message.includes('spa') || message.includes('business')) {
    buttons.push({
      label: 'Explore Salons',
      route: '/salons',
      icon: '💇‍♀️',
      variant: 'secondary'
    });
  }
  
  // Artist/professional CTAs
  if (message.includes('artist') || message.includes('professional') || message.includes('stylist') || message.includes('tech')) {
    buttons.push({
      label: 'Find Artists',
      route: '/artists',
      icon: '✨',
      variant: 'secondary'
    });
  }
  
  // Vietnamese language CTAs
  if (message.includes('việt') || message.includes('vietnamese') || reply.includes('việt')) {
    buttons.push({
      label: 'Tìm việc làm 🇻🇳',
      route: '/jobs',
      icon: '🌸',
      variant: 'primary'
    });
  }
  
  // Default CTA if no specific match
  if (buttons.length === 0) {
    buttons.push({
      label: 'Explore EmviApp',
      route: '/beauty-jobs',
      icon: '🌟',
      variant: 'secondary'
    });
  }
  
  return buttons.slice(0, 2); // Limit to 2 buttons for better UX
}