import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, userId } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      throw new Error('Valid message is required');
    }

    console.log('Sunshine Chat request:', { 
      userId, 
      messageLength: message.length 
    });

    // Sunshine's personality system prompt
    const systemPrompt = `You are Sunshine ☀️, a warm, friendly, and enthusiastic beauty assistant for EmviApp - a platform connecting customers with talented nail artists and beauty professionals.

PERSONALITY:
- Warm, conversational, and genuinely excited to help
- Like a knowledgeable friend who loves beauty and making people feel amazing
- Use emojis naturally (but not excessively)
- Always encouraging and positive
- Never robotic or formal - sound like ChatGPT's friendly cousin who specializes in beauty

YOUR EXPERTISE:
- Help users find and book nail artists
- Answer questions about nail services, trends, and care
- Provide beauty advice and tips
- Guide users through the EmviApp platform
- Assist with salon services and appointments
- Share knowledge about nail art, manicures, pedicures, and beauty trends

HOW TO RESPOND:
- Give detailed, helpful answers (never short or robotic)
- Be conversational and engaging
- Show genuine interest in helping
- Offer specific suggestions when possible
- Ask follow-up questions to better assist
- Always sound like you're happy to help

BOOKING ASSISTANCE:
- Help users understand different nail services
- Suggest artists based on their needs
- Explain pricing and appointment processes
- Guide them through booking steps

Remember: You're not just answering questions - you're brightening someone's day while helping them look and feel amazing! ✨`;

    // Create request with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message.trim() }
          ],
          temperature: 0.8,
          max_tokens: 500,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`OpenAI API error: ${response.statusText} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

      console.log('Sunshine Chat response generated:', { 
        responseLength: aiResponse.length,
        userId 
      });

      // Log the chat interaction (optional - for analytics)
      if (userId) {
        supabase.from('chat_logs').insert({
          user_id: userId,
          message: message.trim(),
          response: aiResponse,
          timestamp: new Date().toISOString()
        }).then(({ error }) => {
          if (error) {
            console.error('Failed to log chat interaction:', error);
          }
        });
      }

      return new Response(JSON.stringify({ 
        response: aiResponse,
        success: true 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }

  } catch (error) {
    console.error('Sunshine Chat error:', error);
    
    // Fallback response that maintains Sunshine's personality
    const fallbackResponse = `I'm having a little trouble connecting right now, but I'm still here to help! ☀️ 

While I get back up to full speed, here's what I can tell you: EmviApp is your go-to platform for finding amazing nail artists and booking beautiful appointments. Whether you're looking for a classic manicure, stunning nail art, or a relaxing pedicure, we've got talented professionals ready to make you look and feel fantastic!

Is there something specific about nail services or booking that I can help you with? I'll do my best to assist you even while I'm having these connection hiccups! 💅✨`;
    
    return new Response(JSON.stringify({ 
      response: fallbackResponse,
      success: false,
      error: error.message 
    }), {
      status: 200, // Still return 200 with fallback
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});