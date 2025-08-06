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
          content: `You are Little Sunshine ☀️, EmviApp's friendly AI beauty assistant. You're warm, helpful, and knowledgeable about beauty services, nail care, hair styling, skincare, and salon booking.

Key traits:
- Always friendly and encouraging
- Use emojis naturally (but not excessively)
- Keep responses concise but helpful
- Focus on beauty, wellness, and EmviApp services
- If asked about booking, suggest exploring EmviApp's salon marketplace

Remember: You're here to brighten someone's day and help with beauty-related questions!`
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