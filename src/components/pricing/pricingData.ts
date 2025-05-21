
import { type DurationOption } from '@/types/pricing';

export type PlanFeature = {
  id: string;
  feature: string;
  vietnameseFeature?: string;
  starter: boolean;
  pro: boolean;
  ultimate: boolean;
  highlight?: boolean;
};

export type PricingPlan = {
  id: string;
  name: string;
  vietnameseName?: string;
  description: string;
  vietnameseDescription?: string;
  originalPrice: number;
  price: number;
  features: string[];
  vietnameseFeatures?: string[];
  badge?: string;
  highlight?: boolean;
  buttonText: string;
  vietnameseButtonText?: string;
  color?: string;
};

export const durationOptions: DurationOption[] = [
  { months: 1, label: 'Monthly', vietnameseLabel: 'Hàng tháng', discount: 0 },
  { months: 3, label: 'Quarterly', vietnameseLabel: 'Hàng quý', discount: 25 },
  { months: 12, label: 'Yearly', vietnameseLabel: 'Hàng năm', discount: 40 }
];

export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    vietnameseName: 'Khởi đầu',
    description: 'Perfect for beginners and small businesses.',
    vietnameseDescription: 'Hoàn hảo cho người mới bắt đầu và doanh nghiệp nhỏ.',
    originalPrice: 19.99,
    price: 9.99,
    badge: '50% OFF',
    features: [
      'Up to 5 job posts',
      'Basic profile listings',
      'Standard customer support',
      'Local search visibility',
      'Email notifications'
    ],
    vietnameseFeatures: [
      'Tối đa 5 bài đăng việc làm',
      'Danh sách hồ sơ cơ bản',
      'Hỗ trợ khách hàng tiêu chuẩn',
      'Hiển thị tìm kiếm địa phương',
      'Thông báo qua email'
    ],
    buttonText: 'Start Free Trial',
    vietnameseButtonText: 'Bắt đầu dùng thử miễn phí'
  },
  {
    id: 'pro',
    name: 'Pro',
    vietnameseName: 'Chuyên nghiệp',
    description: 'For growing salons and professionals.',
    vietnameseDescription: 'Dành cho tiệm nail và chuyên gia đang phát triển.',
    originalPrice: 29.99,
    price: 14.99,
    badge: '50% OFF',
    highlight: true,
    features: [
      'Unlimited job posts',
      'Featured profile listings',
      'Priority customer support',
      'Regional search visibility',
      'SMS & email notifications',
      'Advanced analytics',
      'Team management tools'
    ],
    vietnameseFeatures: [
      'Đăng việc không giới hạn',
      'Danh sách hồ sơ nổi bật',
      'Hỗ trợ khách hàng ưu tiên',
      'Hiển thị tìm kiếm khu vực',
      'Thông báo qua SMS & email',
      'Phân tích nâng cao',
      'Công cụ quản lý nhóm'
    ],
    buttonText: 'Start Free Trial',
    vietnameseButtonText: 'Bắt đầu dùng thử miễn phí',
    color: 'bg-gradient-to-br from-emvi-accent to-purple-400'
  },
  {
    id: 'ultimate',
    name: 'Ultimate',
    vietnameseName: 'Tối thượng',
    description: 'Complete solution for large enterprises.',
    vietnameseDescription: 'Giải pháp toàn diện cho doanh nghiệp lớn.',
    originalPrice: 49.99,
    price: 24.99,
    badge: '50% OFF',
    features: [
      'Everything in Pro plan',
      'Nationwide search visibility',
      'Premium profile placement',
      'White-label mobile app',
      'Dedicated account manager',
      'API access',
      'Custom integrations',
      'Marketing consultation'
    ],
    vietnameseFeatures: [
      'Tất cả trong gói Chuyên nghiệp',
      'Hiển thị tìm kiếm toàn quốc',
      'Vị trí hồ sơ cao cấp',
      'Ứng dụng di động white-label',
      'Quản lý tài khoản chuyên dụng',
      'Truy cập API',
      'Tích hợp tùy chỉnh',
      'Tư vấn tiếp thị'
    ],
    buttonText: 'Start Free Trial',
    vietnameseButtonText: 'Bắt đầu dùng thử miễn phí'
  }
];

export const comparisonFeatures: PlanFeature[] = [
  {
    id: 'job-posts',
    feature: 'Job listings',
    vietnameseFeature: 'Danh sách công việc',
    starter: true,
    pro: true,
    ultimate: true
  },
  {
    id: 'profile-visibility',
    feature: 'Enhanced profile visibility',
    vietnameseFeature: 'Tăng khả năng hiển thị hồ sơ',
    starter: true,
    pro: true,
    ultimate: true
  },
  {
    id: 'customer-support',
    feature: 'Customer support',
    vietnameseFeature: 'Hỗ trợ khách hàng',
    starter: true,
    pro: true,
    ultimate: true
  },
  {
    id: 'booking-management',
    feature: 'Booking management',
    vietnameseFeature: 'Quản lý đặt lịch',
    starter: true,
    pro: true,
    ultimate: true
  },
  {
    id: 'featured-listings',
    feature: 'Featured listings',
    vietnameseFeature: 'Danh sách nổi bật',
    starter: false,
    pro: true,
    ultimate: true,
    highlight: true
  },
  {
    id: 'analytics',
    feature: 'Advanced analytics',
    vietnameseFeature: 'Phân tích nâng cao',
    starter: false,
    pro: true,
    ultimate: true
  },
  {
    id: 'team-management',
    feature: 'Team management',
    vietnameseFeature: 'Quản lý nhóm',
    starter: false,
    pro: true,
    ultimate: true
  },
  {
    id: 'api-access',
    feature: 'API access',
    vietnameseFeature: 'Truy cập API',
    starter: false,
    pro: false,
    ultimate: true,
    highlight: true
  },
  {
    id: 'white-label',
    feature: 'White-label options',
    vietnameseFeature: 'Tùy chọn white-label',
    starter: false,
    pro: false,
    ultimate: true
  },
  {
    id: 'dedicated-manager',
    feature: 'Dedicated account manager',
    vietnameseFeature: 'Quản lý tài khoản chuyên dụng',
    starter: false,
    pro: false,
    ultimate: true
  }
];
