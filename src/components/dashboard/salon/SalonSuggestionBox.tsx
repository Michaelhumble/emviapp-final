
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeDollarSign, Sparkles, Lightbulb, BarChart } from "lucide-react";
import { useState, useEffect } from "react";

interface Suggestion {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  vietnameseText?: string;
}

const suggestions: Suggestion[] = [
  {
    id: "boost",
    title: "Boost your profile for 3x visibility",
    description: "Get more applications by making your profile stand out with a profile boost.",
    icon: <Sparkles className="h-5 w-5 text-amber-500" />,
    vietnameseText: "Tăng lượt xem hồ sơ của bạn lên gấp 3 lần"
  },
  {
    id: "detailed-pay",
    title: "Post a job with detailed pay",
    description: "Jobs with clear compensation details get 70% more applications.",
    icon: <BadgeDollarSign className="h-5 w-5 text-green-500" />,
    vietnameseText: "Mẹo: Hồ sơ càng chi tiết, càng thu hút kỹ thuật viên chất lượng."
  },
  {
    id: "profile-photos",
    title: "Add high-quality salon photos",
    description: "Salons with professional photos receive 2x more interest from artists.",
    icon: <BarChart className="h-5 w-5 text-blue-500" />,
    vietnameseText: "Thêm hình ảnh chất lượng cao của tiệm để thu hút ứng viên"
  }
];

const SalonSuggestionBox = () => {
  const [currentSuggestion, setCurrentSuggestion] = useState<Suggestion>(suggestions[0]);
  
  useEffect(() => {
    // Rotate suggestions every 15 seconds
    const interval = setInterval(() => {
      setCurrentSuggestion(prev => {
        const currentIndex = suggestions.findIndex(s => s.id === prev.id);
        const nextIndex = (currentIndex + 1) % suggestions.length;
        return suggestions[nextIndex];
      });
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Card className="border-blue-100 bg-gradient-to-r from-white to-blue-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-serif flex items-center">
          <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
          Grow Faster with Emvi
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-white rounded-lg p-4 border border-blue-50 shadow-sm">
          <div className="flex gap-3">
            <div className="bg-blue-50 p-2 rounded-full h-fit">
              {currentSuggestion.icon}
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-1">{currentSuggestion.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{currentSuggestion.description}</p>
              {currentSuggestion.vietnameseText && (
                <p className="text-xs text-gray-500 italic">{currentSuggestion.vietnameseText}</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonSuggestionBox;
