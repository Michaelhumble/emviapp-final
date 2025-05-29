
import { z } from 'zod';

export const salonFormSchema = z.object({
  salonName: z.string().min(2, 'Salon name must be at least 2 characters / Tên salon phải có ít nhất 2 ký tự'),
  location: z.string().min(5, 'Please enter a complete address / Vui lòng nhập địa chỉ đầy đủ'),
  description: z.string().min(50, 'Description must be at least 50 characters / Mô tả phải có ít nhất 50 ký tự'),
  askingPrice: z.string().min(1, 'Please enter asking price / Vui lòng nhập giá yêu cầu'),
  monthlyRevenue: z.string().min(1, 'Please enter monthly revenue / Vui lòng nhập doanh thu hàng tháng'),
  contactEmail: z.string().email('Please enter a valid email / Vui lòng nhập email hợp lệ'),
  contactPhone: z.string().min(10, 'Please enter a valid phone number / Vui lòng nhập số điện thoại hợp lệ'),
  autoRenew: z.boolean().optional()
});

export type SalonFormValues = z.infer<typeof salonFormSchema>;
