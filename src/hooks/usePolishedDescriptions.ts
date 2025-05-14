import { useState } from 'react';
import { useTranslation } from './useTranslation';

interface PolishedDescriptionsHook {
  polishedDescriptions: string[];
  isLoading: boolean;
  fetchPolishedDescriptions: (text: string) => Promise<void>;
}

// Sample polish styles for different tone options
const POLISH_STYLES = [
  "professional and concise",
  "friendly and welcoming",
  "luxury and high-end",
  "casual and approachable",
  "detailed and informative"
];

const VIETNAMESE_SUGGESTIONS = {
  "professional and concise": [
    "Ứng viên cần có tay nghề vững vàng trong việc làm móng tay, móng chân, đắp bột, gel. Làm việc toàn thời gian với mức lương cạnh tranh và tiền tip tốt.",
    "Chúng tôi tìm kiếm thợ chuyên nghiệp có kinh nghiệm và kỹ năng cao. Môi trường làm việc chuyên nghiệp, lương thưởng hấp dẫn và cơ hội phát triển."
  ],
  "friendly and welcoming": [
    "Chúng tôi đang tìm một người dễ thương, thân thiện để gia nhập tiệm! Có tay nghề là điểm cộng. Môi trường làm việc thoải mái, vui vẻ, nhiều khách quen.",
    "Gia đình tiệm chúng tôi đang tìm thêm thành viên mới! Nếu bạn thích không khí vui vẻ và muốn làm việc trong môi trường như gia đình, hãy liên hệ ngay nhé."
  ],
  "luxury and high-end": [
    "Làm việc tại tiệm cao cấp, chuyên phục vụ khách VIP. Yêu cầu tay nghề cao, thái độ chuyên nghiệp, lương và tip cao.",
    "Salon cao cấp của chúng tôi đang tìm kiếm những người thợ xuất sắc để phục vụ khách hàng tinh tế. Chúng tôi sử dụng sản phẩm hạng sang và cung cấp môi trường làm việc đẳng cấp."
  ],
  "casual and approachable": [
    "Tiệm bận rộn, cần người có tay nghề cơ bản là được. Làm full-time, có khách đều.",
    "Chúng tôi cần thêm thợ để phục vụ lượng khách đông đảo. Không cần quá nhiều kinh nghiệm, chỉ cần bạn chăm chỉ và có tinh thần học hỏi."
  ],
  "detailed and informative": [
    "Cần thợ có kinh nghiệm trong làm móng tay, móng chân, đắp bột, sơn gel. Có huấn luyện thêm nếu cần. Môi trường ổn định, lương hàng tuần, thưởng thêm nếu làm tốt.",
    "Yêu cầu cụ thể: ít nhất 2 năm kinh nghiệm, thông thạo các kỹ thuật làm móng hiện đại. Làm việc từ 9h-19h, nghỉ thứ Hai. Lương từ $XX-$XX/ngày tùy theo năng lực, trả hàng tuần, có tip."
  ]
};

export const usePolishedDescriptions = (): PolishedDescriptionsHook => {
  const [polishedDescriptions, setPolishedDescriptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isVietnamese } = useTranslation();

  // This function would typically call an AI API, but for demo we'll generate variations locally
  const fetchPolishedDescriptions = async (text: string): Promise<void> => {
    if (!text || text.trim().length === 0) {
      setPolishedDescriptions([]);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real implementation, this would be an API call to a language model
      // For now, we'll simulate the API with local variations
      
      // Generate variations for each style
      const variations: string[] = [];
      
      // If Vietnamese language is selected, use predefined Vietnamese suggestions
      if (isVietnamese) {
        for (const style of POLISH_STYLES) {
          if (VIETNAMESE_SUGGESTIONS[style]) {
            variations.push(...VIETNAMESE_SUGGESTIONS[style]);
          } else {
            variations.push(
              `${text}\n\n(Phiên bản nâng cao - ${style})`,
              `${text}\n\n(Phiên bản chỉnh sửa - ${style})`
            );
          }
        }
      } else {
        // English version - keep the original implementation
        for (const style of POLISH_STYLES) {
          // Generate two variations per style
          const variation1 = generatePolishedVersion(text, style, 1);
          const variation2 = generatePolishedVersion(text, style, 2);
          
          variations.push(variation1, variation2);
        }
      }
      
      // In production, you would call an actual API here
      // const response = await fetch('/api/polish', { method: 'POST', body: JSON.stringify({ text }) });
      // const data = await response.json();
      // setPolishedDescriptions(data.variations);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      setPolishedDescriptions(variations);
    } catch (error) {
      console.error('Error polishing text:', error);
      // Fallback to original description with minor enhancement
      setPolishedDescriptions([
        `${text}\n\n${isVietnamese ? 'Mô tả này đã được nâng cao để thu hút ứng viên.' : 'This job post was enhanced to highlight key benefits and requirements.'}`,
        text
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    polishedDescriptions,
    isLoading,
    fetchPolishedDescriptions,
  };
};

// Helper function to generate variations
function generatePolishedVersion(text: string, style: string, variant: number): string {
  // In production this would be replaced with an API call to a language model
  
  // Simple rule-based enhancement for demo
  const enhancements: Record<string, string[]> = {
    "professional and concise": [
      `${text}\n\nWe are a professional establishment seeking qualified candidates. Our salon maintains the highest standards of service and cleanliness.`,
      `${text}\n\nJoin our team of professionals in a fast-paced, growth-oriented environment. We're seeking reliable, skilled individuals who take pride in their work.`
    ],
    "friendly and welcoming": [
      `${text}\n\nWe're a friendly team looking for passionate individuals! Our salon feels like family, and we support each other through busy days and quieter moments alike.`,
      `${text}\n\nCome join our welcoming salon family where everyone supports each other! We celebrate birthdays, share meals, and grow together as professionals.`
    ],
    "luxury and high-end": [
      `${text}\n\nJoin our premium salon catering to discerning clientele seeking excellence. We use only the finest products and maintain an elegant, upscale atmosphere.`,
      `${text}\n\nWe provide luxury services to high-end clients and seek exceptional talent. Our salon features designer interiors, premium equipment, and an exclusive ambiance.`
    ],
    "casual and approachable": [
      `${text}\n\nOur laid-back team is looking for cool, talented people to join us. We keep the workplace drama-free and focus on doing great work for happy clients.`,
      `${text}\n\nWe keep things simple and drama-free. Come work with our awesome team! Flexible scheduling, positive vibes, and a supportive environment await you.`
    ],
    "detailed and informative": [
      `${text}\n\nPosition details: Full training provided. Opportunities for advancement based on performance metrics. Benefits include paid vacation after probation period and healthcare options for full-time employees.`,
      `${text}\n\nComprehensive benefits include: On-site training, product discounts, and career advancement opportunities. Weekly team meetings keep everyone informed and engaged, while skill-building workshops help you grow professionally.`
    ]
  };
  
  // Ensure the style exists in our enhancements object, and return a valid variation
  if (enhancements[style] && enhancements[style].length >= variant) {
    return enhancements[style][variant - 1];
  }
  
  // Fallback if style or variant doesn't exist
  return `${text}\n\n(Enhanced version)`;
}
