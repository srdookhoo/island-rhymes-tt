import React, { createContext, useContext, useCallback, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TabContext = createContext(null);

export const TAB_ROOTS = {
  home: '/',
  badges: '/badges',
  history: '/history',
  settings: '/settings',
};

export function tabForPath(pathname) {
  if (pathname.startsWith('/badges')) return 'badges';
  if (pathname.startsWith('/history')) return 'history';
  if (pathname.startsWith('/settings')) return 'settings';
  return 'home';
}

export function TabProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const remembered = useRef({ ...TAB_ROOTS });
  const activeTab = tabForPath(location.pathname);

  // Remember the last route visited within each tab so switching back restores it.
  useEffect(() => {
    remembered.current[activeTab] = location.pathname;
  }, [location.pathname, activeTab]);

  const switchTab = useCallback(
    (tab) => {
      if (tab === activeTab) {
        // Re-selecting the active tab resets it to its root.
        navigate(TAB_ROOTS[tab]);
      } else {
        navigate(remembered.current[tab] || TAB_ROOTS[tab]);
      }
    },
    [activeTab, navigate]
  );

  return (
    <TabContext.Provider value={{ activeTab, switchTab }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTabs() {
  const ctx = useContext(TabContext);
  if (!ctx) throw new Error('useTabs must be used within a TabProvider');
  return ctx;
}