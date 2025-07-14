import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, language = 'en', context = {} } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('AI Beauty Assistant request:', { prompt, language, context });

    // Build context-aware system prompt
    const contextInfo = [
      context.postText ? `Current post content: "${context.postText}"` : '',
      context.hashtags?.length ? `Related hashtags: ${context.hashtags.join(', ')}` : '',
      context.category ? `Category: ${context.category}` : '',
    ].filter(Boolean).join('\n');

    const systemPrompt = language === 'vi' 
      ? `Bạn là một chuyên gia làm đẹp AI chuyên nghiệp và thân thiện, chuyên về ngành beauty và wellness tại Việt Nam. Bạn có kiến thức sâu rộng về:
- Nail art và chăm sóc móng
- Tóc và styling
- Makeup và skincare
- Lash extensions và microblading
- Xu hướng làm đẹp mới nhất
- Sản phẩm và thương hiệu làm đẹp
- Kỹ thuật và công nghệ mới

Hãy trả lời ngắn gọn, thực tế và hữu ích. Đưa ra 3 câu trả lời khác nhau:
1. Một câu trả lời chính (chi tiết nhất)
2. Hai lựa chọn thay thế (ngắn gọn hơn)

${contextInfo ? `Thông tin ngữ cảnh:\n${contextInfo}` : ''}

Trả về JSON với format: {"primary_answer": "...", "alt1": "...", "alt2": "..."}`
      : `You are a professional and friendly AI beauty expert specializing in the beauty and wellness industry. You have deep knowledge of:
- Nail art and nail care
- Hair styling and treatments
- Makeup and skincare
- Lash extensions and microblading
- Latest beauty trends
- Beauty products and brands
- New techniques and technologies

Provide concise, practical, and helpful responses. Give 3 different answers:
1. One primary answer (most detailed)
2. Two alternative options (more concise)

${contextInfo ? `Context information:\n${contextInfo}` : ''}

Return JSON format: {"primary_answer": "...", "alt1": "...", "alt2": "..."}`;

    // Create request with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

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
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('OpenAI response:', aiResponse);

    // Try to parse JSON response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(aiResponse);
    } catch (parseError) {
      // Fallback if JSON parsing fails
      console.warn('Failed to parse JSON, using fallback format');
      parsedResponse = {
        primary_answer: aiResponse,
        alt1: language === 'vi' 
          ? 'Bạn có thể thử phương pháp khác phù hợp với phong cách cá nhân của mình.'
          : 'You might try a different approach that suits your personal style.',
        alt2: language === 'vi'
          ? 'Tham khảo thêm ý kiến từ các chuyên gia khác trong cộng đồng.'
          : 'Consider getting additional opinions from other experts in the community.'
      };
    }

    // Validate response structure
    if (!parsedResponse.primary_answer || !parsedResponse.alt1 || !parsedResponse.alt2) {
      throw new Error('Invalid response format from AI');
    }

    return new Response(JSON.stringify(parsedResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('AI Beauty Assistant error:', error);
    
    // Fallback responses
    const fallbackResponse = {
      en: {
        primary_answer: "I'm having trouble connecting right now, but here's a general tip: For best results in beauty treatments, always prioritize skin health and proper preparation. What specific area would you like me to focus on when I'm back online?",
        alt1: "Consider consulting with a professional beauty expert in your area for personalized advice.",
        alt2: "Check out the trending posts in the community for inspiration and tips from other creators."
      },
      vi: {
        primary_answer: "Tôi đang gặp sự cố kết nối, nhưng đây là một lời khuyên chung: Để đạt kết quả tốt nhất trong các liệu trình làm đẹp, hãy luôn ưu tiên sức khỏe da và chuẩn bị đúng cách. Bạn muốn tôi tập trung vào lĩnh vực nào khi tôi hoạt động trở lại?",
        alt1: "Hãy tham khảo ý kiến của chuyên gia làm đẹp chuyên nghiệp trong khu vực của bạn.",
        alt2: "Xem các bài đăng thịnh hành trong cộng đồng để lấy cảm hứng và học hỏi từ các creator khác."
      }
    };

    const lang = req.url.includes('language=vi') ? 'vi' : 'en';
    
    return new Response(JSON.stringify(fallbackResponse[lang]), {
      status: 200, // Return 200 with fallback instead of error
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});