import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SalonTeamMember } from "./types";
import { Calendar, Copy, Check, DollarSign, Star, Trophy } from "lucide-react";
import { useTeamMemberStats } from "./hooks/useTeamMemberStats";
import { formatCurrency } from "@/lib/utils";
import { useArtistPromotions } from "./hooks/useArtistPromotions";
import { format } from "date-fns";
import { Progress } from "@/components/ui/progress";
import { useTeamMemberBadges } from "./hooks/useTeamMemberBadges";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface TeamMemberCardProps {
  member: SalonTeamMember;
}

export const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  const [showPromoteDialog, setShowPromoteDialog] = useState(false);
  const [showReferralCode, setShowReferralCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const { data: stats } = useTeamMemberStats(member.id);
  const { data: promotionStats } = useArtistPromotions(member.id);
  const { data: badges } = useTeamMemberBadges(member.id);

  const referralLink = `https://emvi.app/invite/${member.id.substring(0, 8)}`;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Elite':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Senior':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Pro':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleCopyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success('Referral link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const handlePromote = async () => {
    try {
      toast.success(`🎉 ${member.full_name} promoted to ${promotionStats?.nextLevel}!`);
      setShowPromoteDialog(false);
    } catch (error) {
      toast.error("Failed to promote team member");
    }
  };

  const renderBadges = () => {
    if (!badges) return null;

    return (
      <div className="flex flex-wrap gap-2 mt-3">
        {badges.map((badge) => {
          const badgeConfig = {
            top_performer: {
              label: "Top Performer",
              className: "bg-purple-100 text-purple-800 border-purple-200"
            },
            great_feedback: {
              label: "Great Feedback",
              className: "bg-green-100 text-green-800 border-green-200"
            },
            goal_crusher: {
              label: "Goal Crusher",
              className: "bg-blue-100 text-blue-800 border-blue-200"
            }
          }[badge.badge_type];

          if (!badgeConfig) return null;

          return (
            <Badge 
              key={badge.badge_type}
              variant="outline" 
              className={badgeConfig.className}
            >
              {badgeConfig.label}
            </Badge>
          );
        })}
      </div>
    );
  };

  const joinedDate = member.invitation_sent_at || member.joined_at;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={member.avatar_url || ''} alt={member.full_name} />
                <AvatarFallback>
                  {member.full_name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <h3 className="font-medium text-base">{member.full_name}</h3>
                {member.specialty && (
                  <p className="text-sm text-muted-foreground mb-2">{member.specialty}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    variant="outline" 
                    className={getStatusColor(member.status)}
                  >
                    {member.status === 'active' ? 'Available' : member.status === 'pending' ? 'Pending' : 'Off Today'}
                  </Badge>
                  {promotionStats?.currentLevel && (
                    <Badge 
                      variant="outline" 
                      className={getLevelColor(promotionStats.currentLevel)}
                    >
                      <Trophy className="h-3 w-3 mr-1" />
                      {promotionStats.currentLevel}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          {renderBadges()}

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Joined {format(new Date(joinedDate), 'MMM d, yyyy')}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Career Bookings</span>
                <span className="font-medium">{promotionStats?.totalBookings || 0}</span>
              </div>
              
              {promotionStats?.nextLevel && (
                <>
                  <Progress value={promotionStats.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {promotionStats.bookingsUntilNextLevel} bookings until {promotionStats.nextLevel}
                  </p>
                </>
              )}
            </div>

            {stats?.totalEarnings > 0 && (
              <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200">
                <DollarSign className="h-3 w-3 mr-1" />
                {formatCurrency(stats.totalEarnings)} this week
              </Badge>
            )}

            <div 
              className="mt-4 p-3 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={handleCopyReferralLink}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Referral Link</span>
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4 text-gray-400" />
                )}
              </div>
              <div className="text-xs text-gray-500 mt-1 truncate">
                {referralLink}
              </div>
            </div>

            {promotionStats?.nextLevel && promotionStats.progress >= 100 && (
              <button
                onClick={() => setShowPromoteDialog(true)}
                className="w-full mt-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <Star className="w-4 h-4 inline mr-1" />
                Promote to {promotionStats.nextLevel}
              </button>
            )}
          </div>
        </div>
      </CardContent>

      <AlertDialog open={showPromoteDialog} onOpenChange={setShowPromoteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Promote {member.full_name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This will promote {member.full_name} to {promotionStats?.nextLevel}. 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handlePromote}>
              Promote
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};
