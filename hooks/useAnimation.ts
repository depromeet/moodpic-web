import { useState } from 'react';
import { useSpring } from 'react-spring';

interface SpringAnimationProps {
  fullHeight?: number;
  onClose: () => void;
}

const useAnimation = ({ onClose, fullHeight }: SpringAnimationProps) => {
  const [isPrevClose, setPrevClose] = useState(false);

  const setOverflowStyle = () => {
    document.body.style.overflow = isPrevClose ? 'unset' : 'hidden';
  };

  const opacityAnimation = useSpring({
    to: { opacity: isPrevClose ? 0 : 1 },
    from: { opacity: isPrevClose ? 1 : 0.6 },
    onRest: () => {
      isPrevClose && onClose();
    },
    onResolve: () => {
      setOverflowStyle();
    },
  });

  const heightAnimation = useSpring({
    to: { height: isPrevClose ? 0 : fullHeight },
    from: { height: isPrevClose ? fullHeight : 0 },
  });

  const fullMenuAnimation = useSpring({
    to: { transform: isPrevClose ? `translateY(-100%)` : `translateY(0)` },
    from: { transform: isPrevClose ? `translateY(0)` : `translateY(-100%)` },
  });

  return {
    opacityAnimation,
    heightAnimation,
    fullMenuAnimation,
    isPrevClose,
    setPrevClose,
  };
};

export default useAnimation;
