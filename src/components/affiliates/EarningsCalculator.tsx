import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation, Translation } from '@/hooks/useTranslation';
import { Calculator, RotateCcw, TrendingUp } from 'lucide-react';

const EarningsCalculator = () => {
  const { t } = useTranslation();
  
  // Using integer math for precision (cents)
  const [visitorsPerMonth, setVisitorsPerMonth] = useState(1000);
  const [ctrPercent, setCtrPercent] = useState(5); // 5%
  const [conversionPercent, setConversionPercent] = useState(3); // 3%
  const [avgOrderValueCents, setAvgOrderValueCents] = useState(2999); // $29.99 in cents
  const [commissionPercent] = useState(30); // Fixed 30%

  const calculateEarnings = useCallback(() => {
    // All calculations in minor units (cents) to avoid floating point issues
    const clicks = Math.floor((visitorsPerMonth * ctrPercent) / 100);
    const conversions = Math.floor((clicks * conversionPercent) / 100);
    const totalRevenueCents = conversions * avgOrderValueCents;
    const commissionCents = Math.floor((totalRevenueCents * commissionPercent) / 100);
    
    return {
      clicks,
      conversions,
      monthlyEarnings: commissionCents / 100, // Convert back to dollars for display
      yearlyEarnings: (commissionCents * 12) / 100
    };
  }, [visitorsPerMonth, ctrPercent, conversionPercent, avgOrderValueCents, commissionPercent]);

  const stats = calculateEarnings();

  const handleCalculatorChange = () => {
    // Light GA4 event dispatch (guarded)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'affiliate_lp_calculator_change', {
        event_category: 'affiliate',
        visitors: visitorsPerMonth,
        ctr: ctrPercent,
        conversion: conversionPercent,
        estimated_earnings: stats.monthlyEarnings
      });
    }
  };

  const handleReset = () => {
    setVisitorsPerMonth(1000);
    setCtrPercent(5);
    setConversionPercent(3);
    setAvgOrderValueCents(2999);
  };

  const presets = [
    { label: t({ english: "Beginner", vietnamese: "Người mới" }), visitors: 500, ctr: 3, conversion: 2 },
    { label: t({ english: "Intermediate", vietnamese: "Trung cấp" }), visitors: 2000, ctr: 5, conversion: 4 },
    { label: t({ english: "Advanced", vietnamese: "Nâng cao" }), visitors: 10000, ctr: 8, conversion: 6 }
  ];

  return (
    <section id="calculator" className="py-20 bg-gradient-to-b from-muted/10 to-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <Calculator className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {t({ english: "Earnings Calculator", vietnamese: "Máy tính thu nhập" })}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t({ english: "Calculate Your Potential Earnings", vietnamese: "Tính toán thu nhập tiềm năng của bạn" })}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t({ 
              english: "See how much you could earn based on your audience and engagement",
              vietnamese: "Xem bạn có thể kiếm được bao nhiều dựa trên khán giả và mức độ tương tác của bạn"
            })}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <Card className="max-w-4xl mx-auto shadow-xl border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl">
                {t({ english: "Earnings Calculator", vietnamese: "Máy tính thu nhập" })}
              </CardTitle>
              <CardDescription className="text-base">
                {t({ 
                  english: "Estimates based on average conversion rates and commission structure",
                  vietnamese: "Ước tính dựa trên tỷ lệ chuyển đổi trung bình và cơ cấu hoa hồng"
                })}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-8">
              {/* Presets */}
              <div className="flex flex-wrap gap-2 justify-center">
                {presets.map((preset, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    onClick={() => {
                      setVisitorsPerMonth(preset.visitors);
                      setCtrPercent(preset.ctr);
                      setConversionPercent(preset.conversion);
                      handleCalculatorChange();
                    }}
                  >
                    {preset.label}
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                  onClick={handleReset}
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  {t({ english: "Reset", vietnamese: "Đặt lại" })}
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Input Controls */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      {t({ english: "Monthly Visitors", vietnamese: "Khách truy cập hàng tháng" })}: {visitorsPerMonth.toLocaleString()}
                    </label>
                    <input 
                      type="range" 
                      min="100" 
                      max="50000" 
                      step="100"
                      value={visitorsPerMonth}
                      onChange={(e) => {
                        setVisitorsPerMonth(parseInt(e.target.value));
                        handleCalculatorChange();
                      }}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>100</span>
                      <span>50K</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      {t({ english: "Click-through Rate", vietnamese: "Tỷ lệ nhấp chuột" })}: {ctrPercent}%
                    </label>
                    <input 
                      type="range" 
                      min="1" 
                      max="15" 
                      step="0.5"
                      value={ctrPercent}
                      onChange={(e) => {
                        setCtrPercent(parseFloat(e.target.value));
                        handleCalculatorChange();
                      }}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>1%</span>
                      <span>15%</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      {t({ english: "Conversion Rate", vietnamese: "Tỷ lệ chuyển đổi" })}: {conversionPercent}%
                    </label>
                    <input 
                      type="range" 
                      min="1" 
                      max="10" 
                      step="0.5"
                      value={conversionPercent}
                      onChange={(e) => {
                        setConversionPercent(parseFloat(e.target.value));
                        handleCalculatorChange();
                      }}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>1%</span>
                      <span>10%</span>
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">
                      {t({ english: "Your Potential Earnings", vietnamese: "Thu nhập tiềm năng của bạn" })}
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-1">
                        ${stats.monthlyEarnings.toFixed(2)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t({ english: "Estimated Monthly", vietnamese: "Ước tính hàng tháng" })}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-foreground">{stats.clicks}</div>
                        <div className="text-xs text-muted-foreground">
                          {t({ english: "Monthly Clicks", vietnamese: "Lượt nhấp/tháng" })}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-foreground">{stats.conversions}</div>
                        <div className="text-xs text-muted-foreground">
                          {t({ english: "Conversions", vietnamese: "Chuyển đổi" })}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center pt-2">
                      <div className="text-lg font-semibold text-muted-foreground">
                        ${stats.yearlyEarnings.toFixed(0)} {t({ english: "yearly potential", vietnamese: "tiềm năng hàng năm" })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center text-xs text-muted-foreground bg-muted/20 rounded-lg p-4">
                <p>
                  {t({ 
                    english: "* Estimates only. Actual payouts depend on verified conversions and may vary based on market conditions.",
                    vietnamese: "* Chỉ là ước tính. Thanh toán thực tế phụ thuộc vào các chuyển đổi đã được xác minh và có thể thay đổi tùy thuộc vào điều kiện thị trường."
                  })}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default EarningsCalculator;