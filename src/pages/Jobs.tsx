
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, LockIcon, MapPin, Clock, Briefcase, CheckCircle, Users, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { usePostExpirationCheck } from "@/hooks/usePostExpirationCheck";
import PaymentConfirmationModal from "@/components/posting/PaymentConfirmationModal";
import { getRenewalPrice } from "@/utils/postingPriceCalculator";
import JobListingCard from "@/components/jobs/JobListingCard";
import JobDetailModal from "@/components/jobs/JobDetailModal";

interface Job {
  id: string;
  created_at: string;
  title: string;
  company: string;
  location: string;
  salary_range: string;
  description: string;
  requirements: string;
  weekly_pay: boolean;
  owner_will_train: boolean;
  employment_type: string;
  user_id: string;
  is_nationwide?: boolean;
  responsibilities?: string[];
  qualifications?: string[];
  benefits?: string[];
  company_description?: string;
  contact_info?: {
    phone?: string;
    email?: string;
  };
  trust_indicators?: {
    verified: boolean;
    activelyHiring: boolean;
    chatAvailable: boolean;
  };
}

interface Filters {
  weeklyPay: boolean;
  ownerWillTrain: boolean;
  employmentType: string;
  showExpired: boolean;
}

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    weeklyPay: false,
    ownerWillTrain: false,
    employmentType: "all",
    showExpired: false
  });
  const { user } = useAuth();
  const [isRenewing, setIsRenewing] = useState(false);
  const [renewalJobId, setRenewalJobId] = useState<string | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [renewalPrice, setRenewalPrice] = useState(0);
  const [renewalOptions, setRenewalOptions] = useState({
    isNationwide: false,
    isRenewal: true
  });
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  
  const jobIds = jobs.map((job) => job.id);
  const { expirations, isLoading: isExpirationLoading } = usePostExpirationCheck(jobIds);

  // View detailed job information
  const viewJobDetails = (job: Job) => {
    setSelectedJob(job);
  };

  // Close job detail modal
  const closeJobDetails = () => {
    setSelectedJob(null);
  };
  
  useEffect(() => {
    fetchJobs();
  }, [filters, searchTerm]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("posts")
        .select("*")
        .eq("post_type", "job");

      if (searchTerm) {
        query = query.ilike("title", `%${searchTerm}%`);
      }

      if (filters.weeklyPay) {
        query = query.eq("metadata->>weekly_pay", "true");
      }
      
      if (filters.ownerWillTrain) {
        query = query.eq("metadata->>owner_will_train", "true");
      }
      
      if (filters.employmentType !== "all") {
        query = query.eq("metadata->>employment_type", filters.employmentType);
      }
      
      if (!filters.showExpired) {
        const today = new Date();
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);
        query = query.gte('created_at', thirtyDaysAgo.toISOString());
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      const formattedJobs: Job[] = data?.map(post => {
        const metadata = post.metadata as Record<string, any> || {};
        
        // Parse responsibilities, qualifications, and benefits if they exist, or generate placeholders
        const responsibilities = metadata.responsibilities ? 
          (typeof metadata.responsibilities === 'string' ? 
            JSON.parse(metadata.responsibilities) : 
            metadata.responsibilities) :
          generatePlaceholderResponsibilities(post.title || '');
          
        const qualifications = metadata.qualifications ?
          (typeof metadata.qualifications === 'string' ? 
            JSON.parse(metadata.qualifications) : 
            metadata.qualifications) :
          generatePlaceholderQualifications();
          
        const benefits = metadata.benefits ?
          (typeof metadata.benefits === 'string' ? 
            JSON.parse(metadata.benefits) : 
            metadata.benefits) :
          generatePlaceholderBenefits(Boolean(metadata.weekly_pay));

        const companyDescription = metadata.company_description || generatePlaceholderCompanyDescription(post.location || '');
        
        return {
          id: post.id,
          created_at: post.created_at,
          title: post.title || '',
          company: String(metadata.company || ''),
          location: post.location || '',
          salary_range: String(metadata.salary_range || ''),
          description: post.content || '',
          requirements: String(metadata.requirements || ''),
          weekly_pay: Boolean(metadata.weekly_pay) || false,
          owner_will_train: Boolean(metadata.owner_will_train) || false,
          employment_type: String(metadata.employment_type || 'full-time'),
          user_id: post.user_id,
          is_nationwide: post.is_nationwide || false,
          responsibilities,
          qualifications,
          benefits,
          company_description: companyDescription,
          contact_info: {
            phone: metadata.phone || '(555) 123-4567',
            email: metadata.email || 'contact@salon.com'
          },
          trust_indicators: {
            verified: Math.random() > 0.3, // 70% chance of being verified
            activelyHiring: Math.random() > 0.2, // 80% chance of actively hiring
            chatAvailable: Math.random() > 0.5 // 50% chance of chat available
          }
        };
      }) || [];

      setJobs(formattedJobs);
    } catch (error: any) {
      toast({
        title: "Error fetching jobs",
        description: error.message,
        variant: "destructive",
      });
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // Helper functions to generate placeholder content for expired or demo listings
  const generatePlaceholderResponsibilities = (title: string) => {
    const baseResponsibilities = [
      "Provide exceptional client services",
      "Maintain cleanliness and organization of work area",
      "Follow all health and safety protocols"
    ];
    
    if (title.toLowerCase().includes('hair')) {
      return [...baseResponsibilities, 
        "Perform haircuts, styling, and color services", 
        "Consult with clients on hair treatment options",
        "Recommend appropriate hair care products"
      ];
    } else if (title.toLowerCase().includes('nail')) {
      return [...baseResponsibilities, 
        "Perform manicures, pedicures, and nail enhancements", 
        "Apply gel and traditional polish techniques",
        "Create custom nail art designs upon request"
      ];
    } else {
      return [...baseResponsibilities, 
        "Perform beauty services according to client requests", 
        "Stay updated on latest beauty trends and techniques",
        "Build and maintain a loyal client base"
      ];
    }
  };
  
  const generatePlaceholderQualifications = () => {
    return [
      "Valid cosmetology/specialty license required",
      "Minimum 1-2 years of salon experience preferred",
      "Strong communication and customer service skills",
      "Positive attitude and team-oriented mindset",
      "Bilingual (English/Vietnamese) a plus"
    ];
  };
  
  const generatePlaceholderBenefits = (weeklyPay: boolean) => {
    const baseBenefits = [
      "Flexible scheduling available",
      "Professional development opportunities",
      "Product discounts",
    ];
    
    if (weeklyPay) {
      baseBenefits.push("Weekly pay 💰");
      baseBenefits.push("Bao Lương Nếu Cần ✅");
    } else {
      baseBenefits.push("Competitive commission structure");
    }
    
    return [
      ...baseBenefits,
      "Friendly, drama-free work environment 💎",
      "Growing clientele base ✨"
    ];
  };
  
  const generatePlaceholderCompanyDescription = (location: string) => {
    const locations = {
      "CA": "Located in a bustling shopping center with high foot traffic, our established salon offers a modern, upscale environment with loyal clientele in the beautiful California area.",
      "TX": "Our Texas-based salon provides a friendly, family atmosphere with a steady stream of clients in a rapidly growing community. We pride ourselves on Southern hospitality and quality service.",
      "FL": "Situated in sunny Florida, our salon caters to a diverse clientele in a vibrant location. We offer a relaxing atmosphere where clients come to be pampered and beautified.",
      "NY": "Our New York salon features a fast-paced, trendy environment in a prime location. We serve a diverse, fashion-forward clientele who expect the latest styles and techniques."
    };
    
    for (const [state, description] of Object.entries(locations)) {
      if (location.includes(state)) {
        return description;
      }
    }
    
    return "Our established salon offers a professional, friendly environment with a steady clientele base. We focus on quality service and creating a positive experience for both our team members and clients.";
  };
  
  const isExpired = (jobId: string) => {
    return expirations[jobId] === true;
  };
  
  const prepareRenewal = (job: Job) => {
    const options = {
      isNationwide: job.is_nationwide || false,
      isRenewal: true
    };
    
    setRenewalJobId(job.id);
    setRenewalOptions(options);
    setRenewalPrice(getRenewalPrice('job', options.isNationwide));
    setIsPaymentModalOpen(true);
  };
  
  const handleRenewalPaymentSuccess = async () => {
    if (!renewalJobId) return;
    
    setIsRenewing(true);
    try {
      const today = new Date();
      
      const { error } = await supabase
        .from('posts')
        .update({ created_at: today.toISOString() })
        .eq('id', renewalJobId);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Job post renewed successfully!",
      });
      
      fetchJobs();
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to renew job post: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsRenewing(false);
      setRenewalJobId(null);
      setIsPaymentModalOpen(false);
    }
  };

  const resetFilters = () => {
    setFilters({
      weeklyPay: false,
      ownerWillTrain: false,
      employmentType: "all",
      showExpired: false
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 bg-[#FDFDFD]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Beauty Industry Job Listings</h1>
            <p className="text-gray-600 mb-6">
              Find your perfect position in top salons across the country. Filter by job type, pay structure, and more.
            </p>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <Input
                type="text"
                placeholder="Search for jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow"
              />

              <Select value={filters.employmentType} onValueChange={(value) => setFilters({ ...filters, employmentType: value })}>
                <SelectTrigger className="w-full md:w-auto">
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="full-time">Full-Time</SelectItem>
                  <SelectItem value="part-time">Part-Time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="secondary" onClick={resetFilters}>Reset Filters</Button>
            </div>

            <div className="flex items-center flex-wrap gap-6 mb-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="weeklyPay"
                  checked={filters.weeklyPay}
                  onCheckedChange={(checked) => setFilters({ ...filters, weeklyPay: !!checked })}
                />
                <label
                  htmlFor="weeklyPay"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Weekly Pay
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="ownerWillTrain"
                  checked={filters.ownerWillTrain}
                  onCheckedChange={(checked) => setFilters({ ...filters, ownerWillTrain: !!checked })}
                />
                <label
                  htmlFor="ownerWillTrain"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Owner Will Train
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showExpired"
                  checked={filters.showExpired}
                  onCheckedChange={(checked) => setFilters({ ...filters, showExpired: !!checked })}
                />
                <label
                  htmlFor="showExpired"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Show Expired
                </label>
              </div>
            </div>
          </div>

          {loading || isExpirationLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
                <div className="h-24 w-full max-w-2xl bg-gray-200 rounded"></div>
              </div>
            </div>
          ) : jobs.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-xl font-medium mb-2">No jobs found.</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or check back later for new opportunities.</p>
              <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <JobListingCard 
                  key={job.id}
                  job={job}
                  isExpired={isExpired(job.id)}
                  currentUserId={user?.id}
                  onViewDetails={() => viewJobDetails(job)} 
                  onRenew={() => prepareRenewal(job)}
                  isRenewing={isRenewing && renewalJobId === job.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      <PaymentConfirmationModal
        open={isPaymentModalOpen}
        onOpenChange={setIsPaymentModalOpen}
        postType="job"
        price={renewalPrice}
        options={renewalOptions}
        onSuccess={handleRenewalPaymentSuccess}
      />
      
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          isOpen={!!selectedJob}
          onClose={closeJobDetails}
        />
      )}
    </Layout>
  );
};

export default Jobs;
