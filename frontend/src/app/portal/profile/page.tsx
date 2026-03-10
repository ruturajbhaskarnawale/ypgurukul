"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FadeIn, SlideUp } from '@/components/animations/MotionUtils';
import { Card, CardContent } from '@/components/global/Card';
import { Input } from '@/components/global/Input';
import { Button } from '@/components/global/Button';
import { apiClient, ApiError } from '@/lib/apiClient';
import { useAuth } from '@/lib/authContext';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  mobileNumber: string | null;
  studentProfile: {
    id: string;
    parentName: string | null;
    parentMobile: string | null;
  } | null;
}

const Skeleton = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse bg-muted rounded ${className}`} />
);

export default function ProfilePage() {
  const router = useRouter();
  const { user: authUser, isLoading: authLoading } = useAuth();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPw, setChangingPw] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [pwError, setPwError] = useState('');
  const [pwSuccess, setPwSuccess] = useState('');

  // Profile form state
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentMobile, setParentMobile] = useState('');

  // Password form state
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  useEffect(() => {
    if (!authLoading && !authUser) router.push('/login');
  }, [authUser, authLoading, router]);

  useEffect(() => {
    if (!authUser) return;
    const fetchProfile = async () => {
      try {
        const data = await apiClient.get<UserProfile>('/portal/me');
        setProfile(data);
        setName(data.name ?? '');
        setMobile(data.mobileNumber ?? '');
        setParentName(data.studentProfile?.parentName ?? '');
        setParentMobile(data.studentProfile?.parentMobile ?? '');
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) router.push('/login');
        else setErrorMsg('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [authUser, router]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    setSaving(true);
    try {
      await apiClient.patch('/portal/me', { name, mobileNumber: mobile, parentName, parentMobile });
      setSuccessMsg('Profile updated successfully!');
    } catch {
      setErrorMsg('Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError('');
    setPwSuccess('');
    if (newPw !== confirmPw) {
      setPwError('New passwords do not match.');
      return;
    }
    if (newPw.length < 6) {
      setPwError('New password must be at least 6 characters.');
      return;
    }
    setChangingPw(true);
    try {
      await apiClient.post('/portal/change-password', { currentPassword: currentPw, newPassword: newPw });
      setPwSuccess('Password changed successfully!');
      setCurrentPw('');
      setNewPw('');
      setConfirmPw('');
    } catch (err) {
      if (err instanceof ApiError) setPwError(err.message);
      else setPwError('Failed to change password.');
    } finally {
      setChangingPw(false);
    }
  };

  const initials = profile?.name?.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase() ?? '??';

  if (authLoading || loading) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto w-full">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-80" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto w-full">
      <FadeIn>
        <h1 className="text-3xl font-black uppercase tracking-tighter-editorial text-foreground mb-2">
          Profile Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account details and security preferences.
        </p>
      </FadeIn>

      <SlideUp>
        <Card className="border-border shadow-sm">
          <CardContent className="p-8">
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border">
              <div className="w-20 h-20 rounded-xl bg-primary flex justify-center items-center text-primary-foreground text-3xl font-black">
                {initials}
              </div>
              <div>
                <h2 className="text-xl font-black uppercase tracking-tighter text-foreground">{profile?.name}</h2>
                <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest">{profile?.email}</p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-muted-foreground mb-6">Personal Information</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                  <Input label="Email Address" type="email" value={profile?.email ?? ''} disabled />
                </div>
                <div className="mt-4">
                  <Input label="Student Mobile" type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                </div>
              </div>

              <div className="pt-8 border-t border-border">
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-muted-foreground mb-6">Guardian Details</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Parent/Guardian Name" value={parentName} onChange={(e) => setParentName(e.target.value)} />
                  <Input label="Parent/Guardian Mobile" type="tel" value={parentMobile} onChange={(e) => setParentMobile(e.target.value)} />
                </div>
              </div>

              {successMsg && (
                <div className="bg-secondary border border-border text-foreground text-[10px] font-black uppercase tracking-widest rounded-sm px-4 py-3">
                  [ success ] {successMsg}
                </div>
              )}
              {errorMsg && (
                <div className="bg-background border border-foreground text-foreground text-[10px] font-black uppercase tracking-widest rounded-sm px-4 py-3">
                  [ error ] {errorMsg}
                </div>
              )}

              <div className="pt-6 flex justify-end gap-4">
                <Button variant="outline" type="button" onClick={() => {
                  setName(profile?.name ?? '');
                  setMobile(profile?.mobileNumber ?? '');
                  setParentName(profile?.studentProfile?.parentName ?? '');
                  setParentMobile(profile?.studentProfile?.parentMobile ?? '');
                }}>
                  Discard Changes
                </Button>
                <Button type="submit" isLoading={saving}>Save Profile</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </SlideUp>

      <SlideUp delay={0.2}>
        <Card className="border-border shadow-sm">
          <CardContent className="p-8">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-muted-foreground mb-4">Security</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-6 max-w-md">
              Ensure your account is using a high-entropy password to maintain academic integrity.
            </p>
            <form onSubmit={handleChangePassword} className="max-w-md space-y-4">
              <Input label="Current Password" type="password" value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} required />
              <Input label="New Password" type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} required />
              <Input label="Confirm New Password" type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} required />

              {pwError && (
                <div className="bg-background border border-foreground text-foreground text-[10px] font-black uppercase tracking-widest rounded-sm px-4 py-3">
                  [ error ] {pwError}
                </div>
              )}
              {pwSuccess && (
                <div className="bg-secondary border border-border text-foreground text-[10px] font-black uppercase tracking-widest rounded-sm px-4 py-3">
                  [ success ] {pwSuccess}
                </div>
              )}

              <Button
                variant="outline"
                type="submit"
                isLoading={changingPw}
                className="mt-6 font-black uppercase tracking-widest text-[10px]"
              >
                Update Security Credentials
              </Button>
            </form>
          </CardContent>
        </Card>
      </SlideUp>
    </div>
  );
}
