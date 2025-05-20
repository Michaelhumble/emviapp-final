
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useTranslation } from '@/hooks/useTranslation';
import { Badge } from '@/components/ui/badge';

interface AIPolishButtonProps {
  text: string;
  onPolish: (polishedText: string) => void;
  context: string;
}

const jobDescriptionTemplates = [
  {
    name: "Professional",
    english: "We are seeking a skilled professional to join our team. This role requires excellent technical skills and a passion for customer service. The ideal candidate will have experience in the beauty industry and thrive in a fast-paced environment.",
    vietnamese: "Chúng tôi đang tìm kiếm một chuyên gia có kỹ năng để tham gia vào đội ngũ của chúng tôi. Vai trò này đòi hỏi kỹ năng kỹ thuật xuất sắc và đam mê dịch vụ khách hàng. Ứng viên lý tưởng sẽ có kinh nghiệm trong ngành làm đẹp và phát triển mạnh trong môi trường làm việc nhanh."
  },
  {
    name: "Friendly",
    english: "Join our salon family! We're looking for friendly, passionate individuals who love making clients feel beautiful. In our supportive environment, you'll have opportunities to grow your skills and build lasting client relationships.",
    vietnamese: "Tham gia gia đình salon của chúng tôi! Chúng tôi đang tìm kiếm những cá nhân thân thiện, đam mê, những người thích làm cho khách hàng cảm thấy đẹp. Trong môi trường hỗ trợ của chúng tôi, bạn sẽ có cơ hội phát triển kỹ năng và xây dựng mối quan hệ khách hàng lâu dài."
  },
  {
    name: "Detailed",
    english: "We are currently seeking experienced professionals to join our team. Responsibilities include performing services to client specifications, maintaining a clean work area, and contributing to a positive atmosphere. Must have technical expertise, excellent customer service skills, and the ability to work flexible hours.",
    vietnamese: "Chúng tôi hiện đang tìm kiếm các chuyên gia có kinh nghiệm để tham gia vào đội ngũ của chúng tôi. Trách nhiệm bao gồm thực hiện các dịch vụ theo thông số kỹ thuật của khách hàng, duy trì khu vực làm việc sạch sẽ và góp phần tạo nên bầu không khí tích cực. Phải có chuyên môn kỹ thuật, kỹ năng dịch vụ khách hàng xuất sắc và khả năng làm việc linh hoạt."
  },
  {
    name: "Upscale",
    english: "Our luxury salon seeks an exceptional artist to provide premium services to our discerning clientele. The ideal candidate demonstrates impeccable technique, sophisticated style, and the ability to deliver personalized experiences that exceed expectations. Join our prestigious team and advance your career in an elegant setting.",
    vietnamese: "Salon sang trọng của chúng tôi tìm kiếm một nghệ sĩ xuất sắc để cung cấp dịch vụ cao cấp cho khách hàng tinh tế của chúng tôi. Ứng viên lý tưởng thể hiện kỹ thuật hoàn hảo, phong cách tinh tế và khả năng mang đến những trải nghiệm cá nhân hóa vượt quá mong đợi. Tham gia vào đội ngũ uy tín của chúng tôi và thăng tiến sự nghiệp của bạn trong một môi trường thanh lịch."
  },
];

const AIPolishButton: React.FC<AIPolishButtonProps> = ({ text, onPolish, context }) => {
  const { t, isVietnamese } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [polishedText, setPolishedText] = useState(text);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [activeTab, setActiveTab] = useState<'templates' | 'custom'>('templates');
  
  const handleApplyTemplate = (template: string) => {
    setPolishedText(template);
  };
  
  const handleApplyPolished = () => {
    onPolish(polishedText);
    setIsDialogOpen(false);
  };

  const handleOpenDialog = () => {
    setPolishedText(text || '');
    setIsDialogOpen(true);
  };
  
  const simulateAIPolish = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing with a timeout
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For this implementation, we're just returning a slightly enhanced version of the text
    // In a real implementation, this would call an AI service
    let enhanced = text;
    
    if (text.length > 0) {
      enhanced = text + "\n\n" + (isVietnamese 
        ? "* Chỉnh sửa bởi AI: Chúng tôi cung cấp môi trường làm việc thân thiện và cơ hội phát triển nghề nghiệp."
        : "* AI Polished: We provide a friendly working environment and opportunities for career growth.");
    } else {
      enhanced = isVietnamese
        ? "Chúng tôi đang tìm kiếm ứng viên có kỹ năng và đam mê. Môi trường làm việc của chúng tôi thân thiện, chuyên nghiệp và hỗ trợ sự phát triển cá nhân."
        : "We are looking for candidates with skill and passion. Our work environment is friendly, professional, and supportive of personal growth.";
    }
    
    setPolishedText(enhanced);
    setIsGenerating(false);
  };
  
  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="flex items-center text-purple-600 border-purple-200 hover:bg-purple-50"
        onClick={handleOpenDialog}
      >
        <Sparkles className="mr-1 h-3.5 w-3.5" />
        Polish with AI
      </Button>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-purple-500" />
              Polish {context} with AI
            </DialogTitle>
            <DialogDescription>
              Enhance your job description with AI or choose from our templates.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="templates" value={activeTab} onValueChange={(value) => setActiveTab(value as 'templates' | 'custom')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="custom">Custom</TabsTrigger>
            </TabsList>
            
            <TabsContent value="templates" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto p-1">
                {jobDescriptionTemplates.map((template, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                      selectedTemplate === (isVietnamese ? template.vietnamese : template.english)
                        ? 'border-purple-500 ring-2 ring-purple-200'
                        : 'border-gray-200'
                    }`}
                    onClick={() => {
                      const content = isVietnamese ? template.vietnamese : template.english;
                      setSelectedTemplate(content);
                      handleApplyTemplate(content);
                    }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-sm">{template.name}</h3>
                      <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700">
                        Template
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {isVietnamese ? template.vietnamese : template.english}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="custom" className="space-y-4 mt-4">
              <div className="space-y-4">
                <Textarea
                  value={polishedText}
                  onChange={(e) => setPolishedText(e.target.value)}
                  placeholder={isVietnamese ? "Nhập văn bản của bạn ở đây để cải thiện..." : "Enter your text here to enhance..."}
                  className="min-h-[200px]"
                />
                
                <Button
                  type="button"
                  onClick={simulateAIPolish}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {isVietnamese ? "Đang tạo..." : "Generating..."}
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      {isVietnamese ? "Cải thiện với AI" : "Enhance with AI"}
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApplyPolished}>
              Apply Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AIPolishButton;
