import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  Shield, 
  Lock,
  Zap,
  FileText,
  Users,
  Activity
} from 'lucide-react';
import { 
  bookingSystemSafeguards, 
  generateSafeguardReport, 
  safeguardCategories,
  type SafeguardStatus
} from '@/utils/bookingSystemSafeguards';

const BookingSystemSafeguardDashboard = () => {
  const [safeguards, setSafeguards] = useState<SafeguardStatus[]>(bookingSystemSafeguards);
  const [report, setReport] = useState(generateSafeguardReport(safeguards));

  useEffect(() => {
    setReport(generateSafeguardReport(safeguards));
  }, [safeguards]);

  const updateSafeguardStatus = (id: string, status: SafeguardStatus['status'], notes?: string) => {
    setSafeguards(prev => prev.map(safeguard => 
      safeguard.id === id 
        ? { 
            ...safeguard, 
            status, 
            notes,
            completedAt: status === 'completed' ? new Date().toISOString() : undefined
          }
        : safeguard
    ));
  };

  const getStatusIcon = (status: SafeguardStatus['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'failed': return <XCircle className="h-5 w-5 text-red-600" />;
      case 'blocked': return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      case 'in_progress': return <Clock className="h-5 w-5 text-blue-600" />;
      default: return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: SafeguardStatus['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      case 'blocked': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: SafeguardStatus['priority']) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
    }
  };

  const getCategoryIcon = (category: SafeguardStatus['category']) => {
    switch (category) {
      case 'testing': return <Activity className="h-5 w-5" />;
      case 'infrastructure': return <Zap className="h-5 w-5" />;
      case 'monitoring': return <Shield className="h-5 w-5" />;
      case 'documentation': return <FileText className="h-5 w-5" />;
      case 'approval': return <Users className="h-5 w-5" />;
    }
  };

  const getOverallStatusAlert = () => {
    switch (report.overallStatus) {
      case 'safe_to_proceed':
        return (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              🟢 <strong>SAFE TO PROCEED</strong> - All critical safeguards are in place. 
              Booking system changes can begin with confidence.
            </AlertDescription>
          </Alert>
        );
      case 'not_ready':
        return (
          <Alert className="border-red-200 bg-red-50">
            <XCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              🔴 <strong>NOT READY</strong> - {report.criticalTasksRemaining} critical tasks remaining. 
              DO NOT PROCEED with booking changes until all critical items are completed.
            </AlertDescription>
          </Alert>
        );
      case 'blocked':
        return (
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              🟡 <strong>BLOCKED</strong> - {report.blockedTasks} tasks are blocked. 
              Resolve blockers before proceeding.
            </AlertDescription>
          </Alert>
        );
      case 'failed':
        return (
          <Alert className="border-red-200 bg-red-50">
            <XCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              🔴 <strong>FAILED SAFEGUARDS</strong> - {report.failedTasks} critical tasks have failed. 
              Immediate attention required. DO NOT PROCEED.
            </AlertDescription>
          </Alert>
        );
    }
  };

  const categorizedSafeguards = Object.keys(safeguardCategories).reduce((acc, category) => {
    acc[category as keyof typeof safeguardCategories] = safeguards.filter(s => s.category === category);
    return acc;
  }, {} as Record<keyof typeof safeguardCategories, SafeguardStatus[]>);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🔒 Booking System Safeguard Dashboard
        </h1>
        <p className="text-gray-600">
          Comprehensive safety verification before booking system modifications
        </p>
      </div>

      {/* Overall Status */}
      <div className="space-y-4">
        {getOverallStatusAlert()}
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{report.completedTasks}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-600">{report.criticalTasksRemaining}</div>
              <div className="text-sm text-gray-600">Critical Remaining</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600">{report.highPriorityTasksRemaining}</div>
              <div className="text-sm text-gray-600">High Priority</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{report.readinessPercentage}%</div>
              <div className="text-sm text-gray-600">Ready</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span>{report.readinessPercentage}%</span>
          </div>
          <Progress value={report.readinessPercentage} className="h-3" />
        </div>
      </div>

      {/* Next Actions */}
      {report.nextActions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
              Immediate Actions Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {report.nextActions.map((action, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                  <span className="font-medium">{action}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Safeguard Categories */}
      <Tabs defaultValue="testing" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          {Object.entries(safeguardCategories).map(([key, category]) => (
            <TabsTrigger key={key} value={key} className="flex items-center">
              {getCategoryIcon(key as any)}
              <span className="ml-2 hidden sm:inline">{category.name.split(' ')[0]}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(categorizedSafeguards).map(([categoryKey, categoryTasks]) => (
          <TabsContent key={categoryKey} value={categoryKey}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {getCategoryIcon(categoryKey as any)}
                  <span className="ml-2">{safeguardCategories[categoryKey as keyof typeof safeguardCategories].name}</span>
                  {safeguardCategories[categoryKey as keyof typeof safeguardCategories].criticalForSafety && (
                    <Lock className="h-4 w-4 ml-2 text-red-600" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryTasks.map((safeguard) => (
                    <div key={safeguard.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(safeguard.status)}
                          <h4 className="font-medium">{safeguard.task}</h4>
                        </div>
                        <div className="flex space-x-2">
                          <Badge className={getPriorityColor(safeguard.priority)}>
                            {safeguard.priority}
                          </Badge>
                          <Badge className={getStatusColor(safeguard.status)}>
                            {safeguard.status.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{safeguard.verification}</p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Assignee: {safeguard.assignee}</span>
                        <span>Deadline: {safeguard.deadline}</span>
                      </div>

                      {safeguard.dependencies.length > 0 && (
                        <div className="mt-2 text-xs">
                          <span className="text-gray-500">Dependencies: </span>
                          <span className="text-gray-600">{safeguard.dependencies.join(', ')}</span>
                        </div>
                      )}

                      {safeguard.notes && (
                        <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                          <strong>Notes:</strong> {safeguard.notes}
                        </div>
                      )}

                      <div className="flex space-x-2 mt-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateSafeguardStatus(safeguard.id, 'in_progress')}
                          disabled={safeguard.status === 'completed'}
                        >
                          Start
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateSafeguardStatus(safeguard.id, 'completed')}
                          disabled={safeguard.status === 'completed'}
                          className="bg-green-50 border-green-200 text-green-800 hover:bg-green-100"
                        >
                          Complete
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateSafeguardStatus(safeguard.id, 'blocked')}
                          disabled={safeguard.status === 'completed'}
                          className="bg-orange-50 border-orange-200 text-orange-800 hover:bg-orange-100"
                        >
                          Block
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Final Safety Check */}
      <Card className="border-2 border-red-200">
        <CardHeader>
          <CardTitle className="text-red-800 flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Final Safety Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <span className="font-medium">Revenue Protection Active</span>
              <Badge className="bg-red-100 text-red-800">
                {report.overallStatus === 'safe_to_proceed' ? 'PROTECTED' : 'AT RISK'}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <span className="font-medium">Rollback Procedures Ready</span>
              <Badge className="bg-orange-100 text-orange-800">
                {safeguards.find(s => s.id === 'create-rollback-procedures')?.status === 'completed' ? 'READY' : 'PENDING'}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="font-medium">Monitoring Dashboard Active</span>
              <Badge className="bg-blue-100 text-blue-800">
                {safeguards.find(s => s.id === 'create-booking-monitoring-dashboard')?.status === 'completed' ? 'ACTIVE' : 'INACTIVE'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingSystemSafeguardDashboard;