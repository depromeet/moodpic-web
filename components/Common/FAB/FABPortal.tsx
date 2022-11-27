import React, { ReactPortal, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
}

const FABPortal = ({ children }: Props): ReactPortal | null => {
  const [render, setRender] = useState(false);
  const root = document.getElementById('FAB');

  useEffect(() => {
    if (root) {
      setRender(true);
    }
  }, [root]);

  if (!render || !root) return null;

  return render && createPortal(children, root);
};

export default FABPortal;
