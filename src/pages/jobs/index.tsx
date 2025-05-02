
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Job } from '@/types/job';
import JobGrid from '@/components/jobs/JobGrid';
import BilingualJobCard from '@/components/jobs/BilingualJobCard';
import expiredJobListings from '@/data/expiredJobListings';
import { usePostExpirationCheck } from '@/hooks/usePostExpirationCheck';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Helmet } from 'react-helmet';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';

// Categories for job filters
const jobCategories = [
  "All Jobs",
  "Nail Technicians",
  "Hair Stylists",
  "Tattoo Artists", 
  "Eyelash & Brow",
  "Massage & Spa"
];

// Function to filter jobs by role/category
const filterJobsByCategory = (jobs: Job[], category: string): Job[] => {
  if (category === "All Jobs") return jobs;
  
  // Category-specific filtering logic
  switch(category) {
    case "Nail Technicians":
      return jobs.filter(job => 
        job.title?.toLowerCase().includes("nail") || 
        job.title?.toLowerCase().includes("thợ") ||
        job.description?.toLowerCase().includes("nail") ||
        job.company?.toLowerCase().includes("nail")
      );
    case "Hair Stylists":
      return jobs.filter(job => 
        job.title?.toLowerCase().includes("hair") || 
        job.title?.toLowerCase().includes("stylist") ||
        job.title?.toLowerCase().includes("barber") ||
        job.specialties?.some(s => s.toLowerCase().includes("hair")) ||
        job.specialties?.some(s => s.toLowerCase().includes("cut"))
      );
    case "Tattoo Artists":
      return jobs.filter(job => 
        job.title?.toLowerCase().includes("tattoo") || 
        job.company?.toLowerCase().includes("ink") ||
        job.specialties?.some(s => s.toLowerCase().includes("tattoo"))
      );
    case "Eyelash & Brow":
      return jobs.filter(job => 
        job.title?.toLowerCase().includes("lash") || 
        job.title?.toLowerCase().includes("brow") ||
        job.specialties?.some(s => s.toLowerCase().includes("lash")) ||
        job.specialties?.some(s => s.toLowerCase().includes("brow"))
      );
    case "Massage & Spa":
      return jobs.filter(job => 
        job.title?.toLowerCase().includes("massage") || 
        job.title?.toLowerCase().includes("spa") ||
        job.title?.toLowerCase().includes("therapist") ||
        job.specialties?.some(s => s.toLowerCase().includes("massage")) ||
        job.specialties?.some(s => s.toLowerCase().includes("facial"))
      );
    default:
      return jobs;
  }
};

const JobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>(expiredJobListings);
  const [selectedCategory, setSelectedCategory] = useState("All Jobs");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);
  const [isRenewing, setIsRenewing] = useState(false);
  const [renewalJobId, setRenewalJobId] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Get all job IDs for expiration check
  const jobIds = jobs.map(job => job.id);
  const { expirations } = usePostExpirationCheck(jobIds);

  // Handle search and filtering
  useEffect(() => {
    let results = jobs;
    
    // Apply category filter
    results = filterJobsByCategory(results, selectedCategory);
    
    // Apply search filter if query exists
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(job => 
        job.title?.toLowerCase().includes(query) || 
        job.company?.toLowerCase().includes(query) || 
        job.location?.toLowerCase().includes(query) || 
        job.description?.toLowerCase().includes(query)
      );
    }
    
    setFilteredJobs(results);
  }, [jobs, selectedCategory, searchQuery]);

  // Handle job renewal
  const handleRenewJob = (job: Job) => {
    setIsRenewing(true);
    setRenewalJobId(job.id);
    
    // Simulate API call for renewal
    setTimeout(() => {
      toast.success(`Job renewal request sent for "${job.title}"`, {
        description: "Check your account for approval status.",
        action: {
          label: "View Dashboard",
          onClick: () => navigate("/dashboard")
        }
      });
      setIsRenewing(false);
      setRenewalJobId(null);
    }, 1500);
  };

  return (
    <Layout>
      <Helmet>
        <title>Beauty Industry Jobs | EmviApp</title>
        <meta 
          name="description" 
          content="Browse job opportunities in the beauty industry. Find positions for nail technicians, hair stylists, estheticians, and more."
        />
      </Helmet>
      
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              Beauty Industry Jobs
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Find your next opportunity or post job openings to attract talented professionals
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-emvi-accent hover:bg-emvi-accent/90">
                Post a Job
              </Button>
              <Link to="/jobs/salary-guide">
                <Button size="lg" variant="outline">
                  Salary Guide
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
      
      <Container className="py-12">
        {/* Search and filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search jobs by title, location, or keywords..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 items-center">
            <Filter size={18} className="text-gray-500" />
            <span className="text-sm text-gray-500">Filter:</span>
            <div className="flex flex-wrap gap-2">
              {jobCategories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    selectedCategory === category 
                      ? 'bg-emvi-accent hover:bg-emvi-accent/90' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        {/* Results count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
            {selectedCategory !== "All Jobs" && ` in ${selectedCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
          
          <Button variant="outline" size="sm" onClick={() => {
            setSelectedCategory("All Jobs");
            setSearchQuery("");
          }}>
            Reset Filters
          </Button>
        </div>
        
        {/* Job listings grid */}
        <JobGrid 
          jobs={filteredJobs}
          expirations={expirations}
          onRenew={handleRenewJob}
          isRenewing={isRenewing}
          renewalJobId={renewalJobId}
        />
        
        {/* Empty state */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-2">No jobs found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
        
        {/* Sign up CTA */}
        <div className="mt-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Don't miss out on premium opportunities!</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Sign up for EmviApp to receive notifications about new job openings before they expire.
          </p>
          <Button size="lg" asChild>
            <Link to="/sign-up">Create Free Account</Link>
          </Button>
        </div>
      </Container>
    </Layout>
  );
};

export default JobsPage;
