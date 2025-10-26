import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Calculator, TrendingUp, DollarSign } from 'lucide-react';
import {
  CALCULATOR_ROLES,
  CALCULATOR_CITIES,
  calculateMonthlyIncome,
  getComparisonToAverage
} from '@/data/salary-calculator-data';

export default function SalaryCalculator() {
  const [role, setRole] = useState('');
  const [city, setCity] = useState('');
  const [basePayPerHour, setBasePayPerHour] = useState('25');
  const [hoursPerWeek, setHoursPerWeek] = useState('40');
  const [avgTipsPerDay, setAvgTipsPerDay] = useState('50');
  const [commissionPercent, setCommissionPercent] = useState('10');

  const results = calculateMonthlyIncome(
    parseFloat(basePayPerHour) || 0,
    parseFloat(hoursPerWeek) || 0,
    parseFloat(avgTipsPerDay) || 0,
    parseFloat(commissionPercent) || 0
  );

  const comparison = role && city ? getComparisonToAverage(role, city, results.totalMonthly) : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "EmviApp Salary Calculator",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "url": "https://www.emvi.app/salary-calculator",
    "publisher": {
      "@type": "Organization",
      "name": "EmviApp"
    },
    "description": "Calculate your estimated monthly income as a beauty professional. Get accurate salary projections for nail technicians, hair stylists, and more.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <Helmet>
        <title>Salary Calculator | EmviApp - Beauty Professional Income Estimator</title>
        <meta name="description" content="Calculate your estimated monthly income as a beauty professional. Free salary calculator for nail technicians, hair stylists, barbers, estheticians, and salon managers." />
        <link rel="canonical" href="https://www.emvi.app/salary-calculator" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <Calculator className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Beauty Professional Salary Calculator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate your estimated monthly income based on your hourly rate, tips, commission, and hours worked. Get personalized salary insights for your city and role.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card className="p-6 md:p-8 space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Your Information</h2>
              
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {CALCULATOR_ROLES.map((r) => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger id="city">
                    <SelectValue placeholder="Select your city" />
                  </SelectTrigger>
                  <SelectContent>
                    {CALCULATOR_CITIES.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="basePay">Base Pay (per hour)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="basePay"
                    type="number"
                    min="0"
                    step="0.5"
                    value={basePayPerHour}
                    onChange={(e) => setBasePayPerHour(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hours">Hours Per Week</Label>
                <Input
                  id="hours"
                  type="number"
                  min="0"
                  max="168"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tips">Average Tips (per day)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="tips"
                    type="number"
                    min="0"
                    step="5"
                    value={avgTipsPerDay}
                    onChange={(e) => setAvgTipsPerDay(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="commission">Commission (%)</Label>
                <Input
                  id="commission"
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={commissionPercent}
                  onChange={(e) => setCommissionPercent(e.target.value)}
                />
              </div>
            </Card>

            {/* Results Panel */}
            <div className="space-y-6">
              <Card className="p-6 md:p-8 bg-gradient-to-br from-primary/5 to-primary/10">
                <h2 className="text-2xl font-semibold mb-6">Estimated Monthly Income</h2>
                
                <div className="mb-8" role="status" aria-live="polite">
                  <div className="text-5xl font-bold text-primary mb-2">
                    ${results.totalMonthly.toLocaleString()}
                  </div>
                  <p className="text-muted-foreground">per month</p>
                </div>

                <div className="space-y-4 border-t pt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Base Pay</span>
                    <span className="font-semibold">${results.baseMonthly.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Tips</span>
                    <span className="font-semibold">${results.tipsMonthly.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Commission Bonus</span>
                    <span className="font-semibold">${results.commissionBonus.toLocaleString()}</span>
                  </div>
                </div>

                {comparison && (
                  <div className="mt-6 p-4 bg-background/50 rounded-xl border">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">
                          This is {comparison.percentDiff}% {comparison.higherOrLower} than the average for {role} in {city}.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </Card>

              {/* CTA Card */}
              {role && city && (
                <Card className="p-6 md:p-8 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
                  <h3 className="text-xl font-semibold mb-3">Want more {role} jobs in {city}?</h3>
                  <p className="text-muted-foreground mb-4">
                    Get instant alerts when new opportunities matching your criteria are posted.
                  </p>
                  <Button asChild className="w-full">
                    <Link to={`/job-alerts?role=${encodeURIComponent(role)}&city=${encodeURIComponent(city)}`}>
                      Get Job Alerts
                    </Link>
                  </Button>
                </Card>
              )}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center space-y-4">
            <p className="text-muted-foreground">
              Ready to explore opportunities?
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild variant="outline" size="lg">
                <Link to="/jobs">Browse All Jobs</Link>
              </Button>
              <Button asChild size="lg">
                <Link to="/signup">Post a Job</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
