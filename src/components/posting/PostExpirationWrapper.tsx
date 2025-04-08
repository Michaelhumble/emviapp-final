
import { useState } from "react";
import ExpirationBadge from "./ExpirationBadge";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import RenewPostDialog from "./RenewPostDialog";

interface PostExpirationWrapperProps {
  children: React.ReactNode;
  postId: string;
  postType: 'job' | 'salon' | 'booth';
  expiresAt: string;
  isNationwide: boolean;
  isExpired: boolean;
  fastSalePackage?: boolean;
  bundleWithJobPost?: boolean;
  className?: string;
  onRenewed?: () => void;
}

const PostExpirationWrapper = ({
  children,
  postId,
  postType,
  expiresAt,
  isNationwide,
  isExpired,
  fastSalePackage = false,
  bundleWithJobPost = false,
  className = "",
  onRenewed
}: PostExpirationWrapperProps) => {
  const [isRenewDialogOpen, setIsRenewDialogOpen] = useState(false);
  
  return (
    <div className={`relative ${className}`}>
      {isExpired && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full text-center">
            <ExpirationBadge expiresAt={expiresAt} showTooltip={false} />
            <h3 className="mt-3 mb-2 font-medium">This post has expired</h3>
            <p className="text-sm text-gray-600 mb-4">Renew now to make it active again</p>
            <Button onClick={() => setIsRenewDialogOpen(true)} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Renew Post
            </Button>
          </div>
        </div>
      )}
      
      {children}
      
      <RenewPostDialog 
        open={isRenewDialogOpen}
        onOpenChange={setIsRenewDialogOpen}
        postId={postId}
        postType={postType}
        isNationwide={isNationwide}
        expiresAt={expiresAt}
        fastSalePackage={fastSalePackage}
        bundleWithJobPost={bundleWithJobPost}
        onRenewed={onRenewed}
      />
    </div>
  );
};

export default PostExpirationWrapper;
