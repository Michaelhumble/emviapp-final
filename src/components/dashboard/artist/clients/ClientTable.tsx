import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ClientData } from "./types";
import { formatDistanceToNow, format } from "date-fns";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Eye, Search, SortAsc, Calendar, Hash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ClientTableProps {
  clients: ClientData[];
  isLoading: boolean;
  onViewClient: (client: ClientData) => void;
  sortBy: 'recent' | 'frequent' | 'alphabetical';
  onChangeSortBy: (sort: 'recent' | 'frequent' | 'alphabetical') => void;
}

const ClientTable = ({ 
  clients, 
  isLoading, 
  onViewClient, 
  sortBy, 
  onChangeSortBy 
}: ClientTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const getSortedClients = () => {
    if (!clients) return [];
    
    const clientsCopy = [...clients];
    
    switch (sortBy) {
      case 'recent':
        // Since we don't have lastVisit, default to created_at if we add it to the table
        return clientsCopy.sort((a, b) => {
          // Default to alphabetical if no creation date
          return a.name.localeCompare(b.name);
        });
      case 'frequent':
        // Since visitCount is always 0 for now, sort by name
        return clientsCopy.sort((a, b) => a.name.localeCompare(b.name));
      case 'alphabetical':
        return clientsCopy.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return clientsCopy;
    }
  };

  const filteredClients = getSortedClients().filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone.includes(searchQuery)
  );

  const maskPhone = (phone: string) => {
    if (!phone || phone.length < 4) return "—";
    return `***-***-${phone.slice(-4)}`;
  };

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "Never";
    
    const date = new Date(dateString);
    const now = new Date();
    
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(now.getMonth() - 2);
    
    if (date > twoMonthsAgo) {
      return formatDistanceToNow(date, { addSuffix: true });
    } else {
      return format(date, 'MMM d, yyyy');
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 w-full"
          />
        </div>
        
        <Select 
          value={sortBy} 
          onValueChange={(value) => onChangeSortBy(value as any)}
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                Most Recent
              </div>
            </SelectItem>
            <SelectItem value="frequent">
              <div className="flex items-center">
                <Hash className="mr-2 h-4 w-4" />
                Most Visits
              </div>
            </SelectItem>
            <SelectItem value="alphabetical">
              <div className="flex items-center">
                <SortAsc className="mr-2 h-4 w-4" />
                Alphabetical
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[180px] md:w-[250px]">Name</TableHead>
              <TableHead className="hidden md:table-cell">Phone</TableHead>
              <TableHead className="text-center">Visits</TableHead>
              <TableHead className="hidden sm:table-cell">Last Visit</TableHead>
              <TableHead className="w-[70px] text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(5).fill(0).map((_, i) => (
                <TableRow key={`loading-${i}`}>
                  <TableCell><Skeleton className="h-6 w-36" /></TableCell>
                  <TableCell className="hidden md:table-cell"><Skeleton className="h-6 w-24" /></TableCell>
                  <TableCell className="text-center"><Skeleton className="h-6 w-8 mx-auto" /></TableCell>
                  <TableCell className="hidden sm:table-cell"><Skeleton className="h-6 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-12 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : filteredClients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-32 text-gray-500">
                  {searchQuery ? (
                    <div className="py-8">
                      <p>No clients matching "{searchQuery}"</p>
                      <p className="text-sm mt-1">Try a different search term</p>
                    </div>
                  ) : (
                    <div className="py-8">
                      <p>No clients yet</p>
                      <p className="text-sm mt-1">Add clients manually or complete bookings</p>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ) : (
              filteredClients.map((client, index) => (
                <motion.tr
                  key={client.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="border-b hover:bg-gray-50"
                >
                  <TableCell className="font-medium">
                    {client.name}
                    {client.isManualEntry && (
                      <span className="ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-800">
                        Manual
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-gray-600">
                    {client.phone ? maskPhone(client.phone) : "—"}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="inline-flex items-center justify-center rounded-full w-8 h-8 bg-purple-50 text-purple-700 font-medium">
                      {client.visitCount}
                    </span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-gray-600">
                    {formatDate(client.lastVisit)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewClient(client)}
                      className="text-purple-700 hover:text-purple-900 hover:bg-purple-50"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      <span className="sr-only md:not-sr-only md:inline-block">View</span>
                    </Button>
                  </TableCell>
                </motion.tr>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ClientTable;
