
import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import AuthAction from "@/components/common/AuthAction";

const NailListingsSection = () => {
  const { isSignedIn } = useAuth();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Thợ Nail Jobs</h2>
      
      {/* First Row - Jobs with contact info hidden for non-signed-in users */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {/* Card 1 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src="/public/lovable-uploads/ac97ca70-1589-41f2-b35b-f17345583c7d.png" 
            alt="Nail Job" 
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <span className="bg-pink-100 text-pink-800 text-xs font-semibold px-2 py-1 rounded-full">★ FEATURED</span>
            <h3 className="text-lg font-semibold mt-2">Tìm Thợ Nails Magic Naiks – Great Falls, MT</h3>
            
            <p className="text-sm text-gray-600 mb-2 font-bold">
              💰 $1,200–$1,500/tuần
            </p>
            
            {isSignedIn ? (
              <p className="text-sm text-gray-600 mb-4">
                Magic Nails cần thợ biết làm bột và tay chân nước. 📍 Great Falls, MT. (406) 770-3070
              </p>
            ) : (
              <p className="text-sm text-gray-600 mb-4">
                Magic Nails cần thợ biết làm bột và tay chân nước. 📍 Great Falls, MT
                <br />
                <span className="text-pink-600 font-medium">🔒 Sign in to view contact info</span>
              </p>
            )}
            
            {isSignedIn ? (
              <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
                Xem Chi Tiết
              </Button>
            ) : (
              <AuthAction
                onAction={() => true}
                customTitle="View Contact Information"
              >
                <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
                  Xem Chi Tiết
                </Button>
              </AuthAction>
            )}
          </div>
          <div className="bg-gray-100 px-4 py-2">
            <p className="text-xs text-gray-600 font-medium">Nail</p>
          </div>
        </div>
        
        {/* Card 2 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src="/public/lovable-uploads/ac97ca70-1589-41f2-b35b-f17345583c7d.png" 
            alt="Nail Job" 
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <span className="bg-pink-100 text-pink-800 text-xs font-semibold px-2 py-1 rounded-full">★ FEATURED</span>
            <h3 className="text-lg font-semibold mt-2">Tuyển Thợ Nail – Clawson, MI</h3>
            
            <p className="text-sm text-gray-600 mb-2 font-bold">
              💰 $1,200–$1,800/tuần
            </p>
            
            {isSignedIn ? (
              <p className="text-sm text-gray-600 mb-4">
                Tiệm nhỏ, khu Mỹ trắng, tip hậu. Cần thợ làm bột, dip, gel-x. 📍 Clawson, MI. (248) 403-6472
              </p>
            ) : (
              <p className="text-sm text-gray-600 mb-4">
                Tiệm nhỏ, khu Mỹ trắng, tip hậu. Cần thợ làm bột, dip, gel-x. 📍 Clawson, MI
                <br />
                <span className="text-pink-600 font-medium">🔒 Sign in to view contact info</span>
              </p>
            )}
            
            {isSignedIn ? (
              <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
                Xem Chi Tiết
              </Button>
            ) : (
              <AuthAction
                onAction={() => true}
                customTitle="View Contact Information"
              >
                <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
                  Xem Chi Tiết
                </Button>
              </AuthAction>
            )}
          </div>
          <div className="bg-gray-100 px-4 py-2">
            <p className="text-xs text-gray-600 font-medium">Nail</p>
          </div>
        </div>
        
        {/* Card 3 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src="/public/lovable-uploads/ac97ca70-1589-41f2-b35b-f17345583c7d.png" 
            alt="Nail Job" 
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <span className="bg-pink-100 text-pink-800 text-xs font-semibold px-2 py-1 rounded-full">★ FEATURED</span>
            <h3 className="text-lg font-semibold mt-2">Thợ Nail Design – Humble, TX (Milano Nail Spa)</h3>
            
            <p className="text-sm text-gray-600 mb-2 font-bold">
              💰 {">"}$2,000/tuần
            </p>
            
            {isSignedIn ? (
              <p className="text-sm text-gray-600 mb-4">
                Tiệm lớn nhất khu vực, tuyển thợ bột design. Receptionist $150/ngày. 📍 Humble, TX. (346) 398-6868
              </p>
            ) : (
              <p className="text-sm text-gray-600 mb-4">
                Tiệm lớn nhất khu vực, tuyển thợ bột design. Receptionist $150/ngày. 📍 Humble, TX
                <br />
                <span className="text-pink-600 font-medium">🔒 Sign in to view contact info</span>
              </p>
            )}
            
            {isSignedIn ? (
              <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
                Xem Chi Tiết
              </Button>
            ) : (
              <AuthAction
                onAction={() => true}
                customTitle="View Contact Information"
              >
                <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
                  Xem Chi Tiết
                </Button>
              </AuthAction>
            )}
          </div>
          <div className="bg-gray-100 px-4 py-2">
            <p className="text-xs text-gray-600 font-medium">Nail</p>
          </div>
        </div>
        
        {/* Card 4 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src="/public/lovable-uploads/ac97ca70-1589-41f2-b35b-f17345583c7d.png" 
            alt="Nail Job" 
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <span className="bg-pink-100 text-pink-800 text-xs font-semibold px-2 py-1 rounded-full">★ FEATURED</span>
            <h3 className="text-lg font-semibold mt-2">Tuyển Thợ Nail – South Lake Tahoe, CA</h3>
            
            <p className="text-sm text-gray-600 mb-2 font-bold">
              💰 $1,600–$2,500+/tuần
            </p>
            
            {isSignedIn ? (
              <p className="text-sm text-gray-600 mb-4">
                Tiệm dễ thương, khách du lịch chịu chi. Ưu tiên biết tiếng Anh. 📍 South Lake Tahoe, CA. (916) 802-1922
              </p>
            ) : (
              <p className="text-sm text-gray-600 mb-4">
                Tiệm dễ thương, khách du lịch chịu chi. Ưu tiên biết tiếng Anh. 📍 South Lake Tahoe, CA
                <br />
                <span className="text-pink-600 font-medium">🔒 Sign in to view contact info</span>
              </p>
            )}
            
            {isSignedIn ? (
              <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
                Xem Chi Tiết
              </Button>
            ) : (
              <AuthAction
                onAction={() => true}
                customTitle="View Contact Information"
              >
                <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
                  Xem Chi Tiết
                </Button>
              </AuthAction>
            )}
          </div>
          <div className="bg-gray-100 px-4 py-2">
            <p className="text-xs text-gray-600 font-medium">Nail</p>
          </div>
        </div>
        
        {/* Card 5 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src="/public/lovable-uploads/ac97ca70-1589-41f2-b35b-f17345583c7d.png" 
            alt="Nail Job" 
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <span className="bg-pink-100 text-pink-800 text-xs font-semibold px-2 py-1 rounded-full">★ FEATURED</span>
            <h3 className="text-lg font-semibold mt-2">Cần Thợ Nail – Killeen, TX</h3>
            
            <p className="text-sm text-gray-600 mb-2 font-bold">
              💰 $1,500+/tuần
            </p>
            
            {isSignedIn ? (
              <p className="text-sm text-gray-600 mb-4">
                Tiệm lớn, giá cao, tip tốt. Gặp Johnny/Hannah. 📍 Killeen, TX. (512) 540-6173
              </p>
            ) : (
              <p className="text-sm text-gray-600 mb-4">
                Tiệm lớn, giá cao, tip tốt. Gặp Johnny/Hannah. 📍 Killeen, TX
                <br />
                <span className="text-pink-600 font-medium">🔒 Sign in to view contact info</span>
              </p>
            )}
            
            {isSignedIn ? (
              <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
                Xem Chi Tiết
              </Button>
            ) : (
              <AuthAction
                onAction={() => true}
                customTitle="View Contact Information"
              >
                <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
                  Xem Chi Tiết
                </Button>
              </AuthAction>
            )}
          </div>
          <div className="bg-gray-100 px-4 py-2">
            <p className="text-xs text-gray-600 font-medium">Nail</p>
          </div>
        </div>
      </div>
      
      {/* Second Row - Nail Studios (Kept exactly as is) */}
      <h2 className="text-2xl font-semibold mb-4">Nail Studios</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Studio Card 1 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src="/public/lovable-uploads/ac97ca70-1589-41f2-b35b-f17345583c7d.png" 
            alt="Nail Studio" 
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">PREMIUM</span>
            <h3 className="text-lg font-semibold mt-2">Elite Nails & Spa</h3>
            <p className="text-sm text-gray-600 mb-4">Luxury nail salon with full service offerings including manicures, pedicures, and nail art.</p>
            <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
              Xem Chi Tiết
            </Button>
          </div>
          <div className="bg-gray-100 px-4 py-2">
            <p className="text-xs text-gray-600 font-medium">Nail</p>
          </div>
        </div>
        
        {/* Studio Card 2 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src="/public/lovable-uploads/ac97ca70-1589-41f2-b35b-f17345583c7d.png" 
            alt="Nail Studio" 
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">PREMIUM</span>
            <h3 className="text-lg font-semibold mt-2">Pearl Nail Lounge</h3>
            <p className="text-sm text-gray-600 mb-4">Upscale nail salon specializing in organic products and custom nail designs.</p>
            <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
              Xem Chi Tiết
            </Button>
          </div>
          <div className="bg-gray-100 px-4 py-2">
            <p className="text-xs text-gray-600 font-medium">Nail</p>
          </div>
        </div>
        
        {/* Studio Card 3 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src="/public/lovable-uploads/ac97ca70-1589-41f2-b35b-f17345583c7d.png" 
            alt="Nail Studio" 
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">PREMIUM</span>
            <h3 className="text-lg font-semibold mt-2">Crystal Nail Bar</h3>
            <p className="text-sm text-gray-600 mb-4">Modern nail salon with a focus on nail health, creative designs, and excellent customer service.</p>
            <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
              Xem Chi Tiết
            </Button>
          </div>
          <div className="bg-gray-100 px-4 py-2">
            <p className="text-xs text-gray-600 font-medium">Nail</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NailListingsSection;
