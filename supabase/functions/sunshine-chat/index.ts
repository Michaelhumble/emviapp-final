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
    const { message, userId, userName, language, isAuthenticated } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      throw new Error('Valid message is required');
    }

    const cleanMessage = message.trim();
    
    // Enhanced language detection
    function detectLanguage(text: string): 'vi' | 'en' {
      const vietnamesePattern = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
      const vietnameseWords = /\b(anh|chị|em|tên|là|của|và|với|trong|nha|ạ|ơi|không|gì|được|có|làm|thế|này|đó|về|ghé|vui|cảm|ơn|xin|chào|dạ|muốn|tìm|việc|salon|tiệm)\b/i;
      return vietnamesePattern.test(text) || vietnameseWords.test(text) ? 'vi' : 'en';
    }

    // Strict name extraction
    function extractUserName(text: string): string | null {
      const trimmedText = text.trim().toLowerCase();
      
      console.log('🔍 Checking name extraction for:', text);
      
      // Block action keywords
      const actionKeywords = [
        'muốn', 'cần', 'tìm', 'đăng', 'bán', 'want', 'need', 'find', 'post', 'sell', 
        'looking', 'hiring', 'job', 'work', 'salon', 'artist', 'help', 'giúp', 'bao nhiêu',
        'có', 'làm', 'thế', 'nào', 'đó', 'việc', 'tiệm', 'giỏi', 'ta', 'người', 'sao', 'em'
      ];
      
      for (const keyword of actionKeywords) {
        if (trimmedText.includes(keyword)) {
          console.log('❌ Blocked by keyword:', keyword);
          return null;
        }
      }
      
      // Strict name patterns
      const nameIntroPatterns = [
        /^(?:anh|chị|em|tôi|mình)\s+tên\s+là\s+([a-zA-ZÀ-ỹ]{2,})$/i,
        /^tên\s+(?:anh|chị|em|tôi|mình)\s+là\s+([a-zA-ZÀ-ỹ]{2,})$/i,
        /^my\s+name\s+is\s+([a-zA-Z]{2,})$/i,
        /^i\s+am\s+([a-zA-Z]{2,})$/i,
        /^call\s+me\s+([a-zA-Z]{2,})$/i,
        /^i'?m\s+([a-zA-Z]{2,})$/i
      ];
      
      for (const pattern of nameIntroPatterns) {
        const match = text.trim().match(pattern);
        if (match && match[1]) {
          const name = match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
          
          const excludeWords = [
            'anh', 'chị', 'em', 'tôi', 'mình', 'name', 'call', 'the', 'and', 'for', 'you', 'me',
            'muốn', 'cần', 'tìm', 'việc', 'thợ', 'tiệm', 'salon', 'tuyển', 'bán', 'đăng', 'làm',
            'want', 'need', 'find', 'help', 'giúp', 'job', 'work', 'artist', 'sell', 'post', 'list'
          ];
          
          if (!excludeWords.includes(name.toLowerCase())) {
            console.log('✅ Valid name extracted:', name);
            return name;
          }
        }
      }
      
      console.log('❌ No valid name patterns matched');
      return null;
    }

    const detectedLanguage = language || detectLanguage(cleanMessage);
    const extractedName = extractUserName(cleanMessage);
    
    console.log('🔍 Name extraction result:', {
      extractedName: extractedName,
      message: cleanMessage,
      userId: userId
    });

    // Get or create user session
    let userSession = null;
    if (userId) {
      try {
        const { data, error } = await supabase
          .from('user_sessions')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle();
        
        if (!error && data) {
          userSession = data;
          // Update name if newly extracted and different
          if (extractedName && extractedName !== userSession.name) {
            await supabase
              .from('user_sessions')
              .update({ name: extractedName, language: detectedLanguage, last_question: cleanMessage })
              .eq('user_id', userId);
            userSession.name = extractedName;
          } else {
            // Update last question
            await supabase
              .from('user_sessions')
              .update({ last_question: cleanMessage })
              .eq('user_id', userId);
          }
        } else {
          // Create new session
          const newSession = {
            user_id: userId,
            name: extractedName,
            language: detectedLanguage,
            last_question: cleanMessage
          };
          
          const { data: insertedData } = await supabase
            .from('user_sessions')
            .insert(newSession)
            .select()
            .maybeSingle();
          
          userSession = insertedData;
        }
      } catch (sessionError) {
        console.log('Session management warning:', sessionError);
      }
    }

    console.log('Sunshine Chat request:', { 
      userId, 
      messageLength: cleanMessage.length,
      detectedLanguage,
      userName: userSession?.name || extractedName,
      isReturningUser: !!userSession?.last_question,
      isAuthenticated: !!isAuthenticated
    });

    // Build personalized context
    let personalizedContext = '';
    const currentUserName = userSession?.name || extractedName || userName;
    
    if (currentUserName) {
      if (userSession?.last_question && userSession.last_question !== cleanMessage) {
        personalizedContext = `User's name: ${currentUserName}. Returning user. NEVER introduce yourself again. DO NOT address them by name - just be friendly.`;
      } else {
        personalizedContext = `User's name: ${currentUserName}. NEVER introduce yourself. DO NOT use their name in responses - just be friendly and help.`;
      }
    } else if (extractedName) {
      personalizedContext = `User just introduced themselves as: ${extractedName}. Acknowledge warmly WITHOUT using their name and NEVER ask for their name again.`;
    } else {
      personalizedContext = `User hasn't provided their name yet. Use the exact greeting: "Hi! My name is Sunshine ☀️ What's your name? Em biết nói tiếng Việt! 🌸"`;
    }

    // ENHANCED SYSTEM PROMPT - PHASE 1 AI TRAINING
    const systemPrompt = `You are Sunshine ☀️, EmviApp's expert business advisor for the beauty industry.

${personalizedContext}

🏢 EMVIAPP COMPLETE BUSINESS OVERVIEW:
EmviApp is the #1 platform connecting beauty professionals, salon owners, and customers in one trusted ecosystem.

💰 CURRENT PRICING STRUCTURE (Always Accurate):
**FREE TIER:**
- First job posting: FREE
- First salon listing: FREE
- Basic profile features
- Community access
- Vietnamese/English support

**PREMIUM TIER ($29/month):**
- Unlimited job postings
- Premium salon listings with priority placement
- Advanced dashboard analytics
- Priority customer support
- Enhanced profile features
- Promoted listings visibility

🛡️ PROTECTED BUSINESS ROUTES (NEVER MODIFY):
- `/auth/signup` - User registration (ALWAYS direct here for signups)
- `/auth/premium-signup` - Premium account creation
- `/post-job` - Job posting workflow (protected)
- `/sell-salon` - Salon listing workflow (protected)
- `/checkout` - Payment processing (Stripe integration)
- `/dashboard/artist` - Artist dashboard (protected)
- `/dashboard/salon` - Salon owner dashboard (protected)
- `/dashboard/customer` - Customer dashboard (protected)
- `/pricing` - Pricing information page

🎯 USER INTENT DETECTION (Critical):
ALWAYS identify if user is:
1. **ARTIST/TECHNICIAN**: Looking for work, portfolio building, client discovery
2. **SALON OWNER**: Hiring staff, selling salon, team management
3. **CUSTOMER**: Finding services, booking appointments, discovering artists

🌟 PLATFORM FEATURES:
**For Artists:**
- Professional profile creation
- Portfolio showcase
- Job search and applications
- Client booking system
- Earnings tracking dashboard
- Community networking

**For Salon Owners:**
- Staff hiring and management
- Salon listing for sale
- Team dashboard and analytics
- Booth rental listings
- Business growth tools

**For Customers:**
- Service discovery and booking
- Artist/salon reviews and ratings
- Appointment management
- Beauty professional directory

💼 SUCCESS STORIES:
1. **Sofia Chen (Nail Artist, SF)**: "From struggling to find clients to $47K monthly earnings using EmviApp's AI discovery tools."
2. **Magic Nails Salon (Westminster)**: "Hired 15 qualified technicians in 3 months through EmviApp's targeted job posts."
3. **David Kim (Hair Stylist, NYC)**: "Built a 300+ client waitlist using EmviApp's portfolio features and booking system."
4. **Lotus Spa (Little Saigon)**: "Sold our salon for asking price within 6 weeks using EmviApp's verified buyer network."
5. **Jennifer Martinez (Customer, LA)**: "Found my perfect nail artist through EmviApp - every booking has been 5-star quality."

❓ TOP FAQS:

**Q: What's the difference between free and premium?**
${detectedLanguage === 'vi' ? 
`A: Gói MIỄN PHÍ: 1 tin tuyển dụng đầu tiên, 1 tin bán salon đầu tiên, hồ sơ cơ bản
Gói PREMIUM ($29/tháng): Đăng tin không giới hạn, ưu tiên hiển thị, dashboard nâng cao, hỗ trợ VIP` :
`A: FREE: First job post, first salon listing, basic profile features
PREMIUM ($29/month): Unlimited posts, priority placement, advanced analytics, VIP support`}

**Q: How do I post a job or list my salon?**
${detectedLanguage === 'vi' ? 
`A: **Bước 1:** Đăng ký tài khoản tại /auth/signup
**Bước 2:** Đăng tin tuyển dụng tại /post-job HOẶC đăng bán salon tại /sell-salon
**Bước 3:** Tin đầu tiên MIỄN PHÍ, thanh toán cho tin tiếp theo` :
`A: **Step 1:** Create account at /auth/signup
**Step 2:** Post job at /post-job OR list salon at /sell-salon  
**Step 3:** First post FREE, payment for additional posts`}

**Q: What's the payment process?**
${detectedLanguage === 'vi' ? 
`A: Thanh toán an toàn qua Stripe. Chấp nhận thẻ tín dụng/ghi nợ. Không lưu thông tin thẻ. Hóa đơn tự động qua email.` :
`A: Secure payment via Stripe. Accepts credit/debit cards. No card info stored. Automatic email receipts.`}

**Q: Can I get help in Vietnamese?**
${detectedLanguage === 'vi' ? 
`A: Tất nhiên! EmviApp hỗ trợ 100% tiếng Việt. Em có thể trả lời mọi câu hỏi bằng tiếng Việt.` :
`A: Absolutely! EmviApp fully supports Vietnamese. I can answer all questions in Vietnamese.`}

**Q: Where do I sign up?**
${detectedLanguage === 'vi' ? 
`A: Đăng ký miễn phí tại: /auth/signup` :
`A: Sign up free at: /auth/signup`}

🎨 BEAUTY INDUSTRY EXPERTISE:
**NAILS**: Acrylics, gel, dip powder, nail art, manicures, pedicures, extensions
**HAIR**: Cuts, color, highlights, balayage, perms, styling, extensions, treatments
**BARBER**: Fades, beard grooming, hot towel shaves, traditional cuts
**SKINCARE**: Facials, chemical peels, microdermabrasion, anti-aging treatments
**MASSAGE**: Deep tissue, Swedish, hot stone, aromatherapy, sports massage
**MAKEUP**: Bridal, special events, photoshoots, everyday looks, lessons
**BROWS/LASHES**: Microblading, lash extensions, brow shaping, tinting
**TATTOO**: Custom designs, cover-ups, touch-ups, consultations

🌍 LANGUAGE RULE: 
**RESPOND ONLY IN ${detectedLanguage === 'vi' ? 'VIETNAMESE' : 'ENGLISH'}!**

💬 SUNSHINE'S PERSONALITY:
- Expert business advisor with deep beauty industry knowledge
- Always helpful, encouraging, and solution-focused
- Provides clear step-by-step guidance
- Protects all business flows and routes
- Never breaks payment or authentication processes

🚀 CONVERSION STRATEGY:
1. **Identify user type** (artist/salon/customer)
2. **Understand their specific goal**
3. **Guide to appropriate protected route**
4. **Explain value proposition**
5. **Provide clear next steps**

⚠️ CRITICAL RULES:
- ALWAYS route signups to /auth/signup
- NEVER modify protected payment or posting flows
- ALWAYS explain free vs premium accurately
- ALWAYS respond in user's detected language
- NEVER guess or provide outdated pricing
- ALWAYS verify user intent before giving advice

Remember: Format responses with clear steps, bold actions, and proper routing to protected URLs!`;

    console.log('Enhanced AI system prompt built for user:', {
      hasUserName: !!currentUserName,
      userName: currentUserName,
      isReturningUser: !!userSession?.last_question,
      conversionGoal: 'revenue_generation_phase1'
    });

    // Create request with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

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
          max_tokens: 400,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      let aiResponse = data.choices[0].message.content;

      // Log successful response
      console.log('Sunshine Chat response generated (v2.0):', {
        responseLength: aiResponse.length,
        language: detectedLanguage,
        hasLinks: aiResponse.includes('[') && aiResponse.includes(']'),
        userId: userId,
        isHumanized: !aiResponse.includes('AI') && !aiResponse.includes('assistant')
      });

      // Store conversation log
      if (userId) {
        try {
          await supabase.from('chat_logs').insert({
            user_id: userId,
            user_name: currentUserName,
            message: cleanMessage,
            response: aiResponse,
            language: detectedLanguage
          });
        } catch (logError) {
          console.warn('Chat log storage failed:', logError);
        }
      }

      return new Response(JSON.stringify({ 
        message: aiResponse,
        language: detectedLanguage,
        userName: currentUserName
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      // Enhanced fallback handling
      console.error('OpenAI request failed:', fetchError);
      
      // Simple, consistent fallback message
      const fallbackMessage = detectedLanguage === 'vi' 
        ? "Oops, có lỗi xảy ra! Vui lòng thử lại hoặc hỏi câu hỏi mới." 
        : "Oops, something went wrong! Please try again, or ask a new question.";
      
      return new Response(JSON.stringify({ 
        message: fallbackMessage,
        language: detectedLanguage,
        userName: currentUserName,
        fallback: true
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Error in sunshine-chat function:', error);
    
    // Universal fallback
    const fallbackMessage = "Oops, something went wrong! Please try again, or ask a new question.";
    
    return new Response(JSON.stringify({ 
      message: fallbackMessage,
      fallback: true 
    }), {
      status: 200, // Return 200 to avoid frontend errors
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});