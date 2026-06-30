"use client";

import { useState } from "react";
import { HiOutlineEnvelope, HiOutlineLockClosed, HiOutlineUser, HiOutlineLightBulb, HiOutlineBookOpen, HiOutlineAcademicCap, HiOutlineCodeBracket } from "react-icons/hi2";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (isSignUp && name.trim()) {
        sessionStorage.setItem("cq_user_name", name.trim());
      } else if (!isSignUp && email.trim()) {
        const prefix = email.split("@")[0];
        sessionStorage.setItem("cq_user_name", prefix || "Student");
      }
      window.location.href = "/";
    }, 1200);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FDFBF7] p-6 font-[family-name:var(--font-poppins)]">
      
      {/* BACKGROUND ELEMENTS */}

      {/* 1. Large Blobs */}
      <div className="absolute -top-32 -right-32 h-[600px] w-[600px] rounded-full bg-[#F3EAD8] opacity-50 blur-3xl z-0" />
      <div className="absolute -bottom-48 -left-32 h-[700px] w-[700px] rounded-full bg-[#F3EAD8] opacity-60 blur-3xl z-0" />
      <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-[#EAE0CD] opacity-40 blur-2xl z-0 transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-[#EAE0CD] opacity-40 blur-2xl z-0 transform -translate-x-1/3 translate-y-1/3" />

      {/* 2. Dot Patterns */}
      <div className="absolute top-12 left-12 w-64 h-64 z-0 opacity-[0.15]" 
           style={{ backgroundImage: 'radial-gradient(#D5B991 2px, transparent 2px)', backgroundSize: '20px 20px' }} />
      <div className="absolute bottom-12 right-12 w-80 h-80 z-0 opacity-[0.15]" 
           style={{ backgroundImage: 'radial-gradient(#D5B991 2px, transparent 2px)', backgroundSize: '20px 20px' }} />

      {/* 3. Floating Icons */}
      <div className="absolute top-[20%] right-[25%] flex h-14 w-14 items-center justify-center rounded-full bg-white/70 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm z-0 animate-[bounce_4s_infinite_ease-in-out]">
        <HiOutlineBookOpen className="h-6 w-6 text-[#D5B991]" />
      </div>
      <div className="absolute top-[35%] left-[20%] flex h-14 w-14 items-center justify-center rounded-full bg-white/70 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm z-0 animate-[bounce_5s_infinite_ease-in-out]">
        <HiOutlineLightBulb className="h-6 w-6 text-[#D5B991]" />
      </div>
      <div className="absolute bottom-[45%] right-[15%] flex h-14 w-14 items-center justify-center rounded-full bg-white/70 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm z-0 animate-[bounce_6s_infinite_ease-in-out]">
        <HiOutlineAcademicCap className="h-6 w-6 text-[#D5B991]" />
      </div>
      <div className="absolute bottom-[15%] left-[25%] flex h-14 w-14 items-center justify-center rounded-full bg-white/70 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm z-0 animate-[bounce_4.5s_infinite_ease-in-out]">
        <HiOutlineCodeBracket className="h-6 w-6 text-[#D5B991]" />
      </div>

      {/* 4. Top Left Logo */}
      <div className="absolute top-10 left-10 flex items-center gap-3 z-10">
        <div className="text-3xl font-black text-[#D5B991]">
          {"</>"}
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold text-[#1A1A1A] leading-none">CodeQuest</span>
          <span className="text-xs font-medium text-[#1A1A1A]/50 mt-1">Learning Platform</span>
        </div>
      </div>

      {/* MAIN CARD CONTAINER */}
      <div className="relative z-10 w-full max-w-[420px] pt-12 transition-all duration-500 mb-16 mx-auto group hover:-translate-y-2">
        
        {/* Main Top Card */}
        <div className={`relative z-10 rounded-[32px] p-10 pt-12 shadow-[0_20px_50px_rgb(0,0,0,0.1)] group-hover:shadow-[0_40px_80px_rgb(0,0,0,0.5)] pb-12 border transition-all duration-500 ${
          !isSignUp 
            ? "bg-gradient-to-br from-[#FFFFFF] to-[#F8F6F0] border-[#1A1A1A]/5" 
            : "bg-gradient-to-br from-[#F2E8DA] to-[#DFCCB4] border-white/60"
        }`}>
          
          {/* Header */}
          <div className="flex items-center gap-5 mb-14">
            <div className={`h-16 w-16 rounded-2xl flex items-center justify-center shadow-lg transition-colors duration-500 ${
              !isSignUp
                ? "bg-gradient-to-br from-[#F2E8DA] to-[#DFCCB4] text-[#1A1A1A] shadow-black/5"
                : "bg-gradient-to-b from-[#1F1C18] to-[#12100E] text-[#FDFBF7]"
            }`}>
              {isSignUp ? <HiOutlineUser className="h-8 w-8" /> : <HiOutlineLockClosed className="h-8 w-8" />}
            </div>
            <div>
              <h2 className={`text-3xl font-bold leading-none mb-2 transition-colors duration-500 text-[#1A1A1A]`}>
                {isSignUp ? "Sign Up" : "Sign In"}
              </h2>
              <p className={`text-sm font-medium transition-colors duration-500 text-[#1A1A1A]/60`}>
                {isSignUp ? "Create a new account" : "Access your dashboard"}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} id="auth-form" className="space-y-8 mb-14">
            {isSignUp && (
              <div className={`flex items-center gap-5 border-b pb-4 transition-colors duration-500 text-[#1A1A1A] border-[#1A1A1A]/10 focus-within:border-[#1A1A1A]/30`}>
                <HiOutlineUser className="h-6 w-6 opacity-60" />
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name" 
                  className={`bg-transparent border-none outline-none text-base font-medium w-full transition-colors duration-500 placeholder-[#1A1A1A]/40`} 
                />
              </div>
            )}
            
            <div className={`flex items-center gap-5 border-b pb-4 transition-colors duration-500 text-[#1A1A1A] border-[#1A1A1A]/10 focus-within:border-[#1A1A1A]/30`}>
              <HiOutlineEnvelope className="h-6 w-6 opacity-60" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address" 
                className={`bg-transparent border-none outline-none text-base font-medium w-full transition-colors duration-500 placeholder-[#1A1A1A]/40`} 
              />
            </div>
            
            <div className={`flex items-center gap-5 border-b pb-4 transition-colors duration-500 text-[#1A1A1A] border-[#1A1A1A]/10 focus-within:border-[#1A1A1A]/30`}>
              <HiOutlineLockClosed className="h-6 w-6 opacity-60" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isSignUp ? "Create password" : "Password"} 
                className={`bg-transparent border-none outline-none text-base font-medium w-full transition-colors duration-500 placeholder-[#1A1A1A]/40`} 
              />
            </div>

            {/* Inner Submit Button Area */}
            <div className={`flex items-center justify-between pt-6 mt-4 transition-colors duration-500`}>
              
              {/* Left Side: Secondary Text/Links */}
              <div>
                {!isSignUp ? (
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-sm font-bold text-[#1A1A1A]">Welcome back</span>
                    <button type="button" className="text-[11px] font-bold text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:underline transition-colors">
                      Forgot Password?
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-sm font-bold text-[#FDFBF7]">Free Account</span>
                    <span className="text-[11px] font-bold text-[#FDFBF7]/60">Student Tier Plan</span>
                  </div>
                )}
              </div>

              {/* Right Side: Primary Action Button */}
              <button 
                type="submit" 
                disabled={isLoading}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-transform hover:scale-105 disabled:opacity-80 duration-500 ${
                  !isSignUp 
                    ? "bg-[#1A1A1A] text-[#FDFBF7]" 
                    : "bg-[#1F1C18] text-[#F2E8DA]"
                }`}
              >
                {isLoading ? "Please wait..." : isSignUp ? "Register" : "Login"}
              </button>

            </div>
          </form>
        </div>

        {/* Underlapping Toggle Button */}
        <button 
          type="button" 
          onClick={() => setIsSignUp(!isSignUp)}
          className={`absolute -bottom-16 left-0 right-0 z-0 h-36 rounded-b-[32px] shadow-2xl flex items-end justify-center pb-6 text-base font-bold transition-all duration-500 hover:translate-y-1 ${
            !isSignUp
              ? "bg-gradient-to-br from-[#F2E8DA] to-[#DFCCB4] text-[#1A1A1A]"
              : "bg-gradient-to-b from-[#2A2A2A] to-[#181818] text-[#FDFBF7]"
          }`}
        >
          {isSignUp ? (
            <span>Already have an account? <span className="text-[#D5B991]">Sign In</span></span>
          ) : (
            <span>Need an account? <span className="text-white">Sign Up</span></span>
          )}
        </button>
      </div>

    </div>
  );
}
