
import { format, formatDistance } from 'date-fns';
import { useTranslation } from '@/hooks/useTranslation';

export const useReviewFormatter = () => {
  const { t } = useTranslation();

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return format(date, 'MMMM d, yyyy');
    } catch (error) {
      return dateStr;
    }
  };

  const formatTimeAgo = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return formatDistance(date, new Date(), { addSuffix: true });
    } catch (error) {
      return '';
    }
  };

  const getRatingLabel = (rating: number) => {
    switch (rating) {
      case 5:
        return t({
          english: 'Excellent',
          vietnamese: 'Xuất sắc'
        });
      case 4:
        return t({
          english: 'Very Good',
          vietnamese: 'Rất tốt'
        });
      case 3:
        return t({
          english: 'Good',
          vietnamese: 'Tốt'
        });
      case 2:
        return t({
          english: 'Fair',
          vietnamese: 'Trung bình'
        });
      case 1:
        return t({
          english: 'Poor',
          vietnamese: 'Kém'
        });
      default:
        return '';
    }
  };

  const getReviewsLabel = (count: number) => {
    return t({
      english: count === 1 ? '1 Review' : `${count} Reviews`,
      vietnamese: count === 1 ? '1 Đánh giá' : `${count} Đánh giá`
    });
  };

  const getVerifiedClientLabel = () => {
    return t({
      english: 'Verified Client',
      vietnamese: 'Khách hàng đã xác minh'
    });
  };

  const getNoReviewsLabel = () => {
    return t({
      english: 'No reviews yet',
      vietnamese: 'Chưa có đánh giá nào'
    });
  };

  return {
    formatDate,
    formatTimeAgo,
    getRatingLabel,
    getReviewsLabel,
    getVerifiedClientLabel,
    getNoReviewsLabel
  };
};
