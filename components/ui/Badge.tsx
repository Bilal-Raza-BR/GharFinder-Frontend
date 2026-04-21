import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'outline' | 'secondary';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors";
  
  const variants = {
    default: "bg-blue-100 text-blue-700",
    success: "bg-emerald-100 text-emerald-700", // "Verified" ke liye
    outline: "border border-gray-200 text-gray-600", // Features ke liye
    secondary: "bg-gray-100 text-gray-800",
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
