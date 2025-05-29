
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SalonFormValues } from '../salonFormSchema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, MapPin, DollarSign, Camera, Star, Building } from 'lucide-react';

interface SalonReviewStepProps {
  form: UseFormReturn<SalonFormValues>;
  photoUploads: File[];
}

export const SalonReviewStep = ({ form, photoUploads }: SalonReviewStepProps) => {
  const formValues = form.getValues();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <span className="ml-3 text-xl font-medium">✅ Review Your Listing / Xem lại tin đăng</span>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Final check before we publish your salon listing. Make sure everything looks perfect!
          <br />
          <span className="text-green-600 font-medium">
            Kiểm tra cuối cùng trước khi chúng tôi xuất bản tin đăng salon của bạn. Đảm bảo mọi thứ đều hoàn hảo!
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Salon Identity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5 text-purple-600" />
              Salon Identity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Name:</span> {formValues.salonName || 'Not provided'}
              </div>
              <div>
                <span className="font-medium">Type:</span> {formValues.businessType || 'Not provided'}
              </div>
              <div>
                <span className="font-medium">Established:</span> {formValues.establishedYear || 'Not provided'}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-600" />
              Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Address:</span> {formValues.address || 'Not provided'}
              </div>
              <div>
                <span className="font-medium">City:</span> {formValues.city || 'Not provided'}
              </div>
              <div>
                <span className="font-medium">State:</span> {formValues.state || 'Not provided'}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              Financial Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Asking Price:</span> ${formValues.askingPrice || 'Not provided'}
              </div>
              <div>
                <span className="font-medium">Monthly Rent:</span> ${formValues.monthlyRent || 'Not provided'}
              </div>
              <div>
                <span className="font-medium">Monthly Profit:</span> {formValues.monthlyProfit || 'Not provided'}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Photos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-blue-600" />
              Photos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Uploaded:</span> {photoUploads.length} photos
              </div>
              {photoUploads.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {photoUploads.slice(0, 3).map((file, index) => (
                    <div key={index} className="aspect-square">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover rounded border"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features Summary */}
      {(formValues.willTrain || formValues.hasWaxRoom || formValues.hasParking) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-600" />
              Features & Amenities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {formValues.willTrain && <Badge variant="secondary">Will Train</Badge>}
              {formValues.hasWaxRoom && <Badge variant="secondary">Wax Room</Badge>}
              {formValues.hasParking && <Badge variant="secondary">Parking</Badge>}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Descriptions */}
      {(formValues.englishDescription || formValues.vietnameseDescription) && (
        <Card>
          <CardHeader>
            <CardTitle>Descriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {formValues.englishDescription && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">English Description:</h4>
                  <p className="text-gray-600 text-sm">{formValues.englishDescription}</p>
                </div>
              )}
              {formValues.vietnameseDescription && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Vietnamese Description:</h4>
                  <p className="text-gray-600 text-sm">{formValues.vietnameseDescription}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Final Notice */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-green-900 mb-2">
          🎉 Ready to Publish! / Sẵn sàng xuất bản!
        </h3>
        <p className="text-green-800">
          Your salon listing looks great! Click "Confirm & Pay" to publish and start connecting with serious buyers.
          <br />
          <span className="text-green-600">
          Tin đăng salon của bạn trông tuyệt vời! Nhấp "Xác nhận & Thanh toán" để xuất bản và bắt đầu kết nối với những người mua nghiêm túc.
          </span>
        </p>
      </div>
    </div>
  );
};
