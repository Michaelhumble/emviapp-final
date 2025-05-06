import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import AuthAction from "@/components/common/AuthAction";
import ValidatedLink from "@/components/common/ValidatedLink";

const NailListingsSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-playfair text-center mb-8">
          Premium Nail Studios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* First row - English listings - Keep these unchanged */}
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative bg-gray-100">
              <img
                src="/lovable-uploads/4c3f751f-3631-43c1-b95d-c6521663f366.png"
                alt="Premium Nail Studio"
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-2 right-2 bg-pink-600">Featured</Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">Premium Nail Studio</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">Beverly Hills, CA</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <DollarSign className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">$1,800-$2,200/wk</span>
              </div>
              <AuthAction
                onAction={() => Promise.resolve(true)}
                redirectPath="/jobs/12345"
              >
                <ValidatedLink
                  to="/jobs/12345"
                  className="block"
                  listingId="12345"
                  listingType="job"
                >
                  <Button variant="outline" className="w-full">
                    View Job
                  </Button>
                </ValidatedLink>
              </AuthAction>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative bg-gray-100">
              <img
                src="/lovable-uploads/4c3f751f-3631-43c1-b95d-c6521663f366.png"
                alt="Premium Nail Studio"
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-2 right-2 bg-pink-600">Featured</Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">Premium Nail Studio</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">Manhattan, NY</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <DollarSign className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">$1,700-$2,100/wk</span>
              </div>
              <AuthAction
                onAction={() => Promise.resolve(true)}
                redirectPath="/jobs/12346"
              >
                <ValidatedLink
                  to="/jobs/12346"
                  className="block"
                  listingId="12346"
                  listingType="job"
                >
                  <Button variant="outline" className="w-full">
                    View Job
                  </Button>
                </ValidatedLink>
              </AuthAction>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative bg-gray-100">
              <img
                src="/lovable-uploads/4c3f751f-3631-43c1-b95d-c6521663f366.png"
                alt="Premium Nail Studio"
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-2 right-2 bg-pink-600">Featured</Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">Premium Nail Studio</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">Miami Beach, FL</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <DollarSign className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">$1,500-$1,900/wk</span>
              </div>
              <AuthAction
                onAction={() => Promise.resolve(true)}
                redirectPath="/jobs/12347"
              >
                <ValidatedLink
                  to="/jobs/12347"
                  className="block"
                  listingId="12347"
                  listingType="job"
                >
                  <Button variant="outline" className="w-full">
                    View Job
                  </Button>
                </ValidatedLink>
              </AuthAction>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative bg-gray-100">
              <img
                src="/lovable-uploads/4c3f751f-3631-43c1-b95d-c6521663f366.png"
                alt="Premium Nail Studio"
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-2 right-2 bg-pink-600">Featured</Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">Premium Nail Studio</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">Chicago, IL</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <DollarSign className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">$1,600-$2,000/wk</span>
              </div>
              <AuthAction
                onAction={() => Promise.resolve(true)}
                redirectPath="/jobs/12348"
              >
                <ValidatedLink
                  to="/jobs/12348"
                  className="block"
                  listingId="12348"
                  listingType="job"
                >
                  <Button variant="outline" className="w-full">
                    View Job
                  </Button>
                </ValidatedLink>
              </AuthAction>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative bg-gray-100">
              <img
                src="/lovable-uploads/4c3f751f-3631-43c1-b95d-c6521663f366.png"
                alt="Premium Nail Studio"
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-2 right-2 bg-pink-600">Featured</Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">Premium Nail Studio</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">Seattle, WA</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <DollarSign className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">$1,700-$2,100/wk</span>
              </div>
              <AuthAction
                onAction={() => Promise.resolve(true)}
                redirectPath="/jobs/12349"
              >
                <ValidatedLink
                  to="/jobs/12349"
                  className="block"
                  listingId="12349"
                  listingType="job"
                >
                  <Button variant="outline" className="w-full">
                    View Job
                  </Button>
                </ValidatedLink>
              </AuthAction>
            </CardContent>
          </Card>

          {/* Second row - Vietnamese job listings - UPDATED with new content */}
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative bg-gray-100">
              <img
                src="/lovable-uploads/4c3f751f-3631-43c1-b95d-c6521663f366.png"
                alt="Tìm Thợ Nails"
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-2 right-2 bg-pink-600">Featured</Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">Tìm Thợ Nails Tất Cả – Great Falls, MT</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">MAGIC NAILS cần thợ biết làm tất cả</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <DollarSign className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">$1,200–$1,500/tuần</span>
              </div>
              <AuthAction
                onAction={() => Promise.resolve(true)}
                redirectPath="/jobs/vn1001"
              >
                <ValidatedLink
                  to="/jobs/vn1001"
                  className="block"
                  listingId="vn1001"
                  listingType="job"
                >
                  <Button variant="outline" className="w-full">
                    View Job
                  </Button>
                </ValidatedLink>
              </AuthAction>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative bg-gray-100">
              <img
                src="/lovable-uploads/4c3f751f-3631-43c1-b95d-c6521663f366.png"
                alt="Cần Thợ Full Set"
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-2 right-2 bg-pink-600">Featured</Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">Cần Thợ Full Set Giỏi – Lương Cao</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">Khu LA, tiệm chuyên dip, gel, full set</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <DollarSign className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">$1,800–$2,200/tuần</span>
              </div>
              <AuthAction
                onAction={() => Promise.resolve(true)}
                redirectPath="/jobs/vn1002"
              >
                <ValidatedLink
                  to="/jobs/vn1002"
                  className="block"
                  listingId="vn1002"
                  listingType="job"
                >
                  <Button variant="outline" className="w-full">
                    View Job
                  </Button>
                </ValidatedLink>
              </AuthAction>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative bg-gray-100">
              <img
                src="/lovable-uploads/4c3f751f-3631-43c1-b95d-c6521663f366.png"
                alt="Cần Thợ Nail Bột"
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-2 right-2 bg-pink-600">Featured</Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">New Jersey – Cần Thợ Nail Bột</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">Ưu tiên biết làm design đơn giản</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <DollarSign className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">$1,600/tuần + tip cao</span>
              </div>
              <AuthAction
                onAction={() => Promise.resolve(true)}
                redirectPath="/jobs/vn1003"
              >
                <ValidatedLink
                  to="/jobs/vn1003"
                  className="block"
                  listingId="vn1003"
                  listingType="job"
                >
                  <Button variant="outline" className="w-full">
                    View Job
                  </Button>
                </ValidatedLink>
              </AuthAction>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative bg-gray-100">
              <img
                src="/lovable-uploads/4c3f751f-3631-43c1-b95d-c6521663f366.png"
                alt="Tuyển Gấp Thợ Tay Nước"
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-2 right-2 bg-pink-600">Featured</Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">Houston – Tuyển Gấp Thợ Tay Nước</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">Cần 1 thợ có tay nghề chân tay nước</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <DollarSign className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">Làm part-time hoặc full-time, lương tốt</span>
              </div>
              <AuthAction
                onAction={() => Promise.resolve(true)}
                redirectPath="/jobs/vn1004"
              >
                <ValidatedLink
                  to="/jobs/vn1004"
                  className="block"
                  listingId="vn1004"
                  listingType="job"
                >
                  <Button variant="outline" className="w-full">
                    View Job
                  </Button>
                </ValidatedLink>
              </AuthAction>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative bg-gray-100">
              <img
                src="/lovable-uploads/4c3f751f-3631-43c1-b95d-c6521663f366.png"
                alt="Thợ Nail Chính"
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-2 right-2 bg-pink-600">Featured</Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">Salon Chicago – Thợ Nail Chính</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">Tiệm lớn cần thợ chính tay nghề cao</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <DollarSign className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">$1,700–$2,000/tuần, khách đông</span>
              </div>
              <AuthAction
                onAction={() => Promise.resolve(true)}
                redirectPath="/jobs/vn1005"
              >
                <ValidatedLink
                  to="/jobs/vn1005"
                  className="block"
                  listingId="vn1005"
                  listingType="job"
                >
                  <Button variant="outline" className="w-full">
                    View Job
                  </Button>
                </ValidatedLink>
              </AuthAction>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default NailListingsSection;
