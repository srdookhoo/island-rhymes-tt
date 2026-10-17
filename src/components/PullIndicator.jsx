import React from 'react';

export default function PullIndicator({ pullDistance, refreshing, threshold = 70, className = '' }) {
  if (pullDistance <= 0 && !refreshing) return null;
  const ready = pullDistance >= threshold;
  const height = refreshing ? 44 : pullDistance;
  const label = refreshing ? 'Refreshing…' : ready ? 'Release to refresh' : 'Pull to refresh…';
  return (
    <div className={`flex items-center justify-center overflow-hidden ${className}`} style={{ height }}>
      <div className="flex items-center gap-2 text-sm font-semibold text-charcoal/60">
        <div className={`h-5 w-5 rounded-full border-2 border-samaan/20 border-t-scarlet ${refreshing ? 'animate-spin' : ''}`} />
        <span>{label}</span>
      </div>
    </div>
  );
}