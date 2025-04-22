
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import ClientsList from "../../clients/ClientsList";
import { Users } from "lucide-react";

const ClientsTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card className="border-purple-100">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-500" />
            My Clients
          </CardTitle>
        </CardHeader>
      </Card>
      
      <ClientsList />
    </motion.div>
  );
};

export default ClientsTab;
