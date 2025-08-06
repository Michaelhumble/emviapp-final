import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Crown, Lock, Star, Users, Calendar, Gift, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VipEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  attendees: number;
  maxAttendees: number;
  type: 'masterclass' | 'networking' | 'exclusive';
  host: {
    name: string;
    avatar: string;
    title: string;
  };
}

interface VipMember {
  id: string;
  name: string;
  avatar: string;
  joinDate: Date;
  contributions: number;
  specialBadge?: string;
}

const VipLounge = () => {
  const [userVipStatus, setUserVipStatus] = useState<'none' | 'pending' | 'active'>('none');
  const [inviteCode, setInviteCode] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Mock VIP events
  const vipEvents: VipEvent[] = [
    {
      id: '1',
      title: '👑 Advanced Color Theory Masterclass',
      description: 'Exclusive session with celebrity colorist Maria Santos',
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      attendees: 12,
      maxAttendees: 15,
      type: 'masterclass',
      host: {
        name: 'Maria Santos',
        avatar: '/api/placeholder/40/40',
        title: 'Celebrity Hair Colorist'
      }
    },
    {
      id: '2',
      title: '🌟 VIP Networking Night',
      description: 'Connect with top industry professionals and salon owners',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      attendees: 8,
      maxAttendees: 20,
      type: 'networking',
      host: {
        name: 'EmviApp Team',
        avatar: '/api/placeholder/40/40',
        title: 'Platform Hosts'
      }
    },
    {
      id: '3',
      title: '💎 Product Launch Preview',
      description: 'First look at the latest beauty tools before public release',
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      attendees: 6,
      maxAttendees: 10,
      type: 'exclusive',
      host: {
        name: 'Beauty Brand Partners',
        avatar: '/api/placeholder/40/40',
        title: 'Industry Partners'
      }
    }
  ];

  // Mock VIP members
  const vipMembers: VipMember[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      avatar: '/api/placeholder/40/40',
      joinDate: new Date(2024, 0, 15),
      contributions: 127,
      specialBadge: 'Founding Member'
    },
    {
      id: '2',
      name: 'Maria Garcia',
      avatar: '/api/placeholder/40/40',
      joinDate: new Date(2024, 1, 3),
      contributions: 89,
      specialBadge: 'Top Contributor'
    },
    {
      id: '3',
      name: 'Jessica Kim',
      avatar: '/api/placeholder/40/40',
      joinDate: new Date(2024, 1, 20),
      contributions: 156,
      specialBadge: 'Community Leader'
    }
  ];

  const handleInviteCodeSubmit = () => {
    if (inviteCode.trim()) {
      setUserVipStatus('pending');
      // Simulate verification process
      setTimeout(() => {
        setUserVipStatus('active');
      }, 2000);
    }
  };

  const handleGenerateInviteCode = () => {
    const code = 'VIP-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'masterclass': return '🎓';
      case 'networking': return '🤝';
      case 'exclusive': return '💎';
      default: return '✨';
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'masterclass': return 'from-blue-500 to-purple-500';
      case 'networking': return 'from-green-500 to-teal-500';
      case 'exclusive': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  // Non-VIP view
  if (userVipStatus === 'none') {
    return (
      <Card className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white border-purple-600">
        <CardContent className="p-8 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="mb-6"
          >
            <Crown className="h-16 w-16 text-yellow-400 mx-auto" />
          </motion.div>
          
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
            VIP Lounge
          </h2>
          
          <p className="text-purple-100 mb-6 leading-relaxed">
            Join our exclusive VIP community for masterclasses, networking events, 
            and early access to premium features. Limited to top contributors only.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { icon: '🎓', title: 'Masterclasses', desc: 'Learn from industry legends' },
              { icon: '🤝', title: 'Networking', desc: 'Connect with top professionals' },
              { icon: '💎', title: 'Exclusive Access', desc: 'First look at new features' }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
              >
                <div className="text-2xl mb-2">{benefit.icon}</div>
                <h4 className="font-semibold mb-1">{benefit.title}</h4>
                <p className="text-sm text-purple-200">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <Input
                placeholder="Enter VIP invite code..."
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-purple-200"
              />
              <Button 
                onClick={handleInviteCodeSubmit}
                disabled={!inviteCode.trim()}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold"
              >
                Join VIP
              </Button>
            </div>
            
            <div className="text-center">
              <p className="text-purple-200 text-sm mb-2">Don't have a code?</p>
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
              >
                Apply for VIP Status
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Pending verification
  if (userVipStatus === 'pending') {
    return (
      <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300">
        <CardContent className="p-8 text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Crown className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-yellow-800 mb-4">Verifying VIP Status...</h2>
          <p className="text-yellow-700">Please wait while we verify your invite code.</p>
        </CardContent>
      </Card>
    );
  }

  // Active VIP view
  return (
    <div className="space-y-6">
      {/* VIP Header */}
      <Card className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white border-purple-600">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Crown className="h-8 w-8 text-yellow-400" />
              <div>
                <h2 className="text-xl font-bold">Welcome to VIP Lounge</h2>
                <p className="text-purple-200">Exclusive access granted</p>
              </div>
            </div>
            
            <Button 
              onClick={() => setShowInviteModal(true)}
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Gift className="mr-2 h-4 w-4" />
              Invite Friends
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* VIP Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            Exclusive Events
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {vipEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-xl p-4 hover:border-purple-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{getEventTypeIcon(event.type)}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-600">{event.description}</p>
                  </div>
                </div>
                <Badge className={`bg-gradient-to-r ${getEventTypeColor(event.type)} text-white`}>
                  {event.type}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{event.date.toLocaleDateString()}</span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {event.attendees}/{event.maxAttendees}
                  </span>
                </div>
                
                <Button 
                  size="sm"
                  className={`bg-gradient-to-r ${getEventTypeColor(event.type)} hover:opacity-90 text-white`}
                >
                  RSVP
                </Button>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* VIP Members */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            VIP Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {vipMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200"
              >
                <div className="text-center">
                  <img 
                    src={member.avatar} 
                    alt={member.name}
                    className="w-16 h-16 rounded-full mx-auto mb-3 ring-2 ring-purple-300"
                  />
                  <h4 className="font-semibold text-gray-900">{member.name}</h4>
                  {member.specialBadge && (
                    <Badge variant="secondary" className="mt-1 bg-yellow-100 text-yellow-800">
                      {member.specialBadge}
                    </Badge>
                  )}
                  <p className="text-sm text-gray-600 mt-2">{member.contributions} contributions</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Invite Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl p-6 max-w-md mx-4"
            >
              <h3 className="text-xl font-bold mb-4">Invite Friends to VIP</h3>
              <p className="text-gray-600 mb-4">
                Share your exclusive invite code with trusted friends in the beauty industry.
              </p>
              
              <Button 
                onClick={handleGenerateInviteCode}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold mb-4"
              >
                {copiedCode ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Code Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Generate & Copy Code
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => setShowInviteModal(false)}
                className="w-full"
              >
                Close
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VipLounge;