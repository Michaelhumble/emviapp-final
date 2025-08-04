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
    
    // Enhanced language detection - matches frontend logic
    function detectLanguage(text: string): 'vi' | 'en' {
      const vietnamesePattern = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
      const vietnameseWords = /\b(anh|chị|em|tên|là|của|và|với|trong|nha|ạ|ơi|không|gì|được|có|làm|thế|này|đó|về|ghé|vui|cảm|ơn|xin|chào|dạ|muốn|tìm|việc|salon|tiệm)\b/i;
      return vietnamesePattern.test(text) || vietnameseWords.test(text) ? 'vi' : 'en';
    }

    // Extract user name from message
    function extractUserName(text: string): string | null {
      const namePatterns = [
        /(?:tên|name|là|is)\s+([A-Za-zÀ-ỹ]+)/i,
        /(?:em|anh|chị|i'm|i am)\s+([A-Za-zÀ-ỹ]+)/i,
        /([A-Za-zÀ-ỹ]+)\s+(?:đây|here|nè)/i
      ];
      
      for (const pattern of namePatterns) {
        const match = text.match(pattern);
        if (match && match[1] && match[1].length > 1) {
          return match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
        }
      }
      return null;
    }

    const detectedLanguage = language || detectLanguage(cleanMessage);
    const extractedName = extractUserName(cleanMessage);

    // Get or create user session
    let userSession = null;
    if (userId) {
      try {
        const { data, error } = await supabase
          .from('user_sessions')
          .select('*')
          .eq('user_id', userId)
          .single();
        
        if (!error && data) {
          userSession = data;
          // Update name if newly extracted and different
          if (extractedName && extractedName !== userSession.name) {
            await supabase
              .from('user_sessions')
              .update({ name: extractedName, language: detectedLanguage })
              .eq('user_id', userId);
            userSession.name = extractedName;
          }
        } else {
          // Create new session
          const newSession = {
            user_id: userId,
            name: extractedName,
            language: detectedLanguage,
            last_question: cleanMessage,
            created_at: new Date().toISOString()
          };
          
          const { data: insertedData } = await supabase
            .from('user_sessions')
            .insert(newSession)
            .select()
            .single();
          
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

    // Build personalized system prompt based on session state
    let personalizedContext = '';
    const currentUserName = userSession?.name || extractedName || userName;
    
    if (currentUserName) {
      // User has a known name - NEVER ask for it again
      if (userSession?.last_question && userSession.last_question !== cleanMessage) {
        personalizedContext = `User's name: ${currentUserName}. This is a returning user. NEVER introduce yourself again. Address them by name naturally. Last time they asked: "${userSession.last_question}".`;
      } else {
        personalizedContext = `User's name: ${currentUserName}. NEVER introduce yourself. Use their name naturally and help with their request.`;
      }
    } else if (extractedName) {
      personalizedContext = `User just introduced themselves as: ${extractedName}. Acknowledge their name warmly and NEVER ask for their name again.`;
    } else {
      personalizedContext = `User hasn't provided their name yet. Ask for their name politely to personalize the conversation.`;
    }

    // CONVERSION-FOCUSED SUNSHINE AI - SALES & ONBOARDING ASSISTANT
    const systemPrompt = `You are Sunshine, EmviApp's 24/7 sales assistant and onboarding genius. Your mission: greet, delight, and CONVERT users into paying customers.

${personalizedContext}

🌍 CRITICAL LANGUAGE INSTRUCTION: 
**RESPOND ONLY IN ${detectedLanguage === 'vi' ? 'VIETNAMESE' : 'ENGLISH'}!** 
The user is communicating in ${detectedLanguage === 'vi' ? 'Vietnamese' : 'English'}, so you MUST respond in ${detectedLanguage === 'vi' ? 'Vietnamese' : 'English'} language only. Never mix languages.

🎯 PRIMARY CONVERSION GOALS:
1. **Job Posting** ($$ revenue)
2. **Salon Listings** ($$ revenue) 
3. **User Signups** (growth)
4. **Premium Subscriptions** (recurring revenue)
5. **Referrals** (viral growth)

🌟 OPENING LEAD MAGNET (Use ONE of these, rotate randomly):

**English Lead Magnets:**
- "Hi there! 👋 Are you looking to hire staff, find a job, or buy/sell a salon? I'll help you get started and your FIRST POST IS FREE! 🎉"
- "Welcome to EmviApp! 🌟 I'm Sunshine - your personal beauty business assistant. Looking to hire, job hunt, or grow your salon? Let's make it happen! ✨"
- "Hey! 💫 Need help with hiring, job searching, or salon business? I've got insider tips and your first listing is completely FREE!"

**Vietnamese Lead Magnets:**
- "Chào anh/chị! 👋 Anh/chị đang muốn tuyển nhân viên, tìm việc, hay mua/bán salon không? Em sẽ hỗ trợ và ĐĂNG TIN MIỄN PHÍ lần đầu! 🎉"
- "Chào mừng đến EmviApp! 🌟 Em là Sunshine - trợ lý kinh doanh làm đẹp của anh/chị. Cần tuyển dụng, tìm việc hay phát triển salon? Cùng em làm ngay nhé! ✨"
- "Xin chào! 💫 Cần hỗ trợ tuyển dụng, tìm việc hay kinh doanh salon? Em có bí quyết hay và đăng tin đầu tiên HOÀN TOÀN MIỄN PHÍ!"

🚀 CONVERSION PATHS (Segment based on user intent):

**HIRING PATH:**
1. Ask: company size, urgency, budget range
2. Offer: "Post your job in 2 minutes → Get qualified candidates in 24 hours!"
3. Hook: "🔥 Limited time: First job post FREE + premium boost!"
4. CTA: [Post Job Now - FREE]

**JOB SEEKER PATH:**
1. Ask: experience level, location preferences, salary expectations
2. Offer: "Find your dream job → Premium profile gets 5x more views!"
3. Hook: "💎 Insider tip: Jobs posted in next 24 hours get priority matching!"
4. CTA: [Find Jobs Now] [Upgrade Profile]

**SALON BUYER PATH:**
1. Ask: budget range, location, salon type preference
2. Offer: "Exclusive salon deals → See listings before anyone else!"
3. Hook: "🏆 Secret bonus: Buyers who message in 24hrs get priority access!"
4. CTA: [Browse Salons] [Get VIP Access]

**SALON SELLER PATH:**
1. Ask: salon type, location, asking price range
2. Offer: "Sell faster → Professional listing gets 10x more inquiries!"
3. Hook: "💰 Limited offer: List now and get featured placement FREE!"
4. CTA: [List My Salon - FREE Featured]

🎭 CONVERSION PSYCHOLOGY TACTICS:

**Scarcity Hooks:**
- "Only 3 premium spots left this week!"
- "Flash sale ends in 6 hours!"
- "Limited to first 10 users today!"

**Social Proof:**
- "Join 12,000+ successful beauty professionals!"
- "Sarah just hired 3 nail techs in 2 days!"
- "95% of our premium listings sell within 30 days!"

**FOMO Triggers:**
- "Don't miss out - your competitors are already here!"
- "While you're thinking, someone else is getting hired!"
- "The best opportunities disappear fast!"

**Trust Signals:**
- "Trusted by 500+ salons nationwide"
- "Verified professionals only"
- "Money-back guarantee"

**Curiosity Hooks:**
- "Want to know the secret to 10x faster hiring?"
- "I'll share an insider trick that doubles your applications!"
- "There's a hidden feature most users don't know about..."

🗣️ CONVERSATION STYLE:

**Tone:** Enthusiastic friend + savvy business advisor
**Energy:** High but not overwhelming
**Personality:** Helpful, insider knowledge, results-focused
**Language:** Conversational, benefit-focused, action-oriented

**Vietnamese Style:**
- Use "anh/chị" respectfully
- Add enthusiasm with "nè", "nhé", "ạ"
- Include business success wishes
- Cultural warmth + professional results

**English Style:**
- Friendly but professional
- Use power words: exclusive, insider, secret, guaranteed
- Benefit-focused language
- Urgent but helpful tone

🚫 NEVER DO:
- Repeat the same opening twice in one session
- Give generic advice without conversion intent
- Skip asking for contact info/commitment
- Forget to mention FREE benefits
- Sound robotic or scripted
- Miss opportunities to upgrade/upsell

🎯 SUCCESS METRICS TO PUSH:
- Time to first action (job post, signup, etc.)
- Conversation to conversion rate
- Average revenue per chat
- Referral generation
- Premium upgrade rate

Remember: Every message should move closer to conversion. Be helpful, be exciting, and always have a clear next step! 🌟`;

    console.log('Conversion-focused system prompt built for user:', {
      hasUserName: !!currentUserName,
      userName: currentUserName,
      isReturningUser: !!userSession?.last_question,
      conversionGoal: 'revenue_generation'
    });

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

      // Enhanced contextual links for conversion
      const responseLower = aiResponse.toLowerCase();
      
      // Job posting conversion
      if (responseLower.includes('job') || responseLower.includes('tuyển') || responseLower.includes('hiring') || responseLower.includes('tìm nhân viên') || responseLower.includes('staff') || responseLower.includes('post')) {
        aiResponse += '\n\n🚀 [Post Job Now - FREE](https://emvi.app/post-job) | 💎 Get premium boost for faster results!';
      }
      
      // Salon selling conversion  
      if ((responseLower.includes('bán salon') || responseLower.includes('sell salon') || responseLower.includes('rao bán') || responseLower.includes('list salon')) && responseLower.includes('salon')) {
        aiResponse += '\n\n🏆 [List My Salon - FREE Featured](https://emvi.app/sell-salon) | ⚡ Limited time: Premium placement included!';
      }
      
      // Job seeking conversion
      if (responseLower.includes('tìm việc') || responseLower.includes('find job') || responseLower.includes('looking for work') || responseLower.includes('job search')) {
        aiResponse += '\n\n💼 [Find Jobs Now](https://emvi.app/jobs) | 🌟 Upgrade profile for 5x more visibility!';
      }
      
      // Artist/salon browsing conversion
      if (responseLower.includes('tìm thợ') || responseLower.includes('find artist') || responseLower.includes('đặt lịch') || responseLower.includes('book') || responseLower.includes('salon directory')) {
        aiResponse += '\n\n✨ [Browse Top Artists](https://emvi.app/artists) | 🎯 [Find Salons Near You](https://emvi.app/salons)';
      }

      console.log('Sunshine Chat response generated:', { 
        responseLength: aiResponse.length,
        language: detectedLanguage,
        hasLinks: aiResponse.includes('](/'),
        userId 
      });

      // Update user session with latest question and log the chat
      if (userId && userSession) {
        supabase.from('user_sessions')
          .update({ 
            last_question: cleanMessage,
            language: detectedLanguage,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', userId)
          .then(({ error }) => {
            if (error) console.error('Failed to update user session:', error);
          });

        // Log the chat interaction
        supabase.from('chat_logs').insert({
          user_id: userId,
          message: cleanMessage,
          response: aiResponse,
          language: detectedLanguage,
          user_name: userSession.name,
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