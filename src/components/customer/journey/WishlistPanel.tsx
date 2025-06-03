
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Star, Plus } from "lucide-react";

const WishlistPanel: React.FC = () => {
  // Mock data - replace with real data from context/API
  const wishlistData = {
    savedSalons: [
      { id: 1, name: "Luxe Nail Studio", location: "Downtown", rating: 4.8 },
      { id: 2, name: "Glow Beauty Bar", location: "Midtown", rating: 4.9 }
    ],
    savedArtists: [
      { id: 1, name: "Sarah Chen", specialty: "Nail Art", rating: 4.9 },
      { id: 2, name: "Maria Rodriguez", specialty: "Gel Extensions", rating: 4.7 }
    ],
    savedServices: [
      { id: 1, name: "French Manicure", price: "$35", duration: "45min" },
      { id: 2, name: "Gel Extensions", price: "$65", duration: "90min" }
    ]
  };

  return (
    <Card className="bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-rose-600" />
          My Wishlist & Favorites
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Saved Salons */}
          <div>
            <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Saved Salons ({wishlistData.savedSalons.length})
            </h4>
            <div className="space-y-2">
              {wishlistData.savedSalons.map((salon) => (
                <div key={salon.id} className="flex items-center justify-between bg-white/50 rounded-lg p-2">
                  <div>
                    <div className="font-medium text-sm">{salon.name}</div>
                    <div className="text-xs text-gray-600">{salon.location}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs">{salon.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Saved Artists */}
          <div>
            <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Favorite Artists ({wishlistData.savedArtists.length})
            </h4>
            <div className="space-y-2">
              {wishlistData.savedArtists.map((artist) => (
                <div key={artist.id} className="flex items-center justify-between bg-white/50 rounded-lg p-2">
                  <div>
                    <div className="font-medium text-sm">{artist.name}</div>
                    <div className="text-xs text-gray-600">{artist.specialty}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs">{artist.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Saved Services */}
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Saved Services ({wishlistData.savedServices.length})</h4>
            <div className="space-y-2">
              {wishlistData.savedServices.map((service) => (
                <div key={service.id} className="flex items-center justify-between bg-white/50 rounded-lg p-2">
                  <div>
                    <div className="font-medium text-sm">{service.name}</div>
                    <div className="text-xs text-gray-600">{service.duration}</div>
                  </div>
                  <Badge variant="outline">{service.price}</Badge>
                </div>
              ))}
            </div>
          </div>

          <Button variant="outline" size="sm" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add to Wishlist
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WishlistPanel;
