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
  <div className={`animate-pulse bg-slate-200 dark:bg-slate-700 rounded ${className}`} />
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
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
          Profile Settings
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage your account details and security preferences.
        </p>
      </FadeIn>

      <SlideUp>
        <Card>
          <CardContent className="p-8">
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex justify-center items-center text-primary text-2xl font-bold">
                {initials}
              </div>
              <div>
                <h2 className="text-xl font-bold">{profile?.name}</h2>
                <p className="text-slate-500">{profile?.email}</p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                  <Input label="Email Address" type="email" value={profile?.email ?? ''} disabled />
                </div>
                <div className="mt-4">
                  <Input label="Student Mobile" type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-semibold mb-4">Guardian Details</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Parent/Guardian Name" value={parentName} onChange={(e) => setParentName(e.target.value)} />
                  <Input label="Parent/Guardian Mobile" type="tel" value={parentMobile} onChange={(e) => setParentMobile(e.target.value)} />
                </div>
              </div>

              {successMsg && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm rounded-md px-4 py-3">
                  {successMsg}
                </div>
              )}
              {errorMsg && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 text-red-700 text-sm rounded-md px-4 py-3">
                  {errorMsg}
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
        <Card className="border-red-500/20">
          <CardContent className="p-8">
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">Security</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Ensure your account is using a long, random password to stay secure.
            </p>
            <form onSubmit={handleChangePassword} className="max-w-md space-y-4">
              <Input label="Current Password" type="password" value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} required />
              <Input label="New Password" type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} required />
              <Input label="Confirm New Password" type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} required />

              {pwError && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 text-red-700 text-sm rounded-md px-4 py-3">
                  {pwError}
                </div>
              )}
              {pwSuccess && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 text-green-700 text-sm rounded-md px-4 py-3">
                  {pwSuccess}
                </div>
              )}

              <Button
                variant="outline"
                type="submit"
                isLoading={changingPw}
                className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:text-red-400"
              >
                Update Password
              </Button>
            </form>
          </CardContent>
        </Card>
      </SlideUp>
    </div>
  );
}
