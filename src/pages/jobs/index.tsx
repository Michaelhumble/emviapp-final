
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchIcon, FilterIcon, MapPinIcon } from "lucide-react";
import jobsData from "@/data/jobsData";
import { Job } from "@/types/job";
import ListingsGrid from "@/components/listings/ListingsGrid";

// Add type property to convert jobsData to proper Job type
const typedJobs: Job[] = jobsData.map(job => ({
  ...job,
  created_at: job.posted || new Date().toISOString(),
  updated_at: new Date().toISOString(),
  type: 'job'
})) as Job[];

const JobsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(typedJobs);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Beauty Industry Jobs | EmviApp";
  }, []);

  useEffect(() => {
    setLoading(true);
    // Simulating API request delay
    const timer = setTimeout(() => {
      filterJobs();
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm, activeTab]);

  const filterJobs = () => {
    let results = [...typedJobs];

    // Filter by search term if provided
    if (searchTerm.trim()) {
      const searchTermLower = searchTerm.toLowerCase();
      results = results.filter(job => 
        job.title.toLowerCase().includes(searchTermLower) || 
        job.company.toLowerCase().includes(searchTermLower) ||
        (job.location && job.location.toLowerCase().includes(searchTermLower))
      );
    }

    // Filter by job category if not "all"
    if (activeTab !== "all") {
      results = results.filter(job => {
        // This is a simplification - you may want to map job types to categories
        const jobType = job.title.toLowerCase();
        return jobType.includes(activeTab);
      });
    }

    setFilteredJobs(results);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterJobs();
  };

  const jobCategories = [
    { id: "all", label: "All Jobs" },
    { id: "nail", label: "Nail Tech" },
    { id: "hair", label: "Hair Stylist" },
    { id: "barber", label: "Barber" },
    { id: "spa", label: "Spa Therapist" },
    { id: "management", label: "Management" },
  ];

  return (
    <Layout>
      <Container className="py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Beauty Industry Jobs</h1>
        <p className="text-gray-600 mb-8">
          Find your dream job in the beauty and wellness industry
        </p>
        
        {/* Search and filters */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input 
                placeholder="Search by title, company, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit">
              Search
            </Button>
          </form>
          
          {/* Category tabs */}
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full overflow-x-auto flex flex-nowrap justify-start mb-6">
              {jobCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="px-4 py-2 text-sm"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        {/* Quick filter buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button variant="outline" size="sm">
            <MapPinIcon className="mr-2 h-4 w-4" /> Near Me
          </Button>
          <Button variant="outline" size="sm">
            <FilterIcon className="mr-2 h-4 w-4" /> More Filters
          </Button>
        </div>
        
        {/* Results */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Searching for jobs...</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <h2 className="text-lg font-medium">
                {filteredJobs.length} Jobs Found
              </h2>
            </div>
            
            <ListingsGrid 
              listings={filteredJobs} 
              emptyMessage="No jobs match your search criteria. Try adjusting your filters or search terms."
            />
          </>
        )}
      </Container>
    </Layout>
  );
};

export default JobsPage;
