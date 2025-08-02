export interface FunnelTranslations {
  exitIntent: {
    title: string;
    subtitle: string;
    emailPlaceholder: string;
    ctaButton: string;
    disclaimer: string;
  };
  smartBanner: {
    title: string;
    subtitle: string;
    ctaButton: string;
    limitedOffer: string;
  };
  returnVisitor: {
    title: string;
    subtitle: string;
    benefits: string[];
    ctaButton: string;
    onlineIndicator: string;
  };
  urgencyElements: {
    countdown: {
      title: string;
      days: string;
      hours: string;
      minutes: string;
      seconds: string;
    };
    limitedSpots: string;
    testimonial: string;
  };
  socialProof: {
    verifiedProfessionals: string;
    joinedToday: string;
    testimonials: Array<{
      name: string;
      role: string;
      comment: string;
      avatar: string;
    }>;
  };
  welcome: {
    title: string;
    subtitle: string;
    nextSteps: string[];
    ctaButton: string;
  };
  common: {
    noSpam: string;
    secure: string;
    unsubscribe: string;
    privacyPolicy: string;
  };
}

export const funnelTranslations: Record<'en' | 'vi', FunnelTranslations> = {
  en: {
    exitIntent: {
      title: "Wait! Don't Miss Out!",
      subtitle: "Join 1,200+ professionals getting 3x more bookings. 100% FREE — no hidden fees!",
      emailPlaceholder: "Enter your email for instant access",
      ctaButton: "♡ Get My Spot FREE →",
      disclaimer: "No spam. Unsubscribe anytime. Data protected."
    },
    smartBanner: {
      title: "Ready to grow your beauty business?",
      subtitle: "Join 1,200+ pros — 100% FREE to start!",
      ctaButton: "Sign Up FREE",
      limitedOffer: "Limited time offer"
    },
    returnVisitor: {
      title: "Still thinking?",
      subtitle: "Join 1,200+ pros and get booked faster — Sign up FREE anytime.",
      benefits: [
        "✨ 3x more bookings guaranteed",
        "💼 Professional profile setup",
        "🔒 Secure payments & client management"
      ],
      ctaButton: "Sign Up Now",
      onlineIndicator: "1,200+ professionals online now"
    },
    urgencyElements: {
      countdown: {
        title: "Special Launch Offer Ends In:",
        days: "Days",
        hours: "Hours",
        minutes: "Minutes",
        seconds: "Seconds"
      },
      limitedSpots: "Only 47 spots left in your area",
      testimonial: "I tripled my bookings in 2 weeks!"
    },
    socialProof: {
      verifiedProfessionals: "1,200+ verified professionals",
      joinedToday: "23 professionals joined today",
      testimonials: [
        {
          name: "Sarah Chen",
          role: "Nail Artist",
          comment: "EmviApp helped me build a loyal client base. I'm booked 3 weeks in advance now!",
          avatar: "SC"
        },
        {
          name: "Maria Rodriguez",
          role: "Hair Stylist",
          comment: "Best decision for my salon business. Clients love the booking system!",
          avatar: "MR"
        },
        {
          name: "Ashley Kim",
          role: "Esthetician",
          comment: "Professional, clean platform. My income doubled in 3 months.",
          avatar: "AK"
        }
      ]
    },
    welcome: {
      title: "Welcome to EmviApp! 🎉",
      subtitle: "You're now part of an exclusive community of beauty professionals.",
      nextSteps: [
        "Check your email for setup instructions",
        "Complete your professional profile",
        "Start getting discovered by new clients"
      ],
      ctaButton: "Complete Profile Setup"
    },
    common: {
      noSpam: "No spam. Unsubscribe anytime.",
      secure: "Your data is secure & encrypted.",
      unsubscribe: "Unsubscribe anytime",
      privacyPolicy: "Privacy Policy"
    }
  },
  vi: {
    exitIntent: {
      title: "Chờ đã! Đừng bỏ lỡ cơ hội!",
      subtitle: "Tham gia cùng 1,200+ chuyên gia có gấp 3 lần lượt đặt lịch. HOÀN TOÀN MIỄN PHÍ!",
      emailPlaceholder: "Nhập email để truy cập ngay",
      ctaButton: "♡ Đăng Ký MIỄN PHÍ →",
      disclaimer: "Không spam. Hủy đăng ký bất cứ lúc nào. Dữ liệu được bảo vệ."
    },
    smartBanner: {
      title: "Sẵn sàng phát triển tiệm nail của bạn?",
      subtitle: "Tham gia cùng 1,200+ thợ nail — HOÀN TOÀN MIỄN PHÍ!",
      ctaButton: "Đăng Ký Miễn Phí",
      limitedOffer: "Ưu đãi có thời hạn"
    },
    returnVisitor: {
      title: "Vẫn đang cân nhắc?",
      subtitle: "Tham gia cùng 1,200+ thợ nail và có nhiều khách hơn — Đăng ký MIỄN PHÍ ngay.",
      benefits: [
        "✨ Đảm bảo tăng gấp 3 lần lượt khách",
        "💼 Thiết lập hồ sơ chuyên nghiệp",
        "🔒 Thanh toán an toàn & quản lý khách hàng"
      ],
      ctaButton: "Đăng Ký Ngay",
      onlineIndicator: "1,200+ thợ nail đang online"
    },
    urgencyElements: {
      countdown: {
        title: "Ưu Đãi Đặc Biệt Kết Thúc Trong:",
        days: "Ngày",
        hours: "Giờ",
        minutes: "Phút",
        seconds: "Giây"
      },
      limitedSpots: "Chỉ còn 47 suất trong khu vực của bạn",
      testimonial: "Tôi tăng gấp 3 lần khách trong 2 tuần!"
    },
    socialProof: {
      verifiedProfessionals: "1,200+ thợ nail đã xác minh",
      joinedToday: "23 thợ nail đã tham gia hôm nay",
      testimonials: [
        {
          name: "Linh Nguyễn",
          role: "Thợ Nail",
          comment: "EmviApp giúp tôi xây dựng nhóm khách quen. Giờ tôi được book kín 3 tuần!",
          avatar: "LN"
        },
        {
          name: "Hương Trần",
          role: "Chủ Tiệm",
          comment: "Quyết định tốt nhất cho tiệm của tôi. Khách hàng rất thích hệ thống đặt lịch!",
          avatar: "HT"
        },
        {
          name: "Mai Phạm",
          role: "Nail Artist",
          comment: "Platform chuyên nghiệp, sạch sẽ. Thu nhập của tôi tăng gấp đôi trong 3 tháng.",
          avatar: "MP"
        }
      ]
    },
    welcome: {
      title: "Chào mừng đến với EmviApp! 🎉",
      subtitle: "Bạn đã trở thành thành viên của cộng đồng thợ nail chuyên nghiệp.",
      nextSteps: [
        "Kiểm tra email để nhận hướng dẫn thiết lập",
        "Hoàn thiện hồ sơ chuyên nghiệp của bạn",
        "Bắt đầu được khách hàng mới khám phá"
      ],
      ctaButton: "Hoàn Thiện Hồ Sơ"
    },
    common: {
      noSpam: "Không spam. Hủy đăng ký bất cứ lúc nào.",
      secure: "Dữ liệu của bạn được bảo mật & mã hóa.",
      unsubscribe: "Hủy đăng ký bất cứ lúc nào",
      privacyPolicy: "Chính Sách Bảo Mật"
    }
  }
};