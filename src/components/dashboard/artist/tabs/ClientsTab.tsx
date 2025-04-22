
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion } from "framer-motion";

// Mock client data
const clients = [
  {
    id: 1,
    name: "Jessica Miller",
    email: "jessica.miller@example.com",
    phone: "(555) 123-4567",
    lastVisit: "Apr 15, 2025",
    totalBookings: 8,
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "(555) 987-6543",
    lastVisit: "Apr 10, 2025",
    totalBookings: 3,
    avatar: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma.davis@example.com",
    phone: "(555) 456-7890",
    lastVisit: "Apr 5, 2025",
    totalBookings: 12,
    avatar: "https://i.pravatar.cc/150?img=9"
  },
  {
    id: 4,
    name: "James Wilson",
    email: "james.wilson@example.com",
    phone: "(555) 789-0123",
    lastVisit: "Mar 28, 2025",
    totalBookings: 5,
    avatar: "https://i.pravatar.cc/150?img=4"
  },
  {
    id: 5,
    name: "Olivia Taylor",
    email: "olivia.taylor@example.com",
    phone: "(555) 234-5678",
    lastVisit: "Mar 22, 2025",
    totalBookings: 2,
    avatar: "https://i.pravatar.cc/150?img=8"
  }
];

const ClientsTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-lg font-medium">Your Clients</CardTitle>
            <p className="text-sm text-gray-500 mt-1">Manage your client relationships</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search clients..."
                className="pl-9 w-full sm:w-[200px] h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 overflow-auto">
        {filteredClients.length > 0 ? (
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="py-3 px-4 text-left font-medium text-gray-600">Client</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600">Contact</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600">Last Visit</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600">Total Bookings</th>
                    <th className="py-3 px-4 text-right font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((client) => (
                    <motion.tr
                      key={client.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={client.avatar}
                            alt={client.name}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                          <span className="font-medium">{client.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col">
                          <span className="text-gray-600">{client.email}</span>
                          <span className="text-gray-500 text-xs">{client.phone}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{client.lastVisit}</td>
                      <td className="py-3 px-4 text-gray-600">{client.totalBookings}</td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-1">No clients found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery ? "Try a different search term" : "Start by adding your first client"}
            </p>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Your First Client
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClientsTab;
