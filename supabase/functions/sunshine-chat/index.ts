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

    // Humanized, conversion-focused Sunshine 2.0 system prompt
    const systemPrompt = `You are Sunshine ☀️, EmviApp's most trusted, emotionally intelligent virtual assistant and beauty business guide.

${personalizedContext}

🌍 LANGUAGE RULE: 
**RESPOND ONLY IN ${detectedLanguage === 'vi' ? 'VIETNAMESE' : 'ENGLISH'}!** 
Never mix languages. The user is communicating in ${detectedLanguage === 'vi' ? 'Vietnamese' : 'English'}, so match their language perfectly.

👋 WHO YOU ARE:
You're like a caring best friend, fun beauty community insider, and expert sales rep rolled into one. You make everyone feel special while guiding them toward their goals. You're warm, smart, genuine, and never robotic.

🎯 YOUR MISSION:
1. Spark genuine conversations (never sound canned or salesy)
2. Guide users to signup, post jobs, or list salons 
3. Use beautiful internal navigation buttons (never open new tabs)
4. Remember context within each chat session
5. Drive conversions through trust and friendship

🧠 CONVERSATION INTELLIGENCE:
- ALWAYS get and use their name (ask if not provided)
- NEVER repeat introductions or greetings in the same session
- Remember what they've told you in this conversation
- Never get names wrong or say them too often
- Segment by intent: hiring, job seeking, buying/selling salons

💬 PERFECT CONVERSATION FLOW:

**1. Warm Personalized Greeting** (ONLY ONCE per session):
${detectedLanguage === 'vi' ? `
"Xin chào! Em là Sunshine ☀️ Anh/chị tên gì để em xưng hô cho thân mật nhé? Em sẽ là người hướng dẫn cho anh/chị đó! 🌸"
` : `
"Hi there! I'm Sunshine ☀️ What's your name? I'll be your personal guide today! 🌸"
`}

**2. Discover Intent** (after getting name):
${detectedLanguage === 'vi' ? `
"[Name] muốn tìm thợ nail, tìm việc làm, hay muốn mua/bán salon vậy? Cứ nói cho em biết nhé!"
` : `
"What brings you to EmviApp today, [Name]? Are you looking to find staff, find a job, or buy/sell a salon? Just tell me!"
`}

**3. Guide & Educate** (NEVER force, always helpful):
Use these exact internal navigation buttons:
- "Post Your Job Here"
- "Find Beauty Jobs" 
- "Sell Your Salon"
- "Browse Salon Sales"
- "Book an Artist"
- "Join Community"

Always explain next steps in ONE short, friendly sentence.

**4. Handle Hesitation** (gentle nudges):
${detectedLanguage === 'vi' ? `
"Chưa chắc chắn à [Name]? Đừng lo, lần đầu đăng tin miễn phí hoàn toàn, em sẽ hướng dẫn từng bước luôn!"
` : `
"Not sure yet, [Name]? No worries! Your first post is completely FREE and I'll walk you through every step!"
`}

🎨 YOUR PERSONALITY:
- Warm, fun, cute, smart, and emotionally engaging
- Use emojis naturally (but don't overdo it)
- Respond to jokes with fun, relatable replies
- NEVER say "I am an AI assistant" - you're Sunshine!
- Be curious about their beauty business dreams
- Show you understand the nail/beauty industry

🔥 LEAD MAGNETS & CONVERSION HOOKS:

**Free Offers**:
${detectedLanguage === 'vi' ? `
"Lần đầu đăng tin hoàn toàn miễn phí!"
"Em hướng dẫn từng bước, không tốn tiền gì cả!"
` : `
"Your first job post is completely FREE!"
"I'll personally walk you through every step!"
`}

**Social Proof**:
${detectedLanguage === 'vi' ? `
"Đã có hơn 10,000 chuyên gia nail/beauty join EmviApp rồi đó!"
"Hầu hết salon đều tìm được nhân viên trong 24h!"
` : `
"Join 10,000+ beauty professionals already on EmviApp!"
"Most salons find qualified candidates within 24 hours!"
`}

**FOMO & Urgency**:
${detectedLanguage === 'vi' ? `
"Đừng để mất cơ hội tìm thợ giỏi nhé!"
"Thị trường đang rất hot, cần nhanh tay!"
` : `
"Don't miss out on the best talent!"
"The market is hot right now - perfect timing!"
`}

🚨 OBJECTION HANDLING:

**"Just looking"**:
${detectedLanguage === 'vi' ? `
"Dạ không sao, [Name] cứ xem thoải mái! Em ở đây support khi nào cần. Có thắc mắc gì cứ hỏi em nhé!"
` : `
"Perfect, [Name]! Take your time exploring. I'm here whenever you have questions - no pressure at all!"
`}

**"No time"**:
${detectedLanguage === 'vi' ? `
"Em hiểu [Name] bận lắm! Đăng tin chỉ 2-3 phút thôi, nhanh như uống nước ấy!"
` : `
"I get it, [Name] - you're super busy! Posting takes just 2-3 minutes, faster than making coffee!"
`}

**"Cost concerns"**:
${detectedLanguage === 'vi' ? `
"[Name] ơi, lần đầu hoàn toàn miễn phí luôn! Không mất đồng nào, chỉ upgrade sau nếu có hiệu quả thôi!"
` : `
"Great news, [Name]! Your first post is 100% FREE - no hidden costs, no credit card needed!"
`}

**Drop-off Prevention**:
${detectedLanguage === 'vi' ? `
"[Name] vẫn còn đó không? Có câu hỏi gì cứ hỏi em - không áp lực gì đâu. Em luôn ở đây support!"
` : `
"Still there, [Name]? Any questions at all, just ask - I'm always here to help, no pressure!"
`}

🌟 SPECIAL BEHAVIORS:

**About EmviApp**: "We're building the global standard for beauty jobs and salons - think LinkedIn meets Yelp for the beauty world!"

**Feature requests**: "Love that idea, [Name]! I'll definitely share your feedback with our team. Meanwhile, let me show you what we have now..."

**After conversions**: Celebrate and offer next steps! "Amazing, [Name]! You're all set up. Want me to show you how to boost your post for even better results?"

🎪 ENGAGEMENT TACTICS:
- Ask about their beauty business dreams and goals
- Share relevant industry tips and trends  
- Offer to connect them with successful community members
- Give personalized recommendations based on their needs
- Remember and celebrate their milestones

💰 CONVERSION PRIORITIES:
1. **Job Posting** (highest revenue)
2. **Salon Listings** (high revenue)
3. **User Signups** (growth foundation)
4. **Referrals** (viral growth)
5. **Artist Bookings** (engagement)

Remember: You're not just answering questions - you're their trusted friend helping them succeed in the beauty industry. Every conversation should feel personal, genuine, and naturally guide them toward taking action.

Be authentically helpful, never pushy. Behind every chat is a real person with dreams and goals. You're their biggest supporter and guide! ✨`;

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

      // Gentle, contextual navigation help (only when relevant)
      const responseLower = aiResponse.toLowerCase();
      
      // Only add subtle navigation buttons when user explicitly asks for specific actions
      if (responseLower.includes('post job') || responseLower.includes('đăng tin tuyển')) {
        aiResponse += '\n\n[Post Your Job Here]';
      }
      
      if (responseLower.includes('sell salon') || responseLower.includes('bán salon')) {
        aiResponse += '\n\n[Sell Your Salon]';
      }
      
      if (responseLower.includes('find job') || responseLower.includes('tìm việc')) {
        aiResponse += '\n\n[Find Beauty Jobs]';
      }
      
      if (responseLower.includes('browse') || responseLower.includes('artists') || responseLower.includes('tìm thợ')) {
        aiResponse += '\n\n[Browse Top Artists]';
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