// Shared language detection utility
export const detectLanguage = (text: string): 'vi' | 'en' => {
  const vietnameseChars = /[ăâêôơưđàáảãạằắẳẵặầấẩẫậềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵ]/i;
  const vietnameseWords = /\b(anh|chị|em|tên|là|của|và|với|trong|nha|ạ|ơi|không|gì|được|có|làm|thế|này|đó|về|ghé|vui|cảm|ơn|xin|chào|dạ|muốn|tìm|việc|salon|tiệm)\b/i;
  
  return vietnameseChars.test(text) || vietnameseWords.test(text) ? 'vi' : 'en';
};

export const extractName = (text: string): string => {
  const patterns = [
    // Vietnamese patterns
    /(?:tên|name)(?:\s+(?:là|is))?\s+([a-zA-ZÀ-ỹ]+)/i,
    /(?:anh|chị|em|tôi|mình)(?:\s+tên)?\s+(?:là\s+)?([a-zA-ZÀ-ỹ]+)/i,
    // English patterns  
    /(?:i'?m|my\s+name\s+is|call\s+me)\s+([a-zA-Z]+)/i,
    // Simple single word names
    /^([a-zA-ZÀ-ỹ]{2,})$/i
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1] && match[1].length > 1) {
      const name = match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
      const excludeWords = ['anh', 'chị', 'em', 'tôi', 'mình', 'name', 'call', 'the', 'and', 'for', 'you', 'me'];
      if (!excludeWords.includes(name.toLowerCase())) {
        return name;
      }
    }
  }
  
  return '';
};