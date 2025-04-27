
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet";

const ListSalonPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "List Your Salon | EmviApp";
  }, []);
  
  return (
    <Layout>
      <Helmet>
        <title>List Your Salon | EmviApp</title>
        <meta 
          name="description" 
          content="Create a listing for your salon for sale or advertise booth rentals to reach potential buyers and renters." 
        />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            className="mb-6 text-gray-600"
            onClick={() => navigate('/salons')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Salons
          </Button>
          
          <Card className="p-8 text-center">
            <h1 className="text-3xl font-playfair font-bold mb-6">
              List Your Salon on EmviApp
            </h1>
            
            <p className="text-gray-700 mb-8">
              This feature is coming soon! Soon you'll be able to create listings for:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="font-playfair font-semibold text-xl mb-2">Salons For Sale</h3>
                <p className="text-gray-600 text-sm">
                  List your salon business for sale and connect with potential buyers
                </p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-playfair font-semibold text-xl mb-2">Booth Rentals</h3>
                <p className="text-gray-600 text-sm">
                  Advertise available booth rentals and find talented professionals
                </p>
              </div>
              
              <div className="bg-amber-50 p-6 rounded-lg">
                <h3 className="font-playfair font-semibold text-xl mb-2">Salon Profiles</h3>
                <p className="text-gray-600 text-sm">
                  Create a profile for your salon to attract clients and staff
                </p>
              </div>
            </div>
            
            <Button onClick={() => navigate('/sign-up')} size="lg">
              Get Notified When Available
            </Button>
            
            <p className="text-sm text-gray-500 mt-4">
              Be the first to know when our salon listing feature launches!
            </p>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ListSalonPage;
