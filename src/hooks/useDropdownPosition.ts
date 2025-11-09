'use client';

import { useState } from 'react';

export function useDropdownPosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const updatePosition = (target: HTMLElement) => {
    const rect = target.getBoundingClientRect();
    setPos({
      x: rect.left + rect.width / 2,
      y: rect.bottom + window.scrollY,
    });
  };

  return { pos, updatePosition };
}
