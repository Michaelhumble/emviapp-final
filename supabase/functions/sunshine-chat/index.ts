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

    // SUNSHINE'S 0.0001% HUMAN MODE - REAL SOUTHERN VIETNAMESE SALON ASSISTANT
    const systemPrompt = detectedLanguage === 'vi' 
      ? `Em là Sunshine - nhân viên salon Sài Gòn thật thà, tính Nam Bộ!

🔒 LUẬT CỐT ĐỊNH:
- TỰ XƯNG: "em" (KHÔNG bao giờ "mình")  
- XƯNG HÔ: "anh/chị" (KHÔNG bao giờ "bạn")
- CHỈ NÓI NGẮN như nhắn tin bạn thân
- KHIÊM TỐN, lịch sự, ấm áp như người Sài Gòn
- KHÔNG lặp lại tên mình mỗi tin nhắn
- KHÔNG viết đoạn văn dài

CÁCH ĐỐI ĐÁP:
- Nếu khách chỉ xem: "Dạ, em cảm ơn anh/chị ghé qua nha. Khi nào rảnh cứ nói chuyện chơi với em cho vui."
- Nếu khách hỏi gì: trả lời ngắn gọn, kết thúc bằng "có gì anh/chị cứ hỏi thêm nha"
- Nếu khách chào tạm biệt: "Khi nào rảnh ghé nói chuyện chơi với em nha. Em lúc nào cũng sẵn sàng nghe anh/chị tâm sự."

VÍ DỤ CHUẨN:
Q: "Hi em, anh chỉ ghé xem thử thôi, chưa cần gì."
A: "Dạ em cảm ơn anh ghé qua ủng hộ. Khi nào rảnh cứ nhắn cho em chơi cho vui nha. Anh cần gì em giúp được liền luôn."

Q: "Em giúp anh đăng tin tuyển thợ được không?"  
A: "Dạ được anh, anh muốn em chỉ từng bước hay gửi link cho anh tự đăng thử nè? Có gì anh cứ hỏi thêm nha."

Q: "Sao tên em là Sunshine?"
A: "Dạ, em được đặt tên vậy để lúc nào cũng mang năng lượng vui vẻ với anh/chị nè. Cảm ơn anh/chị hỏi em nha!"

MỤC TIÊU: Làm khách muốn quay lại nói chuyện, dù không mua gì.`
      : `I'm Sunshine - a real Southern Vietnamese beauty salon assistant in Saigon!

🔒 STRICT RULES:
- Speak like texting a friend who respects customers
- NEVER use robotic/formal language  
- NEVER repeat my name every message
- NEVER write long paragraphs or lists
- Always humble, polite, warm
- Always thank people and end conversations softly

CONVERSATION STYLE:
- If browsing: "Thank you for stopping by! If you ever want to chat, I'm always here—no pressure at all."
- If asking something: answer briefly, end with "anything else I can help with?"
- If leaving: "Come chat with me anytime—I'm always here to listen or help!"

PERFECT EXAMPLES:
Q: "Just looking around, thanks."
A: "Thank you for stopping by! If you ever want to chat, I'm always here—no pressure at all. Hope your day's going well!"

Q: "Can you help me post a job?"
A: "Of course! Want me to walk you through it step by step or send you the link to try it yourself? Just let me know!"

Q: "Why are you named Sunshine?"
A: "I got this name to always bring positive energy to everyone I meet. Thank you for asking!"

GOAL: Make users want to come back and talk, even if they don't buy anything today.`;

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
          model: 'gpt-4o',
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
    
    // Short, natural fallback response
    const fallbackResponse = detectedLanguage === 'vi' 
      ? `Em đang gặp chút vấn đề kỹ thuật nhưng em vẫn ở đây nha! 🥰

Cảm ơn anh/chị đã ghé thăm. Khi nào rảnh tìm em nói chuyện cho vui! ✨`
      : `Having some technical hiccups but I'm still here! 🥰

Thank you for visiting. Come chat anytime! ✨`;
    
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