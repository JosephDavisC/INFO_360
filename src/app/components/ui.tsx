import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SpotStatus } from '../types';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface StatusBadgeProps {
  status: SpotStatus;
  className?: string;
  size?: 'small' | 'default';
}

export function StatusBadge({ status, className, size = 'default' }: StatusBadgeProps) {
  const statusStyles = {
    Open: 'bg-[#4B2E83] text-white',
    Busy: 'bg-[#E53935] text-white',
    Full: 'bg-[#E53935] text-white',
  };

  const sizeStyles = size === 'small' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-[12px]';

  return (
    <span className={cn('rounded-full font-bold leading-tight inline-flex items-center', statusStyles[status], sizeStyles, className)}>
      {status}
    </span>
  );
}

interface AmenityChipProps {
  label: string;
  icon: React.ReactNode;
}

export function AmenityChip({ label, icon }: AmenityChipProps) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F3EE] rounded-full border border-[#E8E3D3]">
      <div className="text-[#888]">{icon}</div>
      <span className="text-[12px] text-[#555] font-medium">{label}</span>
    </div>
  );
}
