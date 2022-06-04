import { useEffect, useState } from 'react';

interface IntersectionObserverProps extends IntersectionObserverInit {
  onIntersect: IntersectionObserverCallback;
}

const useIntersectionObserver = ({
  onIntersect,
  threshold = 0,
  root = null,
  rootMargin = '0%',
}: IntersectionObserverProps) => {
  const [entry, setEntry] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!entry) return;

    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || !entry) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(onIntersect, observerParams);

    observer.observe(entry);

    return () => observer.unobserve(entry);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onIntersect, JSON.stringify(threshold), root, rootMargin]);

  return { setEntry };
};

export default useIntersectionObserver;
