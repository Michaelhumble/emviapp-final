import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/auth';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const NailListingsSection = () => {
  const { isSignedIn } = useAuth();
  
  // Use the same images that are already in the project
  const nailJobImages = [
    '/lovable-uploads/074b3ba02-2378-41d7-8cb5-023145e94700.png',
    '/lovable-uploads/c8ad59e6-75a9-4a83-afd6-0f8a41ac93c0.png',
    '/lovable-uploads/755e1db4-6ea5-40c4-8007-81b8beba6e2b.png',
    '/lovable-uploads/0d50d1e2-4ac5-4520-8d66-dffc59da9302.png',
    '/lovable-uploads/f85b0984-587b-4ce1-bdc7-2bf357aa7695.png'
  ];

  // Vietnamese Nail Job Listings Data - First Row
  const vietnameseNailJobs = [
    {
      title: 'Tìm Thợ Nails Tất Cả – Great Falls, MT',
      salary: '$1,200–$1,500/tuần',
      description: 'Magic Nails cần thợ biết làm bột và tay chân nước. Great Falls, MT. (406) 770-3070',
      image: nailJobImages[0]
    },
    {
      title: 'Tuyển Thợ Nail – Clawson, MI',
      salary: '$1,200–$1,800/tuần',
      description: 'Tiệm nhỏ, khu Mỹ trắng, tip hậu. Cần thợ làm bột, dip, gel-x. (248) 403-6472',
      image: nailJobImages[1]
    },
    {
      title: 'Thợ Nail Design – Humble, TX (Milano Nail Spa)',
      salary: '>$2,000/tuần',
      description: 'Tiệm lớn nhất khu vực, tuyển thợ bột design. Receptionist $150/ngày. (346) 398-6868',
      image: nailJobImages[2]
    },
    {
      title: 'Tuyển Thợ Nail – South Lake Tahoe, CA',
      salary: '$1,600–$2,500+/tuần',
      description: 'Tiệm dễ thương, khách du lịch chịu chi. Ưu tiên biết tiếng Anh. (916) 802-1922',
      image: nailJobImages[3]
    },
    {
      title: 'Cần Thợ Nail – Killeen, TX',
      salary: '$1,500+/tuần',
      description: 'Tiệm lớn, giá cao, tip tốt. Gặp Johnny/Hannah: (512) 540-6173',
      image: nailJobImages[4]
    }
  ];

  // Keep the existing Vietnamese Salon data for second row, preserving all existing code for it
  const vietnameseSalons = [
    {
      title: "Thiem Nail & Spa",
      location: "2205 Fort Campbell Blvd, Clarksville, TN 37042",
      image: "/placeholder.svg",
      url: "https://www.google.com/maps/place/Thiem+Nail+%26+Spa/@36.544729,-87.404364,16z/data=!4m6!3m5!1s0x8864ff157c444443:0x94493cb8e09d4c1d!8m2!3d36.544729!4d-87.404364!16s%2Fg%2F11pb1jby6q?hl=en&entry=ttu",
    },
    {
      title: "Nails Spa",
      location: "2505 Murfreesboro Pike, Nashville, TN 37217",
      image: "/placeholder.svg",
      url: "https://www.google.com/maps/place/Nails+Spa/@36.1204878,-86.724284,17z/data=!3m1!4b1!4m6!3m5!1s0x88646574987b25c9:0x409e980c9c489362!8m2!3d36.1204878!4d-86.724284!16s%2Fg%2F11c283bs6l?hl=en&entry=ttu",
    },
    {
      title: "LV Nails & Spa",
      location: "3031 Dickerson Pike Ste 101, Nashville, TN 37207",
      image: "/placeholder.svg",
      url: "https://www.google.com/maps/place/LV+Nails+%26+Spa/@36.238138,-86.763443,17z/data=!3m1!4b1!4m6!3m5!1s0x886463c572107c59:0x49b94858559ca96c!8m2!3d36.238138!4d-86.763443!16s%2Fg%2F11h2rxfrv4?hl=en&entry=ttu",
    },
    {
      title: "Rose Nails",
      location: "4003 Nolensville Pike, Nashville, TN 37211",
      image: "/placeholder.svg",
      url: "https://www.google.com/maps/place/Rose+Nails/@36.091588,-86.760435,17z/data=!3m1!4b1!4m6!3m5!1s0x88646692b3e19395:0x61cef9f44289499f!8m2!3d36.091588!4d-86.760435!16s%2Fg%2F11bc6cr05w?hl=en&entry=ttu",
    },
    {
      title: "Nails & Spa",
      location: "4003 Nolensville Pike, Nashville, TN 37211",
      image: "/placeholder.svg",
      url: "https://www.google.com/maps/place/Nails+%26+Spa/@36.091588,-86.760435,17z/data=!4m9!1m2!2m2!1snails+near+me!2zbmFpbHMgbmVhciBtZQ!3m5!1s0x88646692b3e19395:0x61cef9f44289499f!8m2!3d36.091588!4d-86.760435!16s%2Fg%2F11bc6cr05w?hl=en&entry=ttu",
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Vietnamese Nail Jobs Section - First row */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-2 font-playfair">Vietnamese Nail Jobs</h2>
          <p className="text-gray-600 mb-8">Find opportunities in the Vietnamese nail industry</p>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {vietnameseNailJobs.map((job, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 bg-gray-100">
                    <img
                      src={job.image}
                      alt={job.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 left-2 bg-pink-100 text-pink-800 border-pink-200">
                      ★ FEATURED
                    </Badge>
                    <Badge className="absolute top-2 right-2 bg-blue-100 text-blue-800 border-blue-200">
                      Nail
                    </Badge>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1 line-clamp-2">{job.title}</h3>
                    
                    <div className="text-sm font-medium text-green-700 mb-2">
                      {job.salary}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {job.description}
                    </p>
                    
                    {!isSignedIn && (
                      <div className="text-xs text-gray-500 italic flex items-center gap-1 mb-3">
                        🔒 Sign in to view contact details
                      </div>
                    )}
                    
                    <Link to="/jobs">
                      <Button className="w-full flex items-center justify-center gap-1">
                        Xem Chi Tiết <ExternalLink className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="flex justify-center mt-8">
            <Link to="/jobs">
              <Button variant="outline" size="lg" className="px-8">
                View All Vietnamese Nail Jobs
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Vietnamese Salons For Sale Section - Second row */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-2 font-playfair">
            Vietnamese Salons For Sale
          </h2>
          <p className="text-gray-600 mb-8">
            Explore opportunities to own a salon in the Vietnamese community
          </p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {vietnameseSalons.map((salon, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 bg-gray-100">
                    <img
                      src={salon.image}
                      alt={salon.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {salon.title}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm line-clamp-1">{salon.location}</span>
                    </div>
                    <a
                      href={salon.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" className="w-full">
                        View Location
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          <div className="flex justify-center mt-8">
            <Link to="/listings">
              <Button variant="outline" size="lg" className="px-8">
                View All Salon Listings
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NailListingsSection;
