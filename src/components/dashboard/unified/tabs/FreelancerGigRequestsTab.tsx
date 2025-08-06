import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProfileThemeConfig } from '@/utils/profileThemes';
import { 
  Briefcase, 
  Clock, 
  DollarSign, 
  MapPin, 
  Plus, 
  Filter,
  Search,
  Calendar,
  User
} from 'lucide-react';

interface FreelancerGigRequestsTabProps {
  theme: ProfileThemeConfig;
}

const FreelancerGigRequestsTab: React.FC<FreelancerGigRequestsTabProps> = ({ theme }) => {
  // Mock gig requests data
  const gigRequests = [
    {
      id: 1,
      title: 'Wedding Nail Art - Urgent',
      client: 'Sarah M.',
      location: 'Beverly Hills, CA',
      date: '2024-01-15',
      duration: '3 hours',
      budget: '$200-300',
      status: 'new',
      description: 'Looking for intricate bridal nail art for wedding party of 6.',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Corporate Event Manicures',
      client: 'Tech Corp',
      location: 'Downtown LA',
      date: '2024-01-18',
      duration: '5 hours',
      budget: '$500-700',
      status: 'in-progress',
      description: 'Team building event, need mobile nail services for 20 employees.',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Photo Shoot Nail Design',
      client: 'Elite Models',
      location: 'Studio City',
      date: '2024-01-20',
      duration: '2 hours',
      budget: '$150-250',
      status: 'pending',
      description: 'Creative nail art for fashion photo shoot.',
      priority: 'low'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-orange-100 text-orange-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${theme.primaryText}`}>Gig Requests</h2>
          <p className={`${theme.secondaryText} mt-1`}>Manage your freelance project requests</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Search className="w-4 h-4" />
            Search
          </Button>
          <Button className={`${theme.primaryButton} gap-2`}>
            <Plus className="w-4 h-4" />
            New Request
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Gigs', value: '5', icon: Briefcase, color: theme.accentText },
          { label: 'This Week', value: '$1,240', icon: DollarSign, color: 'text-green-600' },
          { label: 'Pending', value: '8', icon: Clock, color: 'text-orange-600' },
          { label: 'Completed', value: '23', icon: User, color: 'text-blue-600' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`${theme.cardBackground} border ${theme.cardBorder}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Gig Requests List */}
      <div className="space-y-4">
        {gigRequests.map((gig, index) => (
          <motion.div
            key={gig.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`${theme.cardBackground} border ${theme.cardBorder} ${theme.cardHover} transition-all duration-200`}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className={`text-lg ${theme.primaryText}`}>{gig.title}</CardTitle>
                    <CardDescription className="mt-1">{gig.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(gig.status)}>{gig.status}</Badge>
                    <Badge className={getPriorityColor(gig.priority)}>{gig.priority}</Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span>{gig.client}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{gig.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{gig.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>{gig.duration}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-green-600">{gig.budget}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {gig.status === 'new' && (
                      <Button className={theme.primaryButton} size="sm">
                        Accept Gig
                      </Button>
                    )}
                    {gig.status === 'in-progress' && (
                      <Button className={theme.secondaryButton} size="sm">
                        Update Status
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {gigRequests.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No gig requests yet</h3>
          <p className="text-gray-600 mb-6">Start promoting your services to get your first gig request!</p>
          <Button className={theme.primaryButton}>
            Update Your Profile
          </Button>
        </div>
      )}
    </div>
  );
};

export default FreelancerGigRequestsTab;