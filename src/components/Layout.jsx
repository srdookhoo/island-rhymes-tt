import React from 'react';
import { useLocation, useOutlet, useNavigationType } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import LeafNav from '@/components/LeafNav';
import SiteFooter from '@/components/SiteFooter';

function AnimatedOutlet() {
  const outlet = useOutlet();
  const location = useLocation();
  const navigationType = useNavigationType();
  const isPop = navigationType === 'POP';

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: isPop ? -40 : 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: isPop ? 40 : -40 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {outlet}
      </motion.div>
    </AnimatePresence>
  );
}

export default function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <LeafNav />
      <main style={{ overflowX: 'clip' }}>
        <AnimatedOutlet />
      </main>
      <SiteFooter />
    </div>
  );
}