
import { Badge } from "@/components/ui/badge";
import { LockIcon } from "lucide-react";

interface JobExpirationInfoProps {
  isExpired: boolean;
  contactInfo?: { 
    owner_name?: string; 
    phone?: string;
  };
}

export const JobExpirationInfo = ({ isExpired, contactInfo }: JobExpirationInfoProps) => {
  if (isExpired) {
    return (
      <div className="mt-2 mb-4 flex flex-col gap-2">
        <Badge variant="destructive" className="flex items-center justify-center gap-1 w-fit">
          <LockIcon size={12} /> Đã hết hạn
        </Badge>
        <p className="text-xs text-gray-500">Thông tin liên hệ bị ẩn cho đến khi được gia hạn</p>
      </div>
    );
  }
  
  if (contactInfo?.owner_name) {
    return (
      <div className="mb-4 text-sm">
        <span className="font-medium">Contact: </span>
        {contactInfo.owner_name}
        {contactInfo?.phone && ` - ${contactInfo.phone}`}
      </div>
    );
  }
  
  return null;
};
