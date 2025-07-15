import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

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
    console.log('AI Polish Post function called');
    
    const { content, style, language = 'english', postType = 'story', customPrompt } = await req.json();

    if (!content || content.trim().length === 0) {
      console.error('No content provided');
      return new Response(
        JSON.stringify({ 
          error: 'Content is required',
          polishedContent: null 
        }), 
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (!openAIApiKey) {
      console.error('OpenAI API key not configured');
      return new Response(
        JSON.stringify({ 
          error: 'AI service temporarily unavailable. Please try again later.',
          polishedContent: null 
        }), 
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Create system prompt based on style
    let systemPrompt = 'You are an expert content creator for EmviApp, a beauty industry social network. Transform the user\'s post to be more engaging while keeping it authentic and appropriate for beauty professionals.';
    
    if (customPrompt) {
      systemPrompt += ` Focus on: ${customPrompt}`;
    } else {
      switch (style) {
        case 'funny':
          systemPrompt += ' Make it funnier and more playful while keeping it professional for the beauty industry.';
          break;
        case 'emotional':
          systemPrompt += ' Make it more emotional and heartfelt, perfect for inspiring others in the beauty community.';
          break;
        case 'professional':
          systemPrompt += ' Make it sound more professional and polished for business networking.';
          break;
        case 'viral':
          systemPrompt += ' Transform this into viral social media content that people will want to share. Use engaging hooks and emotional triggers.';
          break;
        default:
          systemPrompt += ' Improve the writing quality and make it more engaging.';
      }
    }

    systemPrompt += ' Keep the same core message and personal voice. Return only the polished content without any additional commentary.';

    console.log(`Calling OpenAI API for style: ${style}`);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: content }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      
      return new Response(
        JSON.stringify({ 
          error: 'AI enhancement temporarily unavailable. Please try again in a moment.',
          polishedContent: null 
        }), 
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid OpenAI response structure:', data);
      return new Response(
        JSON.stringify({ 
          error: 'AI enhancement failed. Please try again.',
          polishedContent: null 
        }), 
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const polishedContent = data.choices[0].message.content.trim();
    
    console.log('Successfully polished content');
    
    // Log usage for rate limiting and monitoring
    try {
      const supabaseUrl = Deno.env.get('SUPABASE_URL');
      const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
      
      if (supabaseUrl && supabaseServiceKey) {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        
        // Get user ID from auth header if available
        const authHeader = req.headers.get('authorization');
        let userId = null;
        
        if (authHeader) {
          try {
            const { data: { user } } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
            userId = user?.id || null;
          } catch (authError) {
            console.log('Could not get user from auth header:', authError);
          }
        }
        
        // Log the AI usage
        await supabase.from('ai_usage_logs').insert({
          user_id: userId,
          prompt: content,
          prompt_hash: await crypto.subtle.digest('SHA-256', new TextEncoder().encode(content)).then(hash => 
            Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('')
          ),
          response: polishedContent,
          ip_address: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
          user_agent: req.headers.get('user-agent') || 'unknown'
        });
      }
    } catch (logError) {
      console.error('Error logging AI usage:', logError);
      // Don't fail the request if logging fails
    }

    return new Response(
      JSON.stringify({ 
        polishedContent,
        error: null 
      }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Unexpected error in ai-polish-post function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Something went wrong. Please try again later.',
        polishedContent: null 
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});