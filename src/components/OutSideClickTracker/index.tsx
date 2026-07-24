import React, { useRef, useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
  onOutsideClick: () => void;
  className?:string
};

const OutsideClickTracker: React.FC<Props> = ({ children, onOutsideClick , className}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    console.log('heyy')
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      console.log('inside')
      onOutsideClick();
    }
  };

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef, onOutsideClick]);

  return <div ref={wrapperRef} className={className}>{children}</div>;
};

export default OutsideClickTracker