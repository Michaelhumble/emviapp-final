
import { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, CalendarDays, User } from "lucide-react";
import { format } from "date-fns";

interface Client {
  id: string;
  name: string;
  avatar?: string;
  lastAppointment: string;
  totalBookings: number;
}

// Mock data - replace with real data when available
const mockClients: Client[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "",
    lastAppointment: "2025-04-15",
    totalBookings: 5
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "",
    lastAppointment: "2025-04-10",
    totalBookings: 3
  },
  {
    id: "3",
    name: "Emma Williams",
    avatar: "",
    lastAppointment: "2025-04-05",
    totalBookings: 8
  }
];

const ClientsList = () => {
  const [clients] = useState<Client[]>(mockClients);

  const handleMessage = (clientId: string) => {
    console.log("Message client:", clientId);
    // Implement messaging functionality
  };

  const handleRebook = (clientId: string) => {
    console.log("Rebook client:", clientId);
    // Implement rebooking functionality
  };

  return (
    <div className="space-y-4">
      {clients.length > 0 ? (
        clients.map((client, index) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={client.avatar} />
                      <AvatarFallback className="bg-purple-100 text-purple-700">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{client.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" />
                        Last visit: {format(new Date(client.lastAppointment), "MMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMessage(client.id)}
                      className="text-purple-600 border-purple-200 hover:bg-purple-50"
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleRebook(client.id)}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <CalendarDays className="h-4 w-4 mr-1" />
                      Rebook
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))
      ) : (
        <Card className="p-8">
          <div className="text-center">
            <User className="h-12 w-12 mx-auto text-purple-300 mb-3" />
            <h3 className="text-lg font-medium mb-2">No Clients Yet</h3>
            <p className="text-muted-foreground">
              When clients book with you, they'll appear here!
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ClientsList;
