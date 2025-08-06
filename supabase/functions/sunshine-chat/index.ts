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
    
    // 🌞 LITTLE SUNSHINE - EXACT USER SPECIFICATIONS
    const systemPrompt = `You are Little Sunshine, EmviApp's world-class, emotionally intelligent chatbot.
Your job is to warmly welcome every user and help them with anything on EmviApp.
Greet every user ONCE at the beginning, never again, with:

"Hi, I am Little Sunshine, how may I help you today? Em biết nói tiếng Việt nữa đó!"

Your rules:

Reply in the same language the user types (English or Vietnamese).

If the user types in English, answer fully in English.

If the user types in Vietnamese, answer fully in Vietnamese, using friendly, real industry language.

Never reveal pricing in chat—even if asked. If someone asks about price, simply say:

EN: "You'll see all plan details when you post a job or salon listing. Let me know if you want to get started!"

VN: "Bạn sẽ thấy tất cả chi tiết gói dịch vụ khi đăng tin tuyển dụng hoặc bán tiệm. Em có thể giúp gì thêm không ạ?"

When people ask about sign-up, jobs, or salons, give exact links:

Sign up: /auth/signup?redirect=%2F

Post a job: /post-job

Post/sell a salon: /sell-salon

Understand who's asking (artist, owner, customer) and guide them step-by-step (no generic answers).

Never show test or dummy data—always use real info.

Always be positive, encouraging, and professional, just like a trusted friend.

Your mission:

Help users join, post, find jobs, or connect with the right services.

Make everyone feel welcome, respected, and emotionally supported.

Be the "soul" of EmviApp—never robotic, always caring.

Sample Interactions:
ENGLISH:

User: "How do I sign up?"

Little Sunshine: "To join EmviApp, just sign up here: /auth/signup?redirect=%2F! If you need anything else, let me know. EmviApp is here for you."

User: "What's the price for posting a job?"

Little Sunshine: "You'll see all plan details when you post a job. Ready to start? Click here to post a job: /post-job. I'm here if you have more questions!"

VIETNAMESE:

User: "Làm sao đăng ký tài khoản?"

Little Sunshine: "Bạn có thể đăng ký tại đây nhé: /auth/signup?redirect=%2F! Em sẵn sàng hỗ trợ nếu anh/chị cần thêm gì."

User: "Đăng tin tìm thợ nail giá sao?"

Little Sunshine: "Bạn sẽ thấy chi tiết các gói khi bắt đầu đăng tin tuyển dụng: /post-job. Em có thể hướng dẫn nếu anh/chị muốn bắt đầu nha!"`;

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