"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FadeIn, SlideUp } from '@/components/animations/MotionUtils';
import { useAuth } from '@/lib/authContext';
import { ApiError } from '@/lib/apiClient';
import { AnimatePresence, motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const { login, register } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form field state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');

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
        setErrorMsg(err.message.toUpperCase());
      } else {
        setErrorMsg('SECURE_ACCESS_FAILURE. RE-ENTRY_REQUIRED.');
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
    <div className="bg-background min-h-screen relative overflow-hidden flex items-center justify-center pt-24">
      
      {/* Security Grid Backdrop */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="max-w-xl w-full px-12 z-10">
        
        {/* Terminal Header */}
        <div className="mb-24">
          <FadeIn>
            <div className="flex flex-col items-start leading-[0.8]">
              <span className="font-script text-4xl text-muted-foreground lowercase mb-8 block">the</span>
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter-editorial text-foreground mb-6">
                Access <br /> <span className="text-foreground/20">Guard</span>
              </h1>
              <p className="text-sm font-bold uppercase tracking-[0.4em] text-muted-foreground">
                {isLogin ? 'NODE_ID: SECURE_ENTRY_ACTIVE' : 'NODE_ID: ACCOUNT_REGISTRATION'}
              </p>
            </div>
          </FadeIn>
        </div>

        <SlideUp delay={0.1}>
          <div className="border border-border bg-muted/40 backdrop-blur-3xl p-12 md:p-16 relative overflow-hidden">
             
             {/* Security Scan Line */}
             <motion.div 
               animate={{ top: ['-10%', '110%'] }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="absolute left-0 right-0 h-px bg-foreground/10 blur-sm z-20 pointer-events-none"
             />

             <form onSubmit={handleSubmit} className="space-y-12">
               
               <AnimatePresence mode="wait">
                 {!isLogin && (
                   <motion.div 
                     key="name-field"
                     initial={{ height: 0, opacity: 0 }}
                     animate={{ height: 'auto', opacity: 1 }}
                     exit={{ height: 0, opacity: 0 }}
                     className="overflow-hidden"
                   >
                     <div className="flex flex-col group pb-4">
                        <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-foreground/30 group-focus-within:text-foreground transition-colors mb-4 italic">01. Identity_Name</label>
                        <input 
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required={!isLogin}
                          className="bg-transparent border-b border-border py-4 text-foreground font-black uppercase tracking-tighter focus:outline-none focus:border-foreground transition-all text-2xl"
                          placeholder="..."
                        />
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>

               <div className="flex flex-col group">
                  <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-foreground/30 group-focus-within:text-foreground transition-colors mb-4 italic">
                    {isLogin ? '01. Electronic_Channel' : '02. Electronic_Channel'}
                  </label>
                  <input 
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-transparent border-b border-border py-4 text-foreground font-black uppercase tracking-tighter focus:outline-none focus:border-foreground transition-all text-2xl"
                    placeholder="USER@ARCHIVE.SYS"
                  />
               </div>

               <div className="flex flex-col group">
                  <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-foreground/30 group-focus-within:text-foreground transition-colors mb-4 italic">
                    {isLogin ? '02. Security_Cipher' : '03. Security_Cipher'}
                  </label>
                  <input 
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-transparent border-b border-border py-4 text-foreground font-black uppercase tracking-tighter focus:outline-none focus:border-foreground transition-all text-2xl"
                    placeholder="••••••••"
                  />
               </div>

               {!isLogin && (
                  <div className="flex flex-col group">
                    <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-foreground/30 group-focus-within:text-foreground transition-colors mb-4 italic">04. Neural_Contact</label>
                    <input 
                      type="tel"
                      name="mobile"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="bg-transparent border-b border-border py-4 text-foreground font-black uppercase tracking-tighter focus:outline-none focus:border-foreground transition-all text-2xl"
                      placeholder="+91 (0) 000 000"
                    />
                  </div>
               )}

               {errorMsg && (
                 <div className="p-6 border border-destructive/20 bg-destructive/5 text-[10px] font-bold uppercase tracking-[0.3em] text-destructive">
                    ERR: {errorMsg}
                 </div>
               )}

               <div className="pt-8 space-y-8">
                 <button 
                   type="submit"
                   disabled={isLoading}
                   className="w-full py-8 bg-primary text-primary-foreground font-black uppercase tracking-[0.8em] text-[10px] hover:opacity-90 transition-opacity"
                 >
                   {isLoading ? 'PROCESSING...' : isLogin ? 'BYPASS_SECURITY' : 'REGISTER_NODE'}
                 </button>

                 <div className="flex flex-col items-center gap-4">
                    <button
                      type="button"
                      onClick={switchMode}
                      className="text-[9px] font-bold uppercase tracking-[0.4em] text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {isLogin ? '[ REQUEST_NEW_NODE ]' : '[ ACCESS_EXISTING_NODE ]'}
                    </button>
                 </div>
               </div>

             </form>
          </div>
        </SlideUp>

      </div>
    </div>
  );
}
