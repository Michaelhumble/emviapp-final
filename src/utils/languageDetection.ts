// Shared language detection utility
export const detectLanguage = (text: string): 'vi' | 'en' => {
  const vietnameseChars = /[ăâêôơưđàáảãạằắẳẵặầấẩẫậềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵ]/i;
  const vietnameseWords = /\b(anh|chị|em|tên|là|của|và|với|trong|nha|ạ|ơi|không|gì|được|có|làm|thế|này|đó|về|ghé|vui|cảm|ơn|xin|chào|dạ|muốn|tìm|việc|salon|tiệm)\b/i;
  
  return vietnameseChars.test(text) || vietnameseWords.test(text) ? 'vi' : 'en';
};

export const extractName = (text: string): string => {
  // ULTRA STRICT: Only extract names from explicit name introduction patterns
  // NEVER extract from action-based text like "anh muốn tìm việc"
  
  const trimmedText = text.trim().toLowerCase();
  
  // First check: If text contains action keywords, NEVER extract a name
  const actionKeywords = [
    'muốn', 'cần', 'tìm', 'đăng', 'bán', 'want', 'need', 'find', 'post', 'sell', 
    'looking', 'hiring', 'job', 'work', 'salon', 'artist', 'help', 'giúp'
  ];
  
  for (const keyword of actionKeywords) {
    if (trimmedText.includes(keyword)) {
      return ''; // Never extract names from action-based messages
    }
  }
  
  // Only these EXACT patterns for name introduction
  const nameIntroPatterns = [
    // Vietnamese name introductions - EXACT patterns only
    /^(?:anh|chị|em|tôi|mình)\s+tên\s+(?:là\s+)?([a-zA-ZÀ-ỹ]+)$/i,
    /^tên\s+(?:anh|chị|em|tôi|mình)\s+(?:là\s+)?([a-zA-ZÀ-ỹ]+)$/i,
    // English name introductions - EXACT patterns only
    /^(?:i\s+am|my\s+name\s+is)\s+([a-zA-Z]+)$/i,
    /^(?:they\s+)?call\s+me\s+([a-zA-Z]+)$/i,
    /^(?:i'?m)\s+([a-zA-Z]+)$/i
  ];
  
  for (const pattern of nameIntroPatterns) {
    const match = text.trim().match(pattern);
    if (match && match[1] && match[1].length > 1) {
      const name = match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
      
      // Double-check exclusion list
      const excludeWords = [
        'anh', 'chị', 'em', 'tôi', 'mình', 'name', 'call', 'the', 'and', 'for', 'you', 'me',
        'muốn', 'cần', 'tìm', 'việc', 'thợ', 'tiệm', 'salon', 'tuyển', 'bán', 'đăng', 'làm',
        'want', 'need', 'find', 'help', 'giúp', 'job', 'work', 'artist', 'sell', 'post', 'list',
        'hôm', 'nay', 'today', 'now', 'here', 'where', 'what', 'how', 'why', 'when',
        'đây', 'đó', 'ở', 'về', 'từ', 'cho', 'với', 'trong', 'ngoài', 'trên', 'dưới'
      ];
      
      if (!excludeWords.includes(name.toLowerCase())) {
        return name;
      }
    }
  }
  
  return '';
};