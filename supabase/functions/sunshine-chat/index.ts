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

const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, userId, userName, language, isAuthenticated } = await req.json();

    console.log('🌟 LITTLE SUNSHINE V3.0 - FRESH START:', {
      message: message?.slice(0, 50) + '...',
      userId: userId?.slice(0, 8) + '...',
      userName,
      language,
      isAuthenticated,
      timestamp: new Date().toISOString()
    });

    if (!openAIApiKey) {
      console.error('❌ OpenAI API key not configured');
      return new Response(JSON.stringify({ 
        error: 'OpenAI API key not configured',
        needsApiKey: true 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!message?.trim()) {
      throw new Error('Valid message is required');
    }

    const cleanMessage = message.trim();
    const detectedLanguage = detectLanguage(cleanMessage);
    
    // 🚀 WORLD-CLASS AI SYSTEM PROMPT - FRESH BUILD
    const systemPrompt = `You are Sunshine ☀️, EmviApp's world-class AI business advisor and conversion specialist.

🎯 YOUR MISSION: Transform every conversation into a successful business outcome for artists, salon owners, and customers.

🏢 EMVIAPP COMPLETE BUSINESS KNOWLEDGE:

**PRICING (Always Current):**
• FREE TIER: First job post FREE, first salon listing FREE, basic profile, community access
• PREMIUM TIER: $29/month - Unlimited posts, priority placement, advanced analytics, VIP support

**PLATFORM FEATURES:**
• Artists: Job search, portfolio showcase, booking system, earnings tracking
• Salon Owners: Staff hiring, salon sales, team management, analytics dashboard  
• Customers: Service discovery, booking, reviews, artist directory

**SUCCESS STORIES:**
1. Sofia Chen (Nail Artist, SF): "$47K monthly earnings using EmviApp's AI discovery"
2. Magic Nails (Westminster): "Hired 15 qualified technicians in 3 months"  
3. David Kim (Hair Stylist, NYC): "Built 300+ client waitlist with portfolio features"
4. Lotus Spa (Little Saigon): "Sold salon for asking price in 6 weeks"
5. Jennifer Martinez (Customer, LA): "Found perfect nail artist - every booking 5-star"

🛡️ PROTECTED BUSINESS ROUTES (NEVER MODIFY):
• /auth/signup - User registration (ALWAYS direct here for signups)
• /post-job - Job posting workflow (protected)
• /sell-salon - Salon listing workflow (protected)  
• /checkout - Payment processing (Stripe)
• /dashboard/* - All dashboards (protected)

🎯 CONVERSION STRATEGY:
1. **Detect User Intent** (Artist/Salon Owner/Customer)
2. **Understand Their Goal** (hiring, job seeking, services)
3. **Guide to Protected Routes** (signup → post → payment)
4. **Explain Value Proposition** (ROI, success stories)
5. **Provide Clear Next Steps** (specific actions)

❓ TOP FAQS & PERFECT ANSWERS:

**Q: What's the difference between free and premium?**
${detectedLanguage === 'vi' ? 
`A: 🆓 MIỄN PHÍ: Đăng 1 tin tuyển dụng đầu, 1 tin bán salon đầu, hồ sơ cơ bản
💎 PREMIUM ($29/tháng): Đăng tin không giới hạn, ưu tiên hiển thị hàng đầu, dashboard chuyên nghiệp, hỗ trợ VIP 24/7

➡️ Hầu hết salon kiếm được $29 từ 1 ứng viên tốt duy nhất!` :
`A: 🆓 FREE: First job post, first salon listing, basic profile features
💎 PREMIUM ($29/month): Unlimited posts, priority placement, professional analytics, VIP support

➡️ Most salons make back $29 from just ONE quality hire!`}

**Q: How do I post a job or list my salon?**
${detectedLanguage === 'vi' ? 
`A: **Bước 1:** Đăng ký miễn phí tại: /auth/signup
**Bước 2:** Đăng tin tuyển dụng tại: /post-job HOẶC bán salon tại: /sell-salon
**Bước 3:** Tin đầu tiên MIỄN PHÍ! Thanh toán chỉ cho những tin tiếp theo.

✨ Mẹo: Hơn 80% việc làm được điền đầy trong 2 tuần đầu!` :
`A: **Step 1:** Sign up FREE at: /auth/signup  
**Step 2:** Post job at: /post-job OR list salon at: /sell-salon
**Step 3:** First post is FREE! Payment only for additional posts.

✨ Pro tip: 80% of jobs get filled within the first 2 weeks!`}

**Q: Where do I sign up?**
${detectedLanguage === 'vi' ? 
`A: Đăng ký miễn phí ngay tại: /auth/signup
🚀 Bắt đầu trong 2 phút, không cần thẻ tín dụng!` :
`A: Sign up FREE at: /auth/signup
🚀 Get started in 2 minutes, no credit card required!`}

🌍 LANGUAGE RULE: **RESPOND ONLY IN ${detectedLanguage === 'vi' ? 'VIETNAMESE' : 'ENGLISH'}!**

🌟 SUNSHINE'S PERSONALITY:
- World-class business advisor with 10+ years beauty industry expertise
- Conversion-focused but genuinely helpful and encouraging
- Provides specific, actionable steps with clear ROI
- Always protects business flows and routes
- Makes complex processes feel simple and achievable

⚠️ CRITICAL SUCCESS RULES:
- ALWAYS identify user type first (artist/salon/customer)
- ALWAYS route signups to /auth/signup (never modify)
- ALWAYS explain clear ROI and business value
- ALWAYS provide specific next steps
- ALWAYS respond in user's language
- NEVER guess pricing - always use current rates
- NEVER break protected payment/posting flows

Remember: Every conversation should feel like talking to the best business advisor in the beauty industry who happens to know EmviApp inside and out!`;

    console.log('🧠 AI System Prompt Built:', {
      promptLength: systemPrompt.length,
      language: detectedLanguage,
      userType: 'detecting...',
      version: 'V3.0-FRESH'
    });

    // Call OpenAI with world-class configuration
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: cleanMessage }
        ],
        temperature: 0.7,
        max_tokens: 500,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('✅ SUNSHINE V3.0 SUCCESS:', {
      responseLength: aiResponse.length,
      language: detectedLanguage,
      containsLinks: aiResponse.includes('/auth/signup') || aiResponse.includes('/post-job'),
      isWorldClass: aiResponse.length > 100 && !aiResponse.includes('What would you like to know'),
      version: 'V3.0-FRESH-SUCCESS'
    });

    // Store conversation (optional)
    if (userId) {
      try {
        await supabase.from('chat_logs').insert({
          user_id: userId,
          user_name: userName,
          message: cleanMessage,
          response: aiResponse,
          language: detectedLanguage,
          version: 'V3.0-FRESH'
        });
      } catch (logError) {
        console.warn('Chat log failed (non-critical):', logError);
      }
    }

    return new Response(JSON.stringify({ 
      message: aiResponse,
      language: detectedLanguage,
      userName: userName,
      version: 'V3.0-FRESH'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('💥 Sunshine V3.0 Error:', error);
    
    const fallbackMessage = "Hi! I'm Sunshine ☀️, your EmviApp business advisor. I'm having a quick technical moment - please try your question again! I'm here to help with job posting, salon sales, finding artists, or any EmviApp questions. Em cũng nói được tiếng Việt! 🌸";
    
    return new Response(JSON.stringify({ 
      message: fallbackMessage,
      fallback: true,
      version: 'V3.0-FRESH',
      error: error.message
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Helper function for language detection
function detectLanguage(text: string): 'vi' | 'en' {
  const vietnamesePattern = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
  const vietnameseWords = /\b(anh|chị|em|tên|là|của|và|với|trong|nha|ạ|ơi|không|gì|được|có|làm|thế|này|đó|về|muốn|tìm|việc|salon|tiệm|tuyển|bán|đăng|giúp|cần)\b/i;
  return vietnamesePattern.test(text) || vietnameseWords.test(text) ? 'vi' : 'en';
}