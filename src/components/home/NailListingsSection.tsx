
import React from "react";
import { ArrowRight, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AuthAction from "@/components/common/AuthAction";
import ValidatedLink from "@/components/common/ValidatedLink";
import { nailSalonImages, cardDestinations } from "@/utils/beautyExchangeImages";

const NailListingsSection: React.FC = () => {
  return (
    <div className="py-2 px-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Nail Salons & Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {/* First row with original content */}
        {nailSalonImages.map((image, index) => (
          <AuthAction
            key={`nail-original-${index}`}
            onAction={() => true}
            fallbackContent={
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative">
                  <img
                    src={image}
                    alt={`Nail salon ${index + 1}`}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full flex items-center">
                    <Star className="h-3 w-3 mr-1" /> Featured
                  </div>
                </div>
                <CardContent className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium mb-1">Premium Nail Studio</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      Modern nail salon with premium services and experienced staff.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 w-full justify-between"
                  >
                    View Details <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            }
          >
            <ValidatedLink
              to={cardDestinations.nail[index].path}
              listingId={cardDestinations.nail[index].id}
              listingType={cardDestinations.nail[index].type as any}
              className="block h-full"
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative">
                  <img
                    src={image}
                    alt={`Nail salon ${index + 1}`}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full flex items-center">
                    <Star className="h-3 w-3 mr-1" /> Featured
                  </div>
                </div>
                <CardContent className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium mb-1">Premium Nail Studio</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      Modern nail salon with premium services and experienced staff.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 w-full justify-between"
                  >
                    View Details <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </ValidatedLink>
          </AuthAction>
        ))}
      </div>

      {/* Second row with Vietnamese salon listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Vietnamese Listing 1 */}
        <AuthAction
          onAction={() => true}
          fallbackContent={
            <Card className="overflow-hidden h-full flex flex-col">
              <div className="relative">
                <img
                  src={nailSalonImages[0]}
                  alt="Tiệm nail Dallas"
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full flex items-center">
                  <Star className="h-3 w-3 mr-1" /> Featured
                </div>
              </div>
              <CardContent className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-medium mb-1">💅 Cần sang tiệm nail ở Dallas, TX</h3>
                  <p className="text-sm text-primary font-semibold">$85,000</p>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    Tiệm rộng 1,600 sqft, 7 bàn, 5 ghế, full khách, khu Vietnamese.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 w-full justify-between"
                >
                  View Details <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          }
        >
          <ValidatedLink
            to="/salons/dallas-nail-salon"
            listingId="dallas-nail-salon"
            listingType="salon"
            className="block h-full"
          >
            <Card className="overflow-hidden h-full flex flex-col">
              <div className="relative">
                <img
                  src={nailSalonImages[0]}
                  alt="Tiệm nail Dallas"
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full flex items-center">
                  <Star className="h-3 w-3 mr-1" /> Featured
                </div>
              </div>
              <CardContent className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-medium mb-1">💅 Cần sang tiệm nail ở Dallas, TX</h3>
                  <p className="text-sm text-primary font-semibold">$85,000</p>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    Tiệm rộng 1,600 sqft, 7 bàn, 5 ghế, full khách, khu Vietnamese.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 w-full justify-between"
                >
                  View Details <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </ValidatedLink>
        </AuthAction>

        {/* Vietnamese Listing 2 */}
        <AuthAction
          onAction={() => true}
          fallbackContent={
            <Card className="overflow-hidden h-full flex flex-col">
              <div className="relative">
                <img
                  src={nailSalonImages[1]}
                  alt="Tiệm nail Houston"
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full flex items-center">
                  <Star className="h-3 w-3 mr-1" /> Featured
                </div>
              </div>
              <CardContent className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-medium mb-1">🏙 Sang tiệm gấp tại Houston</h3>
                  <p className="text-sm text-primary font-semibold">$75,000</p>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    Gần khu chợ Hồng Kông, 10 ghế, 6 bàn, rent $3,200/tháng.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 w-full justify-between"
                >
                  View Details <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          }
        >
          <ValidatedLink
            to="/salons/houston-nail-salon"
            listingId="houston-nail-salon"
            listingType="salon"
            className="block h-full"
          >
            <Card className="overflow-hidden h-full flex flex-col">
              <div className="relative">
                <img
                  src={nailSalonImages[1]}
                  alt="Tiệm nail Houston"
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full flex items-center">
                  <Star className="h-3 w-3 mr-1" /> Featured
                </div>
              </div>
              <CardContent className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-medium mb-1">🏙 Sang tiệm gấp tại Houston</h3>
                  <p className="text-sm text-primary font-semibold">$75,000</p>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    Gần khu chợ Hồng Kông, 10 ghế, 6 bàn, rent $3,200/tháng.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 w-full justify-between"
                >
                  View Details <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </ValidatedLink>
        </AuthAction>

        {/* Vietnamese Listing 3 */}
        <AuthAction
          onAction={() => true}
          fallbackContent={
            <Card className="overflow-hidden h-full flex flex-col">
              <div className="relative">
                <img
                  src={nailSalonImages[2]}
                  alt="Tiệm nail Florida"
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full flex items-center">
                  <Star className="h-3 w-3 mr-1" /> Featured
                </div>
              </div>
              <CardContent className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-medium mb-1">💼 Tiệm lớn ở Florida cần sang</h3>
                  <p className="text-sm text-primary font-semibold">$65,000</p>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    Có 12 ghế, 8 bàn, làm lâu năm, full set up, chủ muốn về VN.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 w-full justify-between"
                >
                  View Details <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          }
        >
          <ValidatedLink
            to="/salons/florida-nail-salon"
            listingId="florida-nail-salon"
            listingType="salon"
            className="block h-full"
          >
            <Card className="overflow-hidden h-full flex flex-col">
              <div className="relative">
                <img
                  src={nailSalonImages[2]}
                  alt="Tiệm nail Florida"
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full flex items-center">
                  <Star className="h-3 w-3 mr-1" /> Featured
                </div>
              </div>
              <CardContent className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-medium mb-1">💼 Tiệm lớn ở Florida cần sang</h3>
                  <p className="text-sm text-primary font-semibold">$65,000</p>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    Có 12 ghế, 8 bàn, làm lâu năm, full set up, chủ muốn về VN.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 w-full justify-between"
                >
                  View Details <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </ValidatedLink>
        </AuthAction>

        {/* Vietnamese Listing 4 */}
        <AuthAction
          onAction={() => true}
          fallbackContent={
            <Card className="overflow-hidden h-full flex flex-col">
              <div className="relative">
                <img
                  src={nailSalonImages[3]}
                  alt="Tiệm nail Los Angeles"
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full flex items-center">
                  <Star className="h-3 w-3 mr-1" /> Featured
                </div>
              </div>
              <CardContent className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-medium mb-1">🔥 Tiệm đẹp khu Los Angeles</h3>
                  <p className="text-sm text-primary font-semibold">$55,000</p>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    Trong plaza đông khách, income ổn định, máy lạnh mới, 5 ghế, 5 bàn.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 w-full justify-between"
                >
                  View Details <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          }
        >
          <ValidatedLink
            to="/salons/la-nail-salon"
            listingId="la-nail-salon"
            listingType="salon"
            className="block h-full"
          >
            <Card className="overflow-hidden h-full flex flex-col">
              <div className="relative">
                <img
                  src={nailSalonImages[3]}
                  alt="Tiệm nail Los Angeles"
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full flex items-center">
                  <Star className="h-3 w-3 mr-1" /> Featured
                </div>
              </div>
              <CardContent className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-medium mb-1">🔥 Tiệm đẹp khu Los Angeles</h3>
                  <p className="text-sm text-primary font-semibold">$55,000</p>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    Trong plaza đông khách, income ổn định, máy lạnh mới, 5 ghế, 5 bàn.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 w-full justify-between"
                >
                  View Details <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </ValidatedLink>
        </AuthAction>

        {/* Vietnamese Listing 5 */}
        <AuthAction
          onAction={() => true}
          fallbackContent={
            <Card className="overflow-hidden h-full flex flex-col">
              <div className="relative">
                <img
                  src={nailSalonImages[4]}
                  alt="Tiệm nail Atlanta"
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full flex items-center">
                  <Star className="h-3 w-3 mr-1" /> Featured
                </div>
              </div>
              <CardContent className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-medium mb-1">🌟 Tiệm nail sang trọng Atlanta, GA</h3>
                  <p className="text-sm text-primary font-semibold">$60,000</p>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    Chủ bận việc gia đình. Tiệm remodel 2023, giá sang có thương lượng.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 w-full justify-between"
                >
                  View Details <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          }
        >
          <ValidatedLink
            to="/salons/atlanta-nail-salon"
            listingId="atlanta-nail-salon"
            listingType="salon"
            className="block h-full"
          >
            <Card className="overflow-hidden h-full flex flex-col">
              <div className="relative">
                <img
                  src={nailSalonImages[4]}
                  alt="Tiệm nail Atlanta"
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full flex items-center">
                  <Star className="h-3 w-3 mr-1" /> Featured
                </div>
              </div>
              <CardContent className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-medium mb-1">🌟 Tiệm nail sang trọng Atlanta, GA</h3>
                  <p className="text-sm text-primary font-semibold">$60,000</p>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    Chủ bận việc gia đình. Tiệm remodel 2023, giá sang có thương lượng.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 w-full justify-between"
                >
                  View Details <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </ValidatedLink>
        </AuthAction>
      </div>
    </div>
  );
};

export default NailListingsSection;
