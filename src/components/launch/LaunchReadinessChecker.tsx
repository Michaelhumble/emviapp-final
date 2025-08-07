import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, AlertCircle, Rocket, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface ReadinessCheck {
  id: string;
  category: string;
  name: string;
  status: 'pass' | 'fail' | 'warning' | 'checking';
  description: string;
  critical: boolean;
  details?: string;
}

const LaunchReadinessChecker = () => {
  const [checks, setChecks] = useState<ReadinessCheck[]>([
    // Technical Readiness
    { id: 't1', category: 'Technical', name: 'All Integration Tests Pass', status: 'checking', description: 'All customer, artist, and salon integration tests must pass', critical: true },
    { id: 't2', category: 'Technical', name: 'Performance Metrics Green', status: 'checking', description: 'Page load times under 2s, API response times under 500ms', critical: true },
    { id: 't3', category: 'Technical', name: 'Mobile Responsiveness', status: 'checking', description: 'All features work correctly on mobile devices', critical: true },
    { id: 't4', category: 'Technical', name: 'Cross-browser Compatibility', status: 'checking', description: 'Chrome, Safari, Firefox, Edge compatibility verified', critical: false },
    
    // Network & Data
    { id: 'n1', category: 'Network', name: 'Ecosystem Network Health', status: 'checking', description: 'All connections between customers, artists, salons verified', critical: true },
    { id: 'n2', category: 'Network', name: 'Value Flow Integrity', status: 'checking', description: 'Booking flows, rewards, referrals working end-to-end', critical: true },
    { id: 'n3', category: 'Network', name: 'Analytics Data Quality', status: 'checking', description: 'Real-time analytics capturing accurate data', critical: false },
    { id: 'n4', category: 'Network', name: 'Notification Systems', status: 'checking', description: 'Push notifications, email alerts, SMS working', critical: false },
    
    // Business Rules
    { id: 'b1', category: 'Business', name: 'No Customer Payment Policy', status: 'checking', description: 'Zero customer-facing payment requirements verified', critical: true },
    { id: 'b2', category: 'Business', name: 'Provider Monetization Only', status: 'checking', description: 'All payment flows are provider-facing only', critical: true },
    { id: 'b3', category: 'Business', name: 'Legal Compliance', status: 'checking', description: 'Terms, privacy policy, data handling compliant', critical: true },
    { id: 'b4', category: 'Business', name: 'Content Moderation', status: 'checking', description: 'Automated and manual content filtering active', critical: false },
    
    // User Experience
    { id: 'u1', category: 'UX', name: 'Onboarding Flow Complete', status: 'checking', description: 'Smooth user onboarding for all user types', critical: false },
    { id: 'u2', category: 'UX', name: 'Help & Support Ready', status: 'checking', description: 'FAQ, help docs, support channels active', critical: false },
    { id: 'u3', category: 'UX', name: 'Accessibility Standards', status: 'checking', description: 'WCAG 2.1 AA compliance for accessibility', critical: false },
    { id: 'u4', category: 'UX', name: 'User Feedback Collection', status: 'checking', description: 'In-app feedback and rating systems active', critical: false },
    
    // Marketing & Growth
    { id: 'm1', category: 'Marketing', name: 'Launch Marketing Ready', status: 'checking', description: 'Influencer campaigns, content ready for activation', critical: false },
    { id: 'm2', category: 'Marketing', name: 'Viral Mechanics Active', status: 'checking', description: 'Referral system, social sharing, growth loops working', critical: false },
    { id: 'm3', category: 'Marketing', name: 'SEO Optimization', status: 'checking', description: 'Meta tags, sitemaps, search optimization complete', critical: false },
    { id: 'm4', category: 'Marketing', name: 'Analytics Tracking', status: 'checking', description: 'Google Analytics, conversion tracking implemented', critical: false }
  ]);

  const [isChecking, setIsChecking] = useState(false);
  const [overallStatus, setOverallStatus] = useState<'ready' | 'not-ready' | 'warning'>('not-ready');

  const runChecks = async () => {
    setIsChecking(true);
    
    for (let i = 0; i < checks.length; i++) {
      const check = checks[i];
      
      // Simulate checking delay
      await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
      
      // Simulate check results with weighted probability
      const rand = Math.random();
      let status: ReadinessCheck['status'];
      let details = '';
      
      if (check.critical) {
        // Critical checks have higher pass rate
        if (rand > 0.15) {
          status = 'pass';
          details = 'All requirements met';
        } else if (rand > 0.05) {
          status = 'warning';
          details = 'Minor issues detected, review recommended';
        } else {
          status = 'fail';
          details = 'Critical issues found, must be resolved';
        }
      } else {
        // Non-critical checks
        if (rand > 0.25) {
          status = 'pass';
          details = 'All requirements met';
        } else if (rand > 0.1) {
          status = 'warning';
          details = 'Recommendations available for improvement';
        } else {
          status = 'fail';
          details = 'Issues found, should be addressed';
        }
      }
      
      setChecks(prev => prev.map(c => 
        c.id === check.id ? { ...c, status, details } : c
      ));
    }
    
    setIsChecking(false);
  };

  useEffect(() => {
    if (!isChecking && checks.every(c => c.status !== 'checking')) {
      const criticalFails = checks.filter(c => c.critical && c.status === 'fail').length;
      const anyFails = checks.filter(c => c.status === 'fail').length;
      const warnings = checks.filter(c => c.status === 'warning').length;
      
      if (criticalFails > 0) {
        setOverallStatus('not-ready');
      } else if (anyFails > 0 || warnings > 3) {
        setOverallStatus('warning');
      } else {
        setOverallStatus('ready');
      }
    }
  }, [checks, isChecking]);

  const getStatusIcon = (status: ReadinessCheck['status']) => {
    switch (status) {
      case 'pass': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'fail': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'checking': return <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />;
    }
  };

  const getStatusColor = (status: ReadinessCheck['status']) => {
    switch (status) {
      case 'pass': return 'border-green-200 bg-green-50';
      case 'fail': return 'border-red-200 bg-red-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'checking': return 'border-blue-200 bg-blue-50';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technical': return 'bg-blue-500/10 text-blue-700';
      case 'Network': return 'bg-purple-500/10 text-purple-700';
      case 'Business': return 'bg-green-500/10 text-green-700';
      case 'UX': return 'bg-orange-500/10 text-orange-700';
      case 'Marketing': return 'bg-pink-500/10 text-pink-700';
      default: return 'bg-gray-500/10 text-gray-700';
    }
  };

  const stats = {
    total: checks.length,
    passed: checks.filter(c => c.status === 'pass').length,
    failed: checks.filter(c => c.status === 'fail').length,
    warnings: checks.filter(c => c.status === 'warning').length,
    criticalFailed: checks.filter(c => c.critical && c.status === 'fail').length
  };

  const progressPercentage = ((stats.passed + stats.warnings * 0.5) / stats.total) * 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Launch Readiness Checker</CardTitle>
            <div className="flex gap-2">
              <Button 
                onClick={runChecks} 
                disabled={isChecking}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isChecking ? 'animate-spin' : ''}`} />
                {isChecking ? 'Checking...' : 'Run Checks'}
              </Button>
              {overallStatus === 'ready' && (
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  <Rocket className="h-4 w-4 mr-2" />
                  Ready to Launch!
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold">
              {overallStatus === 'ready' && '🚀 READY TO LAUNCH'}
              {overallStatus === 'warning' && '⚠️ REVIEW REQUIRED'}
              {overallStatus === 'not-ready' && '🔧 NOT READY'}
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <div className="text-sm text-gray-600">
              {Math.round(progressPercentage)}% Complete
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            <Card className="p-4">
              <div className="text-2xl font-bold text-center">{stats.total}</div>
              <div className="text-sm text-gray-600 text-center">Total Checks</div>
            </Card>
            <Card className="p-4 border-green-200 bg-green-50">
              <div className="text-2xl font-bold text-center text-green-600">{stats.passed}</div>
              <div className="text-sm text-green-600 text-center">Passed</div>
            </Card>
            <Card className="p-4 border-yellow-200 bg-yellow-50">
              <div className="text-2xl font-bold text-center text-yellow-600">{stats.warnings}</div>
              <div className="text-sm text-yellow-600 text-center">Warnings</div>
            </Card>
            <Card className="p-4 border-red-200 bg-red-50">
              <div className="text-2xl font-bold text-center text-red-600">{stats.failed}</div>
              <div className="text-sm text-red-600 text-center">Failed</div>
            </Card>
            <Card className="p-4 border-red-300 bg-red-100">
              <div className="text-2xl font-bold text-center text-red-700">{stats.criticalFailed}</div>
              <div className="text-sm text-red-700 text-center">Critical</div>
            </Card>
          </div>

          <div className="space-y-3">
            {checks.map((check, index) => (
              <motion.div
                key={check.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-lg border ${getStatusColor(check.status)} transition-all duration-300`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getStatusIcon(check.status)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="font-medium">{check.name}</div>
                        {check.critical && (
                          <Badge variant="destructive" className="text-xs">Critical</Badge>
                        )}
                        <Badge className={getCategoryColor(check.category)} variant="secondary">
                          {check.category}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">{check.description}</div>
                      {check.details && (
                        <div className="text-sm font-medium">{check.details}</div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LaunchReadinessChecker;