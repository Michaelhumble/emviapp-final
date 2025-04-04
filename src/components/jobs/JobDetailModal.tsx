
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Job } from "@/types/job";
import { formatDistanceToNow } from "date-fns";
import {
  MapPin,
  DollarSign,
  CalendarDays,
  Mail,
  Phone,
  ExternalLink,
  Home,
  Briefcase,
  Clock,
} from "lucide-react";

interface JobDetailModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

const JobDetailModal = ({ job, isOpen, onClose }: JobDetailModalProps) => {
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return "Date unavailable";
    }
  };

  const isSalonForSale = job.employment_type === "For Sale";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">
            {job.title}
          </DialogTitle>
          <DialogDescription className="flex items-center text-base">
            <span className="font-medium">{job.company}</span>
            <span className="mx-2">•</span>
            <MapPin className="h-4 w-4 mr-1" /> {job.location}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-2">
          {/* Image gallery if available */}
          {job.image && (
            <div className="rounded-md overflow-hidden">
              <img 
                src={job.image} 
                alt={job.title} 
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          {/* Main job details section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left column */}
            <div className="space-y-4">
              {/* Compensation */}
              <div className="flex items-start">
                <DollarSign className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <div>
                  <div className="font-medium">Compensation</div>
                  <div>
                    {isSalonForSale ? job.asking_price : job.salary_range}
                  </div>
                  {isSalonForSale && job.monthly_rent && (
                    <div className="text-gray-600 text-sm">
                      Monthly Rent: {job.monthly_rent}
                    </div>
                  )}
                </div>
              </div>

              {/* Employment Type */}
              <div className="flex items-start">
                <Briefcase className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <div>
                  <div className="font-medium">Type</div>
                  <div>{job.employment_type}</div>
                </div>
              </div>

              {/* Posted Date */}
              <div className="flex items-start">
                <CalendarDays className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <div>
                  <div className="font-medium">Posted</div>
                  <div>{formatDate(job.created_at)}</div>
                </div>
              </div>

              {isSalonForSale && (
                <>
                  {/* Salon Stations */}
                  {job.number_of_stations && (
                    <div className="flex items-start">
                      <div className="h-5 w-5 text-gray-500 mr-2 mt-0.5">💅</div>
                      <div>
                        <div className="font-medium">Stations</div>
                        <div>{job.number_of_stations} stations</div>
                      </div>
                    </div>
                  )}

                  {/* Square Feet */}
                  {job.square_feet && (
                    <div className="flex items-start">
                      <div className="h-5 w-5 text-gray-500 mr-2 mt-0.5">📏</div>
                      <div>
                        <div className="font-medium">Size</div>
                        <div>{job.square_feet} square feet</div>
                      </div>
                    </div>
                  )}

                  {/* Revenue */}
                  {job.revenue && (
                    <div className="flex items-start">
                      <div className="h-5 w-5 text-gray-500 mr-2 mt-0.5">📈</div>
                      <div>
                        <div className="font-medium">Revenue</div>
                        <div>{job.revenue}</div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Right column - Special features */}
            <div className="space-y-4">
              {/* For Vietnamese jobs */}
              {job.tip_range && (
                <div className="flex items-start">
                  <DollarSign className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <div className="font-medium">Tips</div>
                    <div>{job.tip_range}</div>
                  </div>
                </div>
              )}

              {/* Perks - for job listings */}
              {!isSalonForSale && (
                <div>
                  <div className="font-medium mb-2">Perks & Benefits</div>
                  <div className="flex flex-wrap gap-2">
                    {job.weekly_pay && (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                        Weekly Pay
                      </Badge>
                    )}
                    {job.owner_will_train && (
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                        Training Provided
                      </Badge>
                    )}
                    {job.has_housing && (
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                        <Home className="h-3 w-3 mr-1" /> Housing Available
                      </Badge>
                    )}
                    {job.no_supply_deduction && (
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                        No Supply Deduction
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Salon Features - for salon sales */}
              {isSalonForSale && job.salon_features && job.salon_features.length > 0 && (
                <div>
                  <div className="font-medium mb-2">Salon Features</div>
                  <div className="flex flex-wrap gap-2">
                    {job.salon_features.map((feature, index) => (
                      <Badge
                        key={index}
                        className="bg-blue-100 text-blue-800 hover:bg-blue-200"
                      >
                        {feature}
                      </Badge>
                    ))}
                    {job.has_wax_room && (
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                        Wax Room
                      </Badge>
                    )}
                    {job.has_laundry && (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                        Laundry
                      </Badge>
                    )}
                    {job.has_dining_room && (
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                        Dining Room
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Specialties */}
              {job.specialties && job.specialties.length > 0 && (
                <div>
                  <div className="font-medium mb-2">Specialties</div>
                  <div className="flex flex-wrap gap-2">
                    {job.specialties.map((specialty, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-gray-50"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Vietnamese description */}
          {job.vietnamese_description && (
            <div className="bg-blue-50 border border-blue-100 p-3 rounded-md">
              <p className="text-sm italic font-medium text-blue-900">
                {job.vietnamese_description}
              </p>
            </div>
          )}

          {/* English description */}
          <div>
            <h3 className="font-medium text-lg mb-2">Description</h3>
            <p className="text-gray-700 whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {/* Reason for selling - for salon sales */}
          {isSalonForSale && job.reason_for_selling && (
            <div>
              <h3 className="font-medium text-lg mb-2">Reason For Selling</h3>
              <p className="text-gray-700">{job.reason_for_selling}</p>
            </div>
          )}

          {/* Contact information */}
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="font-medium mb-3">Contact Information</h3>
            <div className="space-y-2">
              {job.contact_info?.owner_name && (
                <div className="flex items-center">
                  <div className="h-5 w-5 text-gray-500 mr-2">👤</div>
                  <span>{job.contact_info.owner_name}</span>
                </div>
              )}
              {job.contact_info?.phone && (
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-500 mr-2" />
                  <span>{job.contact_info.phone}</span>
                </div>
              )}
              {job.contact_info?.email && (
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-500 mr-2" />
                  <span>{job.contact_info.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0 flex-wrap">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            onClick={() => {
              if (job.contact_info?.email) {
                window.location.href = `mailto:${job.contact_info.email}?subject=Regarding ${encodeURIComponent(
                  job.title
                )}`;
              }
            }}
          >
            {isSalonForSale ? "Contact Seller" : "Apply Now"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailModal;
