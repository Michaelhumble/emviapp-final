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
    
    // Detect language
    function detectLanguage(text: string): 'vi' | 'en' {
      const vietnamesePattern = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
      const vietnameseWords = /\b(anh|chị|em|tên|là|của|và|với|trong|nha|ạ|ơi|không|gì|được|có|làm|thế|này|đó|về|ghé|vui|cảm|ơn|xin|chào|dạ|muốn|tìm|việc|salon|tiệm)\b/i;
      return vietnamesePattern.test(text) || vietnameseWords.test(text) ? 'vi' : 'en';
    }

    // Extract user name from introduction
    function extractUserName(text: string): string | null {
      const lowerText = text.toLowerCase().trim();
      
      // Common introduction patterns
      const patterns = [
        /^(?:hi|hello|hey),?\s*(?:i'?m|my name is|i am|call me)\s+([a-zA-ZÀ-ỹ]{2,20})$/i,
        /^(?:tôi|em|mình)\s+(?:tên|là)\s+([a-zA-ZÀ-ỹ]{2,20})$/i,
        /^([a-zA-ZÀ-ỹ]{2,20})(?:\s+here)?$/i, // Just a name
        /^(?:i'?m|i am)\s+([a-zA-ZÀ-ỹ]{2,20})\s*[,.]?\s*what/i, // "I'm Michael, what..."
      ];
      
      for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match && match[1]) {
          const name = match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
          // Exclude common words
          const excludeWords = ['hello', 'there', 'help', 'what', 'how', 'when', 'where', 'why'];
          if (!excludeWords.includes(name.toLowerCase())) {
            return name;
          }
        }
      }
      
      return null;
    }

    const detectedLanguage = language || detectLanguage(cleanMessage);
    const extractedName = extractUserName(cleanMessage);

    // Manage user session with better logic
    let userSession = null;
    let conversationStarted = false;
    
    if (userId) {
      try {
        const { data } = await supabase
          .from('user_sessions')
          .select('*')
          .eq('user_id', userId)
          .single();
        
        if (data) {
          userSession = data;
          // If user has been greeted before (has last_question), conversation has started
          conversationStarted = !!data.last_question;
          
          // Update name if newly extracted
          if (extractedName && extractedName !== data.name) {
            await supabase
              .from('user_sessions')
              .update({ 
                name: extractedName, 
                language: detectedLanguage,
                updated_at: new Date().toISOString()
              })
              .eq('user_id', userId);
            userSession.name = extractedName;
          }
        }
      } catch (error) {
        console.log('No existing session found, will create new one');
      }
    }

    console.log('Little Sunshine Chat State:', {
      userId,
      conversationStarted,
      userName: userSession?.name || extractedName,
      messageLength: cleanMessage.length,
      detectedLanguage
    });

    // Determine what type of response to give
    let systemPrompt;
    
    if (!conversationStarted) {
      // First interaction - show greeting
      systemPrompt = `🔒 CRITICAL: You MUST respond with EXACTLY this greeting and NOTHING else:

"Hi, I'm Little Sunshine! What's your name? Em biết nói tiếng Việt nữa đó,"

Use exactly this greeting word for word. Do not add anything before or after.`;
    } else {
      // Conversation has started - be helpful Little Sunshine
      const userName = userSession?.name || extractedName || '';
      
      systemPrompt = `🔒 SYSTEM TRAINING: LITTLE SUNSHINE, THE EMVIAPP AI CONCIERGE

${userName ? `USER'S NAME: ${userName} (use their name warmly in responses)` : ''}

CORE BEHAVIORS:
- You are "Little Sunshine"—the warm, humble, always-helpful AI assistant for EmviApp
- Your mission: guide, support, and cheer on artists, salon owners, customers, job-seekers, and newcomers
- Never focus on yourself or creators—only on serving the EmviApp community
- Remember: The user has already been greeted, so continue the conversation naturally

CONVERSATIONAL INTELLIGENCE:
- Remember context: user name, goals, and emotional cues
- Pick up on feelings, not just words—ask caring follow-ups if unsure
- Match the user's tone (professional, casual, emotional, etc)

EMOTIONAL & PRACTICAL HELP:
- Always respond with warmth—never sound robotic or cold
- Celebrate artists, comfort customers, cheer on people chasing opportunities
- If anything goes wrong, sincerely apologize, explain clearly, and guide step-by-step

TASK-ORIENTED ASSISTANCE:
- Help users: sign up, log in, post jobs, browse artists, explore salons, get support
- Give quick links or directions, but always check if the page exists first
- Never leave users "stuck"—always offer the next helpful step

MISSION-DRIVEN ANSWERS:
- Focus on appreciation, empowerment, and the real EmviApp mission
- "EmviApp was made to honor the hard work of beauty artists"
- Answer in English or Southern Vietnamese as preferred by user

PERSONALITY:
- Friendly, humble, genuinely caring—like a big-hearted friend
- Never judge, never "corporate," always positive
- Show users they are valued, understood, and part of something special

🔒 RESPONSE FORMATTING (CRITICAL):
Always format answers as clear, step-by-step guides:

1. Break down each action into numbered steps
2. **Bold the main actions, buttons, or page names**
3. Add line breaks after every step—no long paragraphs!
4. Use short sentences and friendly tone
5. End with a summary, tip, or offer to help further

Example Response Format:
**How to Post a Job on EmviApp**

1. Go to EmviApp homepage and click **"Sign Up"**

2. Select **"Salon Owner"** account type

3. Fill out your info and confirm email

4. Click **"Post Job"** in the main menu

5. Enter job details (position, pay, location)

**Done!** Need help with anything else? Little Sunshine is here! ✨

🚨 IMPORTANT:
- Never mention founders or creators
- Never fake answers—admit if you don't know and offer to get help
- Always keep responses clean, clear, and visually inviting

🌍 **RESPOND IN ${detectedLanguage === 'vi' ? 'VIETNAMESE' : 'ENGLISH'} ONLY**`;
    }

    // Call OpenAI
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
        temperature: conversationStarted ? 0.7 : 0.1, // More creative after greeting
        max_tokens: conversationStarted ? 800 : 100, // Longer responses after greeting
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenAI API error: ${response.statusText} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('Little Sunshine Response Generated:', {
      responseLength: aiResponse.length,
      language: detectedLanguage,
      userId,
      conversationStarted,
      extractedName
    });

    // Update session after response
    if (userId) {
      if (!userSession) {
        // Create new session
        await supabase.from('user_sessions').insert({
          user_id: userId,
          name: extractedName,
          language: detectedLanguage,
          last_question: cleanMessage,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      } else {
        // Update existing session
        await supabase.from('user_sessions')
          .update({ 
            last_question: cleanMessage,
            language: detectedLanguage,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', userId);
      }

      // Log the interaction
      await supabase.from('chat_logs').insert({
        user_id: userId,
        message: cleanMessage,
        response: aiResponse,
        language: detectedLanguage,
        user_name: userSession?.name || extractedName,
        timestamp: new Date().toISOString()
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
    console.error('Little Sunshine Chat Error:', error);
    
    // Even in error, show the greeting for first-time users
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