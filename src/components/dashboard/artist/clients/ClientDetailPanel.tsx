
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClientData } from "./types";
import { X, Save, Phone, Calendar, DollarSign, Edit } from "lucide-react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";

interface ClientDetailPanelProps {
  client: ClientData;
  onClose: () => void;
  onSaveNotes: (clientId: string, notes: string) => Promise<void>;
}

const ClientDetailPanel = ({ client, onClose, onSaveNotes }: ClientDetailPanelProps) => {
  const [notes, setNotes] = useState(client.notes);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setNotes(client.notes);
  }, [client.notes]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSaveNotes(client.id, notes);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Function to mask phone number
  const formatPhone = (phone: string) => {
    if (!phone) return "Not provided";
    
    // Format as XXX-XXX-XXXX if 10 digits
    if (phone.replace(/\D/g, '').length === 10) {
      const cleaned = phone.replace(/\D/g, '');
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
    
    return phone;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border border-gray-100 shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b flex flex-row justify-between items-center">
          <div>
            <h3 className="text-xl font-serif font-semibold">{client.name}</h3>
            <p className="text-gray-600 flex items-center mt-1">
              <Phone className="h-4 w-4 mr-1" />
              {formatPhone(client.phone)}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-4 space-y-6">
          {/* Client Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-purple-50 rounded-lg p-3 text-center">
              <div className="text-purple-700 text-xs font-medium mb-1 flex items-center justify-center">
                <Calendar className="h-3.5 w-3.5 mr-1" /> VISITS
              </div>
              <div className="text-2xl font-bold text-purple-900">{client.visitCount}</div>
            </div>
            
            <div className="bg-pink-50 rounded-lg p-3 text-center">
              <div className="text-pink-700 text-xs font-medium mb-1 flex items-center justify-center">
                <DollarSign className="h-3.5 w-3.5 mr-1" /> TOTAL SPENT
              </div>
              <div className="text-2xl font-bold text-pink-900">{formatCurrency(client.totalSpent)}</div>
            </div>
            
            <div className="col-span-2 md:col-span-1 bg-blue-50 rounded-lg p-3 text-center">
              <div className="text-blue-700 text-xs font-medium mb-1 flex items-center justify-center">
                <Calendar className="h-3.5 w-3.5 mr-1" /> LAST VISIT
              </div>
              <div className="text-xl font-bold text-blue-900">
                {client.lastVisit ? format(new Date(client.lastVisit), 'MMM d, yyyy') : 'Never'}
              </div>
            </div>
          </div>
          
          {/* Notes Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-800">Client Notes</h4>
              {!isEditing ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsEditing(true)}
                  className="h-7 text-xs"
                >
                  <Edit className="h-3 w-3 mr-1" /> Edit
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setIsEditing(false);
                      setNotes(client.notes);
                    }}
                    className="h-7 text-xs"
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="h-7 text-xs bg-purple-600 hover:bg-purple-700"
                  >
                    <Save className="h-3 w-3 mr-1" /> Save
                  </Button>
                </div>
              )}
            </div>
            
            {isEditing ? (
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about this client's preferences, allergies, etc."
                className="min-h-[100px]"
              />
            ) : (
              <div className="p-3 bg-gray-50 rounded-md min-h-[100px]">
                {notes ? (
                  <p className="text-gray-700 whitespace-pre-wrap">{notes}</p>
                ) : (
                  <p className="text-gray-400 italic">No notes yet. Click Edit to add notes about this client.</p>
                )}
              </div>
            )}
          </div>
          
          {/* Booking History */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-800">Booking History</h4>
            
            {client.bookingHistory.length === 0 ? (
              <div className="text-center py-6 bg-gray-50 rounded-md">
                <p className="text-gray-500">No booking history yet</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {client.bookingHistory
                  .sort((a, b) => {
                    if (!a.date) return 1;
                    if (!b.date) return -1;
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                  })
                  .map((booking, index) => (
                    <div 
                      key={booking.id}
                      className="p-3 border border-gray-100 rounded-md shadow-sm hover:shadow-md transition-shadow flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium text-purple-800">{booking.service}</p>
                        <p className="text-xs text-gray-500">
                          {booking.date ? format(new Date(booking.date), 'MMM d, yyyy') : 'Date not specified'}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-700 font-medium">
                          {formatCurrency(booking.price)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'completed' ? 'bg-green-100 text-green-800' : 
                          booking.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {booking.status || 'unknown'}
                        </span>
                      </div>
                    </div>
                  ))
                }
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ClientDetailPanel;
