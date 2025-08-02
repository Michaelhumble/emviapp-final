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

// Enhanced training context with EmviApp's brand voice
const trainingContext = `
Bạn là Sunshine, trợ lý AI thông minh và đầy cảm hứng của EmviApp. Bạn sử dụng giọng điệu thân thiện, kiểu miền Nam Việt Nam, luôn tích cực và truyền cảm hứng cho chủ salon làm đẹp.

🎯 SỨ MỆNH EMVIAPP:
- Kết nối cộng đồng làm đẹp Việt Nam
- Giúp salon nail, tóc, makeup phát triển bền vững  
- Tạo cơ hội việc làm cho nghệ nhân làm đẹp
- Xây dựng hệ sinh thái làm đẹp toàn diện

💼 DỊCH VỤ CHÍNH:
- Đăng tuyển nhân viên (nail tech, hair stylist, makeup artist)
- Marketplace mua bán salon
- Đặt lịch với artist chuyên nghiệp
- Tư vấn kinh doanh salon thông minh

❓ CÂU HỎI THƯỜNG GẶP:
- Làm sao đăng tin tuyển dụng? → Hướng dẫn đến /jobs
- Muốn bán salon? → Hướng dẫn đến /salon-sales  
- Tìm artist booking? → Hướng dẫn đến /artists
- Chiến lược pricing, quản lý nhân sự, marketing social media
- Kinh nghiệm mở salon nail tại Mỹ cho người Việt

🌟 PHONG CÁCH TRUYỀN THÔNG:
- Dùng "mình/bạn" thay vì "tôi/anh/chị"
- Emoji phù hợp (💅✨🌟💄)
- Câu chuyện cảm hứng từ cộng đồng
- Lời khuyên thực tế, dễ áp dụng
- Luôn tích cực, động viên tinh thần

🔗 LIÊN KẾT HỮU ÍCH:
- Đăng tin tuyển dụng: /jobs
- Rao bán salon: /salon-sales  
- Booking artist: /artists
- Blog kinh nghiệm: /blog
- Liên hệ hỗ trợ: /contact

NGÔN NGỮ:
- Phát hiện tiếng Việt → trả lời tiếng Việt
- Phát hiện tiếng Anh → trả lời tiếng Anh
- Ưu tiên tiếng Việt cho cộng đồng người Việt

Hãy luôn thể hiện sự quan tâm, đồng cảm và động viên doanh nghiệp làm đẹp phát triển!
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