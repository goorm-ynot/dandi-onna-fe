import React from 'react';

interface BadgeProps {
  text?: string;
  state?: 'default' | 'expected' | 'finished' | 'noShow' | 'normal';
  device?: 'mobile' | 'web';
}

export const Badge: React.FC<BadgeProps> = ({ text = 'label', state = 'noShow', device = 'web' }) => {
  // expected 상태 (web)
  if (state === 'expected' && device === 'web') {
    return (
      <div className='flex items-center justify-center rounded-lg bg-badge-expected px-3 py-1'>
        <p className='caption5 text-center text-foreground-expected whitespace-nowrap'>{text}</p>
      </div>
    );
  }

  // finished 상태 (web)
  if (state === 'finished' && device === 'web') {
    return (
      <div className='flex items-center justify-center rounded-lg bg-badge-finished px-3 py-1'>
        <p className='caption5 text-center text-foreground-finished whitespace-nowrap'>{text}</p>
      </div>
    );
  }

  // default 상태 (web)
  if (state === 'default' && device === 'web') {
    return (
      <div className='flex items-center justify-center rounded-lg border border-border-secondary bg-background-normal px-3 py-1'>
        <p className='caption5 text-center text-foreground-normal'>{text}</p>
      </div>
    );
  }

  // normal 상태 (mobile)
  if (state === 'normal' && device === 'mobile') {
    return (
      <div className='flex items-center justify-center rounded-lg bg-system-mauve-light px-3 py-1'>
        <p className='caption3 text-center text-foreground-secondary'>{text}</p>
      </div>
    );
  }

  // noShow 상태 (기본값)
  return (
    <div className='flex items-center justify-center rounded-lg bg-badge-noshow px-3 py-1'>
      <p className='caption5 text-center text-foreground-noshow whitespace-nowrap'>{text}</p>
    </div>
  );
};
