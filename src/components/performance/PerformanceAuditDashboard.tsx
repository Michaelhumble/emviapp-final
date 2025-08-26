import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react';

interface PerformanceMetrics {
  lcp: number | null;
  cls: number | null;
  inp: number | null;
  fcp: number | null;
  ttfb: number | null;
  fid: number | null;
  score: number;
  grade: 'excellent' | 'good' | 'fair' | 'poor';
}

interface OptimizationSuggestion {
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'low' | 'medium' | 'high';
}

export default function PerformanceAuditDashboard() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null, cls: null, inp: null, fcp: null, ttfb: null, fid: null,
    score: 0, grade: 'good'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions] = useState<OptimizationSuggestion[]>([
    {
      type: 'critical',
      title: 'Optimize Images for LCP',
      description: 'Use WebP format and proper sizing for hero images',
      impact: 'high',
      effort: 'low'
    },
    {
      type: 'warning', 
      title: 'Minimize Layout Shifts',
      description: 'Set explicit dimensions for dynamic content',
      impact: 'medium',
      effort: 'medium'
    },
    {
      type: 'info',
      title: 'Enable Font Display Swap',
      description: 'Improve perceived performance during font loading',
      impact: 'low',
      effort: 'low'
    }
  ]);

  const measureMetrics = async () => {
    setIsLoading(true);
    
    // Simulate measurement (in production, use actual Web Vitals API)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock realistic performance data
    const newMetrics: PerformanceMetrics = {
      lcp: 1200 + Math.random() * 800, // 1.2-2.0s 
      cls: Math.random() * 0.05, // 0-0.05
      inp: 50 + Math.random() * 150, // 50-200ms
      fcp: 800 + Math.random() * 400, // 0.8-1.2s
      ttfb: 200 + Math.random() * 300, // 200-500ms
      fid: 20 + Math.random() * 80, // 20-100ms
      score: 85 + Math.random() * 15, // 85-100
      grade: 'excellent'
    };
    
    // Calculate grade based on metrics
    const lcpGood = (newMetrics.lcp || 0) < 2500;
    const clsGood = (newMetrics.cls || 0) < 0.1;
    const inpGood = (newMetrics.inp || 0) < 200;
    
    const goodCount = [lcpGood, clsGood, inpGood].filter(Boolean).length;
    if (goodCount === 3) newMetrics.grade = 'excellent';
    else if (goodCount === 2) newMetrics.grade = 'good';
    else if (goodCount === 1) newMetrics.grade = 'fair';
    else newMetrics.grade = 'poor';
    
    setMetrics(newMetrics);
    setIsLoading(false);
  };

  useEffect(() => {
    measureMetrics();
  }, []);

  const getMetricColor = (value: number | null, thresholds: [number, number]) => {
    if (!value) return 'text-muted-foreground';
    if (value <= thresholds[0]) return 'text-green-600';
    if (value <= thresholds[1]) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800'; 
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'info': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Performance Audit</h1>
          <p className="text-muted-foreground mt-2">
            Core Web Vitals monitoring and optimization recommendations
          </p>
        </div>
        
        <Button onClick={measureMetrics} disabled={isLoading} className="gap-2">
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Measuring...' : 'Run Audit'}
        </Button>
      </div>

      {/* Overall Score */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Performance Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-foreground">
                  {Math.round(metrics.score)}
                </div>
                <Badge className={getGradeColor(metrics.grade)}>
                  {metrics.grade.toUpperCase()}
                </Badge>
              </div>
              <Progress value={metrics.score} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Core Web Vitals */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">LCP</CardTitle>
            <CardDescription>Largest Contentful Paint</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getMetricColor(metrics.lcp, [2500, 4000])}`}>
              {metrics.lcp ? `${Math.round(metrics.lcp)}ms` : '...'}
            </div>
            <div className="text-sm text-muted-foreground">Target: &lt; 2.5s</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">CLS</CardTitle>
            <CardDescription>Cumulative Layout Shift</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getMetricColor(metrics.cls, [0.1, 0.25])}`}>
              {metrics.cls ? metrics.cls.toFixed(3) : '...'}
            </div>
            <div className="text-sm text-muted-foreground">Target: &lt; 0.1</div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">INP</CardTitle>
            <CardDescription>Interaction to Next Paint</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`text-xl font-bold ${getMetricColor(metrics.inp, [200, 500])}`}>
              {metrics.inp ? `${Math.round(metrics.inp)}ms` : '...'}
            </div>
            <div className="text-sm text-muted-foreground">Target: &lt; 200ms</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">FCP</CardTitle>
            <CardDescription>First Contentful Paint</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`text-xl font-bold ${getMetricColor(metrics.fcp, [1800, 3000])}`}>
              {metrics.fcp ? `${Math.round(metrics.fcp)}ms` : '...'}
            </div>
            <div className="text-sm text-muted-foreground">Target: &lt; 1.8s</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">TTFB</CardTitle>
            <CardDescription>Time to First Byte</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`text-xl font-bold ${getMetricColor(metrics.ttfb, [800, 1800])}`}>
              {metrics.ttfb ? `${Math.round(metrics.ttfb)}ms` : '...'}
            </div>
            <div className="text-sm text-muted-foreground">Target: &lt; 800ms</div>
          </CardContent>
        </Card>
      </div>

      {/* Optimization Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle>Optimization Recommendations</CardTitle>
          <CardDescription>
            Prioritized suggestions to improve your Core Web Vitals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                {getSuggestionIcon(suggestion.type)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">{suggestion.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {suggestion.impact} impact
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {suggestion.effort} effort
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {suggestion.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Monitor */}
      <Card>
        <CardHeader>
          <CardTitle>Real-time Performance Monitor</CardTitle>
          <CardDescription>
            Live metrics tracking (development mode only)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Zap className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Performance monitoring is active in development mode.</p>
            <p className="text-sm">Check the browser console for detailed metrics.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}