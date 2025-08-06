import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProfileThemeConfig } from '@/utils/profileThemes';
import { 
  Users, 
  Clock, 
  Calendar, 
  Plus, 
  Phone,
  Mail,
  Star,
  MapPin,
  Filter,
  Search
} from 'lucide-react';

interface ArtistClientBookingsTabProps {
  theme: ProfileThemeConfig;
}

const ArtistClientBookingsTab: React.FC<ArtistClientBookingsTabProps> = ({ theme }) => {
  // Mock client data
  const clients = [
    {
      id: 1,
      name: 'Jessica Chen',
      email: 'jessica.c@email.com',
      phone: '(555) 123-4567',
      lastVisit: '2024-01-10',
      nextAppointment: '2024-01-20',
      totalVisits: 12,
      favoriteService: 'Gel Manicure',
      notes: 'Prefers neutral colors, allergic to certain gel brands',
      status: 'regular',
      rating: 5
    },
    {
      id: 2,
      name: 'Maria Rodriguez',
      email: 'maria.r@email.com',
      phone: '(555) 987-6543',
      lastVisit: '2024-01-08',
      nextAppointment: null,
      totalVisits: 3,
      favoriteService: 'Nail Art',
      notes: 'Loves bold designs and glitter',
      status: 'new',
      rating: 5
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '(555) 456-7890',
      lastVisit: '2023-12-15',
      nextAppointment: '2024-01-25',
      totalVisits: 8,
      favoriteService: 'Pedicure',
      notes: 'Always books monthly appointments',
      status: 'loyal',
      rating: 4
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-green-100 text-green-800';
      case 'regular': return 'bg-blue-100 text-blue-800';
      case 'loyal': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${theme.primaryText}`}>Client Management</h2>
          <p className={`${theme.secondaryText} mt-1`}>Manage your client relationships and bookings</p>
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
            Add Client
          </Button>
        </div>
      </div>

      {/* Client Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Clients', value: '47', icon: Users, color: theme.accentText },
          { label: 'This Month', value: '8', icon: Calendar, color: 'text-blue-600' },
          { label: 'Returning', value: '89%', icon: Star, color: 'text-green-600' },
          { label: 'Avg Rating', value: '4.8', icon: Star, color: 'text-yellow-600' }
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

      {/* Clients List */}
      <div className="space-y-4">
        {clients.map((client, index) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`${theme.cardBackground} border ${theme.cardBorder} ${theme.cardHover} transition-all duration-200`}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className={`text-lg ${theme.primaryText}`}>{client.name}</CardTitle>
                    <CardDescription className="mt-1">{client.favoriteService} • {client.totalVisits} visits</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{client.rating}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>{client.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{client.phone}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>Last visit: {client.lastVisit}</span>
                    </div>
                    {client.nextAppointment && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>Next: {client.nextAppointment}</span>
                      </div>
                    )}
                  </div>
                </div>

                {client.notes && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-700">
                      <strong>Notes:</strong> {client.notes}
                    </p>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Calendar className="w-4 h-4" />
                      Book Appointment
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Phone className="w-4 h-4" />
                      Contact
                    </Button>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    View History
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {clients.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No clients yet</h3>
          <p className="text-gray-600 mb-6">Start building your client base by adding your first client!</p>
          <Button className={theme.primaryButton}>
            Add Your First Client
          </Button>
        </div>
      )}
    </div>
  );
};

export default ArtistClientBookingsTab;