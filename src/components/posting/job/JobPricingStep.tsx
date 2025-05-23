
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import { Info, Check, Star, Sparkles, Shield } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { usePricing } from "@/context/pricing/PricingProvider";
import { PricingOptions, JobPricingTier } from "@/utils/posting/types";
import { useTranslation } from "@/hooks/useTranslation";

interface JobPricingStepProps {
  onSubmit: (pricingOptions: PricingOptions) => void;
  isLoading?: boolean;
}

const JobPricingStep: React.FC<JobPricingStepProps> = ({ onSubmit, isLoading = false }) => {
  const { pricingOptions, setPricingOptions, priceData } = usePricing();
  const { t } = useTranslation();
  const [duration, setDuration] = useState<number>(pricingOptions.durationMonths || 1);
  
  const handleSelectionChange = (tier: JobPricingTier) => {
    setPricingOptions({
      ...pricingOptions,
      selectedPricingTier: tier
    });
  };

  const handleDurationChange = (newDuration: string) => {
    const monthsValue = parseInt(newDuration, 10);
    setDuration(monthsValue);
    setPricingOptions({
      ...pricingOptions,
      durationMonths: monthsValue
    });
  };

  const handleAutoRenewChange = (checked: boolean) => {
    setPricingOptions({
      ...pricingOptions,
      autoRenew: checked
    });
  };

  const handleNationwideChange = (checked: boolean) => {
    setPricingOptions({
      ...pricingOptions,
      isNationwide: checked
    });
  };

  const handleSubmit = () => {
    onSubmit(pricingOptions);
  };

  // Format a price with dollar sign
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };
  
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          {t({ english: "Choose a Plan", vietnamese: "Chọn một gói" })}
        </h2>
        <p className="text-muted-foreground">
          {t({
            english: "Select the right plan for your job posting needs",
            vietnamese: "Chọn gói phù hợp với nhu cầu đăng tin của bạn"
          })}
        </p>
      </div>

      <Tabs defaultValue="pricing" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="pricing">
            {t({ english: "Pricing Plans", vietnamese: "Các gói giá" })}
          </TabsTrigger>
          <TabsTrigger value="duration">
            {t({ english: "Duration & Options", vietnamese: "Thời hạn & Tùy chọn" })}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pricing" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Free Plan */}
            <Card className={`relative overflow-hidden transition-all ${
              pricingOptions.selectedPricingTier === 'free' ? 'border-primary ring-2 ring-primary/20' : ''
            }`}>
              {pricingOptions.isFirstPost && (
                <div className="absolute top-0 right-0 bg-primary text-white text-xs py-1 px-3 rounded-bl-lg">
                  {t({
                    english: "First Post Free",
                    vietnamese: "Đăng tin đầu tiên miễn phí"
                  })}
                </div>
              )}
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-slate-500" />
                  {t({ english: "Basic", vietnamese: "Cơ bản" })}
                </CardTitle>
                <div className="text-3xl font-bold mt-2">$0</div>
                <CardDescription>
                  {t({ 
                    english: "Get started with a simple job post",
                    vietnamese: "Bắt đầu với một bài đăng việc làm đơn giản"
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    {t({ english: "Standard visibility", vietnamese: "Hiển thị tiêu chuẩn" })}
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    {t({ english: "7 day listing", vietnamese: "Niêm yết 7 ngày" })}
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <Check className="h-4 w-4 mr-2 opacity-40" />
                    {t({ english: "Basic placement", vietnamese: "Vị trí cơ bản" })}
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={pricingOptions.selectedPricingTier === 'free' ? "default" : "outline"}
                  onClick={() => handleSelectionChange('free')}
                  disabled={!pricingOptions.isFirstPost}
                >
                  {pricingOptions.selectedPricingTier === 'free' ? 
                    t({ english: "Selected", vietnamese: "Đã chọn" }) :
                    t({ english: "Select", vietnamese: "Chọn" })
                  }
                </Button>
              </CardFooter>
            </Card>

            {/* Standard Plan */}
            <Card className={`relative overflow-hidden transition-all ${
              pricingOptions.selectedPricingTier === 'standard' ? 'border-primary ring-2 ring-primary/20' : ''
            }`}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-blue-500" />
                  {t({ english: "Standard", vietnamese: "Tiêu chuẩn" })}
                </CardTitle>
                <div className="text-3xl font-bold mt-2">$9.99<span className="text-sm text-muted-foreground">/mo</span></div>
                <CardDescription>
                  {t({
                    english: "Enhanced visibility for your job",
                    vietnamese: "Tăng cường hiển thị cho việc làm của bạn"
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    {t({ english: "Enhanced visibility", vietnamese: "Tăng cường hiển thị" })}
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    {t({ english: "30 day listing", vietnamese: "Niêm yết 30 ngày" })}
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    {t({ english: "Higher search ranking", vietnamese: "Xếp hạng tìm kiếm cao hơn" })}
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={pricingOptions.selectedPricingTier === 'standard' ? "default" : "outline"}
                  onClick={() => handleSelectionChange('standard')}
                >
                  {pricingOptions.selectedPricingTier === 'standard' ? 
                    t({ english: "Selected", vietnamese: "Đã chọn" }) :
                    t({ english: "Select", vietnamese: "Chọn" })
                  }
                </Button>
              </CardFooter>
            </Card>

            {/* Premium Plan - Popular */}
            <Card className={`relative overflow-hidden transition-all ${
              pricingOptions.selectedPricingTier === 'premium' ? 'border-primary ring-2 ring-primary/20' : 'border-muted-foreground/20'
            }`}>
              <div className="absolute top-0 right-0 bg-yellow-500 text-white text-xs py-1 px-3 rounded-bl-lg">
                {t({ english: "Popular", vietnamese: "Phổ biến" })}
              </div>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
                  {t({ english: "Premium", vietnamese: "Cao cấp" })}
                </CardTitle>
                <div className="text-3xl font-bold mt-2">$19.99<span className="text-sm text-muted-foreground">/mo</span></div>
                <CardDescription>
                  {t({
                    english: "Maximum exposure for your job post",
                    vietnamese: "Phơi bày tối đa cho bài đăng việc làm của bạn"
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    {t({ english: "Featured listing", vietnamese: "Danh sách nổi bật" })}
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    {t({ english: "60 day listing", vietnamese: "Niêm yết 60 ngày" })}
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    {t({ english: "Top search ranking", vietnamese: "Xếp hạng tìm kiếm hàng đầu" })}
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    {t({ english: "Social media promotion", vietnamese: "Quảng bá trên mạng xã hội" })}
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={pricingOptions.selectedPricingTier === 'premium' ? "default" : "outline"}
                  onClick={() => handleSelectionChange('premium')}
                >
                  {pricingOptions.selectedPricingTier === 'premium' ? 
                    t({ english: "Selected", vietnamese: "Đã chọn" }) :
                    t({ english: "Select", vietnamese: "Chọn" })
                  }
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-8">
            <Button 
              size="lg" 
              className="w-full md:w-auto"
              onClick={() => document.querySelector('[data-value="duration"]')?.dispatchEvent(new MouseEvent('click'))}
            >
              {t({ english: "Continue to Duration & Options", vietnamese: "Tiếp tục đến Thời hạn & Tùy chọn" })}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="duration" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {t({ english: "Listing Duration", vietnamese: "Thời hạn niêm yết" })}
                </CardTitle>
                <CardDescription>
                  {t({
                    english: "Choose how long your job posting will be visible",
                    vietnamese: "Chọn thời gian bài đăng việc làm của bạn sẽ hiển thị"
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={duration.toString()} 
                  onValueChange={handleDurationChange} 
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between space-x-2 border rounded-md p-3">
                    <div className="flex items-center space-x-2">
                      <Radio value="1" id="duration-1" />
                      <Label htmlFor="duration-1">{t({ english: "1 Month", vietnamese: "1 Tháng" })}</Label>
                    </div>
                    <div className="text-sm">
                      {formatPrice(priceData.basePrice)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between space-x-2 border rounded-md p-3">
                    <div className="flex items-center space-x-2">
                      <Radio value="3" id="duration-3" />
                      <Label htmlFor="duration-3">
                        {t({ english: "3 Months", vietnamese: "3 Tháng" })}
                        <span className="ml-2 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">10% off</span>
                      </Label>
                    </div>
                    <div className="text-sm">
                      {formatPrice(priceData.basePrice * 3 * 0.9)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between space-x-2 border rounded-md p-3">
                    <div className="flex items-center space-x-2">
                      <Radio value="6" id="duration-6" />
                      <Label htmlFor="duration-6">
                        {t({ english: "6 Months", vietnamese: "6 Tháng" })}
                        <span className="ml-2 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">15% off</span>
                      </Label>
                    </div>
                    <div className="text-sm">
                      {formatPrice(priceData.basePrice * 6 * 0.85)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between space-x-2 border rounded-md p-3">
                    <div className="flex items-center space-x-2">
                      <Radio value="12" id="duration-12" />
                      <Label htmlFor="duration-12">
                        {t({ english: "12 Months", vietnamese: "12 Tháng" })}
                        <span className="ml-2 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">20% off</span>
                      </Label>
                    </div>
                    <div className="text-sm">
                      {formatPrice(priceData.basePrice * 12 * 0.8)}
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  {t({ english: "Additional Options", vietnamese: "Tùy chọn bổ sung" })}
                </CardTitle>
                <CardDescription>
                  {t({
                    english: "Enhance your job posting with these options",
                    vietnamese: "Nâng cao bài đăng việc làm của bạn với các tùy chọn này"
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-renew">
                      {t({ english: "Auto-Renew", vietnamese: "Tự động gia hạn" })}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {t({
                        english: "Automatically renew your listing when it expires",
                        vietnamese: "Tự động gia hạn danh sách của bạn khi hết hạn"
                      })}
                    </p>
                  </div>
                  <Switch 
                    id="auto-renew" 
                    checked={pricingOptions.autoRenew} 
                    onCheckedChange={handleAutoRenewChange}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Label htmlFor="nationwide">
                        {t({ english: "Nationwide Listing", vietnamese: "Niêm yết toàn quốc" })}
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3.5 w-3.5 ml-1.5 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            {t({
                              english: "Show your job nationwide instead of just locally",
                              vietnamese: "Hiển thị việc làm của bạn trên toàn quốc thay vì chỉ ở địa phương"
                            })}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {t({
                        english: "Reach candidates across the country (+$5)",
                        vietnamese: "Tiếp cận ứng viên trên cả nước (+$5)"
                      })}
                    </p>
                  </div>
                  <Switch 
                    id="nationwide" 
                    checked={pricingOptions.isNationwide} 
                    onCheckedChange={handleNationwideChange}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle>
                {t({ english: "Order Summary", vietnamese: "Tóm tắt đơn hàng" })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>
                    {t({ english: "Plan", vietnamese: "Gói" })}:
                  </span>
                  <span className="font-medium">
                    {pricingOptions.selectedPricingTier === 'free' ? 
                      t({ english: "Basic (Free)", vietnamese: "Cơ bản (Miễn phí)" }) :
                      pricingOptions.selectedPricingTier === 'standard' ?
                      t({ english: "Standard", vietnamese: "Tiêu chuẩn" }) :
                      t({ english: "Premium", vietnamese: "Cao cấp" })
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>
                    {t({ english: "Duration", vietnamese: "Thời hạn" })}:
                  </span>
                  <span className="font-medium">
                    {duration === 1 ? 
                      t({ english: "1 Month", vietnamese: "1 Tháng" }) :
                      t({ english: `${duration} Months`, vietnamese: `${duration} Tháng` })
                    }
                  </span>
                </div>
                {pricingOptions.isNationwide && (
                  <div className="flex justify-between">
                    <span>
                      {t({ english: "Nationwide Listing", vietnamese: "Niêm yết toàn quốc" })}:
                    </span>
                    <span className="font-medium">+$5.00</span>
                  </div>
                )}
                {pricingOptions.autoRenew && (
                  <div className="flex justify-between">
                    <span>
                      {t({ english: "Auto-Renew", vietnamese: "Tự động gia hạn" })}:
                    </span>
                    <span className="font-medium">
                      {t({ english: "Enabled", vietnamese: "Đã bật" })}
                    </span>
                  </div>
                )}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-medium text-lg">
                    <span>
                      {t({ english: "Total", vietnamese: "Tổng cộng" })}:
                    </span>
                    <span>
                      {pricingOptions.isFirstPost && pricingOptions.selectedPricingTier === 'free'
                        ? '$0.00'
                        : formatPrice(priceData.finalPrice)
                      }
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                size="lg" 
                onClick={handleSubmit} 
                disabled={isLoading}
              >
                {isLoading ? 
                  t({ english: "Processing...", vietnamese: "Đang xử lý..." }) :
                  t({ english: "Proceed to Payment", vietnamese: "Tiến hành thanh toán" })
                }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobPricingStep;
