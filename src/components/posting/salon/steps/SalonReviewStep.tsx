
import React from 'react';
import { SalonFormValues } from '../salonFormSchema';
import { SalonPricingOptions, getSalonPostPricingSummary } from '@/utils/posting/salonPricing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Image, MapPin, DollarSign, Building, Users, CalendarClock, Landmark } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface SalonReviewStepProps {
  formData: SalonFormValues;
  photos: File[];
  pricingOptions: SalonPricingOptions;
  onComplete: () => void;
}

export const SalonReviewStep = ({ 
  formData, 
  photos, 
  pricingOptions, 
  onComplete 
}: SalonReviewStepProps) => {
  const { t } = useTranslation();
  const pricingSummary = getSalonPostPricingSummary(pricingOptions);

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t({
            english: 'Review & Submit',
            vietnamese: 'Xem Lại & Gửi'
          })}
        </h2>
        <p className="text-gray-600 mt-2">
          {t({
            english: 'Please review your listing before submitting',
            vietnamese: 'Vui lòng xem lại tin đăng trước khi gửi'
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Building className="h-5 w-5 text-blue-600" />
              {t({
                english: 'Salon Information',
                vietnamese: 'Thông Tin Salon'
              })}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-5">
            <div>
              <h4 className="text-xl font-medium">{formData.salonName}</h4>
              <Badge variant="outline" className="mt-1">
                {formData.businessType === 'nail-salon' ? t({
                  english: 'Nail Salon',
                  vietnamese: 'Tiệm Nail'
                }) : formData.businessType === 'hair-salon' ? t({
                  english: 'Hair Salon',
                  vietnamese: 'Tiệm Tóc'
                }) : formData.businessType === 'spa' ? t({
                  english: 'Spa',
                  vietnamese: 'Spa'
                }) : formData.businessType === 'beauty-salon' ? t({
                  english: 'Beauty Salon',
                  vietnamese: 'Tiệm Làm Đẹp'
                }) : t({
                  english: 'Barbershop',
                  vietnamese: 'Tiệm Cắt Tóc Nam'
                })}
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-700">{t({
                    english: 'Address',
                    vietnamese: 'Địa Chỉ'
                  })}</p>
                  <p className="text-gray-600">
                    {formData.address}, {formData.city}, {formData.state}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <DollarSign className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-700">{t({
                    english: 'Asking Price',
                    vietnamese: 'Giá Yêu Cầu'
                  })}</p>
                  <p className="text-gray-600">{formData.askingPrice}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Landmark className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-700">{t({
                    english: 'Monthly Rent',
                    vietnamese: 'Tiền Thuê Tháng'
                  })}</p>
                  <p className="text-gray-600">{formData.monthlyRent}</p>
                </div>
              </div>

              {formData.monthlyRevenue && (
                <div className="flex items-start gap-2">
                  <DollarSign className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-700">{t({
                      english: 'Monthly Revenue',
                      vietnamese: 'Doanh Thu Tháng'
                    })}</p>
                    <p className="text-gray-600">{formData.monthlyRevenue}</p>
                  </div>
                </div>
              )}

              {(formData.numberOfChairs || formData.squareFeet) && (
                <div className="flex items-start gap-2">
                  <Users className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-700">{t({
                      english: 'Salon Details',
                      vietnamese: 'Chi Tiết Salon'
                    })}</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {formData.numberOfChairs && (
                        <Badge variant="outline">
                          {formData.numberOfChairs} {t({
                            english: 'chairs',
                            vietnamese: 'ghế'
                          })}
                        </Badge>
                      )}
                      {formData.squareFeet && (
                        <Badge variant="outline">
                          {formData.squareFeet} {t({
                            english: 'sq ft',
                            vietnamese: 'sq ft'
                          })}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {(formData.willTrain || formData.hasHousing || formData.hasParking) && (
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-700">{t({
                      english: 'Features',
                      vietnamese: 'Tiện ích'
                    })}</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {formData.willTrain && (
                        <Badge variant="secondary">
                          {t({
                            english: 'Will Train',
                            vietnamese: 'Sẽ Đào Tạo'
                          })}
                        </Badge>
                      )}
                      {formData.hasHousing && (
                        <Badge variant="secondary">
                          {t({
                            english: 'Housing Available',
                            vietnamese: 'Có Chỗ Ở'
                          })}
                        </Badge>
                      )}
                      {formData.hasParking && (
                        <Badge variant="secondary">
                          {t({
                            english: 'Parking Available',
                            vietnamese: 'Có Chỗ Đậu Xe'
                          })}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {(formData.englishDescription || formData.vietnameseDescription) && (
                <div className="border-t pt-3 mt-3">
                  {formData.englishDescription && (
                    <div className="mb-3">
                      <p className="font-medium text-gray-700">{t({
                        english: 'English Description',
                        vietnamese: 'Mô Tả Tiếng Anh'
                      })}</p>
                      <p className="text-sm text-gray-600 mt-1">{formData.englishDescription}</p>
                    </div>
                  )}
                  {formData.vietnameseDescription && (
                    <div>
                      <p className="font-medium text-gray-700">{t({
                        english: 'Vietnamese Description',
                        vietnamese: 'Mô Tả Tiếng Việt'
                      })}</p>
                      <p className="text-sm text-gray-600 mt-1">{formData.vietnameseDescription}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-start gap-2 border-t pt-3">
              <Image className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-700">{t({
                  english: 'Photos',
                  vietnamese: 'Hình Ảnh'
                })}</p>
                <p className="text-gray-600">
                  {photos.length} {photos.length === 1 ? 
                    t({ english: 'photo', vietnamese: 'hình ảnh' }) : 
                    t({ english: 'photos', vietnamese: 'hình ảnh' })} {t({
                    english: 'uploaded',
                    vietnamese: 'đã tải lên'
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-purple-600" />
              {t({
                english: 'Pricing Summary',
                vietnamese: 'Tổng Kết Giá'
              })}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-5">
            <div>
              <h4 className="font-medium text-lg mb-1">{pricingSummary.planName}</h4>
              <p className="text-gray-600">
                ${pricingSummary.perMonthPrice?.toFixed(2)}/month × {pricingSummary.duration} {pricingSummary.duration === 1 ? 
                  t({ english: 'month', vietnamese: 'tháng' }) : 
                  t({ english: 'months', vietnamese: 'tháng' })}
              </p>
            </div>
            
            <div className="space-y-3 border-t pt-4">
              <div className="flex justify-between">
                <span className="text-gray-600">{t({
                  english: 'Base Price',
                  vietnamese: 'Giá Cơ Bản'
                })}</span>
                <span className="font-medium">${pricingSummary.basePrice.toFixed(2)}</span>
              </div>
              
              {pricingSummary.addOns.featured > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">{t({
                    english: 'Featured Add-On',
                    vietnamese: 'Gói Nổi Bật'
                  })}</span>
                  <span className="font-medium">+${pricingSummary.addOns.featured.toFixed(2)}</span>
                </div>
              )}
              
              {pricingSummary.autoRenewDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>{t({
                    english: 'Auto-Renew Discount',
                    vietnamese: 'Giảm Giá Tự Động Gia Hạn'
                  })}</span>
                  <span className="font-medium">-${pricingSummary.autoRenewDiscount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between font-bold border-t pt-3 text-lg">
                <span>{t({
                  english: 'Total',
                  vietnamese: 'Tổng Cộng'
                })}</span>
                <span className="text-blue-700">${pricingSummary.finalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg text-center mt-6">
              <p className="text-sm text-blue-700">
                {t({
                  english: 'Your salon will be visible to thousands of verified buyers instantly after payment.',
                  vietnamese: 'Salon của bạn sẽ được hiển thị cho hàng nghìn người mua đã xác minh ngay sau khi thanh toán.'
                })}
              </p>
            </div>

            <div className="text-center pt-4">
              <Button 
                onClick={onComplete}
                size="lg"
                className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
              >
                {t({
                  english: 'Submit Listing',
                  vietnamese: 'Gửi Tin Đăng'
                })}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
