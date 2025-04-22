
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, CalendarDays } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const mockClients = [
  {
    id: 1,
    name: "Sophia L.",
    avatar: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=facearea&w=96&h=96",
    lastService: "Classic Manicure",
    lastAppointment: "April 10, 2025",
    clientSince: "2022-02-12"
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1501286353178-1ec881214838?auto=format&fit=facearea&w=96&h=96",
    lastService: "Tattoo Design",
    lastAppointment: "April 7, 2025",
    clientSince: "2021-11-28"
  },
  {
    id: 3,
    name: "Ava R.",
    avatar: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=facearea&w=96&h=96",
    lastService: "Haircut & Style",
    lastAppointment: "April 1, 2025",
    clientSince: "2023-04-08"
  },
  {
    id: 4,
    name: "Emma Williams",
    avatar: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=facearea&w=96&h=96",
    lastService: "Gel Extension",
    lastAppointment: "March 28, 2025",
    clientSince: "2020-06-23"
  },
  {
    id: 5,
    name: "Alex D.",
    avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=96&h=96",
    lastService: "Spa Pedicure",
    lastAppointment: "March 15, 2025",
    clientSince: "2022-09-15"
  }
];

const cardGradient = "bg-gradient-to-br from-[#F1F0FB] via-[#E5DEFF]/70 to-white";

function getClientSinceYear(date: string) {
  return new Date(date).getFullYear();
}

const ArtistClientsPreviewSection: React.FC = () => (
  <section className="w-full mt-0 sm:mt-2" aria-label="My Clients Preview">
    <Card className={`${cardGradient} border-0 shadow-md rounded-2xl px-0 md:px-2 py-4 mb-3`}>
      <CardContent className="py-3 px-2 xs:px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
          <h2 className="font-playfair text-[1rem] xs:text-lg md:text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Users className="h-5 w-5 text-emvi-accent" />
            My Clients
          </h2>
          <Link
            to="#"
            className="text-emvi-accent text-[13px] xs:text-sm font-medium hover:underline transition min-w-fit"
            tabIndex={-1}
          >
            View All Clients
          </Link>
        </div>
        <div>
          {mockClients.length > 0 ? (
            <Carousel
              opts={{ align: "start", dragFree: true, containScroll: "trimSnaps" }}
              className="w-full"
            >
              <CarouselContent className="flex gap-4">
                {mockClients.map((client) => (
                  <CarouselItem
                    key={client.id}
                    className="max-w-[240px] w-[84vw] xs:w-[55vw] sm:w-[240px] hover-scale"
                  >
                    <div className="bg-white/70 border border-purple-50 rounded-2xl shadow-sm px-5 py-6 flex flex-col items-center relative transition hover:shadow-lg">
                      {/* Avatar */}
                      <Avatar className="h-16 w-16 shadow ring-2 ring-purple-50 mb-3">
                        <AvatarImage
                          src={client.avatar}
                          alt={client.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-gradient-to-br from-purple-50 to-purple-200 text-purple-700 text-2xl">
                          {client.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      {/* Name */}
                      <span className="font-serif text-base font-medium text-gray-900 text-center truncate w-full">{client.name}</span>
                      {/* Last service */}
                      <div className="text-xs text-gray-500 truncate w-full text-center mt-1">{client.lastService}</div>
                      {/* Last appointment */}
                      <div className="flex items-center text-[12px] text-gray-400 mt-0.5 justify-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5 mr-1" />
                        <span className="truncate">{client.lastAppointment}</span>
                      </div>
                      {/* Client since tag */}
                      <div className="absolute top-3 right-4 bg-[#E5DEFF] text-[#7E69AB] text-[11px] px-2 py-0.5 rounded-full font-semibold shadow z-10">
                        Client Since {getClientSinceYear(client.clientSince)}
                      </div>
                      {/* Book Again button */}
                      <Button
                        size="sm"
                        className="w-full mt-4 bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] shadow text-white rounded-lg text-sm font-semibold font-serif px-0 py-2 hover:opacity-95"
                        variant="default"
                        type="button"
                        onClick={() => {
                          // Only mock, show UI feedback for user, no real booking logic
                          window?.showToast?.("Booking flow coming soon!");
                        }}
                      >
                        Book Again
                      </Button>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          ) : (
            <div className="text-center py-16">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-purple-50 rounded-full mb-4">
                <Users className="h-8 w-8 text-purple-200" />
              </div>
              <p className="text-lg font-playfair text-gray-400 mb-2">No clients yet.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  </section>
);

export default ArtistClientsPreviewSection;

