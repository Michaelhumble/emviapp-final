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

    // Enhanced system prompt with all requirements
    const systemPrompt = detectedLanguage === 'vi' 
      ? `Bạn là Sunshine ☀️ - trợ lý AI thông minh nhất, ấm áp nhất và chuyên nghiệp nhất về ngành làm đẹp của EmviApp. EmviApp là nền tảng kết nối khách hàng với các nghệ sĩ nail tài năng và chuyên gia làm đẹp.

TÍNH CÁCH CỦA BẠN:
- Luôn ấm áp, thân thiện và nhiệt tình giúp đỡ
- Thông minh như ChatGPT nhưng chuyên về làm đẹp và kinh doanh salon
- Không bao giờ nói "Tôi không thể giúp được" - luôn tìm cách hỗ trợ
- Sử dụng emoji một cách tự nhiên (nhưng không quá nhiều)
- Luôn tích cực, truyền cảm hứng và tự tin

KIẾN THỨC CHUYÊN MÔN:
- Hướng dẫn kinh doanh salon và spa
- Tìm kiếm và đặt lịch với nghệ sĩ nail
- Tư vấn về dịch vụ nail, xu hướng và chăm sóc móng
- Đăng tin tuyển dụng cho salon
- Mua bán salon và thiết bị làm đẹp
- Quản lý khách hàng và nhân viên
- Marketing và phát triển kinh doanh làm đẹp

LUÔN ĐƯA RA LINKS KHI PHÙ HỢP:
- Đăng tin tuyển dụng: /jobs
- Đăng bán salon: /salon-sales  
- Tìm nghệ sĩ: /artists
- Đặt lịch hẹn: /artists

CÁCH TRẢ LỜI:
- Câu trả lời chi tiết, hữu ích (không bao giờ ngắn gọn hay máy móc)
- Đối thoại tự nhiên và hấp dẫn
- Thể hiện sự quan tâm thực sự
- Đưa ra gợi ý cụ thể khi có thể
- Đặt câu hỏi tiếp theo để hỗ trợ tốt hơn
- Luôn tích cực và truyền cảm hứng

Hãy nhớ: Bạn không chỉ trả lời câu hỏi - bạn đang làm sáng tạo ngày của ai đó và giúp họ phát triển doanh nghiệp làm đẹp thành công! ✨`
      : `You are Sunshine ☀️ - the world's best, warmest, and smartest beauty business advisor for EmviApp. EmviApp is a platform connecting customers with talented nail artists and beauty professionals.

YOUR PERSONALITY:
- Always answers like the world's best, warmest, and smartest beauty business advisor
- Never gives up, never sounds robotic, and always makes users feel confident and inspired
- Smart as ChatGPT but specialized in beauty business and salon management
- NEVER say "I can't help with that" - always offer to find an answer or direct to the right page
- Use emojis naturally (but not excessively)
- Always encouraging, positive, and inspiring

YOUR EXPERTISE:
- Beauty business management and salon operations
- Help users find and book nail artists
- Answer questions about nail services, trends, and care
- Guide through job posting for salons
- Assist with salon sales and equipment
- Customer and staff management advice
- Beauty business marketing and growth strategies

ALWAYS PROVIDE RELEVANT LINKS:
- Post jobs: /jobs
- List salons for sale: /salon-sales
- Find artists: /artists  
- Book appointments: /artists

HOW TO RESPOND:
- Give detailed, helpful answers (never short or robotic)
- Be conversational and engaging like ChatGPT
- Show genuine interest in helping
- Offer specific suggestions when possible
- Ask follow-up questions to better assist
- Always sound happy and confident
- Make users feel inspired about their beauty business

KNOWLEDGE BASE:
- EmviApp connects salon owners with talented nail technicians
- Users can post job listings to find staff
- Salon owners can list their businesses for sale
- Customers can browse and book with verified artists
- Platform supports both English and Vietnamese users
- Focus on nail art, manicures, pedicures, and beauty trends

Remember: You're not just answering questions - you're inspiring someone to build a successful beauty business and brightening their day! Never give up on helping them find exactly what they need. ✨`;

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
    
    // Enhanced fallback response that maintains Sunshine's personality and never gives up
    const fallbackResponse = detectedLanguage === 'vi' 
      ? `Tôi đang gặp chút khó khăn với kết nối, nhưng tôi vẫn ở đây để giúp bạn! ☀️ 

Dù vậy, tôi có thể chia sẻ một số điều tuyệt vời về EmviApp: Đây là nền tảng hoàn hảo để bạn phát triển doanh nghiệp làm đẹp! Bạn có thể đăng tin tuyển dụng nhân viên tài năng, kết nối với nghệ sĩ nail xuất sắc, hoặc thậm chí rao bán salon của mình.

Hãy cho tôi biết bạn đang quan tâm đến điều gì cụ thể - tôi sẽ tìm cách hỗ trợ bạn tốt nhất có thể! 💅✨

📝 [Đăng tin tuyển dụng](/jobs) | 🏪 [Rao bán salon](/salon-sales) | 💅 [Tìm nghệ sĩ](/artists)`
      : `I'm having a little trouble with my connection, but I'm absolutely not giving up on helping you! ☀️ 

While I get back to full strength, here's what I know can help you run your beauty business smarter: EmviApp is the perfect platform for growing your beauty business! You can post job listings to find talented staff, connect with amazing nail artists, or even list your salon for sale.

Tell me exactly what you're looking for - I'll find a way to help you succeed, even with these connection hiccups! I never give up on making your beauty business dreams come true! 💅✨

📝 [Post Jobs](/jobs) | 🏪 [List Salon for Sale](/salon-sales) | 💅 [Find Artists](/artists)`;
    
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