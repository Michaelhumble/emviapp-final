
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent } from '@/components/ui/card';

interface JobPricingProps {
  form: any;
  price: number;
  isFirstPost?: boolean;
}

export const JobPricing: React.FC<JobPricingProps> = ({ form, price, isFirstPost = false }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{t('Pricing & Visibility', 'Giá & khả năng hiển thị')}</h2>
      
      <FormField
        control={form.control}
        name="pricingTier"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>{t('Select Pricing Tier', 'Chọn gói')}</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <FormItem>
                  <FormControl>
                    <Card className={`border-2 cursor-pointer ${field.value === 'standard' ? 'border-primary' : 'border-gray-200'} h-full`}>
                      <CardContent className="pt-6">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="standard" id="standard" />
                          <FormLabel htmlFor="standard" className="font-semibold text-lg cursor-pointer">
                            {t('Standard', 'Tiêu chuẩn')}
                          </FormLabel>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {t('Basic visibility for 30 days', 'Hiển thị cơ bản trong 30 ngày')}
                        </p>
                        <p className="mt-4 font-bold text-xl">
                          {isFirstPost ? t('FREE', 'MIỄN PHÍ') : '$49'}
                        </p>
                      </CardContent>
                    </Card>
                  </FormControl>
                </FormItem>

                <FormItem>
                  <FormControl>
                    <Card className={`border-2 cursor-pointer ${field.value === 'featured' ? 'border-primary' : 'border-gray-200'} h-full`}>
                      <CardContent className="pt-6">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="featured" id="featured" />
                          <FormLabel htmlFor="featured" className="font-semibold text-lg cursor-pointer">
                            {t('Featured', 'Nổi bật')}
                          </FormLabel>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {t('Higher visibility + 45 days', 'Hiển thị cao hơn + 45 ngày')}
                        </p>
                        <p className="mt-4 font-bold text-xl">$99</p>
                      </CardContent>
                    </Card>
                  </FormControl>
                </FormItem>

                <FormItem>
                  <FormControl>
                    <Card className={`border-2 cursor-pointer ${field.value === 'premium' ? 'border-primary' : 'border-gray-200'} h-full`}>
                      <CardContent className="pt-6">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="premium" id="premium" />
                          <FormLabel htmlFor="premium" className="font-semibold text-lg cursor-pointer">
                            {t('Premium', 'Cao cấp')}
                          </FormLabel>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {t('Maximum visibility + 60 days', 'Hiển thị tối đa + 60 ngày')}
                        </p>
                        <p className="mt-4 font-bold text-xl">$149</p>
                      </CardContent>
                    </Card>
                  </FormControl>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t('Additional Options', 'Tùy chọn bổ sung')}</h3>
        
        <FormField
          control={form.control}
          name="showAtTop"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  {t('Show at Top of Listings', 'Hiển thị ở đầu danh sách')}
                </FormLabel>
                <FormDescription>
                  {t('Your job will appear at the top of search results', 'Công việc của bạn sẽ xuất hiện ở đầu kết quả tìm kiếm')}
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
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  {t('Mark as Hot Listing', 'Đánh dấu là tin nóng')}
                </FormLabel>
                <FormDescription>
                  {t('Add a "Hot" badge to make your listing stand out', 'Thêm huy hiệu "Hot" để làm nổi bật tin đăng của bạn')}
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
          name="isUrgent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  {t('Mark as Urgent', 'Đánh dấu là khẩn cấp')}
                </FormLabel>
                <FormDescription>
                  {t('Add an "Urgent" badge to attract immediate attention', 'Thêm huy hiệu "Khẩn cấp" để thu hút sự chú ý ngay lập tức')}
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
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  {t('Auto-renew', 'Tự động gia hạn')}
                </FormLabel>
                <FormDescription>
                  {t('Automatically renew this posting when it expires', 'Tự động gia hạn tin đăng này khi hết hạn')}
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

      <div className="rounded-lg bg-primary/10 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">{t('Total', 'Tổng cộng')}</h3>
          <p className="text-xl font-bold">${price}</p>
        </div>
        {isFirstPost && (
          <p className="mt-2 text-sm text-green-600 font-medium">
            {t('First post is free!', 'Bài đăng đầu tiên miễn phí!')}
          </p>
        )}
      </div>
    </div>
  );
};
