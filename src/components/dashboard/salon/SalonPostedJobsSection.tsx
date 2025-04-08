
import { useEffect, useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { useTranslation } from "@/hooks/useTranslation";
import { adaptUserProfile } from "@/utils/profileAdapter";

interface Job {
  id: string;
  title: string;
  location?: string;
  created_at: string;
  status: string;
}

const SalonPostedJobsSection = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, userProfile } = useAuth();
  const adaptedProfile = adaptUserProfile(userProfile);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchJobs = async () => {
      if (!user?.id) return;
      
      try {
        setLoading(true);
        console.log("Fetching jobs for salon owner with ID:", user.id);
        
        // Get salon jobs from Supabase
        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .eq("salon_id", user.id)
          .order("created_at", { ascending: false });
          
        if (error) {
          console.error("Error fetching salon jobs:", error);
          return;
        }
        
        console.log("Jobs fetched:", data);
        setJobs(data || []);
      } catch (err) {
        console.error("Error in fetchJobs:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, [user]);
  
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-medium text-gray-800">{t("Your Posted Jobs")}</h2>
          <p className="text-gray-600 text-sm mt-1">{t("Manage and track your job listings")}</p>
        </div>
        
        <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2" asChild>
          <Link to="/post/job">
            <Plus className="h-4 w-4" />
            {t("Post New Job")}
          </Link>
        </Button>
      </div>
      
      {loading ? (
        <div className="text-center py-10">
          <div className="animate-spin h-8 w-8 border-b-2 border-blue-500 rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-500">{t("Loading your job posts...")}</p>
        </div>
      ) : jobs.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("Job Title")}</TableHead>
                <TableHead className="hidden md:table-cell">{t("Location")}</TableHead>
                <TableHead className="hidden md:table-cell">{t("Posted")}</TableHead>
                <TableHead>{t("Status")}</TableHead>
                <TableHead>{t("Actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell className="hidden md:table-cell">{job.location || "N/A"}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {job.created_at ? format(new Date(job.created_at), 'MMM d, yyyy') : "N/A"}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      job.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}>
                      {job.status === "active" ? t("Published") : t("Draft")}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="text-blue-600">
                      {t("View")}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">{t("You haven't posted any jobs yet")}</h3>
          <p className="text-gray-500 mb-4">{t("Post your first job to find nail technicians for your salon")}</p>
          <Button asChild>
            <Link to="/post/job">{t("Post Your First Job")}</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default SalonPostedJobsSection;
