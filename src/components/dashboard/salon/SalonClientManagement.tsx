
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Users, UserPlus, Search, Phone, MessageSquare, Calendar, Plus } from "lucide-react";
import { toast } from "sonner";

// Mock data for clients
const mockClients = [
  {
    id: "1",
    name: "Jessica Lee",
    phone: "555-123-4567",
    email: "jessica@example.com",
    servicesReceived: ["Manicure", "Pedicure", "Gel Nails"],
    lastVisit: "2025-04-03",
    visits: 12,
    status: "frequent"
  },
  {
    id: "2",
    name: "Robert Smith",
    phone: "555-234-5678",
    email: "robert@example.com",
    servicesReceived: ["Haircut"],
    lastVisit: "2025-03-15",
    visits: 3,
    status: "regular"
  },
  {
    id: "3",
    name: "Emily Johnson",
    phone: "555-345-6789",
    email: "emily@example.com",
    servicesReceived: ["Hair Color", "Styling"],
    lastVisit: "2025-01-10",
    visits: 1,
    status: "inactive"
  },
  {
    id: "4",
    name: "Michael Brown",
    phone: "555-456-7890",
    email: "michael@example.com",
    servicesReceived: ["Haircut", "Beard Trim"],
    lastVisit: "2025-04-01",
    visits: 2,
    status: "new"
  },
  {
    id: "5",
    name: "Sarah Wilson",
    phone: "555-567-8901",
    email: "sarah@example.com",
    servicesReceived: ["Manicure", "Pedicure"],
    lastVisit: "2025-03-28",
    visits: 6,
    status: "regular"
  }
];

const SalonClientManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const filteredClients = mockClients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-500">New</Badge>;
      case "frequent":
        return <Badge className="bg-green-500">Frequent</Badge>;
      case "inactive":
        return <Badge className="bg-gray-500">Inactive</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-800">Regular</Badge>;
    }
  };

  const maskPhoneNumber = (phone: string) => {
    // Only show last 4 digits
    return phone.replace(/^\d{3}-\d{3}-(\d{4})$/, "***-***-$1");
  };

  const formatLastVisit = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const handleAddClient = () => {
    // Validate form
    if (!newClient.name || !newClient.phone) {
      toast.error("Name and phone are required");
      return;
    }

    // In a real implementation, this would send data to Supabase
    toast.success(`Client ${newClient.name} added successfully`);
    setIsAddClientModalOpen(false);
    
    // Reset form
    setNewClient({
      name: "",
      phone: "",
      email: "",
    });
  };

  const handleSendMessage = (clientName: string) => {
    toast.info(`Message dialog for ${clientName} would open here`);
    // In a real implementation, this would open a messaging interface
  };

  return (
    <Card className="border-blue-100">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center">
          <Users className="h-5 w-5 text-blue-500 mr-2" />
          Client Management
        </CardTitle>
        <Button size="sm" onClick={() => setIsAddClientModalOpen(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search clients by name or phone..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Clients list */}
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="py-3 px-4 text-left font-medium">Client Name</th>
                    <th className="py-3 px-4 text-left font-medium">Phone</th>
                    <th className="py-3 px-4 text-left font-medium">Services</th>
                    <th className="py-3 px-4 text-left font-medium">Last Visit</th>
                    <th className="py-3 px-4 text-left font-medium">Status</th>
                    <th className="py-3 px-4 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-gray-500">
                        No clients found matching your search
                      </td>
                    </tr>
                  ) : (
                    filteredClients.map((client) => (
                      <tr key={client.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="font-medium">{client.name}</div>
                          <div className="text-xs text-gray-500">{client.email}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Phone className="h-3 w-3 text-gray-400 mr-1" />
                            {maskPhoneNumber(client.phone)}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {client.servicesReceived.slice(0, 2).map((service, idx) => (
                              <span key={idx} className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs">
                                {service}
                              </span>
                            ))}
                            {client.servicesReceived.length > 2 && (
                              <span className="inline-block px-2 py-0.5 bg-gray-50 text-gray-700 rounded-full text-xs">
                                +{client.servicesReceived.length - 2} more
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 text-gray-400 mr-1" />
                            {formatLastVisit(client.lastVisit)}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {getStatusBadge(client.status)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleSendMessage(client.name)}
                            >
                              <MessageSquare className="h-4 w-4 text-blue-500" />
                              <span className="sr-only">Message</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
      
      {/* Add Client Modal */}
      <Dialog open={isAddClientModalOpen} onOpenChange={setIsAddClientModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Client</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="clientName">Full Name</Label>
              <Input
                id="clientName"
                placeholder="Enter client's full name"
                value={newClient.name}
                onChange={(e) => setNewClient({...newClient, name: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="clientPhone">Phone Number</Label>
              <Input
                id="clientPhone"
                placeholder="Enter client's phone number"
                value={newClient.phone}
                onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="clientEmail">Email Address (Optional)</Label>
              <Input
                id="clientEmail"
                type="email"
                placeholder="Enter client's email address"
                value={newClient.email}
                onChange={(e) => setNewClient({...newClient, email: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddClient}>
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default SalonClientManagement;
