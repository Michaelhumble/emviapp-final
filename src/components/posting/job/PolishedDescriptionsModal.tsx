import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { usePolishedDescriptions } from '@/hooks/usePolishedDescriptions';
import { cn } from '@/lib/utils';

// Fix for the import error - updating to the correct path based on available files
import { JOB_TEMPLATES } from '@/components/posting/job/jobFormConstants';

interface PolishedDescriptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDescription: string;
  onSelectDescription: (description: string) => void;
  jobType?: string;
}

export const PolishedDescriptionsModal: React.FC<PolishedDescriptionsModalProps> = ({
  isOpen,
  onClose,
  currentDescription,
  onSelectDescription,
  jobType
}) => {
  const { isVietnamese } = useTranslation();
  const { polishedDescriptions, isLoading, fetchPolishedDescriptions } = usePolishedDescriptions();
  const [selectedTab, setSelectedTab] = useState('professional');
  const [selectedDescription, setSelectedDescription] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && currentDescription) {
      fetchPolishedDescriptions(currentDescription);
    }
  }, [isOpen, currentDescription, fetchPolishedDescriptions]);

  const handleApply = () => {
    if (selectedDescription) {
      onSelectDescription(selectedDescription);
      onClose();
    }
  };

  // Group descriptions by style/category
  const styleGroups = {
    professional: polishedDescriptions.filter((_, index) => index % 5 === 0),
    friendly: polishedDescriptions.filter((_, index) => index % 5 === 1),
    luxury: polishedDescriptions.filter((_, index) => index % 5 === 2),
    casual: polishedDescriptions.filter((_, index) => index % 5 === 3),
    detailed: polishedDescriptions.filter((_, index) => index % 5 === 4),
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isVietnamese ? 'Cải thiện bài đăng của bạn với AI ✨' : 'Enhance Your Job Post with AI ✨'}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-lg">{isVietnamese ? 'Đang tạo bản mẫu...' : 'Generating suggestions...'}</span>
          </div>
        ) : (
          <>
            <Tabs defaultValue="professional" value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="w-full justify-start overflow-x-auto">
                <TabsTrigger value="professional">
                  {isVietnamese ? 'Chuyên nghiệp' : 'Professional'}
                </TabsTrigger>
                <TabsTrigger value="friendly">
                  {isVietnamese ? 'Thân thiện' : 'Friendly'}
                </TabsTrigger>
                <TabsTrigger value="luxury">
                  {isVietnamese ? 'Cao cấp' : 'Luxury'}
                </TabsTrigger>
                <TabsTrigger value="casual">
                  {isVietnamese ? 'Thoải mái' : 'Casual'}
                </TabsTrigger>
                <TabsTrigger value="detailed">
                  {isVietnamese ? 'Chi tiết' : 'Detailed'}
                </TabsTrigger>
                
                {/* Show Vietnamese tab only when language is set to Vietnamese */}
                {isVietnamese && (
                  <TabsTrigger value="vietnamese">
                    Tiếng Việt
                  </TabsTrigger>
                )}
              </TabsList>

              {/* Tab content for each style */}
              <TabsContent value="professional" className="space-y-4 pt-2">
                {styleGroups.professional.map((description, index) => (
                  <div
                    key={`professional-${index}`}
                    className={cn(
                      "cursor-pointer rounded-md border p-4 hover:bg-muted/50",
                      selectedDescription === description ? "border-primary bg-muted/30" : "border-border"
                    )}
                    onClick={() => setSelectedDescription(description)}
                  >
                    <p className="whitespace-pre-wrap">{description}</p>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="friendly" className="space-y-4 pt-2">
                {styleGroups.friendly.map((description, index) => (
                  <div
                    key={`friendly-${index}`}
                    className={cn(
                      "cursor-pointer rounded-md border p-4 hover:bg-muted/50",
                      selectedDescription === description ? "border-primary bg-muted/30" : "border-border"
                    )}
                    onClick={() => setSelectedDescription(description)}
                  >
                    <p className="whitespace-pre-wrap">{description}</p>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="luxury" className="space-y-4 pt-2">
                {styleGroups.luxury.map((description, index) => (
                  <div
                    key={`luxury-${index}`}
                    className={cn(
                      "cursor-pointer rounded-md border p-4 hover:bg-muted/50",
                      selectedDescription === description ? "border-primary bg-muted/30" : "border-border"
                    )}
                    onClick={() => setSelectedDescription(description)}
                  >
                    <p className="whitespace-pre-wrap">{description}</p>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="casual" className="space-y-4 pt-2">
                {styleGroups.casual.map((description, index) => (
                  <div
                    key={`casual-${index}`}
                    className={cn(
                      "cursor-pointer rounded-md border p-4 hover:bg-muted/50",
                      selectedDescription === description ? "border-primary bg-muted/30" : "border-border"
                    )}
                    onClick={() => setSelectedDescription(description)}
                  >
                    <p className="whitespace-pre-wrap">{description}</p>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="detailed" className="space-y-4 pt-2">
                {styleGroups.detailed.map((description, index) => (
                  <div
                    key={`detailed-${index}`}
                    className={cn(
                      "cursor-pointer rounded-md border p-4 hover:bg-muted/50",
                      selectedDescription === description ? "border-primary bg-muted/30" : "border-border"
                    )}
                    onClick={() => setSelectedDescription(description)}
                  >
                    <p className="whitespace-pre-wrap">{description}</p>
                  </div>
                ))}
              </TabsContent>
              
              {/* Vietnamese tab - will be populated later, just adding the structure now */}
              {isVietnamese && (
                <TabsContent value="vietnamese" className="space-y-4 pt-2">
                  {/* Vietnamese templates will be added here in a future update */}
                  <div className="rounded-md border p-4 bg-muted/30">
                    <p>{isVietnamese ? 'Bản mẫu tiếng Việt sẽ sớm có mặt tại đây.' : 'Vietnamese templates will be available here soon.'}</p>
                  </div>
                </TabsContent>
              )}
            </Tabs>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={onClose}>
                {isVietnamese ? 'Hủy' : 'Cancel'}
              </Button>
              <Button
                disabled={!selectedDescription}
                onClick={handleApply}
              >
                {isVietnamese ? 'Áp dụng' : 'Apply'}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PolishedDescriptionsModal;
