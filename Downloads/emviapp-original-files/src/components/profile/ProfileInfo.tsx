
import { User } from "../../types/user";
import { UserCircle, MapPin, Briefcase, Globe, Instagram } from "lucide-react";

interface ProfileInfoProps {
  profile: User;
}

const ProfileInfo = ({ profile }: ProfileInfoProps) => {
  return (
    <div className="md:flex">
      {/* Avatar Section */}
      <div className="md:w-1/3 bg-gray-900 p-6 flex flex-col items-center justify-start">
        <div className="relative">
          {profile.avatar_url ? (
            <img 
              src={profile.avatar_url} 
              alt={profile.full_name || "User"} 
              className="w-32 h-32 rounded-full object-cover border-4 border-purple-500"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center">
              <UserCircle size={64} className="text-gray-400" />
            </div>
          )}
        </div>
        
        <h2 className="text-xl font-bold mt-4 text-center">{profile.full_name || "User"}</h2>
        
        <div className="mt-6 w-full space-y-3">
          {profile.role && (
            <div className="text-sm text-purple-300 bg-purple-900/30 py-1 px-3 rounded-full text-center">
              {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
            </div>
          )}

          {profile.specialty && (
            <div className="flex items-center text-gray-300">
              <Briefcase size={16} className="mr-2 text-purple-400" />
              <span>{profile.specialty}</span>
            </div>
          )}

          {profile.location && (
            <div className="flex items-center text-gray-300">
              <MapPin size={16} className="mr-2 text-purple-400" />
              <span>{profile.location}</span>
            </div>
          )}
        </div>
        
        <div className="mt-6 w-full space-y-3">
          {profile.instagram && (
            <a 
              href={`https://instagram.com/${profile.instagram.replace('@', '')}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-purple-300 hover:text-purple-200 transition"
            >
              <Instagram size={16} className="mr-2" />
              <span>{profile.instagram}</span>
            </a>
          )}
          
          {profile.website && (
            <a 
              href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-purple-300 hover:text-purple-200 transition"
            >
              <Globe size={16} className="mr-2" />
              <span className="truncate">{profile.website}</span>
            </a>
          )}
        </div>
      </div>
      
      {/* Details Section */}
      <div className="md:w-2/3 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-purple-300">About</h3>
          {profile.bio ? (
            <p className="text-gray-300 whitespace-pre-wrap">{profile.bio}</p>
          ) : (
            <p className="text-gray-400 italic">No bio provided</p>
          )}
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-purple-300">Contact Information</h3>
          <div className="space-y-2">
            <div className="flex flex-col">
              <span className="text-gray-400 text-sm">Email</span>
              <span className="text-gray-200">{profile.email}</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-gray-400 text-sm">Phone</span>
              <span className="text-gray-200">{profile.phone || "Not provided"}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2 text-purple-300">Account Details</h3>
          <div className="space-y-2">
            <div className="flex flex-col">
              <span className="text-gray-400 text-sm">User ID</span>
              <span className="text-gray-400 text-xs break-all">{profile.id}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-400 text-sm">Account Created</span>
              <span className="text-gray-200">
                {profile.created_at 
                  ? new Date(profile.created_at).toLocaleDateString() 
                  : "Unknown"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
