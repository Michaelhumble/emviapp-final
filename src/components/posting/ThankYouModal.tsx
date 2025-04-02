
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, TrendingUp, Share2 } from "lucide-react";

interface ThankYouModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postType: 'job' | 'salon' | 'booth';
  onBoostClick: () => void;
}

const ThankYouModal = ({ open, onOpenChange, postType, onBoostClick }: ThankYouModalProps) => {
  const getPostTypeText = () => {
    switch (postType) {
      case 'job':
        return {
          title: 'Đã Đăng Tin Tuyển Thợ!',
          subtitle: 'Your job post is now live',
          message: 'Bài đăng của bạn sẽ được xem bởi hàng trăm thợ trên toàn quốc. Chúng tôi sẽ duyệt và liên hệ nếu cần hỗ trợ quảng bá.',
        };
      case 'salon':
        return {
          title: 'Đã Đăng Tin Bán Tiệm!',
          subtitle: 'Your salon listing is now live',
          message: 'Cơ hội tuyệt vời để bán nhanh. Chúng tôi giúp quảng bá tiệm của bạn đến hàng ngàn người có nhu cầu mua lại.',
        };
      case 'booth':
        return {
          title: 'Đã Đăng Tin Cho Thuê!',
          subtitle: 'Your booth rental is now live',
          message: 'Bài đăng của bạn sẽ được xem bởi hàng trăm thợ trên toàn quốc. Chúng tôi sẽ duyệt và liên hệ nếu cần hỗ trợ quảng bá.',
        };
      default:
        return {
          title: 'Thank You!',
          subtitle: 'Your post is now live',
          message: 'Cảm ơn bạn đã đăng tin! Chúng tôi sẽ duyệt và liên hệ nếu cần hỗ trợ quảng bá.',
        };
    }
  };
  
  const postTypeText = getPostTypeText();
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <div className="flex flex-col items-center justify-center">
          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">{postTypeText.title}</DialogTitle>
            <DialogDescription className="text-center font-medium">
              {postTypeText.subtitle}
            </DialogDescription>
          </DialogHeader>
        </div>
        
        <div className="py-4">
          <p className="text-center text-gray-700 mb-6">
            {postTypeText.message}
          </p>
          
          <div className="grid gap-4">
            <Button onClick={onBoostClick} className="w-full flex items-center justify-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Boost Your Post
            </Button>
            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
              <Share2 className="h-4 w-4" />
              Share With Friends
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ThankYouModal;
