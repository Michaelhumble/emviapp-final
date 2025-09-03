import React, { useState, useCallback, useEffect, Suspense, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation, Translation } from '@/hooks/useTranslation';
import { Calculator, RotateCcw, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import { flags } from '@/utils/featureFlags';

// Lazy load the chart component
const MiniChart = React.lazy(() => import('./MiniChart'));

const EarningsCalculator = () => {
  const { t } = useTranslation();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [isChartInView, setIsChartInView] = useState(false);
  
  // Using integer math for precision (cents)
  const [visitorsPerMonth, setVisitorsPerMonth] = useState(1000);
  const [ctrPercent, setCtrPercent] = useState(5); // 5%
  const [conversionPercent, setConversionPercent] = useState(3); // 3%
  const [avgOrderValueCents, setAvgOrderValueCents] = useState(2999); // $29.99 in cents
  const [commissionPercent] = useState(30); // Fixed 30%

  // IntersectionObserver for lazy loading chart
  useEffect(() => {
    if (!flags.AFFILIATE_LUX_ENABLE || !chartContainerRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isChartInView) {
            setIsChartInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(chartContainerRef.current);

    return () => observer.disconnect();
  }, [isChartInView]);

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

  // Update CSS custom property for range progress
  useEffect(() => {
    document.documentElement.style.setProperty('--range-progress', `${(visitorsPerMonth / 50000) * 100}%`);
  }, [visitorsPerMonth]);

  return (
    <section id="calculator" className="section-premium bg-gradient-to-b from-muted/20 via-background to-muted/10">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="inline-flex items-center gap-4 bg-primary/10 rounded-full px-8 py-4 mb-8">
            <Calculator className="w-6 h-6 text-primary" />
            <span className="text-lg font-semibold text-primary">
              {t({ english: "Earnings Calculator", vietnamese: "Máy tính thu nhập" })}
            </span>
          </div>
          <h2 className="text-section-title mb-8 max-w-4xl mx-auto">
            {t({ english: "Calculate Your Potential Earnings", vietnamese: "Tính toán thu nhập tiềm năng của bạn" })}
          </h2>
          <p className="text-body-large text-muted-foreground max-w-4xl mx-auto font-medium">
            {t({ 
              english: "See how much you could earn based on your audience and engagement with precise calculations",
              vietnamese: "Xem bạn có thể kiếm được bao nhiều dựa trên khán giả và mức độ tương tác của bạn với tính toán chính xác"
            })}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="calculator-premium max-w-6xl mx-auto p-12 space-y-16">
            <CardHeader className="text-center pb-0">
              <CardTitle className="text-3xl font-bold mb-4">
                {t({ english: "Interactive Earnings Calculator", vietnamese: "Máy tính thu nhập tương tác" })}
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t({ 
                  english: "Estimates based on industry-standard conversion rates and our transparent commission structure",
                  vietnamese: "Ước tính dựa trên tỷ lệ chuyển đổi tiêu chuẩn ngành và cơ cấu hoa hồng minh bạch của chúng tôi"
                })}
              </CardDescription>
              {/* Premium Spark Line */}
              <div className="spark-line mt-6 mx-auto w-32"></div>
            </CardHeader>
            
            <CardContent className="space-y-12 p-0">
              {/* Premium Presets */}
              <div className="flex flex-wrap gap-4 justify-center">
                {presets.map((preset, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="lg"
                    className="rounded-2xl px-8 py-4 text-lg font-semibold border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
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
                  size="lg"
                  className="rounded-2xl px-8 py-4 text-lg font-semibold hover:bg-muted/80 transition-all duration-300"
                  onClick={handleReset}
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  {t({ english: "Reset", vietnamese: "Đặt lại" })}
                </Button>
              </div>

              <div className="grid lg:grid-cols-2 gap-16">
                {/* Premium Input Controls */}
                <div className="space-y-10">
                  <div>
                    <label className="block text-xl font-bold mb-6 text-foreground">
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
                      className="range-premium w-full h-4"
                    />
                    <div className="flex justify-between text-base font-semibold text-muted-foreground mt-4">
                      <span>100</span>
                      <span>50K</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xl font-bold mb-6 text-foreground">
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
                      className="range-premium w-full h-4"
                    />
                    <div className="flex justify-between text-base font-semibold text-muted-foreground mt-4">
                      <span>1%</span>
                      <span>15%</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xl font-bold mb-6 text-foreground">
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
                      className="range-premium w-full h-4"
                    />
                    <div className="flex justify-between text-base font-semibold text-muted-foreground mt-4">
                      <span>1%</span>
                      <span>10%</span>
                    </div>
                  </div>
                </div>

                {/* Premium Results Display */}
                <div className="bg-gradient-to-br from-primary/8 via-primary/5 to-accent/8 rounded-3xl p-12 border-2 border-primary/20 shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50 rounded-3xl"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-10">
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 shadow-lg">
                        <TrendingUp className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">
                        {t({ english: "Your Potential Earnings", vietnamese: "Thu nhập tiềm năng của bạn" })}
                      </h3>
                    </div>
                    
                    <div className="space-y-8">
                      <div className="text-center">
                        <motion.div 
                          className="text-7xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4"
                          key={stats.monthlyEarnings}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3, type: "spring" }}
                        >
                          ${stats.monthlyEarnings.toFixed(2)}
                        </motion.div>
                        <div className="text-xl font-semibold text-muted-foreground mb-4">
                          {t({ english: "Estimated Monthly", vietnamese: "Ước tính hàng tháng" })}
                        </div>
                        <div className="spark-line mx-auto max-w-40" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6 pt-8 border-t-2 border-primary/20">
                        <div className="text-center p-6 bg-white/40 rounded-2xl backdrop-blur-sm border border-white/50">
                          <div className="text-3xl font-bold text-foreground">{stats.clicks}</div>
                          <div className="text-base font-medium text-muted-foreground">
                            {t({ english: "Monthly Clicks", vietnamese: "Lượt nhấp/tháng" })}
                          </div>
                        </div>
                        <div className="text-center p-6 bg-white/40 rounded-2xl backdrop-blur-sm border border-white/50">
                          <div className="text-3xl font-bold text-foreground">{stats.conversions}</div>
                          <div className="text-base font-medium text-muted-foreground">
                            {t({ english: "Conversions", vietnamese: "Chuyển đổi" })}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center pt-6">
                        <div className="text-2xl font-bold text-muted-foreground">
                          ${stats.yearlyEarnings.toFixed(0)} {t({ english: "yearly potential", vietnamese: "tiềm năng hàng năm" })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center text-base text-muted-foreground bg-muted/30 rounded-2xl p-8 max-w-4xl mx-auto border border-muted/50">
                <p className="font-medium">
                  {t({ 
                    english: "* Professional estimates only. Actual payouts depend on verified conversions and may vary based on market conditions and performance metrics.",
                    vietnamese: "* Chỉ là ước tính chuyên nghiệp. Thanh toán thực tế phụ thuộc vào các chuyển đổi đã được xác minh và có thể thay đổi tùy thuộc vào điều kiện thị trường và chỉ số hiệu suất."
                  })}
                </p>
              </div>
            </CardContent>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EarningsCalculator;