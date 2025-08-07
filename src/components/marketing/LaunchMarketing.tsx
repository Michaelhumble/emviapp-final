import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TrendingUp, Users, Share2, Instagram, Twitter, Facebook, Send, Star, Target } from 'lucide-react';
import { motion } from 'framer-motion';

interface Campaign {
  id: string;
  name: string;
  platform: string;
  status: 'draft' | 'scheduled' | 'active' | 'completed';
  reach: number;
  engagement: number;
  conversions: number;
}

const LaunchMarketing = () => {
  const [campaigns] = useState<Campaign[]>([
    { id: '1', name: 'Beauty Influencer Collab', platform: 'Instagram', status: 'scheduled', reach: 45000, engagement: 12.5, conversions: 450 },
    { id: '2', name: 'Viral Referral Push', platform: 'Social', status: 'active', reach: 23000, engagement: 18.2, conversions: 890 },
    { id: '3', name: 'TikTok Beauty Trends', platform: 'TikTok', status: 'draft', reach: 0, engagement: 0, conversions: 0 },
    { id: '4', name: 'Twitter Launch Announce', platform: 'Twitter', status: 'scheduled', reach: 12000, engagement: 8.4, conversions: 120 }
  ]);

  const [newCampaign, setNewCampaign] = useState({
    name: '',
    platform: 'Instagram',
    message: ''
  });

  const launchCampaign = (id: string) => {
    console.log('Launching campaign:', id);
  };

  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'draft': return 'bg-gray-500/10 text-gray-700';
      case 'scheduled': return 'bg-blue-500/10 text-blue-700';
      case 'active': return 'bg-green-500/10 text-green-700';
      case 'completed': return 'bg-purple-500/10 text-purple-700';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram': return <Instagram className="h-4 w-4" />;
      case 'Twitter': return <Twitter className="h-4 w-4" />;
      case 'Facebook': return <Facebook className="h-4 w-4" />;
      case 'TikTok': return <Share2 className="h-4 w-4" />;
      default: return <Share2 className="h-4 w-4" />;
    }
  };

  const totalReach = campaigns.reduce((sum, c) => sum + c.reach, 0);
  const avgEngagement = campaigns.length > 0 ? campaigns.reduce((sum, c) => sum + c.engagement, 0) / campaigns.length : 0;
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Launch Marketing Center</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Campaign Performance Overview */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 border-blue-200 bg-blue-50">
              <div className="text-2xl font-bold text-center text-blue-600">{totalReach.toLocaleString()}</div>
              <div className="text-sm text-blue-600 text-center">Total Reach</div>
            </Card>
            <Card className="p-4 border-green-200 bg-green-50">
              <div className="text-2xl font-bold text-center text-green-600">{avgEngagement.toFixed(1)}%</div>
              <div className="text-sm text-green-600 text-center">Avg Engagement</div>
            </Card>
            <Card className="p-4 border-purple-200 bg-purple-50">
              <div className="text-2xl font-bold text-center text-purple-600">{totalConversions}</div>
              <div className="text-sm text-purple-600 text-center">Conversions</div>
            </Card>
          </div>

          {/* Active Campaigns */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Active Campaigns</h3>
            {campaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border rounded-lg bg-white shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getPlatformIcon(campaign.platform)}
                    <div>
                      <div className="font-medium">{campaign.name}</div>
                      <div className="text-sm text-gray-600">{campaign.platform}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(campaign.status)} variant="secondary">
                      {campaign.status}
                    </Badge>
                    {campaign.status === 'scheduled' && (
                      <Button 
                        size="sm" 
                        onClick={() => launchCampaign(campaign.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Launch Now
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold">{campaign.reach.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">Reach</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">{campaign.engagement}%</div>
                    <div className="text-xs text-gray-600">Engagement</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">{campaign.conversions}</div>
                    <div className="text-xs text-gray-600">Conversions</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Influencer Network */}
          <Card className="border-2 border-dashed border-primary/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Star className="h-5 w-5 mr-2" />
                Influencer Network
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">@beautyguru_sarah</div>
                      <div className="text-sm text-gray-600">145K followers</div>
                    </div>
                    <Badge className="bg-green-500/10 text-green-700">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">@nailsbyemma</div>
                      <div className="text-sm text-gray-600">89K followers</div>
                    </div>
                    <Badge className="bg-blue-500/10 text-blue-700">Scheduled</Badge>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">@hairwizard_mike</div>
                      <div className="text-sm text-gray-600">67K followers</div>
                    </div>
                    <Badge className="bg-gray-500/10 text-gray-700">Pending</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">@salonvibes</div>
                      <div className="text-sm text-gray-600">234K followers</div>
                    </div>
                    <Badge className="bg-green-500/10 text-green-700">Active</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Create New Campaign */}
          <Card className="border-2 border-dashed border-gray-300">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Launch New Campaign
              </h3>
              <div className="space-y-4">
                <Input
                  placeholder="Campaign name..."
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, name: e.target.value }))}
                />
                <select 
                  value={newCampaign.platform}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, platform: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="Instagram">Instagram</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Twitter">Twitter</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Social">Multi-Platform</option>
                </select>
                <Textarea
                  placeholder="Campaign message..."
                  value={newCampaign.message}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, message: e.target.value }))}
                  rows={3}
                />
                <Button 
                  className="w-full"
                  disabled={!newCampaign.name || !newCampaign.message}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Schedule Campaign
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Launch Readiness Checklist */}
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4 text-green-800">🚀 Launch Readiness</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-green-700">
                  <span>✅</span>
                  <span>Influencer partnerships activated</span>
                </div>
                <div className="flex items-center gap-2 text-green-700">
                  <span>✅</span>
                  <span>Social media campaigns scheduled</span>
                </div>
                <div className="flex items-center gap-2 text-green-700">
                  <span>✅</span>
                  <span>Viral referral mechanics active</span>
                </div>
                <div className="flex items-center gap-2 text-green-700">
                  <span>✅</span>
                  <span>Content calendar prepared</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default LaunchMarketing;