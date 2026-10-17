import React, { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { base44 } from '@/api/base44Client';
import { LogOut, Trash2, User as UserIcon, AlertTriangle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';

export default function Settings() {
  const { user, logout } = useAuth();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  async function handleDelete() {
    setDeleting(true);
    setError('');
    try {
      await base44.functions.invoke('deleteAccount', {});
      logout(false);
    } catch (e) {
      setError(e?.response?.data?.error || e?.message || 'Could not delete account. Please try again.');
      setDeleting(false);
    }
  }

  return (
    <div className="px-6 py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-heading text-4xl text-charcoal md:text-5xl">Settings</h1>

        <section className="mt-8 rounded-2xl bg-cream p-6 ring-1 ring-samaan/15">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-scarlet/10 text-scarlet">
              <UserIcon className="h-6 w-6" />
            </span>
            <div>
              <p className="font-heading text-xl text-charcoal">{user?.full_name || 'Reader'}</p>
              <p className="text-sm text-charcoal/70">{user?.email || ''}</p>
            </div>
          </div>
          {user?.role && <p className="mt-4 text-sm uppercase tracking-wide text-samaan">Role: {user.role}</p>}
        </section>

        <section className="mt-6">
          <button
            type="button"
            onClick={() => logout(true)}
            className="inline-flex items-center gap-2 rounded-full border border-samaan/20 px-5 py-2.5 text-charcoal transition hover:border-scarlet hover:text-scarlet focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scarlet focus-visible:ring-offset-2"
          >
            <LogOut className="h-4 w-4" /> Log out
          </button>
        </section>

        <section className="mt-10 rounded-2xl border border-scarlet/30 bg-scarlet/5 p-6">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-scarlet" />
            <h2 className="font-heading text-2xl text-charcoal">Delete Account</h2>
          </div>
          <p className="mt-3 text-charcoal/80">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-charcoal/70">
            <li>Your reading history and earned badges will be removed.</li>
            <li>Any purchased story entitlements will be revoked.</li>
            <li>You will be signed out immediately.</li>
          </ul>
          {error && <p className="mt-4 text-sm text-scarlet">{error}</p>}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                type="button"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-scarlet px-5 py-2.5 font-semibold text-cream transition hover:bg-scarlet/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scarlet focus-visible:ring-offset-2"
              >
                <Trash2 className="h-4 w-4" /> Delete my account
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This permanently deletes your account and all associated data. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={deleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {deleting ? 'Deleting…' : 'Yes, delete account'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </section>
      </div>
    </div>
  );
}