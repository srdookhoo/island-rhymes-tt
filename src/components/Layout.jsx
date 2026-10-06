import React from 'react';
import { Outlet } from 'react-router-dom';
import LeafNav from '@/components/LeafNav';
import SiteFooter from '@/components/SiteFooter';

export default function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <LeafNav />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}