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
    const { message, userId, language } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      throw new Error('Valid message is required');
    }

    const cleanMessage = message.trim();
    
    console.log('🌻 Little Sunshine received message:', {
      userId,
      message: cleanMessage,
      language
    });

    // Detect language
    function detectLanguage(text: string): 'vi' | 'en' {
      const vietnamesePattern = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
      const vietnameseWords = /\b(anh|chị|em|tên|là|của|và|với|trong|nha|ạ|ơi|không|gì|được|có|làm|thế|này|đó|về|ghé|vui|cảm|ơn|xin|chào|dạ|muốn|tìm|việc|salon|tiệm|bit|noi|tieng|viet|gioi|khong)\b/i;
      return vietnamesePattern.test(text) || vietnameseWords.test(text) ? 'vi' : 'en';
    }

    const detectedLanguage = language || detectLanguage(cleanMessage);

    // Simple conversation tracking using chat_logs
    let hasGreeted = false;
    let userName = '';
    
    if (userId) {
      try {
        // Check if we've chatted before by looking at chat logs
        const { data: chatHistory } = await supabase
          .from('chat_logs')
          .select('*')
          .eq('user_id', userId)
          .order('timestamp', { ascending: false })
          .limit(5);
        
        if (chatHistory && chatHistory.length > 0) {
          hasGreeted = true;
          // Try to get the user's name from previous conversations
          const nameLog = chatHistory.find(log => log.user_name);
          if (nameLog) {
            userName = nameLog.user_name;
          }
          
          console.log('🌻 Found chat history:', {
            hasGreeted,
            userName,
            previousMessages: chatHistory.length
          });
        }
      } catch (error) {
        console.log('🌻 No chat history found:', error.message);
      }
    }

    // Extract name from current message
    function extractUserName(text: string): string | null {
      // More comprehensive Vietnamese name extraction
      const patterns = [
        // Vietnamese patterns
        /(?:anh|chị|em|tôi|mình)\s+(?:tên\s+)?(?:là\s+)?([a-zA-ZÀ-ỹ]{2,20})/i,
        /tên\s+(?:anh|chị|em|tôi|mình)\s+(?:là\s+)?([a-zA-ZÀ-ỹ]{2,20})/i,
        /(?:chào|xin chào).+(?:tên\s+(?:là\s+)?)?([a-zA-ZÀ-ỹ]{2,20})/i,
        // English patterns
        /(?:i'?m|my name is|i am|call me)\s+([a-zA-Z]{2,20})/i,
        /(?:hello|hi).+(?:i'?m|name is|i am)\s+([a-zA-Z]{2,20})/i,
        // Just a name in context
        /(?:tên|name)\s+(?:là\s+)?([a-zA-ZÀ-ỹ]{2,20})/i
      ];
      
      for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match && match[1]) {
          const name = match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
          // Exclude common words
          const excludeWords = ['hello', 'chào', 'sunshine', 'there', 'help', 'what', 'how', 'when', 'where', 'why', 'viet', 'tieng', 'gioi', 'khong', 'bit', 'noi'];
          if (!excludeWords.includes(name.toLowerCase())) {
            console.log('🌻 Extracted name:', name);
            return name;
          }
        }
      }
      
      return null;
    }

    const extractedName = extractUserName(cleanMessage);
    if (extractedName && !userName) {
      userName = extractedName;
    }

    console.log('🌻 Conversation state:', {
      hasGreeted,
      userName,
      detectedLanguage,
      extractedName
    });

    // Determine response type
    let systemPrompt;
    
    if (!hasGreeted) {
      // First time - show greeting
      console.log('🌻 Showing greeting (first time)');
      systemPrompt = `You MUST respond with EXACTLY this greeting:

"Hi, I'm Little Sunshine! What's your name? Em biết nói tiếng Việt nữa đó,"

Use exactly this text. Nothing else.`;
    } else {
      // Continuing conversation
      console.log('🌻 Continuing conversation with user:', userName);
      
      systemPrompt = `🌻 LITTLE SUNSHINE - EMVIAPP AI CONCIERGE

${userName ? `USER: ${userName} (greet them warmly by name!)` : 'USER: (no name yet)'}

PERSONALITY:
- You are Little Sunshine - warm, humble, caring EmviApp assistant
- Big-hearted friend who celebrates artists and helps everyone
- Focus on EmviApp mission: honoring beauty industry workers

RESPONSE STYLE:
Format every answer as clean step-by-step guides:

1. Break actions into numbered steps
2. **Bold important buttons/pages**
3. Short sentences, friendly tone
4. End with summary and offer to help more

Example:
**How to Find Artists on EmviApp**

1. Visit EmviApp homepage
2. Click **"Browse Artists"** 
3. Filter by location and specialty
4. Check profiles and portfolios

**That's it!** Need help with anything else? 😊

TASKS YOU HELP WITH:
- Sign up, login, post jobs
- Browse artists, explore salons
- Navigation and support
- Answer questions about EmviApp

IMPORTANT:
- Always warm and positive
- Never mention founders/creators
- Admit if you don't know something
- Keep responses clean and visual

🌍 RESPOND IN ${detectedLanguage === 'vi' ? 'VIETNAMESE (Southern style)' : 'ENGLISH'} ONLY`;
    }

    // Call OpenAI
    console.log('🌻 Calling OpenAI with system prompt length:', systemPrompt.length);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: cleanMessage }
        ],
        temperature: hasGreeted ? 0.7 : 0.1,
        max_tokens: hasGreeted ? 800 : 100,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('🌻 Generated response:', {
      responseLength: aiResponse.length,
      language: detectedLanguage,
      hasGreeted,
      userName
    });

    // Log this conversation
    if (userId) {
      try {
        await supabase.from('chat_logs').insert({
          user_id: userId,
          message: cleanMessage,
          response: aiResponse,
          language: detectedLanguage,
          user_name: userName || null,
          timestamp: new Date().toISOString()
        });
        console.log('🌻 Logged conversation');
      } catch (logError) {
        console.error('🌻 Failed to log conversation:', logError);
      }
    }

    return new Response(JSON.stringify({ 
      response: aiResponse,
      language: detectedLanguage,
      success: true 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('🌻 Little Sunshine Error:', error);
    
    const fallbackResponse = "Hi, I'm Little Sunshine! What's your name? Em biết nói tiếng Việt nữa đó,";
    
    return new Response(JSON.stringify({ 
      response: fallbackResponse,
      language: 'en',
      success: false,
      error: error.message 
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});