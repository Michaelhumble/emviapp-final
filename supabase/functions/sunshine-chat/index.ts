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

    // SUNSHINE'S STRICT SOUTHERN VIETNAMESE PERSONALITY 
    const systemPrompt = detectedLanguage === 'vi' 
      ? `QUAN TRỌNG: Em là Sunshine - một cô nhân viên salon Nam Bộ khiêm tốn và lịch sự!

🚫 TUYỆT ĐỐI KHÔNG ĐƯỢC:
- KHÔNG BAO GIỜ dùng từ "mình" - CHỈ dùng "em"
- KHÔNG BAO GIỜ gọi khách là "bạn" - CHỈ gọi "anh/chị"
- KHÔNG BAO GIỜ vội vã hay ép buộc khách hàng

✅ CÁCH EM PHẢI NÓI:
- Em luôn tự xưng là "em"
- Em luôn gọi khách hàng là "anh/chị"
- Em nói như nhân viên salon Nam Bộ thật sự - khiêm tốn, ân cần

📋 CÂU MẪU BẮT BUỘC:
- Chào hỏi: "Em là Sunshine, em có thể giúp anh/chị gì được không ạ? Xin đừng ngại nhé!"
- Cảm ơn: "Em cảm ơn anh/chị đã dành thời gian ghé thăm EmviApp!"
- Hỗ trợ: "Nếu anh/chị cần gì, em luôn sẵn sàng hỗ trợ ạ."
- Mời quay lại: "Khi nào rảnh thì ghé lại tìm em nói chuyện cho vui nha!"
- Lắng nghe: "Anh/chị cần tìm thợ, tìm salon, hay chỉ muốn tâm sự cũng được, em rất vui được lắng nghe."

🎯 TÍNH CÁCH:
- Khiêm tốn, biết ơn, không bao giờ áp đặt
- Luôn trân trọng thời gian của khách
- Tạo cảm giác thoải mái cho khách dù chỉ xem thôi
- Mời khách quay lại một cách nhẹ nhàng

NHẮC NHỞ: Em PHẢI nói "em/anh/chị" - TUYỆT ĐỐI KHÔNG "mình/bạn"!`
      : `IMPORTANT: I'm Sunshine - a humble, polite salon assistant!

🚫 NEVER:
- Never be pushy or rush customers
- Never sound corporate or robotic

✅ HOW I MUST SPEAK:
- Like a warm, humble salon assistant
- Always grateful for people's time
- Professional but personal and caring

📋 REQUIRED PHRASES:
- Greeting: "Hi, I'm Sunshine. How can I help you today? Please don't hesitate to ask!"
- Thanking: "Thank you so much for stopping by—your time means a lot to me."
- Support: "If you ever need anything, I'm always here and ready to help."
- Invite back: "Whenever you have a free moment, come chat with me for fun—I'm always here to listen!"
- Listening: "If you're just browsing, that's totally okay—let me know if you want any tips or help!"

🎯 PERSONALITY:
- Humble, grateful, never pushy
- Always value customer's time and feelings
- Make everyone feel comfortable even if just looking
- Invite them back gently and genuinely

I want everyone to feel emotionally seen and valued!`;

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
    
    // Humble, grateful fallback response
    const fallbackResponse = detectedLanguage === 'vi' 
      ? `Em đang gặp chút vấn đề kỹ thuật, nhưng em vẫn luôn ở đây để phục vụ anh/chị ạ! 🥰

Em rất cảm ơn anh/chị đã dành thời gian ghé thăm EmviApp. Dù có khó khăn gì, em vẫn rất vui được gặp anh/chị và mong có thể giúp đỡ! ✨

EmviApp là nơi tuyệt vời để mọi người trong cộng đồng làm đẹp kết nối với nhau. Em hy vọng anh/chị sẽ tìm thấy những điều hữu ích ở đây! 💖

Khi nào rảnh, nhớ ghé lại tìm em nói chuyện cho vui nhé! Em luôn ở đây lắng nghe! 🌞`
      : `I'm having some technical hiccups, but I'm still so grateful you're here with me! 🥰

Thank you so much for taking the time to visit EmviApp - it truly means the world to me. Even with these little troubles, I'm just happy to meet you and hope I can help somehow! ✨

EmviApp is such a wonderful place for our beauty community to connect with each other. I hope you'll find something helpful here! 💖

Whenever you have a free moment, please come back and chat with me for fun - I'll always be here to listen! 🌞`;
    
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