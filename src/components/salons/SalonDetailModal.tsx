
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Building, Ruler, Users, Home, Check, Info, Calendar, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import AuthAction from "@/components/common/AuthAction";
import { useTranslation } from "@/hooks/useTranslation";
import { Job, SalonListing } from "@/types/salon";

interface SalonDetailModalProps {
  salon: Job | SalonListing | null;
  isOpen: boolean;
  onClose: () => void;
}

const SalonDetailModal = ({ salon, isOpen, onClose }: SalonDetailModalProps) => {
  const { t, isVietnamese } = useTranslation();

  if (!salon) return null;

  const formatPrice = (price?: number | string) => {
    if (!price) return "Contact for price";
    
    // Handle string or number type
    const numericPrice = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.-]+/g, "")) : price;
    
    if (isNaN(numericPrice)) return "Contact for price";
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numericPrice);
  };

  // Helper method to safely access properties that might not exist on both types
  const safeGet = (key: string): any => {
    if (!salon) return null;
    return (salon as any)[key];
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{salon.name}</DialogTitle>
          <DialogDescription className="text-base text-primary/80">{salon.location}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          {/* Price and basic details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 opacity-70" /> 
              <span className="font-medium">{formatPrice(safeGet('price') || safeGet('monthly_rent'))}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Ruler className="h-4 w-4 opacity-70" /> 
              <span>{safeGet('squareFeet') || safeGet('square_feet')} sqft</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 opacity-70" /> 
              <span>{safeGet('chairs') || safeGet('number_of_stations')} Chairs/Stations</span>
            </div>
            
            {safeGet('revenue') && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Revenue: {formatPrice(safeGet('revenue'))}</span>
              </div>
            )}
          </div>
          
          {/* Salon description */}
          <div className="mt-4">
            <h4 className="font-medium mb-2">{isVietnamese ? 'Mô Tả' : 'Description'}</h4>
            <p className="text-gray-700 whitespace-pre-line">{salon.description}</p>
          </div>
          
          {salon.shortDescription && (
            <div className="text-sm text-gray-500 italic">
              "{salon.shortDescription}"
            </div>
          )}
          
          <Separator className="my-2" />
          
          {/* Property features */}
          <div className="grid grid-cols-2 gap-3">
            {salon.type && (
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2">{salon.type}</Badge>
                <span className="text-sm">{isVietnamese ? 'Loại Danh Sách' : 'Listing Type'}</span>
              </div>
            )}
            
            {salon.established && (
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2">Est. {salon.established}</Badge>
                <span className="text-sm">{isVietnamese ? 'Năm Thành Lập' : 'Established'}</span>
              </div>
            )}
            
            {safeGet('has_housing') && (
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2">
                  <Home className="h-3 w-3 mr-1" />
                  Housing
                </Badge>
                <span className="text-sm">{isVietnamese ? 'Có Chỗ Ở' : 'Housing Available'}</span>
              </div>
            )}
            
            {safeGet('has_wax_room') && (
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2">
                  <Check className="h-3 w-3 mr-1" />
                  Wax Room
                </Badge>
                <span className="text-sm">{isVietnamese ? 'Phòng Wax' : 'Wax Room'}</span>
              </div>
            )}
            
            {safeGet('has_dining_room') && (
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2">
                  <Check className="h-3 w-3 mr-1" />
                  Dining Area
                </Badge>
                <span className="text-sm">{isVietnamese ? 'Khu Vực Ăn Uống' : 'Dining Area'}</span>
              </div>
            )}
            
            {safeGet('has_laundry') && (
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2">
                  <Check className="h-3 w-3 mr-1" />
                  Laundry
                </Badge>
                <span className="text-sm">{isVietnamese ? 'Máy Giặt' : 'Laundry'}</span>
              </div>
            )}
            
            {safeGet('owner_will_train') && (
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2">
                  <Check className="h-3 w-3 mr-1" />
                  Training
                </Badge>
                <span className="text-sm">{isVietnamese ? 'Chủ Đào Tạo' : 'Owner Will Train'}</span>
              </div>
            )}
          </div>
          
          <Separator className="my-2" />
          
          {/* Reason for selling */}
          {safeGet('reason_for_selling') && (
            <div className="bg-muted/30 p-4 rounded-md">
              <div className="flex items-center mb-2">
                <Info className="h-4 w-4 mr-2" />
                <h4 className="font-medium">{isVietnamese ? 'Lý Do Bán' : 'Reason For Selling'}</h4>
              </div>
              <p className="text-sm">{safeGet('reason_for_selling')}</p>
            </div>
          )}
          
          <Separator className="my-2" />
          
          {/* Contact information - requires authentication */}
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <AuthAction
                onAction={() => Promise.resolve(true)}
                customTitle={isVietnamese ? 'Đăng ký để xem thông tin liên lạc' : 'Sign up to view contact details'}
              >
                <div className="flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  <h4 className="font-medium">{isVietnamese ? 'Thông Tin Liên Lạc' : 'Contact Information'}</h4>
                </div>
              </AuthAction>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">
              {isVietnamese 
                ? 'Đăng ký tài khoản miễn phí để xem thông tin liên lạc và liên hệ với chủ sở hữu.'
                : 'Sign up for a free account to view contact information and connect with the owner.'}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <AuthAction 
                onAction={() => Promise.resolve(true)}
                customTitle={isVietnamese ? 'Đăng ký tài khoản miễn phí' : 'Sign up for a free account'}
              >
                <Button variant="default" className="w-full">
                  <Link to="/auth/signup">
                    {isVietnamese ? 'Đăng Ký' : 'Sign Up'}
                  </Link>
                </Button>
              </AuthAction>
              
              <AuthAction
                onAction={() => Promise.resolve(true)}
                customTitle={isVietnamese ? 'Đăng nhập' : 'Log in'}
              >
                <Button variant="outline" className="w-full">
                  <Link to="/auth/login">
                    {isVietnamese ? 'Đăng Nhập' : 'Log In'}
                  </Link>
                </Button>
              </AuthAction>
            </div>
          </div>
          
        </div>
        
        <DialogFooter className="flex items-center justify-between">
          <div className="text-sm text-gray-500 flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {salon.created_at ? new Date(salon.created_at).toLocaleDateString() : 'Recently posted'}
          </div>
          
          <AuthAction
            onAction={() => Promise.resolve(true)}
            customTitle={isVietnamese ? 'Lưu danh sách này' : 'Save this listing'}
          >
            <Button variant="outline" size="sm">
              {isVietnamese ? 'Lưu Lại' : 'Save'}
            </Button>
          </AuthAction>
          
          <AuthAction
            onAction={() => Promise.resolve(true)}
            customTitle={isVietnamese ? 'Liên hệ chủ sở hữu' : 'Contact the owner'}
          >
            <Button size="sm">
              {isVietnamese ? 'Liên Hệ' : 'Contact'}
            </Button>
          </AuthAction>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SalonDetailModal;
