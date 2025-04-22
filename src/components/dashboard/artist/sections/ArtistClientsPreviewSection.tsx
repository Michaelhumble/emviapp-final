
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";

const mockClients = [
  {
    id: 1,
    name: "Sophia L.",
    lastAppointment: "April 10, 2025",
    avatar: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=facearea&w=96&h=96",
    lastService: "Classic Manicure"
  },
  {
    id: 2,
    name: "Michael Chen",
    lastAppointment: "April 7, 2025",
    avatar: "https://images.unsplash.com/photo-1501286353178-1ec881214838?auto=format&fit=facearea&w=96&h=96",
    lastService: "Tattoo Design"
  },
  {
    id: 3,
    name: "Ava R.",
    lastAppointment: "April 1, 2025",
    avatar: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=facearea&w=96&h=96",
    lastService: "Haircut & Style"
  },
  {
    id: 4,
    name: "Emma Williams",
    lastAppointment: "March 28, 2025",
    avatar: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=facearea&w=96&h=96",
    lastService: "Gel Extension"
  }
];

const cardGradient =
  "bg-gradient-to-br from-[#F1F0FB] via-[#E5DEFF]/70 to-white";

const ArtistClientsPreviewSection: React.FC = () => (
  <section className="w-full mt-0 sm:mt-2" aria-label="My Clients Preview">
    <Card className={`${cardGradient} border-0 shadow-md rounded-2xl px-0 md:px-2 py-3 mb-3`}>
      <CardContent className="py-4 px-2 xs:px-3 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
          <h2 className="font-playfair text-[1rem] xs:text-lg md:text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Users className="h-5 w-5 text-emvi-accent" />
            My Clients
          </h2>
          <Link
            to="#"
            className="text-emvi-accent text-[13px] xs:text-sm font-medium hover:underline transition"
            tabIndex={-1}
          >
            View All Clients
          </Link>
        </div>
        <ul className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-3">
          {mockClients.map((client) => (
            <li key={client.id}>
              <div className="flex items-center bg-white/90 rounded-xl border border-purple-50 shadow-sm px-2 xs:px-3 py-2 gap-2.5 hover:shadow-md transition">
                <Avatar className="h-10 w-10 xs:h-11 xs:w-11 border-2 border-white shadow">
                  <AvatarImage
                    src={client.avatar}
                    alt={client.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gradient-to-br from-purple-50 to-purple-200 text-purple-700">
                    {client.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="font-serif font-medium text-[15px] xs:text-base text-gray-800 truncate">
                    {client.name}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    Last: {client.lastService}
                  </div>
                  <div className="text-[10px] xs:text-[11px] text-gray-400">
                    {client.lastAppointment}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  </section>
);

export default ArtistClientsPreviewSection;
