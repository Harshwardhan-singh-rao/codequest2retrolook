"use client";

import { useState } from "react";
import Link from "next/link";
import { HiOutlineEnvelope, HiOutlineLockClosed, HiOutlineArrowRight } from "react-icons/hi2";
import { Button } from "@/components/ui/Button";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      if (email) {
        const prefix = email.split("@")[0];
        localStorage.setItem("cq_user_name", prefix);
      }
      window.location.href = "/"; // Navigate to dashboard after "creating account"
    }, 1200);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0b] py-12">
      {/* Abstract Background Elements */}
      <div className="absolute left-[20%] top-[20%] h-96 w-96 rounded-full bg-primary/20 blur-[128px]" />
      <div className="absolute bottom-[20%] right-[20%] h-96 w-96 rounded-full bg-accent/20 blur-[128px]" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-md p-6 sm:p-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-white shadow-lg shadow-primary/25">
              CQ
            </div>
            <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-white">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Enter your credentials to access your workspace.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <HiOutlineEnvelope className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="block w-full rounded-lg border border-white/10 bg-black/20 py-2.5 pl-10 pr-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-primary focus:bg-black/40 focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-300">Password</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <HiOutlineLockClosed className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full rounded-lg border border-white/10 bg-black/20 py-2.5 pl-10 pr-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-primary focus:bg-black/40 focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="group mt-6 w-full flex items-center justify-center bg-primary hover:bg-primary/90 py-2.5 text-sm font-bold shadow-lg shadow-primary/25 transition-all"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign In
                  <HiOutlineArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href="/login" className="font-semibold text-white hover:text-primary">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
