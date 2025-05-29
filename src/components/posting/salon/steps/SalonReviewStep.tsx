
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, MapPin, DollarSign, Users, Building2, FileText, Star, Camera } from "lucide-react";
import { motion } from "framer-motion";

interface SalonReviewStepProps {
  form: UseFormReturn<SalonFormValues>;
  photoUploads: File[];
}

export const SalonReviewStep = ({ form, photoUploads }: SalonReviewStepProps) => {
  const formData = form.getValues();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Success Banner */}
      <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 border border-green-200 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
            <CheckCircle className="h-5 w-5 text-white" />
          </div>
          <h2 className="font-playfair text-2xl font-bold text-gray-900">🎉 Almost There! / Gần xong rồi!</h2>
        </div>
        <p className="text-gray-600 leading-relaxed">
          Your salon listing looks amazing! Review everything below to ensure maximum buyer appeal.
          <br />
          <span className="text-green-600 font-medium">Tin đăng salon của bạn trông tuyệt vời! Xem lại mọi thứ bên dưới để đảm bảo thu hút người mua tối đa.</span>
        </p>
      </div>

      {/* Review Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Identity & Location */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Salon Identity / Danh tính salon
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <span className="font-medium text-gray-700">Name / Tên:</span>
              <p className="text-gray-900 font-semibold">{formData.salonName || "Not provided / Chưa cung cấp"}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Type / Loại:</span>
              <Badge variant="secondary" className="ml-2">{formData.businessType || "Not selected / Chưa chọn"}</Badge>
            </div>
            <div>
              <span className="font-medium text-gray-700">Established / Thành lập:</span>
              <p className="text-gray-900">{formData.establishedYear || "Not provided / Chưa cung cấp"}</p>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-blue-500 mt-1" />
              <div>
                <span className="font-medium text-gray-700">Location / Vị trí:</span>
                <p className="text-gray-900">
                  {formData.address ? `${formData.address}, ` : ""}
                  {formData.city || "City not provided / Chưa cung cấp thành phố"}
                  {formData.state ? `, ${formData.state}` : ""}
                  {formData.zipCode ? ` ${formData.zipCode}` : ""}
                </p>
                {formData.neighborhood && (
                  <p className="text-sm text-gray-600">Area / Khu vực: {formData.neighborhood}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Details */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Financial Details / Chi tiết tài chính
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <span className="font-medium text-gray-700">Asking Price / Giá yêu cầu:</span>
              <p className="text-2xl font-bold text-emerald-600">{formData.askingPrice || "Not provided / Chưa cung cấp"}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Monthly Rent / Thuê hàng tháng:</span>
              <p className="text-lg text-gray-900">{formData.monthlyRent || "Not provided / Chưa cung cấp"}</p>
            </div>
            {formData.monthlyProfit && (
              <div>
                <span className="font-medium text-gray-700">Monthly Profit / Lợi nhuận hàng tháng:</span>
                <p className="text-lg text-green-600 font-semibold">{formData.monthlyProfit}</p>
              </div>
            )}
            {formData.monthlyRevenue && (
              <div>
                <span className="font-medium text-gray-700">Monthly Revenue / Doanh thu hàng tháng:</span>
                <p className="text-lg text-blue-600 font-semibold">{formData.monthlyRevenue}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Business Details */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Business Details / Chi tiết kinh doanh
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {formData.employeeCount && (
              <div>
                <span className="font-medium text-gray-700">Employee Count / Số nhân viên:</span>
                <p className="text-gray-900">{formData.employeeCount}</p>
              </div>
            )}
            {formData.numberOfTables && (
              <div>
                <span className="font-medium text-gray-700">Number of Tables / Số bàn:</span>
                <p className="text-gray-900">{formData.numberOfTables}</p>
              </div>
            )}
            {formData.squareFeet && (
              <div>
                <span className="font-medium text-gray-700">Square Feet / Diện tích:</span>
                <p className="text-gray-900">{formData.squareFeet}</p>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {formData.willTrain && <Badge variant="outline">Will Train / Sẽ đào tạo</Badge>}
              {formData.hasWaxRoom && <Badge variant="outline">Wax Room / Phòng wax</Badge>}
              {formData.hasParking && <Badge variant="outline">Parking / Bãi đỗ xe</Badge>}
            </div>
          </CardContent>
        </Card>

        {/* Photos & Descriptions */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Photos & Description / Ảnh & Mô tả
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <span className="font-medium text-gray-700">Photos / Ảnh:</span>
              <div className="mt-2">
                {photoUploads && photoUploads.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {photoUploads.slice(0, 4).map((file, index) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Salon photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    {photoUploads.length > 4 && (
                      <div className="aspect-square rounded-lg bg-gray-100 border-2 border-gray-200 flex items-center justify-center text-gray-500 text-sm">
                        +{photoUploads.length - 4} more
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No photos uploaded / Chưa tải ảnh lên</p>
                )}
              </div>
            </div>

            {(formData.englishDescription || formData.vietnameseDescription) && (
              <div>
                <span className="font-medium text-gray-700">Description / Mô tả:</span>
                {formData.englishDescription && (
                  <p className="text-gray-900 text-sm mt-1 bg-gray-50 p-3 rounded-lg">{formData.englishDescription}</p>
                )}
                {formData.vietnameseDescription && (
                  <p className="text-gray-900 text-sm mt-1 bg-blue-50 p-3 rounded-lg">{formData.vietnameseDescription}</p>
                )}
              </div>
            )}

            {formData.reasonForSelling && (
              <div>
                <span className="font-medium text-gray-700">Reason for Selling / Lý do bán:</span>
                <p className="text-gray-900 text-sm mt-1 bg-amber-50 p-3 rounded-lg">{formData.reasonForSelling}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Success Message */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
            <Star className="h-6 w-6 text-white" />
          </div>
          <h3 className="font-playfair text-xl font-bold text-gray-900">Ready to Attract Premium Buyers!</h3>
        </div>
        <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Your salon listing includes all the key details that serious buyers look for. You're about to join thousands of successful salon sales on our platform!
          <br />
          <span className="text-green-600 font-medium">Tin đăng salon của bạn bao gồm tất cả các chi tiết quan trọng mà người mua nghiêm túc tìm kiếm. Bạn sắp tham gia hàng ngàn giao dịch bán salon thành công trên nền tảng của chúng tôi!</span>
        </p>
      </motion.div>
    </motion.div>
  );
};
