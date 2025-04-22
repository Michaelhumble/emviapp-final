import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import ComingSoonModal from "@/components/common/ComingSoonModal";

// Mock service data
const SERVICES = [
  { id: 1, name: "Classic Manicure", price: 25 },
  { id: 2, name: "Haircut & Style", price: 50 },
  { id: 3, name: "Tattoo Design Consultation", price: 75 }
];

const cardGradient =
  "bg-gradient-to-br from-[#F1F0FB] via-[#E5DEFF]/50 to-white";

const ArtistManageServicesSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      className="w-full mt-4 xs:mt-6"
      aria-label="Manage My Services"
    >
      <ComingSoonModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        featureName="Add New Service"
      />
      <Card className={`${cardGradient} border-0 shadow-md rounded-2xl px-0 md:px-2 py-3 mb-3 xs:mb-6`}>
        <CardContent className="py-4 px-2 xs:px-3 sm:px-6 flex flex-col gap-2 md:gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 xs:gap-4 mb-3 xs:mb-4">
            <h2 className="font-playfair text-[1rem] xs:text-lg md:text-xl font-semibold text-gray-900 mb-0.5">
              Manage My Services
            </h2>
            <Button
              variant="outline"
              size="sm"
              className="border-[#9b87f5] text-[#9b87f5] font-medium rounded-lg hover:bg-[#E5DEFF] transition min-h-[38px] min-w-[120px] text-[15px]"
              tabIndex={-1}
              aria-label="Add New Service"
              onClick={() => setModalOpen(true)}
            >
              + Add New Service
            </Button>
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2 xs:gap-3">
            {SERVICES.map(service => (
              <div
                key={service.id}
                className="relative bg-white/90 rounded-xl border border-purple-50 shadow-sm flex flex-col justify-between transition hover:shadow-md px-3 py-3 xs:px-4 xs:py-4 min-h-[110px] sm:min-h-[128px]"
              >
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-serif text-base font-medium text-gray-700 line-clamp-1">
                      {service.name}
                    </span>
                    <span className="text-emvi-accent font-semibold ml-2 text-base">
                      ${service.price}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-2 xs:mt-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full hover:bg-purple-50"
                      aria-label="Edit service placeholder"
                      tabIndex={-1}
                    >
                      <Edit className="h-4 w-4 text-emvi-accent" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full hover:bg-red-50"
                      aria-label="Delete service placeholder"
                      tabIndex={-1}
                    >
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ArtistManageServicesSection;
