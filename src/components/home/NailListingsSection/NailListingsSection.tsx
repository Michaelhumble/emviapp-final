import React from "react";
import { useAuth } from "@/context/auth";
import AuthAction from "@/components/common/AuthAction";
import { Button } from "@/components/ui/button";

const NailListingsSection = () => {
  const { isSignedIn } = useAuth();

  return (
    <section className="container mx-auto py-12">
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-3xl font-bold text-center mb-3">
          Tìm Việc Làm Nail Lương Cao
        </h2>
        <p className="text-lg text-center text-gray-600 max-w-3xl mb-8">
          Hàng trăm chủ tiệm đang cần thợ nail gấp.
          Tìm việc nhanh với mức lương và điều kiện tốt nhất.
        </p>
      </div>

      {/* First Row - Vietnamese Nail Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
        {/* Card 1 */}
        <div className="rounded-lg shadow-md overflow-hidden bg-white border border-gray-100 flex flex-col h-full">
          <div className="relative">
            <img
              src="/lovable-uploads/9e713225-1758-4c21-84d3-33e7707a2806.png"
              alt="Magic Nails"
              className="w-full h-40 object-cover"
            />
            <span className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold py-1 px-2 rounded">
              ★ FEATURED
            </span>
          </div>
          <div className="p-4 flex-grow">
            <h3 className="text-lg font-bold mb-1">
              Tìm Thợ Nails Magic Naiks– Great Falls, MT
            </h3>
            <p className="text-sm text-gray-600 mb-2 font-bold">
              💰 $1,200–$1,500/tuần
            </p>
            
            {isSignedIn ? (
              <p className="text-sm text-gray-600 mb-3">
                Magic Nails cần thợ biết làm bột và tay chân nước. Great Falls, MT. (406) 770-3070
              </p>
            ) : (
              <AuthAction
                onAction={() => true}
                customTitle="Xem thông tin liên hệ"
                fallbackContent={
                  <div className="mb-3">
                    <Button variant="outline" className="text-sm w-full">
                      Đăng nhập để xem thông tin
                    </Button>
                  </div>
                }
              >
                <p className="text-sm text-gray-600 mb-3">
                  Magic Nails cần thợ biết làm bột và tay chân nước. Great Falls, MT. (406) 770-3070
                </p>
              </AuthAction>
            )}
          </div>
          <div className="px-4 pb-4 mt-auto">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">Nail</span>
              <Button size="sm" variant="secondary">
                Xem Chi Tiết
              </Button>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="rounded-lg shadow-md overflow-hidden bg-white border border-gray-100 flex flex-col h-full">
          <div className="relative">
            <img
              src="/lovable-uploads/ec5e520a-440f-4a62-bee8-23ba0c7e7c4c.png"
              alt="Nail Salon"
              className="w-full h-40 object-cover"
            />
            <span className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold py-1 px-2 rounded">
              ★ FEATURED
            </span>
          </div>
          <div className="p-4 flex-grow">
            <h3 className="text-lg font-bold mb-1">
              Tuyển Thợ Nail – Clawson, MI
            </h3>
            <p className="text-sm text-gray-600 mb-2 font-bold">
              💰 $1,200–$1,800/tuần
            </p>
            
            {isSignedIn ? (
              <p className="text-sm text-gray-600 mb-3">
                Tiệm nhỏ, khu Mỹ trắng, tip hậu. Cần thợ làm bột, dip, gel-x. (248) 403-6472
              </p>
            ) : (
              <AuthAction
                onAction={() => true}
                customTitle="Xem thông tin liên hệ"
                fallbackContent={
                  <div className="mb-3">
                    <Button variant="outline" className="text-sm w-full">
                      Đăng nhập để xem thông tin
                    </Button>
                  </div>
                }
              >
                <p className="text-sm text-gray-600 mb-3">
                  Tiệm nhỏ, khu Mỹ trắng, tip hậu. Cần thợ làm bột, dip, gel-x. (248) 403-6472
                </p>
              </AuthAction>
            )}
          </div>
          <div className="px-4 pb-4 mt-auto">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">Nail</span>
              <Button size="sm" variant="secondary">
                Xem Chi Tiết
              </Button>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="rounded-lg shadow-md overflow-hidden bg-white border border-gray-100 flex flex-col h-full">
          <div className="relative">
            <img
              src="/lovable-uploads/e84078f4-339e-4231-b027-e8cd67c8e4ae.png"
              alt="Milano Nail Spa"
              className="w-full h-40 object-cover"
            />
            <span className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold py-1 px-2 rounded">
              ★ FEATURED
            </span>
          </div>
          <div className="p-4 flex-grow">
            <h3 className="text-lg font-bold mb-1">
              Thợ Nail Design – Humble, TX (Milano Nail Spa)
            </h3>
            <p className="text-sm text-gray-600 mb-2 font-bold">
              💰 {`>`}$2,000/tuần
            </p>
            
            {isSignedIn ? (
              <p className="text-sm text-gray-600 mb-3">
                Tiệm lớn nhất khu vực, tuyển thợ bột design. Receptionist $150/ngày. (346) 398-6868
              </p>
            ) : (
              <AuthAction
                onAction={() => true}
                customTitle="Xem thông tin liên hệ"
                fallbackContent={
                  <div className="mb-3">
                    <Button variant="outline" className="text-sm w-full">
                      Đăng nhập để xem thông tin
                    </Button>
                  </div>
                }
              >
                <p className="text-sm text-gray-600 mb-3">
                  Tiệm lớn nhất khu vực, tuyển thợ bột design. Receptionist $150/ngày. (346) 398-6868
                </p>
              </AuthAction>
            )}
          </div>
          <div className="px-4 pb-4 mt-auto">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">Nail</span>
              <Button size="sm" variant="secondary">
                Xem Chi Tiết
              </Button>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="rounded-lg shadow-md overflow-hidden bg-white border border-gray-100 flex flex-col h-full">
          <div className="relative">
            <img
              src="/lovable-uploads/fb41198f-fd0f-4562-8338-ee94ac01a8f8.png"
              alt="South Lake Tahoe"
              className="w-full h-40 object-cover"
            />
            <span className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold py-1 px-2 rounded">
              ★ FEATURED
            </span>
          </div>
          <div className="p-4 flex-grow">
            <h3 className="text-lg font-bold mb-1">
              Tuyển Thợ Nail – South Lake Tahoe, CA
            </h3>
            <p className="text-sm text-gray-600 mb-2 font-bold">
              💰 $1,600–$2,500+/tuần
            </p>
            
            {isSignedIn ? (
              <p className="text-sm text-gray-600 mb-3">
                Tiệm dễ thương, khách du lịch chịu chi. Ưu tiên biết tiếng Anh. (916) 802-1922
              </p>
            ) : (
              <AuthAction
                onAction={() => true}
                customTitle="Xem thông tin liên hệ"
                fallbackContent={
                  <div className="mb-3">
                    <Button variant="outline" className="text-sm w-full">
                      Đăng nhập để xem thông tin
                    </Button>
                  </div>
                }
              >
                <p className="text-sm text-gray-600 mb-3">
                  Tiệm dễ thương, khách du lịch chịu chi. Ưu tiên biết tiếng Anh. (916) 802-1922
                </p>
              </AuthAction>
            )}
          </div>
          <div className="px-4 pb-4 mt-auto">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">Nail</span>
              <Button size="sm" variant="secondary">
                Xem Chi Tiết
              </Button>
            </div>
          </div>
        </div>

        {/* Card 5 */}
        <div className="rounded-lg shadow-md overflow-hidden bg-white border border-gray-100 flex flex-col h-full">
          <div className="relative">
            <img
              src="/lovable-uploads/fb41198f-fd0f-4562-8338-ee94ac01a8f8.png" 
              alt="Killeen TX"
              className="w-full h-40 object-cover"
            />
            <span className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold py-1 px-2 rounded">
              ★ FEATURED
            </span>
          </div>
          <div className="p-4 flex-grow">
            <h3 className="text-lg font-bold mb-1">
              Cần Thợ Nail – Killeen, TX
            </h3>
            <p className="text-sm text-gray-600 mb-2 font-bold">
              💰 $1,500+/tuần
            </p>
            
            {isSignedIn ? (
              <p className="text-sm text-gray-600 mb-3">
                Tiệm lớn, giá cao, tip tốt. Gặp Johnny/Hannah: (512) 540-6173
              </p>
            ) : (
              <AuthAction
                onAction={() => true}
                customTitle="Xem thông tin liên hệ"
                fallbackContent={
                  <div className="mb-3">
                    <Button variant="outline" className="text-sm w-full">
                      Đăng nhập để xem thông tin
                    </Button>
                  </div>
                }
              >
                <p className="text-sm text-gray-600 mb-3">
                  Tiệm lớn, giá cao, tip tốt. Gặp Johnny/Hannah: (512) 540-6173
                </p>
              </AuthAction>
            )}
          </div>
          <div className="px-4 pb-4 mt-auto">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">Nail</span>
              <Button size="sm" variant="secondary">
                Xem Chi Tiết
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row - Nail Studio Listings (keep this section unchanged) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {/* Studio Card 1 */}
        <div className="rounded-lg shadow-md overflow-hidden bg-white border border-gray-100 flex flex-col h-full">
          <div className="relative">
            <img
              src="/lovable-uploads/ac97ca70-1589-41f2-b35b-f17345583c7d.png"
              alt="Diamond Nails"
              className="w-full h-40 object-cover"
            />
            <span className="absolute top-2 left-2 bg-emerald-500 text-white text-xs font-bold py-1 px-2 rounded">
              PREMIUM
            </span>
          </div>
          <div className="p-4 flex-grow">
            <h3 className="text-lg font-bold mb-1">Diamond Nails & Spa</h3>
            <p className="text-sm text-gray-600 mb-3">
              Tiệm sang trọng phục vụ khách cao cấp tại trung tâm thành phố
            </p>
          </div>
          <div className="px-4 pb-4 mt-auto">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">Nail Studio</span>
              <Button size="sm" variant="secondary">
                Xem Tiệm
              </Button>
            </div>
          </div>
        </div>

        {/* Studio Card 2 */}
        <div className="rounded-lg shadow-md overflow-hidden bg-white border border-gray-100 flex flex-col h-full">
          <div className="relative">
            <img
              src="/lovable-uploads/9f39ea95-e42c-4f4e-89a9-b44cb4e215e2.png"
              alt="Luxury Nails"
              className="w-full h-40 object-cover"
            />
            <span className="absolute top-2 left-2 bg-emerald-500 text-white text-xs font-bold py-1 px-2 rounded">
              PREMIUM
            </span>
          </div>
          <div className="p-4 flex-grow">
            <h3 className="text-lg font-bold mb-1">Luxury Nails Boutique</h3>
            <p className="text-sm text-gray-600 mb-3">
              Chuyên về nail nghệ thuật, gel-x, và các dịch vụ cao cấp
            </p>
          </div>
          <div className="px-4 pb-4 mt-auto">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">Nail Studio</span>
              <Button size="sm" variant="secondary">
                Xem Tiệm
              </Button>
            </div>
          </div>
        </div>

        {/* Studio Card 3 */}
        <div className="rounded-lg shadow-md overflow-hidden bg-white border border-gray-100 flex flex-col h-full">
          <div className="relative">
            <img
              src="/lovable-uploads/ca09b67d-f8b2-497c-bfd9-ac6ec0a491c7.png"
              alt="Elegant Nails"
              className="w-full h-40 object-cover"
            />
          </div>
          <div className="p-4 flex-grow">
            <h3 className="text-lg font-bold mb-1">Elegant Nails & Beauty</h3>
            <p className="text-sm text-gray-600 mb-3">
              Tiệm nail kết hợp spa, chăm sóc da và làm đẹp toàn diện
            </p>
          </div>
          <div className="px-4 pb-4 mt-auto">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">Nail Studio</span>
              <Button size="sm" variant="secondary">
                Xem Tiệm
              </Button>
            </div>
          </div>
        </div>

        {/* Studio Card 4 */}
        <div className="rounded-lg shadow-md overflow-hidden bg-white border border-gray-100 flex flex-col h-full">
          <div className="relative">
            <img
              src="/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png"
              alt="Crystal Nails"
              className="w-full h-40 object-cover"
            />
          </div>
          <div className="p-4 flex-grow">
            <h3 className="text-lg font-bold mb-1">Crystal Nails</h3>
            <p className="text-sm text-gray-600 mb-3">
              Tiệm nail sạch sẽ, giá cả phải chăng, phục vụ nhanh chóng
            </p>
          </div>
          <div className="px-4 pb-4 mt-auto">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">Nail Studio</span>
              <Button size="sm" variant="secondary">
                Xem Tiệm
              </Button>
            </div>
          </div>
        </div>

        {/* Studio Card 5 */}
        <div className="rounded-lg shadow-md overflow-hidden bg-white border border-gray-100 flex flex-col h-full">
          <div className="relative">
            <img
              src="/lovable-uploads/0bc39cbb-bdd3-4843-ace0-3cf730af576f.png"
              alt="Paradise Nails"
              className="w-full h-40 object-cover"
            />
          </div>
          <div className="p-4 flex-grow">
            <h3 className="text-lg font-bold mb-1">Paradise Nails</h3>
            <p className="text-sm text-gray-600 mb-3">
              Tiệm nail với môi trường thân thiện, dịch vụ đa dạng
            </p>
          </div>
          <div className="px-4 pb-4 mt-auto">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">Nail Studio</span>
              <Button size="sm" variant="secondary">
                Xem Tiệm
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Button className="px-8 py-6 text-lg">Xem Tất Cả Việc Làm Nail</Button>
      </div>
    </section>
  );
};

export default NailListingsSection;
