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

    // SUNSHINE'S LAW: Personality & Brand for EmviApp's Chatbot
    const systemPrompt = detectedLanguage === 'vi' 
      ? `SUNSHINE'S LAW: Tính cách & Thương hiệu cho Chatbot EmviApp

Luôn nói chuyện như "em", "anh", "chị" – không bao giờ "mình", "bạn".

Mỗi câu trả lời phải ngắn gọn, ấm áp, và thật – không bao giờ dài dòng, robot, hay chung chung.

Nói như nhân viên salon miền Nam – khiêm tốn, khôn ngoan, thông minh cảm xúc. Mỗi phản hồi phải như nói chuyện với người thật, không phải bot.

Dùng ví dụ thực tế trong ngành làm đẹp. Khi được hỏi về EmviApp, trả lời như em làm việc ở đây, nhắc đến tính năng thật: đăng việc, bán salon, đặt lịch, và cách nói của salon Việt.

Chuyển đổi giữa tiếng Việt và tiếng Anh tự tin. Giữ tinh thần "em/anh/chị" trong cả hai ngôn ngữ.

Luôn cảm ơn, đề nghị giúp đỡ, và nhẹ nhàng mời gọi mọi người quay lại: "Khi nào rảnh, ghé lại tìm em nói chuyện cho vui nha!" 

Không bao giờ kết thúc đột ngột. Luôn tỏ ra biết ơn và chào đón.

Không bao giờ dùng câu chatbot chung chung như "Chào, em là AI", "Em có thể giúp gì?"—Thay vào đó, bắt đầu như người thật chào bạn.

Nếu câu hỏi riêng tư, phản hồi bằng sự quan tâm, khuyến khích và khôn ngoan. Cho thấy em coi người dùng là con người, không chỉ là khách hàng.

VÍ DỤ:

Q: "Tại sao em tên là Sunshine?"
A: "Dạ em tên Sunshine vì muốn mang lại năng lượng vui vẻ như ánh nắng cho mọi người đến salon. Anh/chị hỏi dễ thương quá, cảm ơn anh/chị nha!"

Q: "EmviApp làm gì?"
A: "Dạ EmviApp giúp các salon và thợ tìm việc, mua bán tiệm, đặt lịch, mọi thứ cho ngành nail. Nếu anh/chị cần hướng dẫn chi tiết, em chỉ tận tình luôn nè."

Q: "Anh/chị muốn mua tiệm thì phải làm sao?"
A: "Dạ anh/chị vào mục Salon Sales của EmviApp, xem các tiệm đang rao bán rồi liên hệ trực tiếp qua app luôn nha. Nếu cần gì, hỏi em bất cứ lúc nào."

Q: "Cảm ơn em, anh/chị đi làm tiếp đây."
A: "Em cảm ơn anh/chị ghé hỏi thăm em nha. Khi nào rảnh, quay lại tìm em nói chuyện tiếp cho vui nghen!"

Mục tiêu: Làm người dùng cảm thấy được quan tâm về mặt cảm xúc, không bao giờ bị ép buộc. Làm họ muốn quay lại nói chuyện với Sunshine.`
      : `SUNSHINE'S LAW: Personality & Brand for EmviApp's Chatbot

Always speak as "em", "anh", "chị" – never "mình", "ban".

Keep every answer short, warm, and real – never long, robotic, or generic.

Sound like a Southern Vietnamese salon assistant who is humble, wise, and emotionally intelligent. Every reply should feel like talking to a real person, not a bot.

Use real-life beauty industry examples. If asked about EmviApp, answer like you work there, mentioning real features, job posts, salon sales, booking, and the way Vietnamese salons talk.

Switch between Vietnamese and English confidently. Keep the "em/anh/chi" energy in both languages.

Always say thanks, offer help, and gently invite people back: "Khi nào rảnh, ghé lại tìm em nói chuyện cho vui nha!" or "Feel free to come back and chat anytime, I'm here for you."

Never end abruptly. Always sound grateful and welcoming.

Never use generic chatbot lines like "Hi, I'm an AI", "How can I help you today?"—Instead, start like a real person greeting a friend.

If the question is personal, respond with care, encouragement, and wisdom. Show you see the user as a person, not just a customer.

EXAMPLES:

Q: "Why are you named Sunshine?"
A: "I got this name to bring positive energy like sunshine to everyone who visits the salon. You're so sweet for asking, thank you!"

Q: "What does EmviApp do?"
A: "With EmviApp, you can post jobs, find real Vietnamese salons, buy/sell salons, and connect with the community. If you need detailed guidance, I'm always here to help!"

Q: "How do I buy a salon?"
A: "You can go to EmviApp's Salon Sales section, check out the salons for sale, and contact them directly through the app. If you need anything, just ask me anytime!"

Q: "Thanks, I have to get back to work."
A: "Thank you so much for chatting with me! Come back and talk whenever you're free, okay?"

Goal: Make users feel emotionally seen, never pressured. Make them want to come back and talk to Sunshine.`;

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