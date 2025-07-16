
/**
 * MAIN DASHBOARD PAGE - UPDATED TO USE CENTRALIZED ROUTING
 * 
 * This now uses DashboardRouter for all role-based routing logic
 * IMPORTANT: All old redirect logic has been moved to DashboardRouter
 */

import { useEffect } from "react";
import { useAuth } from "@/context/auth";
import DashboardRouter from "@/components/dashboard/DashboardRouter";
import { migrateSingleToMultiSalon } from "@/utils/migration/migrateSingleToMultiSalon";

const DashboardPage = () => {
  const { user, userRole } = useAuth();

  // TODO: LEGACY CODE - Keep salon migration for now, remove after verification
  useEffect(() => {
    // If user exists and is a salon owner, check if we need to migrate
    if (user && userRole === "owner") {
      migrateSingleToMultiSalon(user.id)
        .then((salonId) => {
          if (salonId) {
            console.log("Salon migrated successfully, ID:", salonId);
          }
        })
        .catch((error) => {
          console.error("Error during migration:", error);
        });
    }
  }, [user, userRole]);

  // CENTRALIZED ROUTING: Use DashboardRouter for ALL role-based logic
  return <DashboardRouter />;
};

export default DashboardPage;
