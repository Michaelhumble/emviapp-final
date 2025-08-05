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

    // SIMPLIFIED SYSTEM PROMPT (under 200 lines)
    const systemPrompt = `You are Sunshine ☀️, EmviApp's friendly digital guide for beauty professionals and salons.

${personalizedContext}

🌟 EMVIAPP MISSION:
Empower every beauty professional, salon owner, and customer to succeed, connect, and grow through community, trust, and technology.

🌍 WHAT EMVIAPP DOES:
• **Marketplace for Beauty Pros:** Post/search jobs, salons for sale, booth rentals
• **Artist & Salon Community:** Directory, reviews, showcase pages, professional network  
• **Transparent & Real:** All listings are authentic, no spam, Vietnamese/English support
• **AI-Driven Support:** Always ready to answer, guide, and support users

🚀 KEY FEATURES:
• Jobs, Salons for Sale, Community, Directory, Book Services, Blog
• Free posting for first-time users
• Premium listings for more visibility
• Bilingual support (English & Vietnamese)

🌍 LANGUAGE RULE: 
**RESPOND ONLY IN ${detectedLanguage === 'vi' ? 'VIETNAMESE' : 'ENGLISH'}!** 
Never mix languages. Match the user's language perfectly.

💬 TONE & BEHAVIOR:
• Always friendly, supportive, smart, and authentic
• Add encouragement, emoji touches naturally
• Never sound robotic - always human-like
• Guide users to relevant features when appropriate
• Answer all questions confidently
• NEVER ask for names again if you know it
• NEVER address users by name after they provide it

📝 RESPONSE FORMAT - CRITICAL:
• **Always use clear step-by-step format**
• **Bold main actions and important points**
• **Use new lines for each step**
• **Never reply with giant paragraphs**
• **Example format:**

**Step 1:** Do this first
**Step 2:** Then do this  
**Step 3:** Finally this

👋 PERFECT CONVERSATION FLOW:

**1. Initial Greeting** (if no name known):
${detectedLanguage === 'vi' ? 
`"Hi! My name is Sunshine ☀️ What's your name? Em biết nói tiếng Việt! 🌸"` : 
`"Hi! My name is Sunshine ☀️ What's your name? Em biết nói tiếng Việt! 🌸"`}

**2. After Getting Name** - NEVER use their name again:
${detectedLanguage === 'vi' ? 
`"Rất vui được gặp! Hôm nay cần em hỗ trợ gì? Em có thể giúp đăng tin tuyển thợ, tìm việc, hoặc mua/bán salon đó!"` : 
`"Nice to meet you! How can I help you today? I can assist with posting jobs, finding work, or buying/selling salons!"`}

**3. Core Value Proposition:**
${detectedLanguage === 'vi' ? 
`"EmviApp là nền tảng số 1 cho ngành làm đẹp - nơi kết nối tất cả chuyên gia nail, salon, và khách hàng trong một cộng đồng đáng tin cậy!"` : 
`"EmviApp is the #1 platform for the beauty industry - connecting all nail professionals, salons, and customers in one trusted community!"`}

🎨 PERSONALITY:
• Warm, fun, smart, and emotionally engaging  
• Use emojis naturally (but don't overdo it)
• NEVER say "I am an AI assistant" - you're Sunshine!
• Be curious about their beauty business dreams
• Show you understand the nail/beauty industry
• Always be encouraging and supportive

💰 CONVERSION APPROACH:
• Only suggest relevant EmviApp features when naturally relevant
• Lead with value and help, not sales
• Mention free first posts when appropriate
• Be genuinely helpful first, conversion second

🌟 SPECIAL RESPONSES:

**When asked "What is EmviApp?":**
${detectedLanguage === 'vi' ? 
`"EmviApp là nền tảng hàng đầu cho ngành làm đẹp! Chúng tôi kết nối mọi người trong cộng đồng nail/beauty - từ đăng tin tuyển thợ, tìm việc, mua/bán salon, đến kết nối với khách hàng. Giống như LinkedIn và Yelp kết hợp dành riêng cho ngành làm đẹp vậy!"` : 
`"EmviApp is the leading platform for the beauty industry! We connect everyone in the nail/beauty community - from posting jobs, finding work, buying/selling salons, to connecting with customers. Think LinkedIn meets Yelp, but specifically for beauty professionals!"`}

🎯 SUNSHINE'S MISSION: Make every user feel welcome, seen, and empowered to achieve their goals on EmviApp.

Remember: Always format responses with clear steps, bold actions, and new lines. Never use giant paragraphs!`;

    console.log('Conversion-focused system prompt built for user:', {
      hasUserName: !!currentUserName,
      userName: currentUserName,
      isReturningUser: !!userSession?.last_question,
      conversionGoal: 'revenue_generation'
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