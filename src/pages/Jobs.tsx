import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Calendar, LockIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { usePostExpirationCheck } from "@/hooks/usePostExpirationCheck";
import PaymentConfirmationModal from "@/components/posting/PaymentConfirmationModal";
import { getRenewalPrice } from "@/utils/postingPriceCalculator";

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

      const formattedJobs: Job[] = data?.map(post => {
        const metadata = post.metadata as Record<string, any> || {};
        
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
          is_nationwide: post.is_nationwide || false
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
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Job Listings</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <Input
            type="text"
            placeholder="Search for jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />

          <Select value={filters.employmentType} onValueChange={(value) => setFilters({ ...filters, employmentType: value })}>
            <SelectTrigger className="w-full md:w-auto">
              <SelectValue placeholder="Employment Type" />
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

        <div className="flex items-center space-x-2 mb-4">
          <label
            htmlFor="weeklyPay"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Weekly Pay
          </label>
          <Checkbox
            id="weeklyPay"
            checked={filters.weeklyPay}
            onCheckedChange={(checked) => setFilters({ ...filters, weeklyPay: !!checked })}
          />

          <label
            htmlFor="ownerWillTrain"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Owner Will Train
          </label>
          <Checkbox
            id="ownerWillTrain"
            checked={filters.ownerWillTrain}
            onCheckedChange={(checked) => setFilters({ ...filters, ownerWillTrain: !!checked })}
          />
          
          <label
            htmlFor="showExpired"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Show Expired
          </label>
          <Checkbox
            id="showExpired"
            checked={filters.showExpired}
            onCheckedChange={(checked) => setFilters({ ...filters, showExpired: !!checked })}
          />
        </div>

        {loading || isExpirationLoading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <Card key={job.id}>
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold mb-2 flex items-center justify-between">
                    {job.title}
                    {job.is_nationwide && (
                      <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                        Nationwide
                      </Badge>
                    )}
                  </h2>
                  <p className="text-gray-600 mb-2">{job.company}</p>
                  <p className="text-sm mb-2">
                    <Calendar className="inline-block h-4 w-4 mr-1" />
                    {new Date(job.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-sm mb-2">Location: {job.location}</p>
                  <p className="text-sm mb-2">Salary: {job.salary_range}</p>
                  {job.weekly_pay && (
                    <Badge className="mr-1">Weekly Pay</Badge>
                  )}
                  {job.owner_will_train && (
                    <Badge>Owner Will Train</Badge>
                  )}
                  
                  {isExpired(job.id) && (
                    <div className="mt-2 flex flex-col gap-2">
                      <Badge variant="destructive" className="flex items-center justify-center gap-1">
                        <LockIcon size={12} /> Expired
                      </Badge>
                      <p className="text-xs text-gray-500">Contact info is hidden until renewed</p>
                    </div>
                  )}
                  
                  <div className="mt-4 flex justify-between items-center">
                    <Link to={`/jobs/${job.id}`} className="text-blue-500 hover:underline">
                      View Details
                    </Link>
                    {user?.id === job.user_id && isExpired(job.id) && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => prepareRenewal(job)}
                        disabled={isRenewing}
                      >
                        {isRenewing ? "Renewing..." : "Renew Post"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
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
