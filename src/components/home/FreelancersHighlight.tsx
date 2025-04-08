
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FreelancersHighlight = () => {
  const [featuredFreelancers, setFeaturedFreelancers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchFeaturedFreelancers = async () => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("role", "freelancer")
          .limit(4);
          
        if (error) throw error;
        
        setFeaturedFreelancers(data || []);
      } catch (error) {
        console.error("Error fetching featured freelancers:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeaturedFreelancers();
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-serif tracking-tight">
            Explore Freelancers Near You
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Find independent artists for your next project, event, or personal appointment.
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {loading ? (
            // Show loading skeletons for freelancers
            Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="h-80 bg-white/80 backdrop-blur-sm animate-pulse">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 mr-4"></div>
                    <div className="flex-1">
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                  </div>
                  <div className="h-10 bg-gray-200 rounded mt-4"></div>
                </CardContent>
              </Card>
            ))
          ) : featuredFreelancers.length === 0 ? (
            <div className="col-span-full text-center p-8">
              <p className="text-muted-foreground text-lg">
                No freelancers found. Be the first to join!
              </p>
              <Button className="mt-4" asChild>
                <Link to="/auth/signup">Sign Up as a Freelancer</Link>
              </Button>
            </div>
          ) : (
            // Show actual freelancer cards
            featuredFreelancers.map((freelancer) => (
              <motion.div
                key={freelancer.id}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="h-full overflow-hidden bg-white/80 backdrop-blur-sm border border-gray-100 shadow hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start mb-4">
                      <Avatar className="h-16 w-16 mr-4">
                        <AvatarImage src={freelancer.avatar_url || ""} />
                        <AvatarFallback className="text-lg bg-primary/10">
                          {freelancer.full_name?.split(" ")
                            .map((n: string) => n[0])
                            .join("")
                            .toUpperCase() || "F"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-medium">
                          {freelancer.full_name || "Freelancer"}
                        </h3>
                        <div className="flex items-center flex-wrap gap-2 mt-1">
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
                    
                    <p className="text-sm text-gray-600 line-clamp-3 flex-1">
                      {freelancer.bio || "This freelancer is ready to work on your next project."}
                    </p>
                    
                    <Button className="w-full mt-4" asChild>
                      <Link to={`/freelancer/${freelancer.id}`}>
                        View Profile
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </motion.div>
        
        <div className="flex justify-center mt-12">
          <Button size="lg" variant="outline" className="group" asChild>
            <Link to="/freelancers">
              Browse All Freelancers
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FreelancersHighlight;
