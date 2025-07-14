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

// Initialize Supabase client with service role for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Hash function for prompt deduplication
async function hashPrompt(prompt: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(prompt.toLowerCase().trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 16);
}

// Extract IP address from request
function getIpAddress(req: Request): string {
  return req.headers.get('cf-connecting-ip') || 
         req.headers.get('x-forwarded-for') || 
         req.headers.get('x-real-ip') || 
         'unknown';
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      throw new Error('Authorization required');
    }

    // Get user from auth header
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      throw new Error('Invalid authentication');
    }

    const { prompt, language = 'en', context = {} } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      throw new Error('Valid prompt is required');
    }

    const cleanPrompt = prompt.trim();
    const promptHash = await hashPrompt(cleanPrompt);
    const ipAddress = getIpAddress(req);
    const userAgent = req.headers.get('user-agent') || 'unknown';

    console.log('AI Beauty Assistant request:', { 
      userId: user.id, 
      promptLength: cleanPrompt.length, 
      language, 
      context,
      ipAddress 
    });

    // Check rate limits
    const { data: rateLimitData, error: rateLimitError } = await supabase
      .rpc('check_ai_rate_limit', { p_user_id: user.id });

    if (rateLimitError) {
      console.error('Rate limit check failed:', rateLimitError);
      throw new Error('Rate limit check failed');
    }

    if (rateLimitData.rate_limited) {
      const errorMessage = rateLimitData.minute_limit_exceeded 
        ? 'Rate limit exceeded: Maximum 5 AI requests per minute. Please wait before trying again.'
        : 'Daily limit exceeded: Maximum 25 AI requests per day. Try again tomorrow.';
      
      return new Response(JSON.stringify({ 
        error: errorMessage,
        rate_limit_info: rateLimitData 
      }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check for abusive patterns
    const { data: abuseFlag, error: abuseError } = await supabase
      .rpc('detect_prompt_abuse', { 
        p_user_id: user.id, 
        p_prompt: cleanPrompt, 
        p_prompt_hash: promptHash 
      });

    if (abuseError) {
      console.error('Abuse detection failed:', abuseError);
    }

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

QUAN TRỌNG: Không trả lời các câu hỏi không liên quan đến làm đẹp. Nếu câu hỏi không phù hợp, hãy lịch sự chuyển hướng về chủ đề làm đẹp.

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

IMPORTANT: Only answer beauty-related questions. If the question is off-topic, politely redirect to beauty topics.

${contextInfo ? `Context information:\n${contextInfo}` : ''}

Return JSON format: {"primary_answer": "...", "alt1": "...", "alt2": "..."}`;

    // Create request with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    let aiResponse = '';
    let openAIError = null;

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
            { role: 'user', content: cleanPrompt }
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        openAIError = `OpenAI API error: ${response.statusText}`;
        throw new Error(openAIError);
      }

      const data = await response.json();
      aiResponse = data.choices[0].message.content;

    } catch (error) {
      openAIError = error.message;
      console.error('OpenAI API error:', error);
    }

    // Log the AI usage (both successful and failed attempts)
    const logData = {
      user_id: user.id,
      prompt: cleanPrompt,
      response: aiResponse || null,
      prompt_hash: promptHash,
      ip_address: ipAddress,
      user_agent: userAgent,
      flagged_reason: abuseFlag || null,
    };

    // Insert usage log in background (don't await to avoid blocking response)
    supabase.from('ai_usage_logs').insert(logData).then(({ error }) => {
      if (error) {
        console.error('Failed to log AI usage:', error);
      }
    });

    if (openAIError || !aiResponse) {
      throw new Error(openAIError || 'No response from AI');
    }

    console.log('OpenAI response received:', { 
      responseLength: aiResponse.length,
      flagged: !!abuseFlag 
    });

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

    // Add metadata to response
    const responseWithMeta = {
      ...parsedResponse,
      meta: {
        flagged: !!abuseFlag,
        flagged_reason: abuseFlag,
        rate_limit_info: {
          minute_usage: rateLimitData.minute_count + 1,
          daily_usage: rateLimitData.daily_count + 1,
          minute_limit: 5,
          daily_limit: 25
        }
      }
    };

    return new Response(JSON.stringify(responseWithMeta), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('AI Beauty Assistant error:', error);
    
    // Fallback responses
    const fallbackResponse = {
      en: {
        primary_answer: "I'm having trouble connecting right now, but here's a general tip: For best results in beauty treatments, always prioritize skin health and proper preparation. What specific area would you like me to focus on when I'm back online?",
        alt1: "Consider consulting with a professional beauty expert in your area for personalized advice.",
        alt2: "Check out the trending posts in the community for inspiration and tips from other creators.",
        meta: { error: true, error_message: error.message }
      },
      vi: {
        primary_answer: "Tôi đang gặp sự cố kết nối, nhưng đây là một lời khuyên chung: Để đạt kết quả tốt nhất trong các liệu trình làm đẹp, hãy luôn ưu tiên sức khỏe da và chuẩn bị đúng cách. Bạn muốn tôi tập trung vào lĩnh vực nào khi tôi hoạt động trở lại?",
        alt1: "Hãy tham khảo ý kiến của chuyên gia làm đẹp chuyên nghiệp trong khu vực của bạn.",
        alt2: "Xem các bài đăng thịnh hành trong cộng đồng để lấy cảm hứng và học hỏi từ các creator khác.",
        meta: { error: true, error_message: error.message }
      }
    };

    const lang = req.url.includes('language=vi') ? 'vi' : 'en';
    const statusCode = error.message.includes('Rate limit') ? 429 : 
                      error.message.includes('Authorization') ? 401 : 500;
    
    return new Response(JSON.stringify(fallbackResponse[lang]), {
      status: statusCode,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});