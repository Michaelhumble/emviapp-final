
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Building, GlobeLock } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';

const BeautyExchangeSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-gray-900">
            The Beauty Exchange
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Connect with top beauty professionals and businesses across the country. 
            Find your next career opportunity or discover salons that are looking for talent like yours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-3">Jobs & Careers</h3>
            <p className="text-gray-600 mb-6">
              Browse hundreds of job opportunities in salons, spas, and beauty businesses across the country.
            </p>
            <Link to="/jobs">
              <Button size="lg" className="w-full md:w-auto">Browse Jobs</Button>
            </Link>
          </Card>
          
          <Card className="p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-3">Salons & Businesses</h3>
            <p className="text-gray-600 mb-6">
              Discover salons for sale, rental opportunities, and business partnerships in the beauty industry.
            </p>
            <Link to="/salons">
              <Button size="lg" variant="outline" className="w-full md:w-auto">
                <Building className="mr-2 h-4 w-4" />
                Browse Salons
              </Button>
            </Link>
          </Card>
        </div>

        {/* New section for Vietnamese listings */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100">
            <h3 className="text-2xl font-semibold mb-3">Vietnamese Beauty Community</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Kết nối với cộng đồng thợ làm đẹp người Việt. Tìm việc làm hoặc tiệm nail đang bán tại đây.
              <br />
              <span className="text-sm italic">Connect with the Vietnamese beauty professional community. Find jobs or nail salons for sale here.</span>
            </p>
            <Link to="/vietnamese-listings">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Vietnamese Listings
              </Button>
            </Link>
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default BeautyExchangeSection;
