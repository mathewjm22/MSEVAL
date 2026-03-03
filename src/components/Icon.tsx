import { useEffect } from 'react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export function Icon({ name, className = '', size = 24 }: IconProps) {
  useEffect(() => {
    // Re-initialize icons after component mounts
    if ((window as any).lucide) {
      (window as any).lucide.createIcons();
    }
  }, [name]);

  return (
    <i 
      data-lucide={name} 
      className={className}
      style={{ width: size, height: size }}
    />
  );
}
