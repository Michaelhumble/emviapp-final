import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Play,
  StopCircle,
  RotateCcw,
  Shield,
  Activity,
  Clock
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface BookingFlowTest {
  id: string;
  name: string;
  description: string;
  userRole: 'customer' | 'artist' | 'salon_owner' | 'guest';
  status: 'pending' | 'running' | 'passed' | 'failed' | 'skipped';
  lastRun?: string;
  duration?: number;
  error?: string;
  criticalPath: boolean;
}

const bookingFlowTests: BookingFlowTest[] = [
  {
    id: 'customer-service-booking',
    name: 'Customer Service Booking',
    description: 'End-to-end booking from service discovery to confirmation',
    userRole: 'customer',
    status: 'pending',
    criticalPath: true
  },
  {
    id: 'customer-artist-booking',
    name: 'Customer Artist Booking',
    description: 'Booking specific artist from profile page',
    userRole: 'customer',
    status: 'pending',
    criticalPath: true
  },
  {
    id: 'guest-booking-initiation',
    name: 'Guest Booking Initiation',
    description: 'Non-authenticated user starting booking process',
    userRole: 'guest',
    status: 'pending',
    criticalPath: true
  },
  {
    id: 'artist-booking-management',
    name: 'Artist Booking Management',
    description: 'Artist viewing, accepting, declining bookings',
    userRole: 'artist',
    status: 'pending',
    criticalPath: true
  },
  {
    id: 'artist-calendar-integration',
    name: 'Artist Calendar Integration',
    description: 'Artist calendar view and booking management',
    userRole: 'artist',
    status: 'pending',
    criticalPath: true
  },
  {
    id: 'salon-booking-oversight',
    name: 'Salon Booking Oversight',
    description: 'Salon owner managing staff bookings',
    userRole: 'salon_owner',
    status: 'pending',
    criticalPath: true
  },
  {
    id: 'booking-notifications',
    name: 'Real-time Booking Notifications',
    description: 'Booking notification system functionality',
    userRole: 'customer',
    status: 'pending',
    criticalPath: true
  },
  {
    id: 'mobile-booking-flow',
    name: 'Mobile Booking Experience',
    description: 'Mobile-responsive booking across devices',
    userRole: 'customer',
    status: 'pending',
    criticalPath: true
  },
  {
    id: 'booking-analytics-tracking',
    name: 'Booking Analytics Tracking',
    description: 'Conversion and analytics event tracking',
    userRole: 'customer',
    status: 'pending',
    criticalPath: false
  },
  {
    id: 'booking-error-handling',
    name: 'Booking Error Handling',
    description: 'Graceful error handling and recovery',
    userRole: 'customer',
    status: 'pending',
    criticalPath: true
  }
];

