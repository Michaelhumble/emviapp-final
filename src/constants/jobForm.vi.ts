
export const jobFormVi = {
  title: 'Đăng tin tuyển dụng',
  optionalLabel: '(Tùy chọn)',
  requiredLabel: '*',
  continue: 'Tiếp tục chọn gói đăng tin',
  submit: 'Đăng tin',
  
  // Template
  templateLabel: 'Chọn mẫu',
  templatePlaceholder: 'Chọn mẫu công việc',
  templates: ['Thợ làm móng', 'Thợ làm tóc', 'Thợ spa', 'Lễ tân salon', 'Khác'],
  
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
    contract: 'Hợp đồng',
    freelance: 'Tự do',
    other: 'Khác'
  },
  
  descriptionLabel: 'Mô tả công việc',
  descriptionPlaceholder: 'Nhập mô tả công việc',
  
  compensationLabel: 'Mức lương',
  compensationPlaceholder: 'VD: $20-25/giờ hoặc $50k-60k/năm',
  
  // Contact Section
  contactInfoLabel: 'Thông tin liên hệ',
  contactInfoEmail: 'Email',
  contactInfoEmailPlaceholder: 'Nhập email liên hệ',
  contactInfoPhone: 'Số điện thoại',
  contactInfoPhonePlaceholder: 'Nhập số điện thoại liên hệ',
  
  // Photo Upload
  photosLabel: 'Thêm hình ảnh (tùy chọn)',
  dragDropText: 'Kéo thả hình ảnh hoặc bấm để chọn',
  photoCountText: '{count} / {max} hình ảnh đã thêm',
  
  // Urgent
  urgentLabel: 'Đánh dấu là gấp',
  urgentHelpText: 'Làm nổi bật bài đăng của bạn',
  
  // AI Polish
  aiPolishButton: 'Trợ giúp từ AI ✨',
  
  // Submission
  submitting: 'Đang gửi...',
  
  // Form errors
  errors: {
    title: 'Tiêu đề là bắt buộc',
    description: 'Mô tả phải có ít nhất 10 ký tự',
    location: 'Địa điểm là bắt buộc',
    email: 'Vui lòng nhập địa chỉ email hợp lệ',
    phone: 'Vui lòng nhập số điện thoại hợp lệ'
  }
};
