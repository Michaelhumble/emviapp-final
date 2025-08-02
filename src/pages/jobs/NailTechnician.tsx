import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Clock, DollarSign, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NailTechnician = () => {
  const jobs = [
    {
      id: '1',
      title: 'Senior Nail Technician',
      salon: 'Luxe Nails Spa',
      location: 'Beverly Hills, CA',
      type: 'Full-time',
      salary: '$45,000 - $65,000',
      rating: 4.8,
      description: 'We are seeking an experienced nail technician to join our high-end salon...',
      requirements: ['Valid nail technician license', '2+ years experience', 'Gel and acrylic expertise']
    },
    {
      id: '2',
      title: 'Nail Technician - Part Time',
      salon: 'Downtown Beauty Bar',
      location: 'New York, NY',
      type: 'Part-time',
      salary: '$25 - $35/hour',
      rating: 4.6,
      description: 'Flexible part-time position perfect for building your client base...',
      requirements: ['State certification required', 'Basic manicure/pedicure skills', 'Customer service focus']
    },
    {
      id: '3',
      title: 'Lead Nail Artist',
      salon: 'Trend Setters Salon',
      location: 'Miami, FL',
      type: 'Full-time',
      salary: '$50,000 - $70,000',
      rating: 4.9,
      description: 'Lead our nail art team and create stunning designs for our VIP clients...',
      requirements: ['Advanced nail art skills', 'Leadership experience', 'Social media savvy']
    }
  ];

  return (
    <>
      <Helmet>
        <title>Nail Technician Jobs - EmviApp | Find Your Perfect Nail Tech Position</title>
        <meta name="description" content="Discover exciting nail technician job opportunities. Find full-time, part-time, and freelance positions at top salons and spas. Apply today on EmviApp." />
        <meta name="keywords" content="nail technician jobs, nail tech careers, manicurist positions, nail salon jobs, nail artist opportunities" />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Nail Technician Jobs
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Find your perfect nail technician position at top salons and spas. 
                From entry-level to senior positions, discover opportunities that match your skills.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/post-job">
                  <Button size="lg" className="px-8 py-3">
                    Post a Job
                  </Button>
                </Link>
                <Link to="/auth/signup">
                  <Button variant="outline" size="lg" className="px-8 py-3">
                    Create Profile
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl font-serif font-bold mb-4">Featured Nail Technician Positions</h2>
                <p className="text-gray-600">Hand-picked opportunities from top-rated salons and spas</p>
              </div>

              <div className="space-y-6">
                {jobs.map((job) => (
                  <div key={job.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold">{job.title}</h3>
                          <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                            {job.type}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {job.salary}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            {job.rating}
                          </div>
                        </div>

                        <h4 className="font-medium text-gray-800 mb-2">{job.salon}</h4>
                        <p className="text-gray-600 mb-3">{job.description}</p>

                        <div className="mb-4">
                          <h5 className="font-medium text-gray-800 mb-2">Requirements:</h5>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {job.requirements.map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 md:flex-shrink-0">
                        <Button className="w-full md:w-auto">
                          Apply Now
                        </Button>
                        <Button variant="outline" className="w-full md:w-auto">
                          Save Job
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link to="/jobs">
                  <Button variant="outline" size="lg">
                    View All Nail Tech Jobs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-serif font-bold text-center mb-12">
                Tips for Landing Your Dream Nail Tech Job
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4">Build Your Portfolio</h3>
                  <p className="text-gray-600">
                    Showcase your best nail art and technical skills with high-quality photos. 
                    Include before/after shots and various techniques you've mastered.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4">Stay Current with Trends</h3>
                  <p className="text-gray-600">
                    Keep up with the latest nail art trends, techniques, and products. 
                    Continuous learning shows employers you're passionate about your craft.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4">Maintain Certifications</h3>
                  <p className="text-gray-600">
                    Ensure your licenses and certifications are current. Consider additional 
                    certifications in specialized techniques like gel extensions or nail art.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4">Network in the Industry</h3>
                  <p className="text-gray-600">
                    Attend beauty trade shows, join professional associations, and connect 
                    with other nail technicians to learn about new opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Ready to Start Your Nail Tech Career?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join EmviApp today and connect with top salons looking for talented nail technicians.
              </p>
              <Link to="/auth/signup">
                <Button size="lg" variant="secondary" className="px-8 py-3">
                  Create Your Profile
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default NailTechnician;