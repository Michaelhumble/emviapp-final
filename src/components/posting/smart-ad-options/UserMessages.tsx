
import { CheckCircle } from "lucide-react";

interface UserMessagesProps {
  isFirstPost?: boolean;
  hasReferrals?: boolean;
  postType: 'job' | 'salon' | 'booth' | 'supply';
}

const UserMessages = ({ isFirstPost, hasReferrals, postType }: UserMessagesProps) => {
  return (
    <>
      {postType === 'job' && hasReferrals && !isFirstPost && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
            <p>Special pricing applied: $5 instead of $20 (Thanks for your referrals!)</p>
          </div>
        </div>
      )}
      
      {isFirstPost && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
            <p>First post advantage: Your local post is FREE with card on file!</p>
          </div>
        </div>
      )}
    </>
  );
};

export default UserMessages;
