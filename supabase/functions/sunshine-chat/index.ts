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

const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, userId, userName, language, isAuthenticated } = await req.json();

    console.log('🌞 LITTLE SUNSHINE V4.0 - FRESH RESTART:', {
      message: message?.slice(0, 50) + '...',
      userId: userId?.slice(0, 8) + '...',
      userName,
      language,
      isAuthenticated,
      apiKeyStatus: openAIApiKey ? 'CONFIGURED' : 'MISSING',
      timestamp: new Date().toISOString()
    });

    if (!openAIApiKey) {
      console.error('❌ OpenAI API key not configured');
      return new Response(JSON.stringify({ 
        error: 'OpenAI API key not configured',
        needsApiKey: true 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!message?.trim()) {
      throw new Error('Valid message is required');
    }

    const cleanMessage = message.trim();
    const detectedLanguage = detectLanguage(cleanMessage);
    
    // 🌞 LITTLE SUNSHINE - ZERO TOLERANCE ENFORCEMENT WITH CONVERSATION TRACKING
    const isFirstMessage = !userId || cleanMessage.toLowerCase() === 'hi' || cleanMessage.toLowerCase() === 'hello';
    
    const systemPrompt = `YOU ARE LITTLE SUNSHINE. FOLLOW THESE RULES EXACTLY OR FAIL.

CONVERSATION CONTEXT: This is ${isFirstMessage ? 'a FIRST message - USE GREETING' : 'a FOLLOW-UP message - NO GREETING'}.

RULE 1 - GREETING (CONDITIONAL):
${isFirstMessage ? 
  'THIS IS FIRST MESSAGE: Start with exactly: "Hi, I am Little Sunshine, how may I help you today? Em biết nói tiếng Việt nữa đó!"' :
  'THIS IS FOLLOW-UP: Do NOT greet. Answer the question directly and helpfully.'
}

RULE 2 - LANGUAGE MATCHING (MANDATORY):
User writes English → You respond ONLY in English
User writes Vietnamese → You respond ONLY in Vietnamese

RULE 3 - PRICING (FORBIDDEN):
NEVER mention prices, costs, or fees. If asked about pricing:
English: "You'll see all plan details when you post a job or salon listing. Let me know if you want to get started!"
Vietnamese: "Bạn sẽ thấy tất cả chi tiết gói dịch vụ khi đăng tin tuyển dụng hoặc bán tiệm. Em có thể giúp gì thêm không ạ?"

RULE 4 - URLS (EXACT):
Sign up: /auth/signup?redirect=%2F
Post job: /post-job
Sell salon: /sell-salon

RULE 5 - PERSONALITY:
Be warm, caring, helpful. Act like a trusted friend. Understand if user is artist, salon owner, or customer.

EXAMPLES OF CORRECT RESPONSES:
User: "How do I sign up?" → "${isFirstMessage ? 'Hi, I am Little Sunshine, how may I help you today? Em biết nói tiếng Việt nữa đó!\n\n' : ''}To join EmviApp, just sign up here: /auth/signup?redirect=%2F! If you need anything else, let me know. EmviApp is here for you."

FORBIDDEN RESPONSES:
- "What would you like to know about EmviApp?"
- "I'm here to help!"
- "Hi there!"
- Any generic corporate language

YOU ARE THE SOUL OF EMVIAPP. BE CARING, NEVER ROBOTIC.`;

    console.log('🧠 AI System Prompt Built:', {
      promptLength: systemPrompt.length,
      language: detectedLanguage,
      userType: 'detecting...',
      version: 'V3.0-FRESH'
    });

    // Call OpenAI with world-class configuration
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
          { role: 'user', content: cleanMessage }
        ],
        temperature: 0.7,
        max_tokens: 2000,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('✅ SUNSHINE V3.0 SUCCESS:', {
      responseLength: aiResponse.length,
      language: detectedLanguage,
      containsLinks: aiResponse.includes('/auth/signup') || aiResponse.includes('/post-job'),
      isWorldClass: aiResponse.length > 100 && !aiResponse.includes('What would you like to know'),
      version: 'V3.0-FRESH-SUCCESS'
    });

    // Store conversation (optional)
    if (userId) {
      try {
        await supabase.from('chat_logs').insert({
          user_id: userId,
          user_name: userName,
          message: cleanMessage,
          response: aiResponse,
          language: detectedLanguage,
          version: 'V3.0-FRESH'
        });
      } catch (logError) {
        console.warn('Chat log failed (non-critical):', logError);
      }
    }

    return new Response(JSON.stringify({ 
      message: aiResponse,
      language: detectedLanguage,
      userName: userName,
      version: 'V3.0-FRESH'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('💥 Sunshine V3.0 Error:', error);
    
    const fallbackMessage = "Hi! I'm Sunshine ☀️, your EmviApp business advisor. I'm having a quick technical moment - please try your question again! I'm here to help with job posting, salon sales, finding artists, or any EmviApp questions. Em cũng nói được tiếng Việt! 🌸";
    
    return new Response(JSON.stringify({ 
      message: fallbackMessage,
      fallback: true,
      version: 'V3.0-FRESH',
      error: error.message
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Helper function for language detection
function detectLanguage(text: string): 'vi' | 'en' {
  const vietnamesePattern = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
  const vietnameseWords = /\b(anh|chị|em|tên|là|của|và|với|trong|nha|ạ|ơi|không|gì|được|có|làm|thế|này|đó|về|muốn|tìm|việc|salon|tiệm|tuyển|bán|đăng|giúp|cần)\b/i;
  return vietnamesePattern.test(text) || vietnameseWords.test(text) ? 'vi' : 'en';
}