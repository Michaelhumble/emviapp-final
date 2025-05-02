
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Briefcase, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const jobListings = [
  {
    id: "job-1",
    title: "Senior Nail Technician",
    salon: "Glossy Nail Studio",
    location: "San Francisco, CA",
    salary: "$25-35/hr",
    type: "Full-time"
  },
  {
    id: "job-2",
    title: "Lash Specialist",
    salon: "Elite Beauty Bar",
    location: "Los Angeles, CA",
    salary: "$30-40/hr",
    type: "Part-time"
  },
  {
    id: "job-3",
    title: "Salon Manager",
    salon: "Luxe Nail Lounge",
    location: "New York, NY",
    salary: "$60-70k/year",
    type: "Full-time"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const JobsHighlight = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Top Beauty Jobs in Your Area</h2>
          <p className="text-lg text-gray-600">
            Find your perfect position with competitive pay and benefits
          </p>
        </motion.div>

        <motion.div 
          className="space-y-6 max-w-4xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {jobListings.map((job) => (
            <motion.div key={job.id} variants={item}>
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                      <p className="text-gray-600 mb-1">{job.salon} • {job.location}</p>
                      <p className="text-gray-600 mb-3">{job.salary} • {job.type}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Link to={`/jobs/${job.id}`}>
                        <Button>Apply Now</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Link to="/jobs">
            <Button size="lg" variant="outline" className="font-medium">
              Browse All Jobs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JobsHighlight;
