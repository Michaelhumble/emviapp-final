
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';

// Define the list of possible upgrade features
export type UpgradeFeature = 
  | 'analytics' 
  | 'artist-contact' 
  | 'salon-visibility' 
  | 'profile-promotion' 
  | 'job-post-premium' 
  | 'boost-visibility'
  | 'messaging';

interface SmartUpgradePromptProps {
  feature: UpgradeFeature;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SmartUpgradePrompt: React.FC<SmartUpgradePromptProps> = ({
  feature,
  open,
  onOpenChange
}) => {
  const navigate = useNavigate();
  const { t, isVietnamese } = useTranslation();

  // Feature-specific content mapping
  const featureContent = {
    'analytics': {
      title: isVietnamese ? 'Nâng cấp để truy cập phân tích' : 'Upgrade to Access Analytics',
      description: isVietnamese ? 'Mở khóa phân tích chi tiết để đo lường hiệu suất của bạn.' : 'Unlock detailed analytics to measure your performance.',
      action: '/pricing/professional'
    },
    'artist-contact': {
      title: isVietnamese ? 'Liên hệ với nghệ sĩ' : 'Contact Artists',
      description: isVietnamese ? 'Nâng cấp để liên hệ trực tiếp với nghệ sĩ.' : 'Upgrade to contact artists directly.',
      action: '/pricing'
    },
    'salon-visibility': {
      title: isVietnamese ? 'Tăng khả năng hiển thị của tiệm' : 'Boost Salon Visibility',
      description: isVietnamese ? 'Nâng cấp để tiệm của bạn được hiển thị nổi bật hơn.' : 'Upgrade to make your salon more visible to potential clients.',
      action: '/pricing'
    },
    'profile-promotion': {
      title: isVietnamese ? 'Quảng bá hồ sơ của bạn' : 'Promote Your Profile',
      description: isVietnamese ? 'Nâng cấp để quảng bá hồ sơ của bạn đến nhiều khách hàng hơn.' : 'Upgrade to promote your profile to more clients.',
      action: '/pricing'
    },
    'job-post-premium': {
      title: isVietnamese ? 'Đăng tin tuyển dụng cao cấp' : 'Premium Job Posting',
      description: isVietnamese ? 'Nâng cấp để đăng tin tuyển dụng cao cấp với nhiều tính năng hơn.' : 'Upgrade to post premium job listings with more features.',
      action: '/pricing'
    },
    'boost-visibility': {
      title: isVietnamese ? 'Tăng khả năng hiển thị' : 'Boost Visibility',
      description: isVietnamese ? 'Nâng cấp để tăng khả năng hiển thị trên nền tảng.' : 'Upgrade to boost your visibility across the platform.',
      action: '/pricing'
    },
    'messaging': {
      title: isVietnamese ? 'Tin nhắn không giới hạn' : 'Unlimited Messaging',
      description: isVietnamese ? 'Nâng cấp để gửi tin nhắn không giới hạn.' : 'Upgrade to send unlimited messages.',
      action: '/pricing'
    }
  };

  const content = featureContent[feature];

  const handleUpgrade = () => {
    onOpenChange(false);
    navigate(content.action);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{content.title}</DialogTitle>
          <DialogDescription>
            {content.description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <p className="text-sm text-muted-foreground">
              {isVietnamese 
                ? 'Nâng cấp tài khoản của bạn để mở khóa tính năng này và nhiều tính năng cao cấp khác.'
                : 'Upgrade your account to unlock this feature and many more premium features.'}
            </p>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            onClick={handleUpgrade}
          >
            {isVietnamese ? 'Xem tùy chọn nâng cấp' : 'View Upgrade Options'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            <X className="mr-2 h-4 w-4" />
            {isVietnamese ? 'Đóng' : 'Close'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SmartUpgradePrompt;
