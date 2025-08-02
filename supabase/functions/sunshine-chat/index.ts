import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

console.log('=== SUNSHINE CHAT DEBUG ===');
console.log('OpenAI API Key configured:', openAIApiKey ? 'YES' : 'NO');
console.log('Key length:', openAIApiKey ? openAIApiKey.length : 0);
console.log('Key starts with sk-:', openAIApiKey ? openAIApiKey.startsWith('sk-') : false);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Enhanced EmviApp brand voice training context
const trainingContext = `
Bạn là Sunshine, trợ lý AI đặc biệt của EmviApp - được tạo ra bởi Michael với tình yêu dành cho cộng đồng làm đẹp Việt Nam. Tên "Sunshine" thể hiện ánh sáng hy vọng và năng lượng tích cực mà EmviApp mang đến cho ngành làm đẹp.

🌟 MISSION CỦA EMVIAPP & SUNSHINE:
Michael tạo ra EmviApp với sứ mệnh kết nối và nâng đỡ cộng đồng làm đẹp, đặc biệt là các salon nail Việt Nam tại Mỹ. Chúng mình tin rằng mọi salon đều xứng đáng thành công và phát triển bền vững.

💪 GIỌNG ĐIỆU THƯƠNG HIỆU - "Heart-first, Practical-smart":
- Luôn ấm áp, chân thành như người bạn thân
- Hiểu rõ khó khăn của chủ salon và nhân viên
- Đưa ra lời khuyên thực tế, có thể áp dụng ngay
- Truyền cảm hứng và động viên tinh thần
- Dùng "mình/bạn" thay vì "tôi/anh chị"
- Emoji phù hợp nhưng không quá nhiều

🎯 DỊCH VỤ CHÍNH CỦA EMVIAPP:
✨ Tuyển dụng nhân viên: /jobs (nail tech, hair stylist, makeup artist)
✨ Marketplace salon: /salon-sales (mua bán salon)  
✨ Booking artist: /artists (đặt lịch với chuyên gia)
✨ Community & Resources: /blog (kinh nghiệm, tips kinh doanh)

💡 CÂU TRẢ LỜI MẪU CHO CÂU HỎI THƯỜNG GẶP:

"Ai đặt tên Sunshine cho bạn?"
→ "Michael - founder EmviApp đặt tên mình là Sunshine vì anh ấy muốn mình mang ánh sáng hy vọng đến cộng đồng làm đẹp. Như mặt trời soi sáng cho mọi người, mình hy vọng sẽ giúp salon các bạn tỏa sáng và thành công! ☀️"

"Bạn giúp gì được cho tiệm nails?"
→ "Ơi, mình có thể giúp bạn rất nhiều thứ nè! 💅
- Đăng tin tuyển nail tech giỏi (/jobs)
- Tìm salon để mua hoặc bán (/salon-sales)
- Kết nối với artist chuyên nghiệp (/artists)  
- Chia sẻ kinh nghiệm kinh doanh thành công
- Tư vấn marketing, quản lý nhân sự, pricing
Bạn đang cần hỗ trợ gì nhất? Mình sẵn sàng giúp đỡ!"

"What can you help me with?"
→ "I'm here to help your beauty business thrive! 🌟 I can assist with:
- Job postings for talented nail techs, stylists (/jobs)
- Salon marketplace for buying/selling (/salon-sales)
- Connecting with professional artists (/artists)
- Business advice: pricing, staffing, marketing
- Vietnamese salon success strategies
What would you like to focus on first? I'm excited to help you succeed!"

🗣️ NGÔN NGỮ THÔNG MINH:
- Phát hiện tiếng Việt → trả lời tiếng Việt (giọng miền Nam)
- Phát hiện tiếng Anh → trả lời tiếng Anh tự nhiên
- Kết hợp cả hai ngôn ngữ khi phù hợp với người dùng

🎨 PHONG CÁCH TRUYỀN THÔNG:
- Câu chuyện cảm hứng từ cộng đồng thực tế
- Lời khuyên cụ thể, có thể áp dụng ngay
- Luôn động viên và tạo động lực
- Thể hiện sự quan tâm chân thành
- Không bao giờ lạnh lùng hay máy móc

Hãy luôn nhớ: Bạn không chỉ là AI trả lời câu hỏi, mà là người bạn đồng hành cùng cộng đồng làm đẹp Việt Nam trên con đường thành công! 💖
`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [], userId } = await req.json();
    
    console.log('Sunshine chat request:', { userId, messageLength: message.length });
    
    // Check if API key is missing
    if (!openAIApiKey || !openAIApiKey.startsWith('sk-')) {
      console.error('❌ OpenAI API key is missing or invalid');
      // Detect language for error message
      const isVietnamese = /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđĐ]/.test(message);
      const errorMessage = isVietnamese 
        ? "Ôi, mình đang gặp chút vấn đề kỹ thuật nè! 😅 Bạn liên hệ team support để được hỗ trợ ngay nhé!"
        : "Oops! I'm having some technical issues right now. Please contact our support team for immediate help!";
      
      return new Response(JSON.stringify({ 
        response: errorMessage,
        error: 'missing_api_key'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Detect language (simple detection)
    const isVietnamese = /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđĐ]/.test(message);
    
    // Build conversation with context
    const messages = [
      {
        role: 'system',
        content: trainingContext + `\n\nRespond in ${isVietnamese ? 'Vietnamese' : 'English'}.`
      },
      ...conversationHistory.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: 'user',
        content: message
      }
    ];

    console.log('🚀 Making OpenAI API request...');
    console.log('Model: gpt-4o-mini, Messages count:', messages.length);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    console.log('📡 OpenAI Response Status:', response.status);
    console.log('📡 OpenAI Response Headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`❌ OpenAI API error: ${response.status}`, errorData);
      
      // Handle rate limiting with exponential backoff
      if (response.status === 429) {
        const fallbackMessage = isVietnamese 
          ? "Ủa, mình đang quá bận rồi! 😊 Thử hỏi lại sau vài giây nha, mình sẽ trả lời ngay!" 
          : "Wow, I'm quite busy right now! 😊 Try asking again in a few seconds and I'll respond right away!";
        
        return new Response(JSON.stringify({ 
          response: fallbackMessage,
          language: isVietnamese ? 'vi' : 'en',
          retry_after: 5
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`OpenAI API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('✅ OpenAI response generated successfully');
    console.log('Response length:', aiResponse.length, 'Language:', isVietnamese ? 'vi' : 'en');
    console.log('Usage:', data.usage);

    return new Response(JSON.stringify({ 
      response: aiResponse,
      language: isVietnamese ? 'vi' : 'en'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in sunshine-chat function:', error);
    
    // Enhanced fallback messages with brand voice
    const isVietnamese = /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđĐ]/.test(message);
    const fallbackMessage = isVietnamese
      ? "Ôi không! Mình đang gặp chút trục trặc kỹ thuật 😅 Bạn thử hỏi câu khác hoặc liên hệ team hỗ trợ qua /contact nha! Mình sẽ cố gắng khắc phục ngay! 💪"
      : "Oh no! I'm having some technical hiccups 😅 Try asking something else or contact our support team at /contact! I'll work on fixing this right away! 💪";
    
    return new Response(JSON.stringify({ 
      response: fallbackMessage,
      error: true,
      contact_link: '/contact'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});