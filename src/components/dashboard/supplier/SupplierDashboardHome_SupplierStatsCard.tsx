
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

// Mock KPIs
const stats = [
  { label: "Views This Month", value: 312, change: "+22%", color: "text-emerald-500" },
  { label: "Favorites", value: 54, change: "+5", color: "text-pink-500" },
  { label: "Messages", value: 14, change: "+2", color: "text-orange-500" }
];

const SupplierStatsCard = () => (
  <Card className="rounded-2xl bg-gradient-to-br from-white/90 to-amber-100 border-0 shadow-md">
    <CardHeader className="flex flex-row items-center gap-2 pb-2">
      <TrendingUp className="h-6 w-6 text-emerald-500" />
      <CardTitle className="text-base font-playfair">Stats Summary</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex gap-3 flex-col sm:flex-row">
        {stats.map(stat => (
          <div key={stat.label} className="flex-1 min-w-0 bg-white rounded-lg border border-gray-50 px-4 py-3 shadow-sm flex flex-col items-center">
            <div className={`font-semibold text-xl ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-gray-600">{stat.label}</div>
            <div className="text-xs">{stat.change}</div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default SupplierStatsCard;
