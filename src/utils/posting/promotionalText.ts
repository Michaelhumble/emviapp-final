
import { PostType, UserPostingStats, PricingOptions } from './types';

// Base prices for different post types (in USD)
export const getBasePrice = (postType: PostType, isFirstPost: boolean): number => {
  switch (postType) {
    case 'job':
      return isFirstPost ? 5 : 10;
    case 'salon':
      return isFirstPost ? 0 : 10;
    case 'booth':
      return isFirstPost ? 0 : 8;
    case 'supply':
      return isFirstPost ? 0 : 5;
    default:
      return 5;
  }
};

// Nationwide visibility price (in USD)
export const getNationwidePrice = (postType: PostType): number => {
  switch (postType) {
    case 'job':
      return 5;
    case 'salon':
      return 8;
    case 'booth':
      return 5;
    case 'supply':
      return 3;
    default:
      return 5;
  }
};

// Fast sale package price (in USD)
export const getFastSalePackagePrice = (postType: PostType): number => {
  switch (postType) {
    case 'job':
      return 8;
    case 'salon':
      return 15;
    case 'booth':
      return 10;
    case 'supply':
      return 8;
    default:
      return 8;
  }
};

// Show at top price (in USD)
export const getShowAtTopPrice = (postType: PostType): number => {
  switch (postType) {
    case 'job':
      return 7;
    case 'salon':
      return 12;
    case 'booth':
      return 8;
    case 'supply':
      return 5;
    default:
      return 7;
  }
};

// Job post bundle price (in USD)
export const getJobPostBundlePrice = (postType: PostType): number => {
  switch (postType) {
    case 'salon':
      return 12;
    case 'booth':
      return 8;
    default:
      return 0;
  }
};

// Apply discount (e.g., for referrals)
export const getPriceWithDiscount = (originalPrice: number, hasReferrals: boolean): number => {
  if (!hasReferrals) return originalPrice;
  return Math.round(originalPrice * 0.8); // 20% discount
};

// Generate promotional text based on user stats and post type
export const generatePromotionalText = (
  postType: PostType,
  stats: UserPostingStats,
  options: PricingOptions
): string => {
  const totalPosts = stats.totalPostCount || 0;
  
  // First-time post message
  if (totalPosts === 0 || options.isFirstPost) {
    switch (postType) {
      case 'job':
        return '🎉 Thông báo công việc đầu tiên của bạn! Chúc bạn tìm được đồng đội tuyệt vời.';
      case 'salon':
        return '🎉 Bài đăng đầu tiên của bạn! Càng nhiều người thấy salon của bạn, cơ hội bán được càng cao.';
      case 'booth':
        return '🎉 Bài đăng booth đầu tiên! Hãy đảm bảo cung cấp đầy đủ thông tin để thu hút người thuê.';
      case 'supply':
        return '🎉 Bài đăng sản phẩm đầu tiên! Đăng thêm sản phẩm để tăng doanh thu.';
    }
  }
  
  // Personalized messages based on options selected
  if (options.isNationwide) {
    return '📊 Bài đăng toàn quốc sẽ xuất hiện cho người dùng ở mọi địa điểm. Cơ hội tiếp cận nhiều khách hàng hơn!';
  }
  
  if (options.fastSalePackage && postType === 'salon') {
    return '⚡ Gói bán nhanh giúp salon của bạn nổi bật và dễ tìm thấy hơn. Thường giúp rút ngắn thời gian bán đến 40%!';
  }
  
  if (options.showAtTop) {
    return '⭐ Bài đăng được hiển thị ưu tiên sẽ xuất hiện ở vị trí hàng đầu trong kết quả tìm kiếm.';
  }
  
  if (options.bundleWithJobPost && (postType === 'salon' || postType === 'booth')) {
    return '🔄 Kết hợp bài đăng tuyển dụng giúp bạn tìm kiếm nhân viên mới trong khi bán salon hoặc cho thuê booth.';
  }
  
  // Default messages
  switch (postType) {
    case 'job':
      return 'Tin tuyển dụng của bạn sẽ được hiển thị đến hàng nghìn nghệ sĩ nail đang tìm việc.';
    case 'salon':
      return 'Đăng tin salon bán/sang nhượng với nhiều hình ảnh sẽ tăng cơ hội bán nhanh hơn.';
    case 'booth':
      return 'Booth cho thuê có vị trí thuận lợi và giá cả rõ ràng thường được thuê nhanh hơn.';
    case 'supply':
      return 'Sản phẩm có mô tả chi tiết và giá cả hợp lý sẽ thu hút nhiều khách hàng hơn.';
    default:
      return 'Cảm ơn bạn đã sử dụng EmviApp để đăng tin!';
  }
};
