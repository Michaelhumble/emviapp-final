import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Search, 
  Plus, 
  Calendar, 
  Phone, 
  Mail,
  Star,
  Clock,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '@/context/auth';
import { useArtistBookings } from '../hooks/useArtistBookings';
import { supabase } from '@/integrations/supabase/client';

interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
  total_bookings: number;
  last_booking: string;
  preferred_services: string[];
  notes?: string;
  loyalty_status: 'new' | 'regular' | 'vip';
}

export const ClientManagementSystem: React.FC = () => {
  const { user } = useAuth();
  const { bookings } = useArtistBookings();
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    generateClientsFromBookings();
  }, [bookings]);

  const generateClientsFromBookings = () => {
    const clientMap = new Map<string, Client>();

    bookings.forEach(booking => {
      if (booking.client_name) {
        const clientKey = booking.client_name.toLowerCase();
        
        if (clientMap.has(clientKey)) {
          const existingClient = clientMap.get(clientKey)!;
          existingClient.total_bookings += 1;
          
          // Update last booking if this one is more recent
          if (new Date(booking.created_at) > new Date(existingClient.last_booking)) {
            existingClient.last_booking = booking.created_at;
          }
          
          // Add service to preferred services
          if (booking.service_name && !existingClient.preferred_services.includes(booking.service_name)) {
            existingClient.preferred_services.push(booking.service_name);
          }
        } else {
          const newClient: Client = {
            id: booking.sender_id || `client-${Date.now()}-${Math.random()}`,
            name: booking.client_name,
            email: booking.sender_id ? undefined : undefined, // Would need to fetch from profiles
            phone: undefined,
            total_bookings: 1,
            last_booking: booking.created_at,
            preferred_services: booking.service_name ? [booking.service_name] : [],
            loyalty_status: 'new'
          };
          clientMap.set(clientKey, newClient);
        }
      }
    });

    // Determine loyalty status based on booking count
    const clientsArray = Array.from(clientMap.values()).map(client => ({
      ...client,
      loyalty_status: client.total_bookings >= 10 ? 'vip' as const :
                     client.total_bookings >= 3 ? 'regular' as const : 
                     'new' as const
    }));

    setClients(clientsArray.sort((a, b) => b.total_bookings - a.total_bookings));
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getClientBookings = (clientName: string) => {
    return bookings.filter(booking => 
      booking.client_name?.toLowerCase() === clientName.toLowerCase()
    );
  };

  const getLoyaltyBadgeColor = (status: string) => {
    switch (status) {
      case 'vip': return 'bg-purple-100 text-purple-800';
      case 'regular': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const ClientCard = ({ client }: { client: Client }) => (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => setSelectedClient(client)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={client.avatar} />
              <AvatarFallback>
                {client.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{client.name}</h3>
              {client.email && (
                <p className="text-sm text-muted-foreground">{client.email}</p>
              )}
              <div className="flex items-center gap-2 mt-1">
                <Badge className={getLoyaltyBadgeColor(client.loyalty_status)}>
                  {client.loyalty_status.toUpperCase()}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {client.total_bookings} bookings
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Last visit</p>
            <p className="text-sm">
              {new Date(client.last_booking).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        {client.preferred_services.length > 0 && (
          <div className="mt-3">
            <p className="text-xs text-muted-foreground mb-1">Preferred Services</p>
            <div className="flex flex-wrap gap-1">
              {client.preferred_services.slice(0, 3).map((service, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {service}
                </Badge>
              ))}
              {client.preferred_services.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{client.preferred_services.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const ClientStats = () => {
    const totalClients = clients.length;
    const vipClients = clients.filter(c => c.loyalty_status === 'vip').length;
    const newClients = clients.filter(c => c.loyalty_status === 'new').length;
    const avgBookingsPerClient = totalClients > 0 
      ? (clients.reduce((sum, c) => sum + c.total_bookings, 0) / totalClients).toFixed(1)
      : '0';

    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Total Clients</span>
            </div>
            <p className="text-2xl font-bold">{totalClients}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-purple-500" />
              <span className="text-sm text-muted-foreground">VIP Clients</span>
            </div>
            <p className="text-2xl font-bold text-purple-600">{vipClients}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">New Clients</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{newClients}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-muted-foreground">Avg Bookings</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{avgBookingsPerClient}</p>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <ClientStats />
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Client Management
            </CardTitle>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Clients</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="regular">Regular</TabsTrigger>
              <TabsTrigger value="vip">VIP</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4 mt-4">
              <div className="grid gap-4">
                {filteredClients.map((client) => (
                  <ClientCard key={client.id} client={client} />
                ))}
                {filteredClients.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No clients found
                  </p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="new" className="space-y-4 mt-4">
              <div className="grid gap-4">
                {filteredClients.filter(c => c.loyalty_status === 'new').map((client) => (
                  <ClientCard key={client.id} client={client} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="regular" className="space-y-4 mt-4">
              <div className="grid gap-4">
                {filteredClients.filter(c => c.loyalty_status === 'regular').map((client) => (
                  <ClientCard key={client.id} client={client} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="vip" className="space-y-4 mt-4">
              <div className="grid gap-4">
                {filteredClients.filter(c => c.loyalty_status === 'vip').map((client) => (
                  <ClientCard key={client.id} client={client} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Client Detail Modal would go here */}
      {selectedClient && (
        <Card className="fixed inset-4 z-50 bg-background border shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{selectedClient.name}</CardTitle>
              <Button variant="outline" onClick={() => setSelectedClient(null)}>
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                  <p className="font-medium">{selectedClient.total_bookings}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Loyalty Status</p>
                  <Badge className={getLoyaltyBadgeColor(selectedClient.loyalty_status)}>
                    {selectedClient.loyalty_status.toUpperCase()}
                  </Badge>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Booking History</p>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {getClientBookings(selectedClient.name).map((booking) => (
                    <div key={booking.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{booking.service_name}</p>
                          <p className="text-sm text-muted-foreground">
                            {booking.date_requested} at {booking.time_requested}
                          </p>
                        </div>
                        <Badge>{booking.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};