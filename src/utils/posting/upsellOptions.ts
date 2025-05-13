
import { UpsellOption } from "@/types/job";

// Export the array of upsell options
export const jobUpsellOptions: UpsellOption[] = [
  {
    id: "showAtTop",
    name: "Show at Top",
    vietnameseName: "Hiển thị ở trên",
    description: "Boost visibility by showing your listing at the top",
    vietnameseDescription: "Tăng khả năng hiển thị bằng cách hiển thị danh sách của bạn ở trên cùng",
    price: 10,
    type: "toggle",
    defaultEnabled: false
  },
  {
    id: "isHotListing",
    name: "Hot Listing",
    vietnameseName: "Danh sách nổi bật",
    description: "Mark your listing as hot to attract more attention",
    vietnameseDescription: "Đánh dấu danh sách của bạn là nổi bật để thu hút nhiều sự chú ý hơn",
    price: 15,
    type: "toggle",
    defaultEnabled: false
  },
  {
    id: "isUrgent",
    name: "Urgent",
    vietnameseName: "Khẩn cấp",
    description: "Mark your listing as urgent to attract immediate attention",
    vietnameseDescription: "Đánh dấu danh sách của bạn là khẩn cấp để thu hút sự chú ý ngay lập tức",
    price: 5,
    type: "toggle",
    defaultEnabled: false
  },
  {
    id: "featuredListing",
    name: "Featured Listing",
    vietnameseName: "Danh sách nổi bật",
    description: "Highlight your listing as featured for maximum exposure",
    vietnameseDescription: "Đánh dấu danh sách của bạn là nổi bật để thu hút nhiều sự chú ý hơn",
    price: 20,
    type: "toggle",
    defaultEnabled: false
  },
  {
    id: "extendedDuration",
    name: "Extended Duration",
    vietnameseName: "Thời hạn kéo dài",
    description: "Extend your listing duration for longer visibility",
    vietnameseDescription: "Kéo dài thời gian hiển thị danh sách của bạn",
    price: 15,
    type: "toggle",
    defaultEnabled: false
  },
  {
    id: "boostVisibility",
    name: "Boost Visibility",
    vietnameseName: "Tăng khả năng hiển thị",
    description: "Boost your listing visibility across the platform",
    vietnameseDescription: "Tăng khả năng hiển thị danh sách của bạn trên toàn bộ nền tảng",
    price: 10,
    type: "toggle",
    defaultEnabled: false
  }
];
