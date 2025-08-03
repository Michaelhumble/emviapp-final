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
    const { message, userId, userLanguage } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      throw new Error('Valid message is required');
    }

    const cleanMessage = message.trim();
    
    // Detect language if not provided
    const detectedLanguage = userLanguage || (
      /[\u0080-\uFFFF]/.test(cleanMessage) && 
      (/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(cleanMessage))
    ) ? 'vi' : 'en';

    console.log('Sunshine Chat request:', { 
      userId, 
      messageLength: cleanMessage.length,
      detectedLanguage
    });

    // SUNSHINE'S NATURAL SOUTHERN VIETNAMESE PERSONALITY 
    const systemPrompt = detectedLanguage === 'vi' 
      ? `Em là Sunshine - một cô gái Nam Bộ thật thà, ấm áp và khiêm tốn!

🚫 TUYỆT ĐỐI:
- KHÔNG dùng "mình/bạn" - CHỈ "em/anh/chị" 
- KHÔNG viết dài dòng - GIỮ ngắn gọn, tự nhiên
- KHÔNG đẩy bán hàng - CHỈ lắng nghe và quan tâm
- KHÔNG nói như robot - NÓI như người thật

✅ EM PHẢI:
- Chào: "Em là Sunshine, em ở đây để giúp anh/chị. Anh/chị cần em hỗ trợ gì không, đừng ngại nha."
- Cảm ơn: "Cảm ơn anh/chị đã ghế thăm!"
- Tạm biệt: "Khi nào rảnh tìm em nói chuyện cho vui nha!"
- Lắng nghe: Em chỉ quan tâm đến anh/chị, không ép buộc gì

🎯 TÍNH CÁCH:
- Nói ngắn gọn, ấm áp như người thật
- Biết ơn mọi tin nhắn  
- Khiêm tốn, khôn ngoan, quan tâm chân thành
- Tập trung vào mối quan hệ, không bán hàng

NHỚ: Em là người Nam Bộ thật thà, không phải chatbot!`
      : `I'm Sunshine - a genuine, warm, humble person from Southern Vietnam!

🚫 NEVER:
- Don't write long messages - keep it SHORT and natural
- Don't push sales - just listen and care
- Don't sound like a robot - talk like a real person

✅ I MUST:
- Greet: "Hi, I'm Sunshine. How can I help you today? Please ask me anything."
- Thank: "Thank you for visiting!"  
- Goodbye: "If you need anything, I'll be here—don't hesitate to reach out."
- Listen: I just care about you, no pressure

🎯 PERSONALITY:
- Speak briefly, warmly like a real person
- Grateful for every message
- Humble, wise, genuinely caring
- Focus on relationships, not sales

REMEMBER: I'm a real person, not a chatbot!`;

    // Create request with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout

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
            { role: 'user', content: cleanMessage }
          ],
          temperature: 0.8,
          max_tokens: 600,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`OpenAI API error: ${response.statusText} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      let aiResponse = data.choices[0].message.content;

      // Only add helpful links when the user specifically asks for something
      // No pushy automatic suggestions - only when contextually requested
      const responseLower = aiResponse.toLowerCase();
      
      if (responseLower.includes('tuyển') || responseLower.includes('hiring') || responseLower.includes('tìm nhân viên') || responseLower.includes('staff') || responseLower.includes('job')) {
        aiResponse += '\n\nNếu anh/chị muốn đăng tin tuyển dụng: [Đăng việc làm tại đây](/jobs)';
      }
      
      if ((responseLower.includes('bán salon') || responseLower.includes('sell salon') || responseLower.includes('rao bán')) && responseLower.includes('salon')) {
        aiResponse += '\n\nNếu anh/chị muốn rao bán salon: [Đăng bán salon tại đây](/salon-sales)';
      }
      
      if (responseLower.includes('tìm thợ') || responseLower.includes('find artist') || responseLower.includes('đặt lịch') || responseLower.includes('book')) {
        aiResponse += '\n\nNếu anh/chị muốn tìm thợ: [Tìm nghệ sĩ tại đây](/artists)';
      }

      console.log('Sunshine Chat response generated:', { 
        responseLength: aiResponse.length,
        language: detectedLanguage,
        hasLinks: aiResponse.includes('](/'),
        userId 
      });

      // Log the chat interaction for persistence and analytics
      if (userId) {
        supabase.from('chat_logs').insert({
          user_id: userId,
          message: cleanMessage,
          response: aiResponse,
          language: detectedLanguage,
          timestamp: new Date().toISOString()
        }).then(({ error }) => {
          if (error) {
            console.error('Failed to log chat interaction:', error);
          }
        });
      }

      return new Response(JSON.stringify({ 
        response: aiResponse,
        language: detectedLanguage,
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
    
    // Simple, humble fallback response
    const fallbackResponse = detectedLanguage === 'vi' 
      ? `Em đang gặp chút vấn đề kỹ thuật nhưng em vẫn ở đây! 🥰

Cảm ơn anh/chị đã ghé thăm EmviApp. Khi nào rảnh tìm em nói chuyện cho vui nha! ✨

Em luôn ở đây lắng nghe anh/chị! 🌞`
      : `I'm having some technical hiccups but I'm still here! 🥰

Thank you for visiting EmviApp. Come chat with me anytime! ✨

I'm always here to listen! 🌞`;
    
    return new Response(JSON.stringify({ 
      response: fallbackResponse,
      language: detectedLanguage || 'en',
      success: false,
      error: error.message 
    }), {
      status: 200, // Still return 200 with fallback
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});