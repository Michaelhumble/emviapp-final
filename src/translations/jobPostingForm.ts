
import { Translation } from "@/hooks/useTranslation";

// Job Form translations organized by sections
export const jobPostingTranslations = {
  // Common form actions
  common: {
    continue: { english: 'Continue', vietnamese: 'Tiếp tục' },
    submitting: { english: 'Submitting...', vietnamese: 'Đang gửi...' },
    submit: { english: 'Submit', vietnamese: 'Gửi' },
    cancel: { english: 'Cancel', vietnamese: 'Hủy' },
    required: { english: 'Required', vietnamese: 'Bắt buộc' },
    optional: { english: 'Optional', vietnamese: 'Không bắt buộc' },
  },
  
  // Job Details Section
  jobDetails: {
    sectionTitle: { english: 'Job Details', vietnamese: 'Chi Tiết Công Việc' },
    sectionDescription: { 
      english: 'Provide information about the position to attract qualified candidates', 
      vietnamese: 'Cung cấp thông tin về vị trí để thu hút ứng viên có đủ năng lực' 
    },
    jobTitle: { english: 'Job Title', vietnamese: 'Chức Danh Công Việc' },
    jobTitlePlaceholder: { english: 'e.g. Nail Technician', vietnamese: 'VD: Thợ Nail' },
    employmentType: { english: 'Employment Type', vietnamese: 'Loại Công Việc' },
    employmentTypes: {
      fullTime: { english: 'Full-time', vietnamese: 'Toàn thời gian' },
      partTime: { english: 'Part-time', vietnamese: 'Bán thời gian' },
      contract: { english: 'Contract', vietnamese: 'Hợp đồng' },
      temporary: { english: 'Temporary', vietnamese: 'Tạm thời' },
      commission: { english: 'Commission', vietnamese: 'Hoa hồng' }
    },
    selectEmploymentType: { english: 'Select employment type', vietnamese: 'Chọn loại công việc' },
    jobDescription: { english: 'Job Description', vietnamese: 'Mô Tả Công Việc' },
    jobDescriptionPlaceholder: { 
      english: 'Describe the responsibilities and qualifications...', 
      vietnamese: 'Mô tả trách nhiệm và trình độ chuyên môn...' 
    },
    location: { english: 'Location', vietnamese: 'Địa Điểm' },
    locationPlaceholder: { english: 'City, State', vietnamese: 'Thành phố, Tiểu bang' },
    salaryRange: { english: 'Salary Range', vietnamese: 'Phạm Vi Lương' },
    salaryRangePlaceholder: { english: 'e.g. $15-20/hour', vietnamese: 'VD: $15-20/giờ' },
    experienceLevel: { english: 'Experience Level', vietnamese: 'Mức Kinh Nghiệm' },
    experienceLevels: {
      entry: { english: 'Entry Level', vietnamese: 'Mới vào nghề' },
      intermediate: { english: 'Intermediate', vietnamese: 'Trung cấp' },
      experienced: { english: 'Experienced', vietnamese: 'Có kinh nghiệm' },
      senior: { english: 'Senior', vietnamese: 'Cao cấp' }
    },
    selectExperienceLevel: { english: 'Select experience level', vietnamese: 'Chọn mức kinh nghiệm' },
  },
  
  // Compensation Section
  compensation: {
    sectionTitle: { english: 'Compensation', vietnamese: 'Chế Độ Đãi Ngộ' },
    sectionDescription: { 
      english: 'Specify the compensation details for this position', 
      vietnamese: 'Chỉ rõ chi tiết đãi ngộ cho vị trí này' 
    },
    compensationType: { english: 'Compensation Type', vietnamese: 'Loại Lương' },
    compensationTypes: {
      hourly: { english: 'Hourly', vietnamese: 'Theo giờ' },
      salary: { english: 'Salary', vietnamese: 'Lương tháng' },
      commission: { english: 'Commission Only', vietnamese: 'Chỉ hoa hồng' },
      commissionPlus: { english: 'Commission + Base', vietnamese: 'Hoa hồng + Lương cơ bản' }
    },
    selectCompensationType: { english: 'Select compensation type', vietnamese: 'Chọn loại lương' },
    salaryRange: { english: 'Salary Range', vietnamese: 'Phạm Vi Lương' },
    salaryRangePlaceholder: { 
      english: 'e.g. $15-20/hour or $40K-50K/year', 
      vietnamese: 'VD: $15-20/giờ hoặc $40K-50K/năm' 
    },
    expectedTips: { english: 'Expected Tips', vietnamese: 'Tips Dự Kiến' },
    expectedTipsPlaceholder: { english: 'e.g. $100-200/day', vietnamese: 'VD: $100-200/ngày' }
  },
  
  // Contact Information Section
  contactInfo: {
    sectionTitle: { english: 'Contact Information', vietnamese: 'Thông Tin Liên Hệ' },
    sectionDescription: { 
      english: 'Provide contact details for interested candidates', 
      vietnamese: 'Cung cấp thông tin liên lạc cho ứng viên quan tâm' 
    },
    contactName: { english: 'Contact Name', vietnamese: 'Tên Liên Hệ' },
    contactNamePlaceholder: { 
      english: 'Your name or business name', 
      vietnamese: 'Tên của bạn hoặc tên doanh nghiệp' 
    },
    contactPhone: { english: 'Contact Phone Number', vietnamese: 'Số Điện Thoại Liên Hệ' },
    contactPhonePlaceholder: { english: 'e.g. (555) 123-4567', vietnamese: 'VD: (555) 123-4567' },
    phoneHelperText: { 
      english: 'Optional, for faster contact. Format: +1 (555) 123-4567 or 555-123-4567', 
      vietnamese: 'Không bắt buộc, để liên hệ nhanh hơn. Định dạng: +1 (555) 123-4567 hoặc 555-123-4567' 
    },
    email: { english: 'Email Address', vietnamese: 'Địa Chỉ Email' },
    emailPlaceholder: { english: 'e.g. youremail@example.com', vietnamese: 'VD: email@example.com' },
    zalo: { english: 'Zalo (Optional)', vietnamese: 'Zalo (Không bắt buộc)' },
    zaloPlaceholder: { english: 'Your Zalo contact', vietnamese: 'Liên hệ Zalo của bạn' },
    additionalNotes: { english: 'Additional Contact Notes', vietnamese: 'Ghi Chú Liên Hệ Bổ Sung' },
    additionalNotesPlaceholder: { 
      english: 'Best time to contact, preferred method, etc.', 
      vietnamese: 'Thời gian liên hệ tốt nhất, phương thức ưa thích, v.v.' 
    }
  },
  
  // Validation Messages
  validation: {
    phoneInvalid: { 
      english: 'Phone number format is invalid', 
      vietnamese: 'Định dạng số điện thoại không hợp lệ' 
    },
    emailRequired: { english: 'Email is required', vietnamese: 'Email là bắt buộc' },
    emailInvalid: { english: 'Please enter a valid email', vietnamese: 'Vui lòng nhập email hợp lệ' },
    titleRequired: { english: 'Job title is required', vietnamese: 'Tiêu đề công việc là bắt buộc' },
    locationRequired: { english: 'Location is required', vietnamese: 'Địa điểm là bắt buộc' },
    nameRequired: { english: 'Contact name is required', vietnamese: 'Tên liên hệ là bắt buộc' }
  }
};
