import React, { useState, useEffect } from 'react';
import { performanceAuditor, PageAuditResult, AUDIT_TARGETS } from '@/utils/performanceAuditor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react';

const PerformanceAuditDashboard: React.FC = () => {
  const [isAuditing, setIsAuditing] = useState(false);
  const [results, setResults] = useState<PageAuditResult[]>([]);
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

  const passCount = results.filter(r => r.status === 'PASS').length;
  const needsWorkCount = results.filter(r => r.status === 'NEEDS_WORK').length;
  const criticalCount = results.filter(r => r.status === 'CRITICAL').length;

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
          <div className="flex gap-4 mb-6">
            <Button 
              onClick={runAudit} 
              disabled={isAuditing}
              className="flex items-center gap-2"
            >
              {isAuditing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Auditing {currentPage}...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4" />
                  Run Full Audit
                </>
              )}
            </Button>
          </div>

          {results.length > 0 && (
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

      {results.length > 0 && (
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
                  {results.map((result, index) => {
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

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results
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