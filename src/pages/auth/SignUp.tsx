
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Mail, Lock, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import RoleSelectionCards from "@/components/auth/RoleSelectionCards";
import { useRoleSignUp } from "@/hooks/useRoleSignUp";

const SignUp = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    selectedRole,
    setSelectedRole,
    isSubmitting,
    error,
    handleSubmit
  } = useRoleSignUp();

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[85vh] p-4 bg-gradient-to-b from-white to-indigo-50/30">
        <div className="w-full max-w-3xl">
          <Card className="border shadow-xl overflow-hidden rounded-2xl">
            <form onSubmit={handleSubmit}>
              <CardHeader className="space-y-1 pb-6 border-b bg-indigo-50/50">
                <CardTitle className="text-3xl font-bold text-center text-indigo-900">
                  Create an Account
                </CardTitle>
                <CardDescription className="text-center text-indigo-700/70">
                  Tạo tài khoản miễn phí để bắt đầu hành trình làm đẹp của bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pl-10"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="pl-10"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <RoleSelectionCards 
                    selectedRole={selectedRole} 
                    onChange={setSelectedRole}
                  />
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4 pt-2 pb-6">
                <Button 
                  type="submit" 
                  className="w-full py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium text-base transition-all duration-200 shadow-md hover:shadow-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <UserCheck className="mr-2 h-5 w-5" />
                      Sign Up
                    </>
                  )}
                </Button>
                
                <div className="text-sm text-center text-gray-500 mt-4">
                  Already have an account?{" "}
                  <Link to="/auth/signin" className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline transition-colors">
                    Sign in
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
