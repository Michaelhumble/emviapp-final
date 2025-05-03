
import { Badge } from "@/components/ui/badge";
import { LockIcon, Calendar } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import AuthAction from '@/components/common/AuthAction';
import { useAuth } from '@/context/auth';

interface JobExpirationInfoProps {
  isExpired: boolean;
  createdAt: string;
  contactInfo?: { 
    owner_name?: string; 
    phone?: string;
  };
}

export const JobExpirationInfo = ({ isExpired, createdAt, contactInfo }: JobExpirationInfoProps) => {
  const { isSignedIn } = useAuth();
  
  // Format the posted date for display
  const getPostedTimeText = () => {
    try {
      const date = new Date(createdAt);
      const distanceText = formatDistanceToNow(date, { addSuffix: false });
      
      // For expired posts (30+ days), explicitly set to 30 days
      if (isExpired) {
        return "Đã đăng 30 ngày trước • Đã hết hạn";
      }
      
      return `Đã đăng ${distanceText} trước`;
    } catch (error) {
      return "Recently posted";
    }
  };

  if (isExpired) {
    return (
      <div className="mt-2 mb-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Badge variant="destructive" className="flex items-center justify-center gap-1 w-fit">
            <LockIcon size={12} /> Đã hết hạn
          </Badge>
          <span className="text-xs text-gray-500">{getPostedTimeText()}</span>
        </div>
        <div className="p-3 bg-gray-50 border border-gray-100 rounded-md text-sm">
          <p className="text-gray-700">This opportunity has expired. Want to get new job leads like this? Sign up to post or find your next opportunity on EmviApp.</p>
        </div>
      </div>
    );
  }
  
  if (contactInfo?.owner_name && isSignedIn) {
    return (
      <div className="mb-4">
        <div className="text-xs text-gray-500 mb-2">
          <Calendar className="inline-block h-3 w-3 mr-1 align-text-bottom" />
          {getPostedTimeText()}
        </div>
        <div className="text-sm">
          <span className="font-medium">Contact: </span>
          {contactInfo.owner_name}
          {contactInfo?.phone && ` - ${contactInfo.phone}`}
        </div>
      </div>
    );
  }
  
  return (
    <div className="mb-4">
      <div className="text-xs text-gray-500 mb-2">
        <Calendar className="inline-block h-3 w-3 mr-1 align-text-bottom" />
        {getPostedTimeText()}
      </div>
      {!isSignedIn && (
        <AuthAction
          customTitle="Sign in to see contact details"
          onAction={() => true}
          fallbackContent={
            <div className="text-xs text-gray-500 italic flex items-center gap-1">
              <LockIcon size={12} />
              Sign in to see contact details
            </div>
          }
        />
      )}
    </div>
  );
};
