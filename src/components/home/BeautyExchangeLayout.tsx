
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Clock, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Categories that will be displayed with real ads
const categories = [
  {
    name: "Nails",
    ads: [
      { 
        title: "Crystal Nail Studio", 
        location: "Los Angeles, CA",
        rating: 4.9,
        image: "/lovable-uploads/98f473d0-0359-4114-9bcc-c9aea3c6fcf6.png",
        specialty: "Gel & Acrylics" 
      },
      { 
        title: "Pink Lotus Nails", 
        location: "San Francisco, CA",
        rating: 4.8,
        image: "/lovable-uploads/9e713225-1758-4c21-84d3-33e7707a2806.png",
        specialty: "Nail Art" 
      },
      { 
        title: "Modern Mani Spa", 
        location: "Miami, FL",
        rating: 4.7,
        image: "/lovable-uploads/45fbe8fa-1758-43e5-a8b0-bbf55a601a41.png",
        specialty: "Luxury Manicures" 
      },
      { 
        title: "Pure Nails Design", 
        location: "New York, NY",
        rating: 5.0,
        image: "/lovable-uploads/52b943aa-d9b3-46ce-9f7f-94f3b223cb28.png", 
        specialty: "Dip Powder" 
      },
      { 
        title: "Elegant Fingers", 
        location: "Portland, OR",
        rating: 4.8,
        image: "/lovable-uploads/50f25b6c-64cb-45d5-be26-c487274d36d1.png",
        specialty: "Japanese Nail Art" 
      }
    ]
  },
  {
    name: "Hair & Barber",
    ads: [
      { 
        title: "The Refined Cut", 
        location: "Chicago, IL",
        rating: 4.9,
        image: "/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png",
        specialty: "Executive Barbering" 
      },
      { 
        title: "Blossom Hair Studio", 
        location: "Nashville, TN",
        rating: 5.0,
        image: "/lovable-uploads/b13a3b43-f6e1-4746-9992-03f6e8fac6bf.png",
        specialty: "Balayage & Color" 
      },
      { 
        title: "Heritage Barber Co", 
        location: "Austin, TX",
        rating: 4.8,
        image: "/lovable-uploads/1bc30225-0249-44a2-8086-c0a8ecbd57c2.png",
        specialty: "Classic & Modern Cuts" 
      },
      { 
        title: "Crown & Glory Hair", 
        location: "Atlanta, GA",
        rating: 4.9,
        image: "/lovable-uploads/5f8eaed6-4a17-4992-a270-6394aad0f43b.png",
        specialty: "Extensions & Styling" 
      },
      { 
        title: "Platinum Fades", 
        location: "Philadelphia, PA",
        rating: 4.7, 
        image: "/lovable-uploads/1f3cfd40-4041-4545-b71e-5a7f484f86e9.png",
        specialty: "Precision Fades" 
      }
    ]
  },
  {
    name: "Tattoo",
    ads: [
      { 
        title: "Ink & Honor Studio", 
        location: "Seattle, WA",
        rating: 5.0,
        image: "/lovable-uploads/513e8703-1059-4ed5-aef3-9f9b4536b69d.png",
        specialty: "Custom Designs" 
      },
      { 
        title: "Sacred Art Tattoo", 
        location: "Denver, CO",
        rating: 4.9,
        image: "/lovable-uploads/b8dd2904-7dc6-412d-89be-c962ca4ae5f8.png",
        specialty: "Traditional & Neo" 
      },
      { 
        title: "Black Lotus Ink", 
        location: "Phoenix, AZ",
        rating: 4.8,
        image: "/lovable-uploads/f7491bd3-25bf-43f9-80e2-d53b137a70d7.png",
        specialty: "Japanese Style" 
      },
      { 
        title: "Electric Needle", 
        location: "Las Vegas, NV",
        rating: 4.9,
        image: "/lovable-uploads/b2498739-4d20-4b75-8fc1-9f740ec1e4cc.png",
        specialty: "Fine Line & Micro" 
      },
      { 
        title: "Timeless Marks", 
        location: "Portland, OR",
        rating: 4.8,
        image: "/lovable-uploads/f6bb9656-c400-4f28-ba97-69d71c651a97.png",
        specialty: "Watercolor Tattoos" 
      }
    ]
  },
  {
    name: "Skincare & Spa",
    ads: [
      { 
        title: "Serenity Spa Collection", 
        location: "Miami, FL",
        rating: 5.0,
        image: "/lovable-uploads/c540558f-09db-483f-b844-bacb8824f789.png",
        specialty: "Luxury Facials" 
      },
      { 
        title: "Pure Radiance", 
        location: "San Diego, CA",
        rating: 4.9,
        image: "/lovable-uploads/ada4c504-75cf-45ce-a673-c81a22b9dbe3.png",
        specialty: "Anti-Aging" 
      },
      { 
        title: "Glow Therapy", 
        location: "Boston, MA",
        rating: 4.8,
        image: "/lovable-uploads/ca09b67d-f8b2-497c-bfd9-ac6ec0a491c7.png",
        specialty: "LED & Oxygen" 
      },
      { 
        title: "Eternal Beauty Spa", 
        location: "Houston, TX",
        rating: 4.7,
        image: "/lovable-uploads/72f0f6c8-5793-4750-993d-f250b495146d.png",
        specialty: "Deep Tissue" 
      },
      { 
        title: "Tranquil Touch", 
        location: "Seattle, WA",
        rating: 4.9,
        image: "/lovable-uploads/e4558475-4b40-4bb4-b3ae-7ade4595c1eb.png",
        specialty: "Hot Stone Massage" 
      }
    ]
  },
  {
    name: "Massage & Booth Rental",
    ads: [
      { 
        title: "The Massage Sanctuary", 
        location: "Santa Monica, CA",
        rating: 4.9, 
        image: "/lovable-uploads/f85b0984-587b-4ce1-bdc7-2bf357aa7695.png",
        specialty: "Swedish & Thai" 
      },
      { 
        title: "Luxe Salon Studios", 
        location: "Dallas, TX",
        rating: 5.0,
        image: "/lovable-uploads/3d3a731b-4560-4317-8dc7-93d933b82b10.png",
        specialty: "Premium Booths" 
      },
      { 
        title: "Therapeutic Haven", 
        location: "Chicago, IL",
        rating: 4.8,
        image: "/lovable-uploads/2951176b-68c9-45d6-8bc5-20513e72d0a3.png",
        specialty: "Sports Recovery" 
      },
      { 
        title: "Elite Salon Suites", 
        location: "Orlando, FL",
        rating: 4.9,
        image: "/lovable-uploads/6fdf0a39-d203-4f5a-90ba-808059c3ae5e.png",
        specialty: "Rental Spaces" 
      },
      { 
        title: "Healing Touch", 
        location: "Denver, CO",
        rating: 4.7,
        image: "/lovable-uploads/7dd3d7e2-dc6b-4d9a-9feb-9e3b023a9f28.png",
        specialty: "Aromatherapy" 
      }
    ]
  }
];

const BeautyExchangeLayout = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Beauty Exchange Categories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore listings across multiple beauty industry categories
          </p>
        </div>

        <div className="space-y-16">
          {categories.map((category, index) => (
            <div key={index} className="space-y-6">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-2xl font-serif font-semibold">{category.name}</h3>
                <Button variant="ghost" size="sm" className="text-primary flex items-center font-medium">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {category.ads.map((ad, cardIndex) => (
                  <Card 
                    key={cardIndex} 
                    className="overflow-hidden transition-all duration-300 hover:shadow-lg group"
                  >
                    {/* Image container with gradient overlay */}
                    <div className="relative h-48 overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-cover bg-center" 
                        style={{ backgroundImage: `url(${ad.image})` }}
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Rating badge */}
                      <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1 flex items-center gap-1 text-xs font-medium shadow-sm">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{ad.rating}</span>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <h4 className="font-medium text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">{ad.title}</h4>
                      
                      <div className="flex items-center text-gray-500 text-xs mb-2">
                        <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                        <span className="truncate">{ad.location}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="bg-gray-100 text-xs px-2 py-1 rounded-full text-gray-700">
                          {ad.specialty}
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeautyExchangeLayout;
