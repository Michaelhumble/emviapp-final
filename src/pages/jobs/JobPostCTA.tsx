
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const JobPostCTA = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl shadow-sm border border-blue-100 text-center mb-8">
      <h3 className="font-semibold text-lg mb-2">Looking for talented nail technicians?</h3>
      <p className="text-gray-700 mb-4">
        Post a job listing to reach thousands of qualified professionals in your area
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <Badge variant="outline" className="bg-white text-gray-800 font-normal text-sm py-1.5 px-4">
          Standard Job Post: $49
        </Badge>
        <Badge variant="outline" className="bg-white text-gray-800 font-normal text-sm py-1.5 px-4">
          Featured Job Post: $99
        </Badge>
        <Link to="/jobs/post">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
            Post a Job
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default JobPostCTA;
