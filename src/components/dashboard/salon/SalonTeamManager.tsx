import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Users, 
  Plus, 
  Mail, 
  MoreVertical, 
  Star, 
  Award, 
  MessageSquare,
  Edit3,
  Trash2,
  Crown,
  Heart,
  UserPlus
} from "lucide-react";
import { toast } from "sonner";

const SalonTeamManager = () => {
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [inviteForm, setInviteForm] = useState({
    name: "",
    email: "",
    role: "stylist"
  });
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: ""
  });

  // Mock team data - in real app, this would come from your backend
  const teamMembers = [
    {
      id: 1,
      name: "Maria Santos",
      role: "Senior Stylist",
      email: "maria@salon.com",
      avatar: "",
      rating: 4.9,
      specialties: ["Hair Color", "Balayage"],
      status: "active",
      isEmployeeOfMonth: true,
      joinedDate: "2023-01-15"
    },
    {
      id: 2,
      name: "Anna Chen",
      role: "Nail Technician",
      email: "anna@salon.com",
      avatar: "",
      rating: 4.8,
      specialties: ["Gel Nails", "Nail Art"],
      status: "active",
      isEmployeeOfMonth: false,
      joinedDate: "2023-03-20"
    },
    {
      id: 3,
      name: "Sophia Lee",
      role: "Esthetician",
      email: "sophia@salon.com",
      avatar: "",
      rating: 4.7,
      specialties: ["Facials", "Skincare"],
      status: "active",
      isEmployeeOfMonth: false,
      joinedDate: "2023-05-10"
    },
    {
      id: 4,
      name: "David Park",
      role: "Massage Therapist",
      email: "david@salon.com",
      avatar: "",
      rating: 4.9,
      specialties: ["Deep Tissue", "Relaxation"],
      status: "active",
      isEmployeeOfMonth: false,
      joinedDate: "2023-02-28"
    }
  ];

  const handleInviteMember = () => {
    // In real app, send invitation email
    toast.success(`Invitation sent to ${inviteForm.email}!`);
    setInviteForm({ name: "", email: "", role: "stylist" });
    setIsInviteDialogOpen(false);
  };

  const handleWriteReview = () => {
    // In real app, save review to backend
    toast.success(`Review submitted for ${selectedMember?.name}!`);
    setReviewForm({ rating: 5, comment: "" });
    setIsReviewDialogOpen(false);
    setSelectedMember(null);
  };

  const handleRemoveMember = (member: any) => {
    // In real app, remove member from backend
    toast.success(`${member.name} has been removed from the team.`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-playfair text-emvi-dark flex items-center gap-3">
            <Users className="h-8 w-8 text-purple-600" />
            Team & Recognition
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your team members, write reviews, and celebrate achievements
          </p>
        </div>
        
        <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Team Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite New Team Member</DialogTitle>
              <DialogDescription>
                Send an invitation to join your salon team
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={inviteForm.name}
                  onChange={(e) => setInviteForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter team member's name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  value={inviteForm.role}
                  onChange={(e) => setInviteForm(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="stylist">Hair Stylist</option>
                  <option value="nail-tech">Nail Technician</option>
                  <option value="esthetician">Esthetician</option>
                  <option value="massage-therapist">Massage Therapist</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
              <Button onClick={handleInviteMember} className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Send Invitation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Team Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Team</p>
                <p className="text-2xl font-bold text-blue-800">{teamMembers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500 rounded-lg">
                <Star className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-yellow-600 font-medium">Avg Rating</p>
                <p className="text-2xl font-bold text-yellow-800">4.8</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-600 font-medium">This Month</p>
                <p className="text-2xl font-bold text-green-800">92%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500 rounded-lg">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-purple-600 font-medium">Reviews</p>
                <p className="text-2xl font-bold text-purple-800">15</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Team Members */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Members
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <motion.div
                  key={member.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white font-bold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {member.isEmployeeOfMonth && (
                        <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1">
                          <Crown className="h-3 w-3 text-yellow-800" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{member.name}</h3>
                        {member.isEmployeeOfMonth && (
                          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                            Employee of the Month
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{member.role}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{member.rating}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {member.specialties.join(', ')}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedMember(member);
                        setIsReviewDialogOpen(true);
                      }}
                      className="text-purple-600 border-purple-200 hover:bg-purple-50"
                    >
                      <Heart className="h-4 w-4 mr-1" />
                      Write Review
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit3 className="h-4 w-4 mr-2" />
                          Edit Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleRemoveMember(member)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Write Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Write Review for {selectedMember?.name}</DialogTitle>
            <DialogDescription>
              Share your feedback about this team member's performance
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Rating</Label>
              <div className="flex items-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                    className="p-1"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= reviewForm.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="comment">Review Comment</Label>
              <Textarea
                id="comment"
                value={reviewForm.comment}
                onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                placeholder="Write your review here..."
                rows={4}
              />
            </div>
            <Button onClick={handleWriteReview} className="w-full">
              <Heart className="h-4 w-4 mr-2" />
              Submit Review
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default SalonTeamManager;