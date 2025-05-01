
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, Calendar, Clock } from "lucide-react";
import { Job } from "@/types/job";
import SimpleLoadingFallback from "@/components/error-handling/SimpleLoadingFallback";

const OpportunityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [opportunity, setOpportunity] = useState<Job | null>(null);

  useEffect(() => {
    // Set page title
    document.title = opportunity?.title 
      ? `${opportunity.title} | EmviApp` 
      : "Opportunity Details | EmviApp";

    // In a real application, this would be an API call to fetch the opportunity
    const fetchOpportunity = async () => {
      try {
        setLoading(true);
        
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data - in a real application, this would come from an API
        const mockOpportunity: Job = {
          id: id || "",
          title: "Nail Technician Position",
          company: "Luxe Nail Salon",
          location: "San Francisco, CA",
          description: "We're looking for experienced nail technicians to join our growing team.",
          created_at: new Date().toISOString(),
          employment_type: "Full-time",
          compensation_type: "Hourly + Commission",
          salon_features: ["High Traffic", "Modern Interior", "Friendly Team"],
          requirements: ["2+ years experience", "Nail art skills", "Customer service"],
          benefits: ["Flexible schedule", "Paid time off", "Training opportunities"],
          features: ["High-end clientele", "Retail commission"],
          image: "/lovable-uploads/72f0f6c8-5793-4750-993d-f250b495146d.png"
        };
        
        setOpportunity(mockOpportunity);
      } catch (error) {
        console.error("Error fetching opportunity:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOpportunity();
    }
  }, [id]);

  if (loading) {
    return <SimpleLoadingFallback message="Loading opportunity details..." />;
  }

  if (!opportunity) {
    return null; // This shouldn't happen due to our route guard, but just in case
  }

  return (
    <Layout>
      <div className="container max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Hero Image */}
          <div className="h-64 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
            {opportunity.image && (
              <img 
                src={opportunity.image} 
                alt={opportunity.title} 
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-30" />
          </div>
          
          {/* Content */}
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900">{opportunity.title}</h1>
            <div className="flex items-center mt-2 text-gray-600">
              <MapPin className="h-5 w-5 mr-1" />
              <p>{opportunity.location}</p>
            </div>
            
            <div className="flex gap-4 mt-6">
              <div className="bg-blue-50 px-4 py-2 rounded-lg flex items-center">
                <Briefcase className="h-5 w-5 text-blue-600 mr-2" />
                <span>{opportunity.employment_type || "Not specified"}</span>
              </div>
              
              <div className="bg-green-50 px-4 py-2 rounded-lg flex items-center">
                <Clock className="h-5 w-5 text-green-600 mr-2" />
                <span>{opportunity.compensation_type || "Not specified"}</span>
              </div>
              
              <div className="bg-purple-50 px-4 py-2 rounded-lg flex items-center">
                <Calendar className="h-5 w-5 text-purple-600 mr-2" />
                <span>
                  {new Date(opportunity.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            {/* Description */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{opportunity.description}</p>
            </div>
            
            {/* Features */}
            {(opportunity.features && opportunity.features.length > 0) && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Features</h2>
                <div className="flex flex-wrap gap-2">
                  {opportunity.features.map((feature, index) => (
                    <span 
                      key={index} 
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Requirements */}
            {opportunity.requirements && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                <ul className="list-disc pl-5 text-gray-700">
                  {(Array.isArray(opportunity.requirements) 
                    ? opportunity.requirements 
                    : opportunity.requirements.split(",")
                  ).map((req, index) => (
                    <li key={index} className="mb-2">{req.trim()}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Benefits */}
            {opportunity.benefits && opportunity.benefits.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Benefits</h2>
                <ul className="list-disc pl-5 text-gray-700">
                  {opportunity.benefits.map((benefit, index) => (
                    <li key={index} className="mb-2">{benefit}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Apply Button */}
            <div className="mt-10 flex">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg">
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OpportunityDetailPage;
