"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/lib/authContext';
import { ApiError } from '@/lib/apiClient';
import { AnimatePresence, motion } from 'framer-motion';
import { FaEye, FaEyeSlash, FaArrowRight } from 'react-icons/fa';

export default function LoginPage() {
  const router = useRouter();
  const { login, register } = useAuth();

  const [isLogin, setIsLogin]     = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg]   = useState('');
  const [showPwd, setShowPwd]     = useState(false);

  // Form fields
  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [mobile,   setMobile]   = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(name, email, password, mobile || undefined);
      }
      router.push('/portal/dashboard');
    } catch (err) {
      if (err instanceof ApiError) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin((v) => !v);
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-background flex">

      {/* ── Left panel — branding (hidden on mobile) ─────────── */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-center gap-10 p-12 relative overflow-hidden">
        {/* Subtle blob */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/10 blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-16 w-96 h-96 rounded-full bg-white/5  blur-[80px] pointer-events-none" />


        {/* Center quote */}
        <div className="relative z-10 flex flex-col gap-6">
          <blockquote className="text-2xl md:text-3xl font-bold text-white leading-snug">
            "Every top rank starts with the right mentor and the right system."
          </blockquote>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-white/80">YP Gurukul Institute</span>
            <span className="text-xs text-white/50">Est. 2010 · 10,000+ Students Placed</span>
          </div>
        </div>

        {/* Bottom stats */}
        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[
            { v: '500+',  l: 'JEE Selections' },
            { v: '850+',  l: 'NEET Qualifiers' },
            { v: '95%',   l: 'Success Rate'    },
          ].map((s) => (
            <div key={s.l} className="flex flex-col gap-1">
              <span className="text-2xl font-black text-white">{s.v}</span>
              <span className="text-[11px] text-white/60 font-medium">{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel — form ───────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 md:px-12">

        {/* Mobile logo */}
        <Link href="/" className="flex lg:hidden items-center gap-2 mb-10">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-border shrink-0">
            <Image src="/logo-icon.png" alt="YP Gurukul" fill className="object-cover" />
          </div>
          <span className="text-base font-black tracking-tight text-foreground">YP Gurukul</span>
        </Link>

        <div className="w-full max-w-md">

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-foreground mb-2">
              {isLogin ? 'Welcome back!' : 'Create your account'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isLogin
                ? 'Sign in to access your student portal and study materials.'
                : 'Register to get access to your courses, notes, and test series.'}
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex gap-1 p-1 rounded-lg bg-secondary border border-border mb-7">
            {[
              { label: 'Sign In',   mode: true  },
              { label: 'Register',  mode: false },
            ].map(({ label, mode }) => (
              <button
                key={label}
                type="button"
                onClick={() => { setIsLogin(mode); setErrorMsg(''); }}
                className={`flex-1 py-2 rounded-md text-sm font-semibold transition-colors ${
                  isLogin === mode
                    ? 'bg-background text-foreground shadow-sm border border-border'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Name — register only */}
            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  key="name-field"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-1.5 pb-1">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Full Name
                    </label>
                    <input
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required={!isLogin}
                      placeholder="Rahul Sharma"
                      className="px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring transition"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="rahul@example.com"
                autoComplete="email"
                className="px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring transition"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Password
                </label>
                {isLogin && (
                  <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  className="w-full px-3 py-2.5 pr-10 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPwd ? 'Hide password' : 'Show password'}
                >
                  {showPwd ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>
            </div>

            {/* Mobile — register only */}
            {!isLogin && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Phone Number <span className="text-muted-foreground/50 normal-case font-normal">(optional)</span>
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring transition"
                />
              </div>
            )}

            {/* Error */}
            {errorMsg && (
              <div className="px-4 py-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive font-medium">
                {errorMsg}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 disabled:opacity-50 transition-opacity mt-1"
            >
              {isLoading
                ? 'Please wait…'
                : isLogin ? 'Sign In' : 'Create Account'}
              {!isLoading && <FaArrowRight size={12} />}
            </button>
          </form>

          {/* Switch mode link */}
          <p className="text-sm text-center text-muted-foreground mt-6">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={switchMode}
              className="font-semibold text-primary hover:underline underline-offset-4"
            >
              {isLogin ? 'Register here' : 'Sign in'}
            </button>
          </p>

          {/* Back to site */}
          <p className="text-xs text-center text-muted-foreground mt-8">
            <Link href="/" className="hover:text-primary transition-colors">
              ← Back to YP Gurukul website
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}
