import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Rocket, TestTube, Users, MessageSquare, TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import IntegrationTestSuite from '../integration/IntegrationTestSuite';
import LaunchReadinessChecker from './LaunchReadinessChecker';
import FeedbackCollectionSystem from '../feedback/FeedbackCollectionSystem';
import EcosystemAudit from '../ecosystem/EcosystemAudit';
import LaunchMarketing from '../marketing/LaunchMarketing';

interface LaunchMetric {
  name: string;
  value: string;
  status: 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

const ComprehensiveLaunchDashboard = () => {
  const [launchMetrics] = useState<LaunchMetric[]>([
    { name: 'Integration Tests', value: '94% Pass', status: 'good', trend: 'up' },
    { name: 'Performance Score', value: '92/100', status: 'good', trend: 'stable' },
    { name: 'User Feedback', value: '4.8/5', status: 'good', trend: 'up' },
    { name: 'Critical Issues', value: '2 Open', status: 'warning', trend: 'down' },
    { name: 'Network Health', value: '98%', status: 'good', trend: 'stable' },
    { name: 'Mobile Ready', value: 'Yes', status: 'good', trend: 'stable' },
    { name: 'Payment Policy', value: 'Verified', status: 'good', trend: 'stable' },
    { name: 'Launch Ready', value: '87%', status: 'warning', trend: 'up' }
  ]);

  const [launchPhase, setLaunchPhase] = useState<'testing' | 'review' | 'ready' | 'launched'>('testing');

  const getStatusColor = (status: LaunchMetric['status']) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  const getStatusIcon = (status: LaunchMetric['status']) => {
    switch (status) {
      case 'good': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
  };

  const getTrendIcon = (trend: LaunchMetric['trend']) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'testing': return 'bg-blue-500/10 text-blue-700';
      case 'review': return 'bg-yellow-500/10 text-yellow-700';
      case 'ready': return 'bg-green-500/10 text-green-700';
      case 'launched': return 'bg-purple-500/10 text-purple-700';
      default: return 'bg-gray-500/10 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl font-bold flex items-center gap-3">
              <Rocket className="h-8 w-8 text-primary" />
              Comprehensive Launch Dashboard
            </CardTitle>
            <div className="flex items-center gap-3">
              <Badge className={getPhaseColor(launchPhase)} variant="secondary">
                {launchPhase.toUpperCase()} PHASE
              </Badge>
              {launchPhase === 'ready' && (
                <Button 
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  onClick={() => setLaunchPhase('launched')}
                >
                  <Rocket className="h-4 w-4 mr-2" />
                  LAUNCH NOW!
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Key Metrics Overview */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {launchMetrics.map((metric, index) => (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`p-4 border ${getStatusColor(metric.status)}`}>
                  <div className="flex items-center justify-between mb-2">
                    {getStatusIcon(metric.status)}
                    <span className="text-lg">{getTrendIcon(metric.trend)}</span>
                  </div>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm font-medium">{metric.name}</div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Launch Checklist Summary */}
          <Card className="mb-6 border-2 border-dashed border-primary/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">🚀 Final Launch Checklist</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Integration tests passing (94%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Network connections verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Zero customer payment policy confirmed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Mobile responsiveness tested</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <span>2 critical issues pending resolution</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>User feedback collection active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Launch marketing campaigns ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Performance optimization complete</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Tabs defaultValue="testing" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="testing" className="flex items-center gap-2">
            <TestTube className="h-4 w-4" />
            Integration Tests
          </TabsTrigger>
          <TabsTrigger value="readiness" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Launch Readiness
          </TabsTrigger>
          <TabsTrigger value="ecosystem" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Ecosystem Audit
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            User Feedback
          </TabsTrigger>
          <TabsTrigger value="marketing" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Launch Marketing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="testing" className="mt-6">
          <IntegrationTestSuite />
        </TabsContent>

        <TabsContent value="readiness" className="mt-6">
          <LaunchReadinessChecker />
        </TabsContent>

        <TabsContent value="ecosystem" className="mt-6">
          <EcosystemAudit />
        </TabsContent>

        <TabsContent value="feedback" className="mt-6">
          <FeedbackCollectionSystem />
        </TabsContent>

        <TabsContent value="marketing" className="mt-6">
          <LaunchMarketing />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComprehensiveLaunchDashboard;