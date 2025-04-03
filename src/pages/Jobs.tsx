import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { usePostExpirationCheck } from "@/hooks/usePostExpirationCheck";
import PaymentConfirmationModal from "@/components/posting/PaymentConfirmationModal";
import { getRenewalPrice } from "@/utils/postingPriceCalculator";
import { Job } from "@/types/job";
import JobFilters from "@/components/jobs/JobFilters";
import JobLoadingState from "@/components/jobs/JobLoadingState";
import JobEmptyState from "@/components/jobs/JobEmptyState";
import JobsGrid from "@/components/jobs/JobsGrid";
import { formatJobListings } from "@/utils/jobs/jobListingFormatter";

interface Filters {
  weeklyPay: boolean;
  ownerWillTrain: boolean;
  employmentType: string;
  showExpired: boolean;
  hasHousing?: boolean;
  noSupplyDeduction?: boolean;
}

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    weeklyPay: false,
    ownerWillTrain: false,
    employmentType: "all",
    showExpired: true,
    hasHousing: false,
    noSupplyDeduction: false
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
  
  const jobIds = jobs.map((job) => job.id);
  const { expirations, isLoading: isExpirationLoading } = usePostExpirationCheck(jobIds);
  
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

      const formattedJobs = formatJobListings(data || []);
      
      let filteredJobs = formattedJobs;
      
      if (filters.hasHousing) {
        filteredJobs = filteredJobs.filter(job => job.has_housing === true);
      }
      
      if (filters.noSupplyDeduction) {
        filteredJobs = filteredJobs.filter(job => job.no_supply_deduction === true);
      }
      
      setJobs(filteredJobs);
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
      
      if (renewalJobId.startsWith('sample-')) {
        toast({
          title: "Success",
          description: "Sample job post renewed successfully!",
        });
        
        setTimeout(() => {
          setIsRenewing(false);
          setRenewalJobId(null);
          setIsPaymentModalOpen(false);
        }, 1000);
        return;
      }
      
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
      showExpired: true,
      hasHousing: false,
      noSupplyDeduction: false
    });
  };
  
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };
  
  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const checkExpiration = (job: Job): boolean => {
    if (job.is_sample) {
      return true;
    }
    
    return expirations[job.id] === true;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 bg-[#FDFDFD]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
              Beauty Industry Job Listings
            </h1>
            <h2 className="text-xl text-gray-700 font-medium mb-4">
              Tìm Việc Nail Lương Cao, Bao Lương Nếu Cần
            </h2>
            <p className="text-gray-600 mb-6">
              Find your perfect position in top salons across the country or browse our 
              Vietnamese nail job listings. Filter by job type, pay structure, and more.
            </p>

            <JobFilters 
              filters={filters}
              searchTerm={searchTerm}
              onFiltersChange={handleFiltersChange}
              onSearchChange={handleSearchChange}
              onResetFilters={resetFilters}
              showVietnameseFilters={true}
            />
          </div>

          {loading || isExpirationLoading ? (
            <JobLoadingState />
          ) : jobs.length === 0 ? (
            <JobEmptyState onResetFilters={resetFilters} />
          ) : (
            <JobsGrid 
              jobs={jobs}
              expirations={expirations}
              currentUserId={user?.id}
              onRenew={prepareRenewal}
              isRenewing={isRenewing}
              renewalJobId={renewalJobId}
              checkExpiration={checkExpiration}
            />
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
    </Layout>
  );
};

export default Jobs;
