// src/app/login/page.tsx
"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2, Triangle } from "lucide-react";

export default function LoginPage() {
  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Logged in successfully!");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      toast.success("Logged in with Google!");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "Google login failed");
    }
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center px-4 my-10">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-border bg-card p-8 shadow-sm md:p-10">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Triangle className="h-6 w-6 fill-foreground text-foreground" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">Log in to your TechGadget account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-foreground">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-foreground focus:outline-none transition-all" 
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-foreground focus:outline-none transition-all" 
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading} 
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Or continue with</span></div>
        </div>

        <button 
          onClick={handleGoogle} 
          type="button" 
          className="w-full rounded-full border border-border bg-background py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
        >
          Google
        </button>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-accent hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}