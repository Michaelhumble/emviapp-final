import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, AlertCircle, RefreshCw, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface NetworkConnection {
  id: string;
  type: 'customer-artist' | 'customer-salon' | 'artist-salon' | 'referral' | 'social';
  health: 'healthy' | 'warning' | 'critical';
  metric: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
}

const EcosystemAudit = () => {
  const [connections] = useState<NetworkConnection[]>([
    { id: '1', type: 'customer-artist', health: 'healthy', metric: 'Booking Conversion', value: '94%', trend: 'up' },
    { id: '2', type: 'customer-salon', health: 'healthy', metric: 'Salon Discovery', value: '87%', trend: 'stable' },
    { id: '3', type: 'artist-salon', health: 'warning', metric: 'Artist-Salon Flow', value: '72%', trend: 'down' },
    { id: '4', type: 'referral', health: 'healthy', metric: 'Referral Success', value: '89%', trend: 'up' },
    { id: '5', type: 'social', health: 'healthy', metric: 'Social Sharing', value: '91%', trend: 'up' }
  ]);

  const [isAuditing, setIsAuditing] = useState(false);

  const runAudit = async () => {
    setIsAuditing(true);
    // Simulate audit process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsAuditing(false);
  };

  const getHealthIcon = (health: NetworkConnection['health']) => {
    switch (health) {
      case 'healthy': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'critical': return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getHealthColor = (health: NetworkConnection['health']) => {
    switch (health) {
      case 'healthy': return 'border-green-200 bg-green-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'critical': return 'border-red-200 bg-red-50';
    }
  };

  const getTrendIcon = (trend: NetworkConnection['trend']) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
    }
  };

  const overallHealth = connections.filter(c => c.health === 'healthy').length / connections.length * 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Ecosystem Network Audit</CardTitle>
            <Button 
              onClick={runAudit} 
              disabled={isAuditing}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isAuditing ? 'animate-spin' : ''}`} />
              {isAuditing ? 'Auditing...' : 'Run Audit'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold">
              {overallHealth >= 90 && '🟢 HEALTHY ECOSYSTEM'}
              {overallHealth >= 70 && overallHealth < 90 && '🟡 NEEDS ATTENTION'}
              {overallHealth < 70 && '🔴 CRITICAL ISSUES'}
            </div>
            <Progress value={overallHealth} className="h-3" />
            <div className="text-sm text-gray-600">
              Overall Network Health: {Math.round(overallHealth)}%
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {connections.map((connection, index) => (
              <motion.div
                key={connection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border ${getHealthColor(connection.health)}`}
              >
                <div className="flex items-center justify-between mb-2">
                  {getHealthIcon(connection.health)}
                  <span className="text-lg">{getTrendIcon(connection.trend)}</span>
                </div>
                <div className="text-xl font-bold mb-1">{connection.value}</div>
                <div className="text-sm font-medium mb-1">{connection.metric}</div>
                <div className="text-xs text-gray-600 capitalize">
                  {connection.type.replace('-', ' → ')}
                </div>
              </motion.div>
            ))}
          </div>

          <Card className="border-2 border-dashed border-primary/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Network Flow Analysis
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>Customer → Artist Bookings</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">94% Success</Badge>
                    <ArrowRight className="h-4 w-4 text-green-500" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>Customer → Salon Discovery</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">87% Success</Badge>
                    <ArrowRight className="h-4 w-4 text-green-500" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span>Artist ↔ Salon Integration</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-yellow-500 text-yellow-700">72% Needs Work</Badge>
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>Referral Network Growth</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">89% Success</Badge>
                    <ArrowRight className="h-4 w-4 text-green-500" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default EcosystemAudit;