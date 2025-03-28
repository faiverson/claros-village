'use client';

import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CVDeleteButtonProps {
  onClick: () => void;
  className?: string;
}

export function CVDeleteButton({ onClick, className }: CVDeleteButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 transition-colors",
        "before:absolute before:inset-0 before:rounded-md before:bg-red-50 before:opacity-0 before:transition-opacity hover:before:opacity-100",
        "after:absolute after:inset-0 after:rounded-md after:ring-2 after:ring-red-200 after:ring-opacity-0 hover:after:ring-opacity-100 after:transition-all",
        className
      )}
    >
      <span className="relative flex items-center gap-1">
        <Trash2 className="w-4 h-4" />
        Eliminar
      </span>
    </button>
  );
}
