
import { useState } from "react";
import { motion } from "framer-motion";
import { ClientManager } from "../../clients/ClientManager";

const ClientsTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <ClientManager />
    </motion.div>
  );
};

export default ClientsTab;
