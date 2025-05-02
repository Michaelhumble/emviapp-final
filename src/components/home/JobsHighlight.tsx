
import React from 'react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ListingsGrid from '@/components/listings/ListingsGrid';
import { Job } from '@/types/job';

// Real Vietnamese nail job listings
const sampleJobs: Job[] = [
  {
    id: "job-1",
    title: "Thợ Bột và Dip Full Time",
    company: "Tiệm Nail",
    location: "Kansas City North",
    created_at: new Date().toISOString(),
    description: "Tiệm mình ở Kansas City North đang cần tìm thợ Bột và Dip full time. Luôn đảm bảo income nên cần tìm thợ làm lâu dài, chuyên nghiệp, tận tâm với công việc.",
    imageUrl: "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png",
    type: 'job',
    is_vietnamese_listing: true,
  },
  {
    id: "job-2",
    title: "Thợ Chân Tay Nước",
    company: "Cosmo Nails",
    location: "Overland Park",
    created_at: new Date().toISOString(),
    description: "Tiệm Cosmo Nails ở Overland Park cần tìm thợ chân tay nước biết làm dip càng tốt. Chủ trẻ dễ nói chuyện, thợ dễ thương hoà đồng thân thiện.",
    imageUrl: "/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png",
    type: 'job',
    is_vietnamese_listing: true,
  },
  {
    id: "job-3",
    title: "Thợ Nail Everything hoặc Chân Tay Nước",
    company: "Bellagio Nail & Day Spa",
    location: "Pensacola, FL",
    created_at: new Date().toISOString(),
    description: "Tiệm đang cần thợ làm everything hoặc chân tay nước, biết vẽ càng tốt. Income cao, bao lương or ăn chia tuỳ theo tay nghề.",
    imageUrl: "/lovable-uploads/5a1ba245-85f7-4036-95f9-0e08ada34602.png",
    type: 'job',
    is_vietnamese_listing: true,
  }
];

const JobsHighlight = () => {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h2 className="font-playfair text-3xl font-bold mb-4">
            Find Your Dream Job in Beauty
          </h2>
          <p className="text-gray-600 mb-6">
            Discover opportunities in nail salons, hair styling, barbershops, and more. Connect with businesses looking for talented professionals like you.
          </p>
          <Link to="/jobs">
            <Button className="px-8">
              View All Opportunities <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="mt-8">
          <ListingsGrid listings={sampleJobs} />
        </div>

        <div className="text-center mt-10">
          <Link to="/jobs">
            <Button variant="outline">
              Browse All Jobs <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default JobsHighlight;
