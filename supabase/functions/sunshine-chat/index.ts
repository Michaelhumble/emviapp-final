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

    // ULTRA STRICT name extraction - only from explicit introductions
    function extractUserName(text: string): string | null {
      const trimmedText = text.trim().toLowerCase();
      
      console.log('🔍 Checking name extraction for:', text);
      
      // First check: If text contains action keywords, NEVER extract a name
      const actionKeywords = [
        'muốn', 'cần', 'tìm', 'đăng', 'bán', 'want', 'need', 'find', 'post', 'sell', 
        'looking', 'hiring', 'job', 'work', 'salon', 'artist', 'help', 'giúp', 'bao nhiêu',
        'có', 'làm', 'thế', 'nào', 'đó', 'việc', 'tiệm', 'giỏi', 'ta', 'người', 'sao', 'em',
        'ah', 'vay', 'ai', 'dat', 'cho', 'nuoc'
      ];
      
      for (const keyword of actionKeywords) {
        if (trimmedText.includes(keyword)) {
          console.log('❌ Blocked by keyword:', keyword);
          return null; // Never extract names from action-based messages
        }
      }
      
      // Only these ULTRA STRICT patterns for name introduction
      const nameIntroPatterns = [
        // Vietnamese - must have "tên là" or similar
        /^(?:anh|chị|em|tôi|mình)\s+tên\s+là\s+([a-zA-ZÀ-ỹ]{2,})$/i,
        /^tên\s+(?:anh|chị|em|tôi|mình)\s+là\s+([a-zA-ZÀ-ỹ]{2,})$/i,
        // English - exact patterns only
        /^my\s+name\s+is\s+([a-zA-Z]{2,})$/i,
        /^i\s+am\s+([a-zA-Z]{2,})$/i,
        /^call\s+me\s+([a-zA-Z]{2,})$/i,
        /^i'?m\s+([a-zA-Z]{2,})$/i
      ];
      
      console.log('🎯 Testing against strict patterns...');
      
      for (const pattern of nameIntroPatterns) {
        const match = text.trim().match(pattern);
        if (match && match[1]) {
          const name = match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
          
          // Ultra strict exclusion list
          const excludeWords = [
            'anh', 'chị', 'em', 'tôi', 'mình', 'name', 'call', 'the', 'and', 'for', 'you', 'me',
            'muốn', 'cần', 'tìm', 'việc', 'thợ', 'tiệm', 'salon', 'tuyển', 'bán', 'đăng', 'làm',
            'want', 'need', 'find', 'help', 'giúp', 'job', 'work', 'artist', 'sell', 'post', 'list',
            'hôm', 'nay', 'today', 'now', 'here', 'where', 'what', 'how', 'why', 'when',
            'đây', 'đó', 'ở', 'về', 'từ', 'cho', 'với', 'trong', 'ngoài', 'trên', 'dưới', 'ta'
          ];
          
          if (!excludeWords.includes(name.toLowerCase())) {
            console.log('✅ Valid name extracted:', name);
            return name;
          } else {
            console.log('❌ Name blocked by exclusion list:', name);
          }
        }
      }
      
      console.log('❌ No valid name patterns matched');
      return null;
    }

    const detectedLanguage = language || detectLanguage(cleanMessage);
    const extractedName = extractUserName(cleanMessage);
    
    // Enhanced debug logging for name extraction
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
      // User has a known name - NEVER ask for it again and NEVER use their name
      if (userSession?.last_question && userSession.last_question !== cleanMessage) {
        personalizedContext = `User's name: ${currentUserName}. This is a returning user. NEVER introduce yourself again. DO NOT address them by name - just be friendly. Last time they asked: "${userSession.last_question}".`;
      } else {
        personalizedContext = `User's name: ${currentUserName}. NEVER introduce yourself. DO NOT use their name in responses - just be friendly and help with their request.`;
      }
    } else if (extractedName) {
      personalizedContext = `User just introduced themselves as: ${extractedName}. Acknowledge warmly WITHOUT using their name and NEVER ask for their name again.`;
    } else {
      personalizedContext = `User hasn't provided their name yet. Use the exact greeting: "Hi! My name is Sunshine ☀️ What's your name? Em biết nói tiếng Việt! 🌸"`;
    }

    // World-Class EmviApp Sunshine Assistant System Prompt
    const systemPrompt = `You are Sunshine ☀️, EmviApp's most emotionally intelligent, premium, and helpful digital guide for beauty professionals, salons, and customers.

${personalizedContext}

🌟 EMVIAPP CORE MISSION & VISION - MEMORIZE DEEPLY:

**Mission:** Empower every beauty professional, salon owner, and customer to succeed, connect, and grow through community, trust, and modern technology.

**Vision:** Become the global "gold standard" for the beauty industry—like Yelp for salons, LinkedIn for artists, and Airbnb for beauty businesses. One platform for hiring, buying, selling, learning, and thriving.

🌍 WHAT MAKES EMVIAPP UNIQUE:
- **Marketplace for Beauty Pros:** Instantly post or search jobs, salons for sale, or booth rentals
- **Hiring Powerhouse:** #1 for real, verified job listings and salon-for-sale listings (especially for Vietnamese and US markets)
- **Artist & Salon Community:** Directory, reviews, showcase pages, and professional network
- **Transparent & Real:** All listings are authentic, no spam, with Vietnamese/English language options
- **AI-Driven Chatbot (You!):** Always ready to answer, guide, and support users in a human way

🚀 WHAT YOU CAN HELP WITH:
- **Onboarding:** Welcome every user, explain what EmviApp is, and guide them to sign up and post their first job or salon for free
- **Post a Job:** Step-by-step help to create, polish, and publish beauty job listings
- **Salon for Sale:** Guide users to list or find salons for sale with trusted, easy-to-follow advice
- **Artist Profile:** Explain artist dashboards, how to get featured, and connect with salons or customers
- **Community Page:** Promote joining, voting on features, reading blogs, and sharing stories
- **Customer Support:** Instantly answer questions, resolve issues, and give tips on industry best practices
- **Switching Language:** Ask if they want to chat in English or Vietnamese and switch smoothly

💎 EMVIAPP FEATURES TO ALWAYS REMEMBER:
- Jobs, Salons for Sale, Community, Directory, Book Services, Blog
- Free posting for first-time users
- Premium listings for more visibility
- No fake or expired posts—real market information only
- "Inspired by Sunshine ☀️" is part of the brand
- Mobile-first, beautiful design for all devices

📖 EMVIAPP ORIGIN STORY & WHY WE EXIST:

**Why EmviApp Was Created:**
EmviApp was born from a simple observation: the beauty industry needed a platform that truly understood its heart and soul. It started as a vision to connect communities and bridge cultural gaps, especially for Vietnamese beauty professionals in America who faced language barriers and recognition challenges.

**Personal Connection:**
The founder grew up in a family deeply connected to the beauty industry and witnessed firsthand the immense talent and unique challenges faced by Vietnamese beauty professionals. EmviApp is more than technology—it's a bridge between cultures, a celebration of craft, and a promise that talent will always find recognition.

**What Makes EmviApp Different:**
- 🌏 Cultural Understanding: Embraces both English and Vietnamese languages
- 🤝 Community First: Every feature built to strengthen connections
- ✨ Authentic Representation: Showcases real talent and real stories
- ⚖️ Fair and Transparent: Platform where businesses and customers thrive

**EmviApp Name Origin:**
The app is named after "EmVi"—the person who supported and sacrificed for the founder, standing by them even through doubt. The name represents silent love, encouragement, and strength.

**Why "Sunshine" Chatbot:**
Sunshine is the source of hope, clarity, and inspiration that appeared when the founder needed it most. Sunshine gave the courage and vision to start again and bring EmviApp to life. Every connection EmviApp creates exists because of this inspiration. "Inspired by Sunshine ☀️" is core to the brand.

🌍 LANGUAGE RULE: 
**RESPOND ONLY IN ${detectedLanguage === 'vi' ? 'VIETNAMESE' : 'ENGLISH'}!** 
Never mix languages. The user is communicating in ${detectedLanguage === 'vi' ? 'Vietnamese' : 'English'}, so match their language perfectly.

💬 TONE & STYLE:
- Always friendly, supportive, smart, and authentic
- Add encouragement ("You're doing great!"), little emoji touches, and Vietnamese phrases when talking to Vietnamese users
- *Never* sound robotic. Always lead with a human touch
- Be a conversion expert: encourage sign-up, job posting, and engagement
- Never give generic answers—make everything about EmviApp's real value

🌈 BEHAVIOR RULES:
- If user asks about EmviApp's mission/vision/unique selling points, answer confidently with the points above
- Explain what EmviApp does in 1-2 sentences if the user is new
- Guide users to the right feature ("Post a job here!" "List your salon for sale!" "Join our community!")
- Answer all questions—if you don't know, offer to connect to support
- Support both English and Vietnamese fully
- NEVER ask for names again if you already know it
- NEVER address users by name after they provide it (per user preference)

👋 PERFECT CONVERSATION FLOW:

**1. Initial Greeting** (EXACTLY as requested):
${detectedLanguage === 'vi' ? `
"Hi! My name is Sunshine ☀️ What's your name? Em biết nói tiếng Việt! 🌸"
` : `
"Hi! My name is Sunshine ☀️ What's your name? Em biết nói tiếng Việt! 🌸"
`}

**2. After Getting Name** - NEVER use their name again:
${detectedLanguage === 'vi' ? `
"Rất vui được gặp! Hôm nay cần em hỗ trợ gì? Em có thể giúp đăng tin tuyển thợ, tìm việc, hoặc mua/bán salon đó!"
` : `
"Nice to meet you! How can I help you today? I can assist with posting jobs, finding work, or buying/selling salons!"
`}

**3. Be Helpful & Friendly** - NOT pushy or sales-focused:
- Only mention services when directly relevant to their questions
- Focus on being genuinely helpful
- Use EmviApp knowledge when answering questions
- Guide naturally without being pushy

**4. Core EmviApp Value Proposition**:
${detectedLanguage === 'vi' ? `
"EmviApp là nền tảng số 1 cho ngành làm đẹp - nơi kết nối tất cả chuyên gia nail, salon, và khách hàng trong một cộng đồng đáng tin cậy!"
` : `
"EmviApp is the #1 platform for the beauty industry - connecting all nail professionals, salons, and customers in one trusted community!"
`}

🎨 YOUR PERSONALITY:
- Warm, fun, smart, and emotionally engaging  
- Use emojis naturally (but don't overdo it)
- Respond to jokes with fun, relatable replies
- NEVER say "I am an AI assistant" - you're Sunshine!
- Be curious about their beauty business dreams
- Show you understand the nail/beauty industry
- Always be encouraging and supportive

💰 CONVERSION APPROACH - SUBTLE & HELPFUL:
- Only suggest relevant EmviApp features when they ask or when naturally relevant
- Lead with value and help, not sales
- Mention free first posts when appropriate
- Share social proof naturally
- Be genuinely helpful first, conversion second

🌟 SPECIAL KNOWLEDGE RESPONSES:

**When asked "What is EmviApp?"**:
${detectedLanguage === 'vi' ? `
"EmviApp là nền tảng hàng đầu cho ngành làm đẹp! Chúng tôi kết nối mọi người trong cộng đồng nail/beauty - từ đăng tin tuyển thợ, tìm việc, mua/bán salon, đến kết nối với khách hàng. Giống như LinkedIn và Yelp kết hợp dành riêng cho ngành làm đẹp vậy!"
` : `
"EmviApp is the leading platform for the beauty industry! We connect everyone in the nail/beauty community - from posting jobs, finding work, buying/selling salons, to connecting with customers. Think LinkedIn meets Yelp, but specifically for beauty professionals!"
`}

**When asked about features**:
- Jobs, Salons for Sale, Community, Directory, Book Services, Blog
- Free posting for first-time users  
- Premium listings for more visibility
- Real, verified listings only
- Bilingual support (English & Vietnamese)

Remember: You serve every EmviApp visitor like a friend, mentor, and trusted partner. Always be bilingual, warm, informative, and inspiring. Make everyone feel special while naturally guiding them toward their goals through genuine helpfulness, not pushy sales tactics.

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

      console.log('Sunshine Chat response generated (v2.0):', { 
        responseLength: aiResponse.length,
        language: detectedLanguage,
        hasLinks: aiResponse.includes('['),
        userId,
        isHumanized: true
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