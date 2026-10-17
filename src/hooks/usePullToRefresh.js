import { useEffect, useRef, useState } from 'react';

export function usePullToRefresh(onRefresh, { threshold = 70, max = 110 } = {}) {
  const ref = useRef(null);
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const startYRef = useRef(0);
  const pullingRef = useRef(false);
  const refreshingRef = useRef(false);
  const pullDistRef = useRef(0);
  const onRefreshRef = useRef(onRefresh);

  useEffect(() => {
    onRefreshRef.current = onRefresh;
  });

  useEffect(() => {
    const isAtTop = () =>
      (window.scrollY || document.documentElement.scrollTop || 0) <= 0;

    const onTouchStart = (e) => {
      if (refreshingRef.current || !isAtTop()) return;
      startYRef.current = e.touches[0].clientY;
      pullingRef.current = true;
    };

    const onTouchMove = (e) => {
      if (!pullingRef.current || refreshingRef.current) return;
      const dy = e.touches[0].clientY - startYRef.current;
      if (dy <= 0) {
        if (pullDistRef.current !== 0) {
          pullDistRef.current = 0;
          setPullDistance(0);
        }
        return;
      }
      const dist = Math.min(max, dy * 0.5);
      pullDistRef.current = dist;
      setPullDistance(dist);
      if (isAtTop() && dy > 5 && e.cancelable) e.preventDefault();
    };

    const onTouchEnd = async () => {
      if (!pullingRef.current) return;
      pullingRef.current = false;
      const reached = pullDistRef.current >= threshold;
      pullDistRef.current = 0;
      setPullDistance(0);
      if (reached) {
        refreshingRef.current = true;
        setRefreshing(true);
        try {
          await onRefreshRef.current?.();
        } finally {
          refreshingRef.current = false;
          setRefreshing(false);
        }
      }
    };

    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [threshold, max]);

  return { ref, pullDistance, refreshing };
}