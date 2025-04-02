
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const Jobs = () => (
  <Layout>
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Beauty Industry Jobs</h1>
      <p className="text-lg text-gray-600 mb-8">
        Find your perfect position in the beauty industry.
      </p>
      
      <div className="grid grid-cols-1 gap-6">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="bg-white rounded-lg shadow p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Senior Hairstylist #{item}</h3>
                <p className="text-gray-600 mb-1">Glamour Salon • New York, NY</p>
                <p className="text-gray-600 mb-3">$25-35/hr • Full-time</p>
                <p className="text-gray-700 mb-4 max-w-2xl">
                  We're looking for an experienced hairstylist to join our team. Must have at least 3 years of experience and a portfolio of work.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button>Apply Now</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Layout>
);

export default Jobs;
