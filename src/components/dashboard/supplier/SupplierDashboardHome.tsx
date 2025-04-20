
import React from "react";
import { useAuth } from "@/context/auth";
import { Package, Plus, TrendingUp, MessageSquare } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ListingsOverviewCard from "./SupplierDashboardHome_ListingsOverviewCard";
import SupplierStatsCard from "./SupplierDashboardHome_SupplierStatsCard";
import InquiriesCard from "./SupplierDashboardHome_InquiriesCard";
import { Link } from "react-router-dom";

const SupplierDashboardHome = () => {
  const { userProfile } = useAuth();
  const supplierName = userProfile?.company_name || userProfile?.full_name || "Supplier";

  return (
    <div className="max-w-4xl mx-auto py-8 px-3">
      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-playfair font-bold tracking-tight text-gray-900">
          Welcome, <span className="text-primary">{supplierName}</span> — <span className="font-normal">ready to grow your brand?</span>
        </h1>
      </div>

      {/* Responsive Grid */}
      <div className="grid md:grid-cols-3 gap-5">
        {/* Listings Overview */}
        <div className="md:col-span-2 flex flex-col gap-5">
          <ListingsOverviewCard />
          <SupplierStatsCard />
        </div>

        {/* Right Column / Stacked on mobile */}
        <div className="flex flex-col gap-5">
          <AddListingCard />
          <InquiriesCard />
        </div>
      </div>
    </div>
  );
};

// Add/Edit Listings Card
function AddListingCard() {
  return (
    <Card className="rounded-2xl bg-gradient-to-br from-orange-50 to-pink-50 border-0 shadow-lg">
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <Plus className="h-6 w-6 text-orange-500" />
        <CardTitle className="text-base font-playfair">Add/Edit Listings</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="default" className="w-full font-semibold" asChild>
          <Link to="/supplier/products">Post New Listing</Link>
        </Button>
        <div className="text-xs mt-2 text-gray-500">Keep your product line fresh!</div>
      </CardContent>
    </Card>
  );
}

export default SupplierDashboardHome;
