import React from 'react';
import { Home as HomeIcon, Award, History as HistoryIcon, Settings as SettingsIcon } from 'lucide-react';
import { useTabs } from '@/lib/tab-context';
import { useBadges } from '@/lib/badge-context';

const TABS = [
  { id: 'home', label: 'Home', Icon: HomeIcon },
  { id: 'badges', label: 'Badges', Icon: Award },
  { id: 'history', label: 'History', Icon: HistoryIcon },
  { id: 'settings', label: 'Settings', Icon: SettingsIcon },
];

export default function TabBar() {
  const { activeTab, switchTab } = useTabs();
  const { earnedCount } = useBadges();

  return (
    <nav className="safe-bottom safe-left safe-right fixed inset-x-0 bottom-0 z-50 border-t border-samaan/10 bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/80">
      <div className="mx-auto flex max-w-3xl items-stretch justify-around">
        {TABS.map(({ id, label, Icon }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => switchTab(id)}
              aria-label={label}
              aria-current={active ? 'page' : undefined}
              className="relative flex flex-1 flex-col items-center gap-1 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scarlet focus-visible:ring-offset-2"
            >
              <span className="relative">
                <Icon className={`h-6 w-6 ${active ? 'text-scarlet' : 'text-charcoal/60'}`} />
                {id === 'badges' && earnedCount > 0 && (
                  <span className="absolute -right-2 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-scarlet px-1 text-[10px] font-bold text-cream">
                    {earnedCount}
                  </span>
                )}
              </span>
              <span className={`text-xs font-semibold ${active ? 'text-scarlet' : 'text-charcoal/60'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}