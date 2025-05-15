import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { vietnameseNailTemplates } from '@/constants/vietnameseNailTemplates';
import { useTranslation } from '@/hooks/useTranslation';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PolishedDescriptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: string) => void;
  jobType?: string;
}

const PolishedDescriptionsModal: React.FC<PolishedDescriptionsModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
  jobType,
}) => {
  const { isVietnamese } = useTranslation();
  const [activeTab, setActiveTab] = useState('ai-polish');
  const [showVietnameseTemplates, setShowVietnameseTemplates] = useState(false);

  useEffect(() => {
    // Show Vietnamese templates when both conditions are met:
    // 1. The app language is set to Vietnamese
    // 2. The selected job type is "Nail Technician" (or its Vietnamese equivalent)
    const isNailTechnician = jobType === 'Nail Technician' || jobType === 'Thợ Nail';
    setShowVietnameseTemplates(isVietnamese && isNailTechnician);
  }, [isVietnamese, jobType]);

  // English templates remain unchanged
  const templates = [
    {
      id: 'professional',
      title: 'Professional',
      content: 'We are seeking a skilled professional to join our team. The ideal candidate will have experience in our industry and a commitment to excellence. We offer competitive compensation and a positive work environment.'
    },
    {
      id: 'conversational',
      title: 'Conversational',
      content: 'Hey there! We're looking for someone great to join our awesome team! If you're passionate about what you do and want to work in a fun, supportive environment, we'd love to hear from you. Come grow with us!'
    },
    {
      id: 'detailed',
      title: 'Detailed',
      content: 'Our established salon is currently hiring for a position that requires at least 2 years of experience in the field. Responsibilities include serving clients, maintaining workspace cleanliness, and contributing to our positive atmosphere. Compensation includes base pay plus tips, with potential earnings of $800-1200 weekly depending on skills and clientele.'
    },
    {
      id: 'minimalist',
      title: 'Minimalist',
      content: 'Experienced professional needed. Competitive pay. Pleasant work environment. Immediate start available. Contact for details.'
    },
    {
      id: 'enthusiastic',
      title: 'Enthusiastic',
      content: 'Join our AMAZING team! We're GROWING FAST and need YOUR talents! Top pay for top talent, incredible work environment, and the BEST clients in town! Don't miss this OPPORTUNITY to advance your career! Apply TODAY!'
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {isVietnamese ? "Chọn Mẫu Mô Tả Công Việc" : "Choose a Description Template"}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="ai-polish">
              {isVietnamese ? "Gợi Ý AI" : "AI Polish"}
            </TabsTrigger>
            <TabsTrigger value="templates">
              {isVietnamese ? "Mẫu Có Sẵn" : "Templates"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai-polish" className="mt-0">
            <p className="text-sm text-muted-foreground mb-4">
              {isVietnamese 
                ? "Chọn một trong những mẫu này để làm nổi bật bài đăng của bạn."
                : "Select one of these AI-polished descriptions to enhance your job posting."}
            </p>

            {showVietnameseTemplates ? (
              <Tabs defaultValue="vn-templates" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="vn-templates">
                    Tiếng Việt
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="vn-templates">
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-3">
                      {vietnameseNailTemplates.map((template) => (
                        <div key={template.id} className="p-3 border rounded-md cursor-pointer hover:bg-accent transition-colors"
                          onClick={() => onSelectTemplate(template.content)}>
                          <h4 className="font-medium mb-1">{template.title}</h4>
                          <p className="text-sm text-muted-foreground">{template.content}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            ) : (
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {templates.map((template) => (
                    <div key={template.id} className="p-3 border rounded-md cursor-pointer hover:bg-accent transition-colors"
                      onClick={() => onSelectTemplate(template.content)}>
                      <h4 className="font-medium mb-1">{template.title}</h4>
                      <p className="text-sm text-muted-foreground">{template.content}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>
          
          <TabsContent value="templates" className="mt-0">
            <p className="text-sm text-muted-foreground mb-4">
              {isVietnamese 
                ? "Chọn từ các mẫu đơn giản để bắt đầu."
                : "Choose from simple templates to get started."}
            </p>
            
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-3">
                <div className="p-3 border rounded-md cursor-pointer hover:bg-accent"
                  onClick={() => onSelectTemplate(isVietnamese 
                    ? "Chúng tôi đang tìm kiếm nhân viên có kinh nghiệm để tham gia vào đội ngũ của chúng tôi. Lương thưởng hấp dẫn, môi trường làm việc thân thiện."
                    : "We are looking for experienced staff to join our team. Competitive salary, friendly work environment."
                  )}>
                  <h4 className="font-medium mb-1">{isVietnamese ? "Cơ bản" : "Basic"}</h4>
                  <p className="text-sm text-muted-foreground">
                    {isVietnamese 
                      ? "Chúng tôi đang tìm kiếm nhân viên có kinh nghiệm để tham gia vào đội ngũ của chúng tôi. Lương thưởng hấp dẫn, môi trường làm việc thân thiện."
                      : "We are looking for experienced staff to join our team. Competitive salary, friendly work environment."}
                  </p>
                </div>
                
                <div className="p-3 border rounded-md cursor-pointer hover:bg-accent"
                  onClick={() => onSelectTemplate(isVietnamese 
                    ? "Tuyển dụng vị trí [Vị Trí]. Yêu cầu: [Kỹ năng]. Lương: [Mức lương]. Liên hệ: [Thông tin liên hệ]."
                    : "Hiring for [Position]. Required: [Skills]. Pay: [Salary]. Contact: [Contact Info]."
                  )}>
                  <h4 className="font-medium mb-1">{isVietnamese ? "Ngắn gọn" : "Concise"}</h4>
                  <p className="text-sm text-muted-foreground">
                    {isVietnamese 
                      ? "Tuyển dụng vị trí [Vị Trí]. Yêu cầu: [Kỹ năng]. Lương: [Mức lương]. Liên hệ: [Thông tin liên hệ]."
                      : "Hiring for [Position]. Required: [Skills]. Pay: [Salary]. Contact: [Contact Info]."}
                  </p>
                </div>
                
                <div className="p-3 border rounded-md cursor-pointer hover:bg-accent"
                  onClick={() => onSelectTemplate(isVietnamese 
                    ? "Chúng tôi cần tuyển [Vị Trí] có kinh nghiệm tối thiểu [X năm]. Mức lương cạnh tranh, từ [Mức lương] tùy theo năng lực. Môi trường làm việc chuyên nghiệp, thân thiện. Thời gian làm việc: [Giờ làm việc]. Liên hệ ngay để biết thêm chi tiết!"
                    : "We are hiring for [Position] with minimum [X years] experience. Competitive salary, ranging from [Salary] depending on skills. Professional, friendly work environment. Working hours: [Working hours]. Contact us now for more details!"
                  )}>
                  <h4 className="font-medium mb-1">{isVietnamese ? "Chi tiết" : "Detailed"}</h4>
                  <p className="text-sm text-muted-foreground">
                    {isVietnamese 
                      ? "Chúng tôi cần tuyển [Vị Trí] có kinh nghiệm tối thiểu [X năm]. Mức lương cạnh tranh, từ [Mức lương] tùy theo năng lực. Môi trường làm việc chuyên nghiệp, thân thiện. Thời gian làm việc: [Giờ làm việc]. Liên hệ ngay để biết thêm chi tiết!"
                      : "We are hiring for [Position] with minimum [X years] experience. Competitive salary, ranging from [Salary] depending on skills. Professional, friendly work environment. Working hours: [Working hours]. Contact us now for more details!"}
                  </p>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={onClose}>
            {isVietnamese ? "Đóng" : "Close"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PolishedDescriptionsModal;
