import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Play, Square, BarChart3, Users, Zap, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface LoadTest {
  id: string;
  name: string;
  status: 'idle' | 'running' | 'completed' | 'failed';
  progress: number;
  results?: {
    totalRequests: number;
    successfulRequests: number;
    failedRequests: number;
    averageResponseTime: number;
    peakRPS: number;
    errors: string[];
  };
}

export const LoadTestingPanel: React.FC = () => {
  const [tests, setTests] = useState<LoadTest[]>([]);
  const [testConfig, setTestConfig] = useState({
    name: '',
    targetUrl: '/jobs',
    userCount: 1000,
    duration: 60,
    rampUpTime: 30,
    testType: 'stress',
    scenarios: ''
  });

  const runLoadTest = async () => {
    const newTest: LoadTest = {
      id: Date.now().toString(),
      name: testConfig.name || `Load Test ${tests.length + 1}`,
      status: 'running',
      progress: 0
    };

    setTests(prev => [...prev, newTest]);
    toast.success(`Started load test: ${newTest.name}`);

    // Simulate load test progress
    const interval = setInterval(() => {
      setTests(prev => prev.map(test => {
        if (test.id === newTest.id && test.status === 'running') {
          const newProgress = Math.min(test.progress + Math.random() * 10, 100);
          
          if (newProgress >= 100) {
            return {
              ...test,
              status: 'completed',
              progress: 100,
              results: {
                totalRequests: testConfig.userCount * 50,
                successfulRequests: Math.floor(testConfig.userCount * 50 * 0.98),
                failedRequests: Math.floor(testConfig.userCount * 50 * 0.02),
                averageResponseTime: 150 + Math.random() * 100,
                peakRPS: Math.floor(testConfig.userCount * 0.8),
                errors: Math.random() > 0.7 ? ['Connection timeout', 'Rate limit exceeded'] : []
              }
            };
          }
          
          return { ...test, progress: newProgress };
        }
        return test;
      }));
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
    }, 15000); // Simulate 15 second test
  };

  const stopLoadTest = (testId: string) => {
    setTests(prev => prev.map(test => 
      test.id === testId && test.status === 'running' 
        ? { ...test, status: 'failed', progress: test.progress } 
        : test
    ));
    toast.info('Load test stopped');
  };

  const presetConfigs = {
    emergency_100m: {
      name: '100M Users Emergency Simulation',
      userCount: 100000000,
      duration: 300,
      rampUpTime: 60,
      scenarios: `
// Emergency scenario: 100M users hitting the platform
const scenarios = {
  'homepage_burst': { weight: 40, target: '/' },
  'jobs_search': { weight: 30, target: '/jobs' },
  'profile_load': { weight: 20, target: '/profile' },
  'api_heavy': { weight: 10, target: '/api/jobs' }
};

// Simulate real user behavior
function userJourney() {
  visit_homepage();
  wait(1, 3); // 1-3 second think time
  search_jobs();
  wait(2, 5);
  view_job_details();
  wait(1, 2);
  if (Math.random() > 0.7) {
    attempt_booking();
  }
}
      `.trim()
    },
    stress_test: {
      name: 'Stress Test - Breaking Point',
      userCount: 50000,
      duration: 180,
      rampUpTime: 30,
      scenarios: 'Gradually increase load until system breaks'
    },
    spike_test: {
      name: 'Spike Test - Sudden Traffic',
      userCount: 10000,
      duration: 60,
      rampUpTime: 5,
      scenarios: 'Sudden traffic spike simulation'
    }
  };

  const applyPreset = (preset: keyof typeof presetConfigs) => {
    const config = presetConfigs[preset];
    setTestConfig(prev => ({
      ...prev,
      ...config
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Load Test Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="testName">Test Name</Label>
              <Input
                id="testName"
                value={testConfig.name}
                onChange={(e) => setTestConfig(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter test name"
              />
            </div>
            
            <div>
              <Label htmlFor="targetUrl">Target URL</Label>
              <Input
                id="targetUrl"
                value={testConfig.targetUrl}
                onChange={(e) => setTestConfig(prev => ({ ...prev, targetUrl: e.target.value }))}
                placeholder="/jobs"
              />
            </div>

            <div>
              <Label htmlFor="userCount">Concurrent Users</Label>
              <Input
                id="userCount"
                type="number"
                value={testConfig.userCount}
                onChange={(e) => setTestConfig(prev => ({ ...prev, userCount: parseInt(e.target.value) }))}
              />
            </div>

            <div>
              <Label htmlFor="duration">Duration (seconds)</Label>
              <Input
                id="duration"
                type="number"
                value={testConfig.duration}
                onChange={(e) => setTestConfig(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
              />
            </div>

            <div>
              <Label htmlFor="rampUpTime">Ramp-up Time (seconds)</Label>
              <Input
                id="rampUpTime"
                type="number"
                value={testConfig.rampUpTime}
                onChange={(e) => setTestConfig(prev => ({ ...prev, rampUpTime: parseInt(e.target.value) }))}
              />
            </div>

            <div>
              <Label htmlFor="testType">Test Type</Label>
              <Select value={testConfig.testType} onValueChange={(value) => setTestConfig(prev => ({ ...prev, testType: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="load">Load Test</SelectItem>
                  <SelectItem value="stress">Stress Test</SelectItem>
                  <SelectItem value="spike">Spike Test</SelectItem>
                  <SelectItem value="volume">Volume Test</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="scenarios">Test Scenarios (JavaScript)</Label>
            <Textarea
              id="scenarios"
              value={testConfig.scenarios}
              onChange={(e) => setTestConfig(prev => ({ ...prev, scenarios: e.target.value }))}
              placeholder="Define test scenarios and user behavior patterns..."
              rows={6}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => applyPreset('emergency_100m')}>
              100M Users Emergency
            </Button>
            <Button variant="outline" onClick={() => applyPreset('stress_test')}>
              Stress Test
            </Button>
            <Button variant="outline" onClick={() => applyPreset('spike_test')}>
              Spike Test
            </Button>
          </div>

          <Button onClick={runLoadTest} className="w-full">
            <Play className="mr-2 h-4 w-4" />
            Start Load Test
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active & Recent Tests</CardTitle>
        </CardHeader>
        <CardContent>
          {tests.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No tests run yet</p>
          ) : (
            <div className="space-y-4">
              {tests.map(test => (
                <div key={test.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{test.name}</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        test.status === 'running' ? 'default' :
                        test.status === 'completed' ? 'secondary' :
                        test.status === 'failed' ? 'destructive' : 'outline'
                      }>
                        {test.status}
                      </Badge>
                      {test.status === 'running' && (
                        <Button size="sm" variant="outline" onClick={() => stopLoadTest(test.id)}>
                          <Square className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="w-full bg-secondary rounded-full h-2 mb-4">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${test.progress}%` }}
                    />
                  </div>

                  {test.results && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        <span>{test.results.totalRequests.toLocaleString()} requests</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{test.results.peakRPS} peak RPS</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{test.results.averageResponseTime.toFixed(0)}ms avg</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-muted-foreground" />
                        <span>{((test.results.successfulRequests / test.results.totalRequests) * 100).toFixed(1)}% success</span>
                      </div>
                    </div>
                  )}

                  {test.results?.errors && test.results.errors.length > 0 && (
                    <div className="mt-2 p-2 bg-destructive/10 rounded text-sm">
                      <strong>Errors:</strong> {test.results.errors.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};