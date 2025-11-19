import React from 'react';

interface ChipProps {
  label?: string;
  state?: 'selected' | 'default';
  onClick?: () => void;
}

export const Chip: React.FC<ChipProps> = ({ label = 'label', state = 'default', onClick }) => {
  if (state === 'default') {
    return (
      <button
        onClick={onClick}
        className='
          bg-foreground-inverse border border-border-normal
          px-[16px] py-[6px] rounded-[20px]
          caption4 text-foreground-normal
          transition-all duration-200 cursor-pointer
          hover:opacity-80 active:scale-95
        '
        data-state='default'>
        {label}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className='
        bg-foreground-primary-emphasis
        px-[16px] py-[6px] rounded-[20px]
        caption4 text-foreground-inverse
        transition-all duration-200 cursor-pointer
        hover:opacity-80 active:scale-95
      '
      data-state='selected'>
      {label}
    </button>
  );
};
