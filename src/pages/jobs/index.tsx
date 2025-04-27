
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useJobsData, JobFilters } from '@/hooks/useJobsData';
import JobsGrid from '@/components/jobs/JobsGrid';
import JobEmptyState from '@/components/jobs/JobEmptyState';
import { DollarSign, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/useTranslation';
import { useJobRenewal } from '@/hooks/useJobRenewal';
import { useAuth } from '@/context/auth';

const JobsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<JobFilters>({
    featured: false,
    remote: false, // Changed from is_remote to remote
    fullTime: false,
    partTime: false,
    weeklyPay: false, // Changed from weekly_pay to weeklyPay
    ownerWillTrain: false, // Changed from owner_will_train to ownerWillTrain
    hasHousing: false, // Changed from has_housing to hasHousing
    noSupplyDeduction: false, // Changed from no_supply_deduction to noSupplyDeduction
    employmentType: 'all',
    payType: 'all',
  });

  const { jobs, loading, error, updateFilters, featuredJobs, renewalJobId, setActiveRenewalJobId } = useJobsData({
    ...activeFilters,
    searchTerm: debouncedSearchTerm,
  });

  const { user } = useAuth();
  const { renewJob, isRenewing } = useJobRenewal({
    onSuccess: () => {
      console.log("Job renewed successfully");
    }
  });

  const handleRenewJob = async (job: any) => {
    setActiveRenewalJobId(job.id);
    await renewJob(job.id);
  };

  // Effect for search term debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset all filters
  const resetFilters = () => {
    setActiveFilters({
      featured: false,
      remote: false, // Changed from is_remote to remote
      fullTime: false,
      partTime: false,
      weeklyPay: false, // Changed from weekly_pay to weeklyPay
      ownerWillTrain: false, // Changed from owner_will_train to ownerWillTrain
      hasHousing: false, // Changed from has_housing to hasHousing
      noSupplyDeduction: false, // Changed from no_supply_deduction to noSupplyDeduction
      employmentType: 'all',
      payType: 'all',
    });
    setSearchTerm('');
    setDebouncedSearchTerm('');
  };

  // Update filters in parent component
  useEffect(() => {
    updateFilters(activeFilters);
  }, [activeFilters, updateFilters]);

  // Compute expirations map for jobs
  const expirations = useMemo(() => {
    const result: Record<string, boolean> = {};
    
    jobs.forEach(job => {
      // Default 30-day expiration logic
      const createdDate = new Date(job.created_at);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - createdDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      result[job.id] = diffDays > 30 || job.status === 'expired';
    });
    
    return result;
  }, [jobs]);

  // Toggle filter function
  const toggleFilter = (filter: keyof JobFilters) => {
    setActiveFilters(prev => ({
      ...prev,
      [filter]: !prev[filter as keyof JobFilters]
    }));
  };

  // Set filter function
  const setFilter = (filter: keyof JobFilters, value: any) => {
    setActiveFilters(prev => ({
      ...prev,
      [filter]: value
    }));
  };

  const countActiveFilters = () => {
    let count = 0;
    if (activeFilters.featured) count++;
    if (activeFilters.remote) count++; // Changed from is_remote to remote
    if (activeFilters.fullTime) count++;
    if (activeFilters.partTime) count++;
    if (activeFilters.weeklyPay) count++; // Changed from weekly_pay to weeklyPay
    if (activeFilters.ownerWillTrain) count++; // Changed from owner_will_train to ownerWillTrain  
    if (activeFilters.hasHousing) count++; // Changed from has_housing to hasHousing
    if (activeFilters.noSupplyDeduction) count++; // Changed from no_supply_deduction to noSupplyDeduction
    if (activeFilters.employmentType !== 'all') count++;
    if (activeFilters.payType !== 'all') count++;
    if (searchTerm) count++;
    return count;
  };

  const { t } = useTranslation();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 mb-8 shadow-sm">
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Beauty Career</h1>
          <p className="text-lg text-gray-700 max-w-3xl mb-6">
            Browse the latest job opportunities in the beauty industry. From nail technicians to hair stylists, from part-time to full ownership positions.
          </p>
          <div className="relative max-w-2xl">
            <Input
              type="search"
              placeholder="Search jobs by title, location, or salon name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-12 h-12 text-base shadow-sm ring-1 ring-blue-100"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              {loading ? (
                <div className="animate-spin h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full"></div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-sm border-blue-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-playfair">Filters</CardTitle>
                {countActiveFilters() > 0 && (
                  <Button variant="link" onClick={resetFilters} className="text-sm p-0 h-auto font-normal">
                    Reset All
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remote" 
                      checked={activeFilters.remote} // Changed from is_remote to remote
                      onCheckedChange={() => toggleFilter('remote')} // Changed from is_remote to remote
                    />
                    <Label htmlFor="remote" className="cursor-pointer">Remote Work</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="weeklyPay" 
                      checked={activeFilters.weeklyPay} // Changed from weekly_pay to weeklyPay
                      onCheckedChange={() => toggleFilter('weeklyPay')} // Changed from weekly_pay to weeklyPay
                    />
                    <Label htmlFor="weeklyPay" className="cursor-pointer">Weekly Pay</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="ownerWillTrain" 
                      checked={activeFilters.ownerWillTrain} // Changed from owner_will_train to ownerWillTrain
                      onCheckedChange={() => toggleFilter('ownerWillTrain')} // Changed from owner_will_train to ownerWillTrain
                    />
                    <Label htmlFor="ownerWillTrain" className="cursor-pointer">Owner Will Train</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="hasHousing" 
                      checked={activeFilters.hasHousing} // Changed from has_housing to hasHousing
                      onCheckedChange={() => toggleFilter('hasHousing')} // Changed from has_housing to hasHousing
                    />
                    <Label htmlFor="hasHousing" className="cursor-pointer">Housing Available</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="noSupplyDeduction" 
                      checked={activeFilters.noSupplyDeduction} // Changed from no_supply_deduction to noSupplyDeduction
                      onCheckedChange={() => toggleFilter('noSupplyDeduction')} // Changed from no_supply_deduction to noSupplyDeduction
                    />
                    <Label htmlFor="noSupplyDeduction" className="cursor-pointer">No Supply Deduction</Label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium text-sm text-gray-700">Employment Type</h3>
                  <Select 
                    value={activeFilters.employmentType} 
                    onValueChange={(value) => setFilter('employmentType', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Employment Types</SelectItem>
                      <SelectItem value="Full-Time">Full Time</SelectItem>
                      <SelectItem value="Part-Time">Part Time</SelectItem>
                      <SelectItem value="For Sale">For Sale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium text-sm text-gray-700">Pay Type</h3>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="commission" 
                      checked={activeFilters.payType === 'commission'}
                      onCheckedChange={() => setFilter('payType', activeFilters.payType === 'commission' ? 'all' : 'commission')}
                    />
                    <Label htmlFor="commission" className="cursor-pointer">Commission Based</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="hourly" 
                      checked={activeFilters.payType === 'hourly'}
                      onCheckedChange={() => setFilter('payType', activeFilters.payType === 'hourly' ? 'all' : 'hourly')}
                    />
                    <Label htmlFor="hourly" className="cursor-pointer">Hourly/Salary Position</Label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium text-sm text-gray-700">Additional Features</h3>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="featured" 
                      checked={activeFilters.featured}
                      onCheckedChange={() => toggleFilter('featured')}
                    />
                    <Label htmlFor="featured" className="cursor-pointer">Featured Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="fullTime" 
                      checked={activeFilters.fullTime}
                      onCheckedChange={() => toggleFilter('fullTime')}
                    />
                    <Label htmlFor="fullTime" className="cursor-pointer">Full Time Positions</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="partTime" 
                      checked={activeFilters.partTime}
                      onCheckedChange={() => toggleFilter('partTime')}
                    />
                    <Label htmlFor="partTime" className="cursor-pointer">Part Time Positions</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-8">
            {featuredJobs && featuredJobs.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-playfair font-semibold border-b border-blue-100 pb-2">Featured Opportunities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredJobs.map((job) => (
                    <Card key={job.id} className="overflow-hidden transform transition hover:shadow-md">
                      <div className="h-32 bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center p-6 relative">
                        <Badge className="absolute top-2 right-2 bg-amber-100 text-amber-800 hover:bg-amber-200 border-0">
                          <Star className="w-3 h-3 mr-1" /> Featured
                        </Badge>
                        <h3 className="font-playfair text-xl font-semibold text-center">{job.title || job.company}</h3>
                      </div>
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-center mb-3">
                          <div className="font-medium text-gray-800">{job.company}</div>
                          <Badge variant="outline" className="text-xs">{job.employment_type}</Badge>
                        </div>
                        <p className="text-gray-600 line-clamp-2 mb-3 text-sm">{job.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {job.salary_range && (
                            <Badge className="bg-blue-50 text-blue-700 border border-blue-200 font-normal hover:bg-blue-100">
                              <DollarSign className="w-3 h-3 mr-1" /> {job.salary_range}
                            </Badge>
                          )}
                          {job.location && (
                            <Badge className="bg-gray-50 text-gray-700 border border-gray-200 font-normal hover:bg-gray-100">
                              {job.location}
                            </Badge>
                          )}
                        </div>
                        <Button className="w-full mt-2 transform transition-transform hover:translate-y-[-2px]">
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-playfair font-semibold">All Job Listings</h2>
                <div className="text-sm text-gray-500">
                  {jobs.length} {jobs.length === 1 ? 'result' : 'results'} found
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : error ? (
                <div className="bg-red-50 p-4 rounded-lg text-center">
                  <p className="text-red-600">Error loading job listings. Please try again later.</p>
                </div>
              ) : jobs.length === 0 ? (
                <JobEmptyState 
                  searchTerm={debouncedSearchTerm} 
                  onClearFilters={resetFilters}
                  filters={activeFilters}
                />
              ) : (
                <JobsGrid 
                  jobs={jobs} 
                  expirations={expirations} 
                  currentUserId={user?.id}
                  onRenew={handleRenewJob} 
                  isRenewing={isRenewing}
                  renewalJobId={renewalJobId}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobsPage;
