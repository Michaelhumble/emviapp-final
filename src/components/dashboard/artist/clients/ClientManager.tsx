
import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useClientList } from "./hooks/useClientList";
import ClientTable from "./ClientTable";
import ClientDetailPanel from "./ClientDetailPanel";
import AddClientModal from "./AddClientModal";
import { Button } from "@/components/ui/button";
import { ClientData } from "./types";
import { Plus, Users } from "lucide-react";
import { motion } from "framer-motion";

export const ClientManager = () => {
  const { clients, isLoading, addClient, updateClientNotes, refetchClients } = useClientList();
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'frequent' | 'alphabetical'>('recent');

  const handleViewClient = (client: ClientData) => {
    setSelectedClient(client);
  };

  const handleCloseDetailView = () => {
    setSelectedClient(null);
  };

  const handleAddClient = (clientData: Omit<ClientData, 'id' | 'totalSpent' | 'visitCount' | 'lastVisit'>) => {
    addClient(clientData);
    setShowAddModal(false);
  };

  const handleSaveNotes = async (clientId: string, notes: string) => {
    await updateClientNotes(clientId, notes);
    refetchClients();
  };

  const getSortedClients = () => {
    if (!clients) return [];
    
    const clientsCopy = [...clients];
    
    switch (sortBy) {
      case 'recent':
        return clientsCopy.sort((a, b) => {
          if (!a.lastVisit) return 1;
          if (!b.lastVisit) return -1;
          return new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime();
        });
      case 'frequent':
        return clientsCopy.sort((a, b) => (b.visitCount || 0) - (a.visitCount || 0));
      case 'alphabetical':
        return clientsCopy.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return clientsCopy;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <Card className="border border-gray-100 overflow-hidden shadow-md">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-purple-600 mr-2" />
              <h2 className="text-xl font-serif font-semibold">My Clients</h2>
            </div>
            <Button 
              onClick={() => setShowAddModal(true)} 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-1" /> Add New Client
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ClientTable 
            clients={getSortedClients()} 
            isLoading={isLoading} 
            onViewClient={handleViewClient}
            sortBy={sortBy}
            onChangeSortBy={setSortBy}
          />
        </CardContent>
      </Card>

      {selectedClient && (
        <ClientDetailPanel 
          client={selectedClient}
          onClose={handleCloseDetailView}
          onSaveNotes={handleSaveNotes}
        />
      )}

      <AddClientModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddClient={handleAddClient}
      />
    </motion.div>
  );
};
