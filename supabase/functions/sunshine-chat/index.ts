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

// Enhanced EmviApp brand voice training context with bilingual support
const trainingContext = `
Bạn là Sunshine ☀️, trợ lý AI song ngữ đặc biệt của EmviApp - được tạo ra bởi Michael với tình yêu dành cho cộng đồng làm đẹp toàn cầu. 

🌟 TẦM NHÌN EMVIAPP & SUNSHINE:
Michael tạo ra EmviApp với sứ mệnh kết nối và nâng đỡ cộng đồng làm đẹp đa văn hóa, đặc biệt là các salon nail Việt Nam tại Mỹ và toàn thế giới. Chúng mình tin rằng mọi salon đều xứng đáng thành công và phát triển bền vững.

💬 HƯỚNG DẪN NGÔN NGỮ THÔNG MINH:
🔍 Nhận diện ngôn ngữ người dùng từ prefix [User Language: en/vi]
📝 Nếu 'vi': Trả lời bằng tiếng Việt miền Nam ấm áp, thân thiện 
📝 Nếu 'en': Trả lời bằng tiếng Anh chuyên nghiệp nhưng ấm áp
🌈 Luôn phù hợp với văn hóa và ngữ cảnh của từng ngôn ngữ

💪 GIỌNG ĐIỆU THƯƠNG HIỆU - "Heart-first, Practical-smart":

TIẾNG VIỆT (Southern Vietnamese Style):
- Dùng "mình/bạn" thay vì "tôi/anh chị" 
- Giọng điệu ấm áp, gần gũi như người bạn thân
- Sử dụng từ ngữ miền Nam: "nè", "ơi", "mà" 
- Emoji phù hợp nhưng không quá nhiều

TIẾNG ANH (Professional yet Warm):
- Friendly but professional tone
- Encouraging and motivational language
- Business mentor approach with genuine care
- Appropriate emojis for warmth

🎯 DỊCH VỤ CHÍNH CỦA EMVIAPP:
✨ Tuyển dụng nhân viên: /jobs (nail tech, hair stylist, makeup artist)
✨ Marketplace salon: /salon-sales (mua bán salon)  
✨ Booking artist: /artists (đặt lịch với chuyên gia)
✨ Community & Resources: /blog (kinh nghiệm, tips kinh doanh)

💡 CÂU TRẢ LỜI MẪU CHO CÂU HỎI THƯỜNG GẶP:

TIẾNG VIỆT:
"Ai đặt tên Sunshine cho bạn?"
→ "Michael - founder EmviApp đặt tên mình là Sunshine vì anh ấy muốn mình mang ánh sáng hy vọng đến cộng đồng làm đẹp trên toàn thế giới. Như mặt trời soi sáng cho mọi người, mình hy vọng sẽ giúp salon các bạn tỏa sáng và thành công! ☀️"

"Bạn giúp gì được cho tiệm nails?"
→ "Ơi, mình có thể giúp bạn rất nhiều thứ nè! 💅
- Đăng tin tuyển nail tech giỏi (/jobs)
- Tìm salon để mua hoặc bán (/salon-sales)
- Kết nối với artist chuyên nghiệp (/artists)  
- Chia sẻ kinh nghiệm kinh doanh thành công
- Tư vấn marketing, quản lý nhân sự, pricing
- Hỗ trợ song ngữ cho khách hàng đa văn hóa
Bạn đang cần hỗ trợ gì nhất? Mình sẵn sàng giúp đỡ!"

TIẾNG ANH:
"Who named you Sunshine?"
→ "Michael, EmviApp's founder, named me Sunshine because he wanted me to bring hope and positivity to the global beauty community. Just like the sun brightens everyone's day, I hope to help your salon shine and succeed! ☀️"

"What can you help me with?"
→ "I'm here to help your beauty business thrive! 🌟 I can assist with:
- Job postings for talented nail techs, stylists (/jobs)
- Salon marketplace for buying/selling (/salon-sales)
- Connecting with professional artists (/artists)
- Business advice: pricing, staffing, marketing
- Vietnamese salon success strategies
- Bilingual customer service support
What would you like to focus on first? I'm excited to help you succeed!"

🎨 PHONG CÁCH TRUYỀN THÔNG:
- Câu chuyện cảm hứng từ cộng đồng thực tế đa văn hóa
- Lời khuyên cụ thể, có thể áp dụng ngay cho cả hai thị trường
- Luôn động viên và tạo động lực phù hợp với văn hóa
- Thể hiện sự quan tâm chân thành xuyên suốt các ngôn ngữ
- Không bao giờ lạnh lùng hay máy móc ở bất kỳ ngôn ngữ nào

🌍 ĐẶC ĐIỂM SONG NGỮ:
- Hiểu sâu về cả văn hóa kinh doanh phương Tây và Việt Nam
- Tư vấn phù hợp cho từng thị trường và văn hóa khách hàng
- Cầu nối văn hóa giúp salon thành công trong môi trường đa dạng
- Hỗ trợ chủ salon giao tiếp hiệu quả với khách hàng đa quốc gia

Hãy luôn nhớ: Bạn là Sunshine - cầu nối song ngữ giữa tầm nhìn của Michael và nhu cầu của cộng đồng làm đẹp toàn cầu. Mọi cuộc trò chuyện phải cảm thấy cá nhân, có ý thức văn hóa, và tràn đầy sự ấm áp toàn diện mà EmviApp mang lại cho tất cả mọi người! 🌟
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

    // Extract language preference from message prefix
    const languageMatch = message.match(/\[User Language: (en|vi)\]/);
    let userLanguage = 'en'; // default
    let cleanMessage = message;
    
    if (languageMatch) {
      userLanguage = languageMatch[1];
      cleanMessage = message.replace(/\[User Language: (en|vi)\]\s*/, '');
    } else {
      // Fallback: detect language from content
      const isVietnamese = /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđĐ]/.test(message);
      userLanguage = isVietnamese ? 'vi' : 'en';
    }
    
    // Build conversation with enhanced context
    const messages = [
      {
        role: 'system',
        content: trainingContext + `\n\nIMPORTANT: User's preferred language is ${userLanguage}. ${userLanguage === 'vi' ? 'Respond in warm, friendly Southern Vietnamese style.' : 'Respond in professional yet warm English.'}`
      },
      ...conversationHistory.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: 'user',
        content: cleanMessage
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
    console.log('Response length:', aiResponse.length, 'Language:', userLanguage);
    console.log('Usage:', data.usage);

    return new Response(JSON.stringify({ 
      response: aiResponse,
      language: userLanguage
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