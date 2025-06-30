import { useState } from 'react';

export function useDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);

  const close = () => setIsOpen(false);

  const toggle = () => setIsOpen(prev => !prev);

  return { isOpen, open, close, toggle };
}
