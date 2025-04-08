
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Search, Filter, Star, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Freelancers = () => {
  const [freelancers, setFreelancers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  
  const specialties = [
    "Makeup Artist",
    "Hair Stylist",
    "Nail Technician",
    "Barber",
    "Lash Artist",
    "Tattoo Artist",
    "Massage Therapist",
    "Esthetician",
    "Photographer"
  ];
  
  useEffect(() => {
    const fetchFreelancers = async () => {
      setLoading(true);
      try {
        let query = supabase
          .from("users")
          .select("*")
          .eq("role", "freelancer");
        
        // Apply filters if selected
        if (specialtyFilter !== "all") {
          query = query.eq("specialty", specialtyFilter);
        }
        
        if (locationFilter !== "all") {
          query = query.ilike("location", `%${locationFilter}%`);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        setFreelancers(data || []);
      } catch (error) {
        console.error("Error fetching freelancers:", error);
        toast.error("Failed to load freelancers");
      } finally {
        setLoading(false);
      }
    };
    
    fetchFreelancers();
  }, [specialtyFilter, locationFilter]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
  };
  
  const filteredFreelancers = freelancers.filter(freelancer => {
    if (!searchQuery) return true;
    
    const fullName = freelancer.full_name?.toLowerCase() || "";
    const specialty = freelancer.specialty?.toLowerCase() || "";
    const bio = freelancer.bio?.toLowerCase() || "";
    const query = searchQuery.toLowerCase();
    
    return fullName.includes(query) || specialty.includes(query) || bio.includes(query);
  });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  };
  
  return (
    <Layout>
      <section className="bg-gradient-to-b from-background to-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4">
              Find Talented Freelancers
            </h1>
            <p className="text-lg text-muted-foreground">
              Connect with independent artists, beauty professionals, and creative experts ready to bring your vision to life.
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-12 bg-card/80 backdrop-blur-sm rounded-xl shadow-sm border border-border/50 p-4">
            <form onSubmit={handleSearch} className="flex flex-col space-y-4">
              <div className="flex items-center relative">
                <Search className="absolute left-3 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name, specialty, or keyword..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/2">
                  <Select
                    value={specialtyFilter}
                    onValueChange={setSpecialtyFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Specialties</SelectItem>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-full sm:w-1/2">
                  <Select
                    value={locationFilter}
                    onValueChange={setLocationFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="New York">New York</SelectItem>
                      <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                      <SelectItem value="Chicago">Chicago</SelectItem>
                      <SelectItem value="Houston">Houston</SelectItem>
                      <SelectItem value="Miami">Miami</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </div>
          
          {/* Freelancer Listings */}
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Card key={item} className="overflow-hidden border border-border/50">
                    <div className="p-6">
                      <div className="flex items-center space-x-4">
                        <Skeleton className="h-14 w-14 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-5 w-40" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    </div>
                    <div className="px-6 pb-6">
                      <Skeleton className="h-10 w-full rounded" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : filteredFreelancers.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No freelancers found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your filters or search term</p>
                <Button onClick={() => {
                  setSearchQuery("");
                  setSpecialtyFilter("all");
                  setLocationFilter("all");
                }}>
                  Reset Filters
                </Button>
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredFreelancers.map((freelancer) => (
                  <motion.div key={freelancer.id} variants={cardVariants}>
                    <Card className="overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-md">
                      <CardHeader className="pb-2">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={freelancer.avatar_url || ""} />
                            <AvatarFallback>
                              {freelancer.full_name?.split(" ")
                                .map((n: string) => n[0])
                                .join("")
                                .toUpperCase() || "FR"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle>{freelancer.full_name}</CardTitle>
                            <div className="flex items-center space-x-2 mt-1">
                              {freelancer.specialty && (
                                <Badge variant="outline">{freelancer.specialty}</Badge>
                              )}
                              {freelancer.location && (
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {freelancer.location}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <p className="text-sm line-clamp-3">
                          {freelancer.bio || "No bio available"}
                        </p>
                      </CardContent>
                      <CardFooter className="flex flex-col space-y-2">
                        <Button className="w-full" asChild>
                          <Link to={`/freelancer/${freelancer.id}`}>
                            View Profile
                          </Link>
                        </Button>
                        <div className="flex items-center justify-between w-full">
                          <Button variant="outline" size="sm" className="flex-1 mr-2">
                            <MessageCircle className="h-4 w-4 mr-2" /> Message
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Star className="h-4 w-4 mr-2" /> Save
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Freelancers;
