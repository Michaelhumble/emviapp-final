
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTranslation } from '@/hooks/useTranslation';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface JobPricingProps {
  form: any;
  price: number;
  isFirstPost?: boolean;
}

export const JobPricing: React.FC<JobPricingProps> = ({ form, price, isFirstPost }) => {
  const { t } = useTranslation();

  const pricingTiers = [
    {
      id: 'standard',
      title: t('Standard', 'Tiêu chuẩn'),
      price: 49,
      description: t('30-day listing with standard visibility', 'Đăng tin 30 ngày với khả năng hiển thị tiêu chuẩn')
    },
    {
      id: 'premium',
      title: t('Premium', 'Cao cấp'),
      price: 99,
      description: t('30-day listing with boosted visibility and highlighted placement', 'Đăng tin 30 ngày với khả năng hiển thị nâng cao và vị trí nổi bật')
    },
    {
      id: 'diamond',
      title: t('Diamond', 'Kim cương'),
      price: 199,
      description: t('30-day featured placement with maximum visibility and top positioning', 'Đăng tin 30 ngày với vị trí nổi bật nhất và khả năng hiển thị tối đa')
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{t('Job Post Options', 'Tùy chọn đăng tin')}</h2>

      {isFirstPost && (
        <Card className="bg-green-50 border border-green-100 shadow-sm">
          <CardContent className="pt-4">
            <p className="text-sm text-green-700 font-medium">
              {t('First Post Discount: 50% off your first job listing!', 'Giảm giá bài đăng đầu tiên: Giảm 50% cho bài đăng việc làm đầu tiên của bạn!')}
            </p>
          </CardContent>
        </Card>
      )}

      <FormField
        control={form.control}
        name="pricingTier"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-3"
              >
                {pricingTiers.map(tier => (
                  <FormItem key={tier.id} className="flex items-start space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={tier.id} id={tier.id} className="mt-1" />
                    </FormControl>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 md:gap-4 items-center">
                      <FormLabel 
                        htmlFor={tier.id}
                        className="md:col-span-2 font-medium cursor-pointer"
                      >
                        {tier.title}
                      </FormLabel>
                      <div className="md:col-span-1 text-sm text-muted-foreground">
                        ${isFirstPost ? tier.price / 2 : tier.price}
                      </div>
                      <div className="md:col-span-1 text-sm text-muted-foreground">
                        {tier.description}
                      </div>
                    </div>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t('Enhancement Options', 'Tùy chọn nâng cao')}</h3>

        <div className="space-y-3">
          <FormField
            control={form.control}
            name="isUrgent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel className="font-medium">
                    {t('Urgent Listing', 'Đăng tin khẩn cấp')}
                  </FormLabel>
                  <FormDescription>
                    {t('Mark your listing as "Urgent" to attract immediate attention', 'Đánh dấu tin đăng của bạn là "Khẩn cấp" để thu hút sự chú ý ngay lập tức')}
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="showAtTop"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel className="font-medium">
                    {t('Top Placement', 'Vị trí hàng đầu')}
                  </FormLabel>
                  <FormDescription>
                    {t('Keep your listing at the top of the search results', 'Giữ bài đăng của bạn ở đầu kết quả tìm kiếm')}
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isHotListing"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel className="font-medium">
                    {t('Hot Listing', 'Bài đăng nổi bật')}
                  </FormLabel>
                  <FormDescription>
                    {t('Highlight your listing with a special "Hot" badge', 'Làm nổi bật tin đăng của bạn với huy hiệu "Hot" đặc biệt')}
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="autoRenew"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel className="font-medium">
                    {t('Auto-Renew', 'Tự động gia hạn')}
                  </FormLabel>
                  <FormDescription>
                    {t('Automatically renew your listing when it expires', 'Tự động gia hạn tin đăng của bạn khi hết hạn')}
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>

      <Card className="border-purple-200 bg-purple-50/50 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">{t('Total Price', 'Tổng giá')}</h3>
            <span className="font-bold text-xl">${price}</span>
          </div>
        </CardContent>
        <CardFooter className="border-t border-purple-100 bg-purple-50/80 text-sm text-slate-600 pt-3">
          {t('You will only be charged when you submit your job listing', 'Bạn sẽ chỉ bị tính phí khi bạn gửi bài đăng việc làm')}
        </CardFooter>
      </Card>
    </div>
  );
};
