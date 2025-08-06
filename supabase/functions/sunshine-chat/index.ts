import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('☀️ [SUNSHINE] Request received');
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      console.error('❌ [SUNSHINE] OPENAI_API_KEY not found in environment');
      throw new Error('OpenAI API key not configured');
    }

    const { message, conversationHistory = [] } = await req.json();
    console.log('☀️ [SUNSHINE] Processing message:', message);

    // Build conversation context
    const messages = [
      {
        role: 'system',
        content: `You are Little Sunshine, EmviApp's friendly AI beauty assistant. You're warm, helpful, and knowledgeable about beauty services, nail art, and salon experiences.

Key traits:
- Warm and sunny personality
- Expert in beauty services, especially nail care
- Bilingual - fluent in English and Vietnamese
- Always positive and encouraging
- Help with booking, services, and beauty advice

Always be encouraging and make users feel confident about their beauty choices! ☀️`
      }
    ];

    // Add conversation history
    if (conversationHistory.length > 0) {
      conversationHistory.slice(-10).forEach((msg: any) => {
        messages.push({
          role: msg.isUser ? 'user' : 'assistant',
          content: msg.content
        });
      });
    }

    // Add current message
    messages.push({
      role: 'user',
      content: message
    });

    console.log('☀️ [SUNSHINE] Calling OpenAI API');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 800,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ [SUNSHINE] OpenAI API Error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('No response from OpenAI');
    }

    console.log('✅ [SUNSHINE] Success - Response generated');

    return new Response(JSON.stringify({ 
      message: aiResponse,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('💥 [SUNSHINE] Error:', error);
    
    const fallbackResponse = "Hi! I'm Little Sunshine ☀️ I'm having a little trouble right now, but I'm here to help! Could you try asking again? Em biết nói tiếng Việt nữa đó! 💅✨";
    
    return new Response(JSON.stringify({ 
      message: fallbackResponse,
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 200, // Don't break the UI
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});