
import { ReferralData } from './types';
import { Card } from '@/components/ui/card';
import { CheckCircle, Clock, AlertCircle, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from '@/hooks/useTranslation';

interface ReferralListProps {
  referrals: ReferralData[];
  loading: boolean;
}

const ReferralList = ({ referrals, loading }: ReferralListProps) => {
  const { t } = useTranslation();
  
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="p-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }
  
  if (referrals.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        <User className="h-10 w-10 text-gray-400 mx-auto mb-2" />
        <p>{t('referral.no_referrals')}</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      {referrals.map((referral) => (
        <Card key={referral.id} className="p-3">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${getStatusColor(referral.status)}`}>
              {getStatusIcon(referral.status)}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between">
                <div className="font-medium text-sm truncate">{referral.referredName}</div>
                <div className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(referral.createdAt), { addSuffix: true })}
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-1">
                <div className="text-xs text-gray-500 truncate max-w-[180px]">
                  {referral.referredEmail}
                </div>
                <div className={`text-xs px-2 py-0.5 rounded-full ${getStatusBadgeColor(referral.status)}`}>
                  {getStatusText(referral.status)}
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

// Helper functions
const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-5 w-5 text-white" />;
    case 'processing':
      return <Clock className="h-5 w-5 text-white" />;
    case 'suspicious':
      return <AlertCircle className="h-5 w-5 text-white" />;
    default:
      return <User className="h-5 w-5 text-white" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-500';
    case 'processing':
      return 'bg-amber-500';
    case 'suspicious':
      return 'bg-red-500';
    default:
      return 'bg-gray-400';
  }
};

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'processing':
      return 'bg-amber-100 text-amber-800';
    case 'suspicious':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Verified';
    case 'processing':
      return 'Processing';
    case 'suspicious':
      return 'Under Review';
    default:
      return 'Pending';
  }
};

export default ReferralList;
