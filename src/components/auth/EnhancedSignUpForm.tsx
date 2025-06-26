
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import RoleSelectionCards from "./RoleSelectionCards";
import { useRoleSelection } from "@/hooks/useRoleSelection";
import { RoleSelectionModal } from "./RoleSelectionModal";

export const EnhancedSignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isRoleModalOpen, setIsRoleModalOpen, userId } = useRoleSelection();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("SignUp attempt:", { email, password });
  };

  return (
    <>
      <div style={{ 
        backgroundColor: '#FFB6C1', 
        color: '#8B0000', 
        padding: '8px', 
        marginBottom: '10px', 
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: '4px',
        border: '2px solid #FF69B4'
      }}>
        🌸 PROTECTED PREMIUM FORM: src/components/auth/EnhancedSignUpForm.tsx
      </div>

      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Join Our Beauty Community
          </CardTitle>
          <p className="text-gray-600">Create your account to get started</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center">Choose Your Role</h3>
            <RoleSelectionCards
              selectedRole="customer"
              onRoleSelect={() => {}}
            />
          </div>
        </CardContent>
      </Card>

      {userId && (
        <RoleSelectionModal
          isOpen={isRoleModalOpen}
          onClose={() => setIsRoleModalOpen(false)}
          onRoleSelect={() => {}}
          userId={userId}
        />
      )}
    </>
  );
};
