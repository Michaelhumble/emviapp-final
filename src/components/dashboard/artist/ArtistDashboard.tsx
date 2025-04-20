import { Card, CardContent } from '@/components/ui/card';
import { BookingWithDetails, DashboardStats } from './types/ArtistDashboardTypes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarDays, Clock, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import StatCard from './components/StatCard';
import { useArtistData } from './context/ArtistDataContext';
import ReferralWidget from './components/ReferralWidget';
import ArtistDashboardWidgets from './ArtistDashboardWidgets';
import ArtistAssignmentStats from "./widgets/ArtistAssignmentStats";
import { useAuth } from "@/context/auth";

export default function ArtistDashboard() {
  const { userProfile } = useAuth();

  return (
    <div>
      <ArtistDashboardWidgets />

      {userProfile?.role === "artist" && userProfile?.independent === false && (
        <ArtistAssignmentStats />
      )}
    </div>
  );
}
