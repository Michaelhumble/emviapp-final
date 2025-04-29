
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";

// Updated listings with our new uploaded images
const listings = [
  {
    id: "p1",
    name: "Premium Gel Polish Set",
    image: "/lovable-uploads/89ef4a43-b461-47fc-8b2d-97b07318a891.png",
    status: "Active",
    price: "$39",
    views: 142,
  },
  {
    id: "p2",
    name: "Professional Nail Drill",
    image: "/lovable-uploads/a98d2b96-e38c-43a0-9abe-d846764a9e11.png",
    status: "Active",
    price: "$89",
    views: 96,
  },
  {
    id: "p3",
    name: "Acrylic Powder Collection",
    image: "/lovable-uploads/2fba1cd5-b1ed-4030-b7e1-06517fbab43e.png",
    status: "Inactive",
    price: "$29",
    views: 78,
  },
];

const ListingsOverviewCard = () => (
  <Card className="rounded-2xl bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50 border-0 shadow-lg">
    <CardHeader className="flex flex-row items-center gap-2 pb-2">
      <Package className="h-6 w-6 text-pink-500" />
      <CardTitle className="text-base font-playfair">Listings Overview</CardTitle>
    </CardHeader>
    <CardContent>
      {listings.length === 0 ? (
        <div className="text-center text-gray-400 py-8">No listings yet. Add a product to get started!</div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {listings.map((listing) => (
            <li key={listing.id} className="flex gap-3 items-center py-3">
              <img 
                src={listing.image} 
                alt={listing.name}
                className="w-14 h-14 rounded-xl object-cover border border-gray-200 bg-white"
              />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 truncate">{listing.name}</div>
                <div className="flex items-center gap-1">
                  <span className="text-xs rounded bg-green-50 text-green-600 px-2 py-0.5">{listing.status}</span>
                  <span className="text-xs text-gray-500">{listing.price}</span>
                </div>
                <div className="text-xs text-gray-400">Views: {listing.views}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </CardContent>
  </Card>
);

export default ListingsOverviewCard;
