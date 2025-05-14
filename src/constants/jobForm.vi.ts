
export const jobFormVi = {
  title: 'Đăng Công Việc',
  optionalLabel: '(Không bắt buộc)',
  requiredLabel: '*',
  continue: 'Tiếp tục đến Bảng giá',
  submit: 'Đăng Công Việc',
  
  // Template
  templateLabel: 'Chọn mẫu',
  templatePlaceholder: 'Chọn mẫu công việc',
  templates: ['Thợ Nail', 'Thợ Làm Tóc', 'Kỹ thuật viên Spa', 'Lễ tân Tiệm', 'Quản Lý Tiệm', 'Thợ Massage', 'Thợ Nối Mi', 'Thợ Xăm', 'Thợ Trang Điểm', 'Cho Thuê Bàn/Chỗ Ngồi', 'Ngành Làm Đẹp Khác'],
  
  // Job Fields
  titleLabel: 'Tiêu đề công việc',
  titlePlaceholder: 'Nhập tiêu đề công việc',
  
  locationLabel: 'Địa điểm',
  locationPlaceholder: 'Nhập địa điểm làm việc',
  
  jobTypeLabel: 'Loại công việc',
  jobTypePlaceholder: 'Chọn loại công việc',
  jobTypeOptions: {
    fullTime: 'Toàn thời gian',
    partTime: 'Bán thời gian',
    contract: 'Theo hợp đồng',
    freelance: 'Làm tự do',
    other: 'Khác'
  },
  
  descriptionLabel: 'Mô tả công việc',
  descriptionPlaceholder: 'Nhập mô tả công việc',
  
  compensationLabel: 'Lương thưởng',
  compensationPlaceholder: 'Ví dụ: $20-25/giờ hoặc $50k-60k/năm',
  
  // Contact Section
  contactInfoLabel: 'Thông tin liên hệ',
  contactInfoEmail: 'Email',
  contactInfoEmailPlaceholder: 'Nhập email liên hệ',
  contactInfoPhone: 'Số điện thoại',
  contactInfoPhonePlaceholder: 'Nhập số điện thoại',
  
  // Photo Upload
  photosLabel: 'Thêm ảnh (Không bắt buộc)',
  dragDropText: 'Kéo thả hình ảnh vào đây hoặc bấm để chọn – Gợi ý: Thêm hình sẽ giúp bài đăng nổi bật hơn!',
  photoCountText: '{count} / {max} ảnh được thêm',
  
  // Urgent
  urgentLabel: 'Đánh dấu là khẩn cấp',
  urgentHelpText: 'Làm nổi bật bài đăng của bạn',
  
  // AI Polish
  aiPolishButton: '✨ Trợ Giúp Từ AI',
  
  // Submission
  submitting: 'Đang gửi...',
  
  // Form errors
  errors: {
    title: 'Tiêu đề là bắt buộc',
    description: 'Mô tả phải có ít nhất 10 ký tự',
    location: 'Địa điểm là bắt buộc',
    email: 'Vui lòng nhập email hợp lệ',
    phone: 'Vui lòng nhập số điện thoại hợp lệ'
  }
};
