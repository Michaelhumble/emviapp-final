
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Grid, Image, Megaphone, Users } from "lucide-react";
import { useAuth } from "@/context/auth";
import { Link } from "react-router-dom";

const SalonProfileSection = () => {
  const { userProfile } = useAuth();
  
  // Mock salon data
  const hiringStatus = true;
  const servicesCount = 12;
  const artistsNearby = 8;
  
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-gray-100 shadow-sm hover-scale">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50 pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="font-serif text-xl flex items-center">
                <Image className="h-5 w-5 text-teal-500 mr-2" />
                Salon Showcase
              </CardTitle>
              <CardDescription>Highlight your services and salon atmosphere</CardDescription>
            </div>
            {hiringStatus && (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Hiring</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center">
              <Image className="h-6 w-6 text-gray-400" />
            </div>
            <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center">
              <Image className="h-6 w-6 text-gray-400" />
            </div>
            <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center">
              <Image className="h-6 w-6 text-gray-400" />
            </div>
          </div>
          <div className="flex justify-center">
            <Button asChild>
              <Link to="/profile/salon-photos">Manage Salon Photos</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-gray-100 shadow-sm hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="font-serif text-lg flex items-center">
              <Grid className="h-5 w-5 text-violet-500 mr-2" />
              Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-2">
              <p className="text-3xl font-bold text-gray-800 mb-1">{servicesCount}</p>
              <p className="text-gray-500 text-sm">Services offered</p>
              <Button variant="outline" size="sm" className="mt-3" asChild>
                <Link to="/services/manage">Manage Services</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-gray-100 shadow-sm hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="font-serif text-lg flex items-center">
              <Briefcase className="h-5 w-5 text-amber-500 mr-2" />
              Job Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-2">
              <p className="text-3xl font-bold text-gray-800 mb-1">2</p>
              <p className="text-gray-500 text-sm">Active listings</p>
              <Button variant="outline" size="sm" className="mt-3" asChild>
                <Link to="/jobs/post">Post a Job</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-gray-100 shadow-sm hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="font-serif text-lg flex items-center">
              <Users className="h-5 w-5 text-blue-500 mr-2" />
              Nearby Artists
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-2">
              <p className="text-3xl font-bold text-gray-800 mb-1">{artistsNearby}</p>
              <p className="text-gray-500 text-sm">Artists in your area</p>
              <Button variant="outline" size="sm" className="mt-3" asChild>
                <Link to="/artists">View Artists</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="border-gray-100 shadow-sm bg-gradient-to-r from-amber-50 to-orange-50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="font-serif text-lg text-gray-800 flex items-center">
                <Megaphone className="h-5 w-5 text-orange-500 mr-2" />
                Promote Your Salon
              </h3>
              <p className="text-gray-600 max-w-md">
                Turn on customer offers to attract new clients to your salon
              </p>
            </div>
            <Button className="bg-orange-600 hover:bg-orange-700">
              Turn On Customer Offers
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonProfileSection;
