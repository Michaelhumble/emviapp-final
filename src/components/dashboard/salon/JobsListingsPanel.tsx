
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JobData, SalonListing } from "@/hooks/useOwnerDashboardData";
import { Briefcase, Building, Image, Plus, ShoppingBag, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

interface JobsListingsPanelProps {
  jobs: JobData[];
  listings: SalonListing[];
  isLoading: boolean;
}

export function JobsListingsPanel({ jobs, listings, isLoading }: JobsListingsPanelProps) {
  const navigate = useNavigate();
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Jobs & Listings
        </CardTitle>
        <CardDescription>
          Manage your job postings and salon listings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="jobs">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="jobs">
              <Briefcase className="h-4 w-4 mr-2" />
              Job Postings
            </TabsTrigger>
            <TabsTrigger value="listings">
              <Building className="h-4 w-4 mr-2" />
              Salon Listings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="jobs">
            <div className="flex justify-end mb-4">
              <Button onClick={() => navigate("/post/job")}>
                <Plus className="h-4 w-4 mr-2" />
                Post New Job
              </Button>
            </div>
            
            {jobs.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-slate-50 rounded-lg"
              >
                <Briefcase className="mx-auto h-12 w-12 text-slate-400 mb-3" />
                <h3 className="text-lg font-medium text-slate-700 mb-2">No job postings yet</h3>
                <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
                  Create your first job posting to find talented nail technicians for your salon
                </p>
                <Button onClick={() => navigate("/post/job")}>
                  Post Your First Job
                </Button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jobs.map((job) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border rounded-lg p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium truncate">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">{job.location || "No location specified"}</p>
                      </div>
                      <Badge variant={job.status === "active" ? "default" : "secondary"}>
                        {job.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center mt-4 justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{job.applicationCount || 0} applicants</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Posted: {format(new Date(job.created_at), "MMM d, yyyy")}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => navigate(`/jobs/${job.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="listings">
            <div className="flex justify-end mb-4">
              <Button onClick={() => navigate("/sell-salon/new")}>
                <Plus className="h-4 w-4 mr-2" />
                New Listing
              </Button>
            </div>
            
            {listings.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-slate-50 rounded-lg"
              >
                <Building className="mx-auto h-12 w-12 text-slate-400 mb-3" />
                <h3 className="text-lg font-medium text-slate-700 mb-2">No salon listings yet</h3>
                <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
                  Create your first salon listing to showcase your business or sell your salon
                </p>
                <Button onClick={() => navigate("/sell-salon/new")}>
                  Create Salon Listing
                </Button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {listings.map((listing) => (
                  <motion.div
                    key={listing.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border rounded-lg overflow-hidden hover:shadow-sm transition-shadow"
                  >
                    <div className="h-40 bg-slate-100 relative">
                      {listing.photos && listing.photos.length > 0 ? (
                        <img 
                          src={listing.photos[0].photo_url} 
                          alt={listing.salon_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-slate-400">
                          <Image className="h-12 w-12" />
                        </div>
                      )}
                      
                      <div className="absolute top-2 right-2">
                        <Badge variant={listing.is_featured ? "default" : "secondary"}>
                          {listing.is_featured ? "Featured" : listing.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-medium truncate">{listing.salon_name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {listing.city}, {listing.state}
                      </p>
                      
                      <div className="mt-3 flex justify-between items-center">
                        <div className="text-lg font-semibold">
                          {formatCurrency(listing.asking_price)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Listed: {format(new Date(listing.created_at), "MMM d, yyyy")}
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-3"
                        onClick={() => navigate(`/sell-salon/${listing.id}`)}
                      >
                        View Listing
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