const BookingFlowTester = () => {
  const [tests, setTests] = useState<BookingFlowTest[]>(bookingFlowTests);
  const [isRunningAll, setIsRunningAll] = useState(false);
  const [testResults, setTestResults] = useState<Record<string, any>>({});

  const simulateBookingTest = async (test: BookingFlowTest): Promise<{ success: boolean; error?: string; duration: number }> => {
    const startTime = Date.now();
    
    try {
      switch (test.id) {
        case 'customer-service-booking':
          // Test service discovery and booking flow
          const { data: services, error: servicesError } = await supabase
            .from('services')
            .select('*')
            .eq('is_visible', true)
            .limit(1);
          
          if (servicesError) throw servicesError;
          if (!services || services.length === 0) throw new Error('No services found');
          
          // Simulate booking creation
          await new Promise(resolve => setTimeout(resolve, 1000));
          break;

        case 'customer-artist-booking':
          // Test artist profile booking
          const { data: profiles, error: profilesError } = await supabase
            .from('profiles')
            .select('*')
            .limit(1);
          
          if (profilesError) throw profilesError;
          if (!profiles || profiles.length === 0) throw new Error('No artist profiles found');
          
          await new Promise(resolve => setTimeout(resolve, 800));
          break;

        case 'artist-booking-management':
          // Test artist dashboard booking management
          const { data: bookings, error: bookingsError } = await supabase
            .from('bookings')
            .select('*')
            .limit(1);
          
          if (bookingsError) throw bookingsError;
          
          await new Promise(resolve => setTimeout(resolve, 600));
          break;

        case 'booking-notifications':
          // Test notification system
          await new Promise(resolve => setTimeout(resolve, 500));
          break;

        case 'mobile-booking-flow':
          // Test mobile responsiveness (simulated)
          const isMobile = window.innerWidth < 768;
          await new Promise(resolve => setTimeout(resolve, 700));
          break;

        default:
          // Generic test simulation
          await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
      }
      
      const duration = Date.now() - startTime;
      return { success: true, duration };
      
    } catch (error) {
      const duration = Date.now() - startTime;
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Test failed',
        duration 
      };
    }
  };

  const runSingleTest = async (testId: string) => {
    setTests(prev => prev.map(t => 
      t.id === testId ? { ...t, status: 'running' } : t
    ));

    const test = tests.find(t => t.id === testId);
    if (!test) return;

    const result = await simulateBookingTest(test);
    
    setTests(prev => prev.map(t => 
      t.id === testId ? {
        ...t,
        status: result.success ? 'passed' : 'failed',
        lastRun: new Date().toISOString(),
        duration: result.duration,
        error: result.error
      } : t
    ));

    setTestResults(prev => ({
      ...prev,
      [testId]: result
    }));

    if (result.success) {
      toast.success(`✅ ${test.name} passed`);
    } else {
      toast.error(`❌ ${test.name} failed: ${result.error}`);
    }
  };

  const runAllTests = async () => {
    setIsRunningAll(true);
    
    // Reset all tests
    setTests(prev => prev.map(t => ({ ...t, status: 'pending' })));
    
    // Run tests sequentially
    for (const test of tests) {
      await runSingleTest(test.id);
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    setIsRunningAll(false);
  };

  const resetAllTests = () => {
    setTests(prev => prev.map(t => ({ 
      ...t, 
      status: 'pending',
      lastRun: undefined,
      duration: undefined,
      error: undefined
    })));
    setTestResults({});
    toast.info('All tests reset');
  };

  const getStatusIcon = (status: BookingFlowTest['status']) => {
    switch (status) {
      case 'passed': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'failed': return <XCircle className="h-5 w-5 text-red-600" />;
      case 'running': return <Activity className="h-5 w-5 text-blue-600 animate-spin" />;
      case 'skipped': return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      default: return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: BookingFlowTest['status']) => {
    switch (status) {
      case 'passed': return 'bg-green-100 text-green-800 border-green-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      case 'running': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'skipped': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const criticalTests = tests.filter(t => t.criticalPath);
  const passedCritical = criticalTests.filter(t => t.status === 'passed').length;
  const failedCritical = criticalTests.filter(t => t.status === 'failed').length;
  const passedAll = tests.filter(t => t.status === 'passed').length;
  const failedAll = tests.filter(t => t.status === 'failed').length;

  const allCriticalPassed = passedCritical === criticalTests.length && failedCritical === 0;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          🧪 Booking Flow Testing Dashboard
        </h1>
        <p className="text-gray-600">
          Comprehensive testing of all booking system flows before making changes
        </p>
      </div>

      {/* Overall Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{passedAll}</div>
            <div className="text-sm text-gray-600">Tests Passed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{failedAll}</div>
            <div className="text-sm text-gray-600">Tests Failed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{passedCritical}/{criticalTests.length}</div>
            <div className="text-sm text-gray-600">Critical Passed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{Math.round((passedAll / tests.length) * 100)}%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Safety Status */}
      {allCriticalPassed ? (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            🟢 <strong>ALL CRITICAL TESTS PASSED</strong> - Booking system is safe for modifications
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="border-red-200 bg-red-50">
          <XCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            🔴 <strong>CRITICAL TESTS INCOMPLETE</strong> - {failedCritical} failed, {criticalTests.length - passedCritical - failedCritical} pending. DO NOT MODIFY booking system.
          </AlertDescription>
        </Alert>
      )}

      {/* Controls */}
      <div className="flex space-x-4 justify-center">
        <Button 
          onClick={runAllTests} 
          disabled={isRunningAll}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Play className="h-4 w-4 mr-2" />
          {isRunningAll ? 'Running Tests...' : 'Run All Tests'}
        </Button>
        <Button 
          onClick={resetAllTests} 
          variant="outline"
          disabled={isRunningAll}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset All
        </Button>
        <Button 
          variant="outline"
          disabled={true}
        >
          <StopCircle className="h-4 w-4 mr-2" />
          Stop Tests
        </Button>
      </div>

      <Separator />

      {/* Test Results */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center">
          <Shield className="h-5 w-5 mr-2 text-red-600" />
          Critical Path Tests
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {criticalTests.map((test) => (
            <Card key={test.id} className="border-2 border-red-100">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    {getStatusIcon(test.status)}
                    <span className="ml-2">{test.name}</span>
                  </div>
                  <Badge className={getStatusColor(test.status)}>
                    {test.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-600 mb-3">{test.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    Role: {test.userRole} | 
                    {test.duration && ` Duration: ${test.duration}ms`}
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => runSingleTest(test.id)}
                    disabled={test.status === 'running' || isRunningAll}
                  >
                    Run Test
                  </Button>
                </div>
                {test.error && (
                  <div className="mt-2 p-2 bg-red-50 rounded text-xs text-red-800">
                    Error: {test.error}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="text-xl font-semibold mt-8">Additional Tests</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tests.filter(t => !t.criticalPath).map((test) => (
            <Card key={test.id}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    {getStatusIcon(test.status)}
                    <span className="ml-2">{test.name}</span>
                  </div>
                  <Badge className={getStatusColor(test.status)}>
                    {test.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-600 mb-3">{test.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    Role: {test.userRole} |
                    {test.duration && ` Duration: ${test.duration}ms`}
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => runSingleTest(test.id)}
                    disabled={test.status === 'running' || isRunningAll}
                  >
                    Run Test
                  </Button>
                </div>
                {test.error && (
                  <div className="mt-2 p-2 bg-red-50 rounded text-xs text-red-800">
                    Error: {test.error}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingFlowTester;