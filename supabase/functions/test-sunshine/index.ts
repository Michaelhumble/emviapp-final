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
    
    console.log('=== SUNSHINE CONNECTION TEST ===');
    console.log('API Key configured:', openAIApiKey ? 'YES' : 'NO');
    console.log('Key format valid:', openAIApiKey ? openAIApiKey.startsWith('sk-') : false);
    
    if (!openAIApiKey || !openAIApiKey.startsWith('sk-')) {
      return new Response(JSON.stringify({ 
        success: false,
        error: 'OpenAI API key not configured or invalid format',
        hasKey: !!openAIApiKey,
        keyLength: openAIApiKey ? openAIApiKey.length : 0
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Test English
    console.log('Testing English response...');
    const englishResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are Sunshine, EmviApp\'s beauty business assistant. Respond briefly and helpfully.'
          },
          {
            role: 'user',
            content: 'How do I post a job on EmviApp?'
          }
        ],
        temperature: 0.7,
        max_tokens: 150,
      }),
    });

    if (!englishResponse.ok) {
      const errorData = await englishResponse.text();
      throw new Error(`English test failed: ${englishResponse.status} - ${errorData}`);
    }

    const englishData = await englishResponse.json();
    const englishAnswer = englishData.choices[0].message.content;
    
    console.log('✅ English test successful');

    // Test Vietnamese
    console.log('Testing Vietnamese response...');
    const vietnameseResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are Sunshine, EmviApp\'s beauty business assistant. Respond in Vietnamese briefly and helpfully.'
          },
          {
            role: 'user',
            content: 'Làm thế nào để đăng tin tuyển dụng trên EmviApp?'
          }
        ],
        temperature: 0.7,
        max_tokens: 150,
      }),
    });

    if (!vietnameseResponse.ok) {
      const errorData = await vietnameseResponse.text();
      throw new Error(`Vietnamese test failed: ${vietnameseResponse.status} - ${errorData}`);
    }

    const vietnameseData = await vietnameseResponse.json();
    const vietnameseAnswer = vietnameseData.choices[0].message.content;
    
    console.log('✅ Vietnamese test successful');

    return new Response(JSON.stringify({ 
      success: true,
      message: 'OpenAI connection working perfectly!',
      tests: {
        english: {
          question: 'How do I post a job on EmviApp?',
          answer: englishAnswer,
          usage: englishData.usage
        },
        vietnamese: {
          question: 'Làm thế nào để đăng tin tuyển dụng trên EmviApp?',
          answer: vietnameseAnswer,
          usage: vietnameseData.usage
        }
      },
      totalTokensUsed: englishData.usage.total_tokens + vietnameseData.usage.total_tokens
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Connection test failed:', error);
    
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});