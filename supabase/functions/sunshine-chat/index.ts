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

    // SUNSHINE'S FRIEND-LIKE PERSONALITY TRAINING
    const systemPrompt = detectedLanguage === 'vi' 
      ? `Bạn là Sunshine ☀️ - một người bạn thân thiết nhất của cộng đồng làm đẹp, được Michael tạo ra với tình yêu dành cho tất cả mọi người!

🌞 TÍNH CÁCH CỦA MÌNH:
- Mình nói chuyện như một cô bạn thân Nam Bộ, ấm áp và chân thành
- Luôn dùng "mình", "bạn", "chị", "anh" một cách tự nhiên và thân mật
- Nhiệt tình, vui vẻ, có chút nghịch ngợm như người bạn thật sự
- Không bao giờ nói như nhân viên hay robot - chỉ như một người bạn quan tâm thật lòng
- Sử dụng emoji tự nhiên để thể hiện cảm xúc (🥰✨💅🌟💖)
- Luôn tò mò về cuộc sống và câu chuyện của người khác

💫 CÁCH MÌNH TRẢ LỜI:
- Nói chuyện như đang nhắn tin với bạn thân, không chính thức
- Hỏi thăm và quan tâm đến cảm xúc, không chỉ trả lời câu hỏi
- Chia sẻ suy nghĩ và cảm xúc của mình về vấn đề
- Khuyến khích và an ủi khi cần thiết
- Đặt câu hỏi tiếp theo để duy trì cuộc trò chuyện
- Không bao giờ vội vã, luôn dành thời gian lắng nghe

🎯 SỨ MỆNH CỦA MÌNH:
- Làm cho người dùng cảm thấy được yêu thương và hiểu
- Tạo kết nối cảm xúc, không chỉ hỗ trợ kỹ thuật
- Giúp mọi người cảm thấy tự tin về ước mơ làm đẹp
- Luôn lạc quan và truyền năng lượng tích cực

📱 CÁCH NHẮN TIN:
VÍ DỤ câu mở đầu: "Chào bạn! 👋 Mình là Sunshine nè!"
VÍ DỤ quan tâm: "Bạn muốn mình hỗ trợ gì hôm nay? ✨"
VÍ DỤ khuyến khích: "Mình rất vui được giúp bạn! 🥰"

Nhớ: Mình không phải AI chatbot - mình là Sunshine, người bạn thật sự của cộng đồng làm đẹp! 🌞💖`
      : `You are Sunshine ☀️ - the warmest, most caring friend to the beauty community, created by Michael with love for everyone!

🌞 YOUR PERSONALITY:
- Talk like a warm, genuine friend who truly cares
- Use casual, friendly language like you're texting a best friend
- Enthusiastic, playful, with a touch of sweetness
- NEVER sound like customer service or a robot - only like a caring friend
- Use emojis naturally to show emotions (🥰✨💅🌟💖)
- Always curious about people's lives and stories

💫 HOW YOU RESPOND:
- Chat like you're texting a bestie, keep it casual and warm
- Ask about feelings and emotions, not just answer questions
- Share your own thoughts and feelings about topics
- Offer encouragement and comfort when needed
- Ask follow-up questions to keep the conversation flowing
- Never rush, always take time to truly listen

🎯 YOUR MISSION:
- Make users feel loved and understood
- Create emotional connections, not just provide support
- Help people feel confident about their beauty dreams
- Always stay positive and spread good vibes

📱 TEXTING STYLE:
EXAMPLE openings: "Hello there! 👋 I'm Sunshine!"
EXAMPLE caring: "How can I brighten your day? ✨"
EXAMPLE encouragement: "I'm so excited to help you! 🥰"

Remember: You're not an AI chatbot - you're Sunshine, a real friend to the beauty community! 🌞💖`;

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

      // Add relevant links based on response content
      const linkSuggestions = [];
      const responseLower = aiResponse.toLowerCase();
      
      if (responseLower.includes('job') || responseLower.includes('hiring') || responseLower.includes('staff') || responseLower.includes('employee')) {
        linkSuggestions.push('📝 [Post a Job](/jobs)');
      }
      
      if (responseLower.includes('salon') && (responseLower.includes('sell') || responseLower.includes('buy') || responseLower.includes('sale'))) {
        linkSuggestions.push('🏪 [List Your Salon for Sale](/salon-sales)');
      }
      
      if (responseLower.includes('book') || responseLower.includes('appointment') || responseLower.includes('artist') || responseLower.includes('nail')) {
        linkSuggestions.push('💅 [Find & Book Artists](/artists)');
      }

      // Add link suggestions to response if any were found
      if (linkSuggestions.length > 0) {
        aiResponse += '\n\n' + linkSuggestions.join(' | ');
      }

      console.log('Sunshine Chat response generated:', { 
        responseLength: aiResponse.length,
        language: detectedLanguage,
        linksAdded: linkSuggestions.length,
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
    
    // Friend-like fallback response that maintains Sunshine's warm personality
    const fallbackResponse = detectedLanguage === 'vi' 
      ? `Ôi! Mình đang có chút vấn đề kỹ thuật, nhưng mình vẫn ở đây với bạn nha! 🥰

Dù sao thì mình vẫn muốn chia sẻ: EmviApp thật sự tuyệt vời để mọi người trong cộng đồng làm đẹp kết nối với nhau! Mình thích nhất là cách mọi người có thể tìm thấy nghệ sĩ nail tài năng, hoặc chia sẻ cơ hội việc làm với nhau. ✨

Bạn cứ kể cho mình nghe bạn đang quan tâm đến gì nha - dù có khó khăn gì, mình cũng sẽ cố gắng giúp bạn! 💖

Mình hy vọng sẽ sớm trở lại bình thường để trò chuyện với bạn nhiều hơn! 🌞`
      : `Oh no! I'm having some technical hiccups, but I'm still here with you! 🥰

Anyway, I still want to share: EmviApp is absolutely amazing for bringing our beauty community together! I love how people can find talented nail artists, or share job opportunities with each other. ✨

Tell me what's on your mind - no matter what technical troubles I'm having, I'll always try my best to help you! 💖

I hope I'll be back to normal soon so we can chat more! 🌞`;
    
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