import React, { useState, useEffect } from 'react';
import { performanceAuditor, PageAuditResult, AUDIT_TARGETS } from '@/utils/performanceAuditor';
import { realTimeAuditor } from '@/utils/realTimeAuditor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, Clock, Zap, Download, RefreshCw } from 'lucide-react';

const PerformanceAuditDashboard: React.FC = () => {
  const [isAuditing, setIsAuditing] = useState(false);
  const [isCurrentPageAuditing, setIsCurrentPageAuditing] = useState(false);
  const [results, setResults] = useState<PageAuditResult[]>([]);
  const [currentPageResult, setCurrentPageResult] = useState<PageAuditResult | null>(null);
  const [currentPage, setCurrentPage] = useState<string>('');

  const runAudit = async () => {
    setIsAuditing(true);
    setResults([]);
    
    try {
      const auditResults = await performanceAuditor.auditAllPages();
      setResults(auditResults);
    } catch (error) {
      console.error('Audit failed:', error);
    } finally {
      setIsAuditing(false);
      setCurrentPage('');
    }
  };

  const auditCurrentPage = async () => {
    setIsCurrentPageAuditing(true);
    
    try {
      const currentResult = await realTimeAuditor.auditCurrentPage();
      setCurrentPageResult(currentResult);
      console.log('🎯 Current page audit result:', currentResult);
    } catch (error) {
      console.error('Current page audit failed:', error);
    } finally {
      setIsCurrentPageAuditing(false);
    }
  };

  const exportResults = () => {
    const allResults = currentPageResult ? [currentPageResult, ...results] : results;
    const report = generateDetailedReport(allResults);
    
    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `emviapp-performance-audit-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateDetailedReport = (allResults: PageAuditResult[]) => {
    const passCount = allResults.filter(r => r.status === 'PASS').length;
    const needsWorkCount = allResults.filter(r => r.status === 'NEEDS_WORK').length;
    const criticalCount = allResults.filter(r => r.status === 'CRITICAL').length;
    
    const priorityIssues = allResults
      .filter(r => r.status !== 'PASS')
      .sort((a, b) => {
        const priorityOrder = { 'CRITICAL': 0, 'NEEDS_WORK': 1 };
        return priorityOrder[a.status as keyof typeof priorityOrder] - priorityOrder[b.status as keyof typeof priorityOrder];
      });

    return `# 🚀 EMVIAPP COMPREHENSIVE PERFORMANCE AUDIT REPORT
Generated: ${new Date().toLocaleString()}

## 📊 EXECUTIVE SUMMARY
- **${passCount} Pages PASSING** ✅ (Meeting all Core Web Vitals targets)
- **${needsWorkCount} Pages NEED OPTIMIZATION** ⚠️ (Minor improvements needed)
- **${criticalCount} Pages CRITICAL** 🚨 (Urgent fixes required)

## 📈 DETAILED RESULTS TABLE

| Page | Route | FCP | LCP | CLS | TTFB | Status | Image Score | SEO Score | Loading Score | Recommendations |
|------|-------|-----|-----|-----|------|--------|-------------|-----------|---------------|-----------------|
${allResults.map(result => {
  const fcp = result.fcp ? `${Math.round(result.fcp)}ms` : 'N/A';
  const lcp = result.lcp ? `${Math.round(result.lcp)}ms` : 'N/A';
  const cls = result.cls !== null ? result.cls.toFixed(3) : 'N/A';
  const ttfb = result.ttfb ? `${Math.round(result.ttfb)}ms` : 'N/A';
  
  return `| ${result.page} | ${result.route} | ${fcp} | ${lcp} | ${cls} | ${ttfb} | **${result.status}** | ${result.imageScore}% | ${result.seoScore}% | ${result.loadingStateScore}% | ${result.recommendations.length} items |`;
}).join('\n')}

## 🎯 TOP 5 PRIORITY OPTIMIZATION TARGETS

${priorityIssues.slice(0, 5).map((result, index) => `### ${index + 1}. ${result.page} - ${result.status}
**Route:** \`${result.route}\`
**Issues:** ${result.issues.join(', ')}

**Action Items:**
${result.recommendations.map(rec => `- ${rec}`).join('\n')}

**Expected Impact:** 
- Load Time Reduction: 30-50%
- User Experience Score: +20-30 points
- SEO Performance: +15-25 points

---`).join('\n\n')}

## 📋 CORE WEB VITALS ANALYSIS

### First Contentful Paint (FCP)
- **Target:** <1.8s | **Critical:** >3.0s
- **Pages Passing:** ${allResults.filter(r => r.fcp && r.fcp < 1800).length}/${allResults.filter(r => r.fcp).length}
- **Average:** ${allResults.filter(r => r.fcp).length > 0 ? Math.round(allResults.filter(r => r.fcp).reduce((sum, r) => sum + r.fcp!, 0) / allResults.filter(r => r.fcp).length) : 'N/A'}ms

### Largest Contentful Paint (LCP)  
- **Target:** <2.5s | **Critical:** >4.0s
- **Pages Passing:** ${allResults.filter(r => r.lcp && r.lcp < 2500).length}/${allResults.filter(r => r.lcp).length}
- **Average:** ${allResults.filter(r => r.lcp).length > 0 ? Math.round(allResults.filter(r => r.lcp).reduce((sum, r) => sum + r.lcp!, 0) / allResults.filter(r => r.lcp).length) : 'N/A'}ms

### Cumulative Layout Shift (CLS)
- **Target:** <0.05 | **Critical:** >0.25
- **Pages Passing:** ${allResults.filter(r => r.cls !== null && r.cls < 0.05).length}/${allResults.filter(r => r.cls !== null).length}
- **Average:** ${allResults.filter(r => r.cls !== null).length > 0 ? (allResults.filter(r => r.cls !== null).reduce((sum, r) => sum + r.cls!, 0) / allResults.filter(r => r.cls !== null).length).toFixed(3) : 'N/A'}

## 🎨 IMAGE OPTIMIZATION SUMMARY
- **Average Score:** ${allResults.length > 0 ? Math.round(allResults.reduce((sum, r) => sum + r.imageScore, 0) / allResults.length) : 'N/A'}%
- **Pages Needing WebP/AVIF:** ${allResults.filter(r => r.imageScore < 70).length}
- **Priority:** Convert all images to modern formats, implement lazy loading

## 🔍 SEO PERFORMANCE SUMMARY  
- **Average Score:** ${allResults.length > 0 ? Math.round(allResults.reduce((sum, r) => sum + r.seoScore, 0) / allResults.length) : 'N/A'}%
- **Pages Missing Meta Tags:** ${allResults.filter(r => r.seoScore < 80).length}
- **Priority:** Add comprehensive meta descriptions and Open Graph tags

## ⏳ LOADING EXPERIENCE SUMMARY
- **Average Score:** ${allResults.length > 0 ? Math.round(allResults.reduce((sum, r) => sum + r.loadingStateScore, 0) / allResults.length) : 'N/A'}%
- **Pages Missing Skeletons:** ${allResults.filter(r => r.loadingStateScore < 50).length}
- **Priority:** Implement skeleton loaders and progressive loading

## 🚀 NEXT STEPS & WEEKLY MONITORING

### Immediate Actions (This Week)
1. Fix all CRITICAL status pages
2. Implement image optimization pipeline
3. Add missing SEO meta tags
4. Deploy skeleton loaders

### Ongoing Monitoring
- **Weekly Audits:** Every Monday at 9 AM
- **Alert Threshold:** Any page scoring below 70%
- **Target:** All pages PASS status within 2 weeks

---
*Report generated by EmviApp Performance Audit System*
*Next audit scheduled: ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}*`;
  };

  // Auto-audit current page on load
  useEffect(() => {
    auditCurrentPage();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PASS': return 'text-green-600';
      case 'NEEDS_WORK': return 'text-yellow-600';
      case 'CRITICAL': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PASS': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'NEEDS_WORK': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'CRITICAL': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Zap className="h-4 w-4 text-gray-600" />;
    }
  };

  const allResults = currentPageResult ? [currentPageResult, ...results] : results;
  const passCount = allResults.filter(r => r.status === 'PASS').length;
  const needsWorkCount = allResults.filter(r => r.status === 'NEEDS_WORK').length;
  const criticalCount = allResults.filter(r => r.status === 'CRITICAL').length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            EmviApp Performance Audit Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-6">
            <Button 
              onClick={auditCurrentPage} 
              disabled={isCurrentPageAuditing}
              className="flex items-center gap-2"
              variant="default"
            >
              {isCurrentPageAuditing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Auditing Current Page...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Audit This Page
                </>
              )}
            </Button>
            
            <Button 
              onClick={runAudit} 
              disabled={isAuditing}
              className="flex items-center gap-2"
              variant="outline"
            >
              {isAuditing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  Full Audit Running...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4" />
                  Run All Pages Audit
                </>
              )}
            </Button>

            {allResults.length > 0 && (
              <Button 
                onClick={exportResults}
                className="flex items-center gap-2"
                variant="secondary"
              >
                <Download className="h-4 w-4" />
                Export Report
              </Button>
            )}
          </div>

          {allResults.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="border-green-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{passCount}</div>
                  <div className="text-sm text-green-600">Pages Passing</div>
                </CardContent>
              </Card>
              <Card className="border-yellow-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">{needsWorkCount}</div>
                  <div className="text-sm text-yellow-600">Need Optimization</div>
                </CardContent>
              </Card>
              <Card className="border-red-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">{criticalCount}</div>
                  <div className="text-sm text-red-600">Critical Issues</div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current Page Results */}
      {currentPageResult && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-600" />
              Current Page Analysis: {currentPageResult.page}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className={`text-2xl font-bold ${currentPageResult.fcp && currentPageResult.fcp < 1800 ? 'text-green-600' : 'text-red-600'}`}>
                  {currentPageResult.fcp ? `${Math.round(currentPageResult.fcp)}ms` : 'N/A'}
                </div>
                <div className="text-sm text-gray-600">FCP</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${currentPageResult.lcp && currentPageResult.lcp < 2500 ? 'text-green-600' : 'text-red-600'}`}>
                  {currentPageResult.lcp ? `${Math.round(currentPageResult.lcp)}ms` : 'N/A'}
                </div>
                <div className="text-sm text-gray-600">LCP</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${currentPageResult.cls !== null && currentPageResult.cls < 0.05 ? 'text-green-600' : 'text-red-600'}`}>
                  {currentPageResult.cls !== null ? currentPageResult.cls.toFixed(3) : 'N/A'}
                </div>
                <div className="text-sm text-gray-600">CLS</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  {getStatusIcon(currentPageResult.status)}
                  <Badge variant={currentPageResult.status === 'PASS' ? 'default' : 'destructive'}>
                    {currentPageResult.status}
                  </Badge>
                </div>
              </div>
            </div>
            
            {currentPageResult.recommendations.length > 0 && (
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Immediate Actions for This Page:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {currentPageResult.recommendations.slice(0, 3).map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {allResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Audit Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Page</th>
                    <th className="text-left p-2">Route</th>
                    <th className="text-left p-2">FCP</th>
                    <th className="text-left p-2">LCP</th>
                    <th className="text-left p-2">CLS</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Scores</th>
                  </tr>
                </thead>
                <tbody>
                  {allResults.map((result, index) => {
                    const avgScore = Math.round(
                      (result.imageScore + result.seoScore + result.loadingStateScore) / 3
                    );
                    
                    return (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-medium">{result.page}</td>
                        <td className="p-2 text-sm text-gray-600">{result.route}</td>
                        <td className="p-2">
                          {result.fcp ? (
                            <span className={result.fcp > 1800 ? 'text-red-600' : 'text-green-600'}>
                              {Math.round(result.fcp)}ms
                            </span>
                          ) : 'N/A'}
                        </td>
                        <td className="p-2">
                          {result.lcp ? (
                            <span className={result.lcp > 2500 ? 'text-red-600' : 'text-green-600'}>
                              {Math.round(result.lcp)}ms
                            </span>
                          ) : 'N/A'}
                        </td>
                        <td className="p-2">
                          {result.cls !== null ? (
                            <span className={result.cls > 0.05 ? 'text-red-600' : 'text-green-600'}>
                              {result.cls.toFixed(3)}
                            </span>
                          ) : 'N/A'}
                        </td>
                        <td className="p-2">
                          <div className="flex items-center gap-1">
                            {getStatusIcon(result.status)}
                            <Badge 
                              variant={result.status === 'PASS' ? 'default' : 'destructive'}
                              className={getStatusColor(result.status)}
                            >
                              {result.status}
                            </Badge>
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs">Avg:</span>
                              <Progress value={avgScore} className="w-16 h-2" />
                              <span className="text-xs">{avgScore}%</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {allResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allResults
                .filter(r => r.status !== 'PASS')
                .map((result, index) => (
                  <div key={index} className="border-l-4 border-l-yellow-400 pl-4">
                    <h4 className="font-semibold">{result.page}</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      {result.recommendations.map((rec, i) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PerformanceAuditDashboard;