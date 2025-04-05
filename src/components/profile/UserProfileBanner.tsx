
import { useAuth } from "@/context/auth";

const UserProfileBanner = () => {
  const { userRole } = useAuth();
  
  // Choose role-specific gradient
  const getBannerGradient = () => {
    switch (userRole) {
      case 'artist':
      case 'nail technician/artist':
      case 'renter':
        return 'bg-gradient-to-r from-purple-600 to-pink-500';
      case 'salon':
      case 'owner':
        return 'bg-gradient-to-r from-blue-600 to-indigo-500';
      case 'supplier':
      case 'beauty supplier':
      case 'vendor':
        return 'bg-gradient-to-r from-emerald-600 to-teal-500';
      case 'freelancer':
        return 'bg-gradient-to-r from-amber-500 to-yellow-500';
      case 'customer':
        return 'bg-gradient-to-r from-rose-500 to-pink-500';
      default:
        return 'bg-gradient-to-r from-gray-700 to-slate-700';
    }
  };
  
  // Choose role-specific design pattern
  const getPatternClass = () => {
    switch (userRole) {
      case 'artist':
      case 'nail technician/artist':
      case 'renter':
        return 'pattern-dots pattern-white pattern-bg-transparent pattern-opacity-10 pattern-size-4';
      case 'salon':
      case 'owner':
        return 'pattern-zigzag pattern-white pattern-bg-transparent pattern-opacity-10 pattern-size-6';
      case 'supplier':
      case 'beauty supplier':
      case 'vendor':
        return 'pattern-grid pattern-white pattern-bg-transparent pattern-opacity-10 pattern-size-4';
      case 'freelancer':
        return 'pattern-diagonal-lines pattern-white pattern-bg-transparent pattern-opacity-10 pattern-size-6';
      case 'customer':
        return 'pattern-diagonal-stripes pattern-white pattern-bg-transparent pattern-opacity-10 pattern-size-6';
      default:
        return 'pattern-triangles pattern-white pattern-bg-transparent pattern-opacity-10 pattern-size-6';
    }
  };
  
  return (
    <div className={`h-64 ${getBannerGradient()} ${getPatternClass()} relative overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
      <div className="absolute inset-0 backdrop-blur-[1px]"></div>
      <div className="container mx-auto h-full flex items-end px-4">
        <div className="mb-16 z-10">
          <h1 className="text-white text-3xl md:text-4xl font-bold drop-shadow-md">
            Your Profile
          </h1>
          <p className="text-white/80 mt-2">
            Make a lasting impression across the beauty industry
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileBanner;
