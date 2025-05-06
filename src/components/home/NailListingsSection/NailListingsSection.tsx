import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { useAuth } from '@/context/auth';
import { nailSalonImages } from '@/utils/beautyExchangeImages';
import { featuredNailsAds } from '@/utils/featuredNailsAds';

const NailListingsSection = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  const jobs = [
    {
      id: 'job-1',
      title: 'Tìm Thợ Nails Magic Naiks– Great Falls, MT',
      salary: '$1,200–$1,500/tuần',
      description: 'Magic Nails cần thợ biết làm bột và tay chân nước.',
      location: 'Great Falls, MT',
      contact: '(406) 770-3070',
      image: '/lovable-uploads/f3ccd2e7-9177-4fca-84b0-c39125bc3932.png'
    },
    {
      id: 'job-2',
      title: 'Tuyển Thợ Nail – Clawson, MI',
      salary: '$1,200–$1,800/tuần',
      description: 'Tiệm nhỏ, khu Mỹ trắng, tip hậu. Cần thợ làm bột, dip, gel-x.',
      location: 'Clawson, MI',
      contact: '(248) 403-6472',
      image: '/lovable-uploads/7c077c91-83a4-4010-a7f6-4c0c8c614f7d.png'
    },
    {
      id: 'job-3',
      title: 'Thợ Nail Design – Humble, TX (Milano Nail Spa)',
      salary: '>$2,000/tuần',
      description: 'Tiệm lớn nhất khu vực, tuyển thợ bột design. Receptionist $150/ngày.',
      location: 'Humble, TX',
      contact: '(346) 398-6868',
      image: '/lovable-uploads/3724fdb0-e1a0-4fc6-82f4-32e1c9774bed.png'
    },
    {
      id: 'job-4',
      title: 'Tuyển Thợ Nail – South Lake Tahoe, CA',
      salary: '$1,600–$2,500+/tuần',
      description: 'Tiệm dễ thương, khách du lịch chịu chi. Ưu tiên biết tiếng Anh.',
      location: 'South Lake Tahoe, CA',
      contact: '(916) 802-1922',
      image: '/lovable-uploads/e191cbf3-2536-4c60-aa7a-02f1e65451f9.png'
    },
    {
      id: 'job-5',
      title: 'Cần Thợ Nail – Killeen, TX',
      salary: '$1,500+/tuần',
      description: 'Tiệm lớn, giá cao, tip tốt. Gặp Johnny/Hannah.',
      location: 'Killeen, TX',
      contact: '(512) 540-6173',
      image: '/lovable-uploads/de4ee23d-f2f5-48a2-96b3-8981bf9f0f73.png'
    },
  ];

  const handleOpenListing = (id: string) => {
    if (id === 'job-1') {
      navigate('/jobs/nail/magic-nails');
    } else {
      navigate(`/jobs/nail/${id}`);
    }
  };

  return (
    <div className="container mx-auto my-12 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Tin Tuyển Dụng Mới Nhất</h2>
        <span className="text-sm px-2 py-1 bg-gradient-to-r from-amber-400 to-yellow-300 text-amber-900 rounded-full font-medium">
          ★ FEATURED
        </span>
      </div>

      {/* First row - Nail Jobs */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {jobs.map((job) => (
          <Card key={job.id} className="overflow-hidden h-full flex flex-col">
            <div className="relative h-40">
              <ImageWithFallback
                src={job.image}
                alt={job.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-white/80 px-2 py-1 rounded text-xs font-medium">
                Nail
              </div>
            </div>
            <CardHeader className="p-4 pb-2">
              <h3 className="font-semibold text-sm leading-tight">{job.title}</h3>
              <p className="font-bold text-pink-600">{job.salary}</p>
            </CardHeader>
            <CardContent className="px-4 py-2 text-sm flex-grow">
              <p className="text-gray-700 text-sm">{job.description} 📍{job.location}</p>
              {isSignedIn ? (
                <p className="text-gray-700 mt-2 text-sm">{job.contact}</p>
              ) : (
                <p className="text-gray-500 mt-2 text-sm italic">🔒 Sign in to view contact info</p>
              )}
            </CardContent>
            <CardFooter className="p-4 pt-2">
              <Button
                onClick={() => handleOpenListing(job.id)}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
                size="sm"
              >
                Xem Chi Tiết
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Second row - Nail Salons (unchanged) */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {featuredNailsAds.map((salon, index) => (
          <Card key={salon.id} className="overflow-hidden h-full flex flex-col">
            <div className="relative h-40">
              <ImageWithFallback
                src={salon.photos[0]}
                alt={salon.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-white/80 px-2 py-1 rounded text-xs font-medium">
                Nail
              </div>
            </div>
            <CardHeader className="p-4 pb-2">
              <h3 className="font-semibold text-sm leading-tight">{salon.title}</h3>
              <p className="font-bold text-pink-600">{salon.price}</p>
            </CardHeader>
            <CardContent className="px-4 py-2 text-sm flex-grow">
              <p className="text-gray-700 text-sm line-clamp-3">{salon.description}</p>
            </CardContent>
            <CardFooter className="p-4 pt-2">
              <Button
                onClick={() => navigate(`/salons/nail/${salon.id}`)}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
                size="sm"
              >
                Xem Chi Tiết
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NailListingsSection;
