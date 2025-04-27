
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SalonDetail from "@/components/salons/SalonDetail";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { SalonListing } from "@/types/salon";
import { useSalonsData } from "@/hooks/useSalonsData";
import { Helmet } from "react-helmet";

const SalonDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [salon, setSalon] = useState<SalonListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  
  const { allSalons } = useSalonsData();
  
  useEffect(() => {
    // Find the salon with the matching ID
    const fetchSalon = async () => {
      setLoading(true);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const foundSalon = allSalons.find(s => s.id === id);
        
        if (foundSalon) {
          setSalon(foundSalon);
          document.title = `${foundSalon.name} | EmviApp Salons`;
        } else {
          setNotFound(true);
          document.title = "Salon Not Found | EmviApp";
        }
      } catch (error) {
        console.error("Error fetching salon:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    
    if (id && allSalons.length > 0) {
      fetchSalon();
    }
  }, [id, allSalons]);
  
  return (
    <Layout>
      <Helmet>
        {salon ? (
          <>
            <title>{salon.name} | Salon Details | EmviApp</title>
            <meta 
              name="description" 
              content={salon.shortDescription || salon.description.substring(0, 160)} 
            />
          </>
        ) : (
          <>
            <title>{notFound ? "Salon Not Found" : "Loading Salon..."} | EmviApp</title>
            <meta name="description" content="View details about this salon listing on EmviApp." />
          </>
        )}
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="space-y-4 max-w-5xl mx-auto">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-12 w-2/3" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
            <div className="flex gap-2 mt-4">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
            <div className="mt-8">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-3/4 mt-2" />
            </div>
          </div>
        ) : notFound ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <h1 className="text-2xl font-playfair font-bold mb-2">Salon Not Found</h1>
            <p className="text-gray-600 mb-6">
              The salon you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/salons')}>
              Back to Salon Directory
            </Button>
          </div>
        ) : salon ? (
          <SalonDetail salon={salon} />
        ) : null}
      </div>
    </Layout>
  );
};

export default SalonDetailPage;
