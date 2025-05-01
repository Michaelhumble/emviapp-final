
import React from 'react';
import { Referral } from './types';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { toTranslatableText } from '@/components/dashboard/salon/SalonTranslationHelper';

interface ReferralListProps {
  referrals: Referral[];
}

const ReferralList = ({ referrals }: ReferralListProps) => {
  const { t } = useTranslation();
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'subscribed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'processing':
      case 'joined':
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'suspicious':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  if (!referrals || referrals.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        {t(toTranslatableText('No referrals yet'))}
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      {referrals.map((referral) => (
        <div key={referral.id} className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-0">
          <div>
            <div className="font-medium text-sm">{referral.referredName}</div>
            <div className="text-xs text-gray-500">{formatDate(referral.createdAt)}</div>
          </div>
          <div className="flex items-center">
            {getStatusIcon(referral.status)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReferralList;
