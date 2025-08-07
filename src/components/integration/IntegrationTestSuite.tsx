import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, AlertCircle, Play, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface TestCase {
  id: string;
  name: string;
  role: 'customer' | 'artist' | 'salon';
  category: 'dashboard' | 'booking' | 'notifications' | 'social' | 'rewards';
  status: 'pending' | 'running' | 'passed' | 'failed';
  duration?: number;
  error?: string;
}

const IntegrationTestSuite = () => {
  const [tests, setTests] = useState<TestCase[]>([
    // Customer Tests
    { id: 'c1', name: 'Customer Dashboard Load', role: 'customer', category: 'dashboard', status: 'pending' },
    { id: 'c2', name: 'AI Discovery Engine', role: 'customer', category: 'dashboard', status: 'pending' },
    { id: 'c3', name: 'Map-based Booking Flow', role: 'customer', category: 'booking', status: 'pending' },
    { id: 'c4', name: 'Social Media Sharing', role: 'customer', category: 'social', status: 'pending' },
    { id: 'c5', name: 'Push Notifications', role: 'customer', category: 'notifications', status: 'pending' },
    { id: 'c6', name: 'Rewards & Credits System', role: 'customer', category: 'rewards', status: 'pending' },
    { id: 'c7', name: 'Customer Stories Hub', role: 'customer', category: 'social', status: 'pending' },
    { id: 'c8', name: 'Smart Reminder Engine', role: 'customer', category: 'notifications', status: 'pending' },
    
    // Artist Tests
    { id: 'a1', name: 'Artist Dashboard Analytics', role: 'artist', category: 'dashboard', status: 'pending' },
    { id: 'a2', name: 'Artist Booking Management', role: 'artist', category: 'booking', status: 'pending' },
    { id: 'a3', name: 'Artist Performance Leaderboard', role: 'artist', category: 'social', status: 'pending' },
    { id: 'a4', name: 'Artist Notification System', role: 'artist', category: 'notifications', status: 'pending' },
    { id: 'a5', name: 'Artist Revenue Tracking', role: 'artist', category: 'rewards', status: 'pending' },
    
    // Salon Tests
    { id: 's1', name: 'Salon Dashboard Premium Features', role: 'salon', category: 'dashboard', status: 'pending' },
    { id: 's2', name: 'Team Management System', role: 'salon', category: 'dashboard', status: 'pending' },
    { id: 's3', name: 'Salon Analytics Suite', role: 'salon', category: 'dashboard', status: 'pending' },
    { id: 's4', name: 'Salon Leaderboard', role: 'salon', category: 'social', status: 'pending' },
    { id: 's5', name: 'Salon Revenue Optimization', role: 'salon', category: 'rewards', status: 'pending' }
  ]);

  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTest, setCurrentTest] = useState<string | null>(null);

  const runTest = async (testId: string): Promise<boolean> => {
    // Simulate test execution
    await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000));
    
    // Simulate test results (90% pass rate)
    return Math.random() > 0.1;
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setProgress(0);
    
    for (let i = 0; i < tests.length; i++) {
      const test = tests[i];
      setCurrentTest(test.name);
      
      setTests(prev => prev.map(t => 
        t.id === test.id ? { ...t, status: 'running' } : t
      ));
      
      const startTime = Date.now();
      const passed = await runTest(test.id);
      const duration = Date.now() - startTime;
      
      setTests(prev => prev.map(t => 
        t.id === test.id ? { 
          ...t, 
          status: passed ? 'passed' : 'failed',
          duration,
          error: passed ? undefined : 'Test assertion failed'
        } : t
      ));
      
      setProgress(((i + 1) / tests.length) * 100);
    }
    
    setIsRunning(false);
    setCurrentTest(null);
  };

  const resetTests = () => {
    setTests(prev => prev.map(t => ({ 
      ...t, 
      status: 'pending', 
      duration: undefined, 
      error: undefined 
    })));
    setProgress(0);
  };

  const getStatusIcon = (status: TestCase['status']) => {
    switch (status) {
      case 'passed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'running': return <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: TestCase['status']) => {
    switch (status) {
      case 'passed': return 'bg-green-500/10 text-green-700 border-green-200';
      case 'failed': return 'bg-red-500/10 text-red-700 border-red-200';
      case 'running': return 'bg-blue-500/10 text-blue-700 border-blue-200';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  const getRoleColor = (role: TestCase['role']) => {
    switch (role) {
      case 'customer': return 'bg-purple-500/10 text-purple-700';
      case 'artist': return 'bg-blue-500/10 text-blue-700';
      case 'salon': return 'bg-orange-500/10 text-orange-700';
    }
  };

  const stats = {
    total: tests.length,
    passed: tests.filter(t => t.status === 'passed').length,
    failed: tests.filter(t => t.status === 'failed').length,
    pending: tests.filter(t => t.status === 'pending').length
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Integration Test Suite</CardTitle>
            <div className="flex gap-2">
              <Button 
                onClick={runAllTests} 
                disabled={isRunning}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <Play className="h-4 w-4 mr-2" />
                {isRunning ? 'Running Tests...' : 'Run All Tests'}
              </Button>
              <Button onClick={resetTests} variant="outline" disabled={isRunning}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {isRunning && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Running: {currentTest}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <div className="grid grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="text-2xl font-bold text-center">{stats.total}</div>
              <div className="text-sm text-gray-600 text-center">Total Tests</div>
            </Card>
            <Card className="p-4 border-green-200 bg-green-50">
              <div className="text-2xl font-bold text-center text-green-600">{stats.passed}</div>
              <div className="text-sm text-green-600 text-center">Passed</div>
            </Card>
            <Card className="p-4 border-red-200 bg-red-50">
              <div className="text-2xl font-bold text-center text-red-600">{stats.failed}</div>
              <div className="text-sm text-red-600 text-center">Failed</div>
            </Card>
            <Card className="p-4 border-gray-200 bg-gray-50">
              <div className="text-2xl font-bold text-center text-gray-600">{stats.pending}</div>
              <div className="text-sm text-gray-600 text-center">Pending</div>
            </Card>
          </div>

          <div className="space-y-3">
            {tests.map((test, index) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border ${getStatusColor(test.status)} transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(test.status)}
                    <div>
                      <div className="font-medium">{test.name}</div>
                      <div className="flex gap-2 mt-1">
                        <Badge className={getRoleColor(test.role)} variant="secondary">
                          {test.role}
                        </Badge>
                        <Badge variant="outline">{test.category}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {test.duration && (
                      <div className="text-sm text-gray-600">{test.duration}ms</div>
                    )}
                    {test.error && (
                      <div className="text-sm text-red-600">{test.error}</div>
                    )}
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

export default IntegrationTestSuite;