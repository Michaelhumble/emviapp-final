
import { format, formatDistance } from 'date-fns';
import { useTranslation } from '@/hooks/useTranslation';

export const useReviewFormatter = () => {
  const { isVietnamese } = useTranslation();

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
        return isVietnamese ? 'Xuất sắc' : 'Excellent';
      case 4:
        return isVietnamese ? 'Rất tốt' : 'Very Good';
      case 3:
        return isVietnamese ? 'Tốt' : 'Good';
      case 2:
        return isVietnamese ? 'Trung bình' : 'Fair';
      case 1:
        return isVietnamese ? 'Kém' : 'Poor';
      default:
        return '';
    }
  };

  const getReviewsLabel = (count: number) => {
    if (isVietnamese) {
      return count === 1 ? '1 Đánh giá' : `${count} Đánh giá`;
    }
    return count === 1 ? '1 Review' : `${count} Reviews`;
  };

  const getVerifiedClientLabel = () => {
    return isVietnamese ? 'Khách hàng đã xác minh' : 'Verified Client';
  };

  const getNoReviewsLabel = () => {
    return isVietnamese ? 'Chưa có đánh giá nào' : 'No reviews yet';
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
