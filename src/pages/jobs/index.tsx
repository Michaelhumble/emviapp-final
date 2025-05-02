
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, MapPin } from 'lucide-react';
import { bilingualJobListings } from '@/data/bilingualJobs';
import { expiredJobListings } from '@/data/expiredJobListings';
import { Job } from '@/types/job';
import JobGrid from '@/components/jobs/JobGrid';
import { GradientBackground } from '@/components/ui/gradient-background';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const JobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([...bilingualJobListings, ...expiredJobListings]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    weeklyPay: false,
    ownerWillTrain: false,
    housing: false,
    noSupplyFee: false,
    fullTime: false,
    partTime: false,
    verified: false,
    showExpired: true,
  });

  useEffect(() => {
    document.title = "Nail Salon Jobs & Opportunities | EmviApp";
    setIsLoading(true);
    // Simulate loading for better UX
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  // Function to handle renew button click
  const handleRenew = (job: Job) => {
    toast.info("Please sign up to renew expired job listings", {
      description: "Create an account to access this feature",
      action: {
        label: "Sign Up",
        onClick: () => window.location.href = "/sign-up"
      }
    });
  };

  // Apply filters to jobs
  const applyFilters = (jobsList: Job[]) => {
    return jobsList.filter(job => {
      // Search term filter
      if (searchTerm && 
          !job.title?.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !job.company?.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !job.location?.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !job.description?.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !job.vietnamese_description?.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !(job.specialties?.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase())))) {
        return false;
      }
      
      // Weekly pay filter
      if (activeFilters.weeklyPay && !job.weekly_pay) {
        return false;
      }
      
      // Owner will train filter
      if (activeFilters.ownerWillTrain && !job.owner_will_train) {
        return false;
      }
      
      // Housing filter
      if (activeFilters.housing && !job.has_housing) {
        return false;
      }
      
      // No supply fee filter
      if (activeFilters.noSupplyFee && !job.no_supply_deduction) {
        return false;
      }
      
      // Full-time filter
      if (activeFilters.fullTime && job.employment_type !== 'Full-Time') {
        return false;
      }
      
      // Part-time filter
      if (activeFilters.partTime && job.employment_type !== 'Part-Time') {
        return false;
      }
      
      // Verified filter
      if (activeFilters.verified && (!job.trust_indicators || !job.trust_indicators.verified)) {
        return false;
      }
      
      // Show expired filter (always show if showExpired is true)
      if (!activeFilters.showExpired && job.status === 'expired') {
        return false;
      }
      
      return true;
    });
  };

  // Filter jobs based on category types
  const getJobsByCategory = (category: string) => {
    const categoryJobs = jobs.filter(job => {
      switch(category) {
        case 'nail':
          return (job.title?.toLowerCase().includes('nail') || 
                 job.specialties?.some(s => ['acrylic', 'gel', 'manicure', 'pedicure', 'nail art'].includes(s.toLowerCase())));
        case 'hair':
          return (job.title?.toLowerCase().includes('hair') || job.title?.toLowerCase().includes('barber') ||
                 job.specialties?.some(s => ['hair', 'cut', 'color', 'barber', 'stylist'].includes(s.toLowerCase())));
        case 'tattoo':
          return (job.title?.toLowerCase().includes('tattoo') || 
                 job.specialties?.some(s => ['tattoo', 'ink', 'body art'].includes(s.toLowerCase())));
        case 'lash':
          return (job.title?.toLowerCase().includes('lash') || job.title?.toLowerCase().includes('brow') ||
                 job.specialties?.some(s => ['lash', 'eyelash', 'brow', 'eyebrow', 'microblading'].includes(s.toLowerCase())));
        case 'spa':
          return (job.title?.toLowerCase().includes('massage') || job.title?.toLowerCase().includes('spa') || 
                job.title?.toLowerCase().includes('facial') || job.title?.toLowerCase().includes('esthetician') ||
                job.specialties?.some(s => ['massage', 'facial', 'spa', 'skin', 'esthetician'].includes(s.toLowerCase())));
        case 'all':
        default:
          return true;
      }
    });
    return applyFilters(categoryJobs);
  };

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filter]: !prev[filter as keyof typeof prev]
    }));
  };

  // Count of active filters
  const activeFilterCount = Object.values(activeFilters).filter(Boolean).length - 1; // Subtract 1 because showExpired is default true

  const numberOfFilteredJobs = (category: string) => {
    return getJobsByCategory(category).length;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <GradientBackground 
          variant="premium" 
          className="p-6 md:p-10 mb-8"
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-2 text-center">
              Beauty Industry Job Board
            </h1>
            <p className="text-gray-600 mb-8 text-center">
              Find your perfect position with our curated job listings — or post your own
            </p>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input 
                    placeholder="Search jobs by title, salon, location, or skills" 
                    className="pl-10 h-12 rounded-lg border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Button className="h-12 gap-2 w-full md:w-auto bg-purple-600 hover:bg-purple-700">
                  <Filter size={18} /> 
                  {activeFilterCount > 0 ? `Filters (${activeFilterCount})` : 'Filter Results'}
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <Button 
                variant={activeFilters.showExpired ? "default" : "outline"} 
                size="sm" 
                className={`rounded-full ${activeFilters.showExpired ? "bg-purple-600 hover:bg-purple-700" : ""}`}
                onClick={() => toggleFilter('showExpired')}
              >
                {activeFilters.showExpired ? "Showing All Jobs" : "Hide Expired Jobs"}
              </Button>
              
              <Separator orientation="vertical" className="h-6 mx-1 hidden md:block" />
              
              <Button 
                variant={activeFilters.weeklyPay ? "default" : "outline"} 
                size="sm" 
                className={`rounded-full ${activeFilters.weeklyPay ? "bg-purple-600 hover:bg-purple-700" : ""}`}
                onClick={() => toggleFilter('weeklyPay')}
              >
                Weekly Pay
              </Button>
              
              <Button 
                variant={activeFilters.ownerWillTrain ? "default" : "outline"} 
                size="sm" 
                className={`rounded-full ${activeFilters.ownerWillTrain ? "bg-purple-600 hover:bg-purple-700" : ""}`}
                onClick={() => toggleFilter('ownerWillTrain')}
              >
                Owner Will Train
              </Button>
              
              <Button 
                variant={activeFilters.housing ? "default" : "outline"} 
                size="sm" 
                className={`rounded-full ${activeFilters.housing ? "bg-purple-600 hover:bg-purple-700" : ""}`}
                onClick={() => toggleFilter('housing')}
              >
                Housing Available
              </Button>
              
              <Button 
                variant={activeFilters.noSupplyFee ? "default" : "outline"} 
                size="sm" 
                className={`rounded-full ${activeFilters.noSupplyFee ? "bg-purple-600 hover:bg-purple-700" : ""}`}
                onClick={() => toggleFilter('noSupplyFee')}
              >
                No Supply Fee
              </Button>
              
              <Button 
                variant={activeFilters.verified ? "default" : "outline"} 
                size="sm" 
                className={`rounded-full ${activeFilters.verified ? "bg-purple-600 hover:bg-purple-700" : ""}`}
                onClick={() => toggleFilter('verified')}
              >
                Verified Only
              </Button>
            </div>
          </div>
        </GradientBackground>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mb-6 w-full flex overflow-x-auto py-2 justify-start sm:justify-center">
            <TabsTrigger value="all" className="min-w-max">
              All Jobs <Badge variant="secondary" className="ml-2">{numberOfFilteredJobs('all')}</Badge>
            </TabsTrigger>
            <TabsTrigger value="nail" className="min-w-max">
              Nail Technicians <Badge variant="secondary" className="ml-2">{numberOfFilteredJobs('nail')}</Badge>
            </TabsTrigger>
            <TabsTrigger value="hair" className="min-w-max">
              Hair Stylists/Barbers <Badge variant="secondary" className="ml-2">{numberOfFilteredJobs('hair')}</Badge>
            </TabsTrigger>
            <TabsTrigger value="tattoo" className="min-w-max">
              Tattoo Artists <Badge variant="secondary" className="ml-2">{numberOfFilteredJobs('tattoo')}</Badge>
            </TabsTrigger>
            <TabsTrigger value="lash" className="min-w-max">
              Lash & Brow <Badge variant="secondary" className="ml-2">{numberOfFilteredJobs('lash')}</Badge>
            </TabsTrigger>
            <TabsTrigger value="spa" className="min-w-max">
              Massage & Spa <Badge variant="secondary" className="ml-2">{numberOfFilteredJobs('spa')}</Badge>
            </TabsTrigger>
          </TabsList>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i} 
                  className="bg-gray-100 rounded-lg h-80 animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <>
              <TabsContent value="all">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-gray-600">
                    Showing {getJobsByCategory('all').length} job opportunities
                  </div>
                  <div className="hidden md:flex gap-2">
                    <Button variant="outline" size="sm">Latest</Button>
                    <Button variant="outline" size="sm">Featured</Button>
                  </div>
                </div>
                <JobGrid 
                  jobs={getJobsByCategory('all')} 
                  expirations={{}} 
                  onRenew={handleRenew} 
                  isRenewing={false}
                  renewalJobId={null}
                />
              </TabsContent>

              <TabsContent value="nail">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-gray-600">
                    Showing {getJobsByCategory('nail').length} nail technician opportunities
                  </div>
                </div>
                <JobGrid 
                  jobs={getJobsByCategory('nail')} 
                  expirations={{}} 
                  onRenew={handleRenew} 
                  isRenewing={false}
                  renewalJobId={null}
                />
              </TabsContent>

              <TabsContent value="hair">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-gray-600">
                    Showing {getJobsByCategory('hair').length} hair stylist opportunities
                  </div>
                </div>
                <JobGrid 
                  jobs={getJobsByCategory('hair')} 
                  expirations={{}} 
                  onRenew={handleRenew} 
                  isRenewing={false}
                  renewalJobId={null}
                />
              </TabsContent>

              <TabsContent value="tattoo">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-gray-600">
                    Showing {getJobsByCategory('tattoo').length} tattoo artist opportunities
                  </div>
                </div>
                <JobGrid 
                  jobs={getJobsByCategory('tattoo')} 
                  expirations={{}} 
                  onRenew={handleRenew} 
                  isRenewing={false}
                  renewalJobId={null}
                />
              </TabsContent>

              <TabsContent value="lash">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-gray-600">
                    Showing {getJobsByCategory('lash').length} lash & brow opportunities
                  </div>
                </div>
                <JobGrid 
                  jobs={getJobsByCategory('lash')} 
                  expirations={{}} 
                  onRenew={handleRenew} 
                  isRenewing={false}
                  renewalJobId={null}
                />
              </TabsContent>

              <TabsContent value="spa">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-gray-600">
                    Showing {getJobsByCategory('spa').length} massage & spa opportunities
                  </div>
                </div>
                <JobGrid 
                  jobs={getJobsByCategory('spa')} 
                  expirations={{}} 
                  onRenew={handleRenew} 
                  isRenewing={false}
                  renewalJobId={null}
                />
              </TabsContent>
            </>
          )}

          {(searchTerm || Object.values(activeFilters).some(Boolean)) && getJobsByCategory('all').length === 0 && !isLoading && (
            <div className="text-center py-16">
              <div className="rounded-full bg-gray-100 w-16 h-16 mx-auto flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">No jobs found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search criteria</p>
              <Button onClick={() => {
                setSearchTerm('');
                setActiveFilters({
                  weeklyPay: false,
                  ownerWillTrain: false,
                  housing: false,
                  noSupplyFee: false,
                  fullTime: false,
                  partTime: false,
                  verified: false,
                  showExpired: true,
                });
              }}>Clear Filters</Button>
            </div>
          )}
        </Tabs>

        <div className="mt-12 text-center p-8 border border-gray-200 rounded-xl bg-gradient-to-br from-purple-50 to-white shadow-sm">
          <h2 className="text-2xl font-playfair font-bold mb-2">Post Your Job on EmviApp</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Reach thousands of qualified beauty professionals and fill your positions faster.
          </p>
          <Button 
            size="lg" 
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium"
            onClick={() => window.location.href = "/sign-up"}
          >
            Post a Job - Free Trial Available
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default JobsPage;
