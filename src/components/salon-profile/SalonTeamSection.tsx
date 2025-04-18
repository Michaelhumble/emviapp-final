import React from 'react';
import { Salon } from '@/types/salon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface SalonTeamSectionProps {
  salon: Salon;
}

const SalonTeamSection: React.FC<SalonTeamSectionProps> = ({ salon }) => {
  // Mock team data (in a real app, this would come from the API)
  const team = [
    {
      id: '1',
      name: 'Mai Tran',
      role: 'Nail Artist',
      specialty: 'Gel Extensions',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
    },
    {
      id: '2',
      name: 'Linh Nguyen',
      role: 'Senior Technician',
      specialty: 'Nail Art',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: '3',
      name: 'Danny Pham',
      role: 'Salon Manager',
      specialty: 'Customer Service',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    {
      id: '4',
      name: 'Kim Ly',
      role: 'Junior Technician',
      specialty: 'Pedicures',
      avatar: 'https://randomuser.me/api/portraits/women/67.jpg'
    }
  ];
  
  return (
    <section className="max-w-5xl mx-auto">
      <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="pb-2 border-b border-gray-50">
          <CardTitle className="flex items-center text-xl font-serif">
            <Users className="h-5 w-5 mr-2 text-purple-600" />
            Meet Our Team
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {team.map((member) => (
              <motion.div 
                key={member.id}
                whileHover={{ y: -5, scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <Link 
                  to={`/a/${member.id}`} 
                  className="block text-center group"
                >
                  <div className="relative mx-auto w-24 h-24 mb-3 overflow-hidden rounded-full ring-2 ring-offset-2 ring-purple-100 group-hover:ring-purple-300 transition-all duration-300">
                    <img 
                      src={member.avatar} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-1">
                      <ExternalLink className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <h3 className="font-medium text-sm">{member.name}</h3>
                  <p className="text-xs text-gray-500">{member.role}</p>
                  <p className="text-xs text-purple-600 mt-1">{member.specialty}</p>
                </Link>
              </motion.div>
            ))}
          </div>
          
          {salon.isHiring && (
            <div className="mt-8 bg-purple-50 rounded-lg p-4 text-center">
              <h3 className="font-semibold text-purple-800">We're Hiring!</h3>
              <p className="text-sm text-purple-700 mt-1">
                Looking for talented nail technicians to join our team.
              </p>
              <Button variant="link" className="text-purple-800 mt-2">
                Learn More
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default SalonTeamSection;
