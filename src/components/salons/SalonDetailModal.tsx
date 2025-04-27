import React from 'react';
import { Job } from "@/types/salon";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, MapPin, DollarSign, Phone, Mail, Link as LinkIcon } from "lucide-react";

interface SalonDetailModalProps {
  salon: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

const SalonDetailModal = ({ salon, isOpen, onClose }: SalonDetailModalProps) => {
  if (!salon) return null;

  const { t, isVietnamese } = useTranslation();
  
  const isExpired = false; // This would be determined by checking dates in a real implementation
  
  const handleAction = () => {
    console.log("Auth action triggered");
    return true;
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">{salon.company}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div 
              className="h-64 rounded-md bg-center bg-cover"
              style={{ backgroundImage: `url(${salon.image || ''})` }}
            ></div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium mb-2">
                {isVietnamese ? "Chi Tiết Tiệm" : "Salon Details"}
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{salon.location}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{isVietnamese ? "Giá:" : "Asking:"} {salon.asking_price}</span>
                </div>
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{isVietnamese ? "Tiền thuê:" : "Rent:"} {salon.monthly_rent}</span>
                </div>
                <div className="flex items-center">
                  <Ruler className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{salon.square_feet} sqft</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{salon.number_of_stations} {isVietnamese ? "bàn" : "stations"}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{isVietnamese ? "Doanh thu:" : "Rev:"} {salon.revenue}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">{isVietnamese ? "Mô Tả" : "Description"}</h3>
              {salon.vietnamese_description && (
                <div className={`${isVietnamese ? "" : "italic"} text-gray-700 mb-2`}>
                  {salon.vietnamese_description}
                </div>
              )}
              <div className={`text-gray-600 ${salon.vietnamese_description && !isVietnamese ? "mt-2 pt-2 border-t border-gray-100" : ""}`}>
                {salon.description}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-2">{isVietnamese ? "Đặc Điểm" : "Features"}</h3>
              <div className="flex flex-wrap gap-2">
                {salon.salon_features?.map((feature, index) => (
                  <Badge key={index} variant="outline" className="bg-purple-50">
                    {feature}
                  </Badge>
                ))}
                
                {salon.has_housing && (
                  <Badge variant="outline" className="bg-green-50 text-green-800">
                    <Home className="w-3 h-3 mr-1" />
                    {isVietnamese ? "Có nhà ở" : "Housing Available"}
                  </Badge>
                )}
                
                {salon.has_wax_room && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-800">
                    <Check className="w-3 h-3 mr-1" />
                    {isVietnamese ? "Phòng Wax" : "Wax Room"}
                  </Badge>
                )}
                
                {salon.has_dining_room && (
                  <Badge variant="outline" className="bg-amber-50 text-amber-800">
                    <Check className="w-3 h-3 mr-1" />
                    {isVietnamese ? "Phòng Ăn" : "Dining Room"}
                  </Badge>
                )}
                
                {salon.has_laundry && (
                  <Badge variant="outline" className="bg-indigo-50 text-indigo-800">
                    <Check className="w-3 h-3 mr-1" />
                    {isVietnamese ? "Máy Giặt/Sấy" : "Washer/Dryer"}
                  </Badge>
                )}
                
                {salon.owner_will_train && (
                  <Badge variant="outline" className="bg-cyan-50 text-cyan-800">
                    <Check className="w-3 h-3 mr-1" />
                    {isVietnamese ? "Chủ Sẽ Đào Tạo" : "Owner Will Train"}
                  </Badge>
                )}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-2">
                {isVietnamese ? "Lý Do Bán" : "Reason For Selling"}
              </h3>
              <div className="flex items-center">
                <Info className="w-4 h-4 mr-2 text-gray-500" />
                <span>{salon.reason_for_selling || (isVietnamese ? "Không xác định" : "Not specified")}</span>
              </div>
            </div>
            
            <Separator />
            
            {!isExpired && (
              <div>
                <h3 className="font-medium mb-2">
                  {isVietnamese ? "Thông Tin Liên Hệ" : "Contact Information"}
                </h3>
                <AuthAction 
                  onAction={handleAction}
                  creditMessage={isVietnamese 
                    ? "Xem thông tin liên hệ đầy đủ miễn phí" 
                    : "View complete contact information for free"
                  }
                >
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex items-center justify-center mb-2 text-gray-500">
                      <Lock className="h-5 w-5 mr-2" />
                      <p className="text-sm font-medium">
                        {isVietnamese ? "Thông tin liên hệ bị ẩn" : "Contact info is hidden"}
                      </p>
                    </div>
                    <p className="text-xs text-center text-gray-500 mb-3">
                      {isVietnamese 
                        ? "Thông tin này được ẩn để bảo vệ cộng đồng của chúng tôi."
                        : "This information is hidden to protect our community."
                      }
                    </p>
                    <div className="flex justify-center">
                      <Link to="/auth/signup">
                        <Button size="sm" variant="outline">
                          {isVietnamese ? "Tạo Tài Khoản Miễn Phí" : "Create Free Account"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </AuthAction>
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter className="flex-col sm:flex-row sm:justify-between gap-4">
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            {isVietnamese ? "Đăng vào " : "Listed on "} {new Date().toLocaleDateString()}
          </div>
          
          <div className="flex gap-2">
            <DialogClose asChild>
              <Button variant="outline">
                {isVietnamese ? "Đóng" : "Close"}
              </Button>
            </DialogClose>
            {!isExpired && (
              <AuthAction
                onAction={handleAction}
                creditMessage={isVietnamese 
                  ? "Tạo tài khoản miễn phí để liên hệ chủ tiệm" 
                  : "Create a free account to contact the owner"
                }
              >
                <Button>
                  <Phone className="h-4 w-4 mr-2" />
                  {isVietnamese ? "Liên Hệ Chủ Tiệm" : "Contact Owner"}
                </Button>
              </AuthAction>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SalonDetailModal;
