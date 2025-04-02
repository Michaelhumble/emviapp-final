
// src/pages/auth/SignUp.tsx
import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { processReferral } from "../../utils/referralUtils";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract referral code from URL when component loads
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const refCode = params.get("ref");
    if (refCode) {
      setReferralCode(refCode);
      console.log("Referral code detected:", refCode);
    }
  }, [location]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Sign up the user
      const { data, error: signUpError } = await supabase.auth.signUp({ 
        email, 
        password, 
        options: {
          data: {
            referred_by: referralCode // Store in user metadata for later processing
          }
        }
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      // If the sign-up was successful and we have a referral code
      if (data.user && referralCode) {
        // Process the referral (set the referred_by field and reward the referrer)
        await processReferral(referralCode, data.user.id);
      }

      // Navigate the user to the home page
      navigate("/");
      
    } catch (err) {
      console.error("Sign up error:", err);
      setError("An unexpected error occurred during sign up.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Card with shadow */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 p-8 md:p-10 animate-fade-in">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">Create Your Account</h2>
          
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}
          
          {/* Show referral info if there is a referral code */}
          {referralCode && (
            <div className="bg-purple-500/20 border border-purple-500/30 p-4 rounded-lg mb-6">
              <p className="text-sm text-purple-200">
                <span className="font-medium">You've been invited!</span> Sign up now to connect with your friend.
              </p>
            </div>
          )}
          
          <form onSubmit={handleSignUp} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-purple-100 mb-1">Email</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-400 focus:ring focus:ring-purple-500/20 focus:outline-none text-white transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-purple-100 mb-1">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-400 focus:ring focus:ring-purple-500/20 focus:outline-none text-white transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="mt-1 text-xs text-purple-300/70">Must be at least 6 characters</p>
            </div>
            
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg font-medium text-white hover:from-purple-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-purple-600/25 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : "Create Account"}
            </button>
            
            <div className="text-center mt-8">
              <p className="text-sm text-purple-100/80">
                Already have an account?{" "}
                <Link to="/signin" className="text-purple-300 hover:text-white font-medium transition-colors">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
